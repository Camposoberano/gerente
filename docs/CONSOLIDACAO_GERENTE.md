# Consolidacao Do Gerente

Data: 2026-06-14

Objetivo: centralizar no projeto gerente os materiais reutilizaveis de agentes, skills, prompts, especificacoes e infraestrutura de apoio. Os originais foram preservados na raiz para evitar quebrar projetos existentes.

## Itens Consolidados

- skills globais .agents: `E:\Projetos_Novos\.agents\skills` -> `E:\Projetos_Novos\gerente\skills\imported\agents-root-skills` (118 arquivos, 1.21 MB)
- skills globais .claude: `E:\Projetos_Novos\.claude\skills` -> `E:\Projetos_Novos\gerente\skills\imported\claude-root-skills` (118 arquivos, 1.21 MB)
- pacote 100 skills: `E:\Projetos_Novos\Pack de 100 skills` -> `E:\Projetos_Novos\gerente\skills\packs\pack-100-skills` (100 arquivos, 1.14 MB)
- specify/agentes/templates: `E:\Projetos_Novos\.specify` -> `E:\Projetos_Novos\gerente\external\specify` (36 arquivos, 0.15 MB)
- infra supabase reutilizavel: `E:\Projetos_Novos\supabase-infra` -> `E:\Projetos_Novos\gerente\external\supabase-infra` (6 arquivos, 0.33 MB)
- prompts reutilizaveis: `E:\Projetos_Novos\prompts` -> `E:\Projetos_Novos\gerente\prompts\imported` (86 arquivos, 1.05 MB)
- Claude_code docs/config selecionados: `E:\Projetos_Novos\Claude_code` -> `E:\Projetos_Novos\gerente\external\claude-code-docs` (8 arquivos, 0.06 MB)

## Itens Excluidos Por Seguranca Ou Peso

- `node_modules`, `.git`, `.env`, `.env.local`, `*.local.*`, `settings.local.json`, `graph.db`, `yes`, `yes.pub`.
- `Claude_code` nao foi copiado inteiro porque tem muitos arquivos e inclui projeto/artefatos locais; foram trazidos apenas README, organizacao, documentacao geral e config MCP sem chaves.
- `specs` estava vazia no momento da consolidacao.

## Proxima Regra Operacional

A partir daqui, novos materiais de agentes devem entrar primeiro em `gerente`, nao em `evohub`. Projetos como EvoHub, Portainer, VPS e sites devem consumir o gerente como orquestrador externo.

## Padrao Atual De Skills, MCPs E Agentes

Foi criado o guia operacional `docs/MCP_SKILLS_AGENTS_PADRAO.md`.

Resumo:

- fonte ativa de skills: `skills/imported/agents-root-skills`
- fonte preservada para comparacao: `skills/imported/claude-root-skills`
- pacote complementar: `skills/packs/pack-100-skills`
- auditoria gerada em `docs/SKILLS_AUDIT.md`
- catalogo gerado em `.agents/skills-catalog.json`
- MCPs pendentes foram cadastrados em `mcp/servers.js` como `MCP_PENDENTE_*`
- agentes novos foram adicionados para Portainer, Coolify, VPS, Supabase, WhatsApp, observabilidade, custos, secrets, browser QA e voz

## Fases 1, 2, 3, 4 E 6 Implementadas

Foi adicionado um Router V2 que comecou em modo dry-run e agora tambem esta conectado ao fluxo do `/gerente`. Ele gera o plano operacional antes da execucao, orienta o executor, aciona fiscal quando necessario e aplica lane de ferramentas permitidas.

Arquivos principais:

- `router/v2.js`
- `policies/task-policy.js`
- `policies/agent-policy.js`
- `providers/model-registry.js`
- `scripts/router-v2-dry-run.js`
- integracao do Router V2 em `orchestrator.js`

Comando:

```powershell
npm run router:plan -- "descreva a tarefa"
```

Exemplos validados:

- landing page: `frontend_visual`, risco `low`, modo `cost_effective`, modelo preferido `gemini_visual`
- resumo simples: `ops`, risco `low`, modo `cheap_first`, modelo preferido `groq_fast`
- diagnostico Portainer/deploy: `infra`, risco `high`, fiscal obrigatorio, bloqueio de `database_write`, `deploy`, `secret_write`, `dns_write` e `delete`

### Fase 2

O comando `/gerente` agora gera e mostra o `execution_plan` do Router V2 antes de chamar o gerente e o executor.

O plano informa:

- area, risco e complexidade
- ambiente e projeto
- gerente, executor e fiscal
- modelo preferido e politica de orcamento
- ferramentas permitidas e bloqueadas
- criterios de pronto

### Fase 3

O fluxo agora inclui:

- handoff compacto para fiscal
- fiscal obrigatorio quando o risco nao e baixo
- fallback preparado quando o fiscal reprovar ou indicar bloqueio
- lane real de ferramentas permitidas por plano
- bloqueio de skill fora da lane antes de executar

Validacao observada:

- em diagnostico Portainer/deploy, o agente tentou `writeFile`, mas a lane bloqueou a execucao porque a tarefa era de diagnostico infra e nao permitia escrita
- o fiscal rodou sem executar ferramentas
- o output salvo inclui `executionPlan`, resultados, revisao e fallback quando houver

Observacao operacional:

- as APIs externas testadas retornaram Gemini 429 e Anthropic 404 para os modelos configurados; por isso a execucao caiu no modo simulado de fallback. A estrutura do gerente funcionou mesmo assim.

### Fase 4

A Arena interna foi implementada para registrar desempenho de modelos e agentes por execucao.

Arquivos principais:

- `arena/scoring.js`
- `arena/store.js`
- `scripts/arena-ranking.js`
- `scripts/arena.test.js`

O fluxo agora registra automaticamente uma rodada da Arena ao final de cada execucao do `/gerente`.

O registro inclui:

- area, risco, complexidade, projeto e ambiente
- modelo preferido e candidatos
- gerente, executor e fiscal
- score geral
- qualidade, confianca, estabilidade e custo
- uso de fallback
- bloqueio de ferramenta fora da lane

Comandos:

```powershell
npm run test:arena
npm run arena:ranking
npm run arena:ranking -- ops
npm run arena:ranking -- infra
```

Validacao observada:

- uma execucao real de `resumir pendencias do projeto` foi registrada em `.agents/arena-runs.json`
- ranking geral retornou 1 run
- ranking da area `ops` retornou modelo `groq_fast` e agente `infra`

### Fase 5 Ainda Nao Implementada

A Fase 5 sera a criacao dos runners por ambiente. Ela deve permitir que o gerente execute tarefas em ambientes diferentes sem misturar responsabilidades.

Runners previstos:

- `repo_local`: operar no projeto local atual
- `portainer`: consultar containers, stacks, logs e status
- `vps`: executar diagnosticos remotos seguros
- `supabase`: ler schema, gerar migrations e validar queries
- `github`: consultar issues, PRs, checks e CI
- `coolify`: consultar deploy, logs e health

A regra da Fase 5 e: o Router decide o ambiente, mas o runner controla o que pode ser feito naquele ambiente.

### Fase 6

A Fase 6 foi implementada com dashboard local, notificacoes e canal WhatsApp configuravel.

Arquivos principais:

- `dashboard/server.js`
- `notifications/index.js`
- `notifications/store.js`
- `notifications/whatsapp-go.js`
- `scripts/notify.test.js`

Comandos:

```powershell
npm run dashboard
npm run test:notify
```

Endpoints do dashboard:

- `http://127.0.0.1:8787/`
- `http://127.0.0.1:8787/health`
- `http://127.0.0.1:8787/api/summary`

O dashboard mostra:

- total de runs da Arena
- notificacoes registradas
- outputs recentes
- ranking de modelos e agentes
- ultima execucao
- JSON bruto de resumo

As notificacoes sao gravadas localmente em `.agents/notifications.json` e podem sair por:

- canal local, sempre ativo
- webhook HTTP via `NOTIFY_WEBHOOK_URL`
- WhatsApp Go/Uazapi via `WHATSAPP_GO_URL`, `WHATSAPP_GO_INSTANCE_TOKEN` e `WHATSAPP_NOTIFY_TO`

Observacao:

- a documentacao encontrada no `evohub` usa o padrao Uazapi com `/send/text` e header `token`; a Fase 6 deixou esse canal pronto por variaveis de ambiente, sem copiar segredos.

### OpenRouter Gratuito

Foi adicionada uma camada `openrouter_free` para tarefas simples, com custo zero pelo catalogo atual do OpenRouter.

Modelos gratuitos testados com geracao:

- `openai/gpt-oss-20b:free`
- `google/gemma-4-31b-it:free`
- `openai/gpt-oss-120b:free`
- `openrouter/free`

Modelos gratuitos encontrados mas instaveis no teste inicial:

- `meta-llama/llama-3.3-70b-instruct:free` retornou 429
- `qwen/qwen3-next-80b-a3b-instruct:free` retornou 429
- `qwen/qwen3-coder:free` retornou 404 no teste de geracao

Uso no Router:

- tarefas `ops`, `content` e `automation` simples passam a tentar `openrouter_free` antes de modelos pagos
- se o gratuito falhar, o fallback segue para `groq_fast` ou modelos superiores conforme risco

Comando para atualizar a lista:

```powershell
npm run openrouter:free
```
