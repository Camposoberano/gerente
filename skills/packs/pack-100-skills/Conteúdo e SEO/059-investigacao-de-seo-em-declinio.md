---
name: investigacao-de-seo-em-declinio
description: Diagnostica queda de tráfego orgânico no Google usando árvore de decisão sistemática — separa queda real de sazonalidade, queda geral de queda de páginas específicas, algoritmo de problema técnico de mudança de conteúdo. Entrega hipóteses rankeadas por probabilidade, checklist de investigação, plano de recuperação priorizado por impacto e timeline realista. Vai além de "seu SEO caiu" — identifica a causa raiz. Acione sempre que mencionar: queda de tráfego, SEO caindo, Google Update, Core Update, Helpful Content, "minha página sumiu", perdi posição, páginas desindexadas, tráfego orgânico despencando, traffic drop — mesmo sem citar "diagnóstico".
---

# Investigação de SEO em Declínio

Queda de tráfego orgânico raramente tem causa única. É camadas — algoritmo + conteúdo + técnico + concorrência + sazonalidade — interagindo. Diagnóstico ruim corrige uma camada errada, ignora a certa, e a queda continua (às vezes piora).

Diagnóstico sistemático segue árvore de decisão rigorosa:

1. **A queda é real ou é sazonalidade/artefato?**
2. **É geral ou de páginas específicas?**
3. **Coincide com update do Google conhecido?**
4. **Houve mudança no site (técnico, conteúdo, estrutura)?**
5. **Concorrência mudou (novos entrantes, update de páginas)?**

Cada "sim" abre um ramo diferente de investigação.

## Os 5 tipos de queda (com causas distintas)

| Tipo | Sintoma | Causa provável |
|------|---------|----------------|
| Queda aguda geral | -30% em 1-2 semanas | Core Update / penalização |
| Queda aguda de páginas específicas | Páginas antes top 3 agora na página 3+ | Update de qualidade/Helpful Content |
| Queda progressiva (meses) | -5% ao mês por 3-6 meses | Concorrência + entropia de conteúdo |
| Queda sazonal | -40% em período específico anualmente | Sazonalidade do nicho |
| Queda técnica | De um dia pro outro, drástica | Bug de indexação / robots.txt / migração |

Cada tipo pede investigação e correção diferentes.

## O Prompt

```
Você é consultor de SEO especializado em diagnóstico de quedas. Você sabe que 80% das quedas têm múltiplas camadas causando — tratar uma só raramente recupera tudo.

Sua abordagem é sistemática: hipóteses rankeadas por probabilidade, evidência pra cada uma, plano de ação priorizado por impacto, timeline honesta de recuperação.

**CONTEXTO:**

*Site*
- URL: [link]
- Tipo: [blog / e-commerce / SaaS / institucional / portal de conteúdo]
- Setor: [qual]
- Idade do domínio: [meses/anos]
- Autoridade aproximada: [DA / DR — alto/médio/baixo]

*A queda*
- Quando começou: [data]
- Magnitude: [% de queda em tráfego orgânico]
- Está estabilizada ou continua caindo: [qual]
- Período comparativo (de/para): [ex: "janeiro = 50k visitas, março = 32k"]

*Onde afetou*
- Queda é em: [todo o site / páginas específicas / keywords específicas]
- Páginas principais afetadas: [se souber — URLs]
- Páginas que MANTIVERAM posição: [se houver — contexto importante]

*Possíveis causas*
- Mudanças no site no período: [redesign / migração / mudança de CMS / mudança de estrutura / consolidação de conteúdo]
- Updates do Google no período: [Core Update / Helpful Content / Spam Update — checar histórico no Google Search Central]
- Mudanças na concorrência: [novos entrantes / concorrente big-brand entrou / consolidação]
- Mudanças em ferramentas (analytics): [migração de UA pra GA4, mudança de ferramenta]

*Dados disponíveis*
- Acesso ao Google Search Console: [sim/não]
- Acesso ao Google Analytics: [sim/não]
- Histórico de posições (Ahrefs/Semrush): [sim/não]
- Backups do site: [sim/não]

*Contexto*
- O que a equipe já tentou sem sucesso: [se algo foi feito]
- Impacto em receita: [estimativa — tráfego orgânico gerava R$ X/mês]

---

**PASSO 1 — TRIAGEM INICIAL (árvore de decisão)**

Antes de hipóteses, responda em sequência:

### Checagem A: A queda é real?
- Comparou com mesmo período ano anterior? Pode ser sazonalidade.
- GA4 configurado corretamente? (migração UA→GA4 gerou muitas falsas quedas)
- Filtro de dados mudou (região, dispositivo, excluiu bot antes e agora não)?

Se sim pra qualquer: **investigue artefato antes de tratar causa**.

### Checagem B: É geral ou páginas específicas?
- Todas páginas perderam proporcionalmente: causa sistêmica (algoritmo, técnico)
- Só páginas específicas: causa de qualidade de conteúdo ou saturação de keyword
- Páginas informativas caíram, comerciais mantiveram: clássico de Helpful Content

### Checagem C: Coincide com update do Google?
- Data da queda coincide (±7 dias) com update conhecido? Core/Helpful/Spam/Reviews?
- Consultar: Google Search Central Blog, MozCast, SEMrush Sensor

### Checagem D: Houve mudança no site?
- Redesign/migração no período: tecnico é suspeito #1
- Mudança de URL (sem redirect 301): perda direta
- Mudança de estrutura de menu/header: pode ter alterado signal pro Google
- Consolidação de páginas: pode ter concentrado autoridade ou diluído

### Checagem E: Concorrência mudou?
- Novos concorrentes bigger-brand entraram no nicho?
- Concorrente atual publicou conteúdo melhor?
- Agregadores/portais (Wikipédia, Reddit, Quora) subiram na keyword?

**PASSO 2 — HIPÓTESES RANKEADAS**

Com base na triagem, entregue 3-5 hipóteses ordenadas por probabilidade:

### Hipótese #1 (mais provável): [causa]
- **Evidência**: [dado que suporta]
- **Probabilidade**: [alta/média/baixa]
- **Impacto estimado na queda**: [% da queda atribuível a isso]
- **Como confirmar**: [teste específico]

### Hipótese #2:
[idem]

### Hipótese #3:
[idem]

**PASSO 3 — CHECKLIST DE INVESTIGAÇÃO**

Pra cada hipótese, ações de investigação concretas:

### Investigação técnica:
- [ ] Rodar auditoria técnica (Screaming Frog, Sitebulb)
- [ ] Checar cobertura no GSC (páginas indexadas vs bloqueadas)
- [ ] Verificar robots.txt (bloqueio acidental?)
- [ ] Verificar sitemap.xml atualizado
- [ ] Checar Core Web Vitals (pode ter piorado)
- [ ] Checar mobile usability
- [ ] Buscar erros de servidor (5xx) no período

### Investigação de conteúdo:
- [ ] Top 10 páginas afetadas — o que têm em comum?
- [ ] Conteúdo é thin (pouco profundo)?
- [ ] Falta de E-E-A-T (autoria, experiência pessoal)?
- [ ] Keyword canibalizada (2+ páginas competindo entre si)?
- [ ] Conteúdo desatualizado vs concorrentes que mantiveram?

### Investigação de algoritmo:
- [ ] Data da queda bate com update conhecido?
- [ ] Outros sites do mesmo nicho afetados? (consultar comunidades SEO)
- [ ] Qual update especificamente: Core / Helpful / Spam / Reviews?
- [ ] Características do update (quem ganhou, quem perdeu)

### Investigação de concorrência:
- [ ] Analisar top 3 das keywords principais — mudou?
- [ ] Ahrefs/Semrush: competitors ganhando tráfego no mesmo período
- [ ] Backlinks perdidos no período

**PASSO 4 — DIAGNÓSTICO CONSOLIDADO**

Com base nas investigações, declare:

### Diagnóstico principal:
- Causa raiz identificada: [X]
- Causas secundárias: [Y, Z]
- % de confiança: [alta/média/baixa]

### Impacto:
- Tráfego perdido estimado: [X visitas/mês]
- Impacto em receita: [R$ se mensurável]
- Páginas mais afetadas: [top 10]

**PASSO 5 — PLANO DE RECUPERAÇÃO**

Priorização por impacto + esforço:

### Ações imediatas (1-2 semanas):
1. [Ação específica — se causa técnica, corrigir]
2. [Reverter mudança prejudicial se aplicável]
3. [Submissão de páginas corrigidas pro GSC]

### Ações de médio prazo (1-2 meses):
1. [Reescrever top 10 páginas afetadas com E-E-A-T]
2. [Adicionar seções de autoria e experiência]
3. [Atualizar dados desatualizados]
4. [Melhorar Core Web Vitals se pior]

### Ações de longo prazo (3-6 meses):
1. [Estratégia de link building pra recuperar autoridade]
2. [Criação de conteúdo novo que supere os concorrentes]
3. [Repositioning em nichos de menor concorrência]

**PASSO 6 — PREVENÇÃO**

Pra não acontecer de novo:

- [ ] Backup de páginas top antes de qualquer mudança grande
- [ ] Staging antes de deploy em produção
- [ ] Monitoramento ativo de GSC (alertas de queda)
- [ ] Auditoria técnica trimestral
- [ ] Atualização de conteúdo top a cada 6 meses
- [ ] Diversificação de tráfego (não depender só de orgânico)

**PASSO 7 — TIMELINE DE RECUPERAÇÃO REALISTA**

Não prometa mágica:

### Se causa é técnica:
- 1-4 semanas pra recuperar parcialmente
- Quanto mais rápido corrigir, mais rápido recupera
- Erros de indexação: recuperação de 1-2 semanas após correção

### Se causa é Core Update:
- 2-6 meses pra recuperação significativa
- Próximo Core Update (3-6 meses) pode reavaliar
- Requer mudanças substanciais de conteúdo, não ajustes pontuais

### Se causa é Helpful Content:
- 3-9 meses
- Mudanças profundas em E-E-A-T
- Pode exigir reescrita de dezenas/centenas de páginas

### Se causa é concorrência/saturação:
- 6-12 meses
- Requer estratégia de conteúdo mais forte
- Às vezes requer pivô de keywords

**PASSO 8 — QUANDO ACEITAR A PERDA**

Em alguns casos, recuperar tráfego perdido é inviável ou caro demais:

- Keyword dominada por big-brand consolidada
- Nicho saturado por agregadores
- Google priorizou formato que seu site não comporta
- Custo de recuperação > valor do tráfego

Nesses casos: **pivote pra outras keywords, outros formatos, outros canais**. Aceitar perda e redirecionar esforço é decisão estratégica.

**PASSO 9 — MONITORAMENTO PÓS-IMPLEMENTAÇÃO**

Depois de implementar correções:

- GSC: posição média das páginas corrigidas (semanal)
- GA4: tráfego orgânico total + páginas específicas (semanal)
- Analytics: conversões atribuídas a orgânico
- Alertas: queda adicional dispara investigação imediata

### Sinais de recuperação:
- Páginas reindexadas aparecendo nas queries originais
- Posição média subindo (mesmo sem chegar ao anterior)
- Tráfego estabilizando, depois subindo
- CTR melhorando (correção bem-sucedida)
```

## Regras da investigação que recupera

**1. Causa raiz > sintoma.** Tratar "páginas caíram" sem entender por quê = tentativa e erro sem fim.

**2. Multi-camadas é regra, não exceção.** Queda "só por causa do update" costuma ter componente técnico também.

**3. Timeline honesta é profissionalismo.** Prometer recuperação em 2 semanas quando é caso de Core Update destrói credibilidade.

**4. Backups e staging evitam metade dos problemas.** Muita queda vem de mudanças no site feitas sem precaução.

**5. Às vezes a perda é aceita.** Investir R$50k pra recuperar tráfego que gera R$20k é decisão ruim.

## Erros que atrasam a recuperação

- Agir antes de diagnosticar (corrigir coisa errada)
- Ignorar data de coincidência com updates conhecidos
- Fazer muitas mudanças ao mesmo tempo (impossível saber o que ajudou)
- Desistir cedo demais (recuperação leva meses)
- Aceitar qualquer sugestão de "especialista" sem investigar causa específica

## Ferramentas úteis

- **Google Search Console**: dados de origem
- **Google Analytics 4**: dados de comportamento
- **Screaming Frog / Sitebulb**: auditoria técnica
- **Ahrefs / Semrush**: posições históricas, concorrência, backlinks
- **MozCast / SEMrush Sensor**: detectar volatilidade de SERP (indicam updates)
- **Wayback Machine**: ver versões antigas de páginas

## Sinais de recuperação vindo

- Posição média começa a subir 2-3 semanas após correção
- CTR melhora (sinaliza que o Google tá revalidando a página)
- Páginas reindexadas aparecendo em queries relevantes
- Tráfego estabilizou (parou de cair) — primeira vitória
- Novas impressões em keywords que você otimizou

## Alerta sobre "recuperação total"

Recuperação total ao nível pré-queda é raro quando causa é algoritmo. O mais comum é:
- 50-70% do tráfego perdido recuperado em 3-6 meses
- Restante precisa de estratégia nova de conteúdo/keywords
- Crescimento a partir do novo patamar

Gestão de expectativa honesta é parte do trabalho.

---
**Movimento de resiliência:** Depois de recuperar, implemente **sistema de early warning**: alertas automáticos no GSC pra quedas acima de 15% em qualquer página-chave. Queda detectada em dias, não meses, corrige com custo muito menor. Negócios maduros têm SEO como sistema monitorado — não como projeto que você revisita a cada trimestre.
