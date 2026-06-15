import { createClient } from "@supabase/supabase-js";

const DEFAULT_TABLE = "gerente_whatsapp_messages";

let cachedClient = null;
let cachedKey = null;

function tableName(env = process.env) {
  return env.GERENTE_SUPABASE_MESSAGES_TABLE || DEFAULT_TABLE;
}

function supabaseKey(env = process.env) {
  return env.SUPABASE_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY || "";
}

export function supabaseConversationConfigured(env = process.env) {
  return Boolean(env.SUPABASE_URL && supabaseKey(env));
}

function getSupabaseClient(env = process.env) {
  const url = env.SUPABASE_URL;
  const key = supabaseKey(env);
  if (!url || !key) return null;

  const cacheKey = `${url}:${key.slice(0, 8)}`;
  if (cachedClient && cachedKey === cacheKey) return cachedClient;
  cachedClient = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  cachedKey = cacheKey;
  return cachedClient;
}

function normalizeConversation(record = {}) {
  return {
    id: record.id,
    created_at: record.created_at,
    from: record.from || record.sender || null,
    chat_id: record.chat_id || null,
    original_message: record.original_message || "",
    normalized_message: record.normalized_message || "",
    response_preview: record.response_preview || "",
    result_kind: record.result_kind || null,
    task_id: record.task_id || null,
    agent_id: record.agent_id || null,
    agent_name: record.agent_name || null,
    llm_id: record.llm_id || null,
    llm_label: record.llm_label || null,
    response_source: record.response_source || null,
    usage_provider: record.usage_provider || record.metadata?.usage_provider || null,
    usage_model: record.usage_model || record.metadata?.usage_model || null,
    input_tokens: Number(record.input_tokens || record.metadata?.input_tokens || 0),
    output_tokens: Number(record.output_tokens || record.metadata?.output_tokens || 0),
    total_tokens: Number(record.total_tokens || record.metadata?.total_tokens || 0),
    audio_detected: Boolean(record.audio_detected),
    transcribed: Boolean(record.transcribed),
    transcription_error: record.transcription_error || null,
  };
}

export function conversationFromNotification(item = {}) {
  return normalizeConversation({
    id: item.id,
    created_at: item.created_at,
    from: item.from || null,
    chat_id: item.chat_id || null,
    original_message: item.original_message || item.message || "",
    normalized_message: item.message || "",
    response_preview: item.response_preview || "",
    result_kind: item.result_kind || null,
    task_id: item.task_id || null,
    agent_id: item.agent_id || null,
    agent_name: item.agent_name || null,
    llm_id: item.llm_id || null,
    llm_label: item.llm_label || null,
    response_source: item.response_source || null,
    usage_provider: item.usage_provider || null,
    usage_model: item.usage_model || null,
    input_tokens: item.input_tokens || 0,
    output_tokens: item.output_tokens || 0,
    total_tokens: item.total_tokens || 0,
    audio_detected: item.audio_detected,
    transcribed: item.transcribed,
    transcription_error: item.transcription_error,
  });
}

export async function recordWhatsAppConversation(record, env = process.env) {
  if (!supabaseConversationConfigured(env)) {
    return { ok: false, skipped: true, reason: "supabase_not_configured" };
  }

  const client = getSupabaseClient(env);
  const payload = {
    source: "whatsapp_go",
    sender: record.from || null,
    chat_id: record.chat_id || null,
    original_message: record.original_message || null,
    normalized_message: record.normalized_message || null,
    response_preview: record.response_preview || null,
    result_kind: record.result_kind || null,
    task_id: record.task_id || null,
    agent_id: record.agent_id || null,
    agent_name: record.agent_name || null,
    llm_id: record.llm_id || null,
    llm_label: record.llm_label || null,
    response_source: record.response_source || null,
    usage_provider: record.usage_provider || null,
    usage_model: record.usage_model || null,
    input_tokens: Number(record.input_tokens || 0),
    output_tokens: Number(record.output_tokens || 0),
    total_tokens: Number(record.total_tokens || 0),
    audio_detected: Boolean(record.audio_detected),
    transcribed: Boolean(record.transcribed),
    transcription_error: record.transcription_error || null,
    metadata: record.metadata || {},
  };

  const { error } = await client.from(tableName(env)).insert(payload);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function readWhatsAppConversations({ limit = 20, fallbackNotifications = [], env = process.env } = {}) {
  if (!supabaseConversationConfigured(env)) {
    return {
      source: "local_notifications",
      error: null,
      items: fallbackNotifications
        .filter((item) => item.channel === "whatsapp_go" && item.type === "whatsapp_inbound")
        .slice(-limit)
        .reverse()
        .map(conversationFromNotification),
    };
  }

  const client = getSupabaseClient(env);
  const { data, error } = await client
    .from(tableName(env))
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return {
      source: "local_notifications",
      error: error.message,
      items: fallbackNotifications
        .filter((item) => item.channel === "whatsapp_go" && item.type === "whatsapp_inbound")
        .slice(-limit)
        .reverse()
        .map(conversationFromNotification),
    };
  }

  return {
    source: "supabase",
    error: null,
    items: (data || []).map(normalizeConversation),
  };
}

export async function checkConversationStoreHealth(env = process.env) {
  if (!supabaseConversationConfigured(env)) {
    return {
      configured: false,
      ok: false,
      source: "local_notifications",
      detail: "SUPABASE_URL ou service key ausente",
    };
  }

  const client = getSupabaseClient(env);
  const { error } = await client
    .from(tableName(env))
    .select("id", { count: "exact", head: true });

  return {
    configured: true,
    ok: !error,
    source: "supabase",
    table: tableName(env),
    detail: error ? error.message : "ok",
  };
}
