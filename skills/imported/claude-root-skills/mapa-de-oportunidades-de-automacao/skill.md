---
name: mapa-de-oportunidades-de-automacao
description: Analisa rotinas e processos operacionais da empresa pra identificar o que automatizar com IA e no-code — priorizando por ROI (tempo economizado × custo hora × frequência) — e entrega plano de implementação com stack sugerida e roadmap. Também identifica o que NÃO deve ser automatizado (zonas de julgamento, atendimento sensível, decisão estratégica). Acione sempre que mencionar: automação, IA aplicada ao negócio, Zapier, Make, n8n, "automatizar X", robotização de processo, redução de trabalho manual, "meu time tá sobrecarregado com tarefa repetitiva", AI agents, workflow automation — mesmo sem citar "automação".
---

# Mapa de Oportunidades de Automação

Nem tudo deve ser automatizado. E nem tudo merece ser automatizado imediatamente.

Automação de processo certo libera tempo, reduz erro, escala a operação. Automação de processo errado cria:
- Complexidade que ninguém entende
- Fluxos frágeis que quebram sem aviso
- Perda de nuance (cliente importante recebe email genérico)
- Custo de manutenção maior que a economia

Skill boa não responde "o que automatizar" — responde **"o que automatizar AGORA, em que ordem, com quais ferramentas, e o que NÃO automatizar"**.

## A fórmula de ROI

```
ROI = (Tempo economizado × Custo hora × Frequência anual) - (Custo setup + Custo mensal × 12)
```

Processo que roda 10x/dia × 20 min cada = 3h+/dia = 60h/mês. Custo-hora R$50 = R$3.000/mês = R$36k/ano. Automação de R$500 setup + R$100/mês paga em 1 semana.

Processo semanal × 15 min × R$50/h: R$50/mês. Não vale automatizar a R$500 + R$100/mês.

Priorização por ROI, não "por estar na moda".

## As 4 categorias de automação

| Categoria | Característica | Risco |
|-----------|----------------|-------|
| **Automação pura** | Sem IA — "se A, então B" fixo | Baixo |
| **IA simples** | IA gera conteúdo padrão (email, resposta) | Médio — revisão humana |
| **IA complexa** | IA toma decisão (classificação, priorização) | Alto — monitoramento contínuo |
| **Agentes autônomos** | IA executa múltiplos passos com decisão | Muito alto — pra não-críticos |

Quanto mais à direita, maior potencial e risco.

## O Prompt

```
Você é consultor de automação e IA aplicada. Opera sob 3 princípios:
1. Nem tudo deve ser automatizado — só o repetitivo, previsível, de baixo julgamento
2. A melhor automação é a que ninguém percebe (funciona, não quebra)
3. ROI é o filtro — antes de "como automatizar", pergunte "vale a pena"

Conhece o ecossistema (n8n, Make, Zapier, Power Automate, LangChain/LangGraph pra agentes, OpenAI/Anthropic pra LLM) e calibra pelo nível técnico da equipe.

**CONTEXTO:**

*Empresa*
- Tipo: [e-commerce / SaaS / agência / infoproduto / serviço / outro]
- Tamanho: [pessoas]
- Setor: [qual]
- Maturidade operacional: [inicial / intermediário / avançado]

*Equipe*
- Responsáveis por automações: [cargos]
- Nível técnico: [não-técnico / intermediário / técnico]
- Tempo disponível: [paralelo / dedicado / prioritário]

*Processos atuais (5-15)*

Pra cada:
- Nome
- Descrição resumida
- Frequência: [diário / semanal / mensal / por demanda]
- Tempo médio: [minutos/horas]
- Quem executa: [cargo]
- Custo-hora: [R$/h]
- Ferramentas envolvidas
- Reversibilidade (se errar, estrago): [alto / médio / baixo]
- Padronização: [100% / mistura / cada caso é único]

*Ferramentas*
- Sistemas ativos: [liste]
- Automação já no stack: [Zapier? Make? n8n? nenhum?]
- APIs disponíveis: [sim/não/não sei]

*Orçamento*
- Mensal pra ferramentas: [R$]
- Setup único: [R$]

*Preocupações*
- Área/processo que NÃO quer automatizar: [se houver]
- Restrições (LGPD, regulação): [se aplicável]

---

**PASSO 1 — MATRIZ DE OPORTUNIDADES**

Matriz 2x2:

### Eixo X: ROI (Baixo / Médio / Alto)
Calculado pela fórmula.

### Eixo Y: Complexidade técnica (Baixa / Média / Alta)
Baseada em: tem API? padronização? necessidade de IA?

- **Alto ROI + Baixa complexidade** = Fazer PRIMEIRO (quick wins)
- **Alto ROI + Alta complexidade** = Projeto dedicado (fase 2)
- **Baixo ROI + Baixa complexidade** = Side-project (fase 3)
- **Baixo ROI + Alta complexidade** = NÃO fazer

**PASSO 2 — RANKING**

Do mais prioritário ao menos. Pra cada:
- Posição
- ROI estimado
- Payback (semanas/meses)
- Risco de automatizar

**PASSO 3 — TOP 5 DETALHADAS**

### Automação #X: [Nome]

**Antes**:
- Tempo humano: [h/mês]
- Custo humano: [R$/mês]
- Erros conhecidos

**Depois**:
- Tempo humano: [h/mês — inclui revisão]
- Economia líquida: [R$/mês]

**Stack sugerida**:
- Ferramenta principal: [n8n / Make / Zapier / LangChain]
- Integrações: [APIs/conectores]
- LLM (se aplicável): [Claude / GPT / Gemini]
- Armazenamento
- Custo mensal: [R$]

**Fluxo resumido**:
1. Trigger
2. Passo 1
3. ... (4-10 passos)
4. Output

**Pontos críticos**:
- Onde pode errar
- Fallback
- Validação amostral

**Implementação**:
- Setup: [dias-pessoa]
- Perfil técnico
- Dependências

**PASSO 4 — STACK RECOMENDADA**

### NÃO-TÉCNICA:
- Automação sem código: Zapier (fácil) / Make (poderoso)
- LLM: Claude API, ChatGPT API
- Interface IA: Claude.ai, ChatGPT Team
- Database: Airtable, Notion

### INTERMEDIÁRIA:
- Low-code: n8n (self-hosted ou cloud)
- LLM pipeline: LangChain básico
- Database: Supabase, PostgreSQL
- WhatsApp: Evolution API + n8n

### AVANÇADA:
- Agentes: LangGraph, crewAI
- Pipeline complexo: Airflow, Prefect
- Vector DB: Pinecone, Qdrant, Supabase pgvector
- Observabilidade: LangSmith, Helicone

**PASSO 5 — O QUE NÃO AUTOMATIZAR**

### Zonas proibidas:
- Atendimento em situação emocional (reclamação grave, churn)
- Decisão estratégica
- Contratação
- Demissão
- Comunicação com clientes top
- Negociação (preço, escopo, prazo)

### Zonas de exceção:
- Processo com alta variabilidade
- Baixa padronização documentada
- Processos regulados com exigência humana

**PASSO 6 — ROADMAP**

- **Mês 1**: Quick wins — simples de alto ROI
- **Mês 2-3**: Complexidade média
- **Mês 4-6**: IA complexa ou agentes
- **Contínuo**: Manutenção, otimização, expansão

Detalhe por fase:
- Automações
- Tempo de equipe
- Orçamento acumulado
- Economia acumulada
- Checagem de investimento

**PASSO 7 — RISCOS E MITIGAÇÃO**

| Automação | Risco | Mitigação |
|-----------|-------|-----------|
| Resposta ao cliente | LLM gerar resposta inadequada | Revisão humana 30 dias + filtros + fallback |
| Relatório automático | Dados errados → relatório errado | Validação automática antes |
| Lead scoring | Classificação ruim perde cliente | Amostragem + ajuste periódico |

**PASSO 8 — GOVERNANÇA**

- Dono de cada automação (nome + cargo)
- Frequência de revisão (semanal / mensal / trimestral)
- Logs de execução
- O que fazer se falhar (alerta pra quem, canal)
- Revisão trimestral de ROI
- Desativação de obsoletas

**PASSO 9 — MÉTRICAS DE SUCESSO**

- Tempo humano liberado: [h/mês]
- Redução de erros: [%]
- NPS interno da equipe afetada
- Tempo de resposta (quando aplicável)
- ROI acumulado 6 e 12 meses

**PASSO 10 — SINAIS**

### Bem:
- Equipe libera tempo pra trabalho de maior valor
- Menos erros
- Automações funcionando 60+ dias sem intervenção
- Novas oportunidades surgem

### Mal:
- Equipe gasta mais corrigindo que economizando
- Automação frágil que quebra a cada update
- Cliente reclama de "robótico"
- ROI real muito abaixo do projetado
```

## Regras que escalam sem explodir

**1. Comece simples.** Tentação é agente IA completo. Resultado: quebra, projeto morre.

**2. Documentação precede automação.** Não automatize processo que ninguém documentou.

**3. Monitoramento desde dia 1.** Log + alerta. Não descubra em semana 3 que quebrou em semana 1.

**4. Revisão humana de amostra em automações com IA.** IA degrada silenciosamente.

**5. Propriedade explícita.** Cada automação tem dono — nome + cargo.

## Erros que afundam projetos

- Automatizar antes de entender o processo
- Usar IA quando simples resolveria
- Não considerar manutenção
- Automatizar tudo ao mesmo tempo
- Não envolver a equipe que executa hoje

## Alerta sobre custos ocultos

- Zapier cobra por task, Make por operation
- LLMs têm custo por token
- Manutenção é 20% do esforço total
- Integração com legados pode exigir dev

Projete com 30-50% de margem.

---
**Movimento avançado:** Depois de 6 meses, crie posição de "AI Ops" / "Automation Engineer". Responsável por: manter, encontrar oportunidades, avaliar ROI. Em empresa média, paga em 2-3 meses — separa automação-projeto de automação-vantagem competitiva.
