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

const env = loadEnv();
const baseUrl = (env.GITHUB_API_URL || "https://api.github.com").replace(/\/$/, "");
const token = env.GITHUB_TOKEN || env.GH_TOKEN || "";

if (!token) {
  console.error(JSON.stringify({
    ok: false,
    reason: "GITHUB_TOKEN_missing",
  }, null, 2));
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "gerente-health",
};

const endpoints = [
  "/user",
  "/user/repos?per_page=100&affiliation=owner,collaborator,organization_member",
];

const results = [];
for (const endpoint of endpoints) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, { headers });
    const json = await response.json().catch(() => null);
    let summary = "non_json";
    if (Array.isArray(json)) summary = `items:${json.length}`;
    else if (json && typeof json === "object") summary = `fields:${Object.keys(json).length}`;

    results.push({
      endpoint,
      status: response.status,
      ok: response.ok,
      summary,
      scopes_header: response.headers.get("x-oauth-scopes") ? "present" : "empty",
    });
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
