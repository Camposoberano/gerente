import fs from "fs";

function loadEnv(file = ".env") {
  const env = {};
  if (!fs.existsSync(file)) return env;

  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    env[line.slice(0, index)] = line.slice(index + 1);
  }

  return env;
}

async function fetchSummary(baseUrl, token, endpoint) {
  const authStrategies = [
    { name: "Bearer", headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } },
    { name: "X-API-Key", headers: { "X-API-Key": token, Accept: "application/json" } },
  ];

  let lastResult = null;

  for (const auth of authStrategies) {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: auth.headers,
      redirect: "manual",
    });

    const contentType = response.headers.get("content-type") || "";
    let summary = "non_json";
    if (contentType.includes("application/json")) {
      const json = await response.json().catch(() => null);
      if (Array.isArray(json)) summary = `items:${json.length}`;
      else if (json && typeof json === "object") summary = `fields:${Object.keys(json).length}`;
    } else {
      await response.text().catch(() => "");
    }

    lastResult = {
      endpoint,
      auth: auth.name,
      status: response.status,
      ok: response.ok,
      summary,
    };

    if (response.ok || response.status !== 401) return lastResult;
  }

  return lastResult;
}

const env = loadEnv();
const baseUrl = (env.PORTAINER_API_URL || "").replace(/\/$/, "");
const token = env.PORTAINER_API_TOKEN || "";

if (!baseUrl || !token) {
  console.error(JSON.stringify({
    ok: false,
    reason: "PORTAINER_API_URL_or_PORTAINER_API_TOKEN_missing",
  }, null, 2));
  process.exit(1);
}

const endpoints = [
  "/api/status",
  "/api/system/status",
  "/api/endpoints",
  "/api/stacks",
];

const results = [];
for (const endpoint of endpoints) {
  try {
    results.push(await fetchSummary(baseUrl, token, endpoint));
  } catch (error) {
    results.push({
      endpoint,
      status: "ERR",
      ok: false,
      summary: error.message,
    });
  }
}

const ok = results.every((result) => result.ok);
console.log(JSON.stringify({
  ok,
  base_url_configured: true,
  token_configured: true,
  results,
}, null, 2));

process.exit(ok ? 0 : 1);
