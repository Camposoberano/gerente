# Publicar O Gerente No Coolify

Data: 2026-06-14

Objetivo: publicar o dashboard/webhook do gerente em HTTPS para a Uazapi conseguir entregar mensagens reais do grupo.

## Status Atual

- Dashboard local: OK em `http://127.0.0.1:8787`
- Grupo WhatsApp `Gerente IA`: criado
- Envio para grupo: OK
- Webhook atual da instancia `0595`: aponta para EvoHub, nao para o gerente
- Projeto preparado com `Dockerfile` e `docker-compose.yml`
- Falta uma origem Git no GitHub/Coolify para deploy automatico

## Dominio Sugerido

```text
https://gerente.camposoberano.com.br
```

## Variaveis Obrigatorias No Coolify

Copiar do `.env` local para o ambiente do app no Coolify, sem commitar:

```env
GERENTE_DASHBOARD_HOST=0.0.0.0
GERENTE_DASHBOARD_PORT=8787
GERENTE_PUBLIC_BASE=https://gerente.camposoberano.com.br
GERENTE_WEBHOOK_TOKEN=gerar_token_aleatorio

UAZAPI_URL=
UAZAPI_ADMIN_TOKEN=
UAZAPI_INSTANCE_TOKEN=
WHATSAPP_GO_URL=
WHATSAPP_GO_INSTANCE_TOKEN=
WHATSAPP_NOTIFY_TO=
GERENTE_WHATSAPP_GROUP_JID=
```

Recomendadas:

```env
COOLIFY_API_URL=
COOLIFY_API_TOKEN=
PORTAINER_API_URL=
PORTAINER_API_TOKEN=
GITHUB_API_URL=
GITHUB_TOKEN=
FIRECRAWL_API_URL=
FIRECRAWL_API_KEY=
JINA_READER_URL=
JINA_API_KEY=
SENTRY_MCP_URL=
CLOUDFLARE_MCP_URL=
```

## Opção A: Deploy Por Repositorio GitHub

1. Criar repositório privado para o gerente.
2. Garantir que `.env`, `.agents`, `SECRETS.md`, `node_modules`, `outputs` e `scratch` nao sejam enviados.
3. Conectar o repositório ao Coolify.
4. Build pack: Dockerfile.
5. Porta: `8787`.
6. Dominio: `https://gerente.camposoberano.com.br`.
7. Deploy.

## Opção B: Deploy Por Docker Compose

Usar `docker-compose.yml` deste projeto como base no Coolify.

Serviço:

```yaml
services:
  gerente:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8787:8787"
```

## Depois Do Deploy

Validar:

```powershell
Invoke-RestMethod https://gerente.camposoberano.com.br/health
Invoke-RestMethod https://gerente.camposoberano.com.br/api/summary
```

Conectar Uazapi ao gerente:

```powershell
npm run uazapi:webhook:gerente -- https://gerente.camposoberano.com.br
```

Confirmar webhooks:

```powershell
# Deve aparecer tambem a URL /api/whatsapp/inbound do gerente
```

## Observacao Importante

O comando `uazapi:webhook:gerente` adiciona o webhook do gerente sem remover o webhook do EvoHub. Assim o EvoHub continua funcionando e o gerente passa a receber as mensagens tambem.
