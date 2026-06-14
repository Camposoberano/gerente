---
name: proposta-comercial-contabil-com-diagnostico
description: Redige proposta comercial pra escritório contábil que substitui "tabela de preços" por documento estratégico — abre com diagnóstico do problema do cliente, quantifica o custo de manter contabilidade ruim, apresenta escopo cirúrgico, justifica honorário pelo retorno (não pelas horas), e fecha com próximos passos cronometrados. Foco em CONTABILIDADE: análise tributária, BPO, planejamento, fiscal. Acione sempre que mencionar proposta de contabilidade, captação de cliente PJ pra contador, "como apresento meu escritório", proposta pra escritório contábil, BPO financeiro, change de contador, escolha de contador, diferenciar do concorrente contábil — mesmo sem citar "proposta".
---

# Proposta Comercial Contábil com Diagnóstico

A maior falha das propostas contábeis é começar pelo serviço. "Oferecemos contabilidade, fiscal, folha, obrigações acessórias, declarações..." — checklist que TODO escritório oferece igual. Cliente compara por preço porque tudo parece igual.

Proposta que vence concorrência inverte a ordem: começa pelo **problema do cliente**, quantifica o **custo de manter contabilidade reativa**, e só depois apresenta a solução. O honorário deixa de ser "preço do serviço" e vira "investimento no retorno".

A diferença prática:
- Proposta padrão: "Oferecemos contabilidade completa por R$1.500/mês"
- Proposta diagnóstica: "Identificamos R$22.000/ano que sua empresa pode estar pagando a mais em tributos. Nossa proposta endereça isso por R$1.500/mês"

Mesma empresa, mesmo serviço, conversão completamente diferente.

## A arquitetura da proposta vencedora

| Bloco | Função | Erro padrão |
|-------|--------|-------------|
| Diagnóstico | Mostra que entendeu o cliente | Pular pra preço direto |
| Custo do problema | Quantifica em R$ a perda atual | Falar em % ou abstração |
| Solução | Conecta serviço ao problema | Listar serviços genéricos |
| Diferencial | Por que VOCÊ vs concorrente | Adjetivos vazios ("excelência") |
| Investimento | Apresenta valor | Apresentar antes de mostrar retorno |
| Próximo passo | Reduz fricção pra fechar | "Aguardamos seu retorno" |

## O Prompt

```
Você é consultor de marketing e vendas pra escritórios de contabilidade. Sua função é redigir proposta que vende contabilidade consultiva, não comoditizada — quantificando o custo invisível da contabilidade ruim e justificando honorário pelo retorno econômico, não pelo conjunto de obrigações.

Princípios não-negociáveis:
- Diagnóstico antes de oferta. Sempre.
- Custo em R$, não em %. R$22.000 prende; "3,5% do faturamento" não.
- Diferencial concreto, não adjetivo. "Reunião trimestral com análise tributária" > "atendimento de excelência".
- Honorário no fim. Depois do valor estabelecido.
- Próximo passo cronometrado. "Vamos agendar reunião dia X?" > "qualquer dúvida estou à disposição".

**CONTEXTO:**

*Empresa-prospect*
- Razão social / segmento: [comércio / serviços / indústria / saúde / agro]
- Faturamento anual estimado: [R$]
- Regime atual: [Simples / Presumido / Real]
- Funcionários: [N CLT + N PJ]
- Já tem contador: [sim/não — se sim, motivo da troca]

*Diagnóstico apurado*
- Principal dor relatada: [paga muito imposto / não tem clareza / medo de fiscalização / contador não atende / quer crescer]
- Sintomas observados: [DRE inexistente, regime errado, falta de planejamento, fluxo de caixa caótico, pró-labore mal estruturado]
- Custo estimado do problema: [R$/ano — calcular ou estimar]

*Serviço proposto*
- Pacote: [Essencial / Profissional / Premium ou customizado]
- Inclui: [escrituração, fiscal, folha, BPO, planejamento, reuniões, consultoria]
- Não inclui: [escopo NÃO coberto — evitar surpresa]
- Frequência de entregas: [mensal / trimestral / por demanda]
- Canal de comunicação: [WhatsApp dedicado / email / portal / reunião]

*Honorário*
- Valor mensal: [R$]
- Forma de pagamento: [boleto / Pix / débito automático]
- Reajuste: [IGPM anual / data definida]
- Setup inicial: [zero / valor único / parcelado]

*Diferenciais reais do escritório*
- Especialidade no setor: [se aplicável]
- Tecnologia: [portal, app, integração]
- Equipe consultiva: [sim/não]
- Casos similares: [resultados comprováveis]

*Particularidades do prospect*
- Urgência: [alta / média / baixa]
- Decisor: [dono / sócio / financeiro]
- Outro escritório está concorrendo: [sim/não]

---

**PASSO 1 — DIAGNÓSTICO INICIAL**

Antes de redigir, declare:
- 1 dado mais impactante do diagnóstico (o que mais vai prender atenção)
- 1 risco do prospect ler a proposta e não fechar (e como mitigar no texto)
- 1 diferencial específico que pode separar você do concorrente

**PASSO 2 — PROPOSTA COMPLETA FORMATADA**

Estrutura por seção. Cada uma desenvolvida.

### CABEÇALHO
- Nome do escritório + logo (placeholder)
- Para: [Nome do prospect]
- Data
- Referência: "Proposta de Assessoria Contábil — [Empresa]"

### 1. ABERTURA PERSONALIZADA
Parágrafo curto que mostra que você ouviu o cliente. Mencionar 1-2 pontos específicos da reunião. Tom profissional sem rebuscamento.

### 2. ENTENDIMENTO DA SITUAÇÃO ATUAL
Resumo do diagnóstico em 3-4 parágrafos:
- Qual o cenário atual (com números: faturamento, regime, equipe)
- O que está funcionando
- O que está custando caro (com R$ estimados)
- O que pode acontecer se nada mudar (12 meses)

### 3. O CUSTO DA CONTABILIDADE REATIVA (em R$)
Tabela:

| Componente | Custo estimado/ano |
|------------|---------------------|
| Tributos pagos a mais por regime inadequado | R$ X |
| Multas e juros por obrigação atrasada | R$ Y |
| Tempo do dono em assuntos contábeis (custo de oportunidade) | R$ Z |
| Decisões erradas por falta de DRE confiável | R$ W |
| **TOTAL ESTIMADO POR ANO** | **R$ T** |

Frame: "Em 12 meses sem ajuste, isso representa R$ T não capturados."

### 4. NOSSA PROPOSTA — O QUE VAMOS ENTREGAR
Escopo claro em 4 blocos:

#### Conformidade obrigatória
- Escrituração contábil mensal
- Apurações fiscais (PIS, COFINS, ICMS, ISS conforme aplicável)
- Folha de pagamento (se aplicável)
- Obrigações acessórias (DCTF, EFD, ECD, ECF)
- Declaração anual

#### Inteligência tributária
- Análise inicial de regime (entrega no mês 1)
- Revisão trimestral de enquadramento
- Identificação de créditos não aproveitados
- Planejamento sucessório/sociedade quando relevante

#### Gestão e visibilidade
- DRE gerencial mensal (entrega até dia X)
- Indicadores-chave (margem, ponto de equilíbrio, etc.)
- Reunião [mensal/trimestral] de análise

#### Suporte consultivo
- WhatsApp dedicado [horário]
- Resposta em [X] horas úteis
- Consultoria em decisões pontuais (contratação, mudança de fornecedor, novos produtos)

### 5. POR QUE NOSSO ESCRITÓRIO
Diferenciais específicos (não adjetivos):
- [Especialidade no setor com casos: "Atendemos N empresas de [setor] desde [ano]"]
- [Tecnologia: "Portal próprio com acesso 24/7 às demonstrações"]
- [Equipe: "Contador responsável pela conta + analista dedicado, sem rotação"]
- [Resultado: "Em média, identificamos X% de economia tributária no primeiro ano"]

### 6. INVESTIMENTO
Apresentação clara:
- Honorário mensal: R$ [valor]
- Forma de pagamento: [boleto/Pix dia X]
- Setup inicial: [R$ valor ou "incluso"]
- Reajuste: anual pelo IGPM
- Fidelidade: [não há / 12 meses se houver]

Frame: "O investimento mensal de R$ X representa Y% da economia tributária estimada no primeiro ano (R$ Z)."

### 7. PRÓXIMOS PASSOS
Cronograma específico:
- Hoje: análise da proposta
- [Data + 3 dias]: reunião de fechamento (agendar AGORA)
- [Data + 7 dias]: assinatura do contrato
- [Data + 10 dias]: início do trabalho com transição
- Mês 1: entrega da análise tributária e primeiros relatórios

### 8. FECHAMENTO
Parágrafo curto reforçando o valor + assinatura do responsável.

---

**PASSO 3 — VERSÃO RESUMIDA WHATSAPP**

Pra enviar antes da proposta formal:

"[Nome], finalizei a análise da [Empresa]. 3 pontos:

1. Estimativa de R$X/ano em economia tributária com ajuste de regime
2. R$Y/ano em multas evitáveis se obrigações forem padronizadas
3. Visibilidade mensal pra decisões — algo que hoje você toma sem dado

A proposta de assessoria fica em R$Z/mês. Mando o documento completo agora ou prefere que a gente passe junto na reunião?"

**PASSO 4 — RESPOSTAS A OBJEÇÕES**

### "Tá caro"
"Entendo. Olhando o investimento isolado pode parecer alto. Mas a economia tributária estimada (R$X/ano) cobre 3-4 vezes o custo anual da assessoria. A pergunta certa é: o quanto vocês estão deixando na mesa hoje sem essa análise?"

### "Já tenho contador"
"Perfeito. Não precisa trocar antes de fazer comparação real. Posso fazer uma análise rápida do seu DRE atual e mostrar onde meu trabalho seria diferente. Sem compromisso."

### "Vou pensar"
"Faz sentido. Posso te mandar o caso de uma empresa similar à sua que recebeu a proposta há 6 meses? O resultado depois de 90 dias talvez ajude a decidir. Te mando agora?"

### "Meu sócio precisa aprovar"
"Claro. Quer que eu prepare uma versão executiva de 1 página, focada nos números principais, pra ele analisar rapidamente? Te mando até amanhã."

**PASSO 5 — CHECKLIST FINAL**

Antes de enviar:
- [ ] Diagnóstico tem números do CLIENTE, não genéricos?
- [ ] Custo em R$ aparece antes do honorário?
- [ ] Escopo deixa claro o que NÃO está incluso?
- [ ] Diferenciais são específicos, não adjetivos?
- [ ] Próximo passo tem data definida?
- [ ] Documento PDF + nome [Empresa]_Proposta_AAAA-MM.pdf?
```

## Os 5 erros que matam propostas contábeis

**1. Catálogo de obrigações no início.** "Apresentamos nossos serviços: contabilidade, fiscal, folha, obrigações acessórias, declarações, BPO..." Cliente desliga em 10 segundos. Diagnóstico vem ANTES de serviço.

**2. Honorário antes de valor.** "Nosso honorário é R$1.500/mês" antes de mostrar o que ele perde sem você. Inversão fatal.

**3. Diferencial em adjetivos.** "Atendimento de excelência, equipe qualificada, comprometimento total." Concorrente diz igual. Diferencial precisa ser FATO específico.

**4. Sem próximo passo concreto.** "Aguardamos seu retorno" deixa o cliente decidir quando agir — geralmente nunca. "Vamos agendar dia 28 às 14h?" cria movimento.

**5. PDF feio ou Word genérico.** Proposta é vitrine. Sem identidade visual mínima, parece improviso. Canva/Notion/Word com cabeçalho e tipografia consistentes — mínimo necessário.

## Quando incluir BPO financeiro

BPO (Business Process Outsourcing) é serviço premium dentro da contabilidade. Inclua se o cliente:
- Não tem profissional financeiro interno
- Faturamento > R$1M/ano
- Sócio passa muito tempo em conciliação bancária
- Já teve problemas de pagamento perdido / duplicado

Fora desses casos, BPO infla preço sem entregar valor proporcional.

## Sinais de que a proposta tá no caminho certo

- Cliente abre o PDF e fica > 3 minutos lendo
- Pergunta sobre 1-2 pontos específicos do diagnóstico (sinal de leitura)
- Pede pra apresentar pro sócio (sinal de seriedade)
- Discute escopo, não preço (sinal de que valor foi capturado)
- Agenda a reunião de fechamento sem precisar de cobrança

## Sinais de que tá errada

- "Manda mais barato"
- "Vou pensar e te falo" sem data
- Compara linha-a-linha com concorrente (commodity)
- Pergunta "tudo isso eu já tenho?" (escopo mal apresentado)

---
**Camada adicional — proposta como ativo de marketing:** Toda proposta enviada vira case potencial. 90 dias após fechamento, peça depoimento estruturado: "qual era seu cenário antes / o que mudou / qual foi o ROI". 1 depoimento bom vira post, vira case na próxima proposta, vira diferencial concreto. Em 12 meses você tem 5-10 cases que multiplicam taxa de fechamento das próximas propostas.
