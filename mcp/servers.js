// mcp/servers.js
// Servidores MCP conectados ao seu stack - Pilar 4

export const MCP_SERVERS = {
  // ─── SEU N8N (self-hosted) ────────────────────────────────────────────
  n8n: {
    id: "n8n",
    nome: "n8n Dental Juá",
    descricao: "Criar, disparar e gerenciar workflows de automação",
    config: {
      type: "url",
      url: process.env.N8N_MCP_URL || "https://n8n.dentaljua.com/mcp-server/http",
      name: "n8n",
    },
    agentes: ["backend", "infra", "gerente_produto"],
  },

  // ─── SUPABASE PRINCIPAL ───────────────────────────────────────────────
  supabase: {
    id: "supabase",
    nome: "Supabase",
    descricao: "Banco de dados PostgreSQL, tabelas, SQL, autenticação",
    config: {
      type: "url",
      url: "https://mcp.supabase.com/mcp",
      name: "supabase",
    },
    agentes: ["backend", "qa", "analytics", "gerente_produto"],
  },

  // ─── BANCO DE DADOS SOBERANO ──────────────────────────────────────────
  supabase_soberano: {
    id: "supabase_soberano",
    nome: "Banco de Dados Soberano",
    descricao: "Banco Supabase do projeto Campo Soberano",
    config: {
      type: "url",
      url: process.env.SUPABASE_SOBERANO_MCP_URL || "https://bancodedados.soberano.pro/mcp/setuporion/26b6b60b14",
      name: "bancode-dados-soberano",
    },
    agentes: ["backend", "analytics"],
  },

  // ─── GITHUB MCP ───────────────────────────────────────────────────────
  github: {
    id: "github",
    nome: "GitHub MCP",
    descricao: "Issues, PRs, reviews, workflows e releases",
    config: {
      type: "url",
      url: process.env.GITHUB_MCP_URL || "https://api.githubcopilot.com/mcp/",
      api_url: process.env.GITHUB_API_URL || "https://api.github.com",
      auth_env: "GITHUB_TOKEN",
      name: "github",
    },
    agentes: ["github_triagem", "github_reviews", "github_ci", "release_ops", "gerente_produto"],
  },

  // ─── GMAIL ────────────────────────────────────────────────────────────
  gmail: {
    id: "gmail",
    nome: "Gmail",
    descricao: "Ler, rascunhar e enviar e-mails",
    config: {
      type: "url",
      url: "https://gmailmcp.googleapis.com/mcp/v1",
      name: "gmail",
    },
    agentes: ["marketing", "docs", "gerente_negocio"],
  },

  // ─── GOOGLE CALENDAR ──────────────────────────────────────────────────
  google_calendar: {
    id: "google_calendar",
    nome: "Google Calendar",
    descricao: "Criar e gerenciar eventos na agenda",
    config: {
      type: "url",
      url: "https://calendarmcp.googleapis.com/mcp/v1",
      name: "google-calendar",
    },
    agentes: ["gerente_produto", "gerente_negocio"],
  },

  // ─── GOOGLE DRIVE ─────────────────────────────────────────────────────
  google_drive: {
    id: "google_drive",
    nome: "Google Drive",
    descricao: "Ler, criar e organizar arquivos no Drive",
    config: {
      type: "url",
      url: "https://drivemcp.googleapis.com/mcp/v1",
      name: "google-drive",
    },
    agentes: ["docs", "marketing", "gerente_produto"],
  },

  // ─── NOTION ───────────────────────────────────────────────────────────
  notion: {
    id: "notion",
    nome: "Notion",
    descricao: "Criar e editar páginas, databases e documentação",
    config: {
      type: "url",
      url: "https://mcp.notion.com/mcp",
      name: "notion",
    },
    agentes: ["docs", "gerente_produto", "gerente_negocio"],
  },

  // ─── PORTAINER ────────────────────────────────────────────────────────
  portainer: {
    id: "portainer",
    nome: "Portainer",
    descricao: "Stacks, containers, logs, status e ações controladas por aprovação",
    config: {
      type: "url",
      url: process.env.PORTAINER_MCP_URL || "MCP_PENDENTE_PORTAINER",
      api_url: process.env.PORTAINER_API_URL || "API_PENDENTE_PORTAINER",
      auth_env: "PORTAINER_API_TOKEN",
      name: "portainer",
    },
    agentes: ["runner_portainer", "infra", "observability", "gerente_produto"],
  },

  // ─── COOLIFY ──────────────────────────────────────────────────────────
  coolify: {
    id: "coolify",
    nome: "Coolify",
    descricao: "Deploys, logs, health, domínios e variáveis de aplicações",
    config: {
      type: "url",
      url: process.env.COOLIFY_MCP_URL || "MCP_PENDENTE_COOLIFY",
      api_url: process.env.COOLIFY_API_URL || "API_PENDENTE_COOLIFY",
      auth_env: "COOLIFY_API_TOKEN",
      name: "coolify",
    },
    agentes: ["runner_coolify", "infra", "observability", "release_ops"],
  },

  // ─── WHATSAPP GO / UAZAPI ─────────────────────────────────────────────
  whatsapp_go: {
    id: "whatsapp_go",
    nome: "WhatsApp Go / Uazapi",
    descricao: "Envio de mensagens, status de instância, webhooks e limites",
    config: {
      type: "url",
      url: process.env.WHATSAPP_GO_MCP_URL || process.env.UAZAPI_MCP_URL || "MCP_PENDENTE_WHATSAPP_GO",
      api_url: process.env.WHATSAPP_GO_URL || process.env.UAZAPI_URL || "API_PENDENTE_WHATSAPP_GO",
      auth_env: "WHATSAPP_GO_INSTANCE_TOKEN",
      name: "whatsapp-go",
    },
    agentes: ["runner_whatsapp", "backend", "observability", "gerente_produto"],
  },

  // ─── CLOUDFLARE ───────────────────────────────────────────────────────
  cloudflare: {
    id: "cloudflare",
    nome: "Cloudflare",
    descricao: "DNS, proxy, certificados, Workers, R2 e cache",
    config: {
      type: "url",
      url: process.env.CLOUDFLARE_MCP_URL || "https://mcp.cloudflare.com/mcp",
      name: "cloudflare",
    },
    agentes: ["infra", "runner_vps", "runner_coolify", "observability", "seguranca"],
  },

  // ─── SENTRY ───────────────────────────────────────────────────────────
  sentry: {
    id: "sentry",
    nome: "Sentry",
    descricao: "Erros de produção, eventos, releases e stack traces",
    config: {
      type: "url",
      url: process.env.SENTRY_MCP_URL || "MCP_PENDENTE_SENTRY",
      name: "sentry",
    },
    agentes: ["observability", "qa", "backend", "frontend", "gerente_produto"],
  },

  // ─── UPTIME KUMA ──────────────────────────────────────────────────────
  uptime_kuma: {
    id: "uptime_kuma",
    nome: "Uptime Kuma",
    descricao: "Monitores, incidentes, alertas e disponibilidade",
    config: {
      type: "url",
      url: process.env.UPTIME_KUMA_MCP_URL || "MCP_PENDENTE_UPTIME_KUMA",
      name: "uptime-kuma",
    },
    agentes: ["observability", "infra", "runner_vps"],
  },

  // ─── DOCKER / SSH RUNNER ──────────────────────────────────────────────
  docker_ssh: {
    id: "docker_ssh",
    nome: "Docker/SSH Runner Seguro",
    descricao: "Diagnóstico remoto controlado de Docker e VPS",
    config: {
      type: "url",
      url: process.env.DOCKER_SSH_MCP_URL || "MCP_PENDENTE_DOCKER_SSH",
      name: "docker-ssh",
    },
    agentes: ["runner_vps", "runner_portainer", "infra", "observability"],
  },

  // ─── PLAYWRIGHT / BROWSER QA ──────────────────────────────────────────
  playwright: {
    id: "playwright",
    nome: "Playwright Browser",
    descricao: "Testes de navegador, screenshots, console e fluxos visuais",
    config: {
      type: process.env.PLAYWRIGHT_MCP_URL ? "url" : "stdio",
      url: process.env.PLAYWRIGHT_MCP_URL || null,
      command: process.env.PLAYWRIGHT_MCP_URL ? null : "npx",
      args: process.env.PLAYWRIGHT_MCP_URL ? [] : ["@playwright/mcp@latest"],
      name: "playwright",
    },
    agentes: ["browser_qa", "frontend", "qa", "performance"],
  },

  // ─── OPENROUTER CATALOG ───────────────────────────────────────────────
  openrouter_catalog: {
    id: "openrouter_catalog",
    nome: "OpenRouter Catalog",
    descricao: "Catálogo de modelos, preços e disponibilidade para Arena",
    config: {
      type: "url",
      url: process.env.OPENROUTER_MCP_URL || "MCP_PENDENTE_OPENROUTER",
      name: "openrouter-catalog",
    },
    agentes: ["model_arena", "cost_guard", "gerente_produto"],
  },

  // ─── FIRECRAWL ────────────────────────────────────────────────────────
  firecrawl: {
    id: "firecrawl",
    nome: "Firecrawl",
    descricao: "Pesquisa, scraping, crawling e extracao de conteudo web",
    config: {
      type: "url",
      url: process.env.FIRECRAWL_MCP_URL || "MCP_PENDENTE_FIRECRAWL",
      api_url: process.env.FIRECRAWL_API_URL || "https://api.firecrawl.dev",
      auth_env: "FIRECRAWL_API_KEY",
      name: "firecrawl",
    },
    agentes: ["browser_qa", "frontend", "seo", "marketing", "docs", "gerente_produto"],
  },

  // ─── JINA AI READER ───────────────────────────────────────────────────
  jina_reader: {
    id: "jina_reader",
    nome: "Jina AI Reader",
    descricao: "Leitura de paginas web em texto/Markdown limpo para contexto de LLM",
    config: {
      type: "url",
      url: process.env.JINA_MCP_URL || "MCP_PENDENTE_JINA",
      api_url: process.env.JINA_READER_URL || "https://r.jina.ai/",
      auth_env: "JINA_API_KEY",
      name: "jina-reader",
    },
    agentes: ["docs", "seo", "marketing", "frontend", "gerente_produto"],
  },

  // ─── CONTEXT7 ────────────────────────────────────────────────────────
  context7: {
    id: "context7",
    nome: "Context7",
    descricao: "Documentacao atualizada e exemplos de codigo por biblioteca/API",
    config: process.env.CONTEXT7_MCP_URL
      ? {
          type: "url",
          url: process.env.CONTEXT7_MCP_URL,
          headers_env: { CONTEXT7_API_KEY: "CONTEXT7_API_KEY" },
          name: "context7",
        }
      : {
          type: "stdio",
          command: "npx",
          args: ["-y", "@upstash/context7-mcp@latest"],
          env: process.env.CONTEXT7_API_KEY ? { CONTEXT7_API_KEY: process.env.CONTEXT7_API_KEY } : {},
          name: "context7",
        },
    agentes: ["frontend", "backend", "docs", "qa", "infra", "gerente_produto"],
  },
};

// Retorna os servidores MCP que um agente específico pode usar
export function getServidoresDoAgente(agentId) {
  return Object.values(MCP_SERVERS)
    .filter((s) => s.agentes.includes(agentId))
    .map((s) => s.config);
}

// Retorna todos os servidores configurados
export function getTodosServidores() {
  return Object.values(MCP_SERVERS).map((s) => s.config);
}

// Lista os servidores disponíveis
export function listarServidores() {
  console.log("\n🔌 SERVIDORES MCP DISPONÍVEIS:\n");
  for (const [id, s] of Object.entries(MCP_SERVERS)) {
    console.log(`  ${id.padEnd(22)} ${s.nome}`);
    console.log(`  ${"".padEnd(22)} ${s.descricao}`);
    console.log(`  ${"".padEnd(22)} Agentes: ${s.agentes.join(", ")}\n`);
  }
}
