import assert from "node:assert/strict";
import { conversationFromNotification, readWhatsAppConversations, supabaseConversationConfigured } from "../dashboard/conversation-store.js";

assert.equal(supabaseConversationConfigured({}), false);
assert.equal(supabaseConversationConfigured({ SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_KEY: "secret" }), true);

const notification = {
  id: "n1",
  created_at: "2026-06-14T00:00:00.000Z",
  type: "whatsapp_inbound",
  channel: "whatsapp_go",
  from: "5511999999999@s.whatsapp.net",
  message: "/gerente me responde OK",
  original_message: "oi gerente, me responde OK",
  response_preview: "OK",
  result_kind: "chat",
  agent_id: "voice_interface",
  agent_name: "Interface de Voz",
  llm_id: "gemini_conversation",
  llm_label: "Gemini 2.5 Flash",
  response_source: "gemini",
};

const normalized = conversationFromNotification(notification);
assert.equal(normalized.original_message, "oi gerente, me responde OK");
assert.equal(normalized.normalized_message, "/gerente me responde OK");
assert.equal(normalized.llm_label, "Gemini 2.5 Flash");

const fallback = await readWhatsAppConversations({
  fallbackNotifications: [notification],
  env: {},
});
assert.equal(fallback.source, "local_notifications");
assert.equal(fallback.items.length, 1);
assert.equal(fallback.items[0].agent_id, "voice_interface");

console.log("conversation store tests passed");
