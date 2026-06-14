---
name: gerente
description: Roteia tarefas no padrão do Time de Agentes usando /gerente.
argument-hint: "<tarefa> | produto <tarefa> | negocio <tarefa> | ajuda"
---

Padronize a entrada do usuário para o contrato abaixo:

- `/gerente <tarefa>`: roteamento automático
- `/gerente produto <tarefa>`: força gerente técnico
- `/gerente negocio <tarefa>`: força gerente de negócio
- `/gerente ajuda`: mostra instruções de uso

Se o usuário não tiver informado tarefa suficiente, responda apenas com:

`Use: /gerente <tarefa> | /gerente produto <tarefa> | /gerente negocio <tarefa> | /gerente ajuda`

Caso o usuário tenha passado argumentos, execute o fluxo exatamente a partir da entrada fornecida.
