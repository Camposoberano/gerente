// memory/memory.js
// Memória persistente dos agentes - Pilar 3 (Integração Híbrida: Supabase + Local JSON Fallback)

import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

// --- SUPABASE (INICIALIZAÇÃO SOB DEMANDA) ---
let supabase = null;
function getSupabaseClient() {
  const hasSupabase =
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_KEY &&
    process.env.SUPABASE_URL !== "seu_supabase_url_aqui" &&
    process.env.SUPABASE_SERVICE_KEY !== "seu_supabase_key_aqui";

  if (!hasSupabase) return null;
  if (supabase) return supabase;

  try {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  } catch (e) {
    console.log("⚠️  Falha ao inicializar Supabase Client. Usando banco local de fallback.");
    return null;
  }
  return supabase;
}

// --- BANCO LOCAL FALLBACK (Pilar 3 Resiliente) ---
const DEFAULT_LOCAL_MEM_DIR = path.resolve(process.cwd(), ".agents");
const FALLBACK_LOCAL_MEM_DIR = path.resolve(process.env.TEMP || "C:/tmp", "gerente-memory");
const RETRYABLE_FS_ERRORS = new Set(["EPERM", "EACCES", "EBUSY"]);

function diretorioEhGravavel(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    const probeFile = path.join(dirPath, `.probe-${process.pid}-${Date.now()}.tmp`);
    fs.writeFileSync(probeFile, "ok", 'utf8');
    fs.unlinkSync(probeFile);
    return true;
  } catch {
    return false;
  }
}

const LOCAL_MEM_DIR = diretorioEhGravavel(DEFAULT_LOCAL_MEM_DIR)
  ? DEFAULT_LOCAL_MEM_DIR
  : FALLBACK_LOCAL_MEM_DIR;
const LOCAL_MEM_FILE = path.join(LOCAL_MEM_DIR, "memory.json");
const LOCAL_PROJ_FILE = path.join(LOCAL_MEM_DIR, "projects.json");
const LOCAL_MEM_BUFFER_FILE = path.join(LOCAL_MEM_DIR, "memory-buffer.jsonl");

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function lerJSONLocalComFallback(filePath, fallbackValue) {
  if (!fs.existsSync(filePath)) return fallbackValue;
  const raw = fs.readFileSync(filePath, 'utf8');
  if (!raw.trim()) return fallbackValue;
  return JSON.parse(raw);
}

async function salvarJSONLocalComRetry(filePath, data, tentativas = 4) {
  const payload = JSON.stringify(data, null, 2);
  let ultimoErro = null;

  for (let tentativa = 1; tentativa <= tentativas; tentativa++) {
    try {
      fs.writeFileSync(filePath, payload, 'utf8');
      return;
    } catch (err) {
      ultimoErro = err;
      if (!RETRYABLE_FS_ERRORS.has(err.code) || tentativa === tentativas) {
        throw err;
      }
      await esperar(75 * tentativa);
    }
  }

  if (ultimoErro) throw ultimoErro;
}

function bufferizarMemoriaLocal(memoria) {
  const linha = JSON.stringify(memoria);
  fs.appendFileSync(LOCAL_MEM_BUFFER_FILE, `${linha}\n`, 'utf8');
}

function carregarMemoriasLocais() {
  const principais = lerJSONLocalComFallback(LOCAL_MEM_FILE, []);
  if (!fs.existsSync(LOCAL_MEM_BUFFER_FILE)) return principais;

  const raw = fs.readFileSync(LOCAL_MEM_BUFFER_FILE, 'utf8').trim();
  if (!raw) return principais;

  const bufferizadas = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return [...principais, ...bufferizadas];
}

function inicializarBancoLocal() {
  try {
    if (LOCAL_MEM_DIR !== DEFAULT_LOCAL_MEM_DIR) {
      console.warn(`  ⚠️  Pasta .agents indisponível para escrita. Usando fallback local em: ${LOCAL_MEM_DIR}`);
    }
    if (!fs.existsSync(LOCAL_MEM_DIR)) {
      fs.mkdirSync(LOCAL_MEM_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_MEM_FILE)) {
      fs.writeFileSync(LOCAL_MEM_FILE, JSON.stringify([], null, 2), 'utf8');
    }
    if (!fs.existsSync(LOCAL_PROJ_FILE)) {
      // Projetos mock iniciais da migração
      const projetosIniciais = [
        {
          nome: 'dental-jua',
          descricao: 'Catálogo interativo e atendimento WhatsApp para estudantes da Unileão',
          stack: { frontend: "React/HTML", backend: "n8n + Node.js", db: "Supabase", whatsapp: "Evolution API" },
          notas: 'Agente Alice no WhatsApp. Produtos por semestre. Redis para debounce. PDF Blindado V5.',
          ativo: true
        },
        {
          nome: 'multipost',
          descricao: 'Plataforma de microserviços para publicação em múltiplas redes sociais',
          stack: { infra: "Docker Swarm + Traefik", backend: "Node.js", storage: "Cloudflare R2", db: "Supabase" },
          notas: 'Deployado em VPS. Portainer para gerenciamento. Traefik com SSL automático.',
          ativo: true
        }
      ];
      fs.writeFileSync(LOCAL_PROJ_FILE, JSON.stringify(projetosIniciais, null, 2), 'utf8');
    }
  } catch (err) {
    console.error("  ⚠️  Falha ao inicializar memória local:", err.message);
  }
}
inicializarBancoLocal();

// ─── SALVAR UMA MEMÓRIA ───────────────────────────────────────────────────
export async function salvarMemoria({
  agentId,
  tipo = "tarefa",         // "tarefa" | "projeto" | "padrao" | "erro" | "decisao"
  titulo,
  conteudo,
  tags = [],
  projeto = null,
  importancia = 5,
}) {
  const supabaseClient = getSupabaseClient();
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("agent_memories")
        .insert({
          agent_id: agentId,
          tipo,
          titulo,
          conteudo,
          tags,
          projeto,
          importancia,
        })
        .select()
        .single();

      if (error) throw error;
      return { sucesso: true, id: data.id };
    } catch (err) {
      console.error("  ⚠️  Erro no Supabase ao salvar memória. Salvando localmente:", err.message);
    }
  }

  // Fallback Local (JSON)
  try {
    const mems = lerJSONLocalComFallback(LOCAL_MEM_FILE, []);
    const novaMemoria = {
      id: Math.random().toString(36).substring(2, 15),
      agent_id: agentId,
      tipo,
      titulo,
      conteudo,
      tags,
      projeto,
      importancia,
      criado_em: new Date().toISOString()
    };
    mems.push(novaMemoria);
    await salvarJSONLocalComRetry(LOCAL_MEM_FILE, mems);
    return { sucesso: true, id: novaMemoria.id };
  } catch (err) {
    if (RETRYABLE_FS_ERRORS.has(err.code)) {
      try {
        const memoriaBuffer = {
          id: Math.random().toString(36).substring(2, 15),
          agent_id: agentId,
          tipo,
          titulo,
          conteudo,
          tags,
          projeto,
          importancia,
          criado_em: new Date().toISOString(),
          buffered: true
        };
        bufferizarMemoriaLocal(memoriaBuffer);
        console.warn("  ⚠️  Memória local principal indisponível no momento. Registro enviado para buffer.");
        return { sucesso: true, id: memoriaBuffer.id, buffered: true };
      } catch (bufferErr) {
        console.error("  ⚠️  Falha ao bufferizar memória local:", bufferErr.message);
      }
    }
    console.error("  ⚠️  Erro fatal no banco local de memórias:", err.message);
    return { sucesso: false, erro: err.message };
  }
}

// ─── BUSCAR MEMÓRIAS RELEVANTES ───────────────────────────────────────────
export async function buscarMemorias({
  agentId = null,
  query = "",
  projeto = null,
  tipo = null,
  limite = 5,
}) {
  const supabaseClient = getSupabaseClient();
  if (supabaseClient) {
    try {
      let q = supabaseClient
        .from("agent_memories")
        .select("id, agent_id, tipo, titulo, conteudo, tags, projeto, importancia, criado_em")
        .order("importancia", { ascending: false })
        .order("criado_em", { ascending: false })
        .limit(limite);

      if (agentId) q = q.eq("agent_id", agentId);
      if (projeto)  q = q.eq("projeto", projeto);
      if (tipo)     q = q.eq("tipo", tipo);

      if (query) {
        q = q.or(`titulo.ilike.%${query}%,conteudo.ilike.%${query}%`);
      }

      const { data, error } = await q;
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("  ⚠️  Erro no Supabase ao buscar memórias. Buscando localmente:", err.message);
    }
  }

  // Fallback Local (JSON)
  try {
    const mems = carregarMemoriasLocais();
    let filtradas = mems;

    if (agentId) filtradas = filtradas.filter(m => m.agent_id === agentId);
    if (projeto) filtradas = filtradas.filter(m => m.projeto === projeto);
    if (tipo) filtradas = filtradas.filter(m => m.tipo === tipo);

    if (query) {
      const termos = query.toLowerCase().split(/\s+/);
      filtradas = filtradas.filter(m => {
        const text = `${m.titulo} ${m.conteudo} ${m.tags.join(" ")}`.toLowerCase();
        return termos.some(t => text.includes(t));
      });
    }

    // Ordenação (Importância desc, Criado desc)
    filtradas.sort((a, b) => {
      if (b.importancia !== a.importancia) {
        return b.importancia - a.importancia;
      }
      return new Date(b.criado_em) - new Date(a.criado_em);
    });

    return filtradas.slice(0, limite);
  } catch (err) {
    console.error("  ⚠️  Erro ao carregar banco local de memórias:", err.message);
    return [];
  }
}

// ─── BUSCAR CONTEXTO DE PROJETOS ─────────────────────────────────────────
export async function buscarProjeto(nome) {
  const supabaseClient = getSupabaseClient();
  if (supabaseClient) {
    try {
      const { data } = await supabaseClient
        .from("agent_projects")
        .select("*")
        .eq("nome", nome)
        .single();
      if (data) return data;
    } catch {}
  }

  try {
    const projs = lerJSONLocalComFallback(LOCAL_PROJ_FILE, []);
    return projs.find(p => p.nome.toLowerCase() === nome.toLowerCase()) || null;
  } catch {
    return null;
  }
}

export async function listarProjetos() {
  const supabaseClient = getSupabaseClient();
  if (supabaseClient) {
    try {
      const { data } = await supabaseClient
        .from("agent_projects")
        .select("nome, descricao, stack")
        .eq("ativo", true)
        .order("nome");
      if (data) return data;
    } catch {}
  }

  try {
    return lerJSONLocalComFallback(LOCAL_PROJ_FILE, []).filter(p => p.ativo);
  } catch {
    return [];
  }
}

// ─── RESUMIR E SALVAR APÓS UMA TAREFA ────────────────────────────────────
export async function memorizar(agentId, tarefa, resultado, projeto = null) {
  try {
    const rawAnthropicKey = process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.trim() : '';
    const rawGeminiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';

    const hasAnthropic = rawAnthropicKey && rawAnthropicKey !== 'sua_chave_aqui';
    const hasGemini = rawGeminiKey && rawGeminiKey !== 'sua_chave_aqui';
    const hasAI = hasAnthropic || hasGemini;
    
    let titulo = `Tarefa concluída por ${agentId}`;
    let tags = [agentId];
    let conteudo = resultado.slice(0, 1000);
    let tipo = "tarefa";
    let importancia = 5;

    if (hasAI) {
      try {
        let texto = "";
        const promptResumo = `Você é um sistema de memória. Analise a tarefa e resultado abaixo e gere um resumo estruturado para salvar como memória futura.
Responda APENAS em JSON no seguinte formato (sem blocos de código ou markdown):
{
  "titulo": "Resumo curto em uma linha (max 80 chars)",
  "tipo": "tarefa" | "padrao" | "decisao" | "erro",
  "tags": ["tag1", "tag2", "tag3"],
  "conteudo": "Resumo detalhado do que foi feito, decisões tomadas, código criado ou problemas resolvidos. Seja específico e útil para sessões futuras.",
  "importancia": 7
}

Agente: ${agentId}
Tarefa: ${tarefa}
Resultado (primeiros 2000 chars): ${resultado.slice(0, 2000)}`;

        if (hasGemini) {
          try {
            // Usa Gemini Flash atual para resumo estruturado de memória.
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${rawGeminiKey}`;
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: promptResumo }] }],
                generationConfig: { maxOutputTokens: 800 }
              })
            });
            
            if (res.ok) {
              const data = await res.json();
              if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                texto = data.candidates[0].content.parts[0].text;
              }
            } else {
              console.log(`  ⚠️  Gemini falhou ao resumir: Status ${res.status}`);
            }
          } catch (geminiErr) {
            console.log(`  ⚠️  Erro na chamada do Gemini: ${geminiErr.message}`);
          }
        }
        
        // Se Gemini não respondeu ou não está ativo, tenta o Claude
        if (!texto && hasAnthropic) {
          try {
            const client = new Anthropic({ apiKey: rawAnthropicKey });
            const r = await client.messages.create({
              model: "claude-sonnet-4-6",
              max_tokens: 800,
              messages: [{ role: "user", content: promptResumo }],
            });
            texto = r.content[0].text;
          } catch (anthropicErr) {
            console.log(`  ⚠️  Anthropic falhou ao resumir: ${anthropicErr.message}`);
          }
        }

        if (texto) {
          const clean = texto.trim().replace(/```json|```/g, "").trim();
          const resumo = JSON.parse(clean);
          
          titulo = resumo.titulo || titulo;
          tipo = resumo.tipo || "tarefa";
          tags = resumo.tags || [];
          conteudo = resumo.conteudo || conteudo;
          importancia = resumo.importancia || 5;
        }
      } catch (e) {
        // Fallback em caso de falha de IA
        console.log("  ⚠️  Falha ao gerar resumo dinâmico via IA. Usando resumo estático.");
      }
    }

    const resultado_salvar = await salvarMemoria({
      agentId,
      tipo,
      titulo,
      conteudo,
      tags,
      projeto,
      importancia,
    });

    if (resultado_salvar.sucesso) {
      console.log(`  🧠 Memória salva com sucesso: "${titulo}"`);
    }
    return resultado_salvar;
  } catch (err) {
    console.error("  ⚠️  Erro ao registrar memorização:", err.message);
    return { sucesso: false };
  }
}


// ─── CONSTRUIR CONTEXTO DE MEMÓRIA PARA O AGENTE ─────────────────────────
export async function construirContextoMemoria(agentId, tarefa, projeto = null) {
  const memorias = await buscarMemorias({
    agentId,
    query: extrairPalavrasChave(tarefa),
    projeto,
    limite: 4,
  });

  const memoriasProjeto = projeto
    ? await buscarMemorias({ query: projeto, limite: 2 })
    : [];

  const infoProject = projeto ? await buscarProjeto(projeto) : null;
  const todasMemorias = deduplicar([...memorias, ...memoriasProjeto]);

  if (todasMemorias.length === 0 && !infoProject) return "";

  let contexto = "\n\n─── MEMÓRIA DOS AGENTES ───\n";

  if (infoProject) {
    contexto += `\nPROJETO ATIVO: ${infoProject.nome}\n`;
    contexto += `Descrição: ${infoProject.descricao}\n`;
    contexto += `Stack Técnica: ${JSON.stringify(infoProject.stack)}\n`;
    if (infoProject.notas) contexto += `Notas operacionais: ${infoProject.notas}\n`;
  }

  if (todasMemorias.length > 0) {
    contexto += `\nEXPERIÊNCIAS E TAREFAS ANTERIORES RELEVANTES:\n`;
    for (const m of todasMemorias) {
      contexto += `\n[${m.tipo.toUpperCase()}] ${m.titulo}\n`;
      contexto += `${m.conteudo.slice(0, 450)}${m.conteudo.length > 450 ? "..." : ""}\n`;
      if (m.tags?.length) contexto += `Tags: ${m.tags.join(", ")}\n`;
    }
  }

  contexto += "\n─── FIM DA MEMÓRIA ───\n";
  return contexto;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────
function extrairPalavrasChave(texto) {
  const stopwords = new Set([
    "crie", "faça", "me", "o", "a", "os", "as", "um", "uma", "para",
    "com", "de", "do", "da", "em", "no", "na", "que", "e", "é", "por",
    "como", "se", "ao", "à", "este", "esta", "isso", "aqui", "quero",
    "preciso", "pode", "adicione", "implemente", "desenvolva",
  ]);
  return texto
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !stopwords.has(w))
    .slice(0, 5)
    .join(" ");
}

function deduplicar(memorias) {
  const vistos = new Set();
  return memorias.filter((m) => {
    if (vistos.has(m.id)) return false;
    vistos.add(m.id);
    return true;
  });
}

// ─── LISTAR MEMÓRIAS (Pilar 3) ───────────────────────────────────────────
export async function listarMemorias(agentId = null, limite = 20) {
  const supabaseClient = getSupabaseClient();
  if (supabaseClient) {
    try {
      let q = supabaseClient
        .from("agent_memories")
        .select("id, agent_id, tipo, titulo, tags, importancia, criado_em")
        .order("criado_em", { ascending: false })
        .limit(limite);

      if (agentId) q = q.eq("agent_id", agentId);

      const { data } = await q;
      return data || [];
    } catch {}
  }

  // Fallback Local (JSON)
  try {
    const mems = carregarMemoriasLocais();
    let filtradas = mems;
    if (agentId) filtradas = filtradas.filter(m => m.agent_id === agentId);
    
    filtradas.sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));
    return filtradas.slice(0, limite);
  } catch {
    return [];
  }
}
