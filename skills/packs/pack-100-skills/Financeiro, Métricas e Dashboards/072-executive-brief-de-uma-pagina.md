---
name: executive-brief-de-uma-pagina
description: Constrói relatórios executivos ultra-concisos (1 página ou menos) pra CEO, board, investidores e diretoria — condensando dados complexos em TL;DR acionável lido em 3-5 minutos. Não é "resumo do relatório" — é peça independente pensada pra quem toma decisão estratégica e não tem tempo. Inclui scorecard, alertas, decisões pendentes e recomendações. Acione sempre que mencionar: relatório executivo, C-level summary, update pra board, relatório pra investidor, apresentação pra diretoria, executive briefing, resumo estratégico, "preciso de 1 página pra diretoria" — mesmo sem citar "executive brief".
---

# Executive Brief de Uma Página

Executivo não lê relatório de 15 páginas. Lê a primeira página com atenção, passa os olhos no resto. Se a primeira página não convenceu, o resto não salva.

Executive brief é arte de condensar. Um relatório executivo de UMA página bem feita vale mais que relatório de 20 páginas mal estruturado.

3 regras fundamentais:

1. **Executivo não tem tempo** — essencial em 1 página
2. **Executivo quer significado, não dado** — contexto + interpretação
3. **Executivo quer decisão** — não só relato

## O que NÃO vai no executive brief

- Dados brutos (vai pra anexo se necessário)
- Análise metodológica detalhada
- Histórico completo (só o relevante pro ponto)
- Elogios e celebrações genéricos
- Jargão técnico sem tradução

O que FICA:
- TL;DR de 3-5 frases
- Scorecard enxuto
- Alertas críticos (vermelho)
- Decisões que precisam ser tomadas
- Próximo passo claro

## O Prompt

```
Você é CFO/COO escrevendo pra board ou CEO. Você sabe que executivo lê 5 minutos e decide. Seu trabalho é condensar brutalmente.

Regras do executive brief:
1. 1 página — sem exceção
2. TL;DR no topo cobre o essencial
3. Scorecard visual (tabela simples)
4. Só o que pede decisão ou atenção
5. Terminar com "O que precisa da sua decisão"

**CONTEXTO:**

*Empresa*
- Nome: [qual]
- Modelo: [SaaS / e-commerce / serviço / B2B / outro]

*Período*
- Tipo: [mês / trimestre / ano]
- Data específica: [mês/ano ou Q/ano]

*Destinatário*
- Quem lê: [CEO / board / investidores / diretoria]
- Frequência que recebe: [primeira vez / padrão mensal / trimestral]

*Dados do período*
- Receita atual: [R$] (meta: [R$])
- Crescimento vs período anterior: [%]
- Lucro/Prejuízo: [R$]
- Clientes ativos: [número]
- Churn (se SaaS): [%]
- MRR/ARR (se SaaS): [R$]
- Ticket médio: [R$]
- Caixa disponível: [R$]
- Runway: [meses]

*Contexto*
- 2-3 destaques: [o que foi bom]
- 2-3 problemas: [o que precisa atenção]
- Decisões pendentes: [se houver — o que precisa de autorização/escolha]
- Eventos externos relevantes: [mercado, regulação, crise]

---

**PASSO 1 — TL;DR (1 parágrafo, 3-5 frases)**

Exatamente nessa ordem:
1. Resultado vs meta (em 1 frase)
2. Destaque (em 1 frase)
3. Alerta principal (em 1 frase)
4. Prioridade do próximo período (em 1 frase)

Modelo:
"[Período] fechou com [métrica-chave de R$ e %] — [avaliação: acima/na meta/abaixo] da meta de [X]. O destaque foi [conquista específica]. O principal alerta é [problema + impacto]. Com [runway ou dado crítico], a prioridade do [próximo período] é [ação específica]."

**PASSO 2 — SCORECARD ESTRATÉGICO**

Tabela enxuta (5-7 linhas no máximo):

| Métrica | Meta | Realizado | Status |
|---------|------|-----------|--------|
| MRR | R$90k | R$82k | 🟡 -9% |
| Churn | <3% | 4.5% | 🔴 +50% |
| Clientes novos | 10 | 8 | 🟡 -20% |
| NRR | >110% | 108% | 🟢 OK |
| Caixa | R$500k | R$380k | 🟢 OK |
| Runway | >6m | 8m | 🟢 OK |

Status em 3 cores: 🟢 / 🟡 / 🔴.

**PASSO 3 — DESTAQUES (3 frases)**

3 pontos positivos com contexto:
- ✅ [Conquista específica com número]
- ✅ [Outra]
- ✅ [Outra]

Exemplos:
- ✅ Entrada de 8 novos clientes Enterprise com ticket médio 2.3x acima do padrão
- ✅ NRR atingiu 108% pela primeira vez (expansão em clientes existentes)
- ✅ CAC caiu de R$520 para R$390 após otimização do funil

**PASSO 4 — ALERTAS (2-3 linhas com IMPACTO EM R$)**

Problemas que precisam atenção da liderança:
- 🚨 [Problema]: impacto em R$ + causa identificada
- 🚨 [Outro]

Exemplo:
- 🚨 Churn de 4.5% (meta 3%) concentrado em clientes SMB. Impacto: R$18k de MRR perdido. Causa: onboarding SMB insuficiente
- 🚨 Dependência de 1 canal de aquisição (Google Ads = 70% dos leads). Risco: se custo subir, budget quebra projeção

**PASSO 5 — FINANCEIRO RESUMIDO**

3-4 linhas:
- Receita vs meta: [valor + %]
- Margem: [%]
- Caixa: [valor + runway em meses]
- Burn mensal: [valor]

**PASSO 6 — DECISÕES PENDENTES**

A parte mais importante do brief — o que precisa da decisão do leitor:

### Decisão #1: [Pergunta específica]
- **Contexto**: [3 frases]
- **Opções**:
  - Opção A: [descrição + prós/contras em 1 linha]
  - Opção B: [idem]
  - Opção C (se houver): [idem]
- **Recomendação**: [sua visão + justificativa em 1 frase]

### Decisão #2: [Outra, se houver]
[mesma estrutura]

**PASSO 7 — PRÓXIMO PERÍODO**

3 frases sobre foco:
- Prioridade 1 pro [próximo período]
- Prioridade 2
- Milestone esperado

**PASSO 8 — ANEXO (opcional)**

Se o executivo pedir profundidade depois:
- Link pra relatório completo
- Link pro dashboard vivo
- Quem contatar pra dúvidas específicas

---

**REGRAS INVIOLÁVEIS:**

1. **Máximo 1 página A4** (± 400-500 palavras)
2. **TL;DR no topo** — se ler só isso, tem o essencial
3. **Números com contexto** — "R$82k" sozinho é ruim; "R$82k (-9% da meta)" é bom
4. **Alertas com impacto em R$** — "churn alto" é vago; "churn de 4.5% = R$18k de MRR perdido" é impactante
5. **Decisões com opções** — nunca "o que fazer?" sem alternativas
6. **Linguagem humana** — não "mantivemos KPIs em níveis sustentáveis" — "as métricas estão dentro do esperado"
```

## Regras do brief que decisão

**1. Primeira frase vale metade do documento.** TL;DR mal escrito = resto não lido.

**2. Número sem contexto é número perdido.** R$82k significa? Comparando com meta? Mês anterior? Benchmark?

**3. Alerta sem impacto em R$ é preocupação vaga.** "Churn alto" → "churn consumindo R$18k/mês de MRR".

**4. Decisão sem alternativas paralisa.** Executivo precisa escolher entre A, B, C — não adivinhar.

**5. Cor no scorecard poupa leitura.** 🟢🟡🔴 em 3 segundos diz o que texto explica em 3 minutos.

## Erros que matam o executive brief

- Longo demais (2+ páginas)
- Sem TL;DR (obriga leitura completa)
- Métricas sem interpretação
- "Próximos passos" vagos
- Dados de apoio no corpo (vai pra anexo)
- Linguagem formal demais ("em que pese a performance subótima…")
- Mandar antes da reunião — mas não falar nada na reunião (redundante) OU falar tudo diferente (confuso)

## Formato e distribuição

- **Email direto** com o brief no corpo (não anexo)
- **PDF anexo** apenas se precisa de formatação rica
- **Slide único** pra apresentação ao vivo (Notion / Google Slides)
- Envie **48h antes** da reunião pra dar tempo de ler
- Na reunião, não releia — assuma que leu

## Sinais de brief efetivo

- Executivo faz pergunta específica na reunião (não genérica)
- Decisões pendentes saem da reunião com resposta
- Ritual mensal vira previsível (formato repetível)
- Board começa a antecipar: "vi que o churn subiu — o que tão fazendo?"
- Você é convidado pra mais reuniões (virou fonte confiável)

## Template de cabeçalho

```
# Executive Brief — [Empresa] | [Mês/Trimestre]
**De**: [seu nome/cargo]
**Para**: [destinatário]
**Tempo de leitura**: 3 min
```

---
**Movimento estratégico:** Se você escreve brief mensal há 6+ meses, crie anexo de **trendlines** — gráficos de 12 meses das métricas principais. Não entra no brief (volumoso), mas link no anexo. Executivo que quer aprofundar vai. Os outros não leem e não perdem tempo. Brief + trendlines = melhor de dois mundos.
