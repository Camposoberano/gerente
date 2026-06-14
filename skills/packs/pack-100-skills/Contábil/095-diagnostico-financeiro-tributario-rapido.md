---
name: diagnostico-financeiro-tributario-rapido
description: Análise estruturada da saúde financeira e tributária de PME — comparativo entre regimes (Simples vs Presumido vs Real) com impacto em R$/ano, identificação de pontos de sangramento financeiro escondido (pró-labore mal estruturado, custos crescendo acima da receita, ciclo de caixa quebrado), e plano de ação 30/60/90 dias com recomendações priorizadas por impacto. Serve como entregável de captação (consultoria gratuita inicial) ou revisão anual de cliente ativo. Acione sempre que mencionar diagnóstico financeiro, análise tributária, comparativo de regime, "vale mudar de Simples pra Presumido?", saúde financeira da empresa, planejamento tributário, revisão anual contábil — mesmo sem citar "diagnóstico".
---

# Diagnóstico Financeiro e Tributário Rápido

A maioria dos donos de PME acha que sabe a saúde financeira da própria empresa. Sabem que o caixa "tá apertado" ou "tá folgado", mas não sabem responder com precisão: qual regime tributário é ideal? quanto está pagando a mais de imposto por estar no regime errado? quanto do "lucro" é na verdade pró-labore disfarçado? por que o faturamento cresce mas o caixa não acompanha?

Diagnóstico financeiro consultivo responde essas perguntas em formato apresentável — não em planilha de contador. É a entrada pra mostrar valor antes de cobrar (em captação) ou pra renovar contrato (em cliente ativo). Bem feito, é o que separa contador-prestador de contador-consultor.

A regra é: o diagnóstico não pode parecer balancete. Tem que parecer parecer médico — leigo entende, age, agradece.

## As 4 frentes do diagnóstico

| Frente | O que olha | Saída esperada |
|--------|-----------|----------------|
| **Tributária** | Regime atual vs alternativas | R$/ano de economia possível |
| **Estrutural** | Custos fixos vs variáveis vs receita | % de comprometimento e tendência |
| **Caixa** | Ciclo financeiro, prazos, capital de giro | Dias de fôlego operacional |
| **Estratégica** | Pró-labore, distribuição, sucessão, crescimento | Riscos não mapeados + oportunidades |

Cada frente sozinha é insuficiente. As 4 juntas formam o diagnóstico que vende.

## O Prompt

```
Você é consultor financeiro e tributário pra PMEs brasileiras. Sua função é gerar diagnóstico estruturado em linguagem que o empresário (não o contador) entende, com recomendações priorizadas por impacto financeiro REAL — em R$, não em %, não em chavão.

Princípios não-negociáveis:
- R$ vence %. "R$22.000/ano" prende; "3,4% de economia" não.
- Comparativo de regime sempre em 3 colunas (atual vs 2 alternativas) com saída anualizada.
- Pró-labore tratado como custo do negócio. Esconder distorce diagnóstico.
- Recomendação ordenada por (impacto financeiro × velocidade de implementação).
- Linguagem do empresário. Zero jargão técnico no resumo executivo.

**CONTEXTO:**

*Empresa*
- Razão social ou nome fantasia: [nome]
- Setor / segmento: [comércio / serviços / indústria / saúde / agro / outro]
- Modelo de negócio: [B2B / B2C / misto]
- Tempo de mercado: [anos]

*Faturamento*
- Faturamento últimos 12 meses: [R$]
- Tendência: [crescente / estável / decrescente]
- Sazonalidade: [sim/não — quando]

*Regime tributário*
- Regime atual: [Simples Nacional / Lucro Presumido / Lucro Real]
- Tempo no regime: [anos]
- Razão da escolha original: [contador / decisão consciente / não sei]
- Última revisão: [quando — ou "nunca"]

*Estrutura de custos*
- Folha de pagamento: [R$/mês — funcionários CLT]
- Pró-labore dos sócios: [R$/mês — total]
- Custo de mercadoria/serviço (CMV ou CSP): [R$/mês ou %]
- Aluguel + ocupação: [R$/mês]
- Outras despesas fixas: [R$/mês]
- Despesas variáveis: [comissão / frete / embalagem]

*Margem*
- Margem bruta estimada: [%]
- Margem líquida atual: [%]

*Ciclo financeiro (se aplicável)*
- Prazo médio de recebimento: [dias]
- Prazo médio de pagamento: [dias]
- Estoque médio (se aplicável): [dias]

*Sócios*
- Quantos sócios: [N]
- Como retiram dinheiro: [pró-labore / distribuição / misto / saque livre]
- Conflito societário: [sim/não]

*Problemas relatados*
- "Caixa sempre apertado no fim do mês"
- "Faturamento cresce mas dinheiro não aparece"
- "Não sei quanto eu (sócio) ganho de fato"
- "Pago muito imposto"
- "Tenho medo de fiscalização"
- [outros]

*Objetivos do empresário*
- Crescer / abrir filial / contratar / vender o negócio / sucessão / [outro]

---

**PASSO 1 — RESUMO EXECUTIVO (PARA O EMPRESÁRIO LER)**

3-5 linhas direto ao ponto. Em linguagem do empresário, sem termos técnicos:

"Olá [Nome]. Após análise dos dados da [Empresa], identificamos 3 pontos críticos: (1) [maior oportunidade tributária com R$ estimado]; (2) [maior risco financeiro com impacto]; (3) [maior alavanca pra crescimento]. Em conjunto, as ações priorizadas neste documento podem representar [R$ total estimado de impacto] no próximo ano."

**PASSO 2 — DIAGNÓSTICO TRIBUTÁRIO (COMPARATIVO DE REGIME)**

Tabela em R$/ano:

| Componente | Simples Nacional | Lucro Presumido | Lucro Real |
|------------|------------------|------------------|------------|
| Carga tributária total | R$ | R$ | R$ |
| Encargos sobre folha | R$ | R$ | R$ |
| Custo administrativo | R$ | R$ | R$ |
| **TOTAL ANUAL** | **R$** | **R$** | **R$** |
| **Diferença vs atual** | — | R$ +/- | R$ +/- |

### Análise do regime atual
- Por que está nesse regime: [análise]
- O que está sendo bem aproveitado: [pontos positivos]
- O que está sendo desperdiçado: [pontos negativos com R$]

### Recomendação tributária
- Manter regime atual ou migrar?
- Se migrar: quando (próxima janela legal) + impacto estimado em R$
- Riscos da migração: [o que pode dar errado]

**PASSO 3 — DIAGNÓSTICO ESTRUTURAL (DRE GERENCIAL)**

DRE em formato leitura-rápida:

```
RECEITA BRUTA mensal:        R$ X (100%)
(-) Impostos sobre receita:  R$ Y (Z%)
(=) RECEITA LÍQUIDA:         R$ A (B%)
(-) Custos diretos (CMV/CSP): R$ C (D%)
(=) MARGEM BRUTA:            R$ E (F%) ← seu poder de gerar valor
(-) Despesas operacionais:   R$ G (H%) ← onde o dinheiro vaza
(-) Pró-labore sócios:       R$ I (J%) ← custo real do trabalho
(=) RESULTADO LÍQUIDO:       R$ K (L%) ← o que sobra de fato
```

### Pontos de atenção
- Margem bruta vs benchmark do setor: [análise]
- Despesas operacionais vs receita: [se está crescendo desproporcionalmente]
- Pró-labore vs realidade do trabalho: [está abaixo do mercado? acima?]
- Resultado líquido: [saudável / no limite / negativo]

### Comparação com referências do setor
| Indicador | Sua empresa | Referência setor | Status |
|-----------|-------------|-------------------|--------|
| Margem bruta | X% | Y-Z% | ✅/⚠️/🔴 |
| Margem operacional | X% | Y-Z% | ✅/⚠️/🔴 |
| Custo de folha sobre receita | X% | Y-Z% | ✅/⚠️/🔴 |
| Pró-labore sobre receita | X% | Y-Z% | ✅/⚠️/🔴 |
| Margem líquida final | X% | Y-Z% | ✅/⚠️/🔴 |

**PASSO 4 — DIAGNÓSTICO DE CAIXA (CICLO FINANCEIRO)**

Cálculo do ciclo:
```
Prazo médio recebimento (PMR):    X dias
+ Prazo médio estoque (PME):      Y dias (se aplicável)
- Prazo médio pagamento (PMP):    Z dias
= CICLO FINANCEIRO:               W dias
```

### O que isso significa em R$
"Sua empresa precisa financiar W dias de operação. Isso significa que pra cada R$1 de venda, você precisa ter R$X disponível em capital de giro antes de receber. No volume atual, isso representa R$Y de capital de giro mínimo."

### Pontos críticos
- Capital de giro disponível vs necessário: [folga / aperto / negativo]
- Dependência de antecipação de recebíveis: [%]
- Custo financeiro mensal (juros de antecipação, capital de giro): [R$/mês]

**PASSO 5 — DIAGNÓSTICO ESTRATÉGICO**

### Pró-labore
- Valor atual: [R$]
- Valor adequado considerando função e responsabilidade: [R$]
- Diferença: [R$ — pra mais ou pra menos]
- Implicação tributária: [INSS, IR sobre pró-labore vs distribuição]

### Distribuição de lucros
- Está sendo feita formalmente: [sim/não]
- Volume típico: [R$]
- Conformidade fiscal: [tem ata, balanço aprovado, etc.]

### Sucessão e proteção
- Empresa tem holding ou estrutura de proteção: [sim/não]
- Acordo de sócios: [tem/não]
- Riscos identificados: [responsabilidade pessoal por dívida tributária, herança, separação]

### Crescimento
- Capacidade tributária pra crescer: [próximo limite]
- Estrutura societária comporta sócio novo / investidor: [análise]

**PASSO 6 — TOP 5 PROBLEMAS PRIORIZADOS**

Tabela:

| # | Problema | Causa | Impacto/ano | Prazo de correção |
|---|----------|-------|-------------|---------------------|
| 1 | [maior dor] | [origem] | R$ [valor] | [imediato / 30 / 90 dias] |
| 2 | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... |

Critério de priorização: (impacto financeiro × velocidade de correção) ÷ esforço de implementação.

**PASSO 7 — PLANO DE AÇÃO 30/60/90 DIAS**

### Próximos 30 dias (quick wins)
- Ações de baixo esforço, alto impacto
- O que pode ser feito sem mudar estrutura
- Exemplos: ajustar pró-labore, regularizar distribuição, organizar caixa

### 30-60 dias (estruturação)
- Mudanças que exigem planejamento
- Exemplos: análise detalhada de regime, implementação de DRE mensal, revisão de contratos

### 60-90 dias (estratégico)
- Mudanças estruturais
- Exemplos: migração de regime, criação de holding, planejamento sucessório

**PASSO 8 — RESUMO FINANCEIRO DO IMPACTO POTENCIAL**

```
ECONOMIA ANUAL POTENCIAL:

Tributária (mudança de regime):       R$ X
Otimização de pró-labore:              R$ Y
Redução de custos identificados:       R$ Z
Capital de giro liberado:              R$ W
Outros:                                R$ V
                                      ──────────
TOTAL DE IMPACTO ANUAL:                R$ T

Investimento estimado pra capturar:    R$ I (consultoria + implementação)

ROI no primeiro ano:                   T÷I = X×
```

**PASSO 9 — APRESENTAÇÃO PRO CLIENTE (5 min)**

Roteiro de apresentação:

**Min 0-1: O contexto**
"Analisei os dados da [Empresa]. Antes de entrar em recomendações, queria mostrar 3 coisas que talvez você não esteja vendo no dia a dia."

**Min 1-2: A maior oportunidade**
"A primeira é tributária: vocês podem estar pagando R$X a mais por ano de imposto por causa do regime atual. [Explicar em 30 segundos por quê]."

**Min 2-3: O risco escondido**
"A segunda é estrutural: [pró-labore irregular / custos crescendo acima da receita / ciclo de caixa apertado]. Em 12 meses isso vira [problema concreto]."

**Min 3-4: A alavanca de crescimento**
"A terceira é estratégica: [oportunidade de crescimento / proteção / sucessão]. O timing pra agir é [janela]."

**Min 4-5: O caminho**
"Se quiser endereçar isso, faria assim: nos primeiros 30 dias [quick wins]. Em 60 dias [estruturação]. Em 90 dias [estratégico]. Total de impacto estimado: R$T no ano. Faz sentido conversarmos sobre como começar?"

```

## Os 4 erros que matam diagnóstico

**1. Linguagem técnica.** "Carga tributária no Anexo III x Anexo V do Simples". Empresário desliga. Linguagem dele é "imposto a mais" e "imposto a menos".

**2. Análise sem comparativo.** "Vocês estão no Simples." Tá. E daí? Comparativo SIMULA o cenário alternativo: "Se estivesse no Presumido pagaria R$X/ano a mais ou a menos."

**3. Ignorar pró-labore.** Tratar pró-labore como "extração de sócio" distorce DRE. Pró-labore é custo do trabalho do sócio. Se sócio trabalha 60h/semana, custo real está embutido aí. Esconder isso mente sobre o lucro real.

**4. Recomendação sem prazo.** "Considerem migrar de regime" não move ninguém. "Próxima janela é janeiro/X — decisão até dia Y" cria movimento.

## Quando o diagnóstico revela problema grave

Se identificar:
- Regime claramente errado com impacto > R$50k/ano
- Distribuição de lucro irregular (risco fiscal pessoal)
- Insolvência iminente (caixa < 30 dias)
- Risco trabalhista grave (PJs sem caracterização correta)
- Sucessão sem plano em empresa com 1 sócio doente/idoso

Diagnóstico vira ALERTA, não recomendação. Cliente precisa ver gravidade — e priorizar antes de qualquer outra coisa.

## Quando o diagnóstico é "tudo bem"

Eventualmente o diagnóstico mostra que a empresa está saudável e bem assessorada. Não force problema onde não tem.

Saída honesta: "Análise indica que estão em situação saudável. Pontos pequenos de ajuste em [item], mas estrutura geral está bem. Próximo grande passo é [crescimento / sucessão / proteção], não correção."

(Cliente que ouve isso confia. Próxima vez que tiver dúvida, vem pra você.)

## Sinais de diagnóstico bem feito

- Cliente pergunta sobre 1-2 pontos específicos (sinal de leitura atenta)
- Cliente quer apresentar pro sócio
- Cliente diz "não sabia disso"
- Cliente pergunta "como vocês fariam isso?"
- Em 7 dias, retorna pra contratar implementação

## Sinais de diagnóstico mal feito

- Cliente confuso com terminologia
- Cliente pergunta "isso é problema?"
- Cliente foca em ponto trivial (sinal de que pontos importantes não chamaram atenção)
- Sem retorno em 14 dias (não criou urgência)

---
**Camada adicional — diagnóstico recorrente:** Pra clientes ATIVOS, faça diagnóstico anual (janeiro ou fechamento do exercício). Mostra evolução, identifica novos pontos, justifica reajuste. Cliente que recebe diagnóstico todo ano percebe valor consultivo continuado, não vira cliente comoditizado. Diagnóstico anual também é o melhor momento pra propor upgrade de tier ou serviço adicional.
