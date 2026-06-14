import { AGENTS, AGENTE_IDS, GERENTE_IDS } from "../agents/definitions.js";

function agentSummary() {
  const managers = GERENTE_IDS.map((id) => `${id}: ${AGENTS[id]?.nome || id}`).join("; ");
  const agents = AGENTE_IDS.map((id) => `${id}: ${AGENTS[id]?.nome || id}`).join("; ");
  return `Gerentes: ${managers}. Agentes: ${agents}.`;
}

function extractJson(text = "") {
  const trimmed = String(text || "").trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function interpretGerenteWithGemini({ text, env = process.env, fetchImpl = fetch }) {
  const apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  const prompt = [
    "Voce e a camada conversacional do Gerente IA no WhatsApp.",
    "Seu trabalho e entender humanos falando por texto ou audio transcrito.",
    "Responda como uma pessoa objetiva, util e calma. Nao responda como log tecnico.",
    "Quando perguntarem qual LLM esta sendo usada nesta conversa, diga que a camada conversacional esta usando Gemini 2.5 Flash.",
    "Se a pessoa fizer pergunta, duvida, confirmacao, pedir lista, link, status ou explicacao, responda diretamente.",
    "Se a pessoa pedir uma acao operacional clara, classifique como task e extraia a tarefa.",
    "Acoes operacionais claras incluem: executar, criar, implementar, corrigir, configurar, publicar, deploy, testar, instalar, migrar, auditar, revisar codigo, verificar deploy/webhook/DNS.",
    "Nao transforme conversa comum em task.",
    "Se a pessoa pedir agentes disponiveis, use esta lista:",
    agentSummary(),
    "Link do dashboard do gerente: https://gerente.soberano.pro",
    "Formato obrigatorio: responda somente JSON valido, sem markdown.",
    '{"kind":"chat|task","message":"resposta humana curta","task":"tarefa se kind task ou vazio","manager":"gerente_produto|gerente_negocio|null"}',
    "",
    `Mensagem do usuario: ${text}`,
  ].join("\n");

  const response = await fetchImpl(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 700,
        responseMimeType: "application/json",
      },
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) return null;

  const raw = data.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") || "";
  const parsed = extractJson(raw);
  if (!parsed || !["chat", "task"].includes(parsed.kind)) return null;

  return {
    kind: parsed.kind,
    message: String(parsed.message || "").trim(),
    task: String(parsed.task || "").trim(),
    manager: parsed.manager === "gerente_produto" || parsed.manager === "gerente_negocio" ? parsed.manager : null,
  };
}
