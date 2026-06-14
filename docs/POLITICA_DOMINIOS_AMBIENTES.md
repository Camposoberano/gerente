# Politica De Dominios E Ambientes

Regra operacional:

- `institutobelem.com` e dominios do Instituto Belem sao de cliente e devem ser tratados apenas como producao.
- Dominios da Ortobital tambem sao de cliente e devem ser tratados apenas como producao.
- Testes, homologacao, webhooks temporarios, dashboards experimentais e prototipos devem usar `soberano.pro`.
- Quando um recurso estiver aprovado, ele pode ser migrado para o dominio final de producao do cliente.

## Gerente

Dominio de teste padrao:

```text
https://gerente.soberano.pro
```

DNS esperado para o ambiente atual:

```text
gerente.soberano.pro -> 187.127.28.228
*.soberano.pro -> 187.127.28.228
```

Enquanto `gerente.soberano.pro` nao resolver para a VPS do Coolify, nao religar o webhook publico do gerente na Uazapi.

## Audio No WhatsApp

Para comandos por audio, o gerente deve aceitar uma palavra de ativacao falada, nao o caractere `/`.

Padrao recomendado:

```text
gerente ajuda
gerente verificar status do projeto
gerente produto criar dashboard
gerente negocio montar plano comercial
```

Fluxo esperado:

1. WhatsApp recebe audio.
2. Uazapi entrega o evento ao webhook do gerente.
3. Gerente baixa a midia.
4. Gerente transcreve o audio.
5. Se a transcricao comecar com `gerente`, o sistema converte internamente para `/gerente`.
6. Se nao comecar com `gerente`, o audio e ignorado.

Isso evita loop e evita que conversa comum no grupo vire tarefa.
