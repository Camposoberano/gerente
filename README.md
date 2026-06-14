# 🤖 Time de Agentes — Desenvolvimento com IA

Um time de 14 agentes especializados + 2 gerentes, rodando localmente no VS Code via linha de comando.

## 📁 Estrutura do projeto

```
agent-team/
├── orchestrator.js        ← Orquestrador central (ponto de entrada)
├── agents/
│   └── definitions.js     ← Definição dos 10 agentes + 2 gerentes
├── context/               ← Bibliotecas de contexto (seu código, padrões)
├── logs/                  ← Logs de cada agente
├── output/                ← Resultados salvos em JSON
├── .github/prompts/       ← Prompt files do VS Code
├── .cursor/commands/      ← Comandos customizados do Cursor
├── .codex/skills/         ← Skill local para Codex
├── .env.example           ← Modelo de variáveis de ambiente
└── package.json
```

## ⚙️ Instalação

```bash
# 1. Entrar na pasta
cd agent-team

# 2. Instalar dependências
npm install

# 3. Criar arquivo .env
cp .env.example .env

# 4. Adicionar sua chave da API Anthropic no .env
# ANTHROPIC_API_KEY=sk-ant-...

# 5. Rodar o orquestrador
node orchestrator.js
```

## 🚀 Como usar

### Modo interativo (recomendado)
```bash
node orchestrator.js
```
Digite sua tarefa e o orquestrador roteia automaticamente para os agentes certos.

### Falar diretamente com um agente
```bash
node orchestrator.js --agent frontend "Crie um componente de card de produto em React"
```

### Listar todos os agentes
```bash
node orchestrator.js --agentes
```

## 🧭 Uso universal do `/gerente`

Contrato oficial:

| Comando | Comportamento |
|---|---|
| `/gerente <tarefa>` | Roteamento automático |
| `/gerente produto <tarefa>` | Força `gerente_produto` |
| `/gerente negocio <tarefa>` | Força `gerente_negocio` |
| `/gerente ajuda` | Mostra ajuda do comando |

Exemplos:

```text
/gerente criar landing page para dentistas
/gerente produto revisar backend de autenticação
/gerente negocio revisar copy da oferta
```

## 🌐 Instalação global (`/gerente` em qualquer projeto)

No Windows (PowerShell), execute:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-gerente-global.ps1
```

Esse script instala:
- Prompt global do VS Code
- Comando global do Cursor
- Skill global do Codex

## 🧩 Stack recomendada de skills (GitHub + Operação)

Para instalar a stack de skills do gerente (no `Codex`, `Cursor` e `VS Code/Copilot`):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-gerente-stack.ps1 -Scope user
```

Para instalar apenas no projeto atual:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-gerente-stack.ps1 -Scope project
```

Essa stack instala:
- `gerente-dispatch` (contrato universal do `/gerente`)
- `github-triage` (triagem de issues/PRs)
- `github-reviews` (tratamento de comentários de review)
- `github-ci` (diagnóstico e correção de CI)
- `release-ops` (changelog, versionamento e publicação)

## 👥 Time completo

### Gerentes
| ID | Nome | Cuida de |
|---|---|---|
| `gerente_produto` | Gerente de Produto | frontend, backend, infra, qa, docs |
| `gerente_negocio` | Gerente de Negócio | marketing, seo, analytics, segurança, performance |

### Agentes de Desenvolvimento
| ID | Nome | Especialidade |
|---|---|---|
| `frontend` | Agente Frontend | React, UI/UX, glassmorphism, mobile-first |
| `backend` | Agente Backend | APIs, n8n, Supabase, Redis, WhatsApp |
| `infra` | Agente Infraestrutura | Docker, Traefik, VPS, Cloudflare |
| `qa` | Agente QA | Testes, bugs, revisão de código |
| `docs` | Agente Documentação | README, guias, arquitetura |
| `github_triagem` | Agente GitHub Triagem | Issues, backlog, labels, milestones |
| `github_reviews` | Agente GitHub Reviews | Comentários de PR, threads, ajustes |
| `github_ci` | Agente GitHub CI | GitHub Actions, pipelines, falhas de check |
| `release_ops` | Agente Release Ops | Versionamento, changelog, release notes |

### Agentes de Negócio
| ID | Nome | Especialidade |
|---|---|---|
| `marketing` | Agente Marketing | Copywriting, landing pages, conversão |
| `seo` | Agente SEO | Conteúdo, palavras-chave, otimização |
| `analytics` | Agente Analytics | Meta Pixel, GA4, métricas, ROI |
| `seguranca` | Agente Segurança | LGPD, vulnerabilidades, proteção |
| `performance` | Agente Performance | Core Web Vitals, cache, otimização |

## 💬 Exemplos de tarefas

```
Crie uma landing page de captação de leads para dentistas com WhatsApp integrado

Revise o código do meu workflow n8n de anamnese dental

Crie um docker-compose para o MultiPost com Traefik e SSL

Verifique se o meu projeto está em conformidade com a LGPD

Crie o README do projeto Dental Juá

Faça triagem das issues e PRs abertas no GitHub e defina prioridade

Corrija a falha do workflow de CI quebrou no pull request #42

Prepare release v1.4.0 com changelog e checklist de rollback
```

## 💡 Dicas

- O histórico de cada agente é mantido durante a sessão (contexto persistente)
- Use `/limpar` no modo interativo para reiniciar o contexto
- Os outputs são salvos automaticamente na pasta `output/`
- Adicione arquivos de contexto na pasta `context/` para enriquecer os agentes

## 📡 Revisão com `@sentry` (produção)

Para revisar erros reais de produção com o plugin `@sentry`, configure no ambiente:

- `SENTRY_AUTH_TOKEN` (escopos somente leitura como `project:read`, `event:read`, `org:read`)
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_BASE_URL` (opcional, padrão `https://sentry.io`)

Depois disso, peça no chat algo como:

```text
@sentry listar top erros de produção nas últimas 24h
```

Ou rode via terminal:

```powershell
npm run sentry:review
```

Com detalhes das top issues:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\review-sentry.ps1 -IncludeDetails -DetailsLimit 5
```

## 🔧 Próximos passos

- [ ] Adicionar contexto de projetos na pasta `context/`
- [ ] Configurar agentes para ler arquivos do seu projeto
- [ ] Criar atalhos no VS Code para chamar agentes específicos
- [ ] Integrar com n8n para automações mais avançadas
