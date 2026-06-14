import assert from "node:assert/strict";
import fs from "fs";
import os from "os";
import path from "path";
import { createExecutionPlan } from "../router/v2.js";
import { createArenaRecord } from "../arena/scoring.js";
import { buildExecutionNotification } from "../notifications/index.js";
import { recordNotification, readNotifications } from "../notifications/store.js";
import { sendWhatsAppGoMessage } from "../notifications/whatsapp-go.js";

const executionPlan = createExecutionPlan({
  task: "resumir pendencias do projeto",
  requestedBy: "test",
});
const resultados = {
  infra: "Resumo concluido com pontos principais.",
};
const arenaRecord = createArenaRecord({ executionPlan, resultados });
const notification = buildExecutionNotification({
  tarefa: "resumir pendencias do projeto",
  executionPlan,
  resultados,
  arenaRecord,
});

assert.equal(notification.type, "execution_complete");
assert.equal(notification.area, "ops");
assert.equal(notification.preferred_model, "openrouter_free");
assert.ok(notification.message.includes("Executor: infra"));

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "gerente-notify-"));
const storePath = path.join(tmpDir, "notifications.json");
recordNotification(notification, storePath);
assert.equal(readNotifications(storePath).length, 1);

const skipped = await sendWhatsAppGoMessage({
  text: "teste",
  env: {},
  fetchImpl: async () => {
    throw new Error("should not call fetch");
  },
});
assert.equal(skipped.skipped, true);

console.log("notification tests passed");
