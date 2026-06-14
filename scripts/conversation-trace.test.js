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

console.log("conversation trace tests passed");
