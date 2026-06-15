#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { readArenaRuns } from "../arena/store.js";
import { readNotifications } from "../notifications/store.js";
import { supabaseConversationConfigured, checkConversationStoreHealth } from "../dashboard/conversation-store.js";

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

function fileCount(filePath) {
  if (!fs.existsSync(filePath)) return { exists: false, count: 0, last_created_at: null };
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const items = Array.isArray(parsed) ? parsed : [];
    return {
      exists: true,
      count: items.length,
      last_created_at: items.at(-1)?.created_at || null,
    };
  } catch {
    return { exists: true, count: 0, last_created_at: null, error: "invalid_json" };
  }
}

async function productionSummary(url) {
  if (!url) return null;
  try {
    const response = await fetch(`${url.replace(/\/+$/, "")}/api/summary`);
    const data = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      totals: data.totals || null,
      usage: data.usage || null,
      conversation_source: data.health?.conversation_source || null,
      conversation_store: data.health?.conversation_store || null,
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

loadEnv();

const root = process.cwd();
const notificationsPath = path.join(root, ".agents", "notifications.json");
const arenaPath = path.join(root, ".agents", "arena-runs.json");
const outputsDir = path.join(root, "output");
const outputs = fs.existsSync(outputsDir)
  ? fs.readdirSync(outputsDir).filter((name) => name.endsWith(".json")).length
  : 0;

const envStatus = {
  whatsapp: Boolean(process.env.WHATSAPP_GO_URL && process.env.WHATSAPP_GO_INSTANCE_TOKEN),
  gemini: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
  openai: Boolean(process.env.OPENAI_API_KEY),
  openrouter: Boolean(process.env.OPENROUTER_API_KEY),
  groq: Boolean(process.env.GROQ_API_KEY),
  xai: Boolean(process.env.XAI_API_KEY || process.env.GROK_API_KEY),
  supabase_history: supabaseConversationConfigured(process.env),
};

const report = {
  cwd: root,
  env: envStatus,
  local: {
    notifications_file: notificationsPath,
    notifications: fileCount(notificationsPath),
    arena_file: arenaPath,
    arena: fileCount(arenaPath),
    arena_runs_readable: readArenaRuns().length,
    notifications_readable: readNotifications().length,
    outputs,
  },
  supabase: await checkConversationStoreHealth(process.env),
  production: await productionSummary(process.env.GERENTE_PUBLIC_BASE || "https://gerente.soberano.pro"),
  note: "Segredos foram mascarados; este diagnostico mostra apenas presenca/configuracao.",
};

console.log(JSON.stringify(report, null, 2));
