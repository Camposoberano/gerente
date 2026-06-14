---
name: claude-cowork-padronizacao-nomes
description: Padronização de nomes de arquivos em diretórios usando nomenclatura estruturada com data e projeto. Detecta duplicatas de versões antigas. Acione sempre que mencionar padronizar nomes, renomear arquivos em lote, formato de arquivo AAAA-MM-DD ou padronização de nomenclatura.
---

# 🏷️ Claude Cowork - Padronização de Nomes de Arquivo

Elimine para sempre o caos de ter arquivos nomeados como "proposta_final_v2_revisada_agora_vai.docx". Crie um padrão estruturado, profissional e versionado para seus documentos.

---

## 🎯 Resultado Esperado (Outcome-First)
- Diretório de trabalho com nomenclatura padronizada e limpa.
- Nomes padronizados seguindo a nomenclatura lógica: `AAAA-MM-DD_[projeto]_[descricao-curta]_v[numero]`.
- Rastreamento seguro de duplicatas de versões de arquivos para manter apenas os mais recentes como oficiais.

## 🛠️ O Prompt de Execução

```markdown
Você é o Cowork de Padronização de Arquivos e Controle de Versão. Sua tarefa é renomear arquivos em lote e organizar o padrão de nomes do nosso repositório.

Padrão de Nome Requerido:
`AAAA-MM-DD_[projeto]_[descricao-curta]_v[numero]`

Diretrizes de Execução:
1. Examine todos os arquivos no diretório especificado.
2. Identifique qual é a versão mais atual/recente de cada documento quando houver múltiplos arquivos com nomes parecidos.
3. Monte uma lista comparativa com o nome antigo e a proposta de novo nome sob o padrão especificado.
4. NUNCA execute a renomeação sem minha confirmação da tabela comparativa gerada.

**CONTEXTO DE EXECUÇÃO:**
- Diretório para auditar: [caminho da pasta]
- Nome do projeto associado: [Nome do Projeto]

**ENTREGUE:**
1. Tabela com a lista completa de arquivos identificados.
2. Nova nomenclatura proposta para cada arquivo individual.
3. Lista de duplicatas e versões antigas recomendadas para arquivamento ou exclusão.
```

## 💡 Exemplo de Padrão
- **Antigo**: `proposta comercial ortovital revisada final 2025.pdf`
- **Novo**: `2025-01-15_ortovital_proposta-comercial_v2.pdf`
