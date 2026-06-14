import assert from "node:assert/strict";
import { handleGerenteCommand, parseGerenteText } from "../gerente/command.js";

assert.equal(parseGerenteText("/gerente ajuda").type, "help");
assert.equal(parseGerenteText("/gerente produto revisar frontend").manager, "gerente_produto");
assert.equal(parseGerenteText("/gerente negocio revisar oferta").manager, "gerente_negocio");
assert.equal(parseGerenteText("/gerente verificar deploy no Coolify").task, "verificar deploy no Coolify");
assert.equal(parseGerenteText("/gerente me ouviu?").type, "chat");
assert.equal(parseGerenteText("/gerente qual o link do projeto?").type, "chat");
assert.equal(parseGerenteText("/gerente executar verificar deploy no Coolify").type, "task");

const result = handleGerenteCommand({
  text: "/gerente verificar deploy no Coolify sem alterar nada",
  requestedBy: "test",
});

assert.equal(result.kind, "plan");
assert.equal(result.plan.environment, "coolify");
assert.ok(result.message.includes("Plano criado:"));

const chatResult = handleGerenteCommand({
  text: "/gerente me confirma se voce esta me ouvindo",
  requestedBy: "test",
});

assert.equal(chatResult.kind, "chat");
assert.ok(chatResult.message.includes("estou te ouvindo"));

console.log("gerente command tests passed");
