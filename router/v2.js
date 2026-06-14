import crypto from "crypto";
import {
  classifyArea,
  classifyRisk,
  classifyComplexity,
  resolveBudget,
} from "../policies/task-policy.js";
import { resolveAgentPlan, resolveToolPolicy } from "../policies/agent-policy.js";
import { resolveModelPolicy } from "../providers/model-registry.js";

function buildTaskId(taskText) {
  const hash = crypto.createHash("sha1").update(taskText).digest("hex").slice(0, 10);
  return `task_${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}_${hash}`;
}

function resolveEnvironment(taskText) {
  const normalized = taskText.toLowerCase();
  if (normalized.includes("portainer")) return "portainer";
  if (normalized.includes("vps")) return "vps";
  if (normalized.includes("supabase")) return "supabase";
  if (normalized.includes("github")) return "github";
  if (normalized.includes("coolify")) return "coolify";
  if (normalized.includes("evohub")) return "evohub";
  return "generic_project";
}

function resolveDoneWhen({ area, risk }) {
  const checks = ["plano registrado", "escopo respeitado"];

  if (["code", "frontend_visual", "automation"].includes(area)) {
    checks.push("alteracao validada por teste ou verificacao equivalente");
  }
  if (["infra", "ops"].includes(area)) {
    checks.push("health check ou log relevante verificado");
  }
  if (area === "data") {
    checks.push("schema/query validado sem escrita perigosa nao aprovada");
  }
  if (risk !== "low") {
    checks.push("fiscal aprovou antes de concluir");
  }

  return checks;
}

export function createExecutionPlan({ task, project = null, requestedBy = "user" }) {
  if (!task || !task.trim()) {
    throw new Error("Informe uma tarefa para gerar o plano.");
  }

  const area = classifyArea(task);
  const risk = classifyRisk(task);
  const complexity = classifyComplexity(task);
  const budget = resolveBudget({ area, risk, complexity });
  const agentPlan = resolveAgentPlan(area, risk);
  const toolPolicy = resolveToolPolicy({ area, risk });
  const modelPolicy = resolveModelPolicy({ area, risk, budget });

  return {
    schema_version: "router_v2.0",
    task_id: buildTaskId(task),
    requested_by: requestedBy,
    created_at: new Date().toISOString(),
    project: project || resolveEnvironment(task),
    environment: resolveEnvironment(task),
    task_brief: {
      original_text: task,
      area,
      risk,
      complexity,
    },
    budget,
    manager: agentPlan.manager,
    primary: agentPlan.primary,
    reviewer: agentPlan.reviewer,
    fallback: agentPlan.fallback,
    model_policy: modelPolicy,
    context_policy: {
      mode: "compact",
      include_files_only_when_needed: true,
      handoff_required: risk !== "low" || complexity !== "low",
    },
    allowed_tools: toolPolicy.allowed_tools,
    blocked_tools: toolPolicy.blocked_tools,
    done_when: resolveDoneWhen({ area, risk }),
    status: "planned",
  };
}
