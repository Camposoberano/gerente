#!/usr/bin/env node
import fs from "fs";
import path from "path";

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error("OPENROUTER_API_KEY ausente.");
  process.exit(1);
}

const res = await fetch("https://openrouter.ai/api/v1/models", {
  headers: { Authorization: `Bearer ${apiKey}` },
});

if (!res.ok) {
  console.error(`OpenRouter models falhou: ${res.status}`);
  process.exit(1);
}

const data = await res.json();
const free = data.data
  .filter((model) => {
    const prompt = Number(model.pricing?.prompt || 0);
    const completion = Number(model.pricing?.completion || 0);
    return model.id.endsWith(":free") || (prompt === 0 && completion === 0);
  })
  .map((model) => ({
    id: model.id,
    name: model.name,
    context_length: model.context_length,
    prompt: model.pricing?.prompt,
    completion: model.pricing?.completion,
  }));

console.log(JSON.stringify(free, null, 2));

