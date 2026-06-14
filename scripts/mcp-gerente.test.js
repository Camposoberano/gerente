import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";

function encode(message) {
  const body = JSON.stringify(message);
  return `Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`;
}

function createParser(onMessage) {
  let buffer = Buffer.alloc(0);
  return (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    while (true) {
      const headerEnd = buffer.indexOf("\r\n\r\n");
      if (headerEnd === -1) break;
      const header = buffer.slice(0, headerEnd).toString("utf8");
      const match = header.match(/Content-Length:\s*(\d+)/i);
      assert.ok(match, "missing content length");
      const length = Number(match[1]);
      const start = headerEnd + 4;
      const end = start + length;
      if (buffer.length < end) break;
      onMessage(JSON.parse(buffer.slice(start, end).toString("utf8")));
      buffer = buffer.slice(end);
    }
  };
}

const child = spawn(process.execPath, [path.join("mcp", "gerente-server.js")], {
  cwd: process.cwd(),
  stdio: ["pipe", "pipe", "pipe"],
});

const messages = [];
child.stdout.on("data", createParser((message) => messages.push(message)));

function send(message) {
  child.stdin.write(encode(message));
}

async function waitFor(id) {
  const started = Date.now();
  while (Date.now() - started < 5000) {
    const found = messages.find((message) => message.id === id);
    if (found) return found;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`timeout waiting for ${id}`);
}

send({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1" } } });
const init = await waitFor(1);
assert.equal(init.result.serverInfo.name, "gerente-mcp");

send({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
const list = await waitFor(2);
const toolNames = list.result.tools.map((tool) => tool.name);
assert.ok(toolNames.includes("router.plan"));
assert.ok(toolNames.includes("health.coolify"));
assert.ok(toolNames.includes("project.context"));

send({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "router.plan", arguments: { task: "verificar deploy no Coolify sem alterar nada" } } });
const plan = await waitFor(3);
const parsed = JSON.parse(plan.result.content[0].text);
assert.equal(parsed.environment, "coolify");
assert.equal(parsed.status, "planned");

child.kill();
console.log("gerente MCP tests passed");
