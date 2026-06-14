import { recordNotification } from "./store.js";
import { sendWhatsAppGoMessage, whatsappGoConfigured } from "./whatsapp-go.js";

function compactText(value, max = 700) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

export function buildExecutionNotification({ tarefa, executionPlan, resultados, arenaRecord }) {
  const review = resultados?.__review?.result ? compactText(resultados.__review.result, 220) : null;
  const fallback = resultados?.__fallback?.agent_id || null;

  return {
    type: "execution_complete",
    title: `Gerente concluiu: ${executionPlan.task_brief.area}`,
    severity: executionPlan.task_brief.risk === "high" ? "warning" : "info",
    task_id: executionPlan.task_id,
    project: executionPlan.project,
    environment: executionPlan.environment,
    area: executionPlan.task_brief.area,
    risk: executionPlan.task_brief.risk,
    primary_agent: executionPlan.primary.agent_id,
    reviewer_agent: executionPlan.reviewer.agent_id,
    reviewer_required: executionPlan.reviewer.required,
    preferred_model: executionPlan.model_policy.preferred_model,
    score: arenaRecord?.metrics?.score ?? null,
    fallback,
    message: [
      `Tarefa: ${compactText(tarefa, 180)}`,
      `Area: ${executionPlan.task_brief.area} | Risco: ${executionPlan.task_brief.risk}`,
      `Executor: ${executionPlan.primary.agent_id} | Fiscal: ${executionPlan.reviewer.agent_id}${executionPlan.reviewer.required ? " obrigatorio" : " opcional"}`,
      `Modelo: ${executionPlan.model_policy.preferred_model}${arenaRecord?.metrics?.score !== undefined ? ` | Score: ${arenaRecord.metrics.score}` : ""}`,
      fallback ? `Fallback: ${fallback}` : null,
      review ? `Fiscal: ${review}` : null,
    ].filter(Boolean).join("\n"),
  };
}

async function sendWebhook(notification, env = process.env, fetchImpl = fetch) {
  const url = env.NOTIFY_WEBHOOK_URL;
  if (!url) return { ok: false, skipped: true, reason: "webhook_not_configured" };

  const res = await fetchImpl(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(env.NOTIFY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${env.NOTIFY_WEBHOOK_TOKEN}` } : {}),
    },
    body: JSON.stringify(notification),
  });

  return {
    ok: res.ok,
    status: res.status,
    data: await res.json().catch(() => ({})),
  };
}

export async function notifyExecutionComplete({ tarefa, executionPlan, resultados, arenaRecord, env = process.env }) {
  const notification = buildExecutionNotification({ tarefa, executionPlan, resultados, arenaRecord });
  const channels = [];

  const stored = recordNotification({
    ...notification,
    channel: "local",
    delivery: { ok: true },
  });
  channels.push({ channel: "local", ok: true });

  if (env.NOTIFY_WEBHOOK_URL) {
    const delivery = await sendWebhook(notification, env);
    recordNotification({ ...notification, channel: "webhook", delivery });
    channels.push({ channel: "webhook", ok: delivery.ok, skipped: delivery.skipped, reason: delivery.reason });
  }

  if (whatsappGoConfigured(env)) {
    const delivery = await sendWhatsAppGoMessage({ text: notification.message, env });
    recordNotification({ ...notification, channel: "whatsapp_go", delivery });
    channels.push({ channel: "whatsapp_go", ok: delivery.ok, skipped: delivery.skipped, reason: delivery.reason });
  }

  return {
    notification_id: stored.id,
    channels,
    notification,
  };
}

