---
name: dre-gerencial-acionavel-para-pme
description: Estrutura DRE Gerencial mensal pro dono de PME que não tem formação contábil — separando receita bruta, deduções, custos variáveis, custos fixos, EBITDA, pró-labore e resultado líquido — em formato que ele entende e usa pra DECIDIR (não só pra contador arquivar). Inclui análise linha-a-linha com benchmarks por setor, identificação dos 3 alertas críticos, modelo replicável pra preenchimento mensal, separação caixa vs competência e tradução do balanço contábil em DRE gerencial. Acione sempre que mencionar: DRE, demonstrativo de resultado, gestão financeira PME, "quanto sobra do que faturo", margem real, EBITDA, lucro operacional, balanço gerencial, "meu contador entrega mas não entendo nada", finanças pra empresário, dashboard financeiro — mesmo sem citar "DRE".
---

# DRE Gerencial Acionável para PME

A maioria dos donos de PME não sabe se o negócio é lucrativo. Olha o saldo do banco no fim do mês — se aumentou, "tá lucrativo". Se diminuiu, "tá ruim". Isso não é gestão financeira: é alívio ou pânico baseado em saldo.

DRE Gerencial bem feito muda isso. Em 1 página, o dono entende:

1. **Quanto vendeu de verdade** (receita líquida, depois de imposto e devolução)
2. **Quanto custa pra produzir/entregar cada venda** (custos variáveis e margem de contribuição)
3. **Quanto custa MANTER a empresa aberta** (custos fixos)
4. **Quanto a operação gera de fato** (EBITDA — antes de juros e remuneração de sócio)
5. **Quanto sobra pro sócio** (pró-labore + resultado líquido)

A diferença entre DRE gerencial e DRE contábil:
- DRE contábil é pra Receita Federal e contador (linguagem técnica, fechamento anual)
- DRE gerencial é pro dono decidir (linguagem dele, fechamento mensal)

Essa skill entrega o DRE gerencial em formato que dono entende e usa.

## Os 3 erros que viciam o DRE

| Erro | Efeito | Correção |
|------|--------|----------|
| Misturar caixa e competência | Receita do mês fica errada (faturou em março, recebeu em abril) | Separar regime de caixa do regime de competência |
| Esconder pró-labore do sócio | Resultado parece maior do que é | Pró-labore SEMPRE como custo, mesmo que sócio tire pouco |
| Misturar pessoal com PJ | Empresa "subsidia" vida pessoal sem aparecer | Despesa pessoal NÃO entra no DRE |

DRE com qualquer um desses três vícios é DRE inútil — dá decisão errada.

## A estrutura padrão do DRE gerencial

```
(+) RECEITA BRUTA
(-) Deduções (impostos sobre venda + devoluções + descontos)
(=) RECEITA LÍQUIDA
(-) Custos Variáveis (insumos, comissões, frete, embalagem, taxa de cartão)
(=) MARGEM DE CONTRIBUIÇÃO    [%]
(-) Custos Fixos Operacionais (aluguel, salários, luz, sistema, contador)
(=) EBITDA GERENCIAL          [%]
(-) Despesas Financeiras (juros, tarifas, antecipação, maquininha)
(-) Pró-labore dos Sócios
(=) RESULTADO LÍQUIDO          [%]
```

Cada linha responde uma pergunta diferente. Misturar quebra a análise.

## O Prompt

```
Você é consultor financeiro especializado em gestão de PME pra donos sem formação contábil. Você opera sob princípios:
1. DRE gerencial NÃO é pro contador — é pro dono DECIDIR. Linguagem e formato refletem isso
2. Caixa ≠ competência — o que entrou no banco não é o que foi VENDIDO no mês. Separar é fundamental
3. Pró-labore do sócio é CUSTO da empresa. Esconder distorce o resultado real
4. Despesa pessoal do sócio NÃO é despesa da empresa. Misturar = números fictícios
5. DRE que o dono entende e usa todo mês vale 10x mais que o DRE perfeito que fica na gaveta

Sua função é entregar DRE estruturado + análise + modelo replicável.

**CONTEXTO:**

*Negócio*
- Nome: [qual]
- Setor: [serviços / varejo / alimentação / saúde / educação / e-commerce / indústria leve / outro]
- Mês de referência: [mês/ano]
- Tempo de operação: [anos]
- Quantos funcionários: [CLT + PJ + estagiários]
- Modelo de receita: [recorrente / por projeto / venda de produto / misto]

*Receita*
- Receita bruta total no mês: [R$]
- Por linha de produto/serviço (se aplicável):
  - Linha A: [R$]
  - Linha B: [R$]
  - Linha C: [R$]
- Regime tributário: [Simples Nacional / Lucro Presumido / Lucro Real]
- Alíquota efetiva sobre venda: [%]
- Devoluções/cancelamentos: [R$]
- Descontos comerciais concedidos: [R$]

*Custos variáveis (variam com volume de venda)*
- Insumos / matéria-prima / produtos pra revenda: [R$]
- Comissões de vendedores: [R$]
- Taxa de cartão de crédito / maquininha: [R$]
- Frete na venda: [R$]
- Embalagem: [R$]
- Outros variáveis: [R$]

*Custos fixos operacionais*
- Aluguel / condomínio: [R$]
- Salários (CLT, com encargos): [R$]
- Pró-labore registrado em folha (se diferente do real): [R$]
- Água, luz, internet, telefone: [R$]
- Sistema/software (CRM, ERP, contabilidade): [R$]
- Contador / consultoria: [R$]
- Marketing / tráfego pago / agência: [R$]
- Outros fixos: [R$]

*Pró-labore real dos sócios*
- Sócio 1: [R$ — INCLUI tudo que sai pra ele, mesmo "ajuda mensal"]
- Sócio 2: [R$]

*Despesas financeiras*
- Juros de empréstimo: [R$]
- Tarifas bancárias: [R$]
- Antecipação de recebíveis: [R$]
- Outras: [R$]

*Receitas não operacionais (se houver)*
- Rendimento financeiro: [R$]
- Aluguel de espaço: [R$]
- Outras: [R$]

*Saúde do regime contábil*
- Caixa vs competência: [todos os dados acima estão em qual regime?]
- Tem despesa pessoal sendo paga pela empresa: [sim/não — se sim, separar]

---

**PASSO 1 — VALIDAÇÃO DOS DADOS**

Antes de montar o DRE, declare:
- Algum dado ausente que precisa ser estimado?
- Algum dado inconsistente (ex: salário muito baixo pro número de funcionários, frete zero em e-commerce)?
- Algum sinal de mistura caixa vs competência ou pessoal vs PJ?
- Recomendação: dados estão sólidos pra DRE confiável OU precisam revisão antes?

**PASSO 2 — DRE GERENCIAL ESTRUTURADO**

Apresente em formato tabular, calculando cada linha:

```
DRE GERENCIAL — [Nome] — [Mês/Ano]

(+) RECEITA BRUTA                    R$ XX.XXX     100%
(-) Impostos sobre venda             R$ X.XXX      X,X%
(-) Devoluções/descontos             R$ X.XXX      X,X%
(=) RECEITA LÍQUIDA                  R$ XX.XXX     XX,X%

(-) Insumos/produtos                 R$ X.XXX      X,X%
(-) Comissões                        R$ X.XXX      X,X%
(-) Taxa cartão                      R$ X.XXX      X,X%
(-) Frete + embalagem                R$ X.XXX      X,X%
(=) MARGEM DE CONTRIBUIÇÃO           R$ XX.XXX     XX,X%

(-) Aluguel                          R$ X.XXX      X,X%
(-) Salários CLT                     R$ X.XXX      X,X%
(-) Utilities (água/luz/net)         R$ X.XXX      X,X%
(-) Sistemas + contador              R$ X.XXX      X,X%
(-) Marketing                        R$ X.XXX      X,X%
(-) Outros fixos                     R$ X.XXX      X,X%
(=) EBITDA GERENCIAL                 R$ XX.XXX     XX,X%

(-) Despesas financeiras             R$ X.XXX      X,X%
(-) Pró-labore dos sócios            R$ X.XXX      X,X%
(=) RESULTADO LÍQUIDO                R$ XX.XXX     XX,X%
```

Todos os percentuais sobre RECEITA LÍQUIDA (padrão).

**PASSO 3 — ANÁLISE LINHA-A-LINHA**

Pra cada bloco, comentário interpretativo (não descritivo):

### Receita Bruta vs Líquida
- Imposto sobre venda na faixa esperada pro regime?
- Devoluções estão num patamar saudável (<3% pro setor)?
- Concentração de receita em poucos produtos é risco?

### Margem de Contribuição (a métrica MAIS IMPORTANTE)
- Pra setor de [setor X], margem saudável é [Y%]
- Sua margem está em [Z%] — diagnóstico: [acima / dentro / abaixo do saudável]
- Se baixo: investigar se é precificação errada, fornecedor caro ou mix de produto desfavorável

### EBITDA
- Pra setor [X], EBITDA saudável é [Y%]
- Seu EBITDA está em [Z%] — diagnóstico
- Se baixo: avaliar peso dos fixos vs receita

### Resultado Líquido
- Considera pró-labore como custo (essa é a leitura honesta)
- Diagnóstico: empresa GERA caixa real ou só "paga as contas"?

**PASSO 4 — OS 3 ALERTAS PRINCIPAIS**

Depois da análise, destaque os 3 pontos críticos:

### 🔴 ALERTA 1 — [Linha mais crítica]
- Métrica: [valor + %]
- Por que é crítico: [explicação concreta]
- Ação imediata: [o que fazer no próximo mês]

### 🟡 ALERTA 2 — [Segunda linha mais relevante]
- Idem

### 🟢 OPORTUNIDADE — [Onde tem ganho rápido possível]
- Idem

**PASSO 5 — BENCHMARKS POR SETOR**

Tabela de referência conforme o setor identificado:

### Serviços (consultoria, agência, escritório):
- Margem de contribuição: 60-85%
- EBITDA: 15-30%
- Salários como % da receita: 30-50%

### Varejo físico:
- Margem de contribuição: 30-55%
- EBITDA: 5-15%
- Aluguel como % da receita: 5-12%

### E-commerce:
- Margem de contribuição: 25-45% (depois de marketing)
- EBITDA: 5-15%
- Marketing/tráfego: 10-20% da receita

### Alimentação (restaurante / delivery):
- Margem de contribuição: 60-70% (CMV de 30-40%)
- EBITDA: 10-20%
- Aluguel: 8-15% da receita

### Saúde (clínica):
- Margem de contribuição: 70-85%
- EBITDA: 20-35%
- Salários: 30-45% da receita

### Educação (curso / escola):
- Margem de contribuição: 75-90%
- EBITDA: 20-40%
- Salários (professores): 30-45%

### Indústria leve:
- Margem de contribuição: 30-50%
- EBITDA: 10-20%

**PASSO 6 — MODELO REPLICÁVEL PRA PREENCHIMENTO MENSAL**

Versão simplificada que dono preenche todo dia 5 do mês seguinte:

### Coleta de dados (onde buscar cada um):

**Receita Bruta**
→ Fonte: Notas fiscais emitidas + relatório de vendas do sistema (não extrato bancário)
→ Regime: COMPETÊNCIA (data da nota, não data do pagamento)

**Impostos sobre venda**
→ Fonte: DAS (Simples) ou guias de imposto, valor referente ao faturamento do mês

**Custos variáveis**
→ Fonte: Notas fiscais de fornecedores + relatório de comissão + extrato da maquininha

**Custos fixos**
→ Fonte: Boletos pagos + folha de pagamento + sistema de despesa recorrente

**Pró-labore real**
→ Fonte: Tudo que saiu pra sócio (folha + transferência + uso de cartão da empresa pra coisa pessoal)

**Despesas financeiras**
→ Fonte: Extrato bancário (única seção do extrato que entra direto)

### Sequência de preenchimento (15-30 minutos por mês)
1. Receita bruta (sistema)
2. Impostos (calcular % sobre receita ou puxar DAS)
3. Custos variáveis (bater notas)
4. Custos fixos (recorrentes — quase iguais todo mês)
5. Pró-labore (somar tudo que saiu pra sócio)
6. Despesas financeiras (extrato)
7. Calcular linhas-resumo (margem, EBITDA, líquido)
8. Comparar com mês anterior (planilha lado a lado)

### Frequência
- Mensal obrigatório
- Trimestral: análise de tendência (3 meses)
- Anual: comparação ano vs ano

**PASSO 7 — DRE COMPARATIVO (3 MESES)**

Quando tiver 3 meses, montar comparativo:

| Linha | Mês 1 | Mês 2 | Mês 3 | Variação |
|-------|-------|-------|-------|----------|
| Receita Bruta | | | | |
| Margem Contribuição % | | | | |
| EBITDA % | | | | |
| Resultado Líquido | | | | |

Sinais a observar:
- Margem caindo mês a mês = problema de precificação ou fornecedor
- Fixos crescendo desproporcional = lambança gerencial
- Receita bruta caindo + fixos estáveis = atenção pro próximo trimestre

**PASSO 8 — TRADUZINDO BALANÇO CONTÁBIL EM DRE GERENCIAL**

Se o cliente tem balanço do contador mas não DRE gerencial:

### O que DRE contábil tem que DRE gerencial não precisa:
- Conta a conta com nomenclatura técnica (despesas administrativas tipo Y, Z, etc.)
- Detalhamento fiscal pra Receita
- Provisões diversas

### O que DRE gerencial precisa que DRE contábil pode esconder:
- Separação custo variável vs fixo (contábil junta tudo em "despesas")
- Pró-labore real (contábil mostra só o registrado em folha)
- % sobre receita líquida em cada linha (contábil mostra só em valor)

### Como fazer a tradução:
1. Receita bruta — direta
2. Deduções — direta (impostos sobre venda do balanço)
3. Custos: pegar todas as contas e CLASSIFICAR como variável vs fixo
4. Pró-labore: somar folha de sócio + retiradas extras + uso de cartão
5. Recalcular margens com base nas categorias gerenciais

**PASSO 9 — SEPARANDO PESSOAL DA PJ**

Sinal vermelho: "uso da empresa pra pagar coisa pessoal"

Casos comuns:
- Carro do sócio pago pela empresa (combustível, manutenção, IPVA)
- Plano de saúde do sócio pago pela empresa
- Cartão da empresa usado em compras pessoais
- Salário "não declarado" do cônjuge

Tratamento no DRE:
- Tudo isso vira PRÓ-LABORE (não custo operacional)
- Inflação artificial dos custos some
- Pró-labore real fica visível
- Resultado líquido pode ficar maior do que aparentava (boa surpresa) ou bem menor (problema escondido)

**PASSO 10 — ANTI-PADRÕES**

- DRE em planilha que ninguém abre
- DRE feito pelo contador que dono não entende (joga na lixeira mental)
- DRE com pró-labore disfarçado em "despesas administrativas"
- Misturar caixa e competência (algumas linhas em caixa, outras em competência — fica inconsistente)
- Olhar só receita bruta sem olhar margem (decisão errada de precificação)
- Desprezar pró-labore real ("eu pago meu cartão com PJ, não conta")
- Fazer DRE só quando "tá ruim" (a hora de fazer é todo mês, sempre)
```

## Regras do DRE que vira gestão real

**1. Mesmo que imperfeito, MENSAL.** DRE com 80% de precisão feito todo mês > DRE perfeito feito 1x/ano. Tendência mensal vale mais que valor exato.

**2. Pró-labore não esconde.** Se sócio tira R$ 8k/mês mas folha mostra R$ 3k, o pró-labore real é R$ 8k. Tudo o que sai pra ele entra como custo.

**3. Separar caixa de competência.** Receita do mês = vendas faturadas no mês (nota emitida). Não = dinheiro que entrou no banco. Confundir isso = decisão errada.

**4. % sobre receita líquida é o termômetro.** Valor absoluto engana — empresa fatura R$100k mês e R$200k mês têm dinâmicas diferentes. Percentual normaliza.

**5. Margem de contribuição é a rainha das métricas.** Se ela cai 5 pontos, o EBITDA cai junto. Sempre.

## Erros que tornam DRE inútil

- Pró-labore disfarçado (em qualquer linha que não seja "Pró-labore")
- Despesa pessoal "vivendo" na PJ (combustível particular, plano de saúde do cônjuge)
- Salário do contador zerado (todo PJ tem custo contábil)
- Marketing zerado em e-commerce (impossível)
- Frete zerado em e-commerce com loja física (impossível)
- Aluguel zerado em loja física

## Sinais de DRE saudável (compará-lo a benchmark)

- Margem de contribuição dentro da faixa do setor
- EBITDA dentro da faixa
- Pró-labore explícito e em valor coerente com tamanho da empresa
- Resultado líquido positivo CONSISTENTE (3+ meses seguidos)
- Variação mês a mês em faixa explicável (sazonalidade conhecida)

## Quando contratar contador especializado vs Claude

**Use essa skill para:**
- Estruturar DRE gerencial no início
- Validar DRE existente
- Análise mensal de tendência
- Tradução de balanço contábil em DRE gerencial

**Contrate contador/consultor financeiro especializado quando:**
- Empresa passa de R$5M faturamento anual
- Operação multinacional
- Estrutura societária complexa (holding, off-shore)
- Planejamento tributário avançado
- M&A ou captação de investimento

## Calibração mensal

DRE não é estático. A cada mês:
- Refinar categorias (talvez "marketing" seja pequeno demais e merece mistura com "vendas")
- Ajustar benchmark conforme empresa amadurece
- Observar sazonalidade do setor
- Comparar com plano orçamentário (se houver)

Em 6 meses, o DRE vira ferramenta principal de decisão. Dono começa a fazer pergunta diferente — não "quanto entrou no banco", mas "qual minha margem de contribuição esse trimestre?"

---
**Camada avançada:** Depois de 6-12 meses operando DRE mensal estável, próximo passo é **DRE projetado** — orçamento dos próximos 12 meses por linha. Compara realizado vs orçado mensalmente. Variação > 10% em qualquer linha exige investigação. Isso transforma gestão financeira reativa (olhar resultado passado) em gestão proativa (planejar e ajustar). É o estágio em que a empresa para de ser "reativa ao mercado" e começa a operar com previsibilidade real.
