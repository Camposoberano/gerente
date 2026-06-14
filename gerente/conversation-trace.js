import { AGENTS } from "../agents/definitions.js";
import { MODEL_PROFILES } from "../providers/model-registry.js";

const SOURCE_MODEL = {
  gemini: {
    agent_id: "voice_interface",
    llm_id: "gemini_conversation",
    llm_label: "Gemini 2.5 Flash",
  },
  agent_inventory: {
    agent_id: "model_arena",
    llm_id: "local_rules",
    llm_label: "Regras locais",
  },
};

function modelLabel(modelId) {
  if (!modelId) return null;
  return MODEL_PROFILES[modelId]?.label || modelId;
}

export function buildConversationTrace(result = {}) {
  if (result.plan) {
    const agentId = result.plan.primary?.agent_id || null;
    const modelId = result.plan.model_policy?.preferred_model || null;
    return {
      agent_id: agentId,
      agent_name: agentId ? AGENTS[agentId]?.nome || agentId : null,
      llm_id: modelId,
      llm_label: modelLabel(modelId),
      response_source: "execution_plan",
    };
  }

  const source = result.parsed?.source || "local_rules";
  const mapped = SOURCE_MODEL[source] || {
    agent_id: "voice_interface",
    llm_id: "local_rules",
    llm_label: "Regras locais",
  };
  const agentId = mapped.agent_id;

  return {
    agent_id: agentId,
    agent_name: agentId ? AGENTS[agentId]?.nome || agentId : null,
    llm_id: mapped.llm_id,
    llm_label: mapped.llm_label || modelLabel(mapped.llm_id),
    response_source: source,
  };
}
