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
const readerUrl = env.JINA_READER_URL || "https://r.jina.ai/";
const apiKey = env.JINA_API_KEY || "";

if (!apiKey) {
  console.error(JSON.stringify({
    ok: false,
    reason: "JINA_API_KEY_missing",
  }, null, 2));
  process.exit(1);
}

let result;
try {
  const response = await fetch(readerUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "text/plain, application/json",
    },
    body: JSON.stringify({
      url: "https://www.example.com",
    }),
  });

  const text = await response.text();
  result = {
    endpoint: readerUrl,
    status: response.status,
    ok: response.ok,
    summary: `chars:${text.length} contains_example:${/example/i.test(text)}`,
  };
} catch (error) {
  result = {
    endpoint: readerUrl,
    status: "ERR",
    ok: false,
    summary: error.message,
  };
}

console.log(JSON.stringify({
  ok: Boolean(result.ok),
  reader_url_configured: true,
  key_configured: true,
  result,
}, null, 2));

process.exit(result.ok ? 0 : 1);
