---
name: radar-financeiro-anual
description: Constrói projeção de fluxo de caixa mensal pros próximos 12 meses com 3 cenários (otimista, realista, pessimista), alerta de meses críticos, indicadores-chave de saúde financeira (runway, margem, ponto de equilíbrio) e recomendações específicas. Não entrega só "planilha preenchida" — entrega mapa de decisão financeira que mostra quando dá pra contratar, quando precisa segurar, e quando o negócio vai quebrar se nada mudar. Acione sempre que mencionar: fluxo de caixa, projeção financeira, planejamento financeiro anual, "vou conseguir pagar X mês que vem", "meu caixa tá no vermelho", "quando posso contratar", runway, reserva de caixa, orçamento anual, cenários financeiros — mesmo sem citar "fluxo".
---

# Radar Financeiro Anual

Negócio não quebra por falta de lucro. Quebra por falta de caixa. Duas coisas diferentes — e que aparecem em balanço diferente.

É normal o dono achar que tá indo bem porque "fechei 5 contratos esse mês" e 45 dias depois não conseguir pagar o aluguel. Isso acontece porque receita prometida ≠ caixa disponível. Regime de competência ≠ regime de caixa.

A projeção bem feita antecipa esse descasamento por 3-6 meses — tempo suficiente pra agir, não pra apagar incêndio.

## As 3 perguntas que toda projeção precisa responder

| Pergunta | Quando fica crítica |
|----------|---------------------|
| **Até quando meu caixa aguenta se receita parar?** (runway) | Antes de qualquer decisão grande — contratar, investir, expandir |
| **Quando especificamente eu vou pra cima / pra baixo da linha d'água?** | Pra preparar: contratar caixa extra, antecipar recebíveis, etc. |
| **Qual minha margem real de manobra em cada mês?** | Pra evitar confundir lucro com folga |

Skill que só entrega tabela de receita vs despesa não responde essas 3. Essa aqui responde.

## O Prompt

```
Você é analista financeiro prático. Não enche empresário com jargão de contador — traduz número em decisão. Seu trabalho não é gerar tabela bonita — é mapear o próximo ano de caixa pra que o dono possa agir com 3-6 meses de antecedência sobre problemas que viriam.

**CONTEXTO:**

*Empresa*
- Nome/setor: [qual]
- Modelo de receita: [recorrente / por projeto / venda única / misto + % de cada]
- Tempo de mercado: [meses ou anos]
- Estágio: [começando / crescendo / estável / em crise]

*Receita atual*
- Faturamento médio mensal últimos 6 meses: [R$]
- Melhor mês: [R$]
- Pior mês: [R$]
- Expectativa de crescimento: [% ao mês / estável / declinante]
- Sazonalidade: [meses fortes e fracos — se houver]

*Custos fixos (pagos todo mês independente de receita)*
- Aluguel/coworking: [R$]
- Salários + encargos: [R$]
- Pró-labore do dono: [R$]
- Ferramentas/SaaS: [R$]
- Contador: [R$]
- Assinaturas: [R$]
- Outros fixos: [R$]
- **Total fixos**: [R$]

*Custos variáveis (variam com volume)*
- Tráfego pago: [R$ ou % do faturamento]
- Comissões/afiliados: [R$ ou %]
- Impostos: [% — varia por regime]
- Gateway/plataforma: [% ou R$]
- Outros variáveis: [R$ ou %]

*Caixa*
- Saldo atual em conta + aplicações de liquidez imediata: [R$]
- Recebíveis futuros já contratados: [R$ + prazo]
- Dívidas a pagar (além das mensalidades): [R$ + prazo]

*Investimentos previstos*
- Contratações no horizonte: [função + salário + mês de entrada]
- Equipamentos: [R$ + mês]
- Marketing extra (campanhas grandes): [R$ + mês]
- Outros: [R$ + mês]

---

**PASSO 1 — TABELA DE FLUXO DE CAIXA 12 MESES (cenário realista)**

Monte tabela mensal com:

| Mês | Receita esperada | Custos fixos | Custos variáveis | Investimentos | Fluxo líquido | Saldo acumulado |
|-----|------------------|--------------|-----------------|---------------|---------------|-----------------|
| M1 | | | | | | |
| M2 | | | | | | |
| ... | | | | | | |
| M12 | | | | | | |

Receita mensal deve refletir:
- Base atual
- Crescimento esperado aplicado
- Sazonalidade declarada
- Novos contratos confirmados

**PASSO 2 — 3 CENÁRIOS**

### Cenário Realista
O projetado no passo 1, com premissas médias.

### Cenário Otimista
- Crescimento superior ao esperado (10-20% acima)
- Retenção acima da média
- Sem imprevistos

### Cenário Pessimista
- Perda de cliente relevante
- Crescimento zero ou negativo
- Custo inesperado (equipamento quebra, imposto atrasado, afastamento)
- Sazonalidade pior que o histórico

Mostre a tabela do saldo acumulado nos 3 cenários lado a lado.

**PASSO 3 — ALERTAS CRÍTICOS**

Em cada cenário, marque:
- **Meses com fluxo líquido negativo** (mês em que você queima mais que entra)
- **Meses com saldo acumulado perigoso** (< 1 mês de custo fixo)
- **Meses com saldo negativo** (o caixa vai no vermelho — CRÍTICO)

Para cada alerta, declare:
- Mês específico
- Gap em R$ (quanto falta)
- Causa raiz identificada
- Ação recomendada com 30-60 dias de antecedência

**PASSO 4 — INDICADORES-CHAVE**

Calcule e interprete:

| Indicador | Valor | Interpretação |
|-----------|-------|---------------|
| **Runway atual** (meses de custo fixo que o caixa cobre sem nova receita) | X meses | [confortável > 6 / atenção 3-6 / crítico < 3] |
| **Runway projetado** (no cenário realista ao longo do ano) | varia | onde pioca e por quê |
| **Margem líquida média** | X% | [saudável > 20 / apertada 10-20 / problemática < 10] |
| **Ponto de equilíbrio mensal** (receita mínima pra não ter prejuízo) | R$X | distância percentual da receita atual |
| **% de custo fixo no faturamento** | X% | [saudável < 40 / pesado 40-60 / inviável > 60] |
| **Razão custo variável/receita** | X% | [analisar se cabe no modelo] |

**PASSO 5 — RECOMENDAÇÕES ESPECÍFICAS**

Não genéricas. Baseadas nos dados entregues. Pelo menos 5 recomendações, cada uma com:
- O que fazer
- Impacto esperado no caixa
- Prazo de execução
- Risco se não fizer

Exemplos de recomendações típicas (customize pro caso):
- "Contratar designer no mês 4 só se o 4º cliente já estiver confirmado até o mês 3"
- "Antecipar recebíveis no mês 7 (mês fraco) — custo de antecipação vale pena vs entrar no vermelho"
- "Investir na reserva de caixa nos meses 2-3 (que têm sobra) até ter 3 meses de custo fixo"
- "Renegociar prazo de pagamento do fornecedor X (vence em 30d, transformar em 60d pra casar com ciclo de venda)"

**PASSO 6 — GATILHOS DE REVISÃO**

Indique o que deve disparar uma nova rodada de projeção:
- Se receita desviar do projetado em mais de X%
- Se perder cliente representativo (> X% do faturamento)
- Se surgir investimento não previsto acima de R$X
- No mínimo revisão trimestral mesmo sem gatilhos

**PASSO 7 — PLANO DE RESERVA DE CAIXA**

Se a empresa ainda não tem reserva de emergência:
- Meta realista (3 meses de custo fixo, ideal 6)
- Caminho pra chegar lá (% do lucro mensal alocado)
- Onde guardar (liquidez imediata — CDB 100% CDI ou similar)
- Quando pode usar: apenas emergência, não "oportunidade"

**PASSO 8 — CHECKLIST DE IMPLEMENTAÇÃO**

- [ ] Definir saldo mínimo aceitável em conta (abaixo disso, é "estado de alerta")
- [ ] Marcar calendário com datas de revisão da projeção
- [ ] Estabelecer regra "pró-labore vem DEPOIS de pagar custos, não antes"
- [ ] Definir o que fazer com sobra de caixa mensal (% reserva / % investimento / % distribuição)
- [ ] Revisar mensalmente real vs projetado (desvio > 15% merece ajuste)
```

## Regras que separam projeção útil de planilha morta

**1. Receita entra no caixa quando o dinheiro chega, não quando a venda acontece.** Fatura um projeto de R$30k em janeiro pra pagamento em março. No caixa de janeiro, zero. No de março, R$30k. Confundir isso é o erro #1 de projeções.

**2. Custo fixo sempre entra, receita variável às vezes entra.** Por isso reserva de caixa = múltiplos de custo fixo, não de faturamento.

**3. Projete pessimista sempre.** Receita planejada quase nunca acontece 100%. Custos quase sempre aparecem 5-10% acima do esperado. Se no cenário pessimista você sobrevive, tá protegido.

**4. Atualize mensalmente.** Projeção feita em janeiro e esquecida até julho não serve pra nada. Revisão mensal (15 minutos) é o que transforma planilha em ferramenta.

**5. Pró-labore é custo fixo como qualquer outro.** Dono que "pega o que sobra" toma decisões erradas. Defina valor fixo do pró-labore, trate como salário, e retire só isso mesmo se sobrar mais.

## Erros que quebram empresas boas

- Confundir faturamento (regime de competência) com caixa (regime efetivo)
- Contratar baseado em "esperança de novo cliente" que ainda não assinou
- Não ter reserva e depender de antecipação de recebíveis a cada aperto (spread come a margem)
- Misturar conta pessoa física e pessoa jurídica
- Não saber de cabeça: runway atual, ponto de equilíbrio, custo fixo mensal

## Sinais de saúde financeira

- Runway > 3 meses o ano inteiro
- Reserva de emergência estável em 6 meses de custo fixo
- Margem líquida > 15%
- Menos de 40% do faturamento comprometido em custo fixo
- Distância entre faturamento e ponto de equilíbrio > 40%
- Donos consegue dormir tranquilo

Se algum desses não tá, a projeção te mostra quando e como corrigir.

---
**Movimento estratégico:** A cada semestre, depois da projeção revisada, responda em 1 frase: "Se eu parasse de vender hoje, por quanto tempo esse negócio continua existindo sem demissões nem cortes drásticos?" Se a resposta é menos que 4 meses, seu foco do próximo semestre é construir reserva — não escalar. Escala sobre base frágil quebra 2x mais rápido que estagnação.
