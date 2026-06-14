---
name: dashboard-mensal-de-marketing-com-diagnostico
description: Constrói relatório mensal de marketing que interpreta — não só lista métricas. Scorecard de metas, análise por canal, top vitórias e problemas, comparativo vs mês anterior, insights causais, plano de ação pro próximo mês e projeção realista. Vai além de planilha bonita: explica o POR QUÊ dos números e define o que fazer. Acione sempre que mencionar: relatório de marketing, report mensal, relatório pra cliente, relatório de performance, prestação de contas pra diretoria, apresentação de resultados, "como apresentar o que eu fiz no mês", retrospectiva de marketing — mesmo sem citar "relatório".
---

# Dashboard Mensal de Marketing com Diagnóstico

Relatório sem interpretação é só planilha bonita. Executivo/cliente não quer ver número — quer saber o que aconteceu, por que aconteceu, e o que vai acontecer agora.

A maioria dos relatórios mensais falha por uma de 3 razões:

1. **Listagem sem narrativa**: tabela com 20 KPIs, sem contexto
2. **Sem comparação**: números soltos, impossível saber se é bom ou ruim
3. **Sem ação**: diagnóstico sem plano — vira reunião de lamentação

Relatório efetivo tem 4 camadas:

1. **Resumo executivo** (o que aconteceu em 3 frases)
2. **Scorecard** (meta × realizado com interpretação)
3. **Análise causal** (por que esses números)
4. **Plano de ação** (o que muda próximo mês)

## O Prompt

```
Você é analista de marketing sênior. Você sabe que relatório sem interpretação é planilha decorativa. Bom relatório começa com resumo executivo, compara com meta + mês anterior, explica o POR QUÊ, e termina com ações específicas pro próximo mês.

Calibra nível de detalhe pro destinatário (C-level recebe menos detalhe técnico que gestor de marketing).

**CONTEXTO:**

*Destinatário*
- Quem vai ler: [CEO / diretoria / sócios / cliente externo / equipe interna]
- Nível de familiaridade com marketing: [alto / médio / baixo]
- Tempo disponível: [5 min lendo / 30 min em reunião]

*Empresa/Cliente*
- Nome: [qual]
- Setor: [qual]
- Tamanho: [faixa de faturamento]

*Período*
- Mês de referência: [mês/ano]
- Canais ativos: [orgânico / pago / email / social / outros]

*Métricas do mês*
- Investimento em mídia paga: [R$]
- Tráfego do site: [visitantes]
- Leads gerados: [número]
- MQL→SQL: [taxa]
- Vendas atribuídas: [número]
- Faturamento atribuído: [R$]
- CAC: [R$]
- ROAS: [valor]
- Ticket médio: [R$]

*Metas do mês*
- Leads: [meta]
- Vendas: [meta]
- Faturamento: [meta]
- CAC: [meta]
- ROAS: [meta]

*Contexto do mês*
- Destaque: [o que aconteceu de mais relevante]
- Problema: [o que deu errado]
- Mudanças: [ajustes feitos no mês]
- Eventos externos: [sazonalidade / evento setor / crise]

*Comparação*
- Mês anterior (mesmos dados): [valores]
- Mesmo mês ano anterior (se aplicável): [valores]

---

**PASSO 1 — RESUMO EXECUTIVO (1 parágrafo)**

3-5 frases que respondem:
- O que aconteceu em termos de resultado vs meta
- O destaque do mês
- O principal problema
- O que faz sentido focar agora

Exemplo:
"Em [mês], investimos R$[X] em mídia paga e geramos R$[Y] em vendas (ROAS [Z]x), ficando [A]% abaixo da meta de [W] vendas. O destaque foi [canal/campanha], que gerou [%] das vendas com ROAS [V]x. O principal problema foi a [causa identificada]. Pro próximo mês, o foco vai ser [ação específica]."

**PASSO 2 — SCORECARD DE METAS**

| Métrica | Meta | Realizado | % | Status |
|---------|------|-----------|---|--------|
| Vendas | 150 | 127 | 85% | 🟡 Abaixo |
| Faturamento | R$45k | R$38.1k | 85% | 🟡 |
| CAC | R$300 | R$320 | 107% | 🟡 |
| ROAS | 3.0x | 2.54x | 85% | 🟡 |

Não deixe ficar só tabela — adicione 1 frase de interpretação por linha.

**PASSO 3 — ANÁLISE POR CANAL**

Pra cada canal ativo:

### Canal: [Google Ads]
- **Investimento**: R$[X]
- **Conversões**: [N]
- **CPA**: R$[Y]
- **ROAS**: [Z]x
- **Tendência vs mês anterior**: [↑ / ↓ / =]
- **Destaque**: [campanha que performou bem ou mal]
- **Ação recomendada**: [específica]

Repita pra cada canal.

**PASSO 4 — TOP 3 VITÓRIAS**

3 coisas que funcionaram bem:
1. **[Vitória 1]**: o que foi, por que funcionou, como replicar
2. **[Vitória 2]**: idem
3. **[Vitória 3]**: idem

**PASSO 5 — TOP 3 PROBLEMAS**

3 coisas que deram errado:
1. **[Problema 1]**: o que aconteceu, causa raiz identificada, impacto em R$
2. **[Problema 2]**: idem
3. **[Problema 3]**: idem

**PASSO 6 — COMPARATIVO MÊS ANTERIOR**

| Métrica | Mês anterior | Mês atual | Δ % |
|---------|-------------|-----------|-----|
| Investimento | | | |
| Leads | | | |
| Vendas | | | |
| Faturamento | | | |
| CAC | | | |
| ROAS | | | |

Interpretação em 1 parágrafo: o que a variação significa.

**PASSO 7 — INSIGHTS CAUSAIS**

Responda perguntas causais (não só descreva):

- **Por que [resultado bom] aconteceu?**: [causa identificada com evidência]
- **Por que [resultado ruim] aconteceu?**: [causa + evidência]
- **Tendência percebida nas últimas semanas**: [padrão]

**PASSO 8 — PLANO DE AÇÃO PRÓXIMO MÊS**

5 ações específicas pra implementar:

1. **[Ação 1]**: o que, por quê, métrica que vai mexer
2. **[Ação 2]**: idem
3. **[Ação 3]**: idem
4. **[Ação 4]**: idem
5. **[Ação 5]**: idem

Cada uma com:
- Responsável
- Prazo
- Impacto esperado

**PASSO 9 — PROJEÇÃO PRÓXIMO MÊS**

Baseado em:
- Orçamento planejado
- Ações do plano
- Sazonalidade
- Tendências atuais

Projete:
- Leads esperados: [faixa]
- Vendas esperadas: [faixa]
- Faturamento esperado: [faixa]
- CAC projetado: [valor]
- ROAS projetado: [valor]

Não seja otimista — projete cenário realista. Se quiser, inclua otimista + pessimista.

**PASSO 10 — RECOMENDAÇÕES ESTRATÉGICAS**

2-3 recomendações de médio prazo que vão além do "próximo mês":
- Ex: "Canal X está saturado — considerar migrar 20% do budget pra canal Y"
- Ex: "Conversão da LP caiu 3 meses seguidos — auditoria de CRO é necessária"
- Ex: "Ticket médio caindo — investigar mix de produtos vendidos"
```

## Regras do relatório útil

**1. Interpretação vence descrição.** Mostrar que vendas caíram 15% é fácil. Explicar por que é valor.

**2. Comparação é obrigatória.** Número isolado não significa nada. Compare com meta + mês anterior + mesmo mês ano anterior.

**3. Causa raiz > sintoma.** "ROAS caiu" é sintoma. "ROAS caiu porque criativos fadigaram e CTR caiu 40%" é diagnóstico.

**4. Ação específica > ação genérica.** "Melhorar campanhas" não é ação. "Trocar 3 criativos do conjunto X por variações do ganhador Y" é ação.

**5. Projeção honesta > projeção otimista.** Cliente/diretoria prefere previsão realista que acerta a otimista que decepciona.

## Erros recorrentes

- Relatório longo sem resumo executivo (executivo não lê)
- Métricas demais sem hierarquia (paralisa leitor)
- Falar só de vitórias (perde credibilidade)
- Falar só de problemas (desmotiva)
- Sem plano de ação ("então o que a gente vai fazer?")
- Projeção otimista sem base
- Apresentar em tela sem entregar documento (fica sem memória)

## Formato recomendado

- **Para C-level**: 1 página visual + anexo de detalhes
- **Para equipe**: apresentação 20-30 min com deep-dive
- **Para cliente externo**: documento escrito + chamada de 45 min

## Sinais de relatório efetivo

- Destinatário faz pergunta específica (engajou com os dados)
- Ações do plano são implementadas no mês seguinte
- Comparativo mensal mostra melhoria progressiva
- Cliente/diretoria começa a antecipar: "esse mês caiu por causa de X, certo?"
- Próxima reunião mensal é mais curta (não precisa reexplicar base)

## Nível de detalhe por destinatário

| Destinatário | Foco |
|-------------|------|
| C-level / diretoria | Resumo + scorecard + recomendações estratégicas |
| Gestor de marketing | Todo o relatório |
| Cliente externo | Scorecard + vitórias + ações |
| Equipe interna | Análise por canal + problemas + plano |

---
**Padronização do ciclo:** Crie template fixo em Notion ou Looker Studio que puxa dados automaticamente. Tempo de fazer relatório cai de 8h pra 2h. Os 6h ganhos vão pra análise causal — que é o que transforma relatório de "planilha bonita" em "ferramenta de decisão".
