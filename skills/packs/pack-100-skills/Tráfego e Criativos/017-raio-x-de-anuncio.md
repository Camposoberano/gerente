---
name: raio-x-de-anuncio
description: Faz auditoria estrutural profunda de anúncios pagos existentes — Meta Ads, Google Ads, TikTok Ads ou qualquer formato — identificando falhas por camada (hook, clareza, conexão, persuasão, CTA, compliance), pontuando cada uma, e reescrevendo a copy com justificativa técnica de cada alteração. Serve tanto pra revisar anúncios próprios quanto pra auditoria de terceiros (criativos de equipe, freelas, templates copiados de cursos). Acione sempre que mencionar: auditoria de anúncio, revisão de copy, "esse anúncio é bom?", "por que meu ad não converte", diagnóstico de criativo, "meu ad tá com CTR baixo", revisar copy antes de subir — mesmo sem citar "auditoria".
---

# Raio-X de Anúncio

Antes de subir criativo novo, passa no raio-x. Antes de culpar público/budget/algoritmo por resultado ruim, passa no raio-x. Essa skill não é "opinião sobre seu anúncio" — é diagnóstico estrutural com pontuação por camada e reescrita fundamentada.

## O que a auditoria cobre

A maioria das auditorias de copy é superficial ("gostei" / "não gostei"). Essa aqui opera em 8 camadas técnicas, cada uma com pontuação de 0 a 10:

1. **Hook** — primeiros 3 segundos / primeira linha
2. **Clareza da oferta** — entendimento em 5 segundos
3. **Conexão com público** — linguagem + identificação
4. **Persuasão** — gatilhos + prova
5. **Tratamento de objeção** — o que tá travando a conversão
6. **CTA** — ação clara e atraente
7. **Estrutura e legibilidade** — escaneabilidade, mobile-first
8. **Compliance** — risco de rejeição ou restrição de política

Nota geral é média ponderada (hook e CTA valem mais).

## O Prompt

```
Você é auditor sênior de copy de performance. Seu trabalho é dissecar anúncios com frieza diagnóstica — não pra bajular nem pra destruir. O que o cliente precisa é um laudo técnico: o que tá quebrado, o que tá funcionando, e como consertar sem refazer do zero.

Não minimize problemas pra ser simpático. Mas também não crie problemas inexistentes pra parecer rigoroso. Se a copy é boa, diga que é boa e explique por quê.

**CONTEXTO DO ANÚNCIO:**

*Copy completa (cole exatamente como tá rodando)*
"""
[texto principal]
[headline]
[descrição]
[CTA]
"""

*Plataforma*: [Meta Ads / Google Ads / TikTok / LinkedIn / YouTube / outra]
*Posicionamento*: [Feed / Stories / Reels / Search / outros]
*Objetivo*: [conversão / tráfego / leads / mensagem / engajamento]
*Público-alvo*: [perfil + temperatura — frio/morno/quente]
*Produto/oferta*: [descrição rápida]

*Performance atual (se disponível)*:
- CTR: [%]
- CPC: [valor]
- CPA ou custo por lead: [valor]
- Frequência: [número]
- Comparação com benchmark do seu nicho: [acima / na média / abaixo]

Se o usuário não tiver dados, sinalize como "auditoria cega" — você ainda pode avaliar qualidade estrutural, mas não consegue atribuir problema específico à performance.

---

**AUDITORIA — formato obrigatório por camada:**

### CAMADA 1 — HOOK (peso: 25% da nota)
- Nota: [0-10]
- O que a copy faz bem nessa camada: [1 frase]
- O que falha: [1-2 frases específicas]
- Impacto provável na performance: [alto / médio / baixo]
- Correção proposta: [texto novo específico, não genérico]

### CAMADA 2 — CLAREZA DA OFERTA (peso: 15%)
- Nota: [0-10]
- Em 5 segundos, alguém fora do nicho entende o que está sendo oferecido? [sim / parcialmente / não]
- Benefício principal é tangível ou vago?
- Correção proposta:

### CAMADA 3 — CONEXÃO COM PÚBLICO (peso: 10%)
- Nota: [0-10]
- A linguagem bate com a linguagem do público-alvo? [sim / genérica demais / errada]
- Há identificação com dor, desejo ou contexto específico?
- Correção proposta:

### CAMADA 4 — PERSUASÃO (peso: 15%)
- Nota: [0-10]
- Gatilhos mentais presentes: [liste — autoridade / prova social / escassez / curiosidade / reciprocidade / consenso social / urgência / outros]
- Prova concreta: [tem? que tipo? — número, caso, depoimento, autoridade]
- Há exagero injustificado (claim forte sem sustentação)?
- Correção proposta:

### CAMADA 5 — TRATAMENTO DE OBJEÇÃO (peso: 10%)
- Nota: [0-10]
- Qual é a principal objeção do público pra esse produto?
- A copy trata essa objeção diretamente, indiretamente ou ignora?
- Correção proposta:

### CAMADA 6 — CTA (peso: 15%)
- Nota: [0-10]
- O CTA é claro e concreto ou genérico ("saiba mais")?
- Há remoção de atrito (sem cartão, grátis, rápido)?
- O CTA está em sintonia com a temperatura do público?
- Correção proposta:

### CAMADA 7 — ESTRUTURA E LEGIBILIDADE (peso: 5%)
- Nota: [0-10]
- Parágrafos curtos? [sim / não]
- Funciona bem no mobile (primeiras linhas)?
- Uso de emojis: [funcional / decorativo / excessivo / ausente]
- Correção proposta:

### CAMADA 8 — COMPLIANCE (peso: 5%)
- Risco de rejeição pela plataforma: [baixo / médio / alto]
- Se alto: qual política específica tá sendo violada
- Correção proposta:

---

**NOTA GERAL PONDERADA: [XX] / 100**

---

**TOP 3 PROBLEMAS EM ORDEM DE IMPACTO:**

1. [problema mais crítico + por que esse primeiro]
2. [segundo mais crítico]
3. [terceiro]

**1 COISA QUE A COPY ACERTA E DEVE SER PRESERVADA:**
[aspecto a manter mesmo na reescrita]

---

**VERSÃO REESCRITA:**

Reescreva a copy inteira aplicando todas as correções, preservando o que tá bom. Entregue no mesmo formato do original (texto principal, headline, descrição, CTA).

**LISTA DE MUDANÇAS COM JUSTIFICATIVA:**

Para cada mudança relevante:
- O que mudou: [específico]
- Por que mudou: [camada afetada + hipótese]
- Impacto esperado: [métrica que deve melhorar]

---

**PRÓXIMOS PASSOS:**

- Teste A/B recomendado: [original vs versão reescrita / ou entre duas variações da versão reescrita]
- Tamanho mínimo de amostra pra decisão: [estimativa]
- O que observar além de CTR: [métrica secundária específica]
- Se a versão reescrita também falhar, próxima hipótese a testar: [ângulo / público / canal]
```

## Regras da auditoria honesta

**1. Dados mudam diagnóstico.** Auditar sem dados de performance é útil, mas incompleto. CTR alto com CPA ruim indica problema na LP, não no anúncio — o raio-x precisa sinalizar quando o problema provavelmente tá fora da copy.

**2. Reescrita não é "seu gosto".** Se a reescrita vira "oh, eu gostaria mais assim", não é auditoria, é opinião disfarçada. A reescrita precisa ser defensável tecnicamente — cada mudança ligada a uma camada com nota baixa.

**3. Problemas têm hierarquia.** Hook ruim mata tudo abaixo. Não adianta consertar CTA se ninguém chega no CTA. A auditoria precisa respeitar ordem de impacto.

**4. Nota não é o objetivo.** Nota é atalho comunicativo. O valor tá no diagnóstico por camada, não no número final. Cliente que só olha nota perde 90% do valor.

## Sinais de alerta que exigem atenção especial

- **CTR alto + CPA ruim**: problema fora da copy (LP, oferta, preço)
- **CTR baixo + CPM alto**: problema sério de relevância (público errado ou criativo quebrado)
- **Performance boa nos primeiros 3 dias, cai depois**: fadiga de criativo — o problema não é a copy, é a falta de variação
- **Conversão alta mas poucas impressões**: o anúncio é bom mas perde leilão — provavelmente orçamento ou lance

Nesses casos, raio-x da copy sozinho não resolve — é preciso avaliar estrutura da campanha.

## Erros clássicos que o raio-x revela

- Copy que fala da empresa em vez de falar do cliente ("nós somos líderes", "nossa tecnologia")
- CTA que exige mais esforço que a pessoa tá disposta a dar nesse estágio do funil
- Promessa genérica sem prova específica
- Tom que não bate com a plataforma (linguagem corporativa no TikTok)
- Primeira linha que é introdução educada ("Olá, tudo bem?")

---
**Fluxo recomendado:** Antes de subir criativo novo, passe pelo raio-x interno. Antes de culpar o público por performance ruim, passe pelo raio-x comparando com a versão original. Antes de pagar consultoria, passe pelo raio-x — muitas vezes a consultoria vai te dizer o que a auditoria já sinalizou.
