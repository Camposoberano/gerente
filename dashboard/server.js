#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { readArenaRuns, buildArenaRanking } from "../arena/store.js";
import { readNotifications } from "../notifications/store.js";
import { recordNotification } from "../notifications/store.js";
import { sendWhatsAppGoMessage, whatsappGoConfigured } from "../notifications/whatsapp-go.js";
import { handleGerenteCommandSmart } from "../gerente/command.js";
import { buildConversationTrace } from "../gerente/conversation-trace.js";
import { checkConversationStoreHealth, readWhatsAppConversations, recordWhatsAppConversation, supabaseConversationConfigured } from "./conversation-store.js";
import { normalizeGerenteCommand } from "./whatsapp-command.js";
import { recordRuntimeHeartbeat, summarizeRuntime } from "../runtime/status.js";

const PORT = Number(process.env.GERENTE_DASHBOARD_PORT || 8787);
const HOST = process.env.GERENTE_DASHBOARD_HOST || "127.0.0.1";
const OUTPUT_DIR = path.join(process.cwd(), "output");

function loadEnv(file = path.join(process.cwd(), ".env")) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    const key = line.slice(0, index);
    const value = line.slice(index + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();
recordRuntimeHeartbeat({ component: "dashboard", environment: process.env.GERENTE_RUNTIME_ENV || "coolify", detail: "dashboard process started" });

function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function latestOutputs(limit = 12) {
  if (!fs.existsSync(OUTPUT_DIR)) return [];
  return fs.readdirSync(OUTPUT_DIR)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const filePath = path.join(OUTPUT_DIR, name);
      const stat = fs.statSync(filePath);
      const data = readJsonFile(filePath);
      return {
        name,
        path: filePath,
        modified_at: stat.mtime.toISOString(),
        task_id: data?.executionPlan?.task_id || null,
        area: data?.executionPlan?.task_brief?.area || null,
        risk: data?.executionPlan?.task_brief?.risk || null,
        tarefa: data?.tarefa || null,
      };
    })
    .sort((a, b) => b.modified_at.localeCompare(a.modified_at))
    .slice(0, limit);
}

function providerHealth(env = process.env) {
  return [
    { id: "whatsapp", label: "WhatsApp/Uazapi", configured: whatsappGoConfigured(env), ok: whatsappGoConfigured(env), detail: whatsappGoConfigured(env) ? "env configurado" : "env ausente" },
    { id: "supabase", label: "Supabase historico", configured: supabaseConversationConfigured(env), ok: supabaseConversationConfigured(env), detail: supabaseConversationConfigured(env) ? "env configurado" : "env ausente" },
    { id: "gemini", label: "Gemini conversa", configured: Boolean(env.GEMINI_API_KEY || env.GOOGLE_API_KEY), ok: Boolean(env.GEMINI_API_KEY || env.GOOGLE_API_KEY), detail: (env.GEMINI_API_KEY || env.GOOGLE_API_KEY) ? "token configurado" : "token ausente" },
    { id: "openai", label: "OpenAI transcricao", configured: Boolean(env.OPENAI_API_KEY), ok: Boolean(env.OPENAI_API_KEY), detail: env.OPENAI_API_KEY ? "token configurado" : "token ausente" },
    { id: "openrouter", label: "OpenRouter modelos", configured: Boolean(env.OPENROUTER_API_KEY), ok: Boolean(env.OPENROUTER_API_KEY), detail: env.OPENROUTER_API_KEY ? "token configurado" : "token ausente" },
    { id: "groq", label: "Groq rapido", configured: Boolean(env.GROQ_API_KEY), ok: Boolean(env.GROQ_API_KEY), detail: env.GROQ_API_KEY ? "token configurado" : "token ausente" },
    { id: "xai", label: "xAI/Grok", configured: Boolean(env.XAI_API_KEY || env.GROK_API_KEY), ok: Boolean(env.XAI_API_KEY || env.GROK_API_KEY), detail: (env.XAI_API_KEY || env.GROK_API_KEY) ? "token configurado" : "token ausente" },
  ];
}

function latestError(notifications, conversations) {
  const notificationError = notifications.find((item) => item.reason || item.transcription_error);
  const conversationError = conversations.find((item) => item.transcription_error);
  if (conversationError) return conversationError.transcription_error;
  if (notificationError) return notificationError.transcription_error || notificationError.reason;
  return null;
}

function usageTotals(conversations) {
  return conversations.reduce((totals, item) => ({
    input_tokens: totals.input_tokens + Number(item.input_tokens || 0),
    output_tokens: totals.output_tokens + Number(item.output_tokens || 0),
    total_tokens: totals.total_tokens + Number(item.total_tokens || 0),
  }), { input_tokens: 0, output_tokens: 0, total_tokens: 0 });
}

async function summary() {
  const arenaRuns = readArenaRuns();
  const ranking = buildArenaRanking();
  const allNotifications = readNotifications();
  const notifications = allNotifications.slice(-20).reverse();
  const conversationResult = await readWhatsAppConversations({
    limit: 20,
    fallbackNotifications: allNotifications,
    env: process.env,
  });
  const whatsappConversations = conversationResult.items;
  const usage = usageTotals(whatsappConversations);
  const storeHealth = await checkConversationStoreHealth(process.env);
  const lastRun = arenaRuns.at(-1) || null;

  return {
    generated_at: new Date().toISOString(),
    totals: {
      arena_runs: arenaRuns.length,
      notifications: allNotifications.length,
      outputs: latestOutputs(1000).length,
      whatsapp_conversations: whatsappConversations.length,
      total_tokens: usage.total_tokens,
    },
    usage,
    health: {
      generated_at: new Date().toISOString(),
      providers: providerHealth(process.env).map((item) => item.id === "supabase" ? { ...item, ...storeHealth } : item),
      conversation_store: storeHealth,
      conversation_source: conversationResult.source,
      conversation_error: conversationResult.error,
      last_error: latestError(notifications, whatsappConversations),
      last_audio: whatsappConversations.find((item) => item.audio_detected) || null,
      last_deploy_hint: process.env.COOLIFY_RESOURCE_UUID || process.env.HOSTNAME || null,
    },
    runtime: summarizeRuntime(),
    last_run: lastRun,
    ranking,
    notifications,
    whatsapp_conversations: whatsappConversations,
    outputs: latestOutputs(),
  };
}

async function runtimeHeartbeat(req, res) {
  try {
    const requestUrl = new URL(req.url, `http://${HOST}:${PORT}`);
    const expectedToken = process.env.GERENTE_WEBHOOK_TOKEN;
    if (expectedToken && requestUrl.searchParams.get("token") !== expectedToken) {
      return json(res, { ok: false, error: "unauthorized" }, 401);
    }
    const raw = await readRequestBody(req);
    const payload = raw ? JSON.parse(raw) : {};
    const record = recordRuntimeHeartbeat({
      component: payload.component || "external",
      environment: payload.environment || "remote",
      status: payload.status || "online",
      detail: payload.detail || null,
      source: payload.source || "http",
      pid: payload.pid || null,
      cwd: payload.cwd || null,
      host: payload.host || null,
      metadata: payload.metadata || {},
    });
    return json(res, { ok: true, runtime: record });
  } catch (error) {
    return json(res, { ok: false, error: error.message }, 400);
  }
}

function json(res, body, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body, null, 2));
}

function html(res, body) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(body);
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 1024 * 1024) {
        reject(new Error("payload_too_large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function deepFindString(value, keys) {
  if (!value || typeof value !== "object") return null;
  for (const key of keys) {
    if (typeof value[key] === "string" && value[key].trim()) return value[key].trim();
  }
  for (const nested of Object.values(value)) {
    if (nested && typeof nested === "object") {
      const found = deepFindString(nested, keys);
      if (found) return found;
    }
  }
  return null;
}

function deepFindBoolean(value, keys) {
  if (!value || typeof value !== "object") return null;
  for (const key of keys) {
    if (typeof value[key] === "boolean") return value[key];
    if (typeof value[key] === "string" && /^(true|false)$/i.test(value[key])) {
      return value[key].toLowerCase() === "true";
    }
  }
  for (const nested of Object.values(value)) {
    if (nested && typeof nested === "object") {
      const found = deepFindBoolean(nested, keys);
      if (found !== null) return found;
    }
  }
  return null;
}

function extractWhatsAppMessage(payload) {
  const message = payload?.message && typeof payload.message === "object" ? payload.message : {};
  const content = message?.content && typeof message.content === "object" ? message.content : {};
  return {
    id: message.id || null,
    messageid: message.messageid || null,
    text: message.text || content.text || deepFindString(payload, ["text", "body", "caption", "conversation"]) || "",
    from: message.sender || deepFindString(payload, ["from", "number", "phone", "sender", "remoteJid", "participant"]) || null,
    chat: message.chatid || payload?.chat?.wa_chatid || deepFindString(payload, ["remoteJid", "chatId", "chat_id", "jid", "groupJid", "groupjid"]) || null,
    mediaUrl: content.URL || content.url || content.mediaUrl || deepFindString(payload, ["mediaUrl", "media_url", "downloadUrl", "download_url", "audioUrl", "audio_url", "URL", "url"]) || null,
    mimeType: content.mimetype || content.mimeType || deepFindString(payload, ["mimetype", "mimeType", "mime_type"]) || null,
    messageType: message.messageType || deepFindString(payload, ["messageType", "message_type"]) || null,
    mediaType: message.mediaType || deepFindString(payload, ["mediaType", "media_type"]) || null,
    fromMe: deepFindBoolean(payload, ["fromMe", "from_me", "isFromMe", "is_from_me", "from_me_boolean"]) === true,
  };
}

function whatsappReplyTarget(incoming, env = process.env) {
  if (incoming.chat && incoming.chat.includes("@g.us")) return incoming.chat;
  if (incoming.from && incoming.from.includes("@g.us")) return incoming.from;
  return env.GERENTE_WHATSAPP_GROUP_JID || incoming.chat || incoming.from || env.WHATSAPP_NOTIFY_TO;
}

function isAudioMessage(incoming) {
  const mime = String(incoming.mimeType || "").toLowerCase();
  const url = String(incoming.mediaUrl || "").toLowerCase();
  const messageType = String(incoming.messageType || "").toLowerCase();
  const mediaType = String(incoming.mediaType || "").toLowerCase();
  return mime.startsWith("audio/")
    || messageType.includes("audio")
    || mediaType === "ptt"
    || mediaType === "audio"
    || /\.(ogg|oga|mp3|m4a|wav|webm)(\?|$)/i.test(url);
}

async function transcribeAudio(incoming, env = process.env) {
  if (!env.OPENAI_API_KEY || !isAudioMessage(incoming)) return null;

  const downloaded = await downloadUazapiMedia(incoming, env);
  const mediaUrl = downloaded.url || incoming.mediaUrl;
  if (!mediaUrl) return null;

  const mediaResponse = await fetch(mediaUrl, {
    headers: {
      token: env.WHATSAPP_GO_INSTANCE_TOKEN || env.UAZAPI_INSTANCE_TOKEN || "",
    },
  });
  if (!mediaResponse.ok) throw new Error(`audio_download_failed_${mediaResponse.status}`);

  const contentType = mediaResponse.headers.get("content-type") || downloaded.mimetype || incoming.mimeType || "audio/ogg";
  const extension = contentType.includes("mpeg") ? "mp3"
    : contentType.includes("mp4") ? "m4a"
      : contentType.includes("wav") ? "wav"
        : contentType.includes("webm") ? "webm"
          : "ogg";
  const audioFile = new File([await mediaResponse.arrayBuffer()], `whatsapp-audio.${extension}`, { type: contentType });
  const form = new FormData();
  form.append("model", env.GERENTE_TRANSCRIBE_MODEL || "whisper-1");
  form.append("file", audioFile);

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: form,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`audio_transcription_failed_${response.status}`);
  return String(data.text || "").trim() || null;
}

async function downloadUazapiMedia(incoming, env = process.env) {
  const baseUrl = String(env.WHATSAPP_GO_URL || env.UAZAPI_URL || "").replace(/\/+$/, "");
  const token = env.WHATSAPP_GO_INSTANCE_TOKEN || env.UAZAPI_INSTANCE_TOKEN || "";
  if (!baseUrl || !token || !incoming.id) return {};

  const response = await fetch(`${baseUrl}/message/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      id: incoming.id,
      messageid: incoming.messageid,
      chatid: incoming.chat,
    }),
  });
  if (!response.ok) return {};
  const data = await response.json().catch(() => ({}));
  return {
    url: data.fileURL || data.fileUrl || data.url || null,
    mimetype: data.mimetype || data.mimeType || null,
  };
}

async function whatsappInbound(req, res) {
  try {
    const requestUrl = new URL(req.url, `http://${HOST}:${PORT}`);
    const expectedToken = process.env.GERENTE_WEBHOOK_TOKEN;
    if (expectedToken && requestUrl.searchParams.get("token") !== expectedToken) {
      return json(res, { ok: false, error: "unauthorized" }, 401);
    }

    const raw = await readRequestBody(req);
    const payload = raw ? JSON.parse(raw) : {};
    const incoming = extractWhatsAppMessage(payload);
    if (incoming.fromMe) {
      return json(res, { ok: true, ignored: true, reason: "from_me" });
    }

    let text = String(incoming.text || "").trim();
    const originalText = text;
    let transcriptionError = null;
    const audioDetected = isAudioMessage(incoming);
    if (!text && audioDetected) {
      try {
        text = await transcribeAudio(incoming, process.env) || "";
      } catch (error) {
        transcriptionError = error.message;
      }
    }
    text = normalizeGerenteCommand(text);
    const commandText = text.toLowerCase();

    if (!text || !commandText.startsWith("/gerente")) {
      recordNotification({
        type: "whatsapp_inbound_ignored",
        title: "Mensagem ignorada via WhatsApp",
        channel: "whatsapp_go",
        from: incoming.from,
        message: text.slice(0, 200),
        reason: transcriptionError || (!text ? "empty" : "not_gerente_command"),
        from_me: incoming.fromMe,
        audio_detected: audioDetected,
        mime_type: incoming.mimeType,
        message_type: incoming.messageType,
        media_type: incoming.mediaType,
      });

      return json(res, {
        ok: true,
        ignored: true,
        reason: transcriptionError || (!text ? "empty" : "not_gerente_command"),
      });
    }

    const result = await handleGerenteCommandSmart({
      text,
      requestedBy: incoming.from ? `whatsapp:${incoming.from}` : "whatsapp",
      env: process.env,
    });
    const trace = buildConversationTrace(result);
    const responsePreview = String(result.message || "").slice(0, 500);

    const notificationRecord = recordNotification({
      type: "whatsapp_inbound",
      title: "Mensagem recebida via WhatsApp",
      channel: "whatsapp_go",
      from: incoming.from,
      chat_id: incoming.chat,
      message: text,
      original_message: originalText || null,
      response_preview: responsePreview,
      result_kind: result.kind,
      task_id: result.plan?.task_id || null,
      ...trace,
      from_me: incoming.fromMe,
      audio_detected: audioDetected,
      transcribed: audioDetected && Boolean(text),
      transcription_error: transcriptionError,
    });
    const conversationDelivery = await recordWhatsAppConversation({
      from: incoming.from,
      chat_id: incoming.chat,
      original_message: originalText || text,
      normalized_message: text,
      response_preview: responsePreview,
      result_kind: result.kind,
      task_id: result.plan?.task_id || null,
      ...trace,
      audio_detected: audioDetected,
      transcribed: audioDetected && Boolean(text),
      transcription_error: transcriptionError,
      metadata: {
        notification_id: notificationRecord.id,
        received_text: Boolean(incoming.text),
        mime_type: incoming.mimeType,
        message_type: incoming.messageType,
        media_type: incoming.mediaType,
        usage_provider: trace.usage_provider || null,
        usage_model: trace.usage_model || null,
        input_tokens: trace.input_tokens || 0,
        output_tokens: trace.output_tokens || 0,
        total_tokens: trace.total_tokens || 0,
      },
    }, process.env);

    let delivery = { ok: false, skipped: true, reason: "whatsapp_go_not_configured" };
    const replyTarget = whatsappReplyTarget(incoming, process.env);
    if (whatsappGoConfigured(process.env)) {
      delivery = await sendWhatsAppGoMessage({ text: result.message, number: replyTarget, env: process.env });
    }

    return json(res, {
      ok: true,
      received_text: Boolean(incoming.text),
      from_detected: Boolean(incoming.from),
      chat_detected: Boolean(incoming.chat),
      result_kind: result.kind,
      task_id: result.plan?.task_id || null,
      reply_delivery: {
        ok: delivery.ok,
        skipped: delivery.skipped,
        status: delivery.status,
        reason: delivery.reason,
      },
      conversation_store: {
        ok: conversationDelivery.ok,
        skipped: conversationDelivery.skipped,
        reason: conversationDelivery.reason,
        error: conversationDelivery.error,
      },
    });
  } catch (error) {
    return json(res, { ok: false, error: error.message }, 400);
  }
}

function page() {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gerente Dashboard</title>
  <style>
    :root {
      --bg:#060911;
      --bg2:#0a1020;
      --panel:#0f1728;
      --panel2:#111d31;
      --line:#243149;
      --line2:#1b263a;
      --ink:#f7fbff;
      --muted:#94a3b8;
      --faint:#64748b;
      --cyan:#22d3ee;
      --green:#34d399;
      --magenta:#f472b6;
      --amber:#f59e0b;
      --danger:#fb7185;
      --shadow:0 28px 90px rgba(0,0,0,.38);
    }
    * { box-sizing:border-box; }
    html { background:var(--bg); }
    body {
      margin:0;
      min-height:100vh;
      color:var(--ink);
      background:
        radial-gradient(760px 520px at 75% -20%, rgba(34,211,238,.16), transparent 60%),
        radial-gradient(780px 520px at 10% 0%, rgba(244,114,182,.12), transparent 58%),
        linear-gradient(180deg, var(--bg2), var(--bg));
      font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      -webkit-font-smoothing:antialiased;
    }
    button { font:inherit; border:0; cursor:pointer; }
    .app { min-height:100vh; display:grid; grid-template-columns:82px minmax(0, 1fr); }
    .rail {
      position:sticky; top:0; height:100vh; padding:18px 12px;
      border-right:1px solid rgba(148,163,184,.14);
      background:rgba(4,7,14,.72); backdrop-filter:blur(16px);
      display:flex; flex-direction:column; align-items:center; gap:14px;
    }
    .mark {
      width:46px; height:46px; border-radius:12px; display:grid; place-items:center;
      background:linear-gradient(135deg, var(--cyan), var(--magenta));
      color:#041019; font-weight:950; box-shadow:0 18px 40px rgba(34,211,238,.18);
    }
    .navdot {
      width:46px; height:42px; border:1px solid transparent; border-radius:10px;
      display:grid; place-items:center; color:var(--muted); background:transparent;
    }
    .navdot.active { color:var(--cyan); border-color:rgba(34,211,238,.28); background:rgba(34,211,238,.08); }
    main { min-width:0; max-width:1500px; width:100%; margin:0 auto; padding:24px; }
    .topbar {
      min-height:76px; display:flex; align-items:center; justify-content:space-between; gap:18px;
      border:1px solid rgba(148,163,184,.14); border-radius:14px; padding:16px 18px;
      background:linear-gradient(135deg, rgba(15,23,42,.78), rgba(15,23,42,.42));
      box-shadow:var(--shadow);
    }
    .title h1 { margin:0; font-size:30px; line-height:1; letter-spacing:-.03em; }
    .title p { margin:8px 0 0; color:var(--muted); font-size:13px; }
    .actions { display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
    .btn {
      min-height:38px; padding:0 14px; border-radius:8px; color:var(--ink); font-weight:800;
      background:rgba(255,255,255,.05); border:1px solid rgba(148,163,184,.18);
    }
    .btn.primary { color:#031014; background:linear-gradient(135deg, var(--cyan), var(--green)); border:0; }
    .status {
      display:inline-flex; align-items:center; gap:8px; min-height:34px; padding:0 12px;
      border:1px solid rgba(52,211,153,.28); border-radius:999px; color:#bbf7d0;
      background:rgba(52,211,153,.08); font-size:12px; font-weight:800;
    }
    .pulse { width:8px; height:8px; border-radius:999px; background:var(--green); box-shadow:0 0 18px var(--green); }
    .kpis { display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:14px; margin:16px 0; }
    .kpi, .panel {
      min-width:0; border:1px solid rgba(148,163,184,.14); border-radius:14px;
      background:linear-gradient(180deg, rgba(17,29,49,.86), rgba(9,14,26,.86));
      box-shadow:0 18px 60px rgba(0,0,0,.22);
    }
    .kpi { padding:16px; position:relative; overflow:hidden; }
    .kpi:after { content:""; position:absolute; inset:auto 14px 0; height:2px; background:linear-gradient(90deg, var(--cyan), var(--magenta)); opacity:.6; }
    .kpi .label { color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:.08em; font-weight:900; }
    .kpi .value { margin-top:9px; font-size:34px; line-height:1; font-weight:950; letter-spacing:-.04em; }
    .kpi .sub { margin-top:8px; color:var(--faint); font-size:12px; }
    .layout { display:grid; grid-template-columns:minmax(0, 1.45fr) minmax(340px, .8fr); gap:14px; align-items:start; }
    .panel { padding:16px; }
    .panel + .panel { margin-top:14px; }
    .panel-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .panel h2 { margin:0; font-size:17px; letter-spacing:-.02em; }
    .panel p { margin:5px 0 0; color:var(--muted); font-size:12px; }
    .chip, .pill {
      display:inline-flex; align-items:center; gap:6px; min-height:25px; padding:0 9px;
      border-radius:999px; font-size:11px; font-weight:900; color:var(--cyan);
      background:rgba(34,211,238,.09); border:1px solid rgba(34,211,238,.22);
      white-space:nowrap;
    }
    .warn { color:#fcd34d; border-color:rgba(245,158,11,.24); background:rgba(245,158,11,.10); }
    .danger { color:#fecdd3; border-color:rgba(251,113,133,.28); background:rgba(251,113,133,.10); }
    .ok { color:#bbf7d0; border-color:rgba(52,211,153,.26); background:rgba(52,211,153,.10); }
    .conversation-list { display:grid; gap:10px; }
    .conversation {
      border:1px solid rgba(148,163,184,.13); border-radius:12px; padding:12px;
      background:rgba(2,6,23,.34);
    }
    .conversation-head { display:flex; gap:8px; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; }
    .conversation-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .box {
      min-width:0; border:1px solid rgba(148,163,184,.10); border-radius:9px;
      padding:10px; background:rgba(15,23,42,.62);
    }
    .box strong { display:block; color:var(--muted); font-size:10px; letter-spacing:.07em; text-transform:uppercase; margin-bottom:6px; }
    .box div { color:#e5eefb; overflow-wrap:anywhere; white-space:pre-wrap; font-size:12px; line-height:1.45; }
    .health-grid { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:9px; }
    .health-item {
      border:1px solid rgba(148,163,184,.12); border-radius:10px; padding:10px;
      background:rgba(2,6,23,.24);
    }
    .health-item strong { display:block; margin-top:7px; font-size:13px; }
    .health-item span { display:block; margin-top:4px; color:var(--muted); font-size:11px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    table { width:100%; border-collapse:collapse; font-size:12px; }
    th { color:var(--faint); font-size:10px; letter-spacing:.08em; text-transform:uppercase; text-align:left; padding:10px 8px; border-bottom:1px solid rgba(148,163,184,.14); }
    td { padding:10px 8px; border-bottom:1px solid rgba(148,163,184,.08); color:#dce7f7; vertical-align:top; }
    tr:last-child td { border-bottom:0; }
    code { display:inline-block; max-width:100%; overflow:hidden; text-overflow:ellipsis; vertical-align:bottom; color:#cffafe; background:rgba(34,211,238,.08); border:1px solid rgba(34,211,238,.12); border-radius:6px; padding:2px 6px; }
    .timeline { display:grid; gap:9px; }
    .event {
      display:grid; grid-template-columns:10px minmax(0, 1fr); gap:10px; align-items:start;
      border-bottom:1px solid rgba(148,163,184,.08); padding-bottom:9px;
    }
    .event:last-child { border-bottom:0; padding-bottom:0; }
    .event-dot { width:8px; height:8px; margin-top:5px; border-radius:999px; background:var(--cyan); box-shadow:0 0 18px var(--cyan); }
    .event strong { display:block; font-size:13px; }
    .event span { display:block; margin-top:4px; color:var(--muted); font-size:11px; }
    pre {
      white-space:pre-wrap; overflow-wrap:anywhere; margin:0; max-height:260px; overflow:auto;
      background:#020617; color:#cbd5e1; border:1px solid rgba(148,163,184,.12); border-radius:10px; padding:12px; font-size:11px; line-height:1.5;
    }
    .models-wrap { overflow:auto; }
    .mini-chart { display:flex; align-items:flex-end; gap:4px; height:54px; margin-top:12px; }
    .mini-chart span { flex:1; min-width:4px; border-radius:5px 5px 0 0; background:linear-gradient(180deg, var(--cyan), var(--magenta)); opacity:.88; }
    @media (max-width:1100px) {
      .app { grid-template-columns:1fr; }
      .rail { display:none; }
      .layout { grid-template-columns:1fr; }
      .kpis { grid-template-columns:repeat(2, minmax(0, 1fr)); }
      main { padding:16px; }
    }
    @media (max-width:680px) {
      .topbar { display:block; }
      .actions { justify-content:flex-start; margin-top:14px; }
      .kpis { grid-template-columns:1fr; }
      .conversation-grid, .health-grid { grid-template-columns:1fr; }
      .title h1 { font-size:25px; }
    }
  </style>
</head>
<body>
  <div class="app">
    <aside class="rail" aria-label="Navegacao">
      <div class="mark">G</div>
      <div class="navdot active">⌁</div>
      <div class="navdot">◍</div>
      <div class="navdot">▤</div>
      <div class="navdot">◎</div>
      <div style="flex:1"></div>
      <div class="navdot">↻</div>
    </aside>
    <main>
      <section class="topbar">
        <div class="title">
          <h1>Gerente IA</h1>
          <p>Central de comando para WhatsApp, agentes, modelos e execucoes.</p>
        </div>
        <div class="actions">
          <span class="status"><span class="pulse"></span>Operacao online</span>
          <button class="btn" onclick="loadData()">Atualizar</button>
          <button class="btn primary" onclick="location.href='/api/summary'">Ver API</button>
        </div>
      </section>

      <section class="kpis">
        <div class="kpi"><div class="label">Conversas WhatsApp</div><div class="value" id="whatsappCount">0</div><div class="sub" id="conversationSource">historico local</div></div>
        <div class="kpi"><div class="label">Runs Arena</div><div class="value" id="runs">0</div><div class="sub">modelos pontuados</div></div>
        <div class="kpi"><div class="label">Outputs</div><div class="value" id="outputs">0</div><div class="sub">artefatos gerados</div></div>
        <div class="kpi"><div class="label">Tokens rastreados</div><div class="value" id="tokensTotal">0</div><div class="sub" id="tokensSplit">entrada/saida</div></div>
      </section>

      <section class="layout">
        <div>
          <article class="panel">
            <div class="panel-head">
              <div><h2>Conversas WhatsApp</h2><p>Entrada original, comando entendido, resposta e agente usado.</p></div>
              <span class="chip" id="conversationChip">ao vivo</span>
            </div>
            <div id="whatsappRows" class="conversation-list"><p class="muted">Sem conversas.</p></div>
          </article>

          <article class="panel">
            <div class="panel-head">
              <div><h2>Ranking de Modelos</h2><p>Arena operacional por score, runs e fallback.</p></div>
            </div>
            <div class="models-wrap">
              <table><thead><tr><th>Modelo</th><th>Score</th><th>Runs</th><th>Fallback</th></tr></thead><tbody id="models"></tbody></table>
            </div>
          </article>

          <article class="panel">
            <div class="panel-head">
              <div><h2>JSON do Resumo</h2><p>Snapshot bruto para auditoria rapida.</p></div>
            </div>
            <pre id="raw">{}</pre>
          </article>
        </div>

        <aside>
          <article class="panel">
            <div class="panel-head">
              <div><h2>Saude do Gerente</h2><p>WhatsApp, Supabase e LLMs.</p></div>
            </div>
            <div id="healthRows" class="health-grid"><p class="muted">Carregando.</p></div>
          </article>

          <article class="panel">
            <div class="panel-head">
              <div><h2>Onde o Gerente Esta Rodando</h2><p>Heartbeat real por dashboard, MCP, VSCode e Antigrade.</p></div>
            </div>
            <div id="runtimeRows" class="timeline"></div>
          </article>

          <article class="panel">
            <div class="panel-head">
              <div><h2>Ultima Execucao</h2><p>Executor, modelo e risco.</p></div>
            </div>
            <div id="lastRun"><p class="muted">Sem dados.</p></div>
            <div class="mini-chart" aria-hidden>
              <span style="height:28%"></span><span style="height:48%"></span><span style="height:38%"></span><span style="height:64%"></span><span style="height:52%"></span><span style="height:76%"></span><span style="height:61%"></span><span style="height:86%"></span>
            </div>
          </article>

          <article class="panel">
            <div class="panel-head">
              <div><h2>Outputs Recentes</h2><p>Arquivos e planos salvos.</p></div>
            </div>
            <div id="outputRows" class="timeline"></div>
          </article>

          <article class="panel">
            <div class="panel-head">
              <div><h2>Notificacoes</h2><p>Eventos do sistema.</p></div>
              <span class="chip" id="notifications">0</span>
            </div>
            <div id="notifRows" class="timeline"></div>
          </article>
        </aside>
      </section>
    </main>
  </div>
  <script>
    function text(value) { return value == null ? "" : String(value); }
    function esc(value) {
      return text(value).replace(/[&<>"']/g, (ch) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
    }
    function row(cells) { return "<tr>" + cells.map((c) => "<td>" + c + "</td>").join("") + "</tr>"; }
    function badge(label, extra) { return "<span class='pill " + (extra || "") + "'>" + esc(label) + "</span>"; }
    function conversationCard(item) {
      const audio = item.audio_detected ? badge(item.transcribed ? "audio transcrito" : "audio", item.transcription_error ? "danger" : "") : badge("texto");
      const kind = badge(item.result_kind || "sem tipo", item.result_kind === "plan" ? "warn" : "");
      const error = item.transcription_error ? "<p>" + badge("erro transcricao", "danger") + " <span class='muted'>" + esc(item.transcription_error) + "</span></p>" : "";
      const usage = Number(item.total_tokens || 0) > 0
        ? "<div class='box'><strong>Tokens</strong><div>" + esc(item.total_tokens) + " total · " + esc(item.input_tokens || 0) + " in · " + esc(item.output_tokens || 0) + " out<br>" + esc(item.usage_model || item.llm_label || "") + "</div></div>"
        : "";
      return [
        "<div class='conversation'>",
        "<div class='conversation-head'><div>" + kind + audio + "</div><span class='chip'>" + esc(item.created_at) + "</span></div>",
        "<div class='conversation-grid'>",
        "<div class='box'><strong>Entrada original</strong><div>" + esc(item.original_message) + "</div></div>",
        "<div class='box'><strong>Comando entendido</strong><div>" + esc(item.normalized_message) + "</div></div>",
        "<div class='box'><strong>Resposta enviada</strong><div>" + esc(item.response_preview) + "</div></div>",
        "<div class='box'><strong>Origem</strong><div>" + esc(item.from || "desconhecida") + (item.task_id ? "<br>Task: " + esc(item.task_id) : "") + "</div></div>",
        "<div class='box'><strong>Agente / LLM</strong><div>" + esc(item.agent_name || item.agent_id || "nao identificado") + "<br>" + esc(item.llm_label || item.llm_id || "nao identificado") + "</div></div>",
        "<div class='box'><strong>Fonte</strong><div>" + esc(item.response_source || "nao identificado") + "</div></div>",
        usage,
        "</div>",
        error,
        "</div>"
      ].join("");
    }
    function healthCard(item) {
      return "<div class='health-item'>" + badge(item.ok ? "ok" : (item.configured ? "erro" : "ausente"), item.ok ? "ok" : "danger") + "<strong>" + esc(item.label || item.id || "item") + "</strong><span>" + esc(item.detail || "") + "</span></div>";
    }
    function eventRow(title, detail, tone) {
      return "<div class='event'><span class='event-dot' style='" + (tone ? "background:" + tone + ";box-shadow:0 0 18px " + tone : "") + "'></span><div><strong>" + esc(title) + "</strong><span>" + esc(detail) + "</span></div></div>";
    }
    function runtimeRow(item) {
      const tone = item.online ? "var(--green)" : "var(--danger)";
      const status = item.online ? "online" : "offline";
      const detail = [
        status,
        item.environment,
        item.detail,
        item.age_seconds == null ? "" : "ultimo sinal ha " + item.age_seconds + "s",
        item.cwd
      ].filter(Boolean).join(" · ");
      return eventRow((item.component || "gerente") + " / " + (item.host || "sem host"), detail, tone);
    }
    async function loadData() {
      const res = await fetch("/api/summary");
      const data = await res.json();
      document.getElementById("runs").textContent = data.totals.arena_runs;
      document.getElementById("notifications").textContent = data.totals.notifications;
      document.getElementById("outputs").textContent = data.totals.outputs;
      document.getElementById("whatsappCount").textContent = data.totals.whatsapp_conversations;
      document.getElementById("tokensTotal").textContent = data.totals.total_tokens || 0;
      document.getElementById("tokensSplit").textContent = (data.usage.input_tokens || 0) + " in / " + (data.usage.output_tokens || 0) + " out";
      document.getElementById("conversationSource").textContent = "historico: " + text(data.health.conversation_source);
      document.getElementById("conversationChip").textContent = text(data.health.conversation_source);
      document.getElementById("whatsappRows").innerHTML = data.whatsapp_conversations.slice(0, 6).map(conversationCard).join("") || "<p class='muted'>Sem conversas.</p>";
      document.getElementById("healthRows").innerHTML = [
        ...(data.health.last_error ? ["<div class='health-item'>" + badge("ultimo erro", "danger") + "<strong>Alerta recente</strong><span>" + esc(data.health.last_error) + "</span></div>"] : []),
        ...data.health.providers.map(healthCard)
      ].join("");
      document.getElementById("runtimeRows").innerHTML = (data.runtime || []).map(runtimeRow).join("") || "<p class='muted'>Sem heartbeat de runtime.</p>";
      document.getElementById("models").innerHTML = data.ranking.models.slice(0, 8).map((m) => row([
        "<code>" + esc(m.key) + "</code>",
        esc(m.avg_score),
        esc(m.runs),
        esc(m.fallback_rate)
      ])).join("") || row(["Sem dados", "", "", ""]);
      document.getElementById("lastRun").innerHTML = data.last_run ? [
        "<div class='conversation-grid'>",
        "<div class='box'><strong>Area / risco</strong><div>" + badge(data.last_run.area) + " " + badge(data.last_run.risk, "warn") + "</div></div>",
        "<div class='box'><strong>Modelo</strong><div><code>" + esc(data.last_run.preferred_model) + "</code></div></div>",
        "<div class='box'><strong>Agente</strong><div><code>" + esc(data.last_run.primary_agent) + "</code></div></div>",
        "<div class='box'><strong>Score</strong><div>" + esc(data.last_run.metrics && data.last_run.metrics.score) + "</div></div>",
        "</div>"
      ].join("") : "Sem dados.";
      document.getElementById("outputRows").innerHTML = data.outputs.slice(0, 6).map((o) => eventRow(o.name, [o.area, o.risk, text(o.tarefa).slice(0, 80)].filter(Boolean).join(" · "), "var(--magenta)")).join("") || "<p class='muted'>Sem outputs.</p>";
      document.getElementById("notifRows").innerHTML = data.notifications.slice(0, 8).map((n) => (
        eventRow(n.title || n.type, [n.channel, n.created_at].filter(Boolean).join(" · "), "var(--cyan)")
      )).join("") || "<p class='muted'>Sem notificacoes.</p>";
      document.getElementById("raw").textContent = JSON.stringify(data, null, 2);
    }
    loadData();
    setInterval(loadData, 15000);
  </script>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  if (url.pathname === "/api/whatsapp/inbound" && req.method === "POST") return void whatsappInbound(req, res);
  if (url.pathname === "/api/runtime/heartbeat" && req.method === "POST") return void runtimeHeartbeat(req, res);
  if (url.pathname === "/api/summary") return void summary().then((body) => json(res, body)).catch((error) => json(res, { ok: false, error: error.message }, 500));
  if (url.pathname === "/health") return json(res, { ok: true, service: "gerente-dashboard" });
  if (url.pathname === "/") return html(res, page());
  return json(res, { error: "not found" }, 404);
});

server.listen(PORT, HOST, () => {
  console.log(`Gerente dashboard: http://${HOST}:${PORT}`);
});
