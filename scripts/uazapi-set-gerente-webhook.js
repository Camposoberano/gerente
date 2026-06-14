import crypto from "node:crypto";
import fs from "node:fs";

function loadEnv(file = ".env") {
  const env = {};
  if (!fs.existsSync(file)) return env;
  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    env[line.slice(0, index)] = line.slice(index + 1);
  }
  return env;
}

function upsertEnv(key, value, file = ".env") {
  const lines = fs.existsSync(file) ? fs.readFileSync(file, "utf8").split(/\r?\n/) : [];
  const nextLine = `${key}=${value}`;
  const index = lines.findIndex((line) => new RegExp(`^\\s*#?\\s*${key}=`).test(line));
  if (index >= 0) lines[index] = nextLine;
  else lines.push(nextLine);
  fs.writeFileSync(file, lines.join("\n"));
}

const env = loadEnv();
const baseUrl = (env.WHATSAPP_GO_URL || env.UAZAPI_URL || "").replace(/\/$/, "");
const instanceToken = env.WHATSAPP_GO_INSTANCE_TOKEN || env.UAZAPI_INSTANCE_TOKEN || "";
const publicBase = (process.argv[2] || env.GERENTE_PUBLIC_BASE || "").replace(/\/$/, "");
const webhookToken = env.GERENTE_WEBHOOK_TOKEN || crypto.randomBytes(24).toString("hex");

if (!baseUrl || !instanceToken) {
  console.error(JSON.stringify({ ok: false, reason: "UAZAPI_URL_or_instance_token_missing" }, null, 2));
  process.exit(1);
}

if (!publicBase || !/^https:\/\//i.test(publicBase)) {
  console.error(JSON.stringify({
    ok: false,
    reason: "GERENTE_PUBLIC_BASE_https_missing",
    example: "npm run uazapi:webhook:gerente -- https://gerente.seudominio.com",
  }, null, 2));
  process.exit(1);
}

upsertEnv("GERENTE_PUBLIC_BASE", publicBase);
upsertEnv("GERENTE_WEBHOOK_TOKEN", webhookToken);

const url = `${publicBase}/api/whatsapp/inbound?token=${encodeURIComponent(webhookToken)}`;
const events = ["messages", "messages_update", "connection", "sender", "call"];

const response = await fetch(`${baseUrl}/webhook`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    token: instanceToken,
  },
  body: JSON.stringify({
    url,
    enabled: true,
    events,
    action: "add",
  }),
});

const data = await response.json().catch(() => ({}));

console.log(JSON.stringify({
  ok: response.ok,
  status: response.status,
  public_base: publicBase,
  endpoint: "/api/whatsapp/inbound",
  token_configured: true,
  response_shape: data && typeof data === "object" ? Object.keys(data).slice(0, 8) : [],
}, null, 2));

process.exit(response.ok ? 0 : 1);
