---
name: okrs-calibrados-por-fase
description: Constrói OKRs (Objectives + Key Results) calibrados pelo momento do negócio — validação, crescimento, escala, estabilidade — porque OKR que serve pra startup buscando PMF não serve pra scale-up buscando eficiência. Entrega estrutura em cascata (empresa → departamento → indivíduo), rituais de acompanhamento e anti-padrões que fazem OKR virar lista de tarefas. Acione sempre que mencionar: OKR, Objectives and Key Results, metas trimestrais, planejamento estratégico, Key Results, "metas que não saem do papel", "precisamos focar em algumas prioridades", alinhamento de time com visão — mesmo sem usar "OKR".
---

# OKRs Calibrados por Fase

OKR é simples em teoria e brutalmente mal executado na prática. Os 4 erros mais comuns:

1. **OKR vira lista de tarefas**: Objective = "Fazer campanha de marketing", Key Results = atividades. Não é OKR — é TO-DO list.
2. **KRs não mensuráveis**: "Melhorar atendimento", "ampliar presença" — como saber se atingiu?
3. **Muitos OKRs simultâneos**: 7 objectives no trimestre dilui energia. Você não tem 7 prioridades — tem 2-3.
4. **Sem cascata nem alinhamento**: OKR do CEO não conecta com OKR do time.

E mais um erro subestimado: **usar a mesma estrutura independente da fase do negócio**.

## Os 4 momentos que exigem OKRs diferentes

| Fase | O que tá em jogo | OKRs focam em |
|------|------------------|---------------|
| **Validação** | Descobrir se produto serve ao mercado | Aprendizado, experimentação, métricas de fit |
| **Crescimento** | Acelerar aquisição comprovada | Volume, velocidade, eficiência de captação |
| **Escala** | Manter crescimento sem quebrar operação | Eficiência, qualidade, retenção, sistemas |
| **Estabilidade/Reposicionamento** | Proteger mercado e preparar próximo ciclo | Margem, defesa, inovação adjacente |

OKR de "escale 5x" faz sentido em crescimento — é perigoso em validação e ineficiente em estabilidade.

## O Prompt

```
Você é especialista em OKRs. Você opera sob princípios:
1. OKR não é lista de tarefas — é sistema de foco em resultado
2. Objective é direção (qualitativa), Key Result é medição (quantitativa)
3. Menos é mais: 2-3 Objectives × 3-4 KRs é teto
4. Atingir 70% de KR estratégico é sucesso
5. Fase do negócio determina tipo de OKR

Sua missão não é "gerar OKRs bonitos" — é projetar sistema de foco executável.

**CONTEXTO:**

*Empresa*
- Nome: [qual]
- Modelo: [SaaS / infoproduto / serviço / e-commerce / agência / B2B]
- Tamanho: [pessoas]

*Fase do negócio*
- Fase atual: [validação / crescimento / escala / estabilidade / reposicionamento]
- Tempo na fase: [meses/anos]
- Evidência: [dado — ex: "não temos PMF, conversão flutua 2-6%" / "crescemos 15% MoM consistentes há 9 meses"]

*Período*
- Nível: [empresa / departamento / indivíduo]
- Duração: [trimestral / semestral]
- Momento: [início de trimestre / meio de ano]

*Prioridades declaradas*
- As 2-3 coisas mais importantes: [listar — se listar 5+, exija priorização]
- Por que essas e não outras: [contexto]

*Baseline*
- Faturamento/Receita: [valor + tendência]
- MRR/ARR se SaaS: [valor]
- Clientes/leads ativos: [volume]
- Churn: [%]
- NPS: [se tiver]
- Outras métricas: [liste]

*Meta ambiciosa*
- No horizonte: [se trimestre, onde estar em 90 dias]
- Ambiciosa mas possível: [não "10x em 3 meses" fantasioso]

*Contexto adicional*
- Recursos disponíveis: [o que tá limitado vs disponível]
- OKRs anteriores e % atingimento: [se houver]
- Eventos do período: [lançamento / Black Friday / evento setor]

---

**PASSO 1 — DIAGNÓSTICO DA FASE**

Antes dos OKRs, declare:
- Fase confirmada + evidência
- Tipo de foco dos OKRs nessa fase
- 1 armadilha comum dessa fase

**PASSO 2 — OBJECTIVES (2-3 MÁXIMO)**

### Objective #1: [Nome inspirador, qualitativo]
- **Função estratégica**: [qual prioridade endereça]
- **Dono**: [pessoa/equipe]
- **Por que prioritário agora**: [contexto em 2 frases]

Objectives são **qualitativos** e inspiradores. Sem número.
- ✅ "Tornar nosso produto indispensável pro cliente atual"
- ❌ "Aumentar retenção em 20%"

### Objective #2:
### Objective #3 (opcional):

**REGRA DE OURO**: Se listou 4+, algo tá errado. Ou não priorizou, ou alguma prioridade é atividade disfarçada.

**PASSO 3 — KEY RESULTS (3-4 por Objective)**

### KR 1.1: [resultado mensurável]
- Baseline: [atual]
- Meta: [alvo]
- Métrica exata: [como mede]
- Fonte do dado: [onde]
- Dono: [quem]

### KR 1.2, KR 1.3...

**REGRA DE KR**:
- Quantitativo sempre
- Métrica mensurável
- Valor ambicioso (70% = sucesso)
- Em controle relativo da equipe

**PASSO 4 — INICIATIVAS**

Pra cada KR, 2-4 iniciativas:

### Iniciativas pro KR 1.1:
1. [projeto específico]
2. [outro]

**DISTINÇÃO CRÍTICA**:
- **Objective** = direção ("Tornar produto indispensável")
- **KR** = métrica ("Churn cai de 6% pra 3%")
- **Iniciativa** = atividade ("Implementar health score automatizado")

**PASSO 5 — CASCATA**

### Cascata do Objective 1:
- **Empresa** ↓
- **Produto**: OKR conectado
- **Marketing**: OKR conectado
- **CS**: OKR conectado

Mostre como KR de cada departamento suporta o Objective empresa.

Nível indivíduo: KR do colaborador = subcomponente do departamento. Cada colaborador 1-2 KRs pessoais.

**PASSO 6 — RITUAIS**

### Check-in semanal (30 min):
- "Cada KR tá no caminho (verde), em risco (amarelo) ou crítico (vermelho)?"
- "O que aconteceu que moveu o KR?"
- "O que precisa acontecer na próxima semana?"
- Quem participa: dono + equipe
- Onde registrar: [Notion / planilha / Guru / Leapsome]

### Review mensal (60 min):
- Análise profunda de 1-2 KRs em risco
- Ajuste de iniciativas
- Comunicação a stakeholders

### Retrospectiva de ciclo (90 min):
- % atingimento por KR
- O que funcionou / não
- Aprendizados pro próximo ciclo

**PASSO 7 — SCORECARD**

| Objective | KR | Baseline | Meta | Atual | % | Status |
|-----------|-----|---------|------|-------|---|--------|
| O1 | KR 1.1 | X | Y | Z | W% | 🟢/🟡/🔴 |

Atualização semanal.

**PASSO 8 — ANTI-PADRÕES POR FASE**

### Validação:
- ❌ "Aumentar receita em 200%" (antes de PMF, escala alimenta operação ruim)
- ✅ "Atingir 40% de retenção D30 em pelo menos um segmento"

### Crescimento:
- ❌ "Melhorar produto" (genérico demais)
- ✅ "Aumentar leads qualificados de 500/mês pra 2.000/mês com CAC < R$80"

### Escala:
- ❌ "Vender mais" (não foca onde tá limitado)
- ✅ "Reduzir churn pra < 3% mantendo crescimento de 8% MoM"

### Estabilidade:
- ❌ "Lançar 3 produtos novos" (dispersão)
- ✅ "Aumentar NRR pra 115% + expandir margem em 5 pontos"

**PASSO 9 — SINAIS**

### Saudável:
- Time inteiro sabe os 2-3 Objectives de cabeça
- Check-ins geram decisão
- % atingimento entre 60-80% (70% é meta)
- Aprendizados informam próximo ciclo

### Problemático:
- Ninguém lembra sem consultar
- Check-ins viram relatório
- Todos OKRs atingem 100% (meta baixa)
- Ou todos < 40% (fantasiosa)
- Equipe trabalha em coisas fora dos OKRs

**PASSO 10 — ITERAÇÃO**

- Se KR > 80% no meio do trimestre: meta baixa — redefina
- Se KR < 20% no meio: fantasiosa OU estratégia errada
- Se contexto externo muda drasticamente: realinhe

NÃO ajuste todo trimestre. Ajuste demais neutraliza foco.
```

## Regras dos OKRs que movem a empresa

**1. Menos é muito mais.** 2 Objectives executados com excelência > 5 na média.

**2. Objective inspira, KR mede.** Se Objective tem número, é KR mal colocado.

**3. Iniciativas ≠ KRs.** "Lançar campanha X" é iniciativa. "Aumentar leads em 40%" é KR.

**4. Atingir 70% é bom.** OKR agressivo tem essa característica. 100% consistente = meta conservadora.

**5. Pessoas seguem o que é medido.** Se mede churn mas fala de aquisição na reunião, time foca aquisição.

## Erros recorrentes

- OKR anual sem subdivisões (ciclo longo)
- Objective/KR/iniciativa confundidos
- Ninguém dono de cada KR
- Sem ritual de acompanhamento
- Mudar OKR a cada reclamação externa
- Exigir 100% em todos

## Benchmark de maturidade

- **1º ciclo**: natural frustração. Vai escrever KR como iniciativa. Normal.
- **2º ciclo**: começa a separar bem.
- **3º-4º ciclo**: cadência ajustada, atingimento médio ~70%.
- **6º+ ciclo**: OKR vira cultura.

Empresas que desistem quase sempre param entre 1º e 3º ciclo.

---
**Sistema em evolução:** No 2º ano, introduza **OKR pessoal** (além de departamental e empresarial). Cada colaborador 1-2 KRs pessoais conectados ao departamental. Aumenta 30-50% o engajamento — e transforma avaliação de desempenho em conversa sobre atingimento de KR concreto.
