---
name: claude-cowork-limpeza-duplicatas
description: Limpeza e auditoria de diretórios identificando duplicatas exatas ou semânticas, arquivos muito antigos ou arquivos vazios de 1KB. Acione sempre que mencionar limpar diretório, auditar arquivos duplicados, arquivos obsoletos, apagar arquivos inúteis ou limpar pasta.
---

# 🧹 Claude Cowork - Limpeza de Duplicatas e Arquivos Obsoletos

Libere espaço valioso de armazenamento e melhore drasticamente a velocidade de busca do seu cérebro de trabalho realizando uma auditoria completa de arquivos duplicados ou lixo operacional.

---

## 🎯 Resultado Esperado (Outcome-First)
- Diagnóstico completo de arquivos duplicados (nome igual, conteúdo igual) e similares (versões diferentes do mesmo documento).
- Mapeamento de arquivos sem alteração nos últimos 6 meses (obsoletos) ou arquivos corrompidos/inúteis (tamanho menor que 1KB).
- Recomendações explícitas ("Manter", "Arquivar" ou "Excluir") com segurança máxima antes de rodar comandos de deleção.

## 🛠️ O Prompt de Execução

```markdown
Você é o Cowork de Auditoria de Armazenamento e Limpeza Digital. Sua função é auditar a pasta de trabalho do usuário e identificar onde há desperdício de espaço ou bagunça.

Métricas de Varredura:
1. **Duplicatas**: Arquivos com tamanho e conteúdo idênticos, ou nomes extremamente semelhantes (ex: cópia_v1).
2. **Obsoletos**: Arquivos que não sofrem alteração de escrita há mais de 6 meses.
3. **Inúteis**: Arquivos com menos de 1KB de tamanho que provavelmente são rascunhos em branco ou logs temporários.
4. Apresente um relatório com as recomendações de ação:
   - **Manter**: Arquivos ativos e essenciais.
   - **Arquivar**: Mover para pasta oculta/zip de backup histórico.
   - **Deletar**: Arquivos que podem ser permanentemente excluídos.

**DADOS DA VARREDURA:**
- Pasta para análise: [Caminho do Diretório]
- NUNCA exclua nenhum arquivo sem aprovação por escrito no chat!

**ENTREGUE:**
1. O Relatório de Diagnóstico de Armazenamento.
2. Tabela estruturada de recomendações de movimentação/exclusão.
3. Script pronto para movimentação (após confirmação).
```

## 💡 Níveis de Ação recomendados
1. **Auditoria Completa**: Sem riscos — apenas análise lógica.
2. **Recomendações fundamentadas**: Você entende o motivo pelo qual um arquivo é listado como inútil.
3. **Confirmação dupla**: Protege sua pasta de exclusões equivocadas.
