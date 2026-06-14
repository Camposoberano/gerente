const ACTIVATION_WORDS = [
  "gerente ia",
  "gerente",
  "gelente",
  "gerenti",
  "jerente",
  "geraldo",
];

function normalizeForMatch(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function stripCommandPunctuation(value = "") {
  return String(value || "").replace(/^[\s,.:;!?-]+/, "").replace(/[\s,.:;!?-]+$/, "").trim();
}

function commandFromActivation(value, match) {
  const rawActivation = value.slice(match.index, match.index + match[0].length);
  const after = stripCommandPunctuation(value.slice(match.index + rawActivation.length));
  if (after) return `/gerente ${after}`;

  const before = stripCommandPunctuation(value.slice(0, match.index));
  if (before) return `/gerente ${before}`;

  return "/gerente ajuda";
}

export function normalizeGerenteCommand(text = "") {
  const value = String(text || "").trim();
  const normalized = normalizeForMatch(value);
  if (!value) return value;
  if (normalized.startsWith("/gerente")) return value;

  const words = ACTIVATION_WORDS.join("|");
  const barraMatch = normalized.match(new RegExp(`\\bbarra\\s+(${words})\\b`, "i"));
  if (barraMatch) return commandFromActivation(value, barraMatch);

  const activationMatch = normalized.match(new RegExp(`\\b(${words})\\b`, "i"));
  if (activationMatch) return commandFromActivation(value, activationMatch);

  return value;
}
