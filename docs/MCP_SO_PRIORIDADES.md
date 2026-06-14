# Prioridades MCP.so Para O Gerente

Data: 2026-06-14

Fonte analisada: `https://mcp.so/`

Objetivo: escolher MCPs que aumentem a capacidade operacional do `gerente` sem duplicar ferramentas ja existentes e sem liberar escrita perigosa antes de aprovacao.

## Instalar Ou Ativar Primeiro

### Playwright MCP

Uso:

- testar dashboards, sites, apps, login e formularios
- gerar snapshots acessiveis
- validar UI sem depender de clique por coordenada

Status no gerente:

- ja cadastrado em `mcp/servers.js`
- modo padrao: `npx @playwright/mcp@latest`

Prioridade: maxima.

### Context7 MCP

Uso:

- buscar documentacao atualizada de bibliotecas, SDKs e APIs
- reduzir uso de exemplos desatualizados
- apoiar React, Next.js, Supabase, Cloudflare, Stripe, Playwright, Sentry, Firecrawl, Jina e outras libs

Status no gerente:

- cadastrado em `mcp/servers.js`
- modo local padrao: `npx -y @upstash/context7-mcp@latest`
- modo remoto opcional: `https://mcp.context7.com/mcp`

Regra de uso:

- usar quando a tarefa envolver implementacao, configuracao ou troubleshooting de biblioteca/API
- se souber a biblioteca, informar o ID direto, por exemplo `/supabase/supabase`
- para maior limite, configurar `CONTEXT7_API_KEY`

Prioridade: maxima.

### Sentry MCP

Uso:

- ler erros de producao
- analisar stack traces
- priorizar incidentes
- cruzar release com falha

Status no gerente:

- ja configurado com `SENTRY_MCP_URL=https://mcp.sentry.dev/mcp`

Prioridade: maxima.

### Cloudflare MCP

Uso:

- consultar DNS, SSL, proxy, cache, Workers, R2
- diagnosticar dominio e certificado
- aplicar mudancas com aprovacao

Status no gerente:

- ja configurado com `CLOUDFLARE_MCP_URL=https://mcp.cloudflare.com/mcp`

Prioridade: maxima.

### Coolify MCP / Coolify API

Uso:

- listar apps, projetos, servidores e deploys
- diagnosticar deploy
- consultar logs/health quando disponivel

Status no gerente:

- API ja validada por `npm run coolify:health`
- MCP comunitario existe no catalogo, mas deve ser validado antes de liberar escrita

Prioridade: alta.

### Portainer MCP

Uso:

- operar ambientes Portainer
- consultar containers, stacks e logs
- apoiar diagnostico Docker sem SSH direto

Status no gerente:

- cadastrado como pendente
- falta token/URL do Portainer

Prioridade: alta.

## Adicionar Depois De Validar Credenciais

### Banco Por Projeto, Sem PostgreSQL Global

Uso:

- inspecionar schema
- rodar SELECT seguro
- evitar que agente escreva no banco errado sem aprovacao

Regra:

- nao configurar um PostgreSQL global no gerente
- cada projeto deve declarar seu proprio banco/Supabase no contexto do projeto
- usar somente read-only primeiro quando houver conexao direta
- escrita continua via migration planejada e aprovada

Prioridade: alta como padrao de arquitetura, nao como MCP unico.

### Supabase Por Projeto

Uso:

- schema, tabelas, migrations, Edge Functions, Storage e Auth

Status no gerente:

- existe entrada para Supabase interno/gerenciado
- nao usar o mesmo Supabase para todos os projetos
- Supabase Cloud e Supabase self-hosted devem ser configurados por projeto/ambiente

Prioridade: alta, mas sempre com escopo do projeto.

### GitHub MCP Oficial

Uso:

- issues, PRs, reviews, CI, releases
- conectar os agentes `github_triagem`, `github_reviews`, `github_ci` e `release_ops`

Status no gerente:

- ja existe entrada GitHub
- healthcheck local: `npm run github:health`

Prioridade: alta.

### Firecrawl MCP

Uso:

- crawler, scraping, extracao e pesquisa em sites com JS
- auditorias de sites, concorrentes e documentacao

Regra:

- usar quando web search simples nao bastar
- controlar custo/creditos
- healthcheck local: `npm run firecrawl:health`

Prioridade: media-alta.

### Jina AI MCP Tools

Uso:

- ler paginas como Markdown limpo
- pesquisa/fact-checking
- converter conteudo web para contexto de LLM
- healthcheck local: `npm run jina:health`

Prioridade: media-alta.

### Redis MCP

Uso:

- diagnosticar cache, filas, chaves e memoria
- apoiar apps que usem Redis/Upstash

Regra:

- leitura primeiro
- delecao/flush bloqueado sem aprovacao

Prioridade: media, ativar quando houver Redis real no projeto.

## Opcionais

### Perplexity Ask MCP

Uso:

- pesquisa com citacoes
- segunda opiniao tecnica

Observacao:

- depende de conta/API paga
- como nao ha conta paga no momento, fica fora da fila

Prioridade: pausado.

### Serper MCP

Uso:

- Google Search via API
- busca programatica rapida

Observacao:

- util se o usuario tiver chave Serper e quiser custo previsivel.

Prioridade: media.

### AgentQL MCP

Uso:

- extracao estruturada de sites
- automacao de coleta onde CSS seletor quebra facil

Prioridade: media, depois de Playwright e Firecrawl.

## Evitar Por Enquanto

### Docker MCP Com Acesso Direto Ao Daemon

Motivo:

- varios MCPs Docker pedem acesso amplo ao daemon
- risco alto de deletar container/volume ou executar comando sensivel

Regra:

- preferir Portainer MCP ou `docker_ssh` controlado
- se instalar Docker MCP, comecar read-only e atras de `approval_gate`

### MCPs Duplicados De GitHub, Supabase, Cloudflare E Sentry

Motivo:

- ha muitas implementacoes comunitarias
- usar oficial ou endpoint do fornecedor reduz risco

Regra:

- escolher 1 MCP por dominio
- evitar instalar varios MCPs para o mesmo servico

### MCPs De Nicho Sem Uso No Gerente

Exemplos:

- cozinha/receitas
- mapas chineses
- Blender/3D, salvo projeto especifico
- geradores de imagem/video quando ja houver ferramenta melhor dedicada

## Ordem Recomendada

1. Context7
2. Playwright
3. Sentry
4. Cloudflare
5. Coolify API/MCP
6. Portainer MCP
7. Banco/Supabase por projeto
8. GitHub oficial
9. Firecrawl
10. Jina AI
11. Redis por projeto
12. Serper, se houver chave
13. AgentQL

## Variaveis Provaveis

```env
PORTAINER_MCP_URL=
PORTAINER_API_URL=
PORTAINER_API_TOKEN=

FIRECRAWL_API_KEY=
JINA_API_KEY=
REDIS_URL=
SERPER_API_KEY=
AGENTQL_API_KEY=
CONTEXT7_API_KEY=
```

## Regra De Seguranca

MCPs de leitura podem ser ativados cedo. MCPs com escrita, deploy, DNS, Docker, banco ou secrets so entram com:

- variaveis separadas por ambiente
- menor permissao possivel
- `approval_gate`
- log da acao
- plano de rollback quando houver mudanca de producao
