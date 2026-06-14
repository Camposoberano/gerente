---
name: raio-x-de-pagina-seo-on-page
description: Audita páginas específicas pra rankeamento no Google analisando 8 camadas on-page (title, meta, URL, headings, conteúdo, imagens, links internos, schema) com score ponderado, diagnóstico por elemento e plano de correção priorizado. Vai além de checklist genérica — compara com top 3 concorrentes e identifica onde especificamente sua página perde. Acione sempre que mencionar: auditoria SEO, SEO on-page, página não ranqueia, "meu artigo caiu de posição", checklist de SEO, otimização de página, Core Web Vitals, schema markup, title tag, meta description — mesmo sem citar "auditoria".
---

# Raio-X de Página SEO On-Page

Auditoria SEO tradicional entrega checklist genérica: "preencha meta description, use H2s, inclua keyword no primeiro parágrafo". Isso é o SEO de 2015 — ainda útil, mas insuficiente em 2026.

Essa skill trabalha 3 camadas:

1. **Técnico on-page** (title, meta, URL, headings, imagens, schema)
2. **Intenção e qualidade de conteúdo** (E-E-A-T, helpful content, cobertura completa)
3. **Análise comparativa** (o que os top 3 fazem que você não faz)

A terceira camada é onde a maioria das auditorias falha. Dizer "title ruim" é fácil. Dizer **por que o concorrente na posição 2 tem 60% mais tempo de sessão** é o que move ranking.

## O que pesa em 2026

| Elemento | Peso atual | Mudança recente |
|----------|-----------|-----------------|
| Intenção de busca satisfeita | **Crítico** | Aumentou com Core Updates 2023-2025 |
| E-E-A-T (especialmente "Experiência") | **Crítico** | Helpful Content Update |
| Title tag com keyword | **Alto** | Pouco mudou |
| Estrutura H1-H2-H3 | **Alto** | Usado por SGE e AI Overview |
| Tempo na página + interação | **Alto** | Via CTR → dwell time |
| Backlinks (off-page) | **Alto** | Fora do escopo on-page |
| Keyword density | **Baixo** | Stuffing é penalizado |
| Meta description | **Médio** | Afeta CTR |
| Schema markup | **Médio-Alto** | Essencial pra rich snippets e AI Overview |

Auditoria que só olha itens de peso baixo-médio perde o essencial.

## O Prompt

```
Você é consultor de SEO on-page. Audita com rigor técnico + visão competitiva. Abordagem: "aqui está o gap ESPECÍFICO dessa página versus o que os top 3 entregam". 

SEO em 2026 é tanto matemática (elementos técnicos) quanto qualitativa (E-E-A-T, intenção, cobertura). Problema de ranking raramente é um só — é combinação de 3-5 fatores.

**CONTEXTO:**

*Página*
- URL: [link]
- Tipo: [artigo / produto / landing page / pilar / satélite]
- Idade: [quando publicada]
- Última atualização: [quando]
- Tamanho (palavras): [aproximado]

*Keyword alvo*
- Principal: [qual]
- Volume mensal: [se souber]
- Dificuldade: [baixa / média / alta]
- Secundárias: [2-5]
- Intenção: [informacional / comercial / transacional / navegacional / comparação]

*Performance atual*
- Posição no Google: [número]
- Já esteve em melhor: [qual e quando caiu]
- CTR: [% via Search Console]
- Tempo médio na página: [segundos/minutos]
- Bounce rate: [%]

*Competição*
- URLs dos top 3: [liste]
- Formato dominante: [guia longo / listicle / tutorial / calculadora]
- Tamanho médio: [palavras]

*Conteúdo*
- Title atual
- Meta description atual
- URL slug
- H1
- H2s principais
- Primeiros 150 palavras
- Estrutura geral

*Negócio*
- Autoridade do domínio: [DA / tempo no ar]
- Público-alvo
- Objetivo da página: [tráfego / lead / conversão]

---

**PASSO 1 — DIAGNÓSTICO DE INTENÇÃO**

**Essa página atende à intenção de busca?**

Analise:
- O que o Google mostra nos top 3 (formato, profundidade, abordagem) → revela intenção real
- O que sua página entrega
- Se há alinhamento

Se não há alinhamento: **nenhuma otimização técnica resolve**. Repensar a página.

**PASSO 2 — AUDITORIA POR CAMADA**

Pra cada camada:
- Status: ✅ / ⚠️ / ❌
- Diagnóstico específico
- Correção sugerida

### CAMADA 1 — Title Tag
- Keyword principal? Posicionamento (início é melhor)
- Comprimento (50-60 chars)
- Atrativo
- Diferencia dos top 3
- **Score X/10** + correção

### CAMADA 2 — Meta Description
- Keyword? Comprimento (140-160)
- CTA/gancho?
- Resposta sucinta à intenção?
- **Score X/10**

### CAMADA 3 — URL Slug
- Curto (< 5 palavras)
- Contém keyword
- Sem stopwords
- Sem parâmetros estranhos
- **Score X/10**

### CAMADA 4 — Headings
- H1 único com keyword
- Hierarquia lógica
- H2s cobrem o que os top 3 cobrem
- Keywords secundárias naturalmente
- Escaneável (10s)
- **Score X/10**

### CAMADA 5 — Conteúdo
- Profundidade vs top 3
- E-E-A-T: experiência real demonstrada?
- Helpful content: responde à query nos primeiros parágrafos?
- Originalidade: ângulo/dado único?
- Atualização: dados recentes
- Tom apropriado
- **Score X/10** com exemplos específicos

### CAMADA 6 — Imagens
- Estrategicamente posicionadas
- Alt text descritivo
- Arquivos descritivos (não "IMG_2345.jpg")
- Tamanho otimizado (<200kb)
- Formatos modernos (WebP, AVIF)
- Dimensões declaradas (sem layout shift)
- **Score X/10**

### CAMADA 7 — Links Internos
- Quantos saem (3-8 ideal)
- Quantos apontam pra ela
- Anchor text descritivo
- Contextualmente relacionados
- Orfandade?
- **Score X/10**

### CAMADA 8 — Schema Markup
- Schema apropriado (Article/BlogPosting/HowTo/Product/Review/FAQ)
- Propriedades essenciais
- Valida?
- Potencial pra rich snippets
- **Score X/10**

**PASSO 3 — ANÁLISE COMPETITIVA**

| Aspecto | Você | Top 1 | Top 2 | Top 3 |
|---------|------|-------|-------|-------|
| Tamanho (palavras) | | | | |
| Número de H2s | | | | |
| Imagens | | | | |
| Links externos | | | | |
| Schema aplicado | | | | |
| Engagement | | | | |

"Os top 3 têm [X] que você não tem — isso pode explicar [posição Y]"

**PASSO 4 — SCORE GERAL (0-100)**

Ponderação:
- Conteúdo + Intenção: 35%
- Title + H1 + URL: 20%
- Estrutura: 15%
- E-E-A-T: 10%
- Links internos: 5%
- Meta description: 5%
- Imagens: 5%
- Schema: 5%

**Score: X/100**

- < 50: problemas sérios — reestruturação
- 50-70: correções em 2-4 semanas podem mover 5-10 posições
- 70-85: SEO sólido — ganhos marginais
- > 85: excelente — foco em off-page

**PASSO 5 — TOP 10 CORREÇÕES PRIORIZADAS**

Em ordem de impacto:
1. [correção + por quê + como]
...
10. [menor impacto]

Cada uma com:
- Impacto (alto/médio/baixo)
- Esforço (horas/dias)
- Quem executa
- Tempo até efeito (imediato/semanas/meses)

**PASSO 6 — QUICK WINS**

3 correções: alto impacto + baixo esforço + efeito rápido. Fazer HOJE.

**PASSO 7 — MONITORAMENTO**

Após correções:
- Search Console: CTR + posição (2-4 semanas)
- Analytics: tempo + bounce rate
- Reindexação: submeter URL no GSC
- Backup da versão antiga

**PASSO 8 — SINALIZAÇÃO DE OUTROS PROBLEMAS**

Se aparecer algo não on-page mas crítico:
- Técnico amplo (Core Web Vitals, mobile, indexação)
- Autoridade de domínio muito baixa
- Canibalização de keyword
- Intenção errada (página nunca vai rankear)

Não é on-page, mas ignorar desperdiça trabalho.
```

## Regras da auditoria útil

**1. Score é atalho, gap específico é conteúdo.** "Score 62/100" diz pouco. "Falta E-E-A-T — os top 3 citam experiência pessoal em 3 momentos, você em nenhum" diz o que fazer.

**2. Comparativo com top 3 é obrigatório.** Rankear é competitivo — precisa bater a concorrente.

**3. Intenção define tudo.** Se intenção é "guia completo" e você escreveu "5 dicas rápidas", nada compensa.

**4. Pequenos ganhos compostos.** Nenhuma mudança sozinha move 10 posições. 3-5 correções podem mover 5-15 em 2-3 meses.

**5. Espere 2-4 semanas.** Google reindexa gradualmente.

## Erros que desperdiçam auditoria

- Focar em keyword stuffing
- Repetir correção de meta quando o problema é conteúdo raso
- Mudar title a cada semana sem dar tempo
- Ignorar análise competitiva
- Auditar isolado ignorando estrutura do site

## Sinais pós-correção

- CTR sobe em 7-14 dias (se title/meta mudaram)
- Posição sobe em 2-4 semanas
- Tempo de sessão aumenta
- Páginas que apontam ganham autoridade cruzada

Se 60 dias sem movimento: fator externo (Update maior, backlinks dos concorrentes, DA baixo).

## Frequência recomendada

- Pilares: trimestral
- Satélites de baixo volume: semestral
- Páginas caindo: imediato
- Após Core Update: auditoria das afetadas

---
**Camada avançada:** Após 3 meses de auditorias, crie biblioteca de "padrões de alta performance" — o que fizeram suas páginas que rankearam. Auditoria pontual vira sistema de prevenção: novas páginas nascem alinhadas.
