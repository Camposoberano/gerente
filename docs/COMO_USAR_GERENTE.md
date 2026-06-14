# Como Usar O Gerente

Data: 2026-06-14

Este e o fluxo pratico para acompanhar, falar e chamar o gerente.

## 1. Subir O Dashboard

Comando:

```powershell
npm run dashboard
```

URL local:

```text
http://127.0.0.1:8787/
```

Endpoints:

```text
GET  /health
GET  /api/summary
POST /api/whatsapp/inbound
```

O dashboard mostra:

- runs da Arena
- notificacoes
- outputs recentes
- ranking de modelos/agentes
- ultima execucao
- JSON bruto para auditoria

## 2. Chamar O Gerente No Terminal

Modo interativo:

```powershell
npm start
```

Dentro do prompt:

```text
/gerente verificar deploy no Coolify sem alterar nada
/gerente produto revisar fluxo de frontend
/gerente negocio revisar oferta e copy
/gerente ajuda
```

Contrato:

```text
/gerente <tarefa>
/gerente produto <tarefa>
/gerente negocio <tarefa>
/gerente ajuda
```

## 3. Chamar O Gerente Via MCP

Rodar servidor MCP:

```powershell
npm run mcp:gerente
```

Config para cliente MCP:

```json
{
  "mcpServers": {
    "gerente": {
      "command": "node",
      "args": ["E:/Projetos_Novos/gerente/mcp/gerente-server.js"]
    }
  }
}
```

Tools principais:

- `gerente.command`
- `router.plan`
- `project.context`
- `arena.rank`
- `health.coolify`
- `health.portainer`
- `health.github`
- `health.firecrawl`
- `health.jina`
- `health.llm`
- `notify.whatsapp`
- `approval.request`

## 4. WhatsApp Para Falar Com O Gerente

O canal de saida ja usa WhatsApp Go/Uazapi.

Criar grupo para usar o gerente:

```powershell
npm run uazapi:group:create -- "Gerente IA"
```

Por padrao, o comando usa `WHATSAPP_NOTIFY_TO` como participante. Para adicionar mais numeros:

```env
GERENTE_WHATSAPP_GROUP_PARTICIPANTS=5585999999999,5511999999999
```

Quando criado, o script salva:

```env
GERENTE_WHATSAPP_GROUP_JID=
```

Entrada por webhook:

```text
POST http://127.0.0.1:8787/api/whatsapp/inbound
```

Payload minimo para teste local:

```json
{
  "from": "5585999999999",
  "text": "/gerente verificar deploy no Portainer sem alterar nada"
}
```

Teste local:

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri "http://127.0.0.1:8787/api/whatsapp/inbound" `
  -ContentType "application/json" `
  -Body '{"from":"5585999999999","text":"/gerente verificar deploy no Portainer sem alterar nada"}'
```

Importante:

- em local, o webhook so funciona para teste manual
- para a Uazapi chamar de fora, o dashboard precisa estar publicado com HTTPS
- sugestao de URL publica futura: `https://gerente.seudominio.com/api/whatsapp/inbound`
- se a resposta de saida voltar `401`, revisar/renovar o token da instancia Uazapi/WhatsApp Go

Conectar a Uazapi ao gerente depois de publicar em HTTPS:

```powershell
npm run uazapi:webhook:gerente -- https://gerente.seudominio.com
```

Esse comando adiciona um webhook novo na Uazapi sem remover o webhook existente do EvoHub.

## 5. Como Usar Cada Acao

### Diagnostico

Use quando quer olhar sem mexer:

```text
/gerente verificar logs do Coolify e status do app X sem alterar nada
```

Fluxo:

1. `router.plan`
2. healthcheck relevante
3. resposta/resumo

### Execucao Com Risco

Use quando pode alterar producao:

```text
/gerente redeploy app X no Coolify
```

Fluxo:

1. `router.plan`
2. `approval.request`
3. so executa depois de aprovacao

### Desenvolvimento

Use quando quer codigo:

```text
/gerente produto implementar endpoint de webhook do WhatsApp
```

Fluxo:

1. Router escolhe area/agente/modelo
2. Context7 entra para docs de biblioteca/API
3. agente implementa
4. QA/fiscal valida quando necessario

### Pesquisa / Site / Conteudo

Use quando precisa ler paginas:

```text
/gerente pesquisar documentacao atual da API X e resumir pontos de integracao
```

Fluxo:

1. Jina para leitura rapida
2. Firecrawl para crawling/scraping pesado
3. Context7 quando for biblioteca/API de codigo

### Acompanhamento

Use o dashboard:

```text
http://127.0.0.1:8787/
```

Ou WhatsApp:

```text
/gerente resumo do estado atual
```

## 6. O Que Falta Para WhatsApp Publico

Para falar com o gerente pela rua, falta publicar o dashboard/webhook:

1. criar app/servico do gerente no Coolify ou VPS
2. expor HTTPS
3. configurar webhook na Uazapi apontando para `/api/whatsapp/inbound`
4. restringir por token/IP quando a Uazapi permitir
5. manter `approval_gate` para qualquer acao de escrita

Guia de publicacao:

- `docs/PUBLICAR_GERENTE_COOLIFY.md`

Status do teste local atual:

- dashboard: OK
- `/health`: OK
- `/api/summary`: OK
- `/api/whatsapp/inbound`: OK, plano criado
- resposta WhatsApp de saida: retornou `401`, precisa revisar token da instancia
- criacao do grupo `Gerente IA`: retornou `401`, precisa revisar token da instancia
- webhook real da instancia `0595`: aponta para `https://cofre.camposoberano.com.br/uazapi-webhook`, ainda nao aponta para o gerente
