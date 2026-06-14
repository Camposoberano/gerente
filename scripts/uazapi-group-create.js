import fs from "fs";

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

function normalizeNumber(value = "") {
  return String(value).replace(/\D/g, "");
}

const env = loadEnv();
const baseUrl = (env.WHATSAPP_GO_URL || env.UAZAPI_URL || "").replace(/\/$/, "");
const token = env.WHATSAPP_GO_INSTANCE_TOKEN || env.UAZAPI_INSTANCE_TOKEN || "";
const groupName = process.argv.slice(2).join(" ").trim() || env.GERENTE_WHATSAPP_GROUP_NAME || "Gerente IA";
const participants = String(env.GERENTE_WHATSAPP_GROUP_PARTICIPANTS || env.WHATSAPP_NOTIFY_TO || "")
  .split(/[,\s;]+/)
  .map(normalizeNumber)
  .filter(Boolean);

if (!baseUrl || !token) {
  console.error(JSON.stringify({
    ok: false,
    reason: "UAZAPI_URL_or_instance_token_missing",
  }, null, 2));
  process.exit(1);
}

if (!participants.length) {
  console.error(JSON.stringify({
    ok: false,
    reason: "GERENTE_WHATSAPP_GROUP_PARTICIPANTS_or_WHATSAPP_NOTIFY_TO_missing",
  }, null, 2));
  process.exit(1);
}

const response = await fetch(`${baseUrl}/group/create`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    token,
  },
  body: JSON.stringify({
    name: groupName,
    participants,
  }),
});

const data = await response.json().catch(() => ({}));
const group = data.group || data.data?.group || data.data || {};
const groupId = data.groupjid || data.groupJid || data.jid || data.id || group.JID || group.jid || group.groupjid || null;
const failed = Array.isArray(data.failed) ? data.failed.length : 0;

if (groupId) {
  const envLines = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8").split(/\r?\n/) : [];
  const key = "GERENTE_WHATSAPP_GROUP_JID";
  const nextLine = `${key}=${groupId}`;
  const index = envLines.findIndex((line) => new RegExp(`^\\s*#?\\s*${key}=`).test(line));
  if (index >= 0) envLines[index] = nextLine;
  else envLines.push(nextLine);
  fs.writeFileSync(".env", envLines.join("\n"));
}

console.log(JSON.stringify({
  ok: response.ok,
  status: response.status,
  group_name: groupName,
  participants_count: participants.length,
  failed_count: failed,
  group_id_detected: Boolean(groupId),
  group_id: groupId,
  group_name_detected: group.Name || group.name || null,
  response_shape: data && typeof data === "object" ? Object.keys(data).slice(0, 8) : [],
}, null, 2));

process.exit(response.ok ? 0 : 1);
