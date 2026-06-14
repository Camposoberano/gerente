import fs from "fs";
import path from "path";
import { createArenaRecord } from "./scoring.js";

const DEFAULT_STORE = path.join(process.cwd(), ".agents", "arena-runs.json");

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function readArenaRuns(storePath = DEFAULT_STORE) {
  if (!fs.existsSync(storePath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(storePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeArenaRuns(runs, storePath = DEFAULT_STORE) {
  ensureDir(storePath);
  fs.writeFileSync(storePath, JSON.stringify(runs, null, 2));
}

export function recordArenaRun({ executionPlan, resultados, storePath = DEFAULT_STORE }) {
  const runs = readArenaRuns(storePath);
  const record = createArenaRecord({ executionPlan, resultados });
  runs.push(record);
  writeArenaRuns(runs.slice(-500), storePath);
  return record;
}

function aggregateBy(runs, keyFn) {
  const groups = new Map();
  for (const run of runs) {
    const key = keyFn(run);
    if (!key) continue;
    const current = groups.get(key) || {
      key,
      runs: 0,
      score_sum: 0,
      fallback_count: 0,
      blocked_tool_count: 0,
      last_run_at: null,
    };
    current.runs += 1;
    current.score_sum += run.metrics.score;
    if (run.metrics.fallback_used) current.fallback_count += 1;
    if (run.metrics.blocked_tool_error) current.blocked_tool_count += 1;
    current.last_run_at = run.created_at;
    groups.set(key, current);
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      avg_score: Number((group.score_sum / group.runs).toFixed(4)),
      fallback_rate: Number((group.fallback_count / group.runs).toFixed(4)),
      blocked_tool_rate: Number((group.blocked_tool_count / group.runs).toFixed(4)),
    }))
    .sort((a, b) => b.avg_score - a.avg_score);
}

export function buildArenaRanking({ area = null, storePath = DEFAULT_STORE } = {}) {
  const runs = readArenaRuns(storePath).filter((run) => !area || run.area === area);
  return {
    area: area || "all",
    total_runs: runs.length,
    models: aggregateBy(runs, (run) => run.preferred_model),
    agents: aggregateBy(runs, (run) => run.primary_agent),
  };
}

