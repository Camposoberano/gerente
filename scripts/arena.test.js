import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import os from "os";
import { createExecutionPlan } from "../router/v2.js";
import { recordArenaRun, buildArenaRanking, readArenaRuns } from "../arena/store.js";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "gerente-arena-"));
const storePath = path.join(tmpDir, "arena-runs.json");

const executionPlan = createExecutionPlan({
  task: "verificar deploy no Portainer e diagnosticar erro de webhook sem mexer no banco",
  requestedBy: "test",
});

const resultados = {
  infra: "Diagnostico concluido com health check e logs verificados.",
  __review: {
    agent_id: "qa",
    required: true,
    result: "Veredito: APROVADO. Riscos encontrados: nenhum critico.",
  },
};

const record = recordArenaRun({ executionPlan, resultados, storePath });
assert.equal(record.area, "infra");
assert.equal(record.primary_agent, "infra");
assert.equal(record.preferred_model, "codex_exec");
assert.ok(record.metrics.score > 0.5);

const runs = readArenaRuns(storePath);
assert.equal(runs.length, 1);

const ranking = buildArenaRanking({ area: "infra", storePath });
assert.equal(ranking.total_runs, 1);
assert.equal(ranking.models[0].key, "codex_exec");
assert.equal(ranking.agents[0].key, "infra");

console.log("arena tests passed");

