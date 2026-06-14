import { createExecutionPlan } from "../router/v2.js";

export function gerenteUsage() {
  return [
    "Use:",
    "/gerente <pergunta ou conversa>",
    "/gerente executar <tarefa>",
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

function normalizeText(value = "") {
  return normalizeToken(value).replace(/[^\p{L}\p{N}\s:/._-]+/gu, " ").replace(/\s+/g, " ").trim();
}

function looksOperational(task = "") {
  const normalized = normalizeText(task);
  return [
    "executar",
    "criar",
    "implementar",
    "corrigir",
    "verificar deploy",
    "verificar webhook",
    "verificar dns",
    "testar",
    "rodar",
    "publicar",
    "fazer deploy",
    "subir",
    "aplicar",
    "alterar",
    "editar",
    "instalar",
    "configurar",
    "migrar",
    "auditar",
    "revisar codigo",
  ].some((term) => normalized.includes(term));
}

function conversationalReply(task = "") {
  const normalized = normalizeText(task);
  if (/(me ouviu|esta me ouvindo|ta me ouvindo|voce me ouviu|esta ouvindo|ouvindo)/.test(normalized)) {
    return "Sim, estou te ouvindo. Pode mandar por texto ou audio começando com Gerente.";
  }
  if (/(esta ok|ta ok|esta pronto|ta pronto|apto|funcionando|online)/.test(normalized)) {
    return "Sim, estou online e pronto para conversar. Quando quiser que eu execute algo, diga: Gerente, executar ...";
  }
  if (/(como eu te chamo|como devo chamar|como chamar|qual comando|como usar)/.test(normalized)) {
    return "Para conversar, comece com Gerente. Para executar uma tarefa, diga Gerente, executar e explique o que precisa.";
  }
  if (/(link|url|endereco).*(projeto|programa|dashboard|gerente)|(?:projeto|programa|dashboard|gerente).*(link|url|endereco)/.test(normalized)) {
    return "O link do gerente em teste é https://gerente.soberano.pro. Esse é o ambiente correto para acompanhar o dashboard e o webhook.";
  }
  if (normalized.includes("?") || /^(qual|quais|como|quando|onde|porque|por que|me explica|explique|confirma|confirme|pode|posso)\b/.test(normalized)) {
    return "Entendi. Posso conversar e tirar dúvidas por aqui. Se você quiser que eu transforme isso em ação, diga: Gerente, executar ...";
  }
  return null;
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
  if (first === "executar" || first === "fazer") {
    const task = args.slice(1).join(" ").trim();
    if (!task) return { type: "help", message: gerenteUsage() };
    return {
      type: "task",
      task,
      manager: null,
      origin: `/gerente ${first}`,
    };
  }

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

  const task = args.join(" ").trim();
  if (looksOperational(task)) {
    return {
      type: "task",
      task,
      manager: null,
      origin: "/gerente",
    };
  }

  return {
    type: "chat",
    message: conversationalReply(task) || "Estou te ouvindo. Pode me perguntar normalmente ou pedir uma ação dizendo: Gerente, executar ...",
    task,
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
  if (parsed.type === "empty" || parsed.type === "help" || parsed.type === "chat") {
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
