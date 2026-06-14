---
name: gerente-dispatch
description: Padroniza o contrato do comando /gerente e despacha tarefas para gerente_produto ou gerente_negocio. Use quando o usuário pedir roteamento com /gerente, inclusive em ferramentas sem slash command nativo.
---

# Gerente Dispatch

Use este contrato único:

- `/gerente <tarefa>`: roteamento automático.
- `/gerente produto <tarefa>`: força `gerente_produto`.
- `/gerente negocio <tarefa>`: força `gerente_negocio`.
- `/gerente ajuda`: retorna instruções de uso.

Se faltar tarefa, responda exatamente:

`Use: /gerente <tarefa> | /gerente produto <tarefa> | /gerente negocio <tarefa> | /gerente ajuda`

Se a ferramenta não executar slash command de forma nativa, trate a mensagem textual iniciada com `/gerente` como invocação válida do mesmo fluxo.
