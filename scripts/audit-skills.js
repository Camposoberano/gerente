#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SOURCES = [
  { id: "agents-root", path: path.join(ROOT, "skills", "imported", "agents-root-skills") },
  { id: "claude-root", path: path.join(ROOT, "skills", "imported", "claude-root-skills") },
  { id: "pack-100", path: path.join(ROOT, "skills", "packs", "pack-100-skills") },
];

const CATEGORIES = [
  { id: "code", terms: ["debug", "refactor", "review", "codebase", "codigo", "issue"] },
  { id: "frontend", terms: ["ui", "ux", "hero", "landing", "lp", "pagina", "dobra"] },
  { id: "automation", terms: ["automacao", "whatsapp", "bot", "n8n", "processos", "ia"] },
  { id: "marketing", terms: ["copy", "headline", "anuncio", "meta-ads", "criativos", "vsl", "funil"] },
  { id: "seo_content", terms: ["seo", "conteudo", "artigo", "editorial", "youtube"] },
  { id: "sales", terms: ["venda", "proposta", "comercial", "follow-up", "objecao", "leads"] },
  { id: "finance", terms: ["financeiro", "dre", "margens", "roi", "metricas", "honorarios"] },
  { id: "legal_security", terms: ["juridico", "contrato", "lgpd", "privacidade", "sigilo"] },
  { id: "docs_ops", terms: ["docs", "readme", "sop", "gtd", "brief", "relatorio", "organizacao"] },
];

function normalizeName(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.(md|skill)$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function categoryFor(name) {
  const normalized = normalizeName(name);
  return CATEGORIES.find((category) => category.terms.some((term) => normalized.includes(normalizeName(term))))?.id || "general";
}

function readFirstLine(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8").split(/\r?\n/).find((line) => line.trim())?.trim() || "";
  } catch {
    return "";
  }
}

function collectSkills() {
  const skills = [];
  for (const source of SOURCES) {
    if (!fs.existsSync(source.path)) continue;
    const entries = fs.readdirSync(source.path, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(source.path, entry.name);
      if (entry.isDirectory()) {
        const skillFile = ["skill.md", "SKILL.md", "README.md"]
          .map((file) => path.join(full, file))
          .find((file) => fs.existsSync(file));
        if (skillFile) {
          skills.push({
            name: entry.name,
            normalized: normalizeName(entry.name),
            category: categoryFor(entry.name),
            source: source.id,
            path: full,
            file: skillFile,
            first_line: readFirstLine(skillFile),
          });
        } else if (source.id === "pack-100") {
          for (const file of fs.readdirSync(full).filter((name) => name.endsWith(".md"))) {
            const filePath = path.join(full, file);
            skills.push({
              name: file.replace(/\.md$/i, ""),
              normalized: normalizeName(file),
              category: categoryFor(file),
              source: source.id,
              path: full,
              file: filePath,
              first_line: readFirstLine(filePath),
            });
          }
        }
      }
    }
  }
  return skills;
}

const skills = collectSkills();
const byName = new Map();
for (const skill of skills) {
  const list = byName.get(skill.normalized) || [];
  list.push(skill);
  byName.set(skill.normalized, list);
}

const duplicates = [...byName.entries()]
  .filter(([, list]) => list.length > 1)
  .map(([normalized, list]) => ({ normalized, count: list.length, items: list }));

const byCategory = {};
for (const skill of skills) {
  byCategory[skill.category] ||= [];
  byCategory[skill.category].push(skill);
}

const catalog = {
  generated_at: new Date().toISOString(),
  total_entries: skills.length,
  unique_skills: byName.size,
  duplicate_groups: duplicates.length,
  categories: Object.fromEntries(Object.entries(byCategory).map(([key, list]) => [key, list.length])),
  duplicates,
  skills,
};

fs.mkdirSync(path.join(ROOT, ".agents"), { recursive: true });
fs.writeFileSync(path.join(ROOT, ".agents", "skills-catalog.json"), JSON.stringify(catalog, null, 2));

const lines = [];
lines.push("# Auditoria De Skills");
lines.push("");
lines.push(`Gerado em: ${catalog.generated_at}`);
lines.push("");
lines.push(`- Entradas totais: ${catalog.total_entries}`);
lines.push(`- Skills unicas por nome normalizado: ${catalog.unique_skills}`);
lines.push(`- Grupos duplicados: ${catalog.duplicate_groups}`);
lines.push("");
lines.push("## Categorias");
lines.push("");
for (const [category, count] of Object.entries(catalog.categories).sort()) {
  lines.push(`- ${category}: ${count}`);
}
lines.push("");
lines.push("## Duplicadas Principais");
lines.push("");
for (const dup of duplicates.slice(0, 80)) {
  lines.push(`- ${dup.normalized} (${dup.count})`);
  for (const item of dup.items) {
    lines.push(`  - ${item.source}: \`${path.relative(ROOT, item.file)}\``);
  }
}
lines.push("");
lines.push("## Regra Recomendada");
lines.push("");
lines.push("- Usar `skills/imported/agents-root-skills` como fonte ativa no orquestrador.");
lines.push("- Manter `skills/imported/claude-root-skills` como backup/importacao historica.");
lines.push("- Manter `skills/packs/pack-100-skills` como biblioteca bruta por categoria.");
lines.push("- Normalizar novas skills em uma unica pasta ativa antes de ligar ao agente.");

fs.mkdirSync(path.join(ROOT, "docs"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "docs", "SKILLS_AUDIT.md"), lines.join("\n"));

console.log(JSON.stringify({
  total_entries: catalog.total_entries,
  unique_skills: catalog.unique_skills,
  duplicate_groups: catalog.duplicate_groups,
  report: "docs/SKILLS_AUDIT.md",
  catalog: ".agents/skills-catalog.json",
}, null, 2));

