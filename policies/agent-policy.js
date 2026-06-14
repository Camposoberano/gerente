const AREA_AGENT_MAP = {
  frontend_visual: {
    manager: "gerente_produto",
    primary: "frontend",
    reviewer: "qa",
    fallback: ["docs", "backend"],
  },
  code: {
    manager: "gerente_produto",
    primary: "backend",
    reviewer: "qa",
    fallback: ["frontend", "infra"],
  },
  infra: {
    manager: "gerente_produto",
    primary: "infra",
    reviewer: "qa",
    fallback: ["backend", "docs"],
  },
  data: {
    manager: "gerente_produto",
    primary: "backend",
    reviewer: "seguranca",
    fallback: ["infra", "qa"],
  },
  automation: {
    manager: "gerente_produto",
    primary: "backend",
    reviewer: "qa",
    fallback: ["infra", "docs"],
  },
  security: {
    manager: "gerente_negocio",
    primary: "seguranca",
    reviewer: "qa",
    fallback: ["backend", "infra"],
  },
  content: {
    manager: "gerente_negocio",
    primary: "marketing",
    reviewer: "seo",
    fallback: ["docs", "analytics"],
  },
  review: {
    manager: "gerente_produto",
    primary: "qa",
    reviewer: "seguranca",
    fallback: ["docs", "backend"],
  },
  ops: {
    manager: "gerente_produto",
    primary: "infra",
    reviewer: "qa",
    fallback: ["docs", "backend"],
  },
};

const HIGH_RISK_TOOLS = ["database_write", "deploy", "secret_write", "dns_write", "delete"];

export function resolveAgentPlan(area, risk) {
  const base = AREA_AGENT_MAP[area] || AREA_AGENT_MAP.ops;
  const reviewRequired = risk !== "low";

  return {
    manager: base.manager,
    primary: {
      agent_id: base.primary,
      role: "executor",
    },
    reviewer: reviewRequired
      ? {
          agent_id: base.reviewer,
          role: "fiscal",
          required: true,
        }
      : {
          agent_id: base.reviewer,
          role: "fiscal",
          required: false,
        },
    fallback: base.fallback.map((agentId) => ({
      agent_id: agentId,
      trigger: "primary_blocked_or_review_failed",
    })),
  };
}

export function resolveToolPolicy({ area, risk }) {
  const allowed = ["read", "search", "status", "logs", "plan"];
  const blocked = [];

  if (["code", "frontend_visual", "content"].includes(area)) {
    allowed.push("file_write", "test");
  }

  if (["infra", "ops", "automation"].includes(area)) {
    allowed.push("health_check", "api_test", "container_read");
  }

  if (area === "data") {
    allowed.push("database_read", "migration_plan");
  }

  if (risk === "high") {
    blocked.push(...HIGH_RISK_TOOLS);
  }

  return {
    allowed_tools: [...new Set(allowed)],
    blocked_tools: [...new Set(blocked)],
  };
}

