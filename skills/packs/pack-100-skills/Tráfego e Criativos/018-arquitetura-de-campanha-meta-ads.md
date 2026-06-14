---
name: arquitetura-de-campanha-meta-ads
description: Planeja a estrutura completa de campanhas Facebook e Instagram Ads — conta, campanhas, conjuntos e anúncios — calibrada pelo objetivo, budget, modelo de negócio e temperatura de público. Inclui quando usar CBO vs ABO, como segmentar público, quantos criativos por conjunto, cronograma de escalada e diagnóstico de fadiga. Acione sempre que mencionar: campanha Meta Ads, estrutura de campanha Facebook, Instagram Ads, Gerenciador de Anúncios, "montar campanha", "escalar anúncios", "campanha não tá funcionando", tráfego pago Meta, briefing pra gestor de tráfego, CBO, ABO — mesmo sem usar "arquitetura".
---

# Arquitetura de Campanha Meta Ads

Campanha Meta Ads é bem mais arquitetura que criativo. A maioria dos gestores foca 80% do tempo em criativo e 20% em estrutura — quando deveria ser o contrário nos primeiros 30 dias de uma conta nova.

Estrutura ruim mata campanha boa. Estrutura boa salva campanha mediana. Entender isso é a diferença entre CPA R$50 e CPA R$200 no mesmo produto.

## Os 4 erros estruturais que afundam contas novas

1. **Muitos conjuntos com budget baixo** — o algoritmo não tem amostra pra otimizar
2. **ABO quando deveria ser CBO (ou vice-versa)** — budget mal distribuído
3. **Públicos muito sobrepostos** — conjuntos competindo no próprio leilão
4. **Escalada cedo demais ou tarde demais** — fadiga acelerada ou oportunidade desperdiçada

A arquitetura correta evita os 4 antes do primeiro real ser gasto.

## CBO vs ABO — a decisão que mais impacta

| Use CBO (Campaign Budget Optimization) quando | Use ABO (Ad Set Budget Optimization) quando |
|----------------------------------------------|-------------------------------------------|
| Tem pouco histórico de pixel / conta nova | Quer controle fino de budget por público |
| Quer que o Meta encontre o melhor público automaticamente | Tá testando públicos novos contra vencedores |
| Orçamento total é baixo-médio (< R$300/dia) | Orçamento grande permite testes paralelos |
| Múltiplos conjuntos que vão competir naturalmente | Quer garantir que cada público teste um criativo |

Na maioria dos casos em 2024-2026, CBO é o default mais seguro pra contas pequenas e médias. ABO vira útil quando você quer proteger testes específicos de serem apagados pelo algoritmo.

## O Prompt

```
Você é gestor de tráfego pago com passagem em contas de R$50k/mês a R$1M/mês em ad spend no Meta. Você entende que estrutura de campanha é arquitetura antes de ser criativo — e que escolhas erradas nessa camada custam 30-60% de performance sem o dono da conta entender por quê.

Seu trabalho é desenhar a estrutura inteira — e defender as decisões.

**CONTEXTO:**

*Oferta*
- Produto/serviço: [descreva]
- Ticket ou faixa: [R$]
- Objetivo de conversão: [compra / lead / mensagem / instalação app / outro]
- Destino: [LP / WhatsApp / checkout direto / app / Messenger]
- Valor do evento de conversão (pra ROAS): [R$]

*Público*
- Perfil amplo: [demografia + psicografia]
- Temperatura atual: [majoritariamente frio / misto / maioria retargeting]
- Histórico do pixel: [nenhum / pouco (< 50 conversões nos últimos 30 dias) / consolidado (> 100 conversões) / maduro (> 500)]
- Interesses relevantes: [3-7 interesses que fazem sentido]
- Bases customizadas disponíveis: [site visitors / engajamento orgânico / lista de clientes / compradores]

*Orçamento*
- Budget diário disponível: [R$]
- Horizonte: [teste de 2 semanas / 1 mês / contínuo]
- Meta de CPA: [custo por aquisição que torna o negócio viável]
- Meta de ROAS: [se aplicável]

*Criativo*
- Quantos criativos prontos: [liste]
- Formatos disponíveis: [imagem / carrossel / vídeo curto / vídeo longo]
- Capacidade de produzir mais: [fácil / difícil / impossível no curto prazo]

*Experiência da conta*
- Idade da conta: [nova (<90 dias) / média / consolidada (> 1 ano com boa saúde)]
- Eventos rastreados: [Pixel + CAPI? quais eventos?]
- Posições sazonais no Meta: [banida recentemente? restrição? limite de verba?]

---

**PASSO 1 — DIAGNÓSTICO DA ARQUITETURA ÓTIMA**

Declare:
- CBO ou ABO pra este caso (+ justificativa em 2 frases)
- Quantas campanhas ter (geralmente 2-4 pra conta iniciante)
- Quantos conjuntos por campanha (regra de ouro: 3-5 conjuntos por campanha, nunca mais que 8)
- Quantos criativos por conjunto (default: 3-5, nunca menos que 2)
- Budget mínimo por conjunto (regra: orçamento suficiente pra o Meta coletar 50 conversões/semana, ou não saia da fase de aprendizado)

**PASSO 2 — ESTRUTURA COMPLETA DE CAMPANHAS**

### CAMPANHA 1 — Prospecção (público frio)

**Objetivo**: [conversão / tráfego / mensagem — conforme contexto]
**Tipo**: CBO ou ABO (definido no passo 1)
**Budget diário**: [R$]

**Conjunto 1.1 — [nome tático]**
- Público: [descreva segmentação específica]
- Posicionamentos: [Feed / Stories / Reels / todos manual]
- Criativos: [quais — descreva resumidamente]
- Hipótese: "Acredito que esse público vai converter porque..."

**Conjunto 1.2 — [nome]**
[mesma estrutura]

**Conjunto 1.3 — [nome]**
[mesma estrutura]

### CAMPANHA 2 — Remarketing (público morno/quente)

[mesma estrutura]

### CAMPANHA 3 (se aplicável) — Lookalike

[mesma estrutura — quando já tem base suficiente pra treinar lookalike decente]

---

**PASSO 3 — CONFIGURAÇÕES TÉCNICAS CRÍTICAS**

- **Janela de conversão**: 7 dias clique / 1 dia view recomendado pra maioria dos casos
- **Otimização de entrega**: conforme objetivo (Conversões pra funil direto, Tráfego pra alto de funil com LP simples)
- **Exclusões entre conjuntos**: liste explicitamente (prospecção exclui retargeting, retargeting exclui compradores)
- **Schedule**: campanha 24/7 ou horário específico (default: 24/7; horário específico só faz sentido em contextos B2B ou com dados claros de que o público compra só em horário x)
- **CAPI (Conversion API)**: se não tem configurado, parar tudo e configurar antes — em 2026 sem CAPI é voar cego

**PASSO 4 — CRIATIVO POR FASE DO FUNIL**

### Para prospecção (público frio)
- 1 criativo de problema/dor (UGC ou falando pra câmera)
- 1 criativo de benefício direto (resultado mostrado)
- 1 criativo de prova social (depoimento / antes-depois / números)
- Todos com CTA claro e message match com LP

### Para remarketing (público morno/quente)
- 1 criativo de objeção (trata a dúvida mais comum)
- 1 criativo de escassez/urgência (se houver oferta tempo-limitada real)
- 1 criativo de depoimento/prova concreta

Formatos recomendados por posicionamento (Feed: vídeo curto + imagem; Reels/Stories: vídeo vertical 9:16 nativo; Explore: imagem estática funciona bem aqui).

**PASSO 5 — CRONOGRAMA DE OTIMIZAÇÃO**

- **Dias 1-3**: Fase de aprendizagem. NÃO mexer em nada. Respirar. O Meta precisa de amostra.
- **Dias 4-7**: Primeira avaliação. Pausar conjuntos com CPA 2x+ acima da média. Manter vencedores.
- **Dias 8-14**: Segunda rodada. Clonar vencedores com novo criativo (evitar fadiga precoce).
- **Dias 15-30**: Escalada gradual (aumentos de 20-30% no budget dos vencedores a cada 2-3 dias, nunca dobrar de uma vez — reseta aprendizado).
- **Mês 2**: Otimização de criativo contínua. Novos criativos a cada 7-14 dias pra combater fadiga.

**PASSO 6 — DIAGNÓSTICO DE PROBLEMAS**

Cenários mais comuns + o que fazer:

- **Conjunto não sai da fase de aprendizado** (< 50 conversões/semana): budget baixo ou público pequeno demais
- **CPA explode depois de 2 semanas**: fadiga de criativo — introduza novas variações
- **Frequência > 3 em < 7 dias**: público pequeno ou saturação — amplie audiência
- **CTR alto + conversão baixa**: criativo atraente mas LP ou oferta quebrada
- **CTR baixo**: criativo não conecta com público — troca hook

**PASSO 7 — MÉTRICAS E KPIS**

Por etapa:

- **Prospecção**: CPC, CTR, CPL ou CPA, CPM
- **Remarketing**: CPA, Frequência (alerta se > 3), ROAS
- **Conta global**: ROAS acumulado, ticket médio, margem

Benchmarks orientativos (Brasil, 2026):
- CPM: R$15-45 (varia muito por nicho)
- CTR feed: 1.5-3% saudável
- CTR reels/stories: 0.8-2% saudável
- CPA: muito variável por produto — use o seu próprio histórico

**PASSO 8 — PROJEÇÃO REALISTA**

Dado budget + estrutura + benchmarks:
- Leads esperados/dia e /mês
- Vendas esperadas/mês
- CPA esperado nos primeiros 30 dias vs depois da otimização
- Quando a conta tende a "maturar" (geralmente 60-90 dias)
- Sinais de que a estrutura tá errada e precisa de redesign
```

## Regras que aumentam CAC em vez de baixar

**1. Nunca mexa na fase de aprendizado.** Aumentar budget, mudar criativo, mexer em público — tudo isso reseta o aprendizado. Os primeiros 3 dias são do algoritmo, não seus.

**2. Menos conjuntos performam melhor.** 20 conjuntos com R$20/dia cada = 20 campanhas sem amostra pra otimizar. 4 conjuntos com R$100/dia cada = algoritmo com comida suficiente pra achar padrões.

**3. Cada conjunto precisa de 50 conversões/semana pra sair do aprendizado.** Se não atinge, ou aumenta budget ou pausa e consolida.

**4. Fadiga é certa, não surpresa.** Todo criativo fadiga em 3-14 dias dependendo do público. Planeje rotação de criativos como parte do cronograma, não como reação à queda.

**5. CAPI é obrigatório em 2026.** Configuração só via Pixel perde 30-50% dos dados de conversão. Sem CAPI, o Meta otimiza no escuro.

## Erros que matam contas em menos de 90 dias

- Criar 15 conjuntos com budget de R$10/dia cada (morte por inanição de dados)
- Mudar estratégia toda semana (conta nunca estabiliza)
- Pausar conjunto após 2 dias porque "não tá vendendo" (ele ainda tá aprendendo)
- Não rodar CAPI (conta nasce cega)
- Sobrepor públicos de 80%+ entre conjuntos (concorrência interna)

## Sinais de estrutura saudável

- CPA estabiliza ou cai após as 4-6 semanas iniciais
- Frequência se mantém < 3 em público de prospecção
- ROAS do blended (contas + remarketing) supera meta ao longo de 30 dias
- Novo criativo introduzido performa em 2-3 dias (sinal de que a conta aprendeu o padrão certo)

---
**Movimento avançado:** Todo mês, separe 10-15% do budget pra "teste livre" — criativos ou públicos novos sem validação anterior. Os outros 85% vão pros vencedores. Essa disciplina de exploration vs exploitation é o que separa contas que escalam de contas que estagnam em 6 meses.
