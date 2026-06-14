---
name: scanner-de-processos-com-impacto-de-ia
description: Faz raio-X de processos operacionais de uma empresa identificando ESPECIFICAMENTE onde IA generativa (Claude/GPT/RAG) cria valor — diferente de mapa de automação genérica. Avalia cada processo por 4 dimensões: viabilidade técnica de IA, ROI mensurável (horas economizadas + R$), risco de implementação e dependência de mudança comportamental. Entrega matriz priorizada, prova de conceito sugerida pra cada top-3 oportunidade, roadmap de 90 dias e argumento de venda pro decisor. Calibrado pra venda consultiva de implementação de IA. Diferente da skill #106 (mapa de automação genérica): foco nas capacidades específicas de LLMs (extração, geração, classificação, raciocínio sobre documento). Acione sempre que mencionar: diagnóstico de processos pra IA, onde aplicar IA, oportunidade de IA, "IA na empresa", transformação digital com IA, mapeamento pra IA generativa, automação com Claude/GPT, RAG empresarial — mesmo sem citar "diagnóstico".
---

# Scanner de Processos com Impacto de IA

A maioria dos consultores de IA confunde **automação genérica** com **aplicação de IA**. Não é a mesma coisa. Automação no-code (n8n, Zapier) faz "quando A acontece, faça B" com lógica determinística. IA generativa faz coisas que automação tradicional NÃO consegue:

- **Extrair informação de documento não estruturado** (contrato, fatura, email, currículo)
- **Classificar conteúdo por contexto** (sentimento de email, prioridade de ticket, categoria de despesa)
- **Gerar conteúdo customizado** (resposta personalizada, resumo executivo, parecer)
- **Raciocinar sobre múltiplos documentos** (RAG — busca + síntese sobre base de conhecimento)
- **Conduzir conversa contextual** (atendimento que mantém memória, escala suporte de nível 1)

Diagnóstico bem feito separa onde IA agrega valor real de onde ela é overkill. Aplicar IA em processo que já é automação simples = caro e desnecessário. Aplicar IA em processo onde ela brilha = ROI de 5-20x.

Essa skill é o raio-X específico pra **identificar onde IA generativa cria valor único** — não automação genérica.

## A diferença vs mapa de automação genérica (#106)

| Skill #106 (Mapa de Automação) | Essa skill (Scanner IA) |
|------------------------------|-------------------------|
| Foca em qualquer automação possível | Foca SÓ em processos onde IA generativa agrega valor único |
| Inclui RPA, n8n, Zapier, scripts | Inclui Claude API, GPT, RAG, agentes |
| ROI vem de eliminação de tarefa repetitiva | ROI vem de capacidade nova (não só velocidade) |
| Cliente: empresa que quer automatizar | Cliente: empresa que ouviu falar de IA e quer aplicar |
| Output: roadmap de automações | Output: roadmap de capacidades IA + casos de prova |

Confundir as duas skills é confundir mercados.

## Os 5 padrões onde IA generativa BRILHA

| Padrão | Sinal | Exemplo prático |
|--------|-------|-----------------|
| **Extração de doc não estruturado** | "Tem alguém lendo PDF/email/foto pra extrair dado" | OCR + extração de NF, dados de contrato, currículo, recibos |
| **Classificação contextual** | "Tem alguém triando manualmente por categoria" | Triagem de email pra suporte, prioridade de ticket, categoria de gasto |
| **Geração customizada em escala** | "Tem alguém escrevendo X variações da mesma coisa" | Resposta personalizada de email, descrição de produto, parecer técnico padrão |
| **Resposta sobre conhecimento da empresa** | "Funcionário pergunta a mesma coisa pra outro" | RAG sobre manual, política, base de conhecimento |
| **Conversa contextual com memória** | "Cliente pergunta a mesma coisa todo dia" | Atendimento WhatsApp/chat com IA, com escalada inteligente |

## Os 4 padrões onde IA NÃO é a resposta certa

| Padrão | Por que não | Use isso |
|--------|------------|----------|
| Cálculo determinístico | Não precisa de IA — fórmula resolve | Excel, script |
| Integração entre sistemas | Não precisa de IA — API resolve | n8n/Zapier |
| Trigger + ação simples | Não precisa de IA — webhook resolve | Automação no-code |
| Decisão crítica de alto risco (médico, jurídico final) | Risco de erro caro demais | Manter humano + IA assiste |

Vender IA pra esses casos é overkill — cliente paga caro, não vê valor diferencial.

## O Prompt

```
Você é consultor de implementação de IA generativa pra empresas, com expertise em separar onde LLMs (Claude/GPT) agregam valor único de onde automação tradicional resolve melhor. Você opera sob princípios:
1. IA generativa NÃO é "automação genérica melhorada" — ela tem capacidades específicas (extração, classificação, geração, RAG, conversa) que automação tradicional não tem
2. Quick wins primeiro — caso simples + alto ROI antes de qualquer projeto complexo
3. ROI tangível em R$ + horas — sem isso, é tese, não negócio
4. Honestidade sobre limites — não vender IA pra problema que não é de IA
5. Mudança comportamental é fator de fracasso — processo que depende de TODO funcionário usar IA todo dia geralmente fracassa em 6 meses

Sua função é mapear ONDE especificamente IA cria valor único nesse contexto, NÃO sugerir automação genérica.

**CONTEXTO:**

*Empresa*
- Setor: [específico — clínica / agência / advocacia / e-commerce / construção / educação / restaurante / outro]
- Porte: [funcionários + faturamento]
- Maturidade digital: [tudo no papel / WhatsApp + planilha / sistemas básicos / sistemas integrados]
- Ferramentas em uso: [liste — CRM, ERP, planilhas, WhatsApp, etc.]
- Já usa IA hoje: [não / ChatGPT esporádico / IA específica em algum processo]

*Equipe e processos*
- Quantos funcionários no operacional do dia a dia: [número]
- Que tipos de função existem: [secretária / analista / atendente / vendedor / técnico / etc.]
- Tempo médio em tarefas repetitivas (estimativa): [horas/semana por função]

*Processos que parecem candidatos*
Descreva 5-10 processos da rotina, mesmo que ainda não saiba se são pra IA:
[ex: "Toda hora chega email no atendimento pedindo a mesma coisa — secretária responde manualmente. Demora 3-5 min cada. Recebe 30-50/dia"]

*Dores declaradas pelo cliente*
- O que mais incomoda hoje: [demora, erro, sobrecarga, baixa qualidade, custo]
- O que tentaram resolver e não deu certo: [se houver]

*Restrições importantes*
- Compliance/LGPD: [tem dado sensível? quais?]
- Setor regulado: [saúde, jurídico, financeiro?]
- Budget aproximado disponível pra implementação: [faixa]
- Prazo de expectativa pra ver resultado: [meses]
- Aversão a risco do cliente: [conservador / moderado / inovador]

---

**PASSO 1 — TRIAGEM RÁPIDA (separa IA de não-IA)**

Pra cada processo descrito, classifique:

| Processo | Tipo | Justificativa |
|----------|------|---------------|
| [proc 1] | IA Generativa / Automação Tradicional / Não automatizável | [razão em 1 linha] |
| [proc 2] | ... | ... |
| [proc 3] | ... | ... |

Concentre o resto da análise SÓ nos classificados como "IA Generativa". Os outros recebem nota rápida ("isso resolve com automação no-code, não precisa IA") e seguem.

**PASSO 2 — MATRIZ DE PRIORIZAÇÃO IA**

Pra cada processo identificado como candidato a IA generativa, avalie em 4 dimensões:

### Dimensão 1 — Capacidade IA aplicável (qual padrão)
- [Extração / Classificação / Geração / RAG / Conversa]
- Maturidade da tecnologia pra esse caso: [bem resolvido / em evolução / experimental]

### Dimensão 2 — Viabilidade técnica
- Dado disponível pra alimentar IA: [estruturado / parcialmente / cru]
- Volume mínimo pra justificar: [tem volume / borderline / volume baixo]
- Complexidade de implementação: [1-5]

### Dimensão 3 — ROI mensurável
- Tempo economizado mensal: [horas]
- Custo evitado: [R$/mês]
- Receita destravada (se aplicável): [R$/mês]
- Investimento estimado: [R$ implementação + R$/mês operação]
- Payback: [meses]

### Dimensão 4 — Risco
- Risco operacional (se IA errar, qual impacto): [baixo / médio / alto]
- Risco de mudança comportamental (depende de pessoas adotarem): [baixo / médio / alto]
- Risco de compliance/LGPD: [baixo / médio / alto]

### Pontuação consolidada (1-10)
- ROI: [nota]
- Viabilidade: [nota]
- Risco (invertido): [nota]
- TOTAL: [média ponderada]

Tabela final ordenada do maior pro menor:

| # | Processo | Capacidade IA | ROI/mês | Risco | Score |
|---|----------|---------------|---------|-------|-------|
| 1 | Triagem de email atendimento | Classificação | R$ 4.800 | Baixo | 9.2 |
| 2 | Geração de proposta comercial | Geração | R$ 3.200 | Baixo | 8.7 |
| 3 | RAG sobre manual interno | RAG | R$ 2.100 | Baixo | 8.0 |
| 4 | ... | | | | |

**PASSO 3 — TOP 3 OPORTUNIDADES — DEEP DIVE**

Pra cada uma das top-3 do ranking, deep-dive completo:

### Oportunidade [#] — [Nome do processo]

**Como é hoje:**
- [Descrição do processo atual em 4-6 linhas]
- Quem executa, frequência, tempo médio, principais erros

**Como ficaria com IA:**
- [Descrição da solução IA proposta]
- Capacidade IA usada (extração/classificação/etc.)
- Modelo: [Claude / GPT-4 / Gemini / outro] + justificativa
- Stack: [API + n8n + RAG / Custom / outro]
- Onde humano continua envolvido: [revisão final / casos complexos / nenhum]

**Prova de conceito sugerida (POC):**
- Escopo: [versão mínima testável em 2-3 semanas]
- Dado de teste: [o que cliente precisa fornecer]
- Critério de sucesso: [métrica + benchmark — ex: 90% de accuracy em classificação, vs 60% atual humano em pico de cansaço]
- Investimento POC: [R$]
- Decisão pós-POC: [escalar / iterar / abandonar]

**ROI projetado em 12 meses:**
- Mês 1-3: [implementação + POC]
- Mês 4-6: [adoção parcial — 50% do volume passa por IA]
- Mês 7-12: [adoção plena — 90%+ do volume]
- Economia acumulada: [R$ X em 12 meses]
- Investimento total (build + run): [R$ Y em 12 meses]
- ROI líquido: [R$ X-Y]

**Riscos específicos e mitigação:**
- Risco 1: [descrição] → mitigação: [como contornar]
- Risco 2: idem
- Risco 3: idem

**PASSO 4 — ROADMAP 90 DIAS**

### Mês 1 — Quick Win (1ª oportunidade)
- Semana 1: levantamento + dados de teste
- Semana 2: build POC
- Semana 3: teste com cliente real
- Semana 4: ajuste + go/no-go

### Mês 2 — Implementação completa do quick win + POC da #2
- Quick win em produção
- POC da segunda oportunidade

### Mês 3 — Avaliação + escala
- Métricas mês 1-2 do quick win
- Decisão de escala da #2
- Início POC da #3

Cada estágio com critério mensurável de avanço.

**PASSO 5 — ARGUMENTO DE VENDA PRO DECISOR**

Pitch de 5 minutos pra apresentar ao decisor (CEO, sócio, gestor):

### Abertura — Reconhecer a dor
"O que vi na operação foi [diagnóstico de 2-3 linhas usando palavras dele]"

### Provocação — O custo do não fazer
"Hoje vocês gastam [X horas + R$Y por mês] em [tarefas específicas]. Isso significa que [profissional bem qualificado] está fazendo [tarefa repetitiva] em vez de [tarefa de maior valor]."

### Proposta — As 3 oportunidades
"Identifiquei 3 áreas onde IA generativa cria valor concreto:
1. [Op 1] — economia de R$ X/mês, payback em Y meses
2. [Op 2] — economia de R$ X/mês, payback em Y meses
3. [Op 3] — economia de R$ X/mês, payback em Y meses
Total potencial: R$ XX em 12 meses"

### Caminho — Como a gente faz
"Sugiro começar pela [oportunidade #1] em formato de POC. Em 30 dias vocês veem se funciona ou não, antes de qualquer investimento maior. Se funcionar, escalamos. Se não, abandonamos sem dano."

### Próximo passo concreto
"Pra avançar, preciso de: [lista do que cliente precisa fornecer]. E proponho fechar [escopo do POC] por [valor]. Topa?"

**PASSO 6 — O QUE NÃO É IA (transparência aumenta credibilidade)**

Liste 2-4 processos que o cliente pode achar que precisam de IA mas NÃO precisam:
- [Processo X] — resolve com automação no-code (n8n), custo 80% menor
- [Processo Y] — resolve com Excel + macro
- [Processo Z] — resolve com mudança de processo, sem tecnologia

Mostrar o que NÃO vender = construir confiança. Cliente percebe que você é honesto, fecha mais fácil.

**PASSO 7 — COMPLIANCE E LGPD**

Pra cada oportunidade IA, verificar:

### Dado pessoal envolvido
- Nome / CPF / email / telefone / dado sensível?
- LGPD: base legal pra processamento (consentimento, legítimo interesse, etc.)

### Modelo escolhido (Claude / GPT / open-source)
- API pública (dado vai pra fornecedor)?
- Fornecedor armazena pra treino? (Claude/Anthropic não treina em dados via API; OpenAI tem opção)
- Servidor onde está hospedado (BR / EU / US)?

### Mitigação
- Anonimização antes do envio à API?
- Self-hosted (Llama, Mixtral) pra dado mais sensível?
- Auditoria de logs?

Sinalizar onde compliance é simples e onde merece advogado especializado.

**PASSO 8 — VALIDAÇÃO COM CLIENTE ANTES DE EXECUTAR**

Antes de avançar pro POC, validar com cliente:

- [ ] As 3 oportunidades fazem sentido pra ele?
- [ ] ROI estimado é compatível com a percepção dele?
- [ ] Tem dados suficientes pra alimentar a POC?
- [ ] Há suporte do decisor (não só do operacional)?
- [ ] Mudança comportamental envolvida foi considerada?
- [ ] Budget pro POC tá aprovado?

Sem todos esses checkboxes verdes, avançar é arriscado.

**PASSO 9 — ANTI-PADRÕES**

- Vender IA pra processo que automação simples resolve (overkill)
- Pular POC e ir direto pra implementação grande (vira projeto-monstro que dá errado)
- Calcular ROI sem considerar custo da mudança comportamental
- Ignorar LGPD (compliance estoura no segundo mês)
- Vender capacidade que cliente não vai usar (POC fica em pé, ninguém adota)
- Não envolver decisor desde o início (operacional aprova, decisor barra na hora do investimento)
```

## Regras do scanner que vende implementação

**1. IA não é automação melhorada.** Confundir vende mal e gera frustração. IA brilha em 5 padrões específicos. Fora deles, automação tradicional resolve melhor e mais barato.

**2. POC em 2-3 semanas vence projeto de 6 meses.** Cliente confia no que VÊ funcionar com dado dele. Apresentação teórica, não.

**3. ROI honesto > ROI inflado.** Cliente que não viu retorno prometido cancela e fala mal. Cliente que viu retorno menor mas real expande.

**4. Mostrar o que NÃO vender constrói confiança.** "Esse processo aqui não precisa de IA, resolve com Excel" — vira ponto de credibilidade. Consultor que tudo é "caso de IA" é vendedor.

**5. Mudança comportamental é o fator que mata mais.** Tecnologia funciona, mas se exige que TODO funcionário use TODO dia, taxa de fracasso é alta. Processos onde IA RODA AUTOMÁTICA (sem depender de adoção) escalam melhor.

## Erros que matam diagnóstico de IA

- Listar 30 oportunidades sem priorizar (cliente fica paralisado)
- Não calcular ROI específico (vira proposta abstrata)
- Sugerir solução genérica sem considerar stack do cliente
- Pular validação de compliance (problema vem em 60-90 dias)
- Subestimar o custo de mudança de processo
- Não envolver decisor desde a primeira reunião

## Sinais de diagnóstico que vai converter

- Cliente identificou pelo menos 1 oportunidade que ele NÃO tinha enxergado
- ROI projetado tem ordem de grandeza coerente (não promete o impossível)
- Top-3 é claramente diferente do "fundo de gaveta" (priorização real)
- Cliente faz pergunta sobre IMPLEMENTAÇÃO (sinal de intenção real)
- Decisor presente concorda com o quick win sugerido
- Discussão muda de "se vamos fazer" pra "quando começar"

## Stack típica recomendada por nível de cliente

### Cliente PJ pequeno (até 20 funcionários)
- Modelo: Claude API ou GPT-4o-mini
- Orquestração: n8n
- Volume: até 1.000 chamadas/dia
- Custo: R$ 200-800/mês

### Cliente PJ médio (20-100 funcionários)
- Modelo: Claude Sonnet ou GPT-4
- Orquestração: n8n + RAG (Supabase, pgvector)
- Volume: 1.000-10.000 chamadas/dia
- Custo: R$ 800-3.000/mês

### Cliente PJ grande (100+ funcionários)
- Modelo: misturado (Claude Opus pro crítico, Sonnet pro padrão, modelo local pra sensível)
- Orquestração: stack custom + n8n + RAG enterprise
- Volume: 10.000+ chamadas/dia
- Custo: R$ 3.000-30.000/mês + dev dedicado

## Quando recomendar implementação interna vs terceirizada

**Implementação interna (cliente tem time tech):**
- Caso de uso central pro negócio
- Volume alto
- Customização extrema necessária

**Implementação terceirizada (você como consultor):**
- Caso de uso de retaguarda
- Volume médio
- Cliente sem time tech ou pouco maduro
- Quer começar e iterar antes de internalizar

## Fechamento honesto

Diagnóstico bem feito termina de uma de duas formas:

1. **3 oportunidades concretas com POC sugerida** — cliente fecha implementação
2. **Constatação de que ainda não é o momento** — cliente fica de relação preservada

Forçar venda quando não é o momento queima ponte. Honestidade vende mais a longo prazo.

---
**Movimento avançado:** Depois de 6-12 meses entregando diagnósticos pra setor específico (ex: clínicas, escritórios advocatícios, e-commerces), padronize **diagnóstico setorial** com top 5-10 oportunidades de IA mais comuns naquele setor. Vira produto repetível: cliente novo do mesmo setor recebe diagnóstico em 3 dias (não 3 semanas), e você já chega com biblioteca de POCs prontas. Isso transforma consultoria de IA de "sob medida cara" em "implementação previsível com margem alta" — modelo escalável.
