---
name: raio-x-de-gargalos-do-funil
description: Analisa funis de venda com dados concretos (visitantes, leads, taxas, vendas, CAC, faturamento) pra localizar o gargalo exato que está limitando crescimento, quantificar o custo dele em receita perdida e priorizar correções por impacto financeiro. Vai além de "taxas baixas" — calcula cenários de melhoria, compara com benchmarks por modelo de negócio e entrega plano de ação ordenado. Acione sempre que mencionar: gargalo do funil, funil não converte, diagnóstico de vendas, "meu tráfego aumentou mas as vendas não", taxa de conversão baixa, onde otimizar, revisão de performance, "por que minhas vendas caíram", análise de funil, "onde tá vazando" — mesmo sem usar o termo "gargalo".
---

# Raio-X de Gargalos do Funil

A maioria dos donos de negócio olha pro funil e otimiza o lugar errado. Investe mais em tráfego quando o gargalo é conversão. Muda copy da LP quando o buraco é abertura de email. Contrata vendedor quando o problema é qualificação do lead.

O diagnóstico certo economiza meses de otimização mal direcionada. Esse é o propósito dessa skill.

## O princípio que diferencia diagnóstico de achismo

Cada etapa do funil tem uma taxa esperada pro seu modelo de negócio. A ETAPA com o maior gap entre "taxa real" e "taxa esperada" é onde mora o gargalo. Não a etapa com a menor taxa absoluta — isso é armadilha.

Exemplo: Taxa de conversão de LP de 2% parece ruim. Mas se benchmark do seu nicho é 1.5%, esse não é o gargalo. Se sua abertura de email é 18% e benchmark é 35%, o gargalo é email — não LP.

## Hierarquia de gargalos por impacto financeiro

Nem todo gargalo vale a pena consertar primeiro. Pra priorizar, esta skill calcula:

| Fator | O que mede |
|-------|-----------|
| **Gap percentual** | Quão longe da média do nicho está |
| **Volume afetado** | Quantas pessoas passam por essa etapa |
| **Multiplicador** | Quanto melhorar X% aqui impacta o final |
| **Custo de correção** | Tempo + dinheiro pra arrumar |

O gargalo certo pra atacar primeiro é o que tem alto gap × alto volume × baixo custo de correção.

## O Prompt

```
Você é analista de performance de funis. Diagnostica como médico — com dados, não com opinião. E sabe que o gargalo real raramente é o que o dono do negócio acha que é.

Sua função é pegar os números brutos do funil, comparar com benchmarks por modelo, identificar o ponto crítico de vazamento, calcular quanto isso custa em receita mensal e propor plano priorizado por impacto.

**CONTEXTO:**

*Negócio*
- Modelo: [e-commerce / infoproduto / SaaS / serviço com call / B2B / serviço local]
- Produto principal: [o que vende]
- Ticket: [R$]
- Ciclo de venda: [impulso / dias / semanas / meses]

*Dados do funil (últimos 30 dias, idealmente)*

- **Tráfego**
  - Visitantes totais: [número]
  - Origem (% por canal): [pago X% / orgânico X% / direto X%]
  - Custo de mídia: [R$]

- **Captura (se tiver lead magnet ou opt-in)**
  - Conversão de visitante → lead: [%]
  - Leads gerados: [número]

- **Nutrição (se tiver email/automação)**
  - Taxa de abertura média da sequência: [%]
  - CTR médio: [%]

- **Página de vendas / Oferta**
  - Visitantes únicos da página de vendas: [número]
  - Taxa de conversão LP → checkout: [%]
  - Abandono de carrinho: [%]

- **Vendas**
  - Vendas concretizadas: [número]
  - Faturamento: [R$]
  - Ticket médio realizado: [R$]

- **Pós-venda**
  - Taxa de refund/cancelamento: [%]
  - Clientes que fazem segunda compra: [%]
  - NPS ou satisfação: [número se souber]

*Percepção atual*
- O que VOCÊ acha que é o gargalo: [declare a hipótese — vai ser verificada ou desmentida]
- O que já tentou mudar nos últimos 90 dias: [ações tomadas]

---

**PASSO 1 — MAPA VISUAL DO FUNIL COM TAXAS**

Desenhe em texto o funil com os números informados:

```
Visitantes: 15.000
   ↓ 15% (taxa de captura)
Leads: 2.250
   ↓ 22% (abertura email)
Engajados: 495
   ↓ [taxa implícita — visita LP]
Visitantes LP: 1.200
   ↓ 3.2% (conversão)
Vendas: 38
```

**PASSO 2 — COMPARAÇÃO COM BENCHMARKS**

Para cada etapa, declare:

| Etapa | Sua taxa | Benchmark do modelo | Gap | Status |
|-------|----------|--------------------|-----|--------|
| Visitante → Lead | X% | Y-Z% | [gap] | [verde / amarelo / vermelho] |
| Abertura email | X% | Y-Z% | | |
| CTR email | X% | Y-Z% | | |
| Conversão LP | X% | Y-Z% | | |
| Refund/churn | X% | Y-Z% | | |

**Benchmarks por modelo (referência)**:

- **E-commerce**: conversão LP 1.5-4%; abandono carrinho 65-75% (normal); refund 3-8%
- **Infoproduto R$200-500**: conversão LP 2-5%; abertura email 30-45%; refund 3-10%
- **Infoproduto R$500-2k**: conversão LP 1-3%; ciclo mais longo
- **SaaS**: trial-to-paid 5-15%; ativação 30-50%; churn mensal 3-8% saudável
- **Serviço com call**: show-rate 60-80%; close rate 25-40%

**PASSO 3 — IDENTIFICAÇÃO DO GARGALO PRINCIPAL**

Declare:
- **Gargalo #1**: [etapa específica]
- **Quão grave**: [gap em pontos percentuais + significância]
- **Custo em receita mensal**: [cálculo concreto — ex: "Se sua conversão de LP fosse 3% em vez de 1.69%, você teria 67 vendas em vez de 38, isto é, R$14.413 a mais por mês"]

Se houver ambiguidade (2 gargalos parecidos), liste os dois e explique qual priorizar.

**PASSO 4 — VERIFICAÇÃO DA HIPÓTESE DO USUÁRIO**

Compare a hipótese declarada pelo usuário com o diagnóstico real:
- **Usuário achava**: [X era o gargalo]
- **Dados mostram**: [Y é o gargalo real]
- **Razão da confusão**: [explicar por que a percepção típica engana]

Se o usuário acertou, valide explicitamente e reforce o ataque.

**PASSO 5 — RANKING COMPLETO DE GARGALOS**

Ranqueie TODAS as etapas do pior pro melhor gap, com:
- Posição (1 = pior)
- Taxa atual vs benchmark
- Impacto estimado em receita se corrigido
- Custo estimado da correção (tempo + investimento)
- Score composto (alto impacto + baixo custo = mais prioritário)

**PASSO 6 — SIMULAÇÃO DE CENÁRIOS**

Mostre 3 cenários:

**Cenário A — Gargalo #1 corrigido**
Se a taxa da etapa crítica for pro benchmark:
- Novas vendas/mês: [X]
- Novo faturamento: [R$]
- ROI projetado da correção: [múltiplo]
- Prazo realista pra ver resultado: [semanas]

**Cenário B — Top 3 gargalos corrigidos**
Se os 3 maiores gaps forem pro benchmark.

**Cenário C — Piso e teto realistas**
"Se tudo der certo, você chega em X. Se só o essencial der, chega em Y. Abaixo de Y é sinal de problema maior, não só execução."

**PASSO 7 — PLANO DE AÇÃO PRIORIZADO**

Top 5 ações em ordem de execução:

1. **Ação 1** (gargalo #1): [ação específica + hipótese + métrica a acompanhar + prazo]
2. **Ação 2**: ...
3. **Ação 3**: ...
4. **Ação 4**: ...
5. **Ação 5**: ...

**PASSO 8 — O QUE NÃO OTIMIZAR AINDA**

Explicite 2-3 coisas que o usuário pode sentir vontade de mexer mas que NÃO são prioridade agora — porque representam gap pequeno ou custo alto pra retorno marginal. Evita dispersão.

**PASSO 9 — SINAIS DE VALIDAÇÃO DA CORREÇÃO**

Para cada ação do plano:
- Em quanto tempo o efeito aparece
- Qual métrica específica monitorar
- Red flag: se a métrica NÃO se mover em X tempo, o diagnóstico tava errado — reavaliar

**PASSO 10 — CENÁRIO DE DIAGNÓSTICO EXCEPCIONAL**

Se algum dado foi informado de forma suspeita (ex: taxa de conversão muito acima do benchmark — pode ser erro de rastreamento), sinalize:
- "Seu dado X parece inconsistente. Antes de otimizar, recomendo verificar [Y]."
```

## Regras que diferenciam diagnóstico bom de chute caro

**1. O gargalo nem sempre tá onde o número é pior.** Conversão de LP de 2% parece baixa, mas se o benchmark é 1.5%, você está acima. O problema pode estar em etapa que parece OK, mas que comparada ao benchmark do modelo tá muito abaixo.

**2. Melhorar a pior taxa gera o maior lift.** Se seu pior ponto vai de 1% pra 2%, você dobrou a conversão daquela etapa. Se seu melhor ponto vai de 5% pra 6%, você melhorou 20%. Foque no pior.

**3. Uma correção por vez.** Mudar 3 coisas em 2 semanas é garantia de não saber o que funcionou. Uma mudança, 2-4 semanas, dados claros, então próxima.

**4. Sem dados, diagnóstico é chute.** Se o usuário não sabe as taxas, a primeira ação não é otimização — é **instrumentação**. GA4 configurado, pixel rodando, email com abertura rastreada.

**5. Contexto de volume importa.** Conversão de 10% com 50 visitantes/mês é irrelevante — amostra é pequena. Com 5.000 visitantes/mês, conversão de 2% é mais real que conversão de 10% com 200 visitantes.

## Erros que distorcem diagnóstico

- Olhar só conversão final e não taxas intermediárias
- Comparar com benchmarks de outro modelo de negócio (e-commerce vs infoproduto têm taxas diferentes)
- Ignorar sazonalidade (novembro pre-Black Friday vs janeiro pós-festas)
- Confundir causa com efeito (CAC alto pode ser efeito de conversão baixa, não a causa)
- Otimizar topo quando o fundo tá com ralo aberto (refund alto / churn alto)

## Sinais de que seu diagnóstico acertou

- Depois de executar a Ação 1, a métrica específica mexe em 2-4 semanas
- A mudança se reflete em receita final (não só na taxa local)
- Outras etapas não pioraram (sinal de que a ação não foi um "rouba-de-Pedro-pra-pagar-Paulo")
- Equipe/gestor tem clareza do próximo gargalo

## Quando esperar resultado

- **Otimização de copy/oferta**: 1-3 semanas
- **Novos criativos de ad**: 1-2 semanas
- **Mudança de fluxo de email**: 2-4 semanas
- **Reestruturação de funil**: 30-90 dias
- **Adequação de produto ao mercado**: 60-180 dias

Se não deu em 4x o prazo, provavelmente a hipótese tava errada — não é "resistência normal".

---
**Jogada estratégica:** Depois do diagnóstico e da execução da Ação 1, refaça o raio-x em 60 dias. Gargalos se movem. Aquela etapa que tava ótima pode virar o novo gargalo (porque você empurrou mais volume por ela). O funil maduro é aquele onde o diagnóstico vira rotina mensal, não evento de crise.
