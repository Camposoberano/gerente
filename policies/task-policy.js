const AREA_KEYWORDS = [
  {
    area: "frontend_visual",
    keywords: ["frontend", "ui", "ux", "layout", "landing", "site", "pagina", "design", "visual", "css", "react"],
  },
  {
    area: "code",
    keywords: ["codigo", "bug", "corrigir", "implementar", "refatorar", "api", "backend", "script", "node"],
  },
  {
    area: "infra",
    keywords: ["deploy", "portainer", "vps", "docker", "coolify", "traefik", "proxy", "dns", "ssl", "servidor"],
  },
  {
    area: "data",
    keywords: ["supabase", "postgres", "sql", "banco", "tabela", "rls", "migration", "migracao", "schema"],
  },
  {
    area: "automation",
    keywords: ["n8n", "automacao", "webhook", "whatsapp", "evolution", "cron", "fila", "integração", "integracao"],
  },
  {
    area: "security",
    keywords: ["seguranca", "senha", "secret", "token", "lgpd", "permissao", "auth", "vazamento"],
  },
  {
    area: "content",
    keywords: ["copy", "texto", "conteudo", "seo", "email", "headline", "prompt", "documento"],
  },
  {
    area: "review",
    keywords: ["revisar", "review", "auditar", "validar", "fiscal", "testar", "qa"],
  },
  {
    area: "ops",
    keywords: ["status", "monitorar", "log", "health", "erro", "alerta", "relatorio"],
  },
];

const HIGH_RISK_KEYWORDS = [
  "producao",
  "produção",
  "deploy",
  "delete",
  "excluir",
  "apagar",
  "drop",
  "truncate",
  "secret",
  "senha",
  "token",
  "dns",
  "ssl",
  "pagamento",
  "stripe",
  "rls",
  "migration",
  "migracao",
];

const MEDIUM_RISK_KEYWORDS = [
  "banco",
  "api",
  "webhook",
  "docker",
  "portainer",
  "supabase",
  "github",
  "auth",
  "login",
  "cliente",
];

export function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function classifyArea(taskText) {
  const normalized = normalizeText(taskText);
  const scores = AREA_KEYWORDS.map((entry) => ({
    area: entry.area,
    score: entry.keywords.reduce((total, keyword) => {
      return total + (normalized.includes(normalizeText(keyword)) ? 1 : 0);
    }, 0),
  })).sort((a, b) => b.score - a.score);

  return scores[0]?.score > 0 ? scores[0].area : "ops";
}

export function classifyRisk(taskText) {
  const normalized = normalizeText(taskText);
  if (HIGH_RISK_KEYWORDS.some((keyword) => normalized.includes(normalizeText(keyword)))) {
    return "high";
  }
  if (MEDIUM_RISK_KEYWORDS.some((keyword) => normalized.includes(normalizeText(keyword)))) {
    return "medium";
  }
  return "low";
}

export function classifyComplexity(taskText) {
  const normalized = normalizeText(taskText);
  const words = normalized.split(/\s+/).filter(Boolean).length;
  const complexSignals = ["arquitetura", "varios", "vários", "integrar", "migrar", "orquestrar", "dashboard", "sistema"];
  const signalCount = complexSignals.reduce((total, signal) => {
    return total + (normalized.includes(normalizeText(signal)) ? 1 : 0);
  }, 0);

  if (words > 45 || signalCount >= 2) return "high";
  if (words > 18 || signalCount === 1) return "medium";
  return "low";
}

export function resolveBudget({ area, risk, complexity }) {
  if (risk === "high" || complexity === "high") {
    return {
      mode: "balanced",
      max_model_tier: "strong",
      require_cost_reason: true,
    };
  }

  if (risk === "medium" || complexity === "medium") {
    return {
      mode: "economical",
      max_model_tier: "efficient",
      require_cost_reason: false,
    };
  }

  if (["frontend_visual", "content"].includes(area)) {
    return {
      mode: "cost_effective",
      max_model_tier: "efficient",
      require_cost_reason: false,
    };
  }

  return {
    mode: "cheap_first",
    max_model_tier: "cheap",
    require_cost_reason: false,
  };
}
