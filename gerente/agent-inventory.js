import { AGENTS, AGENT_IDS } from "../agents/definitions.js";

const MODEL_COSTS_USD_PER_1M = {
  local_rules: {
    label: "Regras locais",
    input: 0,
    output: 0,
    note: "sem chamada de LLM",
  },
  codex_exec: {
    label: "GPT-4.1 Mini / Codex",
    input: 0.40,
    output: 1.60,
    note: "preco por 1M tokens",
  },
  claude_arch: {
    label: "Claude Sonnet 4.6",
    input: 3.00,
    output: 15.00,
    note: "preco por 1M tokens",
  },
  gemini_conversation: {
    label: "Gemini 2.5 Flash",
    input: 0.30,
    output: 2.50,
    note: "preco por 1M tokens; camada de conversa usa Gemini",
  },
  gemini_visual: {
    label: "Gemini 2.5 Flash",
    input: 0.30,
    output: 2.50,
    note: "preco por 1M tokens",
  },
  groq_fast: {
    label: "Groq Llama 3.3 70B Versatile",
    input: 0.59,
    output: 0.79,
    note: "preco por 1M tokens",
  },
  grok_research: {
    label: "xAI Grok 4.3",
    input: 1.25,
    output: 2.50,
    note: "preco por 1M tokens",
  },
  openrouter_free: {
    label: "OpenRouter modelos gratuitos",
    input: 0,
    output: 0,
    note: "free tier/modelos :free, sujeito a limite",
  },
  openrouter_efficient: {
    label: "OpenRouter Qwen/Gemini eficiente",
    input: 1.25,
    output: 3.75,
    note: "referencia interna para Qwen 3.7 Plus; confirmar no OpenRouter antes de alto volume",
  },
};

const AGENT_MODEL_MAP = {
  gerente_produto: "claude_arch",
  gerente_negocio: "gemini_conversation",
  frontend: "gemini_visual",
  backend: "codex_exec",
  infra: "codex_exec",
  qa: "codex_exec",
  docs: "gemini_conversation",
  github_triagem: "openrouter_efficient",
  github_reviews: "codex_exec",
  github_ci: "codex_exec",
  release_ops: "openrouter_efficient",
  marketing: "gemini_conversation",
  seo: "openrouter_free",
  analytics: "openrouter_efficient",
  seguranca: "claude_arch",
  performance: "groq_fast",
  runner_portainer: "codex_exec",
  runner_supabase: "codex_exec",
  runner_vps: "codex_exec",
  runner_coolify: "codex_exec",
  runner_whatsapp: "groq_fast",
  observability: "groq_fast",
  approval_gate: "local_rules",
  model_arena: "openrouter_efficient",
  cost_guard: "local_rules",
  secrets_guard: "local_rules",
  browser_qa: "gemini_visual",
  voice_interface: "gemini_conversation",
};

const FUNCTION_SUMMARY = {
  gerente_produto: "coordena produto, desenvolvimento, agentes tecnicos, PRs, CI e releases",
  gerente_negocio: "coordena negocio, marketing, SEO, analytics, seguranca e performance",
  frontend: "cria e revisa UI, UX, React, CSS, landing pages e experiencia visual",
  backend: "implementa APIs, automacoes, webhooks, Node, Supabase e integracoes",
  infra: "cuida de Docker, VPS, Coolify, Portainer, Traefik, DNS e deploy",
  qa: "testa, encontra bugs, valida fluxos e revisa qualidade",
  docs: "gera documentacao, guias, checklists, README e arquitetura",
  github_triagem: "organiza issues, PRs, prioridades, labels e proximos passos",
  github_reviews: "responde reviews de PR e planeja correcoes por arquivo",
  github_ci: "diagnostica e corrige falhas de GitHub Actions e pipelines",
  release_ops: "prepara release, changelog, checklist de publicacao e rollback",
  marketing: "faz copy, funil, oferta, posicionamento e conversao",
  seo: "cuida de SEO tecnico, conteudo, palavras-chave e intencao de busca",
  analytics: "define eventos, metricas, dashboards, GA4, GTM e ROI",
  seguranca: "revisa LGPD, auth, segredos, tokens, headers e riscos",
  performance: "otimiza velocidade, Core Web Vitals, cache, queries e bundle",
  runner_portainer: "le stacks, containers, logs e health no Portainer",
  runner_supabase: "le schemas, planeja migrations, queries e RLS",
  runner_vps: "diagnostica VPS, servicos, portas, disco, CPU, memoria e firewall",
  runner_coolify: "verifica deploys, logs, dominios, variaveis e health no Coolify",
  runner_whatsapp: "diagnostica Uazapi/WhatsApp, webhooks, entrega e mensagens",
  observability: "cuida de Sentry, Uptime Kuma, logs, metricas e alertas",
  approval_gate: "bloqueia acoes de risco ate aprovacao explicita",
  model_arena: "compara modelos por custo, qualidade, latencia e fallback",
  cost_guard: "controla custo de LLMs e evita uso desnecessario de modelos caros",
  secrets_guard: "protege segredos e impede vazamento de tokens e chaves",
  browser_qa: "testa dashboards e interfaces no navegador",
  voice_interface: "entende audio, transcreve comandos e resume status no WhatsApp",
};

function money(value) {
  return `US$${Number(value).toFixed(2)}`;
}

export function isAgentInventoryQuestion(text = "") {
  const normalized = String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return /(agente|agentes)/.test(normalized)
    && /(llm|modelo|modelos|custo|token|tokens|funcao|função|principal)/.test(normalized);
}

export function buildAgentInventoryReply() {
  const lines = [
    "Inventario dos agentes principais:",
    "Formato: agente | LLM principal | funcao | custo por 1M tokens (entrada/saida).",
  ];

  for (const id of AGENT_IDS) {
    const agent = AGENTS[id];
    const modelKey = AGENT_MODEL_MAP[id] || "openrouter_efficient";
    const model = MODEL_COSTS_USD_PER_1M[modelKey] || MODEL_COSTS_USD_PER_1M.openrouter_efficient;
    lines.push(
      `- ${id} (${agent?.nome || id}) | ${model.label} | ${FUNCTION_SUMMARY[id] || "funcao especializada do gerente"} | ${money(model.input)} entrada / ${money(model.output)} saida.`
    );
  }

  lines.push("Observacao: custos sao referencia por 1M tokens e podem mudar por provedor; para alto volume, confirmar no catalogo antes de executar.");
  return lines.join("\n");
}
