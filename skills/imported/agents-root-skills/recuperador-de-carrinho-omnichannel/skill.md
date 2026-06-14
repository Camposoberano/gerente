---
name: recuperador-de-carrinho-omnichannel
description: Projeta sequências completas de recuperação de carrinho abandonado usando 4 canais coordenados (email, WhatsApp, anúncio de remarketing e SMS) com timing escalonado, tom progressivo e mapeamento por motivo de abandono. Foge da armadilha de usar o mesmo copy em canais diferentes. Acione sempre que mencionar: carrinho abandonado, recuperação de carrinho, remarketing, abandonment, checkout abandonado, WhatsApp de recuperação, "o cliente saiu do checkout", "tá vazando venda", taxa de conversão de checkout baixa, "recuperar vendas perdidas" — mesmo sem citar "carrinho".
---

# Recuperador de Carrinho Omnichannel

70% dos carrinhos são abandonados. Isso não é falha — é característica do e-commerce. O que separa quem fatura de quem não fatura é o que acontece **depois do abandono**.

Sequência ruim: 3 emails genéricos em 3 dias, todos com a mesma oferta de 10% de desconto.

Sequência certa: 4 canais coordenados, cada um com função específica, escalando de suavidade até urgência — e adaptado ao motivo provável do abandono.

Essa skill entrega o fluxo completo.

## Os 5 motivos reais de abandono (e como cada um exige tratamento diferente)

| Motivo | % aproximado | O que a recuperação precisa resolver |
|--------|--------------|--------------------------------------|
| Distração/interrupção | 25% | Lembrete gentil + link direto pro carrinho reservado |
| Preço/frete alto | 20% | Incentivo real + justificativa de valor |
| Dúvida sobre produto | 20% | Informação + prova social + garantia |
| Comparação com concorrente | 15% | Diferencial visível + urgência leve |
| Problema técnico no checkout | 10% | Link simplificado + suporte direto |

Os 10% restantes são "windows shopping" — provavelmente não compram de jeito nenhum. Não desperdice tempo com eles.

## Anatomia da sequência

A skill entrega 5 touchpoints em 4 canais diferentes, com intervalos calibrados:

```
T+30min    → Email lembrete suave
T+2h       → WhatsApp (se opt-in)
T+24h      → Email de valor + anúncio de remarketing
T+48h      → Email com incentivo + SMS
T+96h      → Email última chance + anúncio de escassez
```

## O Prompt

```
Você é especialista em recuperação de carrinho pra e-commerce e infoprodutos. Já rodou sequências que recuperam 18-27% de carrinhos abandonados (vs média de mercado de 10-15%). Você sabe que a diferença não é "copy bonita" — é timing, tom progressivo e canal certo pra cada momento.

**CONTEXTO:**

*Produto*
- Tipo: [físico / digital / SaaS / serviço / assinatura]
- Categoria: [ex: suplemento, tênis, curso, consultoria, software]
- Ticket médio do carrinho: [valor]
- Margem disponível pra incentivo: [%]
- Tempo de entrega/acesso: [imediato / 2-7 dias / SaaS / outro]

*Cliente*
- Perfil do comprador: [idade + comportamento + sensibilidade a preço]
- Já é cliente ou é primeira compra: [novo / recorrente / misto]
- Principal motivo estimado de abandono: [se souber, baseado em hotjar/feedback]

*Operação*
- Canais disponíveis: [email sim/não, WhatsApp opt-in sim/não, SMS sim/não, ads de remarketing sim/não]
- Ferramenta de automação: [ActiveCampaign / Klaviyo / RD Station / Mailchimp / outra]
- Pode oferecer incentivo: [nenhum / frete grátis / % de desconto / bônus / parcelamento especial]
- Janela de recuperação: [quantos dias você considera "tempo útil" antes do cart expirar na operação]

**ENTREGA — sequência completa de 5 touchpoints:**

Para CADA touchpoint, entregue:
- Canal exato
- Timing em horas desde o abandono
- Tom emocional
- Motivo de abandono que está tratando
- Copy completa (adaptada ao canal)
- CTA específico
- O que acontece se a pessoa clicar/não clicar

---

### TOUCHPOINT 1 — Lembrete suave (T+30min a T+2h)

**Canal primário: Email**
Tom: Prestativo, como se você tivesse visto a pessoa esquecer algo.
Não falar de preço, não oferecer desconto, não dramatizar.

Copy pra entregar:
- 3 opções de linha de assunto
- Preview text
- Corpo do email (curto — máximo 80 palavras)
- CTA (botão direto pro carrinho reservado)
- P.S. (opcional — só se fizer sentido)

**Canal secundário: WhatsApp (se opt-in)**
Tom: Conversacional, sem ser invasivo. Tratamento como amigo.
Copy pra entregar:
- Mensagem única, máximo 3 linhas
- Link do carrinho
- Emoji calibrado (1 no máximo)

---

### TOUCHPOINT 2 — Reforço de valor (T+24h)

**Canal primário: Email**
Tom: Consultivo. Reforçar POR QUE aquele produto resolve o problema.
Foco: Objeções sobre o produto em si.

Copy:
- 3 assuntos
- Corpo (150-200 palavras — pode incluir 2 bullets de benefício, 1 depoimento curto)
- CTA

**Canal secundário: Remarketing em Meta/Google**
- 2 variações de copy pra anúncio dinâmico
- Headline (até 40 chars)
- Descrição (até 90 chars)

---

### TOUCHPOINT 3 — Prova social (T+48h)

**Canal primário: Email**
Tom: Narrativo. Contar história de cliente similar que comprou e ficou satisfeito.
Foco: Objeções de confiança e "será que funciona pra mim".

Copy:
- 3 assuntos
- Corpo com mini-case ou depoimento (200-250 palavras)
- CTA
- Incluir elemento de social proof visual (estrelas, número de clientes, logo de imprensa)

**Canal secundário: WhatsApp**
Mensagem com screenshot de depoimento (sugestão de imagem).

---

### TOUCHPOINT 4 — Incentivo tangível (T+72h)

**Canal primário: Email**
Tom: Direto, quase comercial. Aqui vale oferta real.
Oferta: frete grátis / % / bônus — qualquer coisa que remova o atrito final.

Copy:
- 3 assuntos (mencionar o benefício do incentivo explicitamente)
- Corpo com a oferta em destaque, prazo claro (48h recomendado)
- CTA com senso de economia

**Canal secundário: SMS (se opt-in)**
SMS curto (máximo 140 chars) com:
- Menção ao produto no carrinho
- Incentivo exato
- Link curto
- Prazo

---

### TOUCHPOINT 5 — Última chance (T+120h a T+144h)

**Canal primário: Email**
Tom: Honesto, firme. "Depois disso não mandamos mais."
Foco: Fechar ou liberar mentalmente.

Copy:
- 3 assuntos (urgência real, nunca inventada)
- Corpo curto (100 palavras)
- CTA
- Explicar o que acontece depois desse email (não haverá próximo)

**Canal secundário: Anúncio de remarketing com escassez**
- Variação de copy que deixa claro "última aparição"
- Usa a oferta do touchpoint 4 se ainda aplicável

---

**REGRAS DA SEQUÊNCIA:**

1. Nenhum toque deve parecer perseguição. Se o cliente comprar no toque 2, os seguintes param automaticamente (trigger de exclusão).

2. Nenhum toque deve soar desesperado. "POR FAVOR VOLTA" é morte da marca.

3. Escalada de tom é OBRIGATÓRIA. Suave → útil → social → incentivo → firme. Quem pula direto pra desconto no toque 2 perde margem e educa o cliente a esperar.

4. Remoção de toque quando cliente já respondeu em outro canal. Exemplo: clicou no WhatsApp → pular email do mesmo dia.

5. Após o toque 5, a pessoa entra em lista de remarketing sazonal (Black Friday, lançamento novo) mas sai da sequência ativa de abandono.

**BÔNUS:**

Entregue também:
- 1 copy específico pro caso de abandono com cupom já aplicado (motivo geralmente é frete) — tratamento diferente
- 1 copy específico pro caso de segunda compra do mesmo cliente (não pode soar como "primeiro contato")
- 1 checklist de 5 coisas pra revisar no checkout antes de apostar em recuperação (muitas vezes o problema não é copy, é UX do checkout)
```

## Regras que separam recuperação boa de spam

**1. Opt-in é sagrado.** Mandar WhatsApp sem autorização é ilegal no Brasil (LGPD) E mata reputação do número. Sempre opt-in duplo no checkout.

**2. Desconto é arma, não rotina.** Se todo abandono recebe desconto, clientes aprendem a abandonar pra ganhar desconto. Use com parcimônia.

**3. Personalização vale mais que criatividade.** "Vi que você deixou o Tênis Nike Air no carrinho" converte mais que "Volte pra finalizar sua compra" por margem larga.

**4. Teste intervalos.** 30min pode ser cedo demais pro seu público. Alguns públicos respondem melhor a 2h como primeiro toque.

**5. Honre a última chance.** Se você diz "esse é o último email" e manda outro no dia seguinte, mata a credibilidade do "última chance" pra sempre nessa lista.

## Métricas que indicam que a sequência funciona

- Taxa de recuperação geral acima de 15%
- Taxa de abertura do email 1 acima de 50%
- CTR do email 1 acima de 15%
- Cada toque seguinte tem abertura decrescente mas conversão por abertura CRESCENTE (sinal de qualificação natural)
- Unsubscribe rate abaixo de 1% da sequência inteira

Se unsubscribe passa de 2%, alguma coisa na sequência tá soando spam.

---
**Movimento avançado:** Segmente a sequência pelo valor do carrinho. Carrinho de R$50 não merece o mesmo investimento de recuperação que carrinho de R$500. Pro carrinho alto, adicione um 6º toque: ligação humana ou mensagem pessoal do atendimento. Conversão dessa camada costuma ser 35%+.
