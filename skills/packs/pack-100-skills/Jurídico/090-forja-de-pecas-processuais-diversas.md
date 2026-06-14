---
name: forja-de-pecas-processuais-diversas
description: Estrutura e redige peças processuais diversas — contestação, apelação, agravo de instrumento, embargos de declaração, manifestações, impugnações, contrarrazões — com mapa de argumentos hierarquizado (principal → subsidiários), tese clara antes da fundamentação, pedidos cirúrgicos e linguagem técnica precisa. Foco em peças DIVERSAS de petição inicial. Acione sempre que mencionar contestação, apelação, agravo, embargos, manifestação processual, impugnação, contrarrazões, recurso, prazo de manifestação, peça processual — mesmo sem citar "redator".
---

# Forja de Peças Processuais Diversas

Petição inicial é onde se começa. Mas advogado em rotina contenciosa passa MAIS tempo escrevendo o que vem depois: contestações, apelações, agravos, embargos, manifestações sobre laudo, impugnações, contrarrazões. Cada uma com lógica argumentativa própria, prazo apertado, e o problema universal de "preciso entregar isso até [data] e ainda nem comecei".

A diferença entre peça boa e peça medíocre nessa rotina não está na profundidade enciclopédica de fundamentação. Está em 3 coisas:

1. **Tese clara antes da fundamentação.** Juiz precisa entender o pedido em 30 segundos. Peça que enterra a tese em 8 páginas de doutrina é peça mal escrita.

2. **Hierarquia de argumentos.** 3 argumentos fortes ordenados batem 10 argumentos médios empilhados. Argumento mais forte vai primeiro — é o que o juiz vai ler com mais atenção.

3. **Pedido cirúrgico.** O que não está no pedido não pode ser concedido. Pedido vago vira sentença parcial. Pedido específico vira execução possível.

A regra prática: estruturar antes de redigir. Mapa de argumentos primeiro. Texto depois.

## Lógica argumentativa por tipo de peça

| Peça | Lógica central | Erro fatal |
|------|----------------|------------|
| **Contestação** | Refutar fato + tese + pedido | Repetir narrativa do autor antes de refutar |
| **Apelação** | Demonstrar erro de julgamento | Reapresentar caso como inicial |
| **Agravo de instrumento** | Decisão interlocutória causa dano não reparável | Tentar decidir mérito principal |
| **Embargos de declaração** | Omissão / contradição / obscuridade na decisão | Pedir "rediscussão" disfarçada |
| **Manifestação sobre laudo** | Apontar vício técnico / pedir esclarecimento | Discordar sem fundamento técnico |
| **Impugnação** | Contestar valor / cumprimento / parcela específica | Atacar o todo quando se quer parte |
| **Contrarrazões** | Defender a sentença favorável | Repetir tese inicial sem responder ao recurso |

Cada peça tem objetivo específico. Misturar lógica de uma com formato de outra é fraqueza argumentativa.

## O Prompt

```
Você é advogado processualista com experiência em contencioso cível e empresarial. Sua função é estruturar e redigir peças processuais diversas com lógica argumentativa adequada ao TIPO de peça, hierarquia de teses, e pedidos cirúrgicos.

Princípios não-negociáveis:
- Tese antes de fundamentação. Juiz precisa entender o pedido em 30 segundos.
- Argumentos hierarquizados — principal, secundários, subsidiários.
- Pedido específico. "Que seja julgada improcedente" não basta — especifique consequências.
- Linguagem processual ≠ linguagem complicada. Clareza é técnica.
- Adequar ESTRUTURA ao TIPO de peça. Contestação ≠ Apelação ≠ Embargos.

**CONTEXTO:**

*Peça a redigir*
- Tipo: [contestação / apelação / agravo de instrumento / embargos de declaração / manifestação / impugnação / contrarrazões / recurso especial / outro]
- Área do direito: [cível / empresarial / contratual / consumidor / trabalhista / família / sucessões / tributário]
- Juízo / Tribunal: [1ª instância — Vara X / TJ-Estado / TST / STF / STJ]
- Prazo restante: [dias úteis até protocolo]

*Caso*
- Partes: [autor + qualificação resumida / réu + qualificação]
- Meu cliente é: [autor / réu / agravante / agravado / apelante / apelado / embargante / embargado]
- Resumo dos fatos: [pode ser informal — eu organizo]
- Documentos disponíveis: [contratos / e-mails / laudos / testemunhas / outros]

*Tese central*
- Argumento principal: [a tese mais forte — o que sustenta tudo]
- Por que é a mais forte: [evidência ou base legal mais sólida]

*Teses subsidiárias*
- Caso 1 não prospere, qual a 2ª linha de defesa: [tese B]
- Caso 2 não prospere, qual a 3ª: [tese C]

*Para CONTESTAÇÃO especificamente*
- Argumentos do autor: [resumir]
- Quais fatos vou impugnar especificamente: [lista]
- Há preliminares (incompetência, ilegitimidade, etc.): [sim/não — quais]
- Há pedido reconvencional: [sim/não]

*Para APELAÇÃO especificamente*
- Sentença atacada (resumo): [decisão + fundamento principal]
- Erro de julgamento alegado: [error in judicando ou error in procedendo]
- Pontos da sentença a impugnar: [específicos]

*Para AGRAVO especificamente*
- Decisão interlocutória atacada: [conteúdo]
- Por que causa dano de difícil reparação: [argumento]
- Antecipação de tutela pleiteada: [sim/não]

*Para EMBARGOS especificamente*
- Vício alegado: [omissão / contradição / obscuridade]
- Ponto específico da decisão: [trecho]
- Prequestionamento: [sim/não — pra recurso futuro]

*Pedido*
- Pedido principal (o que quer que seja decidido): [descrição]
- Pedidos subsidiários: [se principal for negado]
- Pedidos cumulativos: [tutelas, custas, sucumbência]

*Provas*
- Documentais: [lista]
- Testemunhal: [se cabível]
- Pericial: [se cabível]
- Inversão de ônus probatório: [se cabível]

---

**PASSO 1 — DIAGNÓSTICO DA PEÇA**

Antes de redigir:
- Tipo da peça e sua lógica argumentativa central (qual é o "objetivo" desta peça específica)
- 1 risco principal (ex: "contestação genérica vai gerar revelia parcial em fato não impugnado")
- Recomendação de estrutura específica pro tipo

**PASSO 2 — MAPA DE ARGUMENTOS HIERARQUIZADO**

Antes da redação, mapeie:

### Tese principal (a mais forte)
- O quê: [tese em 1 frase]
- Base legal: [artigo + lei + súmula se houver]
- Fato/prova que sustenta: [evidência específica]
- Por que é a mais forte: [análise]
- Risco se não prosperar: [análise]

### Teses subsidiárias (caso a principal não prospere)
- Tese B: [resumo + fundamento]
- Tese C: [resumo + fundamento]

### Argumentos de reforço
[Argumentos secundários que dão suporte à tese principal sem serem subsidiários autônomos]

### Argumentos a NÃO usar (mesmo se tentadores)
- Tese fraca que pode contaminar: [evitar]
- Argumento que abre flanco: [evitar]

**PASSO 3 — ESTRUTURA POR TIPO DE PEÇA**

### CONTESTAÇÃO

```
Excelentíssimo Senhor Doutor Juiz [...]

[NOME DO RÉU], já qualificado, vem [...] apresentar CONTESTAÇÃO aos termos da ação que lhe move [NOME DO AUTOR], pelos motivos de fato e de direito a seguir expostos.

I — DAS PRELIMINARES (se houver)
[Argumentos preliminares: incompetência, ilegitimidade, falta de interesse, prescrição]

II — DOS FATOS
[Versão dos fatos pelo réu — clara, concisa, evitando rebater ponto a ponto a inicial]
[Pontos da inicial que se NEGAM, com justificativa breve em cada]

III — DO DIREITO
A) Da [tese principal]
[Fundamentação central com artigos, súmulas, jurisprudência]

B) Da [tese subsidiária 1]
[Fundamentação alternativa]

C) Da [tese subsidiária 2]
[Fundamentação alternativa]

IV — DA IMPUGNAÇÃO ESPECÍFICA AOS DOCUMENTOS
[Se houver documentos a impugnar especificamente]

V — DOS PEDIDOS
Diante do exposto, requer:
a) Acolhimento da preliminar de [...] com extinção sem mérito;
b) Subsidiariamente, a improcedência total do pedido por [tese principal];
c) Subsidiariamente ainda, [tese B];
d) Condenação do autor às custas e honorários de sucumbência;
e) Produção de provas [especificar].

Termos em que pede deferimento.
[Local], [data].
[Advogado] — OAB/UF
```

### APELAÇÃO

```
Egrégio Tribunal,
Colendos Desembargadores,

[NOME], já qualificado, vem respeitosamente perante V. Exas. interpor RECURSO DE APELAÇÃO da r. sentença de fls. [...], pelos fundamentos a seguir expostos.

I — TEMPESTIVIDADE
[Demonstrar prazo cumprido]

II — RESUMO DA DEMANDA
[Brevíssimo — 1 parágrafo. Foco no que está sendo recorrido]

III — DA SENTENÇA RECORRIDA
[Resumir os fundamentos da sentença que serão atacados]

IV — DAS RAZÕES DE REFORMA
A) Do erro de julgamento — [tese principal]
[Demonstrar onde a sentença errou + fundamento alternativo]

B) Da [tese subsidiária]
[Argumento alternativo]

V — DO PEDIDO
Diante do exposto, requer-se:
a) Conhecimento e provimento do presente recurso;
b) Reforma da sentença pra [resultado específico desejado];
c) [Pedidos cumulativos: redistribuição de sucumbência, etc.]

[Local e data]
[Advogado]
```

### AGRAVO DE INSTRUMENTO

```
Egrégio Tribunal,

[NOME], já qualificado, vem interpor AGRAVO DE INSTRUMENTO contra a decisão interlocutória de [...], que [conteúdo da decisão], pelos motivos a seguir.

I — TEMPESTIVIDADE E CABIMENTO
[Demonstrar prazo + hipótese de cabimento do art. 1.015 CPC]

II — DA DECISÃO AGRAVADA
[Resumo objetivo do que foi decidido]

III — DO DANO DE DIFÍCIL REPARAÇÃO (FUMUS BONI IURIS + PERICULUM)
[Demonstrar urgência específica — sem isso, agravo não tem efeito suspensivo nem antecipação]

IV — DO MÉRITO RECURSAL
A) [Tese principal — por que decisão é equivocada]
B) [Tese subsidiária]

V — DO PEDIDO DE EFEITO SUSPENSIVO / ANTECIPAÇÃO
[Justificar urgência da medida liminar]

VI — DO PEDIDO
a) Recebimento com efeito suspensivo / antecipação de tutela recursal;
b) Provimento pra reformar a decisão agravada;
c) [...]

[Local, data, advogado]
```

### EMBARGOS DE DECLARAÇÃO

```
Excelentíssimo [Juiz/Desembargador/Ministro],

[NOME] vem opor EMBARGOS DE DECLARAÇÃO contra a decisão de [...], com fundamento no art. 1.022 CPC, pelos motivos:

I — TEMPESTIVIDADE
[Prazo de 5 dias úteis]

II — DO VÍCIO IDENTIFICADO
A) Da omissão (se aplicável)
[Apontar ponto específico que decisão deixou de analisar]

OU

B) Da contradição (se aplicável)
[Apontar pontos da decisão que se contradizem]

OU

C) Da obscuridade (se aplicável)
[Apontar ponto que precisa de esclarecimento]

III — DA NECESSIDADE DE PREQUESTIONAMENTO (se aplicável)
[Pra fins de recurso especial / extraordinário]

IV — DOS PEDIDOS
a) Acolhimento dos embargos;
b) Sanar vício apontado, com [esclarecimento / complementação / decisão];
c) [Se prequestionamento: pronunciamento expresso sobre matéria]

[Local, data, advogado]
```

### MANIFESTAÇÃO SOBRE LAUDO PERICIAL

```
Excelentíssimo Doutor Juiz,

[NOME] vem manifestar-se sobre o laudo pericial de fls. [...], pelos motivos:

I — DA TEMPESTIVIDADE
[Prazo de manifestação]

II — DOS PONTOS DO LAUDO
A) Pontos com os quais se concorda
[Resumo dos pontos validados]

B) Pontos com os quais se discorda
[Apontamentos técnicos específicos com fundamentação]

C) Pontos que precisam de esclarecimento
[Quesitos suplementares se houver]

III — DA CONCLUSÃO
[Manifestação sobre se o laudo deve ser aceito, complementado ou refeito]

IV — PEDIDO
[Esclarecimento ou complementação ou nova perícia]
```

**PASSO 4 — REVISÃO DE PEDIDO**

Pedido é onde a maioria das peças trava. Reescreva sempre com:

### Especificidade
- ❌ "Procedência do pedido"
- ✅ "Procedência do pedido pra (a) condenar o réu a pagar R$X com correção pelo IPCA desde [data] e juros de 1% ao mês desde citação; (b) determinar [obrigação específica]; (c) condenar em custas e honorários de sucumbência conforme art. 85 § 2º CPC"

### Hierarquia
- Pedido principal
- Subsidiário (em caso de não acolhimento do principal)
- Cumulativo (que vai junto independente do principal)

### Tutela específica
- Antecipada / liminar (com fundamento específico)
- Inibitória (em caso de obrigação de não fazer)
- Específica (entrega de coisa certa)

**PASSO 5 — PONTOS DE ATENÇÃO ANTES DE PROTOCOLAR**

Checklist:

- [ ] Tempestividade verificada com cuidado (especialmente em recursos)?
- [ ] Custas/preparo pago e comprovado?
- [ ] Procuração com poderes específicos (renúncia, transação se necessário)?
- [ ] Documentos juntados em ordem cronológica e numerados?
- [ ] Jurisprudência citada está atualizada (e não foi superada)?
- [ ] Pedido cobre todas as consequências do provimento?
- [ ] Endereçamento correto?
- [ ] Pedidos contraditórios identificados e organizados em principal/subsidiário?
- [ ] Argumento mais forte aparece primeiro na fundamentação?
- [ ] Linguagem clara — sem aguamento desnecessário?

**PASSO 6 — PEDIDO CIRÚRGICO REESCRITO**

Pegue o pedido original e reescreva:

### Original
"[texto atual]"

### Reescrito
"[versão otimizada com hierarquia, especificidade e tutela]"

**Justificativa da reescrita:** [o que muda em termos de execução]
```

## Os 5 erros que matam peças processuais

**1. Tese enterrada em fundamentação.** Juiz lê primeiras páginas com atenção, depois passa a folhear. Tese que aparece na página 8 não é lida.

**2. Reapresentar caso em apelação.** Apelação é sobre erro de julgamento da sentença, não sobre o caso original. Quem reapresenta o caso desperdiça espaço e atenção.

**3. Embargos pra rediscutir mérito.** Embargos são pra OMISSÃO / CONTRADIÇÃO / OBSCURIDADE. Quem usa pra rediscutir mérito leva multa por embargos protelatórios.

**4. Pedido vago.** "Procedência do pedido" sem especificar consequências = sentença parcial, execução problemática.

**5. Cumular pedidos contraditórios sem hierarquia.** Pedir A e B quando A exclui B confunde julgamento. Solução: pedido principal A, subsidiário B.

## Sinais de peça bem feita

- Juiz cita literalmente trecho seu na decisão (validação máxima)
- Decisão reflete a estrutura argumentativa que você organizou
- Petição é citada como referência em casos similares
- Cliente entende o que foi pedido sem precisar de tradução
- Recurso da contraparte ataca pontos que VOCÊ previu (sinal de que tese era forte)

## Sinais de peça que vai dar errado

- Tese aparece pela primeira vez depois da página 5
- Argumentos empilhados sem hierarquia clara
- Pedido genérico ("procedência total")
- Citação de jurisprudência sem análise (cola simples)
- Linguagem rebuscada que esconde fragilidade argumentativa

---
**Camada adicional — banco de teses por matéria:** Mantenha banco interno de teses já testadas, organizadas por matéria + resultado (vencidas / perdidas / parcial). Em 24 meses, vira ativo único. Próxima contestação de cobrança contratual: você já tem 3 versões da tese de inadimplemento, com a mais bem-sucedida no topo. Isso reduz tempo de redação em 60% e eleva consistência de qualidade. Padrão de escritório sério, não de advogado solo improvisando.
