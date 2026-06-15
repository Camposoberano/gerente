import fs from "fs";
import os from "os";
import path from "path";

const DEFAULT_STORE = path.join(process.cwd(), ".agents", "runtime-status.json");
const ONLINE_WINDOW_MS = 2 * 60 * 1000;

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function keyFor(component, environment) {
  return `${component || "unknown"}:${environment || "default"}`;
}

export function readRuntimeStatus(storePath = DEFAULT_STORE) {
  if (!fs.existsSync(storePath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(storePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeRuntimeStatus(items, storePath = DEFAULT_STORE) {
  ensureDir(storePath);
  fs.writeFileSync(storePath, JSON.stringify(items, null, 2));
}

export function recordRuntimeHeartbeat({
  component,
  environment = process.env.GERENTE_RUNTIME_ENV || process.env.GERENTE_CLIENT_NAME || "local",
  status = "online",
  detail = null,
  source = "local",
  pid = process.pid,
  cwd = process.cwd(),
  host = os.hostname(),
  metadata = {},
  storePath = DEFAULT_STORE,
} = {}) {
  const items = readRuntimeStatus(storePath);
  const id = keyFor(component, environment);
  const previous = items.find((item) => item.id === id) || {};
  const record = {
    ...previous,
    id,
    component: component || previous.component || "unknown",
    environment,
    status,
    detail,
    source,
    pid,
    cwd,
    host,
    metadata,
    last_seen_at: nowIso(),
    first_seen_at: previous.first_seen_at || nowIso(),
    hits: Number(previous.hits || 0) + 1,
  };

  const next = [record, ...items.filter((item) => item.id !== id)].slice(0, 100);
  writeRuntimeStatus(next, storePath);
  return record;
}

export function runtimeOnline(record, now = Date.now()) {
  if (!record?.last_seen_at) return false;
  const seen = Date.parse(record.last_seen_at);
  return Number.isFinite(seen) && now - seen <= ONLINE_WINDOW_MS;
}

export function summarizeRuntime(items = readRuntimeStatus()) {
  const now = Date.now();
  return items.map((item) => ({
    ...item,
    online: runtimeOnline(item, now),
    age_seconds: item.last_seen_at ? Math.max(0, Math.round((now - Date.parse(item.last_seen_at)) / 1000)) : null,
  }));
}

export async function sendRemoteHeartbeat({
  component,
  detail = null,
  metadata = {},
  env = process.env,
  fetchImpl = fetch,
} = {}) {
  const base = String(env.GERENTE_PUBLIC_BASE || "").replace(/\/+$/, "");
  const token = env.GERENTE_WEBHOOK_TOKEN;
  if (!base || !token) return { ok: false, skipped: true, reason: "remote_heartbeat_not_configured" };

  const body = {
    component,
    environment: env.GERENTE_RUNTIME_ENV || env.GERENTE_CLIENT_NAME || "local",
    detail,
    source: "remote_heartbeat",
    pid: process.pid,
    cwd: process.cwd(),
    host: os.hostname(),
    metadata,
  };

  try {
    const response = await fetchImpl(`${base}/api/runtime/heartbeat?token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
