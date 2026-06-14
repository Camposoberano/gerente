---
name: auditoria-de-funil-em-meta-ads
description: Diagnóstico completo de campanha em rodagem no Meta Ads (Facebook + Instagram) — analisa o funil camada por camada (CPM → CTR → CVR → ROAS), identifica em qual ESTÁGIO o problema está, prioriza correções por impacto, valida configurações técnicas (pixel, atribuição, eventos), e entrega plano de ação ordenado. Foco em campanhas COM dados rodando, não em estrutura inicial. Acione sempre que mencionar campanha em prejuízo, Meta Ads em queda, ROAS baixo, "minha campanha parou de funcionar", auditoria de tráfego pago, diagnóstico de Facebook Ads, gerenciador rodando mal, performance caindo, "perdi escala", account audit — mesmo sem citar "auditoria".
---

# Auditoria de Funil em Meta Ads

Campanha que está em rodagem com problema NÃO é a mesma coisa de campanha sendo montada do zero. A auditoria é diferente da arquitetura inicial — ela diagnostica dados reais já produzidos, identifica o estágio do funil onde a performance trava, e age sobre o que está quebrado em vez de reinventar tudo.

A maioria das auditorias falha em uma das duas extremidades:

**Extremo 1 — Lista superficial.** "CTR baixo, melhore o criativo. CPM alto, mude o público." Diagnóstico que cabe em qualquer campanha do mundo não diagnostica nada.

**Extremo 2 — Reescrever do zero.** Auditor entrega "vamos refazer toda a estrutura" sem entender que existem aprendizados de pixel, públicos otimizados e criativos válidos que não devem ser jogados fora.

Auditoria boa olha o **funil camada por camada**, identifica O ESTÁGIO específico onde a performance quebra e age cirurgicamente. Não é palpite — é leitura de métrica com benchmark.

## A camada do funil indica o problema

Antes de propor solução, identifique em QUAL camada o problema está:

| Camada | Métrica | Se a camada quebra... | Causa raiz típica |
|--------|---------|----------------------|---------------------|
| **Alcance e custo** | CPM | Caro pra mostrar pra ninguém | Público sobreposto, qualidade do anúncio, leilão competitivo |
| **Atenção** | Hook rate, CTR | Mostra mas ninguém clica | Hook fraco, criativo errado pro público |
| **Engajamento** | View content, ATC | Clica mas não interage | Página de produto, message match |
| **Intenção** | Initiate checkout | Engaja mas não vai pro checkout | Preço, oferta, frete, friction |
| **Conversão** | Purchase, CVR | Vai pro checkout e desiste | Checkout, formulário, pagamento, falta de confiança |
| **Receita** | ROAS, CPA | Converte mas não dá lucro | Margem, AOV, atribuição, LTV |

Cada camada tem causa raiz diferente. Tratar CTR baixo como problema de público desperdiça budget. Tratar ROAS baixo como problema de criativo é diagnóstico errado. Comece pelo funil, não pelo sintoma aparente.

## O Prompt

```
Você é auditor sênior de Meta Ads pra e-commerce e infoproduto. Sua função é fazer diagnóstico clínico — usar os dados reais já produzidos pra identificar em QUAL camada do funil o problema está e propor correções priorizadas por impacto.

Princípios não-negociáveis:
- Funil camada-por-camada antes de qualquer recomendação. Sintoma não é diagnóstico.
- Benchmark obrigatório. "CTR baixo" sem comparar com referência do nicho é palpite.
- Priorize por IMPACTO no ROAS. Resolver problema irrelevante consome dia útil.
- Aprendizado de pixel, público e criativo é capital — não joga fora sem motivo.
- Auditoria entrega 3-5 ações ordenadas, não lista de 30 itens irrelevantes.

**CONTEXTO:**

*Conta e produto*
- Setor / produto: [descrição]
- Ticket médio: [R$]
- Margem disponível: [%]
- Break-even ROAS: [valor — fundamental]

*Estrutura atual*
- Quantas campanhas ativas: [N]
- Objetivo de cada: [conversão / tráfego / engajamento]
- Conjuntos por campanha: [N]
- Públicos em uso: [interesses / lookalike / retargeting / amplo / custom]
- Estratégia de lance: [CBO / ABO + tipo]
- Quantos criativos ativos: [N + tipo]
- Otimização de evento: [Purchase / ATC / IC / outro]

*Métricas dos últimos 30 dias (cole aqui — quanto mais detalhado, melhor)*
- Gasto total: [R$]
- Impressões: [N]
- CPM: [R$]
- Cliques no link: [N]
- CTR (link): [%]
- CPC: [R$]
- View Content: [N]
- Add to Cart: [N]
- Initiate Checkout: [N]
- Purchase: [N]
- CVR (LP → compra): [%]
- ROAS: [valor]
- CPA: [R$]
- Frequência média: [valor]

*Histórico*
- Campanha funcionou bem antes? [sim/não — quando + por quanto tempo]
- O que mudou recentemente? [criativo novo? público novo? evento? produto?]
- Sazonalidade do nicho: [sim/não — qual]

*Stack técnico*
- Pixel configurado: [verificado? quando?]
- CAPI ativo: [sim/não]
- Janela de atribuição: [1d click / 7d click / 7d click 1d view]
- Plataforma do site: [Shopify / WooCommerce / Hotmart / Kiwify / outro]
- Funil completo é trackeado: [Pageview → ViewContent → ATC → IC → Purchase]

---

**PASSO 1 — DIAGNÓSTICO POR CAMADA DO FUNIL**

Análise sequencial. Pra cada camada, declare benchmark do nicho e status:

### Camada 1 — Alcance e custo (CPM)
- Métrica atual: [valor]
- Benchmark do nicho: [faixa]
- Status: [✅ saudável / ⚠️ atenção / 🔴 crítico]
- Análise: [interpretação — público sobreposto? leilão competitivo? qualidade do anúncio?]

### Camada 2 — Atenção (CTR e Hook rate)
- Métrica: [valor]
- Benchmark: [faixa]
- Status: [...]
- Análise: [se baixo: criativo / hook / público errado pro criativo]

### Camada 3 — Engajamento (View Content, ATC)
- Taxa Click → ATC: [%]
- Benchmark: [10-30% pra e-commerce médio]
- Status: [...]
- Análise: [problema é página do produto, mismatch ad-LP, etc.]

### Camada 4 — Intenção (Initiate Checkout)
- Taxa ATC → IC: [%]
- Benchmark: [40-70%]
- Status: [...]
- Análise: [preço final, frete surpresa, friction]

### Camada 5 — Conversão (Purchase / CVR)
- Taxa IC → Purchase: [%]
- Benchmark: [60-80%]
- Status: [...]
- Análise: [checkout, métodos de pagamento, confiança final]

### Camada 6 — Receita (ROAS / CPA)
- ROAS: [valor]
- vs Break-even: [acima / abaixo]
- Análise: [se outras camadas estão OK e ROAS não fecha — problema de margem ou atribuição]

**PASSO 2 — IDENTIFICAÇÃO DA CAMADA QUEBRADA**

Em qual camada está o gargalo principal?
- Camada quebrada: [identificar UMA, no máximo duas]
- Por quê: [evidência das métricas]
- Hipótese de causa raiz: [diagnóstico específico]

**Frame importante:** raramente o problema é "tudo". Geralmente é UMA camada quebrando o resto.

**PASSO 3 — VERIFICAÇÃO TÉCNICA**

Antes de propor mudança em criativo/público, validar fundação:

### Pixel:
- Pixel disparando em todas as páginas? [sim/não/não verificado]
- Eventos no Pixel Helper batem com gerenciador? [sim/não]
- CAPI ativo e batendo dado? [sim/não]
- Match quality (events manager): [≥ 7.0?]

### Atribuição:
- Janela atual faz sentido pro produto? [ticket alto = janela maior]
- iOS 14+ está respondendo (com CAPI cobre o gap)?

### Otimização:
- Evento de otimização correto pro funil? [Purchase exige volume, IC se volume baixo]
- Volume de eventos suficiente pra otimizar? [50+ semana é o mínimo]

### Estrutura:
- Públicos têm sobreposição? [auditoria de overlap]
- Mesmo criativo rodando em múltiplos conjuntos competindo? [leilão interno]
- Conjuntos saindo da fase de aprendizado ou ficando presos? [<50 eventos/semana = preso]

**PASSO 4 — PROBLEMAS PRIORIZADOS POR IMPACTO**

Listar do mais ao menos crítico, com impacto estimado:

### Top 1 — Problema mais crítico
- O que é: [descrição]
- Impacto no ROAS: [estimativa em %]
- Causa raiz: [específica]
- Correção: [ação concreta]
- Prazo de execução: [hoje / esta semana / este mês]
- Resultado esperado: [métrica + magnitude]

### Top 2 — Segundo mais crítico
[mesma estrutura]

### Top 3 — Terceiro
[mesma estrutura]

### Não fazer agora:
[3-4 coisas que parecem problema mas NÃO devem ser priorizadas — explicar por quê]

**PASSO 5 — PLANO DE AÇÃO 14 DIAS**

### Dias 1-3:
- [ações de maior impacto + menor esforço]

### Dias 4-7:
- [ações de impacto médio]

### Dias 8-14:
- [validação dos resultados + ações de longo prazo]

### Métricas a monitorar diariamente:
- [3-5 métricas com threshold de alerta]

**PASSO 6 — DECISÃO ESTRUTURAL**

Baseado no diagnóstico, recomendar:

### Cenário A — Otimizar
Se a fundação está OK (pixel, público, oferta), só ajustar criativo/lance. Manter aprendizado.

### Cenário B — Refatorar parcialmente
Se 1-2 camadas estão críticas, reestruturar essas partes mantendo o resto.

### Cenário C — Reset estratégico
Se múltiplas camadas críticas + dados não confiáveis (pixel quebrado, atribuição errada), parar e remontar com fundação correta.

**PASSO 7 — ALERTAS DE ATENÇÃO**

Riscos que podem invalidar a auditoria:
- Sazonalidade do nicho?
- Mudança recente no produto/preço/oferta?
- Concorrência subiu budget?
- iOS 14+ afetando atribuição?
- Algoritmo em ajuste pós-update?

**PASSO 8 — RESUMO EXECUTIVO**

Pra quem só vai ler 1 parágrafo:

"Sua campanha está com ROAS de [X] vs break-even de [Y]. O gargalo principal está em [camada], com [métrica] em [valor] vs benchmark de [faixa]. A causa raiz é [diagnóstico]. As 3 ações priorizadas são: (1) [ação]; (2) [ação]; (3) [ação]. Resultado esperado em 14 dias: ROAS subindo pra [valor]."

```

## Benchmarks por nicho (referência geral — ajustar conforme conta)

### E-commerce ticket baixo (R$30-100)
- CPM: R$15-30
- CTR (link): 1.0-2.0%
- CVR: 1.5-3%
- ROAS-alvo: 2.5-4x

### E-commerce ticket médio (R$100-400)
- CPM: R$20-40
- CTR: 0.8-1.5%
- CVR: 1-2.5%
- ROAS-alvo: 2-3x

### E-commerce ticket alto (R$400+)
- CPM: R$25-60
- CTR: 0.6-1.2%
- CVR: 0.5-1.5%
- ROAS-alvo: 1.8-3x

### Infoproduto low ticket (R$47-197)
- CPM: R$12-25
- CTR: 1.2-2.5%
- CVR (LP): 4-12%
- ROAS-alvo: 2-4x

### Infoproduto high ticket (R$1k+)
- CPM: R$15-30
- CTR: 1.0-2.0%
- CVR (lead): 8-20%
- Custo por lead: R$10-50

Ajuste pelo seu produto e mercado — benchmarks gerais erram em casos específicos.

## Os 7 erros que travam campanhas (do mais comum ao menos)

**1. Pixel quebrado/incompleto.** Eventos não disparando ou disparando duplicado. Algoritmo otimiza com base em sinal errado. Verificação SEMPRE antes de qualquer outra coisa.

**2. Sobreposição de público.** 3-4 conjuntos disputando mesmo público no leilão. CPM artificialmente alto. Resolver com auditoria de overlap (ferramenta no gerenciador).

**3. Otimização do evento errado.** Conta com baixo volume otimizando pra Purchase quando deveria otimizar pra IC ou ATC. Algoritmo nunca aprende.

**4. Janela de atribuição inadequada.** Produto de alto ticket com janela 1d-click perde 40-60% das conversões reais. Sobe pra 7d-click + CAPI ou subestima ROAS.

**5. Fadiga sem rotação.** Frequência > 4 sem novo criativo. Performance cai progressivamente, gestor culpa "algoritmo" quando é desgaste de criativo.

**6. Mudança recente sem teste.** Trocou criativo + público + oferta no mesmo dia. Impossível saber o que causou queda. Mudança incremental sempre.

**7. Comparação com benchmark errado.** Comparar ROAS de e-commerce ticket alto com infoproduto. Cada nicho tem realidade própria.

## Sinais de auditoria mal feita

- Recomenda "refazer tudo" sem identificar camada quebrada
- Não menciona break-even ROAS do produto
- Não verifica pixel/CAPI antes de propor mudança
- Lista 20 itens sem priorização
- Não dá prazo de execução nem resultado esperado
- Compara com benchmark genérico ("CTR ideal é 2%")
- Não considera histórico (campanha funcionou antes?)

## Sinais de auditoria boa

- Identifica UMA camada principal como gargalo
- Cita 2-3 ações com impacto estimado em %
- Verifica fundação técnica antes de mudar criativo
- Reconhece quando aprendizado existente deve ser preservado
- Tem plano de 14 dias com checkpoints
- Diferencia "problema agora" de "problema estrutural pra resolver depois"

## Quando a auditoria sugere PAUSAR a campanha

- ROAS abaixo de 50% do break-even por 14+ dias
- Pixel comprovadamente quebrado (dado não confiável)
- Mudança grave de produto/preço sem reflexo na conta
- Aprendizado de meses contaminado (precisa zerar)

Pausar não é fracasso — é parar de queimar dinheiro enquanto reorganiza fundação.

---
**Camada adicional — auditoria recorrente:** Auditoria não é evento único. Pra contas grandes (R$50k+/mês), faça auditoria leve QUINZENAL (15 min, 5 métricas) e profunda MENSAL. Pra contas médias, mensal leve + trimestral profunda. Conta sem auditoria recorrente entra em "drift": pequenas degradações se acumulam por meses até virar crise. Auditoria recorrente é manutenção, não emergência.
