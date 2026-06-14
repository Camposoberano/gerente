# Portainer MCP Passo A Passo

Data: 2026-06-14

Objetivo: conectar o gerente ao Portainer com seguranca, primeiro para leitura/diagnostico e depois para operacoes com aprovacao.

## O Que Voce Precisa Encontrar

1. URL do Portainer:

```env
PORTAINER_API_URL=https://portainer.seudominio.com
```

Exemplos comuns:

- `https://seudominio.com`
- `https://portainer.seudominio.com`
- `https://IP-DA-VPS:9443`

2. Token de API do Portainer:

No Portainer:

1. Entre no painel.
2. Clique no seu usuario, normalmente no canto superior direito.
3. Abra `My account`.
4. Procure `Access tokens` ou `API keys`.
5. Clique em `Add access token`.
6. Nome sugerido: `gerente-readonly` ou `gerente-mcp`.
7. Copie o token uma unica vez.

Variavel:

```env
PORTAINER_API_TOKEN=ptr_xxxxxxxxxxxxxxxxx
```

## Primeiro Teste Sem MCP

Antes de instalar MCP, testar API direta:

```powershell
npm run portainer:health
```

O comando imprime apenas status HTTP, estrategia de autenticacao e contagens. Ele nao imprime token nem nomes de stacks.

Se esse comando ainda nao existir, o teste manual equivalente e:

```powershell
$env:PORTAINER_API_URL="https://portainer.seudominio.com"
$env:PORTAINER_API_TOKEN="ptr_xxxxxxxxx"
```

Endpoints de leitura esperados:

- `/api/status`
- `/api/system/status`
- `/api/endpoints`

## Caminho Recomendado: MCP Oficial Do Portainer

Repositorio recomendado:

- `portainer/portainer-mcp`

Regra importante:

- gerar API key em `My Account -> Access tokens`
- usar versao do MCP compativel com a versao minor do Portainer
- nao expor MCP Portainer publicamente sem TLS e token

### Teste Local Via uvx

Instalar `uv` se ainda nao existir.

Comando conceitual:

```powershell
claude mcp add portainer `
  -e PORTAINER_URL=https://portainer.seudominio.com `
  -e PORTAINER_API_KEY=ptr_xxxxxxxxx `
  -- uvx --from "mcp-portainer~=2.42.0" mcp-portainer
```

Para Codex ou outros clientes, a ideia e a mesma:

```toml
[mcp_servers.portainer]
command = "uvx"
args = ["--from", "mcp-portainer~=2.42.0", "mcp-portainer"]
```

Com variaveis:

```env
PORTAINER_URL=https://portainer.seudominio.com
PORTAINER_API_KEY=ptr_xxxxxxxxx
```

## Caminho Para Time: Container HTTP Interno

Usar somente dentro da infraestrutura, atras de TLS/reverse proxy.

Variaveis:

```env
PORTAINER_MCP_URL=https://mcp-portainer.seudominio.com/mcp
PORTAINER_MCP_AUTH_TOKEN=token_de_porta_do_mcp
PORTAINER_API_TOKEN=ptr_xxxxxxxxx
```

Regra:

- `PORTAINER_MCP_AUTH_TOKEN` protege o MCP
- `PORTAINER_API_TOKEN` acessa o Portainer
- se possivel, cada usuario deve usar seu proprio token Portainer para auditoria

## Politica Inicial No Gerente

Permitido sem aprovacao:

- listar ambientes
- listar stacks
- listar containers
- ler logs
- ler status
- ler health

Com aprovacao:

- restart de container
- redeploy
- atualizar stack
- alterar variavel
- executar comando

Bloqueado sem aprovacao:

- remover container
- remover volume
- apagar stack
- alterar secrets
- alterar usuario/permissao
- mexer em registry/credencial

## O Que Me Passar

Quando encontrar no Portainer, envie:

```env
PORTAINER_API_URL=https://...
PORTAINER_API_TOKEN=ptr_...
```

Se ja tiver MCP HTTP instalado:

```env
PORTAINER_MCP_URL=https://.../mcp
PORTAINER_MCP_AUTH_TOKEN=...
```

Com isso eu valido conexao, leitura e permissao antes de qualquer acao de escrita.
