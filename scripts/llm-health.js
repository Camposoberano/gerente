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

async function openAICompatible({ provider, baseUrl, apiKey, model }) {
  if (!apiKey) return { provider, configured: false, ok: false, model, detail: "token ausente" };
  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...(provider === "OpenRouter" ? { "HTTP-Referer": "http://localhost/gerente", "X-Title": "Gerente Healthcheck" } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "Responda apenas OK" }],
        max_tokens: 16,
      }),
    });
    const data = await res.json().catch(() => ({}));
    return {
      provider,
      configured: true,
      ok: res.ok,
      model,
      detail: res.ok ? data.choices?.[0]?.message?.content || "ok" : JSON.stringify(data).slice(0, 300),
    };
  } catch (error) {
    return { provider, configured: true, ok: false, model, detail: error.message };
  }
}

async function anthropic() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { provider: "Anthropic/Claude", configured: false, ok: false, model: "claude-sonnet-4-6", detail: "token ausente" };
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 16,
        messages: [{ role: "user", content: "Responda apenas OK" }],
      }),
    });
    const data = await res.json().catch(() => ({}));
    return {
      provider: "Anthropic/Claude",
      configured: true,
      ok: res.ok,
      model: "claude-sonnet-4-6",
      detail: res.ok ? data.content?.map((part) => part.text).join("") || "ok" : JSON.stringify(data).slice(0, 300),
    };
  } catch (error) {
    return { provider: "Anthropic/Claude", configured: true, ok: false, model: "claude-sonnet-4-6", detail: error.message };
  }
}

async function gemini() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) return { provider: "Google/Gemini", configured: false, ok: false, model: "gemini-2.5-flash", detail: "token ausente" };
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: "Responda apenas OK" }] }] }),
    });
    const data = await res.json().catch(() => ({}));
    return {
      provider: "Google/Gemini",
      configured: true,
      ok: res.ok,
      model: "gemini-2.5-flash",
      detail: res.ok ? data.candidates?.[0]?.content?.parts?.[0]?.text || "ok" : JSON.stringify(data).slice(0, 300),
    };
  } catch (error) {
    return { provider: "Google/Gemini", configured: true, ok: false, model: "gemini-2.5-flash", detail: error.message };
  }
}

loadEnv();

const results = await Promise.all([
  anthropic(),
  gemini(),
  openAICompatible({ provider: "OpenAI/GPT", baseUrl: "https://api.openai.com/v1", apiKey: process.env.OPENAI_API_KEY, model: "gpt-4.1-mini" }),
  openAICompatible({ provider: "OpenRouter", baseUrl: "https://openrouter.ai/api/v1", apiKey: process.env.OPENROUTER_API_KEY, model: "qwen/qwen3.7-plus" }),
  openAICompatible({ provider: "Groq", baseUrl: "https://api.groq.com/openai/v1", apiKey: process.env.GROQ_API_KEY, model: "llama-3.3-70b-versatile" }),
  openAICompatible({ provider: "xAI/Grok", baseUrl: "https://api.x.ai/v1", apiKey: process.env.XAI_API_KEY || process.env.GROK_API_KEY, model: "grok-4.3" }),
]);

console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.configured && !result.ok)) process.exitCode = 1;
