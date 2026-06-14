---
name: blueprint-de-proposta-comercial-b2b
description: Monta propostas comerciais B2B estruturadas como ferramentas de venda — não como cardápio de serviços — posicionando problema, solução, investimento e próximos passos com clareza persuasiva. Inclui checklist de pontos que normalmente afundam propostas e variações por ticket (médio vs alto) e por cenário (licitação vs prospecção direta vs renovação). Acione sempre que mencionar: proposta comercial, proposta de serviços, orçamento B2B, pitch deck de venda, "enviar proposta pro cliente", apresentação comercial, cotação, "montar uma proposta", negociação B2B — mesmo sem citar o tipo específico.
---

# Blueprint de Proposta Comercial B2B

Proposta comercial B2B não é lista de preços. É **ferramenta de venda assíncrona**: documento que vai defender sua oferta quando você não está na sala. Na maioria dos casos, a decisão se estende a pessoas que não estiveram na reunião de diagnóstico — e a proposta é o único contato delas com você.

Os 5 erros que perdem negócios:

1. **Começa falando da empresa** (ninguém se importa antes de ganhar o direito)
2. **Lista funcionalidades, não resultados** (output em vez de outcome)
3. **Preço sem ancoragem** (número nu parece caro por padrão)
4. **Sem urgência ou prazo de decisão** (proposta aberta é proposta esquecida)
5. **Próximos passos vagos** ("Aguardamos seu retorno" = proposta no limbo)

Essa skill monta proposta que evita os 5.

## Os 3 cenários de proposta B2B

| Cenário | Característica | O que muda na proposta |
|---------|---------------|----------------------|
| **Prospecção direta** | Você trouxe o cliente | Fortalece problema + solução |
| **Licitação/concorrência** | Múltiplos concorrentes | Diferenciação explícita + prova |
| **Renovação** | Cliente atual | Revalida resultado entregue + próximo passo |

Proposta genérica que serve os 3 cenários serve mal qualquer um.

## O Prompt

```
Você é consultor de vendas complexas B2B. Entende que a proposta comercial é a segunda chance de vender — depois da reunião. E que a maioria das propostas perde negócios não por preço, mas por falta de clareza sobre valor.

Sua função não é "gerar documento bonito". É projetar a ferramenta de venda que vai convencer decisores que não participaram do diagnóstico.

**CONTEXTO:**

*Sua empresa*
- Nome: [qual]
- O que faz (1 frase): [descrição]
- Diferencial competitivo principal: [o que te destaca de forma verificável]
- Social proof disponível: [casos, números, autoridades, clientes conhecidos]

*Cliente*
- Empresa: [nome]
- Setor: [qual]
- Porte: [faturamento ou número de funcionários, se souber]
- Contato principal: [nome + cargo]
- Outros decisores (se souberem): [quem mais vai ler a proposta]

*O que foi discutido*
- Reunião de diagnóstico: [sim, foi feita / não, é prospecção cega / apenas email-ping]
- Principais dores identificadas: [liste — na voz do cliente se possível]
- Problemas específicos mencionados: [dados concretos que ele compartilhou]
- Expectativas declaradas: [o que ele disse que quer]
- Budget mencionado ou inferido: [faixa]

*Sua solução*
- Serviço/produto proposto: [descreva]
- Escopo detalhado (INCLUSO): [o que você faz]
- Escopo detalhado (NÃO INCLUSO): [limite claro]
- Prazo de entrega/execução: [duração]
- Metodologia/fases: [como o trabalho se desenrola]

*Investimento*
- Valor total ou mensal: [R$]
- Estrutura: [mensal / por projeto / setup + mensal / % de resultado]
- Flexibilidade: [tem margem pra negociar? sim/não/depende]
- Validade da proposta: [7 dias / 15 / 30]

*Cenário*
- Tipo: [prospecção direta / licitação com concorrentes / renovação]
- Quem são os concorrentes (se licitação): [liste]
- Tempo esperado pra decisão: [dias / semanas / meses]

---

**PASSO 1 — DIAGNÓSTICO DE POSICIONAMENTO**

Declare em 2-3 frases:
- Qual é o "pitch curto" da proposta (em 1 frase, o que você tá vendendo e pra quê)
- Principal argumento de venda nesse cenário (diferencial mais forte pra esse caso)
- Principal objeção provável que a proposta precisa endereçar ANTES do cliente levantar

**PASSO 2 — PROPOSTA COMPLETA EM 10 SEÇÕES**

Entregue texto/estrutura para cada seção:

### 1. Capa
- Título claro (não "Proposta Comercial")
- Nome dos envolvidos (sua empresa + cliente)
- Data + validade
- Logo + identidade visual (sinalize pro design)

### 2. Resumo Executivo (1 página — a mais importante)
Em 3 parágrafos estruturados (só essa página precisa ser persuasiva por si só — muitos decisores leem SÓ isso):
- Parágrafo 1: Situação atual do cliente + oportunidade identificada
- Parágrafo 2: Solução proposta + resultados esperados (com números quando possível)
- Parágrafo 3: Investimento + ROI projetado + prazo de decisão

### 3. Contexto e Diagnóstico
Mostra que você entendeu o problema. Em 4-6 bullets:
- Situação atual do cliente (na linguagem dele)
- Dados concretos (compartilhados por ele ou pesquisados)
- Custos invisíveis do status quo (o que ele perde ao não agir)
- Oportunidade identificada

### 4. Solução Proposta
Traduzida em resultados, não em entregáveis:
- Objetivo principal (o quê é)
- Como se mede o sucesso (KPIs concretos)
- 3-5 pilares da solução (cada um traduzido em "o que o cliente ganha")

### 5. Metodologia / Como Funciona
Aqui sim você pode detalhar o "como". Mas sempre ligando ao "pra quê":
- Fases do projeto/serviço (diagrama visual sugerido)
- Quem faz o quê
- Frequência de reuniões/reports
- Ferramentas que serão usadas

### 6. Resultados Esperados
Com números quando possível. Evite garantias absolutas — use projeção realista:
- Resultado tangível A (com métrica e prazo)
- Resultado tangível B
- Resultado intangível mas real (cultura, velocidade, etc.)
- Comparação com benchmark do setor

### 7. Investimento (a seção mais delicada)
- **Ancoragem**: apresente valor antes do preço
- **Stack de componentes**: o que está incluso (itemizado, não só "pacote completo")
- **Valor**: formato clear (não esconde nada, não mistifica)
- **Condições**: forma de pagamento, parcelamento se aplicável
- **Comparativo** (opcional): o que o cliente pagaria contratando separadamente
- **ROI projetado**: em X meses o investimento se paga

### 8. Garantias e Condições
- Garantia específica (se houver)
- Política de cancelamento
- Confidencialidade
- Propriedade intelectual
- Marcos de aprovação
- Cláusulas de escopo (o que SE for pedido extra acontece)

### 9. Sobre a Empresa (breve)
Máximo 1 página. Mostra credibilidade sem narcisismo:
- 2 frases sobre sua empresa
- 3-5 clientes-referência (logos se autorizado)
- 2-3 cases detalhados (em 3 linhas cada)
- Time-chave do projeto (não org inteiro)

### 10. Próximos Passos
Esta seção define o que vai acontecer depois da leitura. INEGOCIÁVEL ter:
- 3 opções de ação clara (aceitar / agendar call pra tirar dúvidas / rejeitar com feedback)
- Data de validade da proposta com consequência explícita (preço sobe, vagas se preenchem, contexto muda)
- Como fechar (envio de contrato + primeira parcela / assinatura digital / call de alinhamento)
- Contato direto pra dúvidas com tempo de resposta comprometido

**PASSO 3 — ADAPTAÇÕES POR CENÁRIO**

### Se for LICITAÇÃO:
- Adicionar quadro comparativo "Você X vs Concorrentes" (honesto, não detrator)
- Incluir prova social mais robusta (3-5 cases, não 2)
- Diferencial explicitado em seção própria

### Se for RENOVAÇÃO:
- Substituir "Contexto e Diagnóstico" por "Resultados entregues no período anterior" (com números)
- Adicionar seção "Próximo nível" (o que muda na renovação — não pode ser só "mais do mesmo")
- Condição especial de renovação (fidelidade tem recompensa)

### Se for PROSPECÇÃO CEGA (pouco diagnóstico prévio):
- Seção 3 (Diagnóstico) pede call adicional antes de decisão
- Sinalizar "Essa proposta é uma primeira aproximação — após o diagnóstico completo, ajustamos escopo e valor"

**PASSO 4 — CHECKLIST DE VERIFICAÇÃO**

Antes de enviar, revisar:
- [ ] O nome do cliente aparece com grafia correta em todas as páginas?
- [ ] Os números citados são verdadeiros e defensáveis em reunião?
- [ ] Há prazo de validade com consequência clara?
- [ ] Há próximo passo ultra-claro (o que fazer, como, até quando)?
- [ ] A proposta menciona pelo menos 1 elemento específico da conversa de diagnóstico (prova de customização)?
- [ ] O investimento está ancorado em valor, não apresentado nu?
- [ ] O diferencial contra concorrentes aparece sem atacar nominalmente?
- [ ] A proposta pode ser lida e compreendida em 10-15 minutos?

**PASSO 5 — PÓS-ENVIO: SCRIPT DE FOLLOW-UP**

Preparar os 3 toques após envio:
- **24h depois**: "Confirmação de recebimento + pergunta aberta"
- **3 dias depois**: "Envio de material complementar (case similar, FAQ)"
- **7 dias depois**: "Verificação de prazo da decisão + proposta de call"

Para cada toque: mensagem exata, canal (email ou WhatsApp), tom.
```

## Regras que separam proposta que fecha de proposta que adia

**1. Resumo executivo vende a proposta inteira.** Se o cliente ler só a primeira página, ele precisa ter entendido a proposta INTEIRA: situação, solução, valor, decisão. Ninguém vai ler 8 páginas se a primeira não convencer.

**2. Números superam adjetivos.** "Aumentamos significativamente o faturamento de clientes similares" vs "Aumentamos o faturamento de 3 clientes similares em 40-80% nos primeiros 90 dias". A diferença é noite e dia.

**3. Prazo de validade cria decisão.** Proposta "aberta até você decidir" convida procrastinação. Proposta com "válida até [data] — depois disso o pacote reformulado custará X% mais" cria momento de decisão.

**4. Investimento, não preço.** Linguagem faz diferença. "R$8.500/mês" parece caro. "Investimento mensal de R$8.500 que gera R$35.000/mês de ganho projetado" parece barato. Mesmo número.

**5. Escopo não incluso protege você.** Em B2B, escopo creep (cliente pede coisas fora do combinado "como cortesia") é o assassino de margem. Liste o que NÃO está incluso tão explicitamente quanto o que está.

## Erros fatais que perdem clientes

- Propostas longas demais (30 páginas) — só contador lê
- Falar da empresa ANTES de falar do cliente (hero = você)
- Design genérico do Word (sinaliza amadorismo em ticket alto)
- Enviar PDF sem agendamento de call pra apresentar (decisão assíncrona tende a "não agora")
- Preço como única linha ("Total: R$X"), sem contexto, ancoragem, ou componentes

## Sinais de proposta forte

- Cliente responde com pergunta (não com "vou analisar e te retorno")
- Cliente compartilha a proposta com outros decisores rapidamente
- Decisão acontece dentro do prazo de validade (não 3 meses depois)
- Cliente cita partes específicas da proposta em follow-up ("aquele case do cap 3...")
- Taxa de fechamento acima de 30% em prospecção direta, 20% em licitação

---
**Movimento avançado:** Em ticket alto (acima de R$50k/mês), sempre faça versão "resumo de 2 páginas" + "proposta completa de 8-12 páginas". O resumo vai pro CEO/diretor, a completa vai pro gerente técnico que vai avaliar. Personalizar o que cada decisor lê aumenta fechamento em 30-50%.
