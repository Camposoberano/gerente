import assert from "node:assert/strict";
import { handleGerenteCommandSmart } from "../gerente/command.js";
import { buildConversationTrace } from "../gerente/conversation-trace.js";

const inventory = await handleGerenteCommandSmart({
  text: "/gerente me passa agentes, llm, funcao e custo por 1 milhao de tokens",
  env: {},
  fetchImpl: async () => {
    throw new Error("should not call network");
  },
});
const inventoryTrace = buildConversationTrace(inventory);
assert.equal(inventoryTrace.response_source, "agent_inventory");
assert.equal(inventoryTrace.llm_id, "local_rules");

const plan = await handleGerenteCommandSmart({
  text: "/gerente executar verificar deploy no Coolify",
  env: {},
});
const planTrace = buildConversationTrace(plan);
assert.equal(planTrace.response_source, "execution_plan");
assert.ok(planTrace.agent_id);
assert.ok(planTrace.llm_id);

const geminiChat = await handleGerenteCommandSmart({
  text: "/gerente voce esta me ouvindo?",
  env: { GEMINI_API_KEY: "test-key" },
  fetchImpl: async () => ({
    ok: true,
    json: async () => ({
      candidates: [{ content: { parts: [{ text: JSON.stringify({ kind: "chat", message: "Sim, estou ouvindo.", task: "", manager: null }) }] } }],
      usageMetadata: {
        promptTokenCount: 120,
        candidatesTokenCount: 15,
        totalTokenCount: 135,
      },
    }),
  }),
});
const geminiTrace = buildConversationTrace(geminiChat);
assert.equal(geminiTrace.response_source, "gemini");
assert.equal(geminiTrace.usage_provider, "gemini");
assert.equal(geminiTrace.usage_model, "gemini-2.5-flash");
assert.equal(geminiTrace.input_tokens, 120);
assert.equal(geminiTrace.output_tokens, 15);
assert.equal(geminiTrace.total_tokens, 135);

console.log("conversation trace tests passed");
