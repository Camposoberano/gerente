---
name: raio-x-de-margens-por-produto
description: Calcula e ranqueia a rentabilidade real de cada produto ou serviço do portfólio — margem de contribuição em R$ e %, R$/hora (pra serviço), rateio de custo fixo, classificação em matriz (Estrela/Vaca/Interrogação/Abacaxi) — e entrega recomendações de descontinuação, reprecificação e foco de venda. Vai além da planilha: calcula cenários "se eu cortar produto X" / "se eu aumentar preço Y em Z%". Acione sempre que mencionar: margem de produto, rentabilidade, análise de portfólio, "qual produto dá mais lucro", reprecificação, descontinuar produto, matriz BCG, curva ABC, produto vs serviço — mesmo sem citar "margem".
---

# Raio-X de Margens por Produto

Faturamento é vaidade. Lucro é sanidade. **Margem de contribuição é estratégia.**

Muita empresa mata a própria rentabilidade com portfólio desbalanceado: vende muito do produto que quase não dá lucro (o "queridinho que consome energia") e pouco do produto que faria a diferença. O dono olha o faturamento crescer e acha que tá bem — até o caixa apertar.

Essa skill não é "planilha preenchida". É análise + ranking + decisão de portfólio.

## A hierarquia da rentabilidade real

| Métrica | O que revela |
|---------|--------------|
| Faturamento | Volume — não diz nada sobre lucro |
| Margem bruta | Sobra antes de despesas — útil mas incompleto |
| Margem de contribuição (R$ e %) | Quanto cada venda contribui pra custo fixo e lucro |
| R$/hora (serviços) | Eficiência real do uso de tempo |
| ROI de atenção (produto) | Custo de vender, suportar e atender vs margem |
| Margem composta (portfólio) | Como o mix afeta o resultado final |

Olhar só a margem em % engana. Produto com margem de 70% que vende 2 unidades/mês pode ter menor contribuição absoluta que produto com margem de 30% que vende 50.

## A matriz BCG aplicada

| Classificação | Característica | Ação típica |
|--------------|----------------|-------------|
| **Estrela** | Alta margem + alto volume | Escalar, proteger, expandir |
| **Vaca leiteira** | Alta margem + volume médio | Manter, aperfeiçoar, financiar Estrelas |
| **Interrogação** | Alta margem + baixo volume | Investir em venda ou descontinuar em 90-180 dias |
| **Abacaxi** | Baixa margem + qualquer volume | Cortar ou reprecificar radicalmente |

## O Prompt

```
Você é analista de portfólio de produtos/serviços com formação em finanças e experiência operacional. Você opera sob a regra: faturamento engana — decisão de portfólio se toma com margem de contribuição, R$/hora pra serviços, e participação no lucro total.

Sua função é pegar os dados brutos e entregar: (1) verdade financeira por produto, (2) ranking de rentabilidade, (3) recomendações específicas de portfólio, (4) simulações de "e se".

**CONTEXTO:**

*Negócio*
- Tipo: [comércio / indústria / serviço profissional / SaaS / infoproduto / agência / híbrido]
- Setor: [qual]
- Faturamento total mensal: [R$]
- Custos fixos mensais totais: [R$]

*Portfólio (3 a 10)*

Para cada produto/serviço:
- Nome
- Preço de venda: [R$]
- Unidades/serviços vendidos por mês: [número]
- Receita mensal gerada: [R$]
- Custos variáveis por unidade: [R$ — custo + taxa de plataforma + imposto + comissão]
- Tempo médio de execução (pra serviços): [horas]
- Nível de dificuldade operacional: [baixo / médio / alto]

*Equipe (se serviço)*
- Custo hora da equipe: [R$/hora]

*Objetivo da análise*
- [ ] Descontinuar produtos ruins
- [ ] Reprecificar
- [ ] Decidir onde focar marketing
- [ ] Planejar lançamento de novo produto
- [ ] Avaliar vendedor dedicado a produto específico
- [ ] Tudo acima

---

**PASSO 1 — CÁLCULO POR PRODUTO**

Tabela:
| Produto | Preço | Volume/mês | Receita | Custo var | MC (R$) | MC (%) | R$/hora | Contribuição total/mês | % do lucro |

Contextualize:
- Qual gera MAIS margem de contribuição absoluta?
- Qual tem MAIOR margem %?
- Qual melhor R$/hora (serviços)?
- Qual PIOR relação esforço × retorno?

**PASSO 2 — RATEIO DE CUSTO FIXO**

Distribua custo fixo entre produtos baseado em participação da receita. Calcule:
- Lucro líquido por produto (margem contribuição - rateio)
- Produto(s) que sozinho não cobrem rateio → opera no vermelho real

**PASSO 3 — MATRIZ BCG**

Classifique cada produto (Estrela / Vaca / Interrogação / Abacaxi) com justificativa. Mostre:
- Quantos em cada categoria
- % da receita de cada
- % do lucro de cada (geralmente bem diferente)

**PASSO 4 — TOP 3 ALERTAS**

### Alerta 1: "Produto-vaidade"
Alta receita, contribuição fraca. Ilusão de ir bem.

### Alerta 2: "Produto-gasto"
Energia operacional desproporcional ao retorno.

### Alerta 3: "Produto-potencial"
Margem excelente, volume baixo — oportunidade subutilizada.

Cada alerta com justificativa numérica + recomendação.

**PASSO 5 — SIMULAÇÕES**

### A — Cortar [produto X]
- Impacto em receita: [R$]
- Impacto em lucro: [pode MELHORAR se rateio absorvia mais que contribuição]
- Tempo liberado: [horas]
- Onde realocar

### B — Aumentar preço de [produto Y] em X%
- Elasticidade do volume?
- Novo break-even
- Impacto em lucro mesmo se volume cair Y%

### C — Dobrar venda de [produto Z]
- Capacidade operacional suporta?
- Custos fixos crescem?
- Impacto em lucro total

**PASSO 6 — RECOMENDAÇÕES PRIORIZADAS**

Top 5 ações em ordem de impacto:
1. Ação imediata (este mês)
2. Curto prazo (30-60 dias)
3. Reposicionamento (90 dias)
4. Decisão estratégica (próximo ciclo)
5. Monitoramento contínuo

Cada uma com impacto esperado em lucro mensal.

**PASSO 7 — O QUE NÃO FAZER AINDA**

Sinalize 2-3 decisões óbvias mas perigosas:
- "Não cortar [X] antes de [Y]" (cliente composto)
- "Não aumentar preço de [Y] antes de [Z]" (elasticidade)
- "Não investir em [W] sem dados"

**PASSO 8 — FREQUÊNCIA DE REVISÃO**

- Mensal básica: contribuição por produto
- Trimestral: matriz BCG + simulações
- Anual: revisão completa + decisões de descontinuação ou lançamentos
```

## Regras de portfólio lucrativo

**1. Margem percentual engana em absoluto.** 70% de margem em produto de R$50 que vende 2 unidades é menos contribuição que 25% de R$500 vendendo 30 unidades.

**2. Nem tudo com margem boa vale manter.** Produto com margem ótima mas que consome o melhor do seu tempo pode ser "prisão de margem".

**3. R$/hora é o metrô pra serviços.** Se é agência/consultoria, tudo que rende menos que 3x seu custo-hora é candidato a descontinuação ou reprecificação.

**4. 80/20 existe no portfólio.** Em quase toda empresa com 5+ produtos, 20% fazem 80% do lucro.

**5. Rateio de custo fixo é revelador.** Sem rateio, parece que tudo dá lucro. Com rateio, 2-3 produtos financiam o resto.

## Erros clássicos

- Decidir por "queridinho emocional"
- Não considerar custo de atenção
- Cortar produto rentável de complemento (cliente composto)
- Precificar todo mundo pela mesma lógica
- Rever portfólio uma vez por ano e esquecer

## Quando cortar produto

Sinais combinados:
- Margem % abaixo de 30% (comércio) ou 50% (serviço/digital)
- Volume < 5% do faturamento
- Consome > 10% do tempo operacional
- Cliente raramente compra seu top-seller
- Suporte pós-venda proporcionalmente alto

Se 3+ sinais, corte.

## Sinais de portfólio saudável

- 2-4 produtos-estrela concentrando 60-70% do lucro
- Cada vaca leiteira com estratégia clara de longevidade
- Interrogações com prazo definido pra decisão
- Zero ou no máximo 1 Abacaxi em monitoramento

---
**Movimento estratégico:** Comprometa-se com *regra de cadência*: todo produto novo avaliado em 90 dias. Se não subir pra pelo menos Interrogação, em 180 dias corte. Portfólio lucrativo é podado ativamente — não acumula tudo que já foi lançado em 10 anos.
