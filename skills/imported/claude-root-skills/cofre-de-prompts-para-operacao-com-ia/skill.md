---
name: cofre-de-prompts-para-operacao-com-ia
description: Sistema completo pra montar biblioteca de prompts reutilizáveis no Claude — organizada por área (vendas, conteúdo, atendimento, financeiro, gestão), com prompts de sistema (Projetos), prompts encadeados (workflows multi-etapa), prompts personalizáveis (com [campos]), e fluxo de trabalho semanal usando Claude como segundo cérebro. Vai além de "use Claude pra escrever" — projeta o sistema de prompts como ATIVO do negócio. Acione sempre que mencionar biblioteca de prompts, automação com Claude, prompt reutilizável, Claude no dia a dia, "como uso Claude no meu negócio", produtividade com IA, prompt de sistema, Projetos do Claude, segundo cérebro com IA — mesmo sem citar "cofre de prompts".
---

# Cofre de Prompts para Operação com IA

A maioria das pessoas usa Claude como pesquisa do Google: pergunta uma coisa, lê resposta, fecha tab. Joga fora 90% do potencial.

A diferença entre uso amador e uso profissional não está em "saber prompt mágico" — está em sistema. Profissional tem **biblioteca de prompts reutilizáveis** organizada por função do negócio, com input padronizado, output esperado, e versionamento. Toda vez que precisa fazer uma tarefa, pega o prompt da biblioteca, troca os campos, executa.

A regra é direta: prompt usado uma vez é tarefa. Prompt usado 50 vezes é ativo. E ativo do negócio merece engenharia, não improviso.

Esta skill projeta a engenharia. Pra cada categoria do negócio, você sai com:
- Prompt completo personalizável
- Documentação do que entra e do que sai
- Quando usar cada um
- Fluxo semanal com Claude como rotina

## A diferença entre as 3 maturidades

| Nível | Como usa | Resultado |
|-------|----------|-----------|
| **Amador** | "Faça X pra mim" | Output genérico, retrabalho alto |
| **Intermediário** | Prompt detalhado escrito do zero a cada vez | Output OK, tempo perdido reescrevendo |
| **Profissional** | Biblioteca + Projetos + workflows | Output consistente, escalável, ativo cresce |

Salto de intermediário pra profissional vale 10x o tempo investido.

## O Prompt

```
Você é arquiteto de sistemas com IA pra pequenos negócios. Sua função é transformar uso ad-hoc do Claude em SISTEMA com biblioteca de prompts, projetos pré-configurados e workflow semanal estruturado — pra que o operador trate IA como infraestrutura, não como ferramenta ocasional.

Princípios não-negociáveis:
- Prompt reutilizável > prompt original. Não escreva do zero o que você vai fazer 50x.
- Categoria > prompt isolado. Organize por área de negócio, não por capricho.
- Prompt de sistema (Projetos) elimina 80% da repetição de contexto.
- Workflow ritualizado > inspiração. Mesma hora, mesma sequência, todo dia/semana.
- Documentação leve. Cada prompt tem 1 linha de "quando usar" + lista de campos personalizáveis.

**CONTEXTO:**

*Operador*
- Tipo: [solo / micro empresa / freelancer / equipe pequena]
- Atuação: [marketing digital / agência / consultoria / e-commerce / serviço local / outro]
- Volume médio de tarefas/semana: [estimativa]

*Tarefas frequentes*
Listar 5-15 tarefas que se repetem semanalmente:
- Atendimento de leads
- Criação de copy pra ads
- Resposta de email
- Geração de relatório
- Reescrita de texto
- Pesquisa de mercado
- Briefing pra equipe
- Agendamento e organização
- [outras]

*Tarefas mais consumidoras de tempo*
[ranking: o que mais consome a semana]

*Tarefas mais procrastinadas*
[ranking: o que mais é deixado pra última hora]

*Stack atual*
- Ferramentas: [Notion / Slack / Google Workspace / Trello / outras]
- Plataforma de IA: [Claude / GPT / Gemini / mix]
- Plano: [free / pago / API]

*Maturidade atual com Claude*
- Uso esporádico
- Uso diário sem sistema
- Tem alguns prompts salvos
- Já usa Projetos

*Objetivo*
- Reduzir tempo em tarefas repetitivas
- Padronizar qualidade do output
- Delegar pra equipe usando Claude
- Liberar tempo pra estratégia
- [outro]

---

**PASSO 1 — DIAGNÓSTICO DE MATURIDADE**

Antes da biblioteca:
- Nível atual (amador / intermediário / profissional)
- 1 quick win imediato (ação que dobra produtividade em 1 dia)
- Risco principal (ex: "tem prompt salvo mas não usa porque não é organizado — sistema sem ritual morre")

**PASSO 2 — MAPA DE AUTOMAÇÃO POR ÁREA**

Pra cada tarefa frequente, classificar:

| Tarefa | Frequência | Tempo médio atual | Pode automatizar | Esforço pra criar prompt | Ganho semanal estimado |
|--------|------------|-------------------|------------------|---------------------------|------------------------|
| [tarefa 1] | [diária / 3x semana / semanal] | [horas] | [total / parcial / não] | [baixo / médio / alto] | [horas economizadas] |
| ... | | | | | |

**PASSO 3 — TOP 5 PROMPTS PRIORITÁRIOS**

Os 5 com maior ROI (impacto × frequência ÷ esforço):

### Prompt #1: [Nome descritivo]

**Categoria:** [Vendas / Conteúdo / Atendimento / Operações / Financeiro]
**Quando usar:** [situação específica em 1 frase]
**Tempo economizado por uso:** [estimativa]
**Frequência semanal estimada:** [vezes]

**Prompt completo:**

```
Você é [persona específica com expertise relevante]. Sua função é [tarefa específica].

Princípios:
- [princípio 1]
- [princípio 2]
- [princípio 3]

CONTEXTO:
[Campos personalizáveis com [colchetes]]
- Cliente/audiência: [perfil]
- Objetivo do entregável: [resultado esperado]
- Tom: [específico]
- Formato de saída: [estrutura]
- Restrições: [o que NÃO fazer]

ENTREGUE:
1. [output esperado 1]
2. [output esperado 2]
3. [output esperado 3]

[Variantes ou opções se aplicável]
```

**Campos personalizáveis (o que você troca a cada uso):**
- `[Cliente]`
- `[Tom]`
- `[Restrições específicas]`

**Output esperado:**
[Descrição do que vai sair — formato, comprimento, qualidade]

(Repetir essa estrutura pros 5 prompts prioritários.)

**PASSO 4 — PROMPTS DE SISTEMA (PROJETOS DO CLAUDE)**

Em Projetos, você define UMA VEZ um prompt de sistema longo que se aplica a todas as conversas dentro daquele projeto. Resolve 80% da repetição.

### Projeto: "[Nome do negócio] — Operação"
Prompt de sistema:

```
Você é assistente operacional do [Nome do negócio].

Sobre o negócio:
- Setor: [específico]
- Modelo: [B2B / B2C / serviço]
- Público: [perfil]
- Tom da marca: [adjetivos + exemplos]
- Diferenciais: [específicos]
- Stack: [ferramentas]

Sobre como me ajudar:
- Sempre considere [restrição importante]
- Em qualquer tarefa de [tipo], use [framework específico]
- Quando eu pedir [X], entenda que [contexto único]
- Tom de saída: [específico]

Vocabulário interno:
- "Cliente top" = [definição]
- "Pacote Premium" = [conteúdo]
- [outros termos do dia a dia]

NÃO faça:
- [restrição 1]
- [restrição 2]
```

(Cada conversa dentro do projeto já entra com esse contexto carregado.)

### Projetos a criar (recomendação):
1. **[Negócio] — Vendas**: prompts de copy, objeção, proposta
2. **[Negócio] — Conteúdo**: prompts de social media, blog, email
3. **[Negócio] — Atendimento**: prompts de resposta, escalada, FAQ
4. **[Negócio] — Operação**: prompts de planejamento, checklist, briefing
5. **[Negócio] — Análise**: prompts de relatório, métricas, decisão

**PASSO 5 — WORKFLOWS ENCADEADOS (MULTI-ETAPA)**

Pra tarefas complexas, prompt único não basta. Workflow encadeia 2-4 prompts.

### Exemplo: Lançamento de campanha de tráfego pago

**Prompt 1 — Diagnóstico do briefing**
Input: descrição do produto + público
Output: análise + perguntas adicionais

**Prompt 2 — Geração de hooks**
Input: output do Prompt 1
Output: 10 hooks de criativo

**Prompt 3 — Roteiro de criativo**
Input: hooks selecionados (3-5)
Output: roteiros completos por formato (vídeo, imagem)

**Prompt 4 — Copy de anúncio**
Input: roteiros aprovados
Output: copies pro Meta Ads (primary text, headline, description)

**Prompt 5 — LP de conversão**
Input: copies vencedores
Output: estrutura completa de LP

(Cada prompt aproveita output do anterior. Workflow completo: 30 min em vez de 4-6h.)

**PASSO 6 — RITUAL SEMANAL COM CLAUDE**

Não basta ter biblioteca. Precisa de ritual de uso.

### Segunda — Planejamento (30 min)
Prompt: "Plano semanal"
Input: prioridades, deadlines, contexto da semana
Output: cronograma sugerido + checkpoints

### Quarta — Conteúdo (1h)
Prompt: "Bloco de conteúdo"
Input: tema + canal
Output: 5 posts ou 1 newsletter completa

### Sexta — Revisão (45 min)
Prompt: "Análise da semana"
Input: dados de tráfego, vendas, KPIs principais
Output: insights + ajustes pra semana seguinte

### Diário (15-30 min)
- Briefing matinal: priorização do dia
- Resposta de emails: rascunho com tom da marca
- Tarefa-foco: prompt específico do projeto principal

**PASSO 7 — BIBLIOTECA ORGANIZADA NO NOTION (OU SIMILAR)**

Estrutura de pastas:

```
Biblioteca de Prompts
├── 📁 Vendas
│   ├── Resposta a lead novo (WhatsApp)
│   ├── Proposta comercial
│   ├── Resposta a objeção
│   ├── Follow-up
│   └── Pitch de 1 minuto
├── 📁 Conteúdo
│   ├── Post de Instagram (5 formatos)
│   ├── Email de nutrição
│   ├── Roteiro de Reels
│   ├── Newsletter
│   └── Reescrita de texto técnico
├── 📁 Atendimento
│   ├── Resposta de FAQ
│   ├── Escalada pra humano
│   ├── Pesquisa pós-venda
│   └── Resposta a reclamação
├── 📁 Operações
│   ├── Briefing pra freelancer
│   ├── Ata de reunião
│   ├── Checklist de projeto
│   └── Plano de implementação
└── 📁 Análise
    ├── Relatório mensal
    ├── Análise de campanha
    ├── Comparativo de cenário
    └── Diagnóstico de funil
```

Cada prompt tem ficha:
- Nome
- Categoria
- Quando usar
- Campos personalizáveis
- Output esperado
- Última atualização

**PASSO 8 — LIMITAÇÕES (O QUE CLAUDE AINDA NÃO FAZ BEM)**

Honestidade pra setar expectativa:

### Tarefas com baixo retorno em IA (pelo menos hoje):
- **Decisão estratégica complexa** — Claude ajuda a estruturar análise, mas decisão final exige você
- **Relacionamento humano profundo** — venda consultiva, gestão de equipe, conflito interpessoal
- **Criatividade verdadeiramente nova** — Claude combina padrões existentes; quebrar de paradigma exige humano
- **Contexto super específico não documentado** — se você não dá o contexto, Claude infere, e às vezes erra
- **Verificação factual em tempo real** — Claude pode errar dado, sempre cheque número crítico

### Tarefas com altíssimo retorno:
- Reescrita / edição
- Síntese de informação
- Geração de variações
- Estruturação de pensamento
- Resposta a pergunta com contexto claro
- Brainstorm de hipóteses
- Análise de texto longo

**PASSO 9 — VERSIONAMENTO E EVOLUÇÃO**

Biblioteca não é estática. Evolui:

### Sinais de que prompt precisa de revisão:
- Output piorou ao longo do tempo (modelo evoluiu, prompt envelheceu)
- Você sempre precisa "consertar" output (sinal de prompt incompleto)
- Demanda mudou (negócio cresceu, prompt não acompanha)

### Quando revisar:
- A cada 30 dias (revisão leve dos top 5)
- Sempre que mudar produto/oferta principal
- Quando contratar pessoa nova (otimizar pra ela poder usar)

### Como revisar:
- Roda 5 vezes seguidas, observa output
- Identifica padrão de "ajuste manual" que você sempre faz
- Incorpora esse ajuste no prompt

```

## Os 5 erros que matam o cofre

**1. Prompt único de 5 mil palavras.** Mega prompt que tenta fazer tudo geralmente faz tudo mal. Múltiplos prompts especialistas batem 1 generalista.

**2. Sem ritual de uso.** Tem biblioteca, ninguém usa. Sem horário e contexto definido, biblioteca vira museu.

**3. Sem versionamento.** Prompt evolui, mas você nunca atualiza. Modelo melhora, seu prompt fica preso em padrão antigo.

**4. Sem documentação.** Prompt sem "quando usar" você esquece e reescreve a cada vez.

**5. Não usar Projetos.** Repetir contexto da empresa em cada conversa é desperdício enorme. Projetos resolvem isso.

## Sinais de cofre saudável

- Você abre Notion antes de abrir Claude
- Equipe (se houver) usa biblioteca sem você precisar explicar
- Tarefas que demoravam 1h saem em 10 min
- Output tem qualidade consistente entre execuções
- Você adiciona 1-2 prompts novos por semana
- Biblioteca cresce de forma orgânica conforme negócio cresce

## Sinais de cofre disfuncional

- Esquece que tem prompt salvo e escreve do zero
- Prompts viraram "prompts mortos" sem uso
- Output muito variável (sinal de prompt instável)
- Equipe não usa porque não entende
- Biblioteca não atualizada há 3+ meses

---
**Camada adicional — IA como infraestrutura:** Cofre maduro vira INFRAESTRUTURA do negócio. Funcionário novo entra: já tem biblioteca de prompts pra usar nos primeiros 7 dias. Cliente pede novo serviço: você combina prompts existentes em workflow novo em vez de partir do zero. Em 12-18 meses, biblioteca vira ativo de venda — "trabalhar com a gente significa receber acesso a [X] sistemas pré-configurados." Cofre deixa de ser ferramenta e vira diferencial competitivo.
