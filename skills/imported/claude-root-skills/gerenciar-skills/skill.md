---
name: Gerenciar Skills Locais
description: Cria, audita e documenta novas habilidades (skills) locais na raiz do workspace de forma automatizada e segura no padrão da comunidade fazer.ai
---

# 🛠️ Gerenciar Skills Locais — Padrão Fazer.ai

Esta skill serve para ensinar o Claude Code CLI a criar e auditar novas habilidades locais no workspace (`E:\Projetos_Novos\.claude\skills/`) de forma ágil, segura e altamente profissional.

---

## 📋 Como Criar uma Nova Skill (Passo a Passo)

1.  **Escolha o Nome**: Escolha um nome descritivo separado por hífens (kebab-case) (ex: `deploy-whatsapp`, `recuperar-carrinho`).
2.  **Criar Diretório**: Crie a pasta em `E:\Projetos_Novos\.claude\skills/<nome-da-skill>/`.
3.  **Criar o Arquivo**: Crie o arquivo `skill.md` com a estrutura padrão.
4.  **Auditar a Skill**: Rode a auditoria de segurança usando `/auditar-skill` antes de ativá-la.

---

## 📂 Estrutura Padrão (Template Inviolável)

Todo arquivo `skill.md` local deve ter exatamente este formato:

```markdown
---
name: Nome Amigável da Habilidade
description: Resumo de 1-2 frases do que a IA ganha de expertise e quando deve usar.
---

# Nome da Habilidade

Descrição executiva de qual problema concreto esta skill resolve e como ela ajuda o usuário.

## 📍 Passos de Execução (Fases)

1. **Fase 1 (Diagnóstico)**: [Descreva a primeira pergunta ou verificação que a IA deve fazer]
2. **Fase 2 (Desenho)**: [Como a IA deve estruturar a proposta de solução]
3. **Fase 3 (Implementação)**: [Como rodar os scripts ou editar os arquivos]
4. **Fase 4 (Verificação)**: [Como testar se o resultado funcionou]

## 💡 Dicas e Guardrails (Gotchas)

- Sempre faça X antes de Y.
- Nunca faça Z sem confirmação explícita do usuário.
- Dica: [Dica técnica para economizar tempo].

## ⚡ Regras de Eficiência de Tokens

- SEMPRE inicie com o contexto minimalista (`get_minimal_context`).
- Use nível de detalhe mínimo para economizar tokens.
- Meta de execução: resolver a tarefa em até 5 chamadas de ferramenta.
```

---

## 🛡️ Checklist de Auditoria de Segurança & Qualidade

Antes de dar uma skill como "pronta", garanta que ela passa neste checklist:

1.  **Sem Segredos Hardcoded**: Não coloque tokens, chaves de API, senhas ou URLs privadas de produção no arquivo.
2.  **Ferramentas Mapeadas**: Certifique-se de que os nomes de ferramentas do MCP indicados na skill existem (ex: usar `get_affected_flows` e NUNCA `get_flow` se não existir).
3.  **Confirmar Ações Críticas**: Comandos de destruição (`rm -rf`, `delete_funnel`) devem exigir confirmação `--dry-run` ou aprovação do usuário.
4.  **Progressive Disclosure**: A skill deve conduzir a conversa em fases simples (um tema por vez) ao invés de cuspir 10 perguntas de uma vez.

---

## ⚡ Como Auditar via CLI

Para auditar qualquer skill local nova ou existente, execute o comando nativo:
```bash
/auditar-skill e:\Projetos_Novos\.claude\skills\<nome-da-skill>
```
Isso validará automaticamente a estrutura, segurança e conformidade da skill com as diretrizes do Claude Code!
