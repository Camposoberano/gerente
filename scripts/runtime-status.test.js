import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { recordRuntimeHeartbeat, summarizeRuntime } from "../runtime/status.js";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "gerente-runtime-"));
const storePath = path.join(tmpDir, "runtime-status.json");

const first = recordRuntimeHeartbeat({
  component: "mcp",
  environment: "antigrade",
  detail: "process started",
  storePath,
});
assert.equal(first.component, "mcp");
assert.equal(first.environment, "antigrade");
assert.equal(first.hits, 1);

const second = recordRuntimeHeartbeat({
  component: "mcp",
  environment: "antigrade",
  detail: "tool:gerente.command",
  storePath,
});
assert.equal(second.hits, 2);

const summary = summarizeRuntime(JSON.parse(fs.readFileSync(storePath, "utf8")));
assert.equal(summary.length, 1);
assert.equal(summary[0].online, true);
assert.equal(summary[0].detail, "tool:gerente.command");

console.log("runtime status tests passed");
