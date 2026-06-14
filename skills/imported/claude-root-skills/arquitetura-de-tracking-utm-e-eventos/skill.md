---
name: arquitetura-de-tracking-utm-e-eventos
description: Projeta sistema completo de rastreamento — convenção de UTMs padronizada pra todas campanhas, eventos de conversão e engajamento pra rastrear no site/app, governança de dados e checklist de implementação em GA4/Mixpanel/Amplitude. Resolve o problema de "não sei de onde veio essa venda" e cria base de dados confiável pra decisão. Vai além de "listar UTMs": cobre tag management, atribuição, eventos de funil e higiene de dados. Acione sempre que mencionar: UTM, tracking, GA4, Google Analytics, Mixpanel, atribuição, origem da venda, parâmetro de campanha, evento de conversão, pixel, "de onde veio esse lead", GTM — mesmo sem citar "tracking plan".
---

# Arquitetura de Tracking UTM e Eventos

Dado ruim leva a decisão ruim. Empresa com analytics configurado mas desorganizado é pior que empresa sem analytics — age em cima de números errados com falsa segurança.

Os 3 problemas recorrentes:

1. **UTMs inconsistentes**: cada pessoa inventa convenção própria. "Facebook" vs "FB" vs "meta" vs "fb_ads" — tudo pra mesma fonte. Relatório vira caos.
2. **Eventos importantes não rastreados**: add_to_cart configurado, purchase esquecido. Funil incompleto.
3. **Atribuição errada**: venda atribuída ao último clique ignora toda a jornada. Canal de meio de funil some do relatório.

Essa skill não é "lista de UTMs". É **projeto de arquitetura de dados** — convenção + eventos + governança.

## O Prompt

```
Você é analista de dados com foco em marketing. Opera sob princípios:
1. Padronização vence sofisticação — UTM simples e consistente > UTM complexa e bagunçada
2. Menos eventos rastreados é melhor que muitos mal configurados
3. Dono dos dados é obrigatório — sem dono, convenção morre em 3 meses
4. Higiene contínua > setup perfeito inicial

**CONTEXTO:**

*Empresa*
- Tipo: [e-commerce / SaaS / infoproduto / agência / serviço]
- Site/App: [URL/nome]
- Estágio atual de analytics: [nada configurado / configurado mas bagunçado / estruturado e quer otimizar]

*Stack de analytics*
- Ferramenta principal: [GA4 / Mixpanel / Amplitude / combinação]
- Tag Manager: [GTM / Tealium / direto]
- Server-side tracking: [sim / não]
- CAPI Meta / Google Enhanced Conversions: [configurado / não]

*Canais ativos*
- [Google Ads / Facebook Ads / TikTok Ads / Email / Orgânico Instagram / YouTube / LinkedIn / Influenciadores / Parcerias / Outros]

*Ações importantes no site/app*
- Conversão principal (compra/cadastro/lead): [qual]
- Ações de engajamento: [liste — adicionar ao carrinho, iniciar checkout, assistir X% do vídeo]
- Ações de funil: [cadastro, download de material, agendamento]

*Sistema de vendas*
- CRM: [HubSpot / Pipedrive / Salesforce / RD / outro]
- Plataforma de checkout: [Shopify / Hotmart / Stripe / plataforma própria]
- Ticket médio e volume mensal: [pra calibrar sofisticação da solução]

*Pontos de dor atuais*
- Dados bagunçados em que canal especificamente: [liste]
- Perguntas que você não consegue responder com analytics atual: [liste]

---

**PASSO 1 — CONVENÇÃO DE UTMs**

### Padrão universal:
```
?utm_source=[plataforma]&utm_medium=[tipo]&utm_campaign=[AAAA-MM-nome]&utm_content=[variação]&utm_term=[keyword se pago]
```

### Regras de nomenclatura:
- **utm_source**: plataforma origem (facebook, google, instagram, linkedin, email, youtube)
- **utm_medium**: tipo de tráfego (cpc, organic, email, social, referral, paid-social, paid-search)
- **utm_campaign**: AAAA-MM-nome-curto-descritivo (ex: 2026-04-lancamento-verao)
- **utm_content**: diferencia criativos/anúncios/links dentro da mesma campanha (ex: carrossel, video-15s, bio-link)
- **utm_term**: keyword de busca paga ou segmento

### Regras inegociáveis:
1. **Minúsculas sempre** (facebook ≠ Facebook pro GA4)
2. **Hífen, nunca espaço nem underscore** (2026-04-promo, não 2026_04_promo)
3. **Sem caracteres especiais** (ç, ã, acentos viram %C3%A7 no URL)
4. **Máximo 50 chars por parâmetro**
5. **Documentação em 1 único lugar** (Notion/planilha)

**PASSO 2 — TABELA DE UTMs POR CANAL**

| Canal | source | medium | Exemplo campaign | Exemplo content |
|-------|--------|--------|------------------|-----------------|
| Facebook Ads | facebook | cpc | 2026-04-lancamento-primavera | carrossel-v1 |
| Instagram Ads | instagram | cpc | 2026-04-lancamento-primavera | reel-v2 |
| Google Search Ads | google | cpc | 2026-04-brand | exact-match |
| Google Display | google | display | 2026-04-retargeting | banner-300x250 |
| YouTube Ads | youtube | cpv | 2026-04-topo-funil | video-15s |
| TikTok Ads | tiktok | cpc | 2026-04-awareness | spark-creator |
| Email (RD/Mailchimp) | rdstation | email | 2026-04-newsletter-mensal | cta-topo |
| WhatsApp Broadcast | whatsapp | messaging | 2026-04-aviso-promo | link-principal |
| Link-in-bio (Instagram orgânico) | instagram | bio | always-on | link-principal |
| Parceria com influencer | [nome-do-creator] | affiliate | 2026-04-collab-x | story-swipe-up |
| LinkedIn Ads | linkedin | cpc | 2026-04-b2b-saas | inmail-v1 |

**PASSO 3 — EVENTOS DE CONVERSÃO E ENGAJAMENTO**

### Eventos críticos (sempre rastrear):
- **page_view**: automático
- **view_item**: visualização de página de produto/oferta
  - Parâmetros: item_name, item_category, price
- **add_to_cart**: itens adicionados ao carrinho
  - Parâmetros: item_name, quantity, value
- **begin_checkout**: iniciou processo de compra
  - Parâmetros: value, items, coupon (se houver)
- **add_payment_info**: inseriu dados de pagamento
- **purchase**: compra concluída
  - Parâmetros: transaction_id, value, tax, shipping, items, coupon
- **sign_up**: cadastro
  - Parâmetros: method (email, google, apple)
- **generate_lead**: lead gerado (B2B ou pré-venda)
  - Parâmetros: value (valor estimado do lead), form_name

### Eventos de engajamento (valiosos pra funil):
- **scroll**: rolou 25%, 50%, 75%, 100% da página
- **video_play / video_complete**: vídeos assistidos (% de conclusão)
- **file_download**: PDF, lead magnet
- **click_external_link**: saída pra outro site
- **whatsapp_click**: cliques em botões de WhatsApp

### Eventos customizados por modelo:
- **SaaS**: feature_used, invite_team_member, integration_connected, plan_upgraded
- **Infoproduto**: lesson_started, lesson_completed, quiz_answered, certificate_downloaded
- **E-commerce**: wishlist_add, review_submitted, return_initiated

**PASSO 4 — PARÂMETROS PADRÃO**

Pra todo evento, sempre enviar:
- user_id (quando logado)
- session_id
- client_id
- fbp/fbc (pra CAPI Meta)
- gclid (pra Enhanced Conversions Google)
- valor em R$ (quando aplicável)

**PASSO 5 — DASHBOARD DE ACOMPANHAMENTO**

### Painel principal (GA4/Looker Studio):

**Seção 1 — Aquisição:**
- Sessões por source/medium
- Conversões por source/medium
- CAC por canal
- ROAS por canal

**Seção 2 — Funil:**
- view_item → add_to_cart → begin_checkout → purchase
- Taxa de conversão de cada etapa
- Gargalos identificados

**Seção 3 — Engajamento:**
- Tempo médio na página
- Taxa de scroll profundo
- Cliques em CTAs principais

**Seção 4 — Atribuição:**
- Primeiro clique vs último clique vs data-driven
- Canal que inicia jornada vs canal que fecha
- Jornada média (quantos touchpoints antes da compra)

**PASSO 6 — CHECKLIST DE IMPLEMENTAÇÃO**

### Fase 1 — Setup base (Semana 1-2):
- [ ] GA4 configurado
- [ ] GTM instalado
- [ ] Eventos padrão rastreados
- [ ] UTMs documentadas em planilha central
- [ ] Debug mode ativado pra validação

### Fase 2 — Validação (Semana 3):
- [ ] Cada evento testado com DebugView
- [ ] Dados batem com plataforma de origem (ex: purchases GA4 vs Shopify)
- [ ] UTMs populando corretamente em todas campanhas
- [ ] Parâmetros customizados chegando

### Fase 3 — Integrações avançadas (Semana 4):
- [ ] CAPI Meta configurado
- [ ] Enhanced Conversions Google ativo
- [ ] Server-side tracking se aplicável
- [ ] Integração CRM → GA4 (linkar lead → venda)

### Fase 4 — Higiene contínua (mensal):
- [ ] Revisar UTMs adicionadas no mês
- [ ] Corrigir inconsistências (campanhas com UTM errada)
- [ ] Avaliar se eventos novos precisam ser criados
- [ ] Arquivar eventos não utilizados

**PASSO 7 — GOVERNANÇA DE DADOS**

### Papéis:
- **Dono do tracking plan**: 1 pessoa nominal (geralmente gestor de marketing ou de growth)
- **Analista que implementa**: implementação técnica via GTM
- **Gestor de mídia**: segue a convenção ao criar campanhas

### Rituais:
- Reunião mensal de 30 min pra revisar dados e inconsistências
- Onboarding pra toda pessoa nova que vai mexer em campanhas
- Template de UTM builder no Notion/Excel/Bitly pra ninguém inventar

### Documentação obrigatória:
- Planilha viva com todas UTMs ativas
- Manual de convenção (o que é source, medium, campaign, etc.)
- Lista de eventos rastreados com descrição

**PASSO 8 — ALERTAS DE PROBLEMA**

Sinais de que o tracking tá quebrado:
- Discrepância > 15% entre GA4 e plataforma de origem (Shopify/Stripe/Hotmart)
- Tráfego "direct" > 30% (provavelmente UTMs não sendo aplicadas)
- Taxa de conversão "not set" / "other" alta
- Eventos duplicados (event fire mais de 1 vez por ação)
- Caída brusca de dados sem explicação de negócio (tracking quebrou)

**PASSO 9 — ATRIBUIÇÃO ALÉM DE ÚLTIMO CLIQUE**

Problemas do último clique:
- Subestima canal de topo de funil (descoberta)
- Supervaloriza canal de fundo (conversão direta)
- Ignora jornadas multi-touch

Modelos a considerar:
- **Linear**: crédito igual pra todos touchpoints
- **Time decay**: mais crédito pros touchpoints mais próximos da compra
- **Position-based**: 40% primeiro clique, 40% último, 20% meio
- **Data-driven** (GA4 padrão): algoritmo aprende o peso de cada canal

Use modelos diferentes pra decisões diferentes:
- Alocação de budget: data-driven ou linear
- Otimização de campanha específica: último clique
- Estratégia de topo de funil: primeiro clique

**PASSO 10 — EVOLUÇÃO DO SISTEMA**

- **Trimestral**: revisão completa — eventos obsoletos, novos canais
- **Anual**: auditoria de ponta-a-ponta — validação de dados, discrepâncias
- À medida que a empresa cresce: considerar data warehouse (BigQuery/Snowflake) pra dados consolidados
```

## Regras da arquitetura que sobrevive

**1. Padrão simples beats padrão sofisticado.** Regra que ninguém segue é regra morta. Convenção de 5 parâmetros seguida por todos > convenção de 15 parâmetros ignorada.

**2. Documentação central ou morre.** UTMs e eventos têm que morar em 1 lugar acessível. Não em "pasta do marketing" que ninguém acha.

**3. Validação na primeira semana.** Implementou? Testou? Disparou evento real e verificou no DebugView? Sem validação, evento fantasma.

**4. Dono nominal.** Tracking sem dono vira bagunça em 3 meses. Alguém tem que aprovar mudanças.

**5. Higiene contínua.** Marketing cria campanhas toda semana. Sem revisão mensal, entropia vence.

## Erros que arruinam o sistema

- UTMs com maiúsculas/minúsculas misturadas (GA4 trata como diferente)
- Eventos duplicados (inflam conversão)
- Falta de server-side tracking em contexto com muito ad blocker
- Ignorar iOS 14.5+ / Safari ITP (perda de dados significativa)
- Não validar CAPI (Meta "faz parecer" que tá funcionando)

## Diferenças importantes

- **UTM** ≠ Evento. UTM é "de onde veio". Evento é "o que fez".
- **Conversão** ≠ Venda. Conversão é qualquer ação rastreada (lead, cadastro). Venda é conversão de R$.
- **GA4** ≠ Pixel. GA4 é analytics, Meta Pixel/CAPI são pra otimização de campanha no Facebook.

## Sinais de sistema saudável

- Discrepância entre GA4 e plataforma de origem abaixo de 10%
- Relatório de aquisição em 1 clique (sem "tratamento de dados")
- Nenhuma campanha rodando sem UTM completa
- Gestor de marketing consegue responder "de onde veio essa venda" em 30 segundos
- Decisões de budget viram baseadas em dado consolidado

---
**Movimento avançado:** Após 6-12 meses de tracking consolidado, implemente **dados unificados** (CDP simples ou BigQuery + Looker Studio). Junta GA4 + CRM + plataforma de vendas em visão única. Permite análises impossíveis antes: jornada completa do lead desde primeiro anúncio até venda + upsell 6 meses depois. É o que separa decisão dirigida por dado de decisão dirigida por relatório.
