const COST_SCORE = {
  cheap_first: 1,
  cost_effective: 0.85,
  economical: 0.8,
  balanced: 0.65,
};

const RISK_WEIGHT = {
  low: 0.9,
  medium: 1,
  high: 1.1,
};

function hasUsefulText(value) {
  return typeof value === "string" && value.trim().length > 20;
}

function hasReviewApproval(reviewResult = "") {
  const text = reviewResult.toLowerCase();
  if (text.includes("reprovado") || text.includes("reprovada")) return false;
  if (text.includes("aprovado") || text.includes("aprovada")) return true;
  return null;
}

export function scoreRun({ executionPlan, resultados }) {
  const agentEntries = Object.entries(resultados || {}).filter(([key]) => !key.startsWith("__"));
  const primaryResult = resultados?.[executionPlan.primary.agent_id];
  const review = resultados?.__review?.result || "";
  const reviewApproval = hasReviewApproval(review);
  const fallbackUsed = Boolean(resultados?.__fallback);
  const blockedToolError = agentEntries.some(([, value]) => {
    return String(value || "").includes("fora da lane permitida");
  });

  const completion = hasUsefulText(primaryResult) ? 0.8 : 0.25;
  const reviewScore = reviewApproval === false ? 0.25 : reviewApproval === true ? 1 : 0.7;
  const stability = blockedToolError ? 0.55 : 0.9;
  const fallbackPenalty = fallbackUsed ? 0.15 : 0;
  const cost = COST_SCORE[executionPlan.budget.mode] || 0.7;
  const confidence = executionPlan.reviewer.required ? reviewScore : 0.75;
  const quality = Math.max(0, completion * reviewScore - fallbackPenalty);
  const riskWeight = RISK_WEIGHT[executionPlan.task_brief.risk] || 1;

  const score = Math.max(0, Math.min(1,
    quality * 0.45 +
    confidence * 0.20 +
    stability * 0.15 +
    cost * 0.15 +
    riskWeight * 0.05
  ));

  return {
    score: Number(score.toFixed(4)),
    quality: Number(quality.toFixed(4)),
    confidence: Number(confidence.toFixed(4)),
    stability: Number(stability.toFixed(4)),
    cost: Number(cost.toFixed(4)),
    fallback_used: fallbackUsed,
    blocked_tool_error: blockedToolError,
    review_approval: reviewApproval,
  };
}

export function createArenaRecord({ executionPlan, resultados }) {
  const metrics = scoreRun({ executionPlan, resultados });
  const agentIds = Object.keys(resultados || {}).filter((key) => !key.startsWith("__"));

  return {
    id: `${executionPlan.task_id}_${Date.now()}`,
    created_at: new Date().toISOString(),
    task_id: executionPlan.task_id,
    area: executionPlan.task_brief.area,
    risk: executionPlan.task_brief.risk,
    complexity: executionPlan.task_brief.complexity,
    project: executionPlan.project,
    environment: executionPlan.environment,
    preferred_model: executionPlan.model_policy.preferred_model,
    model_candidates: executionPlan.model_policy.candidates,
    manager: executionPlan.manager,
    primary_agent: executionPlan.primary.agent_id,
    reviewer_agent: executionPlan.reviewer.agent_id,
    reviewer_required: executionPlan.reviewer.required,
    agent_ids: agentIds,
    metrics,
  };
}

