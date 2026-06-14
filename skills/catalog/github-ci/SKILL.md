---
name: github-ci
description: Diagnostica e corrige falhas de CI no GitHub Actions com foco em causa raiz e prevenção de recorrência.
---

# GitHub CI

Quando usar:

- Check de PR quebrado.
- Workflow falhando em build, lint ou testes.
- Pipeline instável/flaky.

Fluxo esperado:

1. Identificar o primeiro erro relevante no log.
2. Separar causa raiz de erro em cascata.
3. Propor correção mínima e segura.
4. Validar impacto em jobs relacionados.
5. Entregar checklist de verificação pós-correção.
