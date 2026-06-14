---
name: scorecard-de-metricas-essenciais
description: Define os KPIs corretos pro modelo de negócio específico — separando North Star Metric, métricas primárias, métricas por departamento, e métricas de vaidade pra PARAR de acompanhar. Calibra por fase (validação/crescimento/escala) e modelo (SaaS/e-commerce/agência/infoproduto). Entrega dashboard + ritual de acompanhamento (diário/semanal/mensal). Acione sempre que mencionar: KPI, métrica, dashboard, "o que devo medir", North Star Metric, indicador, scorecard, meta mensal, "acompanho tudo mas não sei o que importa", métricas que movem o negócio — mesmo sem citar "KPI".
---

# Scorecard de Métricas Essenciais

Medir tudo é tão ruim quanto não medir nada. Empresas médias acompanham 20-40 métricas — ninguém age com consistência. Virou relatório decorativo.

Dashboard efetivo tem menos indicadores, escolhidos com rigor:

1. **1 North Star Metric** — a métrica que prediz saúde do negócio
2. **5-7 KPIs primários** — nível empresa/liderança olha todo dia
3. **3-5 KPIs por departamento** — cada área conectada ao topo
4. **Lista negra de vaidade** — métricas que vai PARAR de olhar

Sem esse filtro, métrica vira ruído. Com ele, vira comando.

## Vaidade vs resultado

| Vaidade | Resultado |
|---------|-----------|
| Seguidores | Engajamento + conversão em venda |
| Visitantes do site | Leads qualificados |
| Impressões | CTR + CPA + CPL |
| Downloads do app | Ativação (ação-chave nos primeiros 7 dias) |
| MRR bruto crescendo | MRR por cohort |
| Taxa de abertura de email | Cliques + conversão |

Vaidade parece importante mas não informa decisão.

## O Prompt

```
Você é analista de dados de negócio. Opera sob princípios:
1. Menos é mais — mais de 10 KPIs ninguém acompanha
2. Métrica sem dono é esquecida
3. Métrica de vaidade é inimiga do foco
4. Se não dá pra agir, não acompanhe

Calibra KPIs pela combinação (modelo × fase × objetivo) — não existe lista universal.

**CONTEXTO:**

*Negócio*
- Tipo: [e-commerce / SaaS / agência / infoproduto / consultoria / marketplace]
- Receita: [recorrente / venda única / por projeto / misto]
- Ticket médio: [R$]
- Faturamento mensal: [faixa]

*Fase*
- Estágio: [validação / crescimento / escala / estabilidade]
- Evidência: [dado que sinaliza o momento]

*Objetivo primário*
- Crescer rápido (volume / aquisição)
- Reter clientes (redução de churn)
- Lucrar (eficiência de margem)
- Escalar (sem quebrar qualidade)

*Time*
- Tamanho: [pessoas]
- Áreas: [marketing / vendas / produto / operações / financeiro / CS]

*Situação atual*
- O que acompanha hoje
- Quais informam decisão de fato
- O que gostaria de medir mas não mede

---

**PASSO 1 — DIAGNÓSTICO**

- Fase confirmada + por quê
- Objetivo primário calibrado com a fase
- 1 armadilha: empresas [nessa fase] medem [X] mas deveriam medir [Y]

**PASSO 2 — NORTH STAR (UMA SÓ)**

A métrica que:
- Reflete o valor entregue ao cliente
- Prediz saúde de longo prazo
- É acompanhada por TODO MUNDO

### Recomendada pro contexto:
**[nome da métrica]**

Justificativa:
- Por que essa e não [outra óbvia]
- Como se mede
- Benchmark saudável pro tipo
- Frequência (semanal padrão)

Exemplos por modelo:
- **SaaS B2B**: Weekly Active Teams
- **E-commerce**: Monthly Repeat Purchase Rate
- **Agência**: Client NPS × Retention combinadas
- **Infoproduto evergreen**: Monthly New Sales
- **Marketplace**: Transações/usuário ativo
- **SaaS consumer**: DAU/WAU ratio

**PASSO 3 — KPIs PRIMÁRIOS (5-7)**

### KPI #1: [nome]
- **Definição exata**
- **Fórmula**
- **Baseline**: valor atual
- **Meta**: alvo
- **Frequência**: diário / semanal / mensal
- **Dono**: cargo/pessoa
- **Fonte do dado**

[Repetir #2 a #7]

**REGRAS:**
- Nenhuma vaidade (tráfego, seguidores, impressões fora)
- Cada KPI conecta à North Star
- Dono específico — sem responsabilidade difusa

**PASSO 4 — KPIs POR DEPARTAMENTO**

Pra cada área, 3-5 métricas:

### Marketing
- CAC
- MQL → SQL conversion
- Taxa conversão da LP principal
- ROAS do canal principal
- Leads qualificados/mês

### Vendas
- Taxa conversão SQL → Cliente
- Ciclo médio de venda (dias)
- Ticket médio por venda
- Pipeline em R$
- Win rate

### Produto
- Feature adoption rate
- Time to value
- Taxa de ativação

### CS / Atendimento
- NPS
- Taxa de resposta em <X horas
- Churn mensal
- NRR (Net Revenue Retention)

### Financeiro
- Margem líquida
- Runway
- MRR/ARR growth rate
- Custo por ticket de suporte
- DSO (prazo médio de recebimento)

### Operações
- SLA cumprido
- Custo por entrega
- Capacidade utilizada

Adapte pelas áreas da empresa.

**PASSO 5 — MÉTRICAS DE VAIDADE (PARAR DE ACOMPANHAR)**

3-5 métricas que a empresa provavelmente tem e NÃO deveria:
- [Métrica X]: por que é vaidade + o que olhar no lugar

Exemplos:
- "Visitantes" → olhe leads qualificados
- "Seguidores" → olhe engajamento + tráfego gerado
- "Downloads do app" → olhe retenção D7/D30
- "Taxa de abertura de email" → olhe CTR + conversão

**PASSO 6 — DASHBOARD**

Ferramenta: Looker Studio / Metabase / Notion / planilha.

### Topo (30s de leitura)
- North Star com trend
- 3-4 KPIs primários: meta vs realizado

### Camada 2 (2 min)
- KPIs por área
- Mês atual vs anterior + mesmo mês ano anterior

### Camada 3 (investigativa)
- Drill-down por segmento
- Cohort analysis
- Funil detalhado

**PASSO 7 — RITUAL**

### Diário (5 min)
- North Star
- 1-2 KPIs de ação rápida
- Alertas

### Semanal (30 min — equipe)
- Todos KPIs primários
- Departamentais (dono apresenta)
- Ação: KR mais fora da meta → o que fazer?

### Mensal (90 min — management)
- Análise profunda
- Comparação histórica
- Ajuste de metas se necessário

### Trimestral (meio-dia — planejamento)
- Os KPIs ainda são os certos?
- Recalibração com mudança de estratégia

**PASSO 8 — CHECKLIST**

- [ ] North Star definida e comunicada
- [ ] KPIs primários com dono nomeado
- [ ] Dashboard automatizado
- [ ] Vaidade oficialmente "aposentada"
- [ ] Reuniões semanais com pauta de KPIs
- [ ] Documentação do que cada métrica é
- [ ] Processo pra atualizar metas

**PASSO 9 — ALERTAS**

2-3 métricas que, se saírem do padrão, indicam problema sério:
- Se churn > X%: alerta vermelho
- Se CAC subir Y%: revisar canais
- Se NPS cair Z pontos: auditoria

Early warnings evitam crise em 60-90 dias.

**PASSO 10 — EVOLUÇÃO**

- Trimestralmente: KPIs refletem a estratégia?
- Se fase mudou: re-selecione
- Aposente métricas que atingiram meta e estagnam
- Adicione novas à medida que o negócio se sofistica
```

## Regras das métricas que funcionam

**1. Uma North Star supera 20 KPIs.** Várias "métricas principais" = nenhuma é principal.

**2. Dono por KPI elimina ambiguidade.** "Marketing e vendas responsáveis pelo CAC" = ninguém.

**3. Frequência certa evita reação excessiva.** KPI lento (retenção anual) diário gera ansiedade. Rápido (leads do dia) mensal perde oportunidade.

**4. Benchmark é contexto.** MRR growth 10% MoM: incrível pra maduro, medíocre pra early-stage.

**5. Métrica sem ação é inútil.** "Se cair, o que vamos fazer?" Sem resposta, não coloque.

## Erros que degradam scorecard

- Métricas demais (paralisia)
- Sem dono (ninguém age)
- Só resultado (faturamento) sem processo (leads → vendas → ticket)
- Não revisar trimestralmente
- Comparar com benchmark sem ajustar pelo modelo/fase

## Sinais de scorecard maduro

- Cada pessoa sabe "a métrica que me importa" sem consultar
- Reuniões semanais curtas e focadas (decisão > relato)
- Métricas fora da meta percebidas em dias, não meses
- Decisões vêm de dados, não achismo
- Vaidade sente falta de atenção (saudável)

---
**Progressão natural:** Em empresa madura (12+ meses), próximo nível é **cohort analysis** e **atribuição multi-touch**. KPI médio esconde variação entre cohorts. Churn geral de 5% pode ser 2% em cohort A e 12% em B — estratégia muda completamente sabendo disso.
