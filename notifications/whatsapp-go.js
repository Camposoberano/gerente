function cleanBaseUrl(url = "") {
  return String(url || "").replace(/\/+$/, "");
}

export function whatsappGoConfigured(env = process.env) {
  return Boolean(
    (env.WHATSAPP_GO_URL || env.UAZAPI_URL) &&
    (env.WHATSAPP_GO_INSTANCE_TOKEN || env.UAZAPI_INSTANCE_TOKEN) &&
    env.WHATSAPP_NOTIFY_TO
  );
}

export async function sendWhatsAppGoMessage({ text, number, env = process.env, fetchImpl = fetch }) {
  const baseUrl = cleanBaseUrl(env.WHATSAPP_GO_URL || env.UAZAPI_URL);
  const token = env.WHATSAPP_GO_INSTANCE_TOKEN || env.UAZAPI_INSTANCE_TOKEN;
  const target = number || env.WHATSAPP_NOTIFY_TO;

  if (!baseUrl || !token || !target) {
    return {
      ok: false,
      skipped: true,
      reason: "whatsapp_go_not_configured",
    };
  }

  const res = await fetchImpl(`${baseUrl}/send/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      number: target,
      text,
      delay: Number(env.WHATSAPP_NOTIFY_DELAY || 0),
    }),
  });

  const data = await res.json().catch(() => ({}));
  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}
