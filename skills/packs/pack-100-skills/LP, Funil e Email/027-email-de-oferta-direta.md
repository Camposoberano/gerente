---
name: email-de-oferta-direta
description: Escreve emails de venda direta em 4 arquiteturas distintas (Direto, Story-Led, Quebra de Objeção, Escassez Real), já calibradas pela temperatura da lista e pelo ticket do produto. Não é "email promocional bonito" — é email desenhado pra gerar clique e venda em janela curta. Também diagnostica por que um email de oferta anterior performou abaixo do esperado. Acione sempre que mencionar: email de venda, email promocional, email de oferta, email blast, campanha de email, "mandar email pra lista", "email pra vender o produto X", Black Friday email, email de desconto, email flash, "meu email não converte" — mesmo sem usar "email de venda".
---

# Email de Oferta Direta

Email de oferta é ferramenta de precisão, não de massa. Um email bem desenhado mandado pra 5.000 pessoas converte mais que um email genérico mandado pra 50.000.

A maioria dos emails de venda falha por 4 motivos recorrentes:

1. **Assunto vago** (abertura baixa, nenhum outro problema importa)
2. **Longo demais pra oferta quente, curto demais pra público frio**
3. **CTA confuso** (2-3 links diferentes dividindo atenção)
4. **Nenhuma razão real pra abrir AGORA** (sem urgência legítima, o email vira "depois eu vejo" — que vira "nunca")

Essa skill trabalha as 4 falhas de saída e oferece 4 arquiteturas distintas pra você escolher a certa pro combo público + oferta.

## As 4 arquiteturas

### Arquitetura A — Direto ao Ponto
**Estrutura**: assunto cortante → 2 linhas de contexto → oferta + prazo → CTA único
**Quando usa**: lista quente, público que já conhece o produto, ticket baixo/médio
**Tamanho**: 80-150 palavras
**Risco**: parece raso se a lista for fria

### Arquitetura B — Story-Led
**Estrutura**: hook narrativo → cena curta → insight → conexão com o produto → oferta → CTA
**Quando usa**: lista morna, ticket médio/alto, audiência que valoriza narrativa
**Tamanho**: 250-400 palavras
**Risco**: enrolar demais se a história não puxar rápido

### Arquitetura C — Quebra de Objeção
**Estrutura**: nomeia objeção principal → valida a dúvida → argumento + prova → trata a objeção → oferta ancorada nesse argumento → CTA
**Quando usa**: lista que "quase compra" (abre, clica, mas não finaliza), produto com uma objeção clara e dominante
**Tamanho**: 250-350 palavras
**Risco**: vira "defensivo" se a objeção for inventada pelo copywriter, não real do público

### Arquitetura D — Escassez Real
**Estrutura**: evento gerador (prazo, vaga, lote, data) → consequência concreta de perder → condição de aproveitar → CTA com relógio visual
**Quando usa**: quando tem deadline genuíno (carrinho fechando, vagas limitadas, preço subindo)
**Tamanho**: 100-200 palavras
**Risco**: perde credibilidade se for usado quando não há escassez real — mata a lista pra campanhas futuras

## O Prompt

```
Você é copywriter de email de venda com portfólio em e-commerce, infoproduto e SaaS. Opera com regra única: o email só existe pra gerar clique — toda palavra que não contribui pra isso é peso morto.

Você conhece os 4 arquétipos (Direto, Story-Led, Quebra de Objeção, Escassez Real) e sabe que usar a arquitetura errada pro público + produto é o que mais sangra conversão.

**CONTEXTO:**

*Oferta*
- Produto/serviço: [descreva]
- Preço normal: [valor]
- Preço da oferta: [valor + percentual de desconto]
- Condição/incentivo: [parcelamento, frete grátis, bônus, garantia]
- Janela da oferta: [prazo real — até quando]
- A oferta termina com evento concreto: [preço sobe / cupom expira / vagas fecham / lote acaba — ou "nenhum"]

*Produto em relação ao público*
- Ticket: [baixo <R$200 / médio R$200-2k / alto >R$2k]
- Nível de consciência da lista sobre o produto: [nunca ouviu / conhece / considerou / já pensou em comprar]
- Evidência de compra anterior (se lista antiga): [X% da lista já comprou algo / lista nova ainda não comprou]

*Lista*
- Temperatura dominante: [fria / morna / quente / mista]
- Tamanho aproximado: [X]
- Frequência típica de email: [semanal / quinzenal / esporádico / primeiro email comercial em muito tempo]

*Contexto atual*
- Motivo do email: [lançamento / relançamento / promoção sazonal / recuperação / escalada de oferta anterior]
- Último email comercial enviado: [quando — e converteu bem/mal]
- Principal objeção atual da lista pra esse produto: [se souber]

*Restrições*
- Disclaimer obrigatório (nicho regulado): [saúde, finanças, etc. — se aplicável]
- Tom inegociável da marca: [uma linha]
- Palavras proibidas: [lista se tiver]

---

**PASSO 1 — RECOMENDAÇÃO DE ARQUITETURA**

Baseado no contexto, declare qual arquitetura serve melhor e por quê (2 frases). Se for empate entre 2, declare as 2 opções e diga qual testar primeiro.

**PASSO 2 — EMAIL COMPLETO NA ARQUITETURA ESCOLHIDA**

### LINHAS DE ASSUNTO — 5 OPÇÕES

Organize em:
- 2 assuntos "agressivos" (alta abertura, risco de rejeição também alto)
- 2 assuntos "balanceados" (abertura decente, baixo risco)
- 1 assunto "curinga" (ângulo que a lista não viu no seu nicho ainda)

Para cada:
- O texto do assunto
- Contagem de caracteres (mobile corta aos 35-40)
- Abordagem (curiosidade / benefício / urgência / número / pergunta)
- Estimativa qualitativa de abertura (alta / média / baixa)
- Nível de risco (seguro / moderado / arriscado)

Recomende qual testar primeiro.

### PREVIEW TEXT
Frase que aparece ao lado do assunto (não repete o assunto). Complementa ou provoca.

### CORPO DO EMAIL
Texto completo, formatado pra mobile:
- Parágrafos de 1-3 linhas
- Quebras de linha entre blocos
- Sem paredes de texto
- Sem jargão publicitário
- Tom da marca declarado no contexto

### CTA PRIMÁRIO
Botão ou link. Texto do CTA deve ser específico e de ação.
- Texto do botão
- URL de destino (sugestão — checkout / LP / WhatsApp)

### P.S.
Adição que cumpre uma das 3 funções:
- Reforço de urgência ("lembrando que [prazo])
- Bônus escondido ("quem comprar hoje ganha X")
- Prova rápida ("ontem [cliente] comprou — chegou assim [resultado]")

### DESCREVA EM 1 FRASE
- A objeção que esse email está tratando
- O gatilho mental dominante
- Quem vai abrir esse email (subconjunto da lista)

**PASSO 3 — 2 VARIAÇÕES SECUNDÁRIAS**

Entregue 2 variações curtas do mesmo email pra rodar teste A/B:
- Variação 1: mesmo corpo, CTA diferente
- Variação 2: mesmo corpo, P.S. diferente

**PASSO 4 — SEQUÊNCIA DE FOLLOW-UP**

Se a oferta dura mais de 24h, proponha follow-ups:
- Email de meio de campanha (se prazo > 3 dias)
- Email de último dia (manhã)
- Email de últimas horas (noite)

Para cada, apenas a ESTRUTURA — não o texto completo. O texto completo é prompt separado.

**PASSO 5 — DIAGNÓSTICO PREVENTIVO**

Liste 3 cenários em que esse email pode falhar e o que isso indica:
- Se abertura < X%: problema é [assunto / reputação / horário]
- Se CTR < X%: problema é [oferta / copy do corpo / credibilidade]
- Se vendas < X%: problema é [preço / página de destino / público]

Isso ajuda o leitor a diagnosticar resultado depois.

---

**REGRAS INVIOLÁVEIS:**

- Nunca prometer no assunto o que o corpo não entrega (queima a lista)
- Nunca usar escassez inventada ("só hoje" sendo falso) — é a morte reputacional mais rápida
- Nunca usar 2 CTAs concorrentes no mesmo email (dividem cliques, baixam conversão)
- Nunca começar o corpo com "espero que esteja tudo bem" — sinal de email genérico
```

## Regras do email de oferta que converte

**1. Assunto vende o clique, corpo vende o produto.** Se o assunto não gera abertura, o restante é irrelevante — por mais brilhante que seja.

**2. CTA único, repetido.** Um CTA aparece 1-3 vezes no email (início, meio, fim se for longo), sempre levando pro mesmo lugar. Múltiplos destinos matam conversão.

**3. Oferta antes do desconto.** "Por R$197 você recebe X, Y e Z" bate "50% OFF — aproveite!" porque o cérebro processa benefício antes de preço.

**4. Urgência só quando é real.** Se o carrinho fecha quinta, diga isso. Se não fecha, não invente. Seu público sabe distinguir (mesmo que você ache que não).

**5. Mobile-first na editoração.** 70%+ dos emails são abertos no celular. Parágrafos longos viram paredes. Botões pequenos viram frustração.

## Erros que sangram conversão

- Assuntos genéricos ("Novidade!", "Imperdível", "Oferta especial")
- P.S. repetindo literalmente o que já tava no corpo
- Email com 8 links competindo pela atenção
- Imagens pesadas que não carregam (e sem alt-text)
- Mandar pro público inteiro quando segmentar daria conversão 3x maior

## Tabela de decisão: qual arquitetura usar

| Temperatura | Ticket baixo | Ticket médio | Ticket alto |
|-------------|--------------|--------------|-------------|
| Fria | D (Escassez Real) se houver evento / B (Story-Led) se não | B | B |
| Morna | A (Direto) | A ou C (Objeção) | C ou B |
| Quente | A | A | D (se houver gatilho) ou A |

Essa tabela ajuda. Mas o contexto específico sempre pesa mais.

## Diagnóstico de email que performou mal

Se seu último email tá com métricas ruins, passe nessa grade:

- **Abertura < 15%**: problema de assunto, reputação ou horário
- **Abertura boa + CTR < 2%**: problema de corpo (fraco, longo demais ou genérico)
- **CTR bom + conversão < 1%**: problema fora do email (landing / preço / confiança no vendedor)
- **Unsubscribe > 0.5%**: lista desalinhada ou email agressivo demais

A métrica errada diagnosticada leva a correção errada. Um email com CTR alto e conversão baixa não precisa de reescrita de copy — precisa de revisão da página de destino.

---
**Lição da prática:** Antes de mandar o email pra lista inteira, mande pra um segmento de 10-15% mais engajado. Se abertura + CTR desse segmento estiver acima do benchmark, disparar pra lista inteira. Se estiver abaixo, revisa assunto e corpo antes. Essa "mini amostra" evita queimar a lista toda com email que falha.
