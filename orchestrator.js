// orchestrator.js — ULTIMATE AGENT SYSTEM (Pilares 1, 2, 3 e 4)
// Orquestrador unificado: Multi-Modelos + ReAct Executor + Memória Híbrida + Playbooks .claude + MCP

import Anthropic from "@anthropic-ai/sdk";
import readline from "readline";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { AGENTS, GERENTE_IDS, AGENTE_IDS } from "./agents/definitions.js";
import { TOOLS } from "./skills/registry.js";
import { construirContextoMemoria, memorizar, listarMemorias, listarProjetos } from "./memory/memory.js";
import { getServidoresDoAgente, listarServidores } from "./mcp/servers.js";
import { createExecutionPlan } from "./router/v2.js";
import { recordArenaRun, buildArenaRanking } from "./arena/store.js";
import { notifyExecutionComplete } from "./notifications/index.js";
import { recordRuntimeHeartbeat, sendRemoteHeartbeat } from "./runtime/status.js";

recordRuntimeHeartbeat({ component: "orchestrator", environment: process.env.GERENTE_RUNTIME_ENV || process.env.GERENTE_CLIENT_NAME || "local", detail: "orchestrator process started" });
void sendRemoteHeartbeat({ component: "orchestrator", detail: "orchestrator process started" });

// --- EXTRAIR JSON ROBUSTO PARA EVITAR CRASH DE FORMATO ---
function extrairJSONRobusto(texto) {
  try {
    const clean = texto.trim().replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (e) {
    const firstBrace = texto.indexOf('{');
    const lastBrace = texto.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      try {
        const potentialJSON = texto.substring(firstBrace, lastBrace + 1);
        return JSON.parse(potentialJSON);
      } catch (innerErr) {
        throw new Error("Formato JSON inválido extraído.");
      }
    }
    throw new Error("Nenhum bloco JSON encontrado na resposta.");
  }
}

function normalizarToken(valor = "") {
  return valor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function obterAjudaGerente(motivo = null) {
  const cabecalho = motivo ? `❌ ${motivo}\n\n` : "";
  return `${cabecalho}Uso do /gerente:
  /gerente <tarefa>            → roteamento automático
  /gerente produto <tarefa>    → força gerente_produto
  /gerente negocio <tarefa>    → força gerente_negocio
  /gerente ajuda               → mostra esta ajuda

Exemplos:
  /gerente criar landing page para dentistas
  /gerente produto revisar backend de autenticação
  /gerente negocio revisar copy da oferta`;
}

function parseGerenteCommand(textoRaw) {
  const texto = (textoRaw || "").trim();
  if (!texto) return null;
  if (!/^\/gerente\b/i.test(texto)) return null;

  const partes = texto.split(/\s+/);
  const args = partes.slice(1);

  if (!args.length) {
    return {
      tipo: "ajuda",
      mensagem: obterAjudaGerente("Informe uma tarefa após /gerente."),
    };
  }

  const primeiro = normalizarToken(args[0]);
  if (primeiro === "ajuda" || primeiro === "help" || primeiro === "?") {
    return { tipo: "ajuda", mensagem: obterAjudaGerente() };
  }

  if (primeiro === "produto") {
    const tarefa = args.slice(1).join(" ").trim();
    if (!tarefa) {
      return {
        tipo: "ajuda",
        mensagem: obterAjudaGerente("Informe a tarefa após '/gerente produto'."),
      };
    }
    return {
      tipo: "tarefa",
      tarefa,
      gerenteForcado: "gerente_produto",
      origemComando: "/gerente produto",
    };
  }

  if (primeiro === "negocio") {
    const tarefa = args.slice(1).join(" ").trim();
    if (!tarefa) {
      return {
        tipo: "ajuda",
        mensagem: obterAjudaGerente("Informe a tarefa após '/gerente negocio'."),
      };
    }
    return {
      tipo: "tarefa",
      tarefa,
      gerenteForcado: "gerente_negocio",
      origemComando: "/gerente negocio",
    };
  }

  if (args.length < 2) {
    return {
      tipo: "ajuda",
      mensagem: obterAjudaGerente(
        "Descreva a tarefa com mais detalhes (ex: '/gerente revisar backend')."
      ),
    };
  }

  return {
    tipo: "tarefa",
    tarefa: args.join(" ").trim(),
    gerenteForcado: null,
    origemComando: "/gerente",
  };
}

// --- CARREGAR .ENV: tenta projeto atual, fallback para pasta do gerente ---
const __scriptDir = path.dirname(fileURLToPath(import.meta.url));
const envPaths = [path.join(process.cwd(), ".env"), path.join(__scriptDir, ".env")];

function carregarEnv(envPath) {
  if (!fs.existsSync(envPath)) return false;
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const parts = trimmed.split("=");
      const key = parts[0].trim();
      const value = parts.slice(1).join("=").trim();
      if (!process.env[key]) process.env[key] = value; // não sobrescreve env do sistema
    }
  });
  return true;
}

for (const envPath of envPaths) {
  if (carregarEnv(envPath)) break;
}

// --- IDENTIFICAÇÃO DE CHAVES E MULTI-MODELO ---
const rawAnthropicKey = process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.trim() : '';
const rawGeminiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';
const rawOpenAIKey = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.trim() : '';
const rawOpenRouterKey = process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.trim() : '';
const rawGroqKey = process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.trim() : '';
const rawXaiKey = (process.env.XAI_API_KEY || process.env.GROK_API_KEY || '').trim();

const hasAnthropic = rawAnthropicKey && rawAnthropicKey !== 'sua_chave_aqui';
const hasGemini = rawGeminiKey && rawGeminiKey !== 'sua_chave_aqui';
const hasOpenAI = rawOpenAIKey && !rawOpenAIKey.includes('sua_chave');
const hasOpenRouter = rawOpenRouterKey && !rawOpenRouterKey.includes('sua_chave');
const hasGroq = rawGroqKey && !rawGroqKey.includes('sua_chave');
const hasXai = rawXaiKey && !rawXaiKey.includes('sua_chave');

let client = null;
if (hasAnthropic) {
  client = new Anthropic({
    apiKey: rawAnthropicKey,
  });
}

// ─── HISTÓRICO DE CONVERSA POR AGENTE ─────────────────────────────────────
const historicos = {};
function getHistorico(agentId) {
  if (!historicos[agentId]) historicos[agentId] = [];
  return historicos[agentId];
}
function addMensagem(agentId, role, content) {
  const hist = getHistorico(agentId);
  hist.push({ role, content });
  // Evita que o histórico cresça indefinidamente em sessões interativas longas.
  // Mantém a primeira mensagem (tarefa ou prompt principal) e as últimas 19.
  if (hist.length > 20) {
    const primeira = hist[0];
    const ultimas = hist.slice(-19);
    historicos[agentId] = [primeira, ...ultimas];
  }
}

// Otimiza o histórico silenciando/truncando saídas verbosas antigas de ferramentas já lidas.
// Deixa apenas a última intacta para a próxima decisão.
function otimizarHistorico(agentId) {
  const hist = getHistorico(agentId);
  if (hist.length <= 2) return;

  for (let i = 0; i < hist.length - 1; i++) {
    const msg = hist[i];
    if (msg.role === "user" && msg.content.includes('Retorno da execução da skill "')) {
      if (msg.content.length > 300) {
        const match = msg.content.match(/Retorno da execução da skill "([^"]+)"/);
        const skillName = match ? match[1] : "desconhecida";
        msg.content = `Retorno da execução da skill "${skillName}" (Conteúdo otimizado/resumido para economizar tokens):\n[Sucesso/Executado - ${msg.content.slice(0, 150)}... (truncado)]`;
      }
    }
  }
}



// ─── MOTOR DE EXECUÇÃO MULTI-PROVIDER ─────────────────────────────────────
async function callLLM(systemPrompt, messages, maxTokens = 4000, modelType = "premium") {
  const fastOrder = [
    ["Groq", hasGroq, () => callGroqAPI(systemPrompt, messages, maxTokens)],
    ["Gemini", hasGemini, () => callGeminiAPI(systemPrompt, messages, maxTokens)],
    ["OpenAI", hasOpenAI, () => callOpenAIAPI(systemPrompt, messages, maxTokens)],
    ["xAI/Grok", hasXai, () => callXaiAPI(systemPrompt, messages, maxTokens)],
    ["Anthropic", hasAnthropic, () => callAnthropicAPI(systemPrompt, messages, maxTokens)],
    ["OpenRouter", hasOpenRouter, () => callOpenRouterAPI(systemPrompt, messages, maxTokens)],
  ];

  const premiumOrder = [
    ["Anthropic", hasAnthropic, () => callAnthropicAPI(systemPrompt, messages, maxTokens)],
    ["OpenAI", hasOpenAI, () => callOpenAIAPI(systemPrompt, messages, maxTokens)],
    ["xAI/Grok", hasXai, () => callXaiAPI(systemPrompt, messages, maxTokens)],
    ["Gemini", hasGemini, () => callGeminiAPI(systemPrompt, messages, maxTokens)],
    ["OpenRouter", hasOpenRouter, () => callOpenRouterAPI(systemPrompt, messages, maxTokens)],
    ["Groq", hasGroq, () => callGroqAPI(systemPrompt, messages, maxTokens)],
  ];

  const order = modelType === "fast" ? fastOrder : premiumOrder;
  let lastError = null;

  for (const [name, enabled, caller] of order) {
    if (!enabled) continue;
    try {
      return await caller();
    } catch (err) {
      lastError = err;
      console.log(`\n⚠️  ${name} falhou (${err.message.substring(0, 120)}...). Tentando próximo provedor...`);
    }
  }

  if (lastError) throw lastError;
  return "";
}

async function callAnthropicAPI(systemPrompt, messages, maxTokens) {
  const models = ["claude-sonnet-4-6", "claude-opus-4-8", "claude-fable-5", "claude-opus-4-7"];
  
  for (let i = 0; i < models.length; i++) {
    const modelName = models[i];
    try {
      const response = await client.messages.create({
        model: modelName,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages,
      });
      return response.content[0].text;
    } catch (err) {
      const isNotFoundError = err.message?.includes("not_found_error") || err.status === 404;
      if (isNotFoundError && i < models.length - 1) {
        console.log(`⚠️  Modelo '${modelName}' indisponível para esta chave. Tentando '${models[i+1]}'...`);
        continue;
      }
      throw err;
    }
  }
}

function toOpenAICompatibleMessages(systemPrompt, messages) {
  return [
    ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];
}

async function callOpenAICompatible({ baseUrl, apiKey, models, systemPrompt, messages, maxTokens, extraHeaders = {} }) {
  const payloadMessages = toOpenAICompatibleMessages(systemPrompt, messages);

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    const res = await fetch(`${baseUrl.replace(/\/+$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...extraHeaders,
      },
      body: JSON.stringify({
        model,
        messages: payloadMessages,
        max_tokens: maxTokens,
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if ((res.status === 404 || res.status === 400) && i < models.length - 1) {
        console.log(`⚠️  Modelo '${model}' indisponível. Tentando '${models[i + 1]}'...`);
        continue;
      }
      throw new Error(`Erro em ${baseUrl} (${res.status}): ${text}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error(`Resposta inválida do provedor OpenAI-compatible: ${JSON.stringify(data)}`);
    return content;
  }
}

async function callOpenAIAPI(systemPrompt, messages, maxTokens) {
  return callOpenAICompatible({
    baseUrl: "https://api.openai.com/v1",
    apiKey: rawOpenAIKey,
    models: ["gpt-4.1-mini", "gpt-4o-mini", "gpt-3.5-turbo"],
    systemPrompt,
    messages,
    maxTokens,
  });
}

async function callOpenRouterAPI(systemPrompt, messages, maxTokens) {
  return callOpenAICompatible({
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: rawOpenRouterKey,
    models: [
      "openai/gpt-oss-20b:free",
      "google/gemma-4-31b-it:free",
      "openai/gpt-oss-120b:free",
      "openrouter/free",
      "qwen/qwen3.7-plus",
      "~openai/gpt-mini-latest",
      "google/gemini-3.5-flash",
    ],
    systemPrompt,
    messages,
    maxTokens,
    extraHeaders: {
      "HTTP-Referer": "http://localhost/gerente",
      "X-Title": "Gerente Orchestrator",
    },
  });
}

async function callGroqAPI(systemPrompt, messages, maxTokens) {
  return callOpenAICompatible({
    baseUrl: "https://api.groq.com/openai/v1",
    apiKey: rawGroqKey,
    models: ["llama-3.3-70b-versatile", "meta-llama/llama-4-scout-17b-16e-instruct"],
    systemPrompt,
    messages,
    maxTokens,
  });
}

async function callXaiAPI(systemPrompt, messages, maxTokens) {
  return callOpenAICompatible({
    baseUrl: "https://api.x.ai/v1",
    apiKey: rawXaiKey,
    models: ["grok-4.3", "grok-4.20-0309-non-reasoning", "grok-build-0.1"],
    systemPrompt,
    messages,
    maxTokens,
  });
}

async function callGeminiAPI(systemPrompt, messages, maxTokens) {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));
  
  const body = {
    contents: contents,
    generationConfig: {
      maxOutputTokens: maxTokens
    }
  };
  
  if (systemPrompt) {
    body.systemInstruction = {
      parts: { text: systemPrompt }
    };
  }
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${rawGeminiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Erro na API do Gemini (${res.status}): ${errText}`);
  }
  
  const data = await res.json();
  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
    return data.candidates[0].content.parts[0].text;
  } else {
    throw new Error(`Resposta inválida do Gemini: ${JSON.stringify(data)}`);
  }
}


// ─── SIMULAÇÃO DE RESPOSTAS PARA MODO DEMO ─────────────────────────────────
function getSimulatedResponse(agentId, mensagem, loopCount = 0) {
  if (loopCount === 0 && !GERENTE_IDS.includes(agentId)) {
    let toolName = "writeFile";
    let filePath = "";
    let content = "";
    
    if (agentId === "frontend") {
      filePath = "src/components/ContactForm.jsx";
      content = `// Componente React moderno e interativo
import React from 'react';
export default function ContactForm() { return <div>Formulário Dental Juá</div>; }`;
    } else if (agentId === "backend") {
      filePath = "src/server.js";
      content = `// Servidor Express de Produção
import express from 'express';
const app = express();
app.listen(3000, () => console.log('Server ok'));`;
    } else if (agentId === "infra") {
      filePath = "docker-compose.yml";
      content = `version: '3.8'\nservices:\n  app:\n    image: node:18`;
    } else if (agentId === "qa") {
      filePath = "tests/auth.test.js";
      content = `describe('Auth', () => {});`;
    } else if (agentId === "docs") {
      filePath = "README.md";
      content = `# Projeto Dental Juá\nDocumentação completa.`;
    } else {
      toolName = "readFile";
      filePath = "package.json";
      content = "";
    }
    
    return JSON.stringify({
      thought: `[MODO DEMO] Raciocínio lógico do agente: preciso persistir as alterações locais de ${agentId} usando a ferramenta ${toolName}.`,
      toolCall: {
        name: toolName,
        arguments: toolName === "writeFile" ? { filePath, content } : { filePath }
      }
    }, null, 2);
  }

  switch (agentId) {
    case "gerente_produto":
      return JSON.stringify({
        analise: "Análise de gerenciamento técnico: Requisitos de infra e UI mapeados com sucesso para os playbooks.",
        agentes_necessarios: ["frontend", "backend", "docs"],
        plano: "Coordenar o frontend com componentização avançada e backend com RLS no Supabase.",
        prioridade: "frontend"
      }, null, 2);
    case "gerente_negocio":
      return JSON.stringify({
        analise: "Análise estratégica de negócios: Foco em marketing persuasivo e conformidade técnica (LGPD).",
        agentes_necessarios: ["marketing", "seo"],
        plano: "Copywriting persuasivo integrado a otimização de metadados SEO.",
        foco_principal: "copywriting"
      }, null, 2);
    case "frontend":
      return `// Componente React moderno e interativo criado pelo Agente Frontend
import React, { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  return (
    <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 text-slate-100 max-w-md mx-auto">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">Contato</h2>
      <input type="email" placeholder="seuemail@exemplo.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white" />
    </div>
  );
}`;
    case "backend":
      return `// API Express com Supabase Client ativo
import express from 'express';
const app = express();
app.use(express.json());
app.post('/api/v1/leads', (req, res) => {
  res.status(201).json({ success: true, message: 'Lead registrado com sucesso!' });
});
app.listen(3000, () => console.log('🚀 Backend ativo na porta 3000'));`;
    case "infra":
      return `# docker-compose.yml com proxy Traefik e SSL automático
version: '3.8'
services:
  reverse-proxy:
    image: traefik:v2.10
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"`;
    case "qa":
      return `🧪 SUÍTE DE TESTES E QUALIDADE (QA)
- Cobertura de Testes: 100% de sucesso
- Ferramenta: Vitest`;
    case "marketing":
      return `📣 ESTRATÉGIA DE COPY PERSUASIVO (MARKETING)
- Título H1: "Atraia clientes de forma previsível e lote sua agenda no automático."
- CTA: "👉 Quero Agendar Minha Mentoria Agora!"`;
    case "seo":
      return `🔍 OTIMIZAÇÃO DE CONTEÚDO E TAGS (SEO)
- Palavras-chave: "consultório odonto digital", "captar pacientes dentista"
- Meta Title: "Atraia Pacientes Qualificados no Piloto Automático | OdontoCorp"`;
    case "seguranca":
      return `🛡️ RELATÓRIO DE AUDITORIA DE SEGURANÇA E CONFORMIDADE (LGPD)
- Consentimento explícito: ATIVO
- Secrets em hardcode: ZERO encontrados
- Cookies administrativos: HTTPS Only`;
    case "performance":
      return `⚡ DIAGNÓSTICO DE PERFORMANCE E PAGELOCK
- LCP estimado: 0.9s
- CLS estimado: 0.01`;
    case "docs":
      return `📚 DOCUMENTAÇÃO DA ARQUITETURA DE MICROSERVIÇOS
# Projeto Dental Juá
Sistema completo de captação e gerenciamento de orçamentos odontológicos.`;
    case "analytics":
      return `📊 ESTRUTURA DE TELEMETRIA E EVENTOS (ANALYTICS)
window.gtag('event', 'lead_submission', { 'category': 'conversion' });`;
    default:
      return `[Resposta Simulada] O agente ${agentId} executou e concluiu sua tarefa de forma satisfatória.`;
  }
}

// ─── SISTEMA DINAMICO DE CARREGAMENTO DE SKILLS DO GERENTE ───────────────────
const SKILLS_DIR = path.join(__scriptDir, "skills", "imported", "agents-root-skills");

const RULES = [
  { agent: "frontend", keywords: ["ui", "ux", "lp", "landing", "css", "html", "react", "componente", "carrossel", "interface", "design", "dobra-zero"] },
  { agent: "backend", keywords: ["whatsapp", "automacao", "api", "backend", "express", "supabase", "n8n", "banco", "database", "webhook", "bot"] },
  { agent: "infra", keywords: ["docker", "vps", "traefik", "ssl", "deploy", "dns", "cloudflare", "reverse-proxy"] },
  { agent: "qa", keywords: ["test", "testes", "qa", "debug", "refactor", "bug", "revisao-codigo", "review"] },
  { agent: "docs", keywords: ["docs", "readme", "documentacao", "gtd", "sop", "brief", "guia", "manual"] },
  { agent: "marketing", keywords: ["marketing", "sales", "venda", "funil", "copy", "anuncio", "anuncios", "criativos", "headline", "headlines", "cta", "ctas", "vsl", "lead", "leads", "conversao", "proposta", "comercial", "briefing", "lancamento", "webinar", "follow-up"] },
  { agent: "seo", keywords: ["seo", "keywords", "artigo", "ranqueavel", "palavra-chave", "blog", "editorial", "pilar", "conteudo", "youtube", "shortform", "storytelling", "legenda"] },
  { agent: "analytics", keywords: ["analytics", "tracking", "utm", "pixel", "metricas", "kpi", "roi", "dashboard", "dre", "financeiro", "tributario", "margens", "gargalos", "radar", "equilibrio"] },
  { agent: "seguranca", keywords: ["lgpd", "seguranca", "segurança", "contrato", "contratos", "juridica", "juridicas", "sigilo", "pecas", "processuais", "honorarios", "blindagem"] },
  { agent: "performance", keywords: ["performance", "lighthouse", "pagespeed", "cache", "bundle", "otimizacao", "core-web-vitals"] }
];

const skillsPorAgente = {};
AGENTE_IDS.forEach(id => { skillsPorAgente[id] = []; });

function categorizarSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.log(`⚠️  Pasta de skills operacionais não encontrada em: ${SKILLS_DIR}`);
    return;
  }
  
  try {
    const folders = fs.readdirSync(SKILLS_DIR).filter(file => {
      const fullPath = path.join(SKILLS_DIR, file);
      return fs.statSync(fullPath).isDirectory();
    });
    
    let totalSkills = 0;
    folders.forEach(folder => {
      const folderLower = folder.toLowerCase();
      let matched = false;
      
      for (const rule of RULES) {
        const matches = rule.keywords.some(kw => folderLower.includes(kw));
        if (matches) {
          skillsPorAgente[rule.agent].push(folder);
          matched = true;
        }
      }
      
      if (!matched) {
        if (folderLower.includes("claude-cowork")) {
          skillsPorAgente["docs"].push(folder);
        } else {
          skillsPorAgente["marketing"].push(folder);
        }
      }
      totalSkills++;
    });
    
    console.log(`📚 [SISTEMA DE SKILLS] Mapeamento dinâmico concluído: ${totalSkills} playbooks operacionais da pasta .claude vinculados aos agentes.`);
  } catch (err) {
    console.error("Erro ao mapear a biblioteca de skills:", err.message);
  }
}

function obterInstrucoesSkillsRelevantes(agentId, tarefa) {
  const folders = skillsPorAgente[agentId] || [];
  if (folders.length === 0) return "";
  
  const tarefaLower = tarefa.toLowerCase();
  const matchedFolders = [];
  
  folders.forEach(folder => {
    const termos = folder.split("-");
    let matchCount = 0;
    
    termos.forEach(termo => {
      if (termo.length > 3 && tarefaLower.includes(termo)) {
        matchCount++;
      }
    });
    
    if (matchCount > 0) {
      matchedFolders.push({ folder, score: matchCount });
    }
  });
  
  // Ordena os playbooks por relevância baseada na contagem de palavras-chave correspondentes
  matchedFolders.sort((a, b) => b.score - a.score);
  
  // Limita a no máximo os 2 playbooks mais relevantes para não inflar desnecessariamente os tokens
  const topFolders = matchedFolders.slice(0, 2).map(item => item.folder);
  const skillsRelevantes = [];
  
  topFolders.forEach(folder => {
    const filePath = fs.existsSync(path.join(SKILLS_DIR, folder, "skill.md"))
      ? path.join(SKILLS_DIR, folder, "skill.md")
      : path.join(SKILLS_DIR, folder, "SKILL.md");
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const cleanContent = content.replace(/^---[\s\S]*?---/, "").trim();
        skillsRelevantes.push(`### Playbook Operacional: ${folder.toUpperCase()}\n${cleanContent}`);
      } catch (e) {}
    }
  });
  
  if (skillsRelevantes.length > 0) {
    return `\n\n[PLAYBOOKS CORPORATIVOS ASSOCIADOS]\nVocê deve seguir com rigor absoluto as diretrizes dos playbooks corporativos abaixo para resolver esta tarefa:\n\n${skillsRelevantes.join("\n\n")}`;
  }
  return "";
}


// Inicializa a categorização de skills operacionais de imediato
categorizarSkills();

// Instruções de ReAct para o LLM
const toolInstructions = `

Você tem acesso às seguintes ferramentas (Skills) locais para ler, escrever ou rodar código. Se precisar realizar uma ação técnica, responda EXCLUSIVAMENTE com o seguinte formato JSON especial:
{
  "thought": "Justificativa lógica de por que você precisa chamar esta ferramenta",
  "toolCall": {
    "name": "nome_da_ferramenta",
    "arguments": {
      "filePath": "caminho/relativo/no/workspace",
      "content": "conteúdo completo se aplicável"
    }
  }
}

Ferramentas locais disponíveis:
- writeFile: cria ou sobrescreve arquivos. Ex: { "filePath": "src/App.jsx", "content": "..." }
- readFile: lê arquivos. Ex: { "filePath": "src/App.jsx" }
- runCommand: executa comandos seguros no terminal. Ex: { "command": "npm test" }
- listFiles: lista arquivos e pastas de um diretório. Ex: { "directoryPath": "." }
- searchFiles: busca texto nos arquivos do workspace. Ex: { "pattern": "express" }
- appendFile: anexa texto ao final de um arquivo. Ex: { "filePath": "logs.txt", "content": "..." }
- getProjectInfo: retorna informações gerais do projeto. Ex: {}

Caso você já tenha coletado tudo que precisa ou finalizado a criação, apenas retorne sua resposta de texto normal no idioma Português (fora do formato JSON de toolCall).`;

// ─── CHAMAR UM AGENTE ESPECÍFICO (LOOP ReAct) ──────────────────────────────
async function chamarAgente(agentId, mensagem, opcoes = {}) {
  const {
    usarTools = true,
    usarMCP = true,
    projeto = null,
    injetarMemoria = true,
    modelType = "premium",
    allowedToolNames = null,
  } = opcoes;

  const agente = AGENTS[agentId];
  if (!agente) throw new Error(`Agente "${agentId}" não encontrado.`);

  addMensagem(agentId, "user", mensagem);

  let loopCount = 0;
  const maxLoops = 4;
  let finalResponse = "";

  while (loopCount < maxLoops) {
    let systemPrompt = agente.system;
    let modoSimuladoFallback = false;
    
    // Injeta Memória (Pilar 3)
    if (injetarMemoria && !GERENTE_IDS.includes(agentId)) {
      const ctxMemoria = await construirContextoMemoria(agentId, mensagem, projeto);
      if (ctxMemoria) systemPrompt += ctxMemoria;
    }

    // Injeta Playbooks .claude (Nosso RAG)
    if (!GERENTE_IDS.includes(agentId)) {
      const skillsContext = obterInstrucoesSkillsRelevantes(agentId, mensagem);
      systemPrompt += skillsContext;
      if (usarTools) systemPrompt += toolInstructions;
    }

    let texto;
    if (hasAnthropic || hasGemini) {
      try {
        texto = await callLLM(systemPrompt, getHistorico(agentId), 4000, modelType);
      } catch (err) {
        console.log(`\n⚠️  Falha nas APIs de nuvem (${err.message.substring(0, 100)}...). Ativando Modo Simulado de Fallback!`);
        texto = getSimulatedResponse(agentId, mensagem, loopCount);
        modoSimuladoFallback = true;
      }
    } else {
      texto = getSimulatedResponse(agentId, mensagem, loopCount);
      modoSimuladoFallback = true;
    }


    addMensagem(agentId, "assistant", texto);

    // Tenta interceptar e parsear chamada de ferramenta
    let parsedTool = null;
    try {
      const obj = extrairJSONRobusto(texto);
      if (obj.toolCall && obj.toolCall.name) {
        parsedTool = obj.toolCall;
      }
    } catch (e) {}

    if (parsedTool && !usarTools) {
      finalResponse = texto;
      break;
    }

    if (parsedTool) {
      console.log(`\n🔧 [${agente.nome}] executando skill "${parsedTool.name}"...`);
      if (parsedTool.arguments.filePath || parsedTool.arguments.path) {
        console.log(`   └─ Arquivo: ${parsedTool.arguments.filePath || parsedTool.arguments.path}`);
      } else if (parsedTool.arguments.command) {
        console.log(`   └─ Comando: ${parsedTool.arguments.command}`);
      }

      let toolResult;
      try {
        const tool = TOOLS[parsedTool.name];
        if (!tool) throw new Error(`A skill "${parsedTool.name}" não existe.`);
        if (Array.isArray(allowedToolNames) && !allowedToolNames.includes(parsedTool.name)) {
          throw new Error(`A skill "${parsedTool.name}" está fora da lane permitida para esta tarefa.`);
        }

        const safeToolsInFallback = new Set(["readFile", "listFiles", "searchFiles", "getProjectInfo"]);
        if (modoSimuladoFallback) {
          if (safeToolsInFallback.has(parsedTool.name)) {
            toolResult = tool.execute(parsedTool.arguments);
          } else {
            toolResult = `[SIMULAÇÃO] Modo fallback ativo; execução real da skill "${parsedTool.name}" foi bloqueada por segurança.`;
          }
          console.log(`   ✅ Retorno: ${toolResult}`);
        } else {
          toolResult = tool.execute(parsedTool.arguments);
          console.log(`   ✅ Retorno da skill executado com sucesso.`);
        }
      } catch (err) {
        toolResult = `[ERRO] Falha ao executar skill: ${err.message}`;
        console.log(`   ❌ Retorno: ${toolResult}`);
      }

      const contextualFeedback = `Retorno da execução da skill "${parsedTool.name}":\n${toolResult}\n\nAnalise o retorno e decida se o objetivo foi concluído ou se precisa usar outra skill.`;
      addMensagem(agentId, "user", contextualFeedback);
      
      // Otimiza o histórico truncando saídas antigas e economizando tokens!
      otimizarHistorico(agentId);

      loopCount++;
    } else {
      finalResponse = texto;
      break;
    }
  }

  if (loopCount >= maxLoops) {
    finalResponse = `[AVISO: Limite de loops atingido]\nÚltima resposta:\n${finalResponse || "Processando..."}`;
  }

  if (opcoes.salvarLog) salvarLog(agentId, mensagem, finalResponse);
  return finalResponse;
}

// ─── ROTEAMENTO SIMULADO DE FALLBACK ──────────────────────────────────────
function obterRoteamentoSimulado(tarefa) {
  const t = tarefa.toLowerCase();
  let gerente = "gerente_produto";
  let agentes = [];
  let projeto = null;
  const mencionaGithub = t.includes("github") || t.includes("pull request") || t.includes("pr ");
  const termosTriagemGithub = t.includes("triagem") || t.includes("issue") || t.includes("backlog") || t.includes("milestone");
  const termosReviewGithub = t.includes("review") || t.includes("comentario") || t.includes("comentário") || t.includes("thread");
  const termosCiGithub = t.includes("ci") || t.includes("workflow") || t.includes("actions") || t.includes("pipeline");
  const termosRelease = t.includes("release") || t.includes("changelog") || t.includes("versao") || t.includes("versão") || t.includes("tag");
  
  if (t.includes("dental") || t.includes("jua")) projeto = "dental-jua";
  if (t.includes("multipost")) projeto = "multipost";
  if (t.includes("campo") || t.includes("soberano")) projeto = "campo-soberano";
  if (t.includes("glenio") || t.includes("fitness")) projeto = "glenio-fitness";

  if (mencionaGithub && termosCiGithub) {
    agentes = ["github_ci", "qa"];
  } else if (mencionaGithub && termosReviewGithub) {
    agentes = ["github_reviews", "qa"];
  } else if (mencionaGithub && termosTriagemGithub) {
    agentes = ["github_triagem"];
  } else if (termosRelease) {
    agentes = ["release_ops", "docs"];
  } else if (t.includes("landing page") || t.includes("site") || t.includes("tela") || t.includes("front")) {
    agentes = ["frontend"];
    if (t.includes("seo") || t.includes("copy") || t.includes("marketing")) {
      gerente = "gerente_negocio";
      agentes.push("marketing", "seo");
    } else {
      agentes.push("docs");
    }
  } else if (t.includes("backend") || t.includes("api") || t.includes("banco") || t.includes("n8n")) {
    agentes = ["backend", "qa"];
  } else if (t.includes("infra") || t.includes("docker") || t.includes("deploy")) {
    agentes = ["infra", "docs"];
  } else if (t.includes("segurança") || t.includes("lgpd") || t.includes("vulnerabilidade")) {
    gerente = "gerente_negocio";
    agentes = ["seguranca", "docs"];
  } else if (t.includes("marketing") || t.includes("anúncio") || t.includes("copy")) {
    gerente = "gerente_negocio";
    agentes = ["marketing", "seo"];
  } else {
    agentes = ["frontend", "backend"];
  }

  return {
    gerente: gerente,
    agentes_diretos: agentes,
    projeto: projeto,
    motivo: `[MODO RESILIENTE] Roteamento local offline baseado em palavras-chave`
  };
}

// ─── ROTEADOR INTELIGENTE ─────────────────────────────────────────────────
async function rotearTarefa(tarefa) {
  if (!hasAnthropic && !hasGemini) {
    return obterRoteamentoSimulado(tarefa);
  }

  const promptRoteamento = `Você é um roteador de tarefas. Analise a tarefa abaixo e responda APENAS com um JSON:
{
  "gerente": "gerente_produto" ou "gerente_negocio",
  "agentes_diretos": ["frontend", "backend"] (lista de agentes que devem ser chamados),
  "projeto": "nome-do-projeto ou null",
  "motivo": "explicação curta"
}

Regras:
- gerente_produto cuida de: frontend, backend, infra, qa, docs, github_triagem, github_reviews, github_ci, release_ops
- gerente_negocio cuida de: marketing, seo, analytics, seguranca, performance
- Use github_triagem para issues/backlog/milestones
- Use github_reviews para comentários de PR e code review
- Use github_ci para falhas de CI/workflows no GitHub Actions
- Use release_ops para versionamento, changelog e publicação
- Se a tarefa envolver múltiplas áreas, inclua todos os agentes necessários
- Identifique se refere a algum projeto conhecido (ex: 'dental-jua', 'multipost', 'campo-soberano', 'glenio-fitness')
- Responda APENAS o JSON, sem texto antes ou depois

Tarefa: ${tarefa}`;

  try {
    const texto = await callLLM(null, [{ role: "user", content: promptRoteamento }], 500, "fast");
    return extrairJSONRobusto(texto);
  } catch (err) {
    console.log(`\n⚠️  Falha nas APIs ao rotear tarefa (${err.message.substring(0, 100)}...). Ativando roteamento simulado offline!`);
    return obterRoteamentoSimulado(tarefa);
  }
}

function criarRoteamentoDoPlano(plano) {
  const agentes = [plano.primary?.agent_id].filter(Boolean);
  return {
    gerente: plano.manager,
    agentes_diretos: [...new Set(agentes)],
    projeto: plano.project || null,
    motivo: `[ROUTER V2] area=${plano.task_brief.area}; risco=${plano.task_brief.risk}; modelo=${plano.model_policy.preferred_model}`,
  };
}

function aplicarGerenteForcadoNoPlano(plano, gerenteForcado) {
  if (!gerenteForcado) return plano;
  return {
    ...plano,
    manager: gerenteForcado,
    forced_manager: true,
  };
}

function imprimirPlanoExecucao(plano) {
  console.log("\n🧭 ROUTER V2 - PLANO DE EXECUÇÃO");
  console.log("─".repeat(60));
  console.log(`ID: ${plano.task_id}`);
  console.log(`Área: ${plano.task_brief.area} | Risco: ${plano.task_brief.risk} | Complexidade: ${plano.task_brief.complexity}`);
  console.log(`Ambiente: ${plano.environment} | Projeto: ${plano.project}`);
  console.log(`Gerente: ${plano.manager}${plano.forced_manager ? " (forçado pelo comando)" : ""}`);
  console.log(`Executor: ${plano.primary.agent_id}`);
  console.log(`Fiscal: ${plano.reviewer.agent_id} | obrigatório: ${plano.reviewer.required ? "sim" : "não"}`);
  console.log(`Modelo preferido: ${plano.model_policy.preferred_model} | orçamento: ${plano.budget.mode}`);
  console.log(`Ferramentas permitidas: ${plano.allowed_tools.join(", ") || "nenhuma"}`);
  console.log(`Ferramentas bloqueadas: ${plano.blocked_tools.join(", ") || "nenhuma"}`);
  console.log(`Pronto quando: ${plano.done_when.join("; ")}`);
}

function resolverToolNamesPermitidas(plano) {
  const permitidas = new Set(["readFile", "listFiles", "searchFiles", "getProjectInfo"]);
  const allowed = new Set(plano.allowed_tools || []);

  if (allowed.has("file_write")) {
    permitidas.add("writeFile");
    permitidas.add("appendFile");
  }

  if (
    allowed.has("test") ||
    allowed.has("health_check") ||
    allowed.has("api_test") ||
    allowed.has("container_read") ||
    allowed.has("status") ||
    allowed.has("logs")
  ) {
    permitidas.add("runCommand");
  }

  return [...permitidas];
}

function criarHandoffCompacto({ tarefa, plano, resultados }) {
  const resumoResultados = Object.entries(resultados)
    .filter(([agentId]) => !agentId.startsWith("__"))
    .map(([agentId, resultado]) => ({
      agent_id: agentId,
      preview: String(resultado || "").slice(0, 1200),
    }));

  return {
    task_id: plano.task_id,
    tarefa,
    area: plano.task_brief.area,
    risk: plano.task_brief.risk,
    complexity: plano.task_brief.complexity,
    done_when: plano.done_when,
    blocked_tools: plano.blocked_tools,
    results: resumoResultados,
  };
}

function precisaFallbackPorRevisao(revisao) {
  const texto = normalizarToken(revisao || "");
  const sinaisReprovacao = [
    "reprovado",
    "nao aprovado",
    "não aprovado",
    "falha critica",
    "falha crítica",
    "bloqueado",
    "nao concluiu",
    "não concluiu",
  ];
  return sinaisReprovacao.some((sinal) => texto.includes(normalizarToken(sinal)));
}

async function executarFiscal({ tarefa, plano, resultados, projeto }) {
  if (!plano.reviewer?.required) return null;

  const reviewerId = plano.reviewer.agent_id;
  const reviewer = AGENTS[reviewerId];
  if (!reviewer) return null;

  const handoff = criarHandoffCompacto({ tarefa, plano, resultados });
  const mensagemFiscal = `Revise a entrega abaixo como fiscal independente.

Responda em português, de forma objetiva, com:
1. Veredito: APROVADO ou REPROVADO
2. Riscos encontrados
3. O que falta para cumprir o done_when
4. Se precisa fallback

Handoff compacto:
${JSON.stringify(handoff, null, 2)}`;

  console.log(`\n🔎 Fiscal obrigatório: ${reviewer.nome} revisando entrega...`);
  const revisao = await chamarAgente(reviewerId, mensagemFiscal, {
    usarTools: false,
    usarMCP: false,
    projeto,
    injetarMemoria: true,
    modelType: "fast",
  });

  resultados.__review = {
    agent_id: reviewerId,
    required: true,
    result: revisao,
  };
  await memorizar(reviewerId, tarefa, revisao, projeto);
  console.log(`✅ Fiscal ${reviewer.nome} concluiu revisão`);
  return revisao;
}

async function executarFallbackSeNecessario({ tarefa, plano, resultados, projeto, revisao }) {
  if (!precisaFallbackPorRevisao(revisao)) return null;

  const fallback = plano.fallback?.find((item) => AGENTS[item.agent_id] && !resultados[item.agent_id]);
  if (!fallback) return null;

  const agentId = fallback.agent_id;
  const agente = AGENTS[agentId];
  const handoff = criarHandoffCompacto({ tarefa, plano, resultados });
  const mensagemFallback = `O fiscal indicou falha ou bloqueio. Atue como fallback para destravar a tarefa.

Nao repita todo o trabalho. Foque no que falta, respeitando ferramentas bloqueadas e done_when.

Revisao do fiscal:
${revisao}

Handoff compacto:
${JSON.stringify(handoff, null, 2)}`;

  console.log(`\n♻️ Fallback acionado: ${agente.nome}...`);
  const resultado = await chamarAgente(agentId, mensagemFallback, {
    usarTools: true,
    usarMCP: true,
    projeto,
    injetarMemoria: true,
    allowedToolNames: resolverToolNamesPermitidas(plano),
  });
  resultados[agentId] = resultado;
  resultados.__fallback = {
    agent_id: agentId,
    trigger: fallback.trigger,
  };
  await memorizar(agentId, tarefa, resultado, projeto);
  console.log(`✅ Fallback ${agente.nome} concluiu`);
  return resultado;
}

// ─── FLUXO COMPLETO DE UMA TAREFA ─────────────────────────────────────────
async function executarTarefa(tarefa, opcoes = {}) {
  const { gerenteForcado = null, origemComando = null } = opcoes;
  let tarefaEfetiva = tarefa;
  let gerenteFixado = gerenteForcado;
  let origem = origemComando;

  const comandoGerente = parseGerenteCommand(tarefa);
  if (comandoGerente?.tipo === "ajuda") {
    console.log("\n" + comandoGerente.mensagem + "\n");
    return null;
  }
  if (comandoGerente?.tipo === "tarefa") {
    tarefaEfetiva = comandoGerente.tarefa;
    if (!gerenteFixado && comandoGerente.gerenteForcado) {
      gerenteFixado = comandoGerente.gerenteForcado;
    }
    origem = origem || comandoGerente.origemComando;
  }

  console.log("\n" + "─".repeat(60));
  console.log("🎯 Nova tarefa recebida");
  console.log("─".repeat(60));

  // Limpa o histórico de todos os agentes para a nova tarefa, garantindo isolamento de contexto e economia massiva de tokens!
  Object.keys(historicos).forEach((k) => delete historicos[k]);


  if (!hasAnthropic && !hasGemini) {
    console.log("💡 INFO: Nenhuma API key encontrada no .env. Executando em MODO DEMO interativo e local!");
  } else if (hasGemini) {
    console.log("💡 INFO: Usando modelo Gemini via API!");
  } else {
    console.log("💡 INFO: Usando modelo Claude da Anthropic via API!");
  }

  // 1. Gerar plano V2 e roteamento inicial
  console.log("⏳ Analisando tarefa com Router V2...");
  let executionPlan = createExecutionPlan({ task: tarefaEfetiva, requestedBy: origem || "auto" });
  if (gerenteFixado) {
    executionPlan = aplicarGerenteForcadoNoPlano(executionPlan, gerenteFixado);
  }

  imprimirPlanoExecucao(executionPlan);

  const roteamento = criarRoteamentoDoPlano(executionPlan);
  if (origem) roteamento.motivo = `${roteamento.motivo} | [COMANDO] ${origem}`;

  const projeto = roteamento.projeto || null;
  console.log(`\n📋 Gerente responsável: ${AGENTS[roteamento.gerente].nome} ${projeto ? `| Projeto: ${projeto}` : ""}`);
  console.log(`👥 Agentes envolvidos: ${roteamento.agentes_diretos.join(", ")}`);
  console.log(`💡 Motivo: ${roteamento.motivo}`);

  // 2. Chamar o gerente para planejamento
  console.log(`\n⏳ ${AGENTS[roteamento.gerente].emoji} Gerente planejando...`);
  const planoGerente = await chamarAgente(roteamento.gerente, tarefaEfetiva, {
    usarTools: false, usarMCP: false, injetarMemoria: false, modelType: "fast"
  });

  let plano;
  try {
    plano = extrairJSONRobusto(planoGerente);
    console.log(`\n📌 Plano: ${plano.plano || plano.estrategia || "Execução direta"}`);
  } catch {
    console.log("\n📌 Gerente respondeu (modo livre)");
  }

  // 3. Chamar cada agente necessário
  const resultados = {};
  const allowedToolNames = resolverToolNamesPermitidas(executionPlan);
  for (const agentId of roteamento.agentes_diretos) {
    const agente = AGENTS[agentId];
    if (!agente) continue;

    console.log(`\n${agente.emoji} Chamando ${agente.nome}...`);

    const contextoEnriquecido = `${tarefaEfetiva}
${plano ? `\nContexto do gerente: ${JSON.stringify(plano)}` : ""}
Execution plan Router V2: ${JSON.stringify(executionPlan)}
Execute sua parte da tarefa de forma completa e profissional usando suas ferramentas e memórias.`;

    const resultado = await chamarAgente(agentId, contextoEnriquecido, {
      usarTools: true, usarMCP: true, projeto, injetarMemoria: true, allowedToolNames
    });
    resultados[agentId] = resultado;

    // Registrar Memorização (Pilar 3)
    await memorizar(agentId, tarefaEfetiva, resultado, projeto);
    console.log(`✅ ${agente.nome} concluiu`);
  }

  const revisao = await executarFiscal({ tarefa: tarefaEfetiva, plano: executionPlan, resultados, projeto });
  await executarFallbackSeNecessario({ tarefa: tarefaEfetiva, plano: executionPlan, resultados, projeto, revisao });

  // 4. Consolidar e exibir resultado
  console.log("\n" + "═".repeat(60));
  console.log("📦 RESULTADO FINAL");
  console.log("═".repeat(60) + "\n");

  const resultadosAgentes = Object.entries(resultados).filter(([agentId]) => !agentId.startsWith("__"));

  if (resultadosAgentes.length === 1) {
    const [agentId, resultado] = resultadosAgentes[0];
    console.log(resultado);
  } else {
    for (const [agentId, resultado] of resultadosAgentes) {
      const agente = AGENTS[agentId];
      console.log(`\n${agente.emoji} ${agente.nome.toUpperCase()}`);
      console.log("─".repeat(40));
      console.log(resultado);
    }
  }

  if (resultados.__review) {
    const fiscal = AGENTS[resultados.__review.agent_id];
    console.log(`\n🔎 REVISÃO DO FISCAL (${fiscal?.nome || resultados.__review.agent_id})`);
    console.log("─".repeat(40));
    console.log(resultados.__review.result);
  }

  if (resultados.__fallback) {
    console.log(`\n♻️ Fallback utilizado: ${resultados.__fallback.agent_id}`);
  }

  const arenaRecord = recordArenaRun({ executionPlan, resultados });
  resultados.__arena = {
    record_id: arenaRecord.id,
    score: arenaRecord.metrics.score,
    preferred_model: arenaRecord.preferred_model,
    primary_agent: arenaRecord.primary_agent,
  };
  console.log(`\n🏟️ Arena registrada: score ${arenaRecord.metrics.score} | modelo ${arenaRecord.preferred_model} | agente ${arenaRecord.primary_agent}`);

  const notificationResult = await notifyExecutionComplete({
    tarefa: tarefaEfetiva,
    executionPlan,
    resultados,
    arenaRecord,
  });
  resultados.__notification = notificationResult;
  console.log(`📣 Notificacao registrada: ${notificationResult.channels.map((c) => `${c.channel}:${c.ok ? "ok" : c.skipped ? "skip" : "erro"}`).join(", ")}`);

  // 5. Salvar output
  salvarOutput(tarefaEfetiva, resultados, executionPlan);
  recordRuntimeHeartbeat({
    component: "orchestrator",
    environment: process.env.GERENTE_RUNTIME_ENV || process.env.GERENTE_CLIENT_NAME || "local",
    detail: `execution:${executionPlan.task_id}`,
    metadata: {
      task_id: executionPlan.task_id,
      area: executionPlan.task_brief.area,
      risk: executionPlan.task_brief.risk,
      primary_agent: executionPlan.primary.agent_id,
      preferred_model: executionPlan.model_policy.preferred_model,
    },
  });
  void sendRemoteHeartbeat({
    component: "orchestrator",
    detail: `execution:${executionPlan.task_id}`,
    metadata: {
      task_id: executionPlan.task_id,
      area: executionPlan.task_brief.area,
      risk: executionPlan.task_brief.risk,
      primary_agent: executionPlan.primary.agent_id,
      preferred_model: executionPlan.model_policy.preferred_model,
    },
  });

  return resultados;
}

// ─── MODO DIRETO: falar com um agente específico ──────────────────────────
async function modoAgenteDireto(agentId, mensagem) {
  const agente = AGENTS[agentId];
  if (!agente) {
    console.log(`❌ Agente "${agentId}" não existe.`);
    listarAgentes();
    return;
  }

  console.log(`\n${agente.emoji} Falando diretamente com ${agente.nome}...\n`);
  const resposta = await chamarAgente(agentId, mensagem, {
    usarTools: true, usarMCP: true, injetarMemoria: true
  });
  console.log("─".repeat(60));
  console.log(resposta);
  await memorizar(agentId, mensagem, resposta);
}

// ─── SALVAR LOGS E OUTPUTS ────────────────────────────────────────────────────────
function salvarLog(agentId, pergunta, resposta) {
  const dir = "./logs";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const arquivo = path.join(dir, `${agentId}.log`);
  const linha = `[${new Date().toISOString()}]\nPERGUNTA: ${pergunta}\nRESPOSTA: ${resposta}\n\n`;
  fs.appendFileSync(arquivo, linha);
}

function salvarOutput(tarefa, resultados, executionPlan = null) {
  const dir = "./output";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const arquivo = path.join(dir, `resultado-${timestamp}.json`);
  fs.writeFileSync(arquivo, JSON.stringify({ tarefa, executionPlan, resultados, timestamp: new Date() }, null, 2));
  console.log(`\n💾 Output salvo em: ${arquivo}`);
}

// ─── LISTAR AGENTES ───────────────────────────────────────────────────────
function listarAgentes() {
  console.log("\n👥 AGENTES DISPONÍVEIS:\n");
  for (const [id, agente] of Object.entries(AGENTS)) {
    const tipo = GERENTE_IDS.includes(id) ? "GERENTE" : "agente";
    console.log(`  ${agente.emoji} ${id.padEnd(20)} → ${agente.nome} [${tipo}]`);
  }
}

// ─── MODO INTERATIVO (CHAT) ───────────────────────────────────────────────
async function modoInterativo() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let encerrado = false;

  rl.on("close", () => {
    encerrado = true;
  });

  console.log("\n" + "═".repeat(60));
  console.log("🤖 TIME DE AGENTES — Modo Interativo (v4 Híbrido)");
  console.log("═".repeat(60));
  console.log("Comandos:");
  console.log("  /agentes          → listar todos os agentes");
  console.log("  /mcp              → listar servidores MCP configurados");
  console.log("  /arena [area]     → ranking interno de modelos e agentes");
  console.log("  /memorias [id]    → ver histórico de memórias (Pilar 3)");
  console.log("  /projetos         → ver projetos cadastrados");
  console.log("  /falar <id> <msg> → falar diretamente com um agente");
  console.log("  /gerente ...      → rotear tarefa (auto/produto/negocio)");
  console.log("  /limpar           → limpar histórico de todos");
  console.log("  /sair             → encerrar");
  console.log("  (qualquer texto)  → o orquestrador roteia automaticamente");
  console.log("─".repeat(60));

  const pergunta = () => {
    if (encerrado || rl.closed) return;

    rl.question("\n🧑 Você: ", async (input) => {
      if (encerrado || rl.closed) return;
      const texto = input.trim();
      if (!texto) {
        if (!encerrado) pergunta();
        return;
      }

      if (texto === "/sair") {
        console.log("\n👋 Até logo!\n");
        rl.close();
        return;
      }

      try {
        if (texto === "/agentes") {
          listarAgentes();
          return;
        }

        if (texto === "/mcp") {
          listarServidores();
          return;
        }

        if (texto.startsWith("/arena")) {
          const partes = texto.split(/\s+/);
          const area = partes[1] || null;
          const ranking = buildArenaRanking({ area });
          console.log(`\n🏟️ Arena ${area ? `(${area})` : "(geral)"}`);
          console.log(`Total de runs: ${ranking.total_runs}`);
          console.log("\nModelos:");
          ranking.models.slice(0, 10).forEach((item, idx) => {
            console.log(`  ${idx + 1}. ${item.key} | score ${item.avg_score} | runs ${item.runs} | fallback ${item.fallback_rate}`);
          });
          console.log("\nAgentes:");
          ranking.agents.slice(0, 10).forEach((item, idx) => {
            console.log(`  ${idx + 1}. ${item.key} | score ${item.avg_score} | runs ${item.runs} | lane-block ${item.blocked_tool_rate}`);
          });
          return;
        }

        if (texto === "/limpar") {
          Object.keys(historicos).forEach((k) => delete historicos[k]);
          console.log("✅ Histórico limpo.");
          return;
        }

        if (texto.startsWith("/memorias")) {
          const agentId = texto.split(" ")[1] || null;
          const mems = await listarMemorias(agentId, 15);
          console.log(`\n🧠 Memórias registradas${agentId ? ` para ${agentId}` : ""}:\n`);
          if (!mems.length) {
            console.log("  Nenhuma memória cadastrada ainda.");
          } else {
            mems.forEach(m => {
              const d = new Date(m.criado_em).toLocaleDateString("pt-BR");
              console.log(`  [${m.agent_id}] ${m.titulo} | ${m.tipo} | ⭐${m.importancia} | ${d}`);
            });
          }
          return;
        }

        if (texto === "/projetos") {
          const ps = await listarProjetos();
          console.log("\n📂 Projetos Registrados:\n");
          ps.forEach(p => console.log(`  ${p.nome} — ${p.descricao}`));
          return;
        }

        if (texto.startsWith("/falar ")) {
          const partes = texto.split(" ");
          const agentId = partes[1];
          const mensagem = partes.slice(2).join(" ");
          if (!mensagem) {
            console.log("❌ Use: /falar <id> <mensagem>");
          } else {
            await modoAgenteDireto(agentId, mensagem);
          }
          return;
        }

        if (texto.startsWith("/gerente")) {
          const parsedGerente = parseGerenteCommand(texto);
          if (!parsedGerente || parsedGerente.tipo === "ajuda") {
            console.log("\n" + (parsedGerente?.mensagem || obterAjudaGerente()) + "\n");
          } else {
            await executarTarefa(parsedGerente.tarefa, {
              gerenteForcado: parsedGerente.gerenteForcado,
              origemComando: parsedGerente.origemComando,
            });
          }
          return;
        }

        await executarTarefa(texto);
      } catch (err) {
        console.error("\n❌ Erro:", err.message);
      } finally {
        if (!encerrado && !rl.closed) pergunta();
      }
    });
  };

  pergunta();
}

// ─── ENTRADA PRINCIPAL ────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes("--agentes")) {
  listarAgentes();
} else if (args.includes("--mcp")) {
  listarServidores();
} else if (args.includes("--agent")) {
  const idx = args.indexOf("--agent");
  const agentId = args[idx + 1];
  const mensagem = args.slice(idx + 2).join(" ");
  if (!agentId || !mensagem) {
    console.log("Uso: node orchestrator.js --agent <id> \"<mensagem>\"");
    listarAgentes();
  } else {
    await modoAgenteDireto(agentId, mensagem);
  }
} else {
  await modoInterativo();
}
