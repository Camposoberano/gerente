#!/usr/bin/env node
import { createExecutionPlan } from "../router/v2.js";

const task = process.argv.slice(2).join(" ").trim();

if (!task) {
  console.error("Uso: npm run router:plan -- \"descreva a tarefa\"");
  process.exit(1);
}

try {
  const plan = createExecutionPlan({ task });
  console.log(JSON.stringify(plan, null, 2));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

