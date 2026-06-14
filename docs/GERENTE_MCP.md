# Gerente MCP

Data: 2026-06-14

O `gerente-mcp` expoe o orquestrador como servidor MCP local para Codex, Claude Code, Cursor, VS Code e outros clientes.

## Comando

```powershell
npm run mcp:gerente
```

Ou diretamente:

```powershell
node mcp/gerente-server.js
```

## Configuracao MCP

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

## Tools Expostas

- `router.plan`: gera plano do Router V2
- `gerente.command`: processa texto no contrato `/gerente`
- `arena.rank`: ranking de modelos/agentes
- `health.coolify`: healthcheck Coolify
- `health.portainer`: healthcheck Portainer
- `health.github`: healthcheck GitHub
- `health.firecrawl`: healthcheck Firecrawl
- `health.jina`: healthcheck Jina
- `health.llm`: healthcheck de LLMs
- `notify.whatsapp`: envia mensagem via WhatsApp Go/Uazapi
- `project.context`: contexto operacional do gerente
- `approval.request`: registra pedido de aprovacao para acao de risco

## Regra Operacional

Clientes externos devem chamar primeiro:

1. `project.context`
2. `router.plan`
3. healthcheck relevante
4. `approval.request` quando houver deploy, DNS, banco, Docker, secrets ou escrita em producao

## Teste

```powershell
npm run test:mcp
```
