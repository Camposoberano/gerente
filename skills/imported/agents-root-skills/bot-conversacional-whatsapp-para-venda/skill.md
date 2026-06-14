---
name: bot-conversacional-whatsapp-para-venda
description: Projeta fluxo completo de bot de WhatsApp que QUALIFICA + ATENDE + VENDE — com mensagem de boas-vindas contextualizada por origem, fluxo de qualificação por 2-3 perguntas, apresentação de produto adaptada pro perfil, respostas automáticas pras 5-10 FAQs mais comuns, ponto de transferência pra humano e mensagem de follow-up de quem parou de responder. Inclui mapa visual do fluxo + instruções de configuração em ferramentas (WhatsApp Business simples, ManyChat, Typebot, Z-API + n8n). Acione sempre que mencionar: bot WhatsApp, chatbot, automação de atendimento, fluxo conversacional, qualificação automática, ManyChat, Typebot, "automatizar atendimento WhatsApp" — mesmo sem citar "bot".
---

# Bot Conversacional WhatsApp para Venda

Bot de WhatsApp não substitui humano — **filtra**. Bot bom pega 100 leads/dia, qualifica os 100, fecha 30 sozinho (perguntas simples), e entrega 70 pré-qualificados pro humano fechar. Sem bot, esses 100 leads viram 60 atendimentos manuais cansativos + 40 que ficam sem resposta porque atendente tava dormindo.

Bot ruim faz o oposto: parece robô na primeira mensagem, cliente bloqueia, ninguém compra. Diferença não é a tecnologia — é o **design conversacional**.

Bot que vende faz 5 coisas em ordem:

1. **Abre com mensagem que NÃO parece bot** (humanizada, contextualizada por origem)
2. **Qualifica em 2-3 perguntas** (não 10 — bot longo cansa)
3. **Apresenta o produto certo pro perfil identificado**
4. **Responde dúvida frequente automaticamente**
5. **Transfere pra humano no momento certo** (insatisfação, complexidade, valor alto)

## Os 4 contextos que o bot precisa cobrir

| Contexto | O bot deve fazer | Erro comum |
|----------|-----------------|------------|
| **Lead novo** chegou pelo Instagram/anúncio | Acolher + qualificar + apresentar | Vender direto sem qualificar |
| **Cliente** com dúvida sobre produto | Responder FAQ + se complexo, transferir | Tentar vender outra coisa |
| **Cliente insatisfeito** | Reconhecer + transferir IMEDIATAMENTE | Insistir em script |
| **Pedido de agendamento** | Coletar dados + confirmar | Pedir info irrelevante |

Bot que confunde esses contextos gera frustração e bloqueio.

## O Prompt

```
Você é engenheiro de conversação especializado em bots de venda e atendimento via WhatsApp pra PMEs. Você opera sob princípios:
1. Bot não substitui humano — FILTRA pra que humano entre só no momento certo
2. Primeira mensagem do bot precisa parecer humana e contextualizada — bot que abre com "Sou robô, escolha 1, 2 ou 3" perde 60% logo de cara
3. Fluxo deve levar ao link de compra ou agendamento em no máximo 3-4 trocas — mais que isso = cliente abandona
4. Pergunta de qualificação aumenta conversão (chega ao produto certo), não diminui
5. Saída pra humano deve ser SEMPRE acessível — cliente que pede atendente e recebe outra mensagem automática vai bloquear

Você sabe que ferramentas como ManyChat (mais user-friendly), Typebot (open-source), Botpress (mais técnico) e n8n + Z-API (custom) cabem em perfis diferentes de cliente. Calibrar recomendação por nível técnico do cliente final.

**CONTEXTO:**

*Empresa*
- Nome: [qual]
- Setor: [clínica / academia / loja / agência / curso / restaurante / outro]
- Tipo de produto/serviço: [específico]
- Ticket médio: [R$]

*Sobre o atendimento atual*
- Volume diário de mensagens recebidas: [estimativa]
- Quem atende hoje: [dono / secretária / atendente / equipe]
- Tempo médio gasto em atendimento: [horas/dia]
- Principais perguntas que recebe TODO dia: [liste 5-10 — vai virar FAQ do bot]
- Origem dos contatos: [anúncio Meta / Google / Instagram orgânico / indicação / mistura]

*Personalidade do bot*
- Nome do agente: [ex: "Lara", "Beto", ou "[Nome da empresa] Atendimento"]
- Tom desejado: [acolhedor / profissional / animado / técnico / casual]
- Quão "humanizado" deve ser: [muito — quase imperceptível como bot / médio / explicitamente bot]

*Função principal do bot*
Marque o que se aplica:
- [ ] Responder dúvidas sobre produtos/serviços
- [ ] Qualificar lead (perfil + interesse)
- [ ] Agendar reunião/consulta
- [ ] Pegar pedido (mini-checkout)
- [ ] Coletar dados pra orçamento
- [ ] Reativar cliente inativo
- [ ] Triagem inicial (separar quem fala com humano vs quem bot resolve)

*Limitações do bot (o que ele NÃO deve fazer)*
- [ ] Dar preço (sempre encaminhar pra humano)
- [ ] Falar sobre concorrência
- [ ] Prometer prazos sem confirmação
- [ ] Discutir cancelamento (sempre humano)
- [ ] Negociar (sempre humano)
- [Outros limites específicos do seu negócio]

*Quando transferir pra humano*
- Cliente pediu explicitamente
- Insatisfação detectada (palavras: reclamação, pior, cancelar, decepcionado)
- Pergunta fora do FAQ
- Em horário comercial: imediato
- Fora de horário: bot avisa que humano responde no próximo expediente

*Horário de atendimento humano*
- [ex: seg-sex 9h-18h / 24/7 / variável]

*Dados a coletar*
- [Nome / telefone / email / interesse específico / horário de preferência / outros]

*Ferramenta provável*
- [ManyChat (no-code, intuitivo) / Typebot (open-source) / Botpress (técnico) / n8n + Z-API (custom) / WhatsApp Business simples (manual com respostas rápidas) / não sei ainda]

---

**PASSO 1 — DIAGNÓSTICO E ARQUITETURA**

Antes do fluxo, declare:
- Função primária recomendada pro bot (qualificar / vender / atender / agendar)
- Profundidade do fluxo (3 trocas vs 5 vs ramificações por perfil)
- Plataforma recomendada baseada em volume + nível técnico + budget
- Ponto crítico de transferência pra humano

**PASSO 2 — MENSAGEM DE BOAS-VINDAS**

A mais importante. Não pode parecer bot.

Estrutura:
- Linha 1: cumprimento + contexto da chegada (se origem identificada)
- Linha 2: oferta de ajuda
- Linha 3: pergunta aberta que conduz ao fluxo

### Variação A — Origem identificada (anúncio Meta com UTM)
"Oi! 👋 Aqui é a [Nome do bot] da [Empresa]. Vi que você veio pelo Instagram — fico feliz que achou a gente!

Como posso te ajudar hoje? Tô aqui pra responder dúvidas sobre nossos [produtos/serviços], te apresentar opções e fechar agendamento se você quiser experimentar."

### Variação B — Origem genérica
"Olá! 👋 Aqui é a [Nome do bot] da [Empresa].

Pra eu te ajudar do jeito certo, me conta rapidinho: você tá procurando [opção A], [opção B] ou [opção C]?"

Regras:
- Máximo 3-4 linhas
- Emoji discreto (1-2 max)
- SEMPRE pergunta no fim
- NÃO usar "menu numerado" (1, 2, 3) na primeira mensagem — soa robótico

**PASSO 3 — FLUXO DE QUALIFICAÇÃO (2-3 PERGUNTAS)**

Função: identificar o que o cliente realmente precisa pra apresentar produto/serviço CERTO.

### Pergunta 1 — Identificação de perfil
"Pra eu te indicar o melhor caminho, qual desses descreve sua situação?

A) [Cenário 1 que leva ao produto X]
B) [Cenário 2 que leva ao produto Y]
C) [Cenário 3 que leva ao produto Z ou nada]

(Pode mandar a letra ou descrever do seu jeito)"

### Pergunta 2 — Aprofundamento (depende da resposta 1)
Variável conforme resposta anterior. Ex se academia:

Se cliente respondeu A (emagrecimento):
"Beleza! E você prefere atividade individual (musculação) ou em grupo (aulas coletivas, funcional, ginástica)?"

Se cliente respondeu B (musculação avançada):
"Show! Você já tem experiência com treino de hipertrofia, ou estaria começando do zero?"

### Pergunta 3 — Captura de intenção
"Pra eu te dar a melhor sugestão: você tá buscando começar essa semana, esse mês ou tá só pesquisando agora?"

→ Essa pergunta SEPARA quente (essa semana) de morno (esse mês) de frio (pesquisando) — fluxo a partir daqui muda.

**PASSO 4 — APRESENTAÇÃO DE PRODUTO**

Adaptada por perfil identificado nas respostas. Estrutura:

"Pelo que você me contou, acho que [produto/serviço X] é o que faz mais sentido pra você.

Ele inclui:
- [benefício 1 conectado à dor]
- [benefício 2]
- [benefício 3]

O investimento é R$ [X] (pode ser parcelado em [Y]x).

Quer que eu te mande o link com mais detalhes, ou prefere que eu te conecte com [nome do humano] pra explicar pessoalmente?"

→ Sempre 2 opções: caminho rápido (link) ou caminho consultivo (humano). Cliente escolhe profundidade.

**PASSO 5 — RESPOSTAS PARA FAQ (5-10)**

Pra cada pergunta frequente declarada, resposta padrão:

### "Quanto custa?"
"O investimento varia conforme o plano que melhor se adapta a você. Os principais são:
- [Plano 1]: R$ [X]
- [Plano 2]: R$ [Y]
- [Plano 3]: R$ [Z]

Posso te mandar a tabela completa com os benefícios de cada um?"

### "Tem desconto?"
"Sim, temos algumas condições especiais:
- Pagamento à vista: [%] de desconto
- Plano anual: [%] de desconto
- Indicação: [bônus]

Sobre qual desconto você quer saber mais?"

### "Quais horários?"
"Funcionamos: [horários]. Se você quiser, te mando uma planilha visual dos horários por modalidade. Vai querer?"

### "Onde fica?"
"Estamos em [endereço]. Tem [ponto de referência] perto. Quer que eu te mande a localização do Google Maps?"

### "Tem estacionamento?"
"Sim! Estacionamento [próprio gratuito / convênio com X / na rua]. [Detalhes específicos]"

### "Como funciona aula experimental / consulta inicial?"
"A primeira [sessão] é [grátis / paga R$X]. É só agendar comigo aqui. Quer agendar pra essa semana?"

### "Posso parcelar?"
"Sim! Aceitamos [formas de pagamento]. Parcelamento em até [X]x sem juros pra plano [Y]."

### "Tem garantia / posso cancelar?"
"Temos política de [X dias] pra avaliar. Se não se adaptar, devolvemos [parcela/totalidade]. Detalhes completos no contrato — quer que eu te conecte com [responsável] pra explicar?"

→ Em cancelamento, SEMPRE transfere pra humano.

### "Você é robô?"
"Sim, sou um assistente virtual da [Empresa]! Mas tô aqui pra te ajudar de verdade, e qualquer coisa que eu não souber, te conecto com [nome do humano]. Tudo bem?"

→ Honestidade. Cliente que detecta bot e recebe negativa fica irritado.

**PASSO 6 — TRANSFERÊNCIA PRA HUMANO**

Quando ativar:
- Cliente disse "quero falar com pessoa", "atendente", "humano"
- Detectou palavra de insatisfação ("decepcionado", "cancelar", "ruim", "péssimo")
- Pergunta fora do FAQ por 2 vezes
- Cliente pediu negociação ou desconto especial

Mensagem de transferência:
"Tranquilo! Vou te conectar com [nome] que vai te atender pessoalmente.

[Em horário comercial]: [Nome] vai te responder em alguns minutos.

[Fora de horário]: [Nome] entra de [horário] amanhã. Mas pode deixar sua dúvida aqui que ele responde primeiro coisa pela manhã."

**PASSO 7 — CAPTURA DE DADOS**

Sequência educada pra obter dados sem soar formulário:

"Antes de te conectar com [humano], só pra ele já chegar te conhecendo:

Qual seu nome?
[espera resposta]

Prazer, [nome]! E qual o melhor email/telefone pra entrar em contato caso precise?
[espera resposta]

Perfeito. Já passei suas informações. [Humano] te chama em breve!"

**PASSO 8 — FOLLOW-UP DE LEAD QUE PAROU DE RESPONDER**

Cliente que conversou e sumiu, 24h depois:

"Oi [nome]! Voltei aqui pra ver se ficou alguma dúvida sobre [o que conversamos].

Pra recapitular, o que tinha mostrado pra você foi [resumo curto]. Faz sentido marcar [próximo passo combinado] essa semana?"

48h depois (último toque):

"Oi [nome], só pra entender melhor: tá fazendo sentido pra você nesse momento ou prefere que eu te chame só quando tiver uma novidade especial?"

→ Última pergunta gera resposta honesta. Quem não responde aqui, não responderia mais.

**PASSO 9 — MAPA VISUAL DO FLUXO**

Diagrama em texto representando o caminho:

```
[Cliente entra com mensagem]
       ↓
[Mensagem 1: Boas-vindas + Pergunta 1]
       ↓
   ┌───┴───┬───────┐
[Resp A] [Resp B] [Resp C]
   ↓         ↓        ↓
[Pergunta 2A] [Pergunta 2B] [Pergunta 2C]
   ↓         ↓        ↓
[Apresentação Produto X / Y / Z]
   ↓
   ┌───┴───┐
[Quer link] [Quer humano]
   ↓         ↓
[Envia link] [Transfere + Captura dados]
   ↓
[Mensagem de fechamento + Follow-up agendado em 24h]
```

**PASSO 10 — INSTRUÇÕES DE CONFIGURAÇÃO**

### Opção A — WhatsApp Business simples (manual, gratuito)
- Configurar "Respostas rápidas" pras FAQs (atalho com /preço, /horário, etc.)
- Configurar mensagem de ausência
- Configurar mensagem de saudação
- Limitação: não tem fluxo automatizado, só atalhos

### Opção B — ManyChat (R$50-200/mês)
- Plataforma visual drag-and-drop
- Conecta com WhatsApp via Cloud API
- Bom pra: usuário não-técnico, volume médio (até 5k mensagens/mês)

### Opção C — Typebot (open-source, gratuito)
- Mais avançado que ManyChat tecnicamente
- Self-hosted ou versão SaaS
- Bom pra: usuário com algum conhecimento técnico

### Opção D — n8n + Z-API (R$0 + R$97/mês Z-API)
- Mais customizável
- Permite integração com CRM, planilhas, IA
- Bom pra: usuário técnico ou com dev disponível

### Opção E — WhatsApp Business API (Twilio, MessageBird, Z-API)
- Plataforma robusta pra alto volume
- Custo por mensagem variável
- Bom pra: empresa com 10k+ mensagens/mês

**PASSO 11 — INTEGRAÇÃO COM IA (NÍVEL AVANÇADO)**

Pra bot com Codex/GPT integrado:
- System prompt do agente (definir personalidade, escopo, limitações)
- RAG (Retrieval-Augmented Generation) com documentação da empresa
- Filtros de segurança (não inventar preços, prazos, garantias)
- Fallback pra humano quando confiança baixa

Stack típica:
- Frontend: WhatsApp via Z-API/Twilio
- Orquestração: n8n
- LLM: Codex API ou GPT-4
- Memória: Postgres ou Supabase
- RAG (FAQ + base de conhecimento): pgvector, Pinecone, ou Supabase

**PASSO 12 — TESTE ANTES DE LANÇAR**

5 conversas de teste obrigatórias:

1. Cliente típico fazendo perguntas normais (caminho feliz)
2. Cliente com pergunta fora do FAQ (testar fallback)
3. Cliente irritado/insatisfeito (testar transferência)
4. Cliente que tenta "quebrar" o bot (perguntas estranhas, ofensivas, irrelevantes)
5. Cliente que pede preço de imediato (testar captura sem afastar)

Ajustar com base no que falhou.

**PASSO 13 — ANTI-PADRÕES**

- Menu numerado na primeira mensagem (parece atendimento de banco)
- Bot que insiste mesmo após cliente pedir humano
- Loop infinito (volta sempre pra mesma pergunta)
- Mensagens longas demais (cliente perde paciência)
- Sem escape pra humano (cliente refém)
- Bot que finge ser humano (descobre = perde confiança)
```

## Regras do bot que vende

**1. Primeira mensagem decide tudo.** 60% dos cliente desistem na primeira interação se ela parecer robótica. Investir tempo aqui paga.

**2. Qualificar > apresentar tudo.** Bot que pergunta "como posso ajudar" antes de despejar catálogo converte 3-5x mais.

**3. Saída pra humano sempre disponível.** Cliente preso em loop com bot bloqueia o número.

**4. Bot honesto > bot disfarçado.** "Sou assistente virtual" deixa claro que cliente sabe — e gera mais paciência que tentar fingir humanidade.

**5. Fluxo curto vence fluxo profundo.** 3-4 trocas até o link/agendamento. Mais que isso = abandono.

## Erros que matam bots

- Bot longo demais (15 mensagens pra resposta simples)
- Não consegue diferenciar perguntas semelhantes
- Não captura dados pra humano usar depois (humano precisa repetir tudo)
- Sem follow-up automático (cliente esquece, bot não lembra)
- Mesmo bot pra origens diferentes (anúncio Meta vs indicação merece tom diferente)

## Sinais de bot que tá funcionando

- Taxa de resposta acima de 70% (cliente continua a conversa após 1ª mensagem)
- Conversão de mensagem → ação (link clicado, agendamento, compra) acima de 25%
- Tempo médio do humano por atendimento cai 40-60% (bot fez triagem)
- Cliente NÃO reclama de "ser atendido por bot" (sinal de design discreto)
- ROI mensurável (R$ poupados em hora de atendimento + R$ gerados em conversões)

## Custo-benefício real

Empresa com 100 mensagens/dia de WhatsApp:
- **Sem bot**: 4-6h/dia de atendimento humano = R$3.000-5.000/mês em pessoa dedicada
- **Com bot básico (ManyChat)**: 1-2h/dia de humano + R$200/mês ferramenta = R$1.000-1.500/mês total
- **Economia**: R$2.000-3.500/mês + cliente atendido em segundos vs minutos

Em 12 meses, bot bom paga 10-20x o custo de implementação.

---
**Movimento avançado:** Depois de 6 meses operando, integre com IA generativa (Codex/GPT) pra perguntas fora do FAQ. Sistema híbrido — bot rule-based pro fluxo crítico (boas-vindas, qualificação, captura) + IA generativa pra perguntas livres — combina previsibilidade onde precisa com flexibilidade onde adiciona valor. Esse é o estágio em que bot deixa de ser "respondedor de FAQ" e vira "atendente virtual real".
