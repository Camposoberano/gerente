# MCPs, Skills E Agentes Do Gerente

Data: 2026-06-14

Este arquivo define o padrao operacional do `gerente` para nao espalhar skills, agentes e MCPs por projeto. Projetos como EvoHub, Portainer, VPS limpa, Coolify e sites devem ser tratados como ambientes atendidos pelo gerente.

## Padrao De Skills

Fonte ativa:

- `skills/imported/agents-root-skills`

Fontes preservadas como historico ou pacote:

- `skills/imported/claude-root-skills`
- `skills/packs/pack-100-skills`

A auditoria encontrou:

- 332 entradas totais
- 216 skills unicas
- 116 grupos duplicados

Conclusao: a duplicidade principal vem do espelhamento entre `.agents` e `.claude`. O carregamento operacional agora usa `skills/imported/agents-root-skills` como fonte ativa. A pasta `claude-root-skills` fica preservada para comparacao, sem ser carregada como segunda fonte automatica.

Comando de auditoria:

```powershell
npm run skills:audit
```

Saidas:

- `.agents/skills-catalog.json`
- `docs/SKILLS_AUDIT.md`

Categorias atuais:

- `automation`
- `code`
- `docs_ops`
- `finance`
- `frontend`
- `general`
- `legal_security`
- `marketing`
- `sales`
- `seo_content`

Lista priorizada a partir do catalogo MCP.so:

- `docs/MCP_SO_PRIORIDADES.md`
- `docs/PORTAINER_MCP_PASSO_A_PASSO.md`
- `docs/GERENTE_MCP.md`
- `docs/COMO_USAR_GERENTE.md`

## Agentes Adicionados

Agentes operacionais para o gerente universal:

- `runner_portainer`: stacks, containers, logs e diagnosticos via Portainer
- `runner_supabase`: schema, SQL, migrations e validacoes Supabase
- `runner_vps`: diagnostico remoto seguro em VPS
- `runner_coolify`: deploys, logs, health e variaveis Coolify
- `runner_whatsapp`: notificacoes e operacao WhatsApp Go/Uazapi
- `observability`: Sentry, uptime, logs, incidentes e saude
- `approval_gate`: barreira de aprovacao para acoes de risco
- `model_arena`: ranking e escolha de LLM por funcao
- `cost_guard`: controle de custo por tarefa/modelo
- `secrets_guard`: protecao contra vazamento de chaves e tokens
- `browser_qa`: testes visuais e fluxos com navegador
- `voice_interface`: entrada e saida por audio/WhatsApp

## MCPs Cadastrados Agora

Ja existiam:

- `n8n`
- `supabase`
- `supabase_soberano`
- `github`
- `gmail`
- `google_calendar`
- `google_drive`
- `notion`

Adicionados como pendentes/configuraveis:

- `portainer`
- `coolify`
- `whatsapp_go`
- `cloudflare`
- `sentry`
- `uptime_kuma`
- `docker_ssh`
- `playwright`
- `openrouter_catalog`
- `context7`

Esses MCPs estao em `mcp/servers.js`. Enquanto a URL real nao for configurada, aparecem como `MCP_PENDENTE_*`.

## Variaveis Que Faltam Para Amanhã

Preencher apenas quando cada MCP estiver instalado ou quando houver endpoint remoto confiavel:

```env
PORTAINER_MCP_URL=
COOLIFY_MCP_URL=
COOLIFY_API_URL=
COOLIFY_API_TOKEN=
WHATSAPP_GO_MCP_URL=
UAZAPI_MCP_URL=
WHATSAPP_GO_URL=
WHATSAPP_GO_INSTANCE_TOKEN=
CLOUDFLARE_MCP_URL=
SENTRY_MCP_URL=
UPTIME_KUMA_MCP_URL=
DOCKER_SSH_MCP_URL=
PLAYWRIGHT_MCP_URL=
OPENROUTER_MCP_URL=
```

## Candidatos De MCP Para Instalar

Prioridade alta:

- Portainer: `portainer/portainer-mcp`
- Playwright: `microsoft/playwright-mcp`
- Sentry: endpoint remoto `https://mcp.sentry.dev/mcp`
- Cloudflare: MCP remoto oficial `https://mcp.cloudflare.com/mcp`
- GitHub: `github/github-mcp-server`

Prioridade media:

- Coolify: ainda sem MCP oficial dominante; validar repos comunitarios antes de dar permissao de escrita
- Uptime Kuma: usar apenas com permissoes limitadas e, se possivel, leitura primeiro
- Docker SSH: preferir modo diagnostico/read-only antes de liberar comandos remotos

WhatsApp:

- Como o projeto ja usa WhatsApp Go/Uazapi via HTTP, a primeira opcao deve ser manter o conector local atual.
- Um MCP de WhatsApp so deve ser instalado se usar API oficial ou se for um wrapper proprio para a sua Uazapi. Evitar WhatsApp Web MCP para operacao critica.

## Regra Recomendada Para Cloudflare

Ativar primeiro o Cloudflare API MCP oficial remoto:

```env
CLOUDFLARE_MCP_URL=https://mcp.cloudflare.com/mcp
```

Motivo: ele usa OAuth e permite escolher permissoes na autorizacao. Comecar com leitura e diagnostico. Liberar escrita de DNS, Workers, R2 ou cache apenas depois que o `approval_gate` aprovar a tarefa.

Politica inicial:

- permitido: consultar zonas, DNS, certificados, status de proxy, regras e cache
- permitido com aprovacao: criar/editar DNS, limpar cache, alterar proxy, mexer em Workers/R2
- bloqueado sem aprovacao: deletar zona, trocar nameserver, apagar registros, alterar regras de seguranca globais

## Verificacao Do Coolify

O gerente usa a API HTTP do Coolify enquanto nao houver um MCP especifico validado.

Variaveis:

```env
COOLIFY_API_URL=https://seu-coolify.exemplo
COOLIFY_API_TOKEN=token_api_coolify
```

Comando de leitura segura:

```powershell
npm run coolify:health
```

Esse comando testa `version`, `health`, `servers`, `projects` e `applications`, mas imprime apenas status e contagens. Nao imprime token nem nomes de recursos.

## Regra Recomendada Para Sentry

Ativar primeiro o MCP remoto geral:

```env
SENTRY_MCP_URL=https://mcp.sentry.dev/mcp
```

Quando o slug da organizacao e do projeto estiverem definidos, preferir escopo menor:

```env
SENTRY_MCP_URL=https://mcp.sentry.dev/mcp/sua-org
SENTRY_MCP_URL=https://mcp.sentry.dev/mcp/sua-org/seu-projeto
```

Politica inicial:

- permitido: pesquisar erros, issues, eventos, releases, performance e stack traces
- permitido com aprovacao: alterar status de issue, criar projeto, alterar configuracoes
- bloqueado sem aprovacao: apagar projeto, alterar DSN, tokens, alertas criticos ou integracoes

## Pendencias: Uptime Kuma E Docker SSH

`uptime_kuma` depende de uma instalacao real na VPS. Depois de instalar, preencher:

```env
UPTIME_KUMA_URL=https://status.seu-dominio.com
UPTIME_KUMA_MCP_URL=
```

Enquanto nao houver MCP proprio do Uptime Kuma, o gerente deve tratar Kuma como painel de observabilidade manual/API HTTP, nao como runner de escrita.

`docker_ssh` nao e um servico publico unico. Ele representa um runner controlado para diagnostico remoto via SSH. Antes de ativar, definir:

```env
DOCKER_SSH_MCP_URL=
DOCKER_SSH_HOST=
DOCKER_SSH_PORT=22
DOCKER_SSH_USER=
DOCKER_SSH_KEY_PATH=
```

Regra inicial do Docker SSH:

- permitido: `docker ps`, `docker logs`, `docker inspect`, `docker compose ps`, leitura de uso de disco/memoria
- permitido com aprovacao: restart de container, pull de imagem, compose up/down
- bloqueado sem aprovacao: remover volume, remover container, apagar arquivos, alterar firewall, trocar secrets

## Regra De Uso Dos MCPs Pelo Gerente

O Router deve escolher MCP por ambiente:

- Projeto local: ferramentas locais e GitHub
- Bibliotecas/APIs: `docs` + `context7`
- Portainer: `runner_portainer` + `portainer`
- Coolify: `runner_coolify` + `coolify`
- VPS: `runner_vps` + `docker_ssh` + `cloudflare` quando houver DNS
- Supabase/Banco: `runner_supabase` com configuracao especifica do projeto, nunca banco global
- Site/frontend: `frontend` + `browser_qa` + `playwright`
- Producao com erro: `observability` + `sentry` + `uptime_kuma`
- Mensagens: `runner_whatsapp` + `whatsapp_go`

Regra de seguranca:

- Leitura e diagnostico podem rodar com baixa friccao.
- Escrita, deploy, exclusao, alteracao de DNS, alteracao de secret e comandos remotos precisam passar por `approval_gate`.

## Regra Recomendada Para Playwright MCP

Modo padrao para cliente local:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

No Codex CLI:

```powershell
codex mcp add playwright npx "@playwright/mcp@latest"
```

No VS Code:

```powershell
code --add-mcp "{\"name\":\"playwright\",\"command\":\"npx\",\"args\":[\"@playwright/mcp@latest\"]}"
```

Modo HTTP opcional, quando o servidor precisar ficar separado:

```powershell
npx @playwright/mcp@latest --port 8931
```

```env
PLAYWRIGHT_MCP_URL=http://localhost:8931/mcp
```

Padrao de uso pelo `browser_qa`:

1. usar `browser_navigate` para abrir a pagina
2. usar `browser_snapshot` para ler a arvore acessivel
3. interagir por `ref`, como `browser_type`, `browser_click` e `browser_select_option`
4. validar com novo `browser_snapshot`
5. usar screenshot apenas quando a verificacao visual for necessaria

Exemplo validado:

```text
browser_navigate { url: "https://demo.playwright.dev/todomvc" }
browser_snapshot
browser_type { ref: "e5", text: "Buy groceries", submit: true }
browser_snapshot
```

## O Que Nao Foi Feito

Nao foram baixados MCPs externos automaticamente. Motivo: MCP roda com privilegios altos e pode acessar dados sensiveis. A instalacao deve ser feita somente depois de escolher o repositorio correto, revisar permissao e configurar credenciais minimas.
