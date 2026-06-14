import assert from "node:assert/strict";
import { createExecutionPlan } from "../router/v2.js";

function plan(task) {
  return createExecutionPlan({ task, requestedBy: "test" });
}

const landing = plan("criar landing page moderna com copy e formulario de WhatsApp");
assert.equal(landing.task_brief.area, "frontend_visual");
assert.equal(landing.task_brief.risk, "low");
assert.equal(landing.budget.mode, "cost_effective");
assert.equal(landing.primary.agent_id, "frontend");
assert.equal(landing.model_policy.preferred_model, "gemini_visual");
assert.equal(landing.reviewer.required, false);

const summary = plan("resumir pendencias do projeto");
assert.equal(summary.task_brief.area, "ops");
assert.equal(summary.task_brief.risk, "low");
assert.equal(summary.budget.mode, "cheap_first");
assert.equal(summary.model_policy.preferred_model, "openrouter_free");

const portainer = plan("verificar deploy no Portainer e diagnosticar erro de webhook do WhatsApp sem mexer no banco");
assert.equal(portainer.project, "portainer");
assert.equal(portainer.environment, "portainer");
assert.equal(portainer.task_brief.area, "infra");
assert.equal(portainer.task_brief.risk, "high");
assert.equal(portainer.primary.agent_id, "infra");
assert.equal(portainer.reviewer.required, true);
assert.equal(portainer.reviewer.agent_id, "qa");
assert.ok(portainer.blocked_tools.includes("database_write"));
assert.ok(portainer.blocked_tools.includes("deploy"));
assert.ok(portainer.blocked_tools.includes("secret_write"));
assert.ok(portainer.done_when.includes("fiscal aprovou antes de concluir"));

const supabase = plan("planejar migration Supabase com RLS sem aplicar no banco");
assert.equal(supabase.environment, "supabase");
assert.equal(supabase.task_brief.area, "data");
assert.equal(supabase.task_brief.risk, "high");
assert.equal(supabase.primary.agent_id, "backend");
assert.equal(supabase.reviewer.agent_id, "seguranca");
assert.ok(supabase.allowed_tools.includes("database_read"));
assert.ok(supabase.allowed_tools.includes("migration_plan"));
assert.ok(supabase.blocked_tools.includes("database_write"));

console.log("router-v2 tests passed");
