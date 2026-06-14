#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { readArenaRuns, buildArenaRanking } from "../arena/store.js";
import { readNotifications } from "../notifications/store.js";
import { recordNotification } from "../notifications/store.js";
import { sendWhatsAppGoMessage, whatsappGoConfigured } from "../notifications/whatsapp-go.js";
import { handleGerenteCommand } from "../gerente/command.js";

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

function summary() {
  const arenaRuns = readArenaRuns();
  const ranking = buildArenaRanking();
  const notifications = readNotifications().slice(-20).reverse();
  const lastRun = arenaRuns.at(-1) || null;

  return {
    generated_at: new Date().toISOString(),
    totals: {
      arena_runs: arenaRuns.length,
      notifications: readNotifications().length,
      outputs: latestOutputs(1000).length,
    },
    last_run: lastRun,
    ranking,
    notifications,
    outputs: latestOutputs(),
  };
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

function normalizeGerenteCommand(text = "") {
  const value = String(text || "").trim();
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (normalized.startsWith("/gerente")) return value;
  if (normalized === "gerente") return "/gerente ajuda";
  if (normalized.startsWith("gerente ")) return `/gerente ${value.slice(value.indexOf(" ") + 1).trim()}`;
  if (normalized.startsWith("barra gerente ")) return `/gerente ${value.split(/\s+/).slice(2).join(" ").trim()}`;
  return value;
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
    let text = String(incoming.text || "").trim();
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

    const result = handleGerenteCommand({
      text,
      requestedBy: incoming.from ? `whatsapp:${incoming.from}` : "whatsapp",
    });

    recordNotification({
      type: "whatsapp_inbound",
      title: "Mensagem recebida via WhatsApp",
      channel: "whatsapp_go",
      from: incoming.from,
      message: text,
      result_kind: result.kind,
      task_id: result.plan?.task_id || null,
      from_me: incoming.fromMe,
      audio_detected: audioDetected,
    });

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
    :root { --bg:#f5f7fa; --card:#fff; --ink:#17202a; --muted:#667085; --line:#d8dee6; --accent:#0f766e; --warn:#92400e; }
    * { box-sizing:border-box; }
    body { margin:0; background:var(--bg); color:var(--ink); font-family:Arial, Helvetica, sans-serif; }
    main { max-width:1180px; margin:0 auto; padding:28px 18px 46px; }
    header { display:flex; justify-content:space-between; gap:16px; align-items:flex-start; margin-bottom:20px; border-bottom:1px solid var(--line); padding-bottom:18px; }
    h1 { margin:0 0 6px; font-size:30px; letter-spacing:0; }
    h2 { margin:0 0 12px; font-size:18px; letter-spacing:0; }
    p { margin:0; color:var(--muted); }
    button { border:1px solid var(--accent); background:var(--accent); color:#fff; padding:9px 13px; border-radius:7px; cursor:pointer; font-weight:700; }
    .grid { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:14px; }
    .wide { grid-column:span 2; }
    .card { background:var(--card); border:1px solid var(--line); border-radius:8px; padding:16px; min-width:0; }
    .stat { font-size:28px; font-weight:700; margin-top:4px; }
    .muted { color:var(--muted); font-size:13px; }
    table { width:100%; border-collapse:collapse; font-size:13px; }
    th, td { border-bottom:1px solid var(--line); padding:9px 6px; text-align:left; vertical-align:top; }
    th { color:var(--muted); font-weight:700; }
    code { background:#eef2f6; padding:2px 5px; border-radius:5px; }
    .pill { display:inline-block; padding:3px 8px; border-radius:999px; background:#e6f4f1; color:var(--accent); font-weight:700; font-size:12px; }
    .warn { background:#fff7ed; color:var(--warn); }
    pre { white-space:pre-wrap; overflow-wrap:anywhere; background:#111827; color:#f8fafc; border-radius:8px; padding:12px; font-size:12px; max-height:260px; overflow:auto; }
    @media (max-width:900px) { .grid { grid-template-columns:1fr; } .wide { grid-column:auto; } header { display:block; } button { margin-top:12px; } }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>Gerente Dashboard</h1>
        <p>Arena, execucoes, notificacoes e proximo canal WhatsApp.</p>
      </div>
      <button onclick="loadData()">Atualizar</button>
    </header>
    <section class="grid">
      <div class="card"><h2>Runs Arena</h2><div class="stat" id="runs">0</div><p class="muted">execucoes pontuadas</p></div>
      <div class="card"><h2>Notificacoes</h2><div class="stat" id="notifications">0</div><p class="muted">eventos registrados</p></div>
      <div class="card"><h2>Outputs</h2><div class="stat" id="outputs">0</div><p class="muted">arquivos salvos</p></div>
      <div class="card wide">
        <h2>Ranking De Modelos</h2>
        <table><thead><tr><th>Modelo</th><th>Score</th><th>Runs</th><th>Fallback</th></tr></thead><tbody id="models"></tbody></table>
      </div>
      <div class="card">
        <h2>Ultima Execucao</h2>
        <div id="lastRun" class="muted">Sem dados.</div>
      </div>
      <div class="card wide">
        <h2>Ultimos Outputs</h2>
        <table><thead><tr><th>Arquivo</th><th>Area</th><th>Risco</th><th>Tarefa</th></tr></thead><tbody id="outputRows"></tbody></table>
      </div>
      <div class="card">
        <h2>Notificacoes Recentes</h2>
        <div id="notifRows"></div>
      </div>
      <div class="card wide">
        <h2>JSON Do Resumo</h2>
        <pre id="raw">{}</pre>
      </div>
    </section>
  </main>
  <script>
    function text(value) { return value == null ? "" : String(value); }
    function row(cells) { return "<tr>" + cells.map((c) => "<td>" + c + "</td>").join("") + "</tr>"; }
    async function loadData() {
      const res = await fetch("/api/summary");
      const data = await res.json();
      document.getElementById("runs").textContent = data.totals.arena_runs;
      document.getElementById("notifications").textContent = data.totals.notifications;
      document.getElementById("outputs").textContent = data.totals.outputs;
      document.getElementById("models").innerHTML = data.ranking.models.slice(0, 8).map((m) => row([
        "<code>" + text(m.key) + "</code>",
        text(m.avg_score),
        text(m.runs),
        text(m.fallback_rate)
      ])).join("") || row(["Sem dados", "", "", ""]);
      document.getElementById("lastRun").innerHTML = data.last_run ? [
        "<p><span class='pill'>" + text(data.last_run.area) + "</span> <span class='pill warn'>" + text(data.last_run.risk) + "</span></p>",
        "<p>Modelo: <code>" + text(data.last_run.preferred_model) + "</code></p>",
        "<p>Agente: <code>" + text(data.last_run.primary_agent) + "</code></p>",
        "<p>Score: " + text(data.last_run.metrics && data.last_run.metrics.score) + "</p>"
      ].join("") : "Sem dados.";
      document.getElementById("outputRows").innerHTML = data.outputs.map((o) => row([
        "<code>" + text(o.name) + "</code>",
        text(o.area),
        text(o.risk),
        text(o.tarefa).slice(0, 120)
      ])).join("") || row(["Sem dados", "", "", ""]);
      document.getElementById("notifRows").innerHTML = data.notifications.slice(0, 8).map((n) => (
        "<p><span class='pill'>" + text(n.channel) + "</span> " + text(n.title) + "<br><span class='muted'>" + text(n.created_at) + "</span></p>"
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
  if (url.pathname === "/api/summary") return json(res, summary());
  if (url.pathname === "/health") return json(res, { ok: true, service: "gerente-dashboard" });
  if (url.pathname === "/") return html(res, page());
  return json(res, { error: "not found" }, 404);
});

server.listen(PORT, HOST, () => {
  console.log(`Gerente dashboard: http://${HOST}:${PORT}`);
});
