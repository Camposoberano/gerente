export const MODEL_PROFILES = {
  codex_exec: {
    label: "Codex/GPT para codigo",
    best_for: ["code", "review", "ops"],
    tier: "strong",
    cost_profile: "medium",
  },
  claude_arch: {
    label: "Claude para arquitetura e raciocinio longo",
    best_for: ["architecture", "review", "security"],
    tier: "elite",
    cost_profile: "high",
  },
  gemini_visual: {
    label: "Gemini para visual, texto e multimodal",
    best_for: ["frontend_visual", "content", "vision"],
    tier: "efficient",
    cost_profile: "medium",
  },
  grok_research: {
    label: "Grok para pesquisa e alternativas",
    best_for: ["research", "ops", "content"],
    tier: "efficient",
    cost_profile: "medium",
  },
  groq_fast: {
    label: "Groq para classificacao rapida",
    best_for: ["classification", "summaries", "routing"],
    tier: "cheap",
    cost_profile: "low",
  },
  openrouter_free: {
    label: "OpenRouter modelos gratuitos para tarefas simples",
    best_for: ["summaries", "notifications", "routing", "simple_ops", "simple_content"],
    tier: "free",
    cost_profile: "free",
    models: [
      "openai/gpt-oss-20b:free",
      "google/gemma-4-31b-it:free",
      "openai/gpt-oss-120b:free",
      "openrouter/free",
    ],
  },
  openrouter_efficient: {
    label: "OpenRouter Qwen/Gemini de baixo custo",
    best_for: ["fallback", "comparison", "multi_model", "code", "content"],
    tier: "efficient",
    cost_profile: "low",
    models: [
      "qwen/qwen3.7-plus",
      "~openai/gpt-mini-latest",
      "google/gemini-3.5-flash",
    ],
  },
};

const AREA_MODEL_MAP = {
  frontend_visual: ["gemini_visual", "openrouter_efficient", "codex_exec", "claude_arch"],
  code: ["codex_exec", "openrouter_efficient", "claude_arch", "groq_fast"],
  infra: ["codex_exec", "openrouter_efficient", "claude_arch", "groq_fast"],
  data: ["codex_exec", "openrouter_efficient", "claude_arch", "groq_fast"],
  automation: ["openrouter_free", "groq_fast", "codex_exec", "gemini_visual"],
  security: ["claude_arch", "codex_exec", "groq_fast"],
  content: ["openrouter_free", "gemini_visual", "grok_research", "groq_fast"],
  review: ["codex_exec", "openrouter_efficient", "claude_arch", "groq_fast"],
  ops: ["openrouter_free", "groq_fast", "codex_exec", "grok_research"],
};

const TIER_RANK = {
  free: 0,
  cheap: 1,
  efficient: 2,
  strong: 3,
  elite: 4,
};

function filterByTier(candidates, maxTier) {
  const maxRank = TIER_RANK[maxTier] ?? TIER_RANK.strong;
  return candidates.filter((id) => {
    const tier = MODEL_PROFILES[id]?.tier || "strong";
    return (TIER_RANK[tier] ?? TIER_RANK.strong) <= maxRank;
  });
}

export function resolveModelPolicy({ area, risk, budget }) {
  const candidates = AREA_MODEL_MAP[area] || AREA_MODEL_MAP.ops;
  const budgetCandidates = filterByTier(candidates, budget.max_model_tier);
  const allowedCandidates = budgetCandidates.length ? budgetCandidates : candidates;
  const preferred = risk === "high"
    ? allowedCandidates.find((id) => MODEL_PROFILES[id]?.tier !== "cheap") || allowedCandidates[0]
    : allowedCandidates[0];

  return {
    preferred_model: preferred,
    candidates: allowedCandidates,
    excluded_by_budget: candidates.filter((id) => !allowedCandidates.includes(id)),
    budget_mode: budget.mode,
    max_model_tier: budget.max_model_tier,
    escalation_rule: "usar modelo superior somente se risco alto, fiscal reprovar ou executor travar",
  };
}
