---
name: arquitetura-de-funil-end-to-end
description: Desenha funis de venda completos — do tráfego frio ao pós-venda — calibrados pelo modelo de negócio (SaaS, e-commerce, infoproduto, high-ticket com call, serviço B2B) e pelo nível de maturidade operacional do cliente. Não entrega "funil genérico": entrega sistema operacional comercial com stack de ferramentas, automações, métricas e cronograma de implementação. Acione sempre que mencionar: funil de vendas, sales funnel, jornada do cliente, tráfego → lead → venda, aquisição → conversão → retenção, "montar um funil", "estruturar minha venda", desenho de funil, automação comercial — mesmo sem citar "funil".
---

# Arquitetura de Funil End-to-End

Funil de venda não é "atração → nutrição → venda" desenhado num quadro branco. É um sistema operacional comercial com entradas, processos, gatilhos, pessoas e dados. Quando funciona, cada real de ad se transforma em 3-10 reais de receita com mínima intervenção humana. Quando não funciona, você queima dinheiro sem saber por quê.

A maioria dos "planejamentos de funil" falha porque tenta ser universal. O funil certo muda completamente se você vende:

- **SaaS** (ciclo curto, LTV composto, trial-first)
- **E-commerce** (impulso, repeat purchase, ticket médio baixo-médio)
- **Infoproduto** (lançamento vs evergreen, ticket médio-alto)
- **High-ticket B2B** (call-based, ciclo longo, comitê de compra)
- **Serviço local/recorrente** (relação de longo prazo, boca-a-boca)

Essa skill trabalha cada modelo com sua lógica própria — não força molde único.

## As 4 camadas do funil que não podem faltar

| Camada | Nome técnico | Tempo | Métrica-rei |
|--------|-------------|-------|-------------|
| 1 | Atração (TOFU) | Segundos a minutos | CPL (custo por lead) |
| 2 | Nutrição (MOFU) | Dias a semanas | Taxa de engajamento |
| 3 | Conversão (BOFU) | Horas a dias (no pico) | CAC (custo de aquisição) + taxa de conversão |
| 4 | Pós-venda (RET) | Meses a anos | LTV + taxa de retenção + NPS |

Se você só pensa nas 3 primeiras camadas, tá deixando 40-60% do valor na mesa. A camada 4 é onde se recuperam clientes, se ganham indicações e se multiplica faturamento sem aumentar tráfego.

## O Prompt

```
Você é arquiteto de funis comerciais com experiência em modelar sistemas pra negócios que faturam de R$10k a R$10M/mês. Você sabe que funil bom não é "mais etapas" — é menos etapas bem orquestradas, cada uma com função específica e métrica dedicada.

Você rejeita funil genérico "tráfego → LP → ebook → email → oferta". Calibra a arquitetura por modelo de negócio.

**CONTEXTO:**

*Negócio*
- Modelo: [SaaS / e-commerce / infoproduto / high-ticket com call / serviço B2B / serviço local]
- Produto principal: [o que é + ticket]
- Produtos secundários: [upsell / downsell / cross-sell — se houver]
- Meta mensal: [R$ ou X vendas]

*Público*
- Perfil do cliente ideal: [detalhado]
- Nível de consciência predominante: [inconsciente do problema / consciente do problema / consciente da solução / consciente do produto]
- Fonte de tráfego atual ou planejada: [Meta Ads / Google Ads / orgânico / indicação / parceria / misto]
- Jornada de compra típica: [impulso / pondera dias / compara semanas / comitê meses]

*Operação atual*
- Estágio: [zero — vou construir agora / já tem algumas peças — preciso organizar / já roda mas tá ruim — preciso otimizar]
- Ferramentas disponíveis: [liste — LP builder, CRM, email automation, ads, WhatsApp BI, analytics]
- Time: [solo / equipe pequena / equipe comercial / agência terceirizada]
- Budget de mídia mensal: [R$]

*Diferenciais competitivos*
- Por que alguém compraria de você e não do concorrente X: [responde em 1 frase]

---

**PASSO 1 — DIAGNÓSTICO DO MODELO**

Declare:
- Qual arquétipo de funil serve esse modelo (pode usar "funil direto" / "funil com webinar" / "funil de aplicação" / "funil de conteúdo" / "funil de trial" / combinação)
- Por que essa arquitetura (1-2 frases)
- 1 risco estrutural do modelo declarado: ex: "SaaS sem onboarding ativo tem churn de 15-25% no primeiro mês"

**PASSO 2 — MAPA VISUAL DO FUNIL (em texto)**

Diagrama por camada:

```
[TRÁFEGO]
    │
    ▼
[ATRAÇÃO] → ferramenta + conteúdo + CTA
    │
    ▼
[NUTRIÇÃO] → sequência + gatilhos + canais
    │
    ▼
[CONVERSÃO] → mecanismo + ferramenta + quebra de objeção
    │
    ▼
[PÓS-VENDA] → onboarding + upsell + indicação
```

Para cada camada, entregue o detalhamento abaixo.

**PASSO 3 — CAMADA 1: ATRAÇÃO (TOFU)**

- **Fonte(s) de tráfego recomendada(s)** pra esse modelo + justificativa
- **Tipo de oferta de entrada**: lead magnet / video / quiz / cálculo / demonstração
- **Página de captura**: estrutura (copy da dobra + form + trust signal) — link com skill de hero section
- **Conversão esperada tráfego → lead**: [% realista pro nicho]
- **Métrica principal**: CPL (custo por lead)
- **Benchmark**: [CPL saudável pro nicho]
- **O que pode quebrar**: 3 falhas comuns dessa camada

**PASSO 4 — CAMADA 2: NUTRIÇÃO (MOFU)**

- **Sequência de email**: número de emails + cadência (D+0, D+1, D+3, D+5, D+7...)
- **Função de cada email**: [objetivo psicológico de cada um]
- **Canais complementares**: WhatsApp? remarketing ads? retargeting orgânico? comunidade?
- **Segmentação**: como separar leads frios de leads quentes dentro da nutrição
- **Gatilhos de avanço**: o que faz um lead "amadurecer" pra camada seguinte
- **Métrica principal**: taxa de engajamento (abertura, clique, resposta)
- **O que pode quebrar**: 3 falhas comuns

**PASSO 5 — CAMADA 3: CONVERSÃO (BOFU)**

Mecanismo de conversão varia drasticamente por modelo:

- **Se SaaS**: trial → ativação → conversão (com touchpoints específicos de ativação)
- **Se e-commerce**: produto → checkout (com mecanismos de urgência + frete + pagamento)
- **Se infoproduto evergreen**: LP → VSL → checkout
- **Se infoproduto de lançamento**: aquecimento → live/webinar → carrinho aberto → fechamento
- **Se high-ticket**: aplicação → call → proposta → fechamento
- **Se serviço B2B**: demo → proposta → contrato
- **Se serviço local**: orçamento → visita → fechamento

Entregue o mecanismo detalhado com:
- Sequência exata de toques
- Papel de humano vs automação
- Quebra de objeção integrada
- Urgência/escassez (real, não inventada)
- **Métrica principal**: taxa de conversão na etapa + CAC final
- **Benchmark** pro modelo

**PASSO 6 — CAMADA 4: PÓS-VENDA (RET)**

Onde a maioria esquece o funil. Entregue:
- **Onboarding**: primeiros 7-30 dias do cliente (automação + humano)
- **Marcos de sucesso**: o que sinaliza "cliente tá aproveitando o produto"
- **Upsell/cross-sell**: janelas temporais e ofertas (link com skill de upsell)
- **Recuperação de clientes em risco**: sinais de churn + intervenção
- **Programa de indicação**: mecânica simples (não "super elaborada") que dá ROI
- **Métricas-rei**: LTV, retenção, NPS, taxa de indicação
- **O que pode quebrar**: 3 falhas comuns

**PASSO 7 — STACK DE FERRAMENTAS RECOMENDADA**

Por categoria, sugestão de 1-2 opções com faixa de preço:
- Landing page builder
- CRM
- Email automation
- WhatsApp bot + humano
- Pagamento
- Analytics
- Heatmap
- Rastreamento de conversão

Calibre pelo porte (pequeno: ferramentas gratuitas/baratas; médio: ferramentas pagas mid-tier; grande: stack enterprise).

**PASSO 8 — AUTOMAÇÕES PRIORITÁRIAS**

Liste 10 automações que compõem a espinha dorsal do funil. Para cada:
- Gatilho (o que dispara)
- Ação (o que acontece)
- Canal (email, WhatsApp, SMS, notificação)
- Prioridade de implementação (1 = implementar primeiro)

**PASSO 9 — CRONOGRAMA DE IMPLEMENTAÇÃO**

Se o estágio é "zero":
- Semana 1-2: [o que construir]
- Semana 3-4: [próxima fase]
- Mês 2: [consolidação]
- Mês 3: [primeiras otimizações com base em dados]

Se o estágio é "otimização":
- Prioridades primeiras 4 semanas (baseado no gargalo mais provável)

**PASSO 10 — PROJEÇÃO REALISTA**

Dado budget + benchmarks + conversões típicas:
- Leads esperados/mês
- Vendas esperadas/mês
- Faturamento projetado (cenário realista, não otimista)
- Tempo até funil "maturar" (3-6 meses é típico)
- Sinais de que tá saudável vs precisando calibração
```

## Regras que separam funil que escala de funil que sufoca

**1. Uma função por etapa.** Cada etapa do funil tem UM objetivo. Se uma etapa tenta educar E capturar E vender, nenhuma acontece direito.

**2. Segmentação > volume.** 500 leads bem segmentados convertem mais que 5.000 leads misturados. Na nutrição, separar por comportamento é o que transforma métrica.

**3. Nunca tente automatizar o que precisa de humano.** High-ticket sem call humana não converte. SaaS de R$29/mês com call antes de trial afugenta. Desenhe onde automação vira custo vs onde vira vantagem.

**4. Métrica por etapa, não só no final.** Funil saudável tem benchmarks em cada camada. Se você só olha "faturamento do mês", não sabe onde tá o gargalo quando cai.

**5. Pós-venda é ativo, não despesa.** Reativação, upsell e indicação geram 30-60% do faturamento de negócios maduros. Ignorar é deixar 30-60% na mesa.

## Erros que matam funis em construção

- Querer tudo pronto em 30 dias (funil leva 90-180 dias pra amadurecer dados e otimizar)
- Copiar o "funil de 7 dígitos" de um lançador (modelo diferente = arquitetura diferente)
- Stack de 8 ferramentas numa operação que ainda fatura R$30k/mês (sobrecarga operacional)
- Não instalar rastreamento desde o dia 1 (depois você olha e não sabe o que mover)
- Focar em TOFU (tráfego) quando o gargalo tá em BOFU (conversão) — economizando no lugar errado

## Sinal de funil saudável (6-12 meses depois)

- Custo de aquisição (CAC) abaixo do LTV primário (razão LTV:CAC > 3:1)
- Receita recorrente crescendo sem aumento proporcional de mídia
- Taxa de indicação espontânea > 10% das novas vendas
- Churn abaixo de benchmark do nicho
- Dashboards diários/semanais acompanhados pelo time sem "eu não sei"

Se esses sinais não aparecem em 12 meses, o funil precisa de redesenho, não de ajuste.

---
**Movimento de longo prazo:** Depois de 6 meses rodando, o funil maduro começa a se sustentar com 70% menos intervenção ativa. Esse é o momento de planejar o SEGUNDO funil — produto secundário ou segmento adjacente. Negócios que escalam de R$1M/ano pra R$10M/ano geralmente operam 2-4 funis paralelos, não 1 gigante.
