import assert from "node:assert/strict";
import { handleGerenteCommand, parseGerenteText } from "../gerente/command.js";

assert.equal(parseGerenteText("/gerente ajuda").type, "help");
assert.equal(parseGerenteText("/gerente produto revisar frontend").manager, "gerente_produto");
assert.equal(parseGerenteText("/gerente negocio revisar oferta").manager, "gerente_negocio");
assert.equal(parseGerenteText("/gerente verificar deploy no Coolify").task, "verificar deploy no Coolify");

const result = handleGerenteCommand({
  text: "/gerente verificar deploy no Coolify sem alterar nada",
  requestedBy: "test",
});

assert.equal(result.kind, "plan");
assert.equal(result.plan.environment, "coolify");
assert.ok(result.message.includes("Plano criado:"));

console.log("gerente command tests passed");
