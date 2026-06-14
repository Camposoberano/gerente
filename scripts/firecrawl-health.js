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

async function testKey({ baseUrl, key, label }) {
  const response = await fetch(`${baseUrl}/v1/scrape`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      url: "https://example.com",
      formats: ["markdown"],
      onlyMainContent: true,
      timeout: 15000,
    }),
  });

  const contentType = response.headers.get("content-type") || "";
  let summary = "non_json";
  if (contentType.includes("application/json")) {
    const json = await response.json().catch(() => null);
    if (json && typeof json === "object") {
      const data = json.data || {};
      summary = `success:${Boolean(json.success)} markdown:${typeof data.markdown === "string"}`;
    }
  } else {
    await response.text().catch(() => "");
  }

  return {
    key: label,
    endpoint: "/v1/scrape",
    status: response.status,
    ok: response.ok,
    summary,
  };
}

const env = loadEnv();
const baseUrl = (env.FIRECRAWL_API_URL || "https://api.firecrawl.dev").replace(/\/$/, "");
const keys = [
  ["primary", env.FIRECRAWL_API_KEY],
  ["backup", env.FIRECRAWL_API_KEY_BACKUP],
].filter(([, value]) => value);

if (!keys.length) {
  console.error(JSON.stringify({
    ok: false,
    reason: "FIRECRAWL_API_KEY_missing",
  }, null, 2));
  process.exit(1);
}

const results = [];
for (const [label, key] of keys) {
  try {
    results.push(await testKey({ baseUrl, key, label }));
  } catch (error) {
    results.push({
      key: label,
      endpoint: "/v1/scrape",
      status: "ERR",
      ok: false,
      summary: error.message,
    });
  }
}

const ok = results.some((result) => result.ok);
console.log(JSON.stringify({
  ok,
  base_url_configured: true,
  keys_configured: keys.map(([label]) => label),
  results,
}, null, 2));

process.exit(ok ? 0 : 1);
