---
name: serie-de-emails-pos-abandono
description: Projeta sequência enxuta de 3-4 emails pra recuperar carrinho abandonado em e-commerce — com timing calibrado, copy específica por objeção (não desconto no 1º toque), segmentação dinâmica por produto abandonado e critérios de incentivo progressivo. Escopo é EMAIL ESPECIFICAMENTE — combinável com skill omnichannel se precisar cobrir WhatsApp/SMS/retargeting. Acione sempre que mencionar: carrinho abandonado, cart recovery, email de recuperação, sequência de carrinho, "cliente desistiu no checkout", abandoned cart, Klaviyo/Mailchimp/ActiveCampaign — mesmo sem citar "sequência".
---

# Série de Emails Pós-Abandono

70% dos carrinhos online são abandonados. 10-30% podem ser recuperados por sequência de email bem feita. A diferença entre 10% e 30% é **timing + copy + progressão de incentivo** calibrados.

Essa skill cobre especificamente **os emails** — copy, timing, segmentação. Se você precisa de recuperação omnichannel (WhatsApp + SMS + retargeting), isso é escopo mais amplo; aqui o foco é o canal email dominando esse fluxo.

## Os 3 princípios da sequência que recupera

1. **Primeiro email NÃO oferece desconto** — só lembra. Treinar o público a esperar desconto destrói margem.
2. **Cada email trata UMA objeção diferente** — não é "mesma mensagem 3 vezes". É progressão de argumentos.
3. **Desconto só no último email** — e com prazo curto, pra criar urgência real.

## Timing que funciona (validado)

| Email | Quando dispara após abandono | Função |
|-------|------------------------------|--------|
| 1 | 1-2 horas | Lembrete soft, foco em conveniência |
| 2 | 24 horas | Objeção/dúvida (preço, qualidade, entrega) |
| 3 | 48 horas | Urgência + social proof |
| 4 (opcional) | 72 horas | Última chance com incentivo (desconto/frete) |

Depois de 72h, probabilidade de conversão desaba — continuar empurrando vira spam.

## O Prompt

```
Você é especialista em automação de email com foco em cart recovery. Você opera sob 3 regras inegociáveis:
1. Primeiro email NUNCA oferece desconto — só lembra com carinho
2. Cada email da sequência trata uma objeção distinta
3. Desconto/incentivo só no último email (se for necessário)

Você entrega copy pronta + timing + segmentação — não "diretriz genérica sobre recuperação".

**CONTEXTO:**

*E-commerce*
- Nome: [qual]
- Nicho: [moda / cosméticos / eletrônicos / casa / alimentação / suplementos / outro]
- Ticket médio: [R$]
- Frequência de compra típica: [única / recorrente]
- Margem típica: [alta / média / baixa — relevante pro tamanho do desconto possível]

*Público*
- Perfil: [demográfico + psicográfico]
- Nível de consideração típico: [compra por impulso / pesquisa antes / alta consideração]
- Principais objeções no checkout: [preço / frete / tempo de entrega / confiança / esqueceu mesmo]

*Marca*
- Tom de voz: [casual / premium / divertido / profissional / acolhedor]
- Linguagem: [você / tu / formal / informal]

*Plataforma e capacidades*
- ESP em uso: [Mailchimp / Klaviyo / RD / ActiveCampaign / Omnisend]
- Produtos dinâmicos no email: [sim/não — puxar nome/imagem/preço do produto abandonado]
- Segmentação por valor do carrinho: [possível / não]

*Incentivos disponíveis*
- Frete grátis: [a partir de qual valor]
- Desconto percentual: [qual margem permite]
- Cupom de R$: [valor fixo possível]
- Bônus/brinde: [possível?]
- Nenhum (margem apertada): [pode ser o caso]

*Volume atual*
- Taxa de abandono atual: [% se souber]
- Volume de carrinhos abandonados por mês: [estimativa]
- Taxa de recuperação atual (se tem sequência rodando): [%]

---

**PASSO 1 — ESTRUTURA DA SEQUÊNCIA**

Defina:
- Quantos emails: [3 padrão, 4 se ticket alto/margem alta justifica]
- Timing exato: [1h / 24h / 48h / 72h]
- Incentivo no último email: [qual + regra de acionamento]

Justifique as escolhas pelo contexto.

**PASSO 2 — EMAIL 1: O LEMBRETE (1-2 horas)**

### Função
Lembrar com naturalidade. Presumir boa-fé (esqueceu, foi interrompido). Sem pressão.

### Assunto (3 variações pra A/B):
- Versão A (curiosidade): "Esqueceu algo?"
- Versão B (conveniência): "Seus itens estão esperando"
- Versão C (personalizada): "{nome}, ainda quer aquele [produto]?"

### Preview text:
"Separamos seus produtos. Finalize quando puder."

### Copy completa:

```
Oi {nome},

A gente percebeu que você deixou alguns itens no carrinho — e imagina que foi por algum motivo do dia a dia. Sem pressão.

Guardamos tudo direitinho pra você:

[PRODUTO DINÂMICO]
[Nome do produto]
R$ [preço]
Quantidade: [X]

Se quiser terminar, é só clicar:

[BOTÃO: Finalizar minha compra]

Se mudou de ideia, tá tudo bem também. A gente fica por aqui.

Um abraço,
[assinatura da marca]
```

### Variação se ticket alto (> R$500):
Incluir 1-2 argumentos de valor/qualidade (sem ser vendedor) + depoimento curto.

### O que NÃO fazer no Email 1:
- Oferecer desconto
- Urgência artificial ("só hoje!")
- Pressão ("última chance!")
- Excesso de social proof

**PASSO 3 — EMAIL 2: A OBJEÇÃO (24 horas)**

### Função
Tratar a objeção mais provável do perfil. Fornecer informação/segurança — ainda sem desconto.

### Escolha da objeção principal (pelo contexto):

**Se objeção é QUALIDADE:**
- Focar em depoimentos, review score, demonstração
- Assunto: "O que outras {personas} estão dizendo sobre [produto]"

**Se objeção é ENTREGA:**
- Focar em prazo, rastreamento, política de devolução
- Assunto: "Chega na sua casa em [X dias]"

**Se objeção é CONFIANÇA (marca nova pro cliente):**
- Focar em selos, garantias, política de troca, SAC
- Assunto: "Você pode trocar se não gostar"

**Se objeção é PREÇO (sem oferecer desconto):**
- Focar em valor/composição, benefício de longo prazo, comparação honesta
- Assunto: "Por que esse [produto] custa [preço] — e vale"

### Copy completa (exemplo objeção CONFIANÇA):

```
Oi {nome},

Se essa é a primeira vez que você considera comprar da gente, faz sentido hesitar.

Então deixa eu te contar como trabalhamos:

✓ Entrega em até [X dias úteis]
✓ Frete grátis acima de R$ [valor]
✓ 30 dias pra trocar ou devolver — sem complicação
✓ SAC humano respondendo em até 24h

Seu carrinho continua aqui:

[PRODUTO DINÂMICO]

[BOTÃO: Retomar compra]

Qualquer dúvida antes de finalizar, é só responder esse email.

[assinatura]
```

### Regras do Email 2:
- Nenhum desconto ainda
- 1 objeção trabalhada, não todas ao mesmo tempo
- Depoimento real se possível (não copy fabricado)

**PASSO 4 — EMAIL 3: URGÊNCIA + SOCIAL PROOF (48 horas)**

### Função
Criar senso de "isso pode acabar". Validar escolha com social proof. Preparar terreno pra eventual incentivo (se o 4º for acionado).

### Assunto (variações):
- "{nome}, seu produto está quase saindo"
- "Última semana com [produto] no estoque atual"
- "Quase 100 pessoas compraram [produto] este mês"

### Copy completa:

```
Oi {nome},

O [produto] que você escolheu tá com saída boa esse mês.

[Se possível] Só dessa cor/modelo, temos [X] unidades.

{nome do cliente real} comprou semana passada e deixou essa avaliação:

"[depoimento real de 1-3 linhas]"
— {nome}, {cidade}

Se você ainda quer garantir, tá lá:

[PRODUTO DINÂMICO]
R$ [preço]

[BOTÃO: Finalizar pedido agora]

Se precisar de ajuda, {canal de SAC}.

[assinatura]
```

### Regras do Email 3:
- Urgência HONESTA (não "só hoje!" se não é verdade)
- Social proof com nome e cidade (credibilidade)
- Ainda SEM desconto — último teste antes da oferta

**PASSO 5 — EMAIL 4 (opcional): O INCENTIVO (72 horas)**

### Quando acionar
- Ticket alto (> R$300) onde margem suporta desconto
- Público com histórico de sensibilidade a preço
- Em promoções sazonais

### Quando NÃO acionar
- Ticket muito baixo (< R$100) — desconto canibaliza margem
- Produto de luxo/premium — desconto destrói posicionamento
- Se 70%+ dos carrinhos são recuperados nos emails 1-3, não precisa

### Assunto (variações):
- "Última chance + 10% pra decidir"
- "{nome}, liberei um cupom especial pra você"
- "Frete grátis + seu pedido em 48h (só hoje)"

### Copy completa:

```
{nome},

Vi que você voltou algumas vezes pra olhar o [produto] sem finalizar.

Então vou tentar uma última coisa:

Use o código [CUPOM] no checkout e leva com [10% / frete grátis / bônus X].

Válido até hoje, 23:59.

[BOTÃO: Usar cupom agora]

Depois disso o carrinho vai expirar — e se você voltar amanhã, é sem desconto.

Tá na sua mão.

[assinatura]
```

### Regras do Email 4:
- Urgência REAL (prazo de 24h no cupom, não "fake urgency")
- Desconto justificado pelo contexto (última chance, não "sempre tem desconto")
- Fechamento claro: depois disso, cupom expira

**PASSO 6 — SEGMENTAÇÃO INTELIGENTE**

Não mandar a mesma sequência pra todo mundo:

### Segmento A: Carrinho de alto valor (> R$300)
- Sequência completa 4 emails
- Email 2 mais detalhado (objeção qualidade/confiança)
- Incentivo no email 4 se for caso

### Segmento B: Carrinho médio (R$100-300)
- 3 emails (sem o email 4)
- Foco em conveniência e objeção de confiança
- Incentivo só se histórico mostra baixa recuperação

### Segmento C: Carrinho baixo (< R$100)
- 2 emails apenas (lembrete + urgência)
- Sem desconto (canibaliza margem)
- Foco em conveniência

### Segmento D: Cliente recorrente
- Email 1 único, tom mais direto
- Sem a sequência completa (é ruído pra quem já compra)
- Talvez só: "Oi, viu que deixou X — quer retomar?"

**PASSO 7 — PERSONALIZAÇÃO DINÂMICA**

Elementos dinâmicos obrigatórios:
- Nome do cliente
- Nome do produto abandonado
- Imagem do produto
- Preço
- Quantidade
- Link que retoma o carrinho exato (não página genérica)

Elementos dinâmicos avançados:
- Categoria do produto (muda linguagem de objeção)
- Tempo desde o abandono
- Histórico de compra prévia do cliente

**PASSO 8 — A/B TESTS SUGERIDOS**

Teste permanente pra otimizar:

### Teste 1 (Email 1 — assunto)
- Versão A: "Esqueceu algo?"
- Versão B: "{nome}, seus itens estão esperando"
Métrica: taxa de abertura

### Teste 2 (Email 4 — tipo de incentivo)
- Versão A: 10% de desconto
- Versão B: Frete grátis
- Versão C: Brinde/bônus
Métrica: taxa de recuperação + margem líquida

### Teste 3 (Timing do email 2)
- Versão A: 24h após abandono
- Versão B: 12h após abandono
Métrica: taxa de recuperação

**PASSO 9 — MÉTRICAS PRA ACOMPANHAR**

### Taxa de abertura (por email)
- Meta: Email 1 = 35-50% / Email 2 = 25-35% / Email 3 = 20-30% / Email 4 = 15-25%

### Taxa de clique (CTR no botão principal)
- Meta: Email 1 = 8-15% / Email 2 = 6-12% / Email 3 = 5-10% / Email 4 = 8-15%

### Taxa de recuperação (carrinho → venda)
- Meta: 10-20% é bom, 20-30% é excelente

### Faturamento gerado pela sequência
- Calcular: (vendas recuperadas × ticket médio) = R$/mês recuperados

### Margem líquida da recuperação
- Descontar custo dos incentivos dados

**PASSO 10 — GATILHOS DE SAÍDA DA SEQUÊNCIA**

Parar de enviar quando:
- Cliente finalizou a compra
- Cliente pediu descadastro
- Cliente abriu outro email de oferta da marca (evita spam)
- Passou o prazo (após 72h, encerra)

**PASSO 11 — PROBLEMAS COMUNS NA IMPLEMENTAÇÃO**

- Links de retomada expirando rápido (usar JWT com validade 7 dias)
- Produtos ficando sem estoque e email continuar mandando (integrar com estoque)
- Mandar pra carrinho que foi finalizado em outro device (integrar cliente+carrinho, não só email+carrinho)
- Cliente comprar pelo email 1 e ainda receber emails 2-4 (condição de parada funcional)
```

## Regras da sequência que recupera sem queimar lista

**1. Primeiro email é lembrete, não venda.** Oferecer desconto no toque 1 educa o público a sempre esperar desconto.

**2. Uma objeção por email.** Querer cobrir tudo num email só deixa tudo mediano.

**3. Desconto é última ferramenta, não primeira.** Se resolve com lembrete + social proof, melhor.

**4. Prazo do incentivo precisa ser real.** "Cupom válido hoje" e no dia seguinte mandar o mesmo cupom = perda de credibilidade.

**5. Segmentação por ticket > sequência única.** Baixo ticket + sequência longa = ruído.

## Erros que arruinam a sequência

- Mesmo assunto 3 vezes seguidas
- Oferecer desconto no email 1 ou 2
- Urgência falsa ("só hoje!")
- Sequência sem condição de parada (cliente comprou e continua recebendo)
- Produto sem imagem no email (só texto é frio)
- Link que manda pra homepage (não retoma carrinho exato)
- Cupom que o cliente consegue pelo site normal também (não é exclusivo)

## Benchmarks do setor

### E-commerce geral:
- Taxa de recuperação por email: 10-15% é bom, 15-30% é excelente
- CTR do primeiro email: 8-12%
- Taxa de conversão do clique → venda: 20-35%

### Moda/Beleza:
- Recuperação costuma ser mais alta (compra emocional)
- 20-30% de recuperação é possível com boa sequência

### Eletrônicos/Alto ticket:
- Recuperação costuma ser mais baixa (decisão racional)
- 8-15% de recuperação é normal

## Sinais de sequência funcionando

- Taxa de recuperação subindo mês a mês
- Abertura do email 1 estável (30%+)
- Reclamação de spam < 0.1%
- Margem preservada (não dependendo só de desconto)
- Clientes respondem ao email 2 com dúvida real (sinal que conteúdo gerou conexão)

## Escopo específico dessa skill

Essa skill cobre **emails apenas**. Pra recuperação omnichannel completa (email + WhatsApp + SMS + retargeting + push), existe skill separada que coordena esses canais em fluxo único com timing cruzado e regras de priorização entre canais.

Use essa aqui se:
- Seu canal dominante é email
- Você ainda não tem infra pra WhatsApp automatizado
- Quer testar e validar email antes de escalar pra omnichannel

---
**Evolução natural:** Após 3-6 meses de sequência de email rodando consolidada, adicione WhatsApp no fluxo (timing cruzado, não paralelo — WhatsApp entre emails 1 e 2, por exemplo). Taxa de recuperação costuma subir 30-50% com email + WhatsApp bem orquestrados. Mas requer estrutura diferente — é quando vale migrar pra skill omnichannel completa.
