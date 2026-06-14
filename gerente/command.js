import { createExecutionPlan } from "../router/v2.js";

export function gerenteUsage() {
  return [
    "Use:",
    "/gerente <tarefa>",
    "/gerente produto <tarefa>",
    "/gerente negocio <tarefa>",
    "/gerente ajuda",
  ].join("\n");
}

function normalizeToken(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function parseGerenteText(text = "") {
  const normalized = String(text || "").trim();
  if (!normalized) return { type: "empty", message: gerenteUsage() };
  if (!normalized.toLowerCase().startsWith("/gerente")) {
    return {
      type: "plain",
      task: normalized,
      manager: null,
      origin: "plain_text",
    };
  }

  const args = normalized.split(/\s+/).slice(1);
  if (!args.length || normalizeToken(args[0]) === "ajuda") {
    return { type: "help", message: gerenteUsage() };
  }

  const first = normalizeToken(args[0]);
  if (first === "produto" || first === "negocio") {
    const task = args.slice(1).join(" ").trim();
    if (!task) return { type: "help", message: gerenteUsage() };
    return {
      type: "task",
      task,
      manager: first === "produto" ? "gerente_produto" : "gerente_negocio",
      origin: `/gerente ${first}`,
    };
  }

  return {
    type: "task",
    task: args.join(" ").trim(),
    manager: null,
    origin: "/gerente",
  };
}

export function summarizeExecutionPlan(plan) {
  return [
    `Plano criado: ${plan.task_id}`,
    `Projeto: ${plan.project}`,
    `Ambiente: ${plan.environment}`,
    `Area: ${plan.task_brief.area}`,
    `Risco: ${plan.task_brief.risk}`,
    `Executor: ${plan.primary.agent_id}`,
    `Fiscal: ${plan.reviewer.agent_id}${plan.reviewer.required ? " obrigatorio" : " opcional"}`,
    `Modelo: ${plan.model_policy.preferred_model}`,
    `Pronto quando: ${plan.done_when.join("; ")}`,
  ].join("\n");
}

export function handleGerenteCommand({ text, project = null, requestedBy = "whatsapp" }) {
  const parsed = parseGerenteText(text);
  if (parsed.type === "empty" || parsed.type === "help") {
    return { ok: true, kind: parsed.type, message: parsed.message };
  }

  const plan = createExecutionPlan({
    task: parsed.task,
    project,
    requestedBy,
  });

  if (parsed.manager) {
    plan.manager = parsed.manager;
  }

  return {
    ok: true,
    kind: "plan",
    parsed,
    plan,
    message: summarizeExecutionPlan(plan),
  };
}
