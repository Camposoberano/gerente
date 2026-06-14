#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createExecutionPlan } from "../router/v2.js";
import { buildArenaRanking } from "../arena/store.js";
import { sendWhatsAppGoMessage } from "../notifications/whatsapp-go.js";
import { recordNotification } from "../notifications/store.js";
import { handleGerenteCommand } from "../gerente/command.js";

const ROOT = process.cwd();
const PROTOCOL_VERSION = "2024-11-05";

function loadEnv(file = path.join(ROOT, ".env")) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    const key = line.slice(0, index);
    const value = line.slice(index + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

function jsonText(value) {
  return {
    content: [
      {
        type: "text",
        text: typeof value === "string" ? value : JSON.stringify(value, null, 2),
      },
    ],
  };
}

function runNodeScript(scriptName) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(ROOT, "scripts", scriptName)], {
      cwd: ROOT,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("close", (code) => {
      resolve({
        ok: code === 0,
        exit_code: code,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
      });
    });
  });
}

function readJsonFile(relativePath, fallback) {
  const filePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJsonFile(relativePath, value) {
  const filePath = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function configured(name) {
  return Boolean(process.env[name]);
}

function projectContext() {
  return {
    project: "gerente",
    cwd: ROOT,
    services: {
      coolify: configured("COOLIFY_API_URL") && configured("COOLIFY_API_TOKEN"),
      portainer: configured("PORTAINER_API_URL") && configured("PORTAINER_API_TOKEN"),
      github: configured("GITHUB_TOKEN") || configured("GH_TOKEN"),
      firecrawl: configured("FIRECRAWL_API_KEY"),
      jina: configured("JINA_API_KEY"),
      whatsapp_go: configured("WHATSAPP_GO_URL") && configured("WHATSAPP_GO_INSTANCE_TOKEN"),
      sentry_mcp: configured("SENTRY_MCP_URL"),
      cloudflare_mcp: configured("CLOUDFLARE_MCP_URL"),
      context7: true,
    },
    docs: [
      "docs/MCP_SKILLS_AGENTS_PADRAO.md",
      "docs/MCP_SO_PRIORIDADES.md",
      "docs/PORTAINER_MCP_PASSO_A_PASSO.md",
      "docs/CONSOLIDACAO_GERENTE.md",
    ].filter((file) => fs.existsSync(path.join(ROOT, file))),
    commands: [
      "npm run router:plan -- \"tarefa\"",
      "npm run arena:ranking",
      "npm run coolify:health",
      "npm run portainer:health",
      "npm run github:health",
      "npm run firecrawl:health",
      "npm run jina:health",
      "npm run llm:health",
      "npm run dashboard",
    ],
  };
}

const healthScripts = {
  coolify: "coolify-health.js",
  portainer: "portainer-health.js",
  github: "github-health.js",
  firecrawl: "firecrawl-health.js",
  jina: "jina-health.js",
  llm: "llm-health.js",
};

const tools = [
  {
    name: "router.plan",
    description: "Gera um execution_plan do Router V2 para uma tarefa.",
    inputSchema: {
      type: "object",
      properties: {
        task: { type: "string", description: "Tarefa em linguagem natural." },
        project: { type: "string", description: "Projeto/ambiente opcional." },
        requestedBy: { type: "string", description: "Origem do pedido." },
      },
      required: ["task"],
    },
  },
  {
    name: "gerente.command",
    description: "Processa texto no contrato /gerente e retorna plano/resposta.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "Texto recebido, ex: /gerente revisar deploy." },
        project: { type: "string", description: "Projeto opcional." },
        requestedBy: { type: "string", description: "Origem opcional." },
      },
      required: ["text"],
    },
  },
  {
    name: "arena.rank",
    description: "Retorna ranking da Arena por modelo e agente.",
    inputSchema: {
      type: "object",
      properties: {
        area: { type: "string", description: "Area opcional, ex: ops, infra, code." },
      },
    },
  },
  ...Object.keys(healthScripts).map((service) => ({
    name: `health.${service}`,
    description: `Executa healthcheck sanitizado de ${service}.`,
    inputSchema: { type: "object", properties: {} },
  })),
  {
    name: "notify.whatsapp",
    description: "Envia uma mensagem via WhatsApp Go/Uazapi configurado no gerente.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "Texto da mensagem." },
      },
      required: ["text"],
    },
  },
  {
    name: "project.context",
    description: "Retorna contexto operacional do gerente, servicos configurados e documentos principais.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "approval.request",
    description: "Registra pedido de aprovacao para acao de risco.",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", description: "Acao solicitada." },
        risk: { type: "string", enum: ["low", "medium", "high"], description: "Nivel de risco." },
        reason: { type: "string", description: "Motivo da acao." },
        rollback: { type: "string", description: "Plano de rollback." },
      },
      required: ["action", "risk", "reason"],
    },
  },
];

async function callTool(name, args = {}) {
  if (name === "router.plan") {
    return jsonText(createExecutionPlan({
      task: args.task,
      project: args.project || null,
      requestedBy: args.requestedBy || "mcp",
    }));
  }

  if (name === "gerente.command") {
    return jsonText(handleGerenteCommand({
      text: args.text,
      project: args.project || null,
      requestedBy: args.requestedBy || "mcp",
    }));
  }

  if (name === "arena.rank") {
    return jsonText(buildArenaRanking({ area: args.area || null }));
  }

  if (name.startsWith("health.")) {
    const service = name.slice("health.".length);
    const script = healthScripts[service];
    if (!script) throw new Error(`Healthcheck desconhecido: ${service}`);
    const result = await runNodeScript(script);
    let parsed = null;
    try {
      parsed = JSON.parse(result.stdout);
    } catch {
      parsed = result;
    }
    return jsonText(parsed);
  }

  if (name === "notify.whatsapp") {
    const delivery = await sendWhatsAppGoMessage({ text: args.text || "" });
    recordNotification({
      type: "mcp_whatsapp_message",
      title: "Mensagem enviada via gerente-mcp",
      channel: "whatsapp_go",
      message: args.text || "",
      delivery,
    });
    return jsonText({ ok: delivery.ok, skipped: delivery.skipped, status: delivery.status, reason: delivery.reason });
  }

  if (name === "project.context") {
    return jsonText(projectContext());
  }

  if (name === "approval.request") {
    const approvals = readJsonFile(".agents/approval-requests.json", []);
    const record = {
      id: `approval_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
      created_at: new Date().toISOString(),
      status: "pending",
      action: args.action,
      risk: args.risk,
      reason: args.reason,
      rollback: args.rollback || null,
    };
    approvals.push(record);
    writeJsonFile(".agents/approval-requests.json", approvals.slice(-300));
    return jsonText(record);
  }

  throw new Error(`Tool desconhecida: ${name}`);
}

function send(message) {
  const body = JSON.stringify(message);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`);
}

function ok(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function fail(id, error) {
  send({
    jsonrpc: "2.0",
    id,
    error: {
      code: -32000,
      message: error?.message || String(error),
    },
  });
}

async function handle(message) {
  const { id, method, params = {} } = message;

  try {
    if (method === "initialize") {
      ok(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: "gerente-mcp", version: "1.0.0" },
      });
      return;
    }

    if (method === "notifications/initialized") return;

    if (method === "tools/list") {
      ok(id, { tools });
      return;
    }

    if (method === "tools/call") {
      ok(id, await callTool(params.name, params.arguments || {}));
      return;
    }

    if (method === "ping") {
      ok(id, {});
      return;
    }

    if (id !== undefined) fail(id, new Error(`Metodo nao suportado: ${method}`));
  } catch (error) {
    if (id !== undefined) fail(id, error);
  }
}

let buffer = Buffer.alloc(0);

process.stdin.on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);

  while (true) {
    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) break;

    const header = buffer.slice(0, headerEnd).toString("utf8");
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) {
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }

    const length = Number(match[1]);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + length;
    if (buffer.length < bodyEnd) break;

    const body = buffer.slice(bodyStart, bodyEnd).toString("utf8");
    buffer = buffer.slice(bodyEnd);

    try {
      void handle(JSON.parse(body));
    } catch (error) {
      fail(null, error);
    }
  }
});
