import assert from "node:assert/strict";
import { normalizeGerenteCommand } from "../dashboard/whatsapp-command.js";

assert.equal(normalizeGerenteCommand("Gerente, me responde OK"), "/gerente me responde OK");
assert.equal(normalizeGerenteCommand("oi gerente, me responde OK"), "/gerente me responde OK");
assert.equal(normalizeGerenteCommand("Geraldo, me responde OK"), "/gerente me responde OK");
assert.equal(normalizeGerenteCommand("barra gerente me responde OK"), "/gerente me responde OK");
assert.equal(normalizeGerenteCommand("gerente IA, listar agentes"), "/gerente listar agentes");
assert.equal(normalizeGerenteCommand("/gerente ajuda"), "/gerente ajuda");
assert.equal(normalizeGerenteCommand("mensagem comum"), "mensagem comum");

console.log("whatsapp command tests passed");
