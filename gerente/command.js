import { createExecutionPlan } from "../router/v2.js";
import { AGENTS, AGENTE_IDS, GERENTE_IDS } from "../agents/definitions.js";
import { buildAgentInventoryReply, isAgentInventoryQuestion } from "./agent-inventory.js";
import { interpretGerenteWithGemini } from "./gemini-conversation.js";

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

function agentListReply() {
  const managers = GERENTE_IDS.map((id) => `${id}: ${AGENTS[id]?.nome || id}`).join("; ");
  const agents = AGENTE_IDS.map((id) => `${id}: ${AGENTS[id]?.nome || id}`).join("; ");
  return `Agentes disponiveis. Gerentes: ${managers}. Agentes: ${agents}.`;
}

function conversationalReply(task = "") {
  const normalized = normalizeText(task);
  const replies = [];

  if (isAgentInventoryQuestion(task)) {
    return buildAgentInventoryReply();
  }

  if (/(me ouviu|esta me ouvindo|ta me ouvindo|voce me ouviu|esta ouvindo|ouvindo)/.test(normalized)) {
    replies.push("Sim, estou te ouvindo.");
  }
  if (/(esta ok|ta ok|esta pronto|ta pronto|apto|funcionando|online)/.test(normalized)) {
    replies.push("Estou online e pronto para conversar.");
  }
  if (/(como eu te chamo|como devo chamar|como chamar|qual comando|como usar)/.test(normalized)) {
    replies.push("Para conversar, comece com Gerente. Para executar uma tarefa, diga Gerente, executar e explique o que precisa.");
  }
  if (/(lista|lixo|listar|quais|qual).*(agentes|agente)|(?:agentes|agente).*(disponiveis|temos|lista|listar)/.test(normalized)) {
    replies.push(agentListReply());
  }
  if (/(link|url|endereco).*(projeto|programa|dashboard|gerente)|(?:projeto|programa|dashboard|gerente).*(link|url|endereco)/.test(normalized)) {
    replies.push("O link do gerente em teste é https://gerente.soberano.pro. Esse é o ambiente correto para acompanhar o dashboard e o webhook.");
  }
  if (replies.length) return replies.join("\n\n");
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

export async function handleGerenteCommandSmart({ text, project = null, requestedBy = "whatsapp", env = process.env, fetchImpl = fetch }) {
  const parsed = parseGerenteText(text);
  if (parsed.type === "empty" || parsed.type === "help") {
    return { ok: true, kind: parsed.type, message: parsed.message };
  }

  const taskText = String(text || "").replace(/^\/gerente\s*/i, "").trim();
  if (isAgentInventoryQuestion(taskText)) {
    return {
      ok: true,
      kind: "chat",
      message: buildAgentInventoryReply(),
      parsed: { ...parsed, source: "agent_inventory" },
    };
  }

  const firstToken = normalizeToken(String(text || "").trim().split(/\s+/)[1] || "");
  const forcedTask = parsed.type === "task" && ["executar", "fazer", "produto", "negocio"].includes(firstToken);

  if (!forcedTask) {
    const gemini = await interpretGerenteWithGemini({
      text: taskText,
      env,
      fetchImpl,
    }).catch(() => null);

    if (gemini?.kind === "chat" && gemini.message) {
      return {
        ok: true,
        kind: "chat",
        message: gemini.message,
        usage: gemini.usage || null,
        parsed: { ...parsed, source: "gemini" },
      };
    }

    if (gemini?.kind === "task" && gemini.task) {
      const plan = createExecutionPlan({
        task: gemini.task,
        project,
        requestedBy,
      });
      if (gemini.manager) plan.manager = gemini.manager;
      return {
        ok: true,
        kind: "plan",
        parsed: { ...parsed, task: gemini.task, source: "gemini" },
        plan,
        usage: gemini.usage || null,
        message: summarizeExecutionPlan(plan),
      };
    }
  }

  return handleGerenteCommand({ text, project, requestedBy });
}
