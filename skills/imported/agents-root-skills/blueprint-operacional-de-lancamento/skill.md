---
name: blueprint-operacional-de-lancamento
description: Projeta blueprint operacional completo pra lançamento de produto digital — timeline hora-a-hora do dia de abertura, checklist multidisciplinar (marketing + produto + vendas + suporte + infra), stack técnico necessário, plano de contingência por cenário, governança de decisões durante o lançamento. Foco em COORDENAÇÃO E OPERAÇÃO (não na copy dos emails — isso é skill separada). Acione sempre que mencionar: plano de lançamento, coordenação de lançamento, checklist pra lançar curso, equipe de lançamento, cronograma de lançamento, "como organizar meu primeiro lançamento", war room de lançamento, launch playbook, lançamento multifuncional — mesmo sem citar "blueprint".
---

# Blueprint Operacional de Lançamento

Lançamento digital não falha por falta de copy boa. Falha por **falha operacional**: servidor caiu na abertura, checkout bugou, ninguém respondendo WhatsApp enquanto lead quente desistia, equipe de CS despreparada pra volume, criativos travados em aprovação faltando 3 horas pro go-live.

Essa skill não é "como escrever os emails do lançamento" (isso tem skill separada pra engine de emails). É **o plano operacional** que coordena todas as áreas antes, durante e depois da abertura.

## Os 4 pilares operacionais

| Pilar | Pergunta que responde |
|-------|----------------------|
| **Timeline** | Quando cada coisa acontece? |
| **Responsabilidades** | Quem faz o quê, quando? |
| **Infra + Stack** | A tecnologia aguenta a carga? |
| **Contingência** | Se X quebrar, qual o plano B? |

Sem os 4, lançamento é torcida.

## O Prompt

```
Você é diretor de operações especializado em lançamentos digitais. Você não escreve copy — coordena execução. Você sabe que lançamento é projeto multidisciplinar: marketing + produto + vendas + suporte + infra + financeiro. Cada área tem sua responsabilidade — e se uma falha, toda a operação sofre.

Seu foco é: timing preciso, responsabilidades claras, stack técnico preparado, plano B pra cada cenário.

**CONTEXTO:**

*Produto*
- O que é: [curso / mentoria / SaaS / ebook / membership]
- Preço: [R$ + formas de pagamento]
- Promessa central: [o que o cliente recebe]
- Formato de entrega: [Hotmart / Kiwify / Teachable / plataforma própria]

*Modelo de lançamento*
- Formato: [aberto / lista de espera / webinar / desafio / perpétuo]
- Duração do carrinho aberto: [3 / 5 / 7 dias]
- Pré-lançamento: [2 / 3 / 4 semanas de aquecimento]
- Formato do aquecimento: [lives / emails / série de vídeos / desafio]

*Equipe disponível*
- Time interno: [quantas pessoas e funções — ex: 1 gestor de tráfego, 1 copywriter, 1 editor de vídeo]
- Terceiros contratados: [se houver — ex: produtora de vídeo, assessoria]
- Quem é o dono/responsável geral: [pessoa que toma decisão final]

*Base/audiência*
- Lista de email: [tamanho]
- Seguidores no principal canal: [volume]
- Alcance orgânico médio: [% da base]
- Orçamento de mídia paga: [R$]

*Meta*
- Vendas esperadas: [número]
- Faturamento esperado: [R$]
- ROAS alvo (se rodar ads): [X]

*Stack técnico*
- Plataforma de email: [RD / ActiveCampaign / Mailchimp / Klaviyo]
- CRM: [qual]
- Checkout: [Hotmart / Kiwify / Eduzz / Stripe]
- WhatsApp: [Evolution API / Z-API / manual]
- Gestão de leads: [Pipedrive / HubSpot / planilha]

*Contexto*
- É primeiro lançamento: [sim/não]
- Lançamentos anteriores: [resultados se houver]
- Preocupações específicas: [o que te assusta]

---

**PASSO 1 — TIMELINE GERAL (semanas)**

Backwards planning do dia do lançamento:

### Semana -4 (D-28): Preparação estratégica
- Definição final de oferta, preço, bônus
- Projeções de vendas
- Plano de tráfego pronto
- Briefing de equipe

### Semana -3 (D-21): Produção de materiais
- Gravação de vídeos de aquecimento
- Criação de criativos pagos
- Emails do aquecimento escritos
- Copy da página de vendas revisada

### Semana -2 (D-14): Aquecimento inicia
- Início do conteúdo de aquecimento público
- Primeiro email da sequência
- Tráfego de topo de funil ativo
- Lista de espera abrindo

### Semana -1 (D-7): Intensificação
- Conteúdo diário
- Emails a cada 2-3 dias
- Tráfego pago intensificando
- Teste de stress do checkout
- Ensaio do dia do lançamento

### Dia -3 (48-72h antes): Preparação final
- Lista de espera fechada
- Emails do dia do lançamento agendados
- Equipe de suporte treinada
- Stack técnico validado
- Ensaio geral

### DIA D: LANÇAMENTO

### D+1 a D+6: Carrinho aberto
- Cadência de emails, stories, ads, lives
- Monitoramento contínuo
- Ajustes com base em dados reais

### D+7: Fechamento
- Últimas 48h com aumento de intensidade
- Avisos de fechamento
- Fechamento oficial (às X horas)

### Pós-lançamento (D+8 a D+14)
- Onboarding dos novos clientes
- Retrospectiva interna
- Documentação de aprendizados

**PASSO 2 — DIA D DETALHADO (hora-a-hora)**

Pro dia de abertura, granularidade máxima:

### 07:00 — Preparação final
- Equipe técnica online
- Teste final do checkout
- Validação de todos emails agendados
- Painéis de monitoramento abertos

### 08:00 — Abertura
- Email 1 disparado pra base completa
- Post orgânico no Instagram (feed)
- Stories com countdown
- WhatsApp: mensagem pra lista de espera com acesso antecipado
- Anúncios pagos de conversão ativados

### 09:00-11:00 — Pico inicial de tráfego
- Monitoramento de CPU/memória do checkout
- Suporte ativo no WhatsApp (tempo médio de resposta < 2 min)
- Acompanhamento de conversão no GA4
- Primeira reunião de war room (10min)

### 11:00 — Email 2 (segundo toque)
- Social proof: "X pessoas já garantiram"
- Post no Instagram com depoimentos
- Resposta ativa a comentários/stories

### 14:00-16:00 — Segunda onda
- Email 3 de objeção/oferta
- Live no Instagram (30-45 min)
- WhatsApp broadcast com corte da live

### 19:00-21:00 — Live principal
- Live de oferta ao vivo
- Q&A abrindo objeções
- Link pro checkout sendo lembrado a cada 10 min
- Equipe de vendas respondendo DMs

### 22:00 — Fechamento do dia 1
- Email de contagem: "hoje foi X — últimas vagas"
- Revisão de métricas do dia

### 23:00 — War room de encerramento
- Vendas do dia vs meta
- Ajustes pro D+1
- Problemas identificados e correções pra amanhã

**PASSO 3 — RESPONSABILIDADES POR ÁREA**

Matriz RACI simplificada:

### Marketing (Lead + Time)
- Lead: envio de emails, gestão de tráfego, copy
- Time: design de criativos, copy de stories/posts

### Produto (se SaaS) / Curso (se infoproduto)
- Responsável por: garantir que o produto está funcional pro aluno/cliente novo
- Onboarding do cliente pós-compra
- Acesso a materiais disponível em até X min após compra

### Vendas / Atendimento
- Responsável por: resposta a DMs, WhatsApp, email de dúvidas
- Meta de tempo de resposta: < 5 min nas horas de pico
- Roteiro de respostas pras 20 perguntas mais comuns

### Suporte técnico / CS
- Responsável por: resolver problemas de checkout, acesso, pagamento
- Canal dedicado (WhatsApp ou email prioritário)

### Infraestrutura / TI
- Responsável por: uptime do site/checkout, monitoramento de servidor
- Escalabilidade pra picos de tráfego
- Backup em caso de queda

### Financeiro
- Responsável por: monitorar vendas em tempo real, reconciliar com plataforma
- Preparação pro reembolso (se houver — prazo de 7-30 dias conforme oferta)

**PASSO 4 — STACK TÉCNICO VALIDADO**

Checklist de infraestrutura:

### Antes do D-7:
- [ ] Checkout testado com compras reais (não só sandbox)
- [ ] Plataforma de curso aguenta X acessos simultâneos (stress test)
- [ ] Server do site aguenta pico (usar ferramenta como Loader.io)
- [ ] CDN configurado pra imagens/vídeos
- [ ] Backup do site atualizado
- [ ] SSL válido (nunca vença no dia do lançamento)
- [ ] Plataforma de email validada (taxa de entrega testada)

### Integrações críticas:
- [ ] Checkout → plataforma de curso (aluno recebe acesso automático?)
- [ ] Checkout → CRM (lead vira cliente no CRM?)
- [ ] Email platform → tags atualizadas automaticamente?
- [ ] Analytics: eventos de purchase disparando?
- [ ] CAPI Meta: purchase server-side configurado?

### Redundâncias:
- [ ] Link alternativo de checkout se principal cair
- [ ] Plataforma de email backup (se principal falhar)
- [ ] Canal alternativo de suporte (email se WhatsApp falhar)

**PASSO 5 — PLANO B POR CENÁRIO**

Cenários possíveis + ação:

### Cenário A: Servidor cai na abertura
- **Ação imediata**: ativar link de backup do checkout
- **Comunicação**: stories avisando + email pra quem tentou comprar
- **Responsável**: time de infra
- **Recuperação**: identificar causa, ajustar, documentar

### Cenário B: Vendas do dia 1 < 40% da meta
- **Diagnóstico**: abertura baixa de email? CTR dos anúncios baixo? LP convertendo mal?
- **Ação**: reforçar canal mais forte, revisar copy, aumentar intensidade
- **Escalação**: tomada de decisão rápida — conservar ou aumentar budget?

### Cenário C: Picos de reclamação em redes sociais
- **Ação**: resposta ativa em comentários, criar FAQ em story, chamar reclamante no DM
- **Responsável**: time de redes sociais com roteiro pronto
- **Limite**: se virar crise, escalar pra gestor + pausar ads

### Cenário D: Problema com plataforma de pagamento
- **Ação**: comunicação imediata + checkout alternativo
- **Responsável**: financeiro + infra

### Cenário E: Vendas acima do esperado
- **Ação**: alerta no CS pra carga extra, reforço de onboarding
- **Garantir qualidade de entrega não cai com volume**

### Cenário F: Ataque de bots/fraude
- **Ação**: implementação de captcha, monitoramento de fraude
- **Responsável**: infra

**PASSO 6 — GOVERNANÇA E DECISÕES DURANTE O LANÇAMENTO**

Quem decide o quê, durante a operação:

### Decisões de comunicação rápida (até 1h):
- Copy de story / post de reação
- Reposta em crise menor de redes sociais
- Decisão: gestor de marketing

### Decisões de budget (2-4h):
- Aumentar investimento em ads se vendas abaixo
- Pausar ads se CPA explodir
- Decisão: gestor de tráfego com validação do dono

### Decisões estratégicas (grande impacto):
- Estender prazo do lançamento
- Adicionar bônus emergencial
- Alterar oferta em meio ao lançamento
- Decisão: só o dono/CEO

### War Room diário:
- Horário fixo (ex: 22h após encerramento das vendas do dia)
- Duração: 30 min
- Pauta: vendas do dia vs meta, problemas, ajustes pro D+1
- Participantes: gestor de marketing + infra + vendas

**PASSO 7 — MÉTRICAS DE ACOMPANHAMENTO EM TEMPO REAL**

Dashboard pra equipe consultar:

### Dashboard de vendas (atualização a cada 30 min):
- Vendas do dia
- Faturamento do dia
- Vendas acumuladas vs meta
- Ticket médio
- Conversão na página

### Dashboard de tráfego (atualização a cada 1h):
- Visitantes na LP
- CTR dos anúncios
- CPA por canal
- ROAS em tempo real

### Dashboard de suporte:
- Tickets abertos
- Tempo médio de resposta
- Taxa de resolução 1º contato

### Alertas automáticos:
- Queda de conversão > 30% (alerta imediato)
- Tempo de resposta > 10 min no suporte (alerta)
- CPA > 2x do projetado (alerta pra pausar/ajustar)

**PASSO 8 — PÓS-LANÇAMENTO**

Semana seguinte ao fechamento:

### Onboarding
- Email de boas-vindas automatizado
- Primeiro acesso ao produto funciona 100%
- Grupo de novos alunos (comunidade)
- Suporte de 48h mais intenso pra novos clientes

### Retrospectiva interna (até 7 dias após)
Reunião de 90 min:
- O que funcionou muito bem?
- O que falhou (técnico, operacional, comercial)?
- Aprendizados pra próximo lançamento
- Documentação em doc compartilhado

### Relatório final de lançamento
- Vendas totais vs meta
- Faturamento vs projeção
- ROAS total
- CAC por canal
- Principais fontes de venda
- Taxa de abandono do checkout
- NPS dos novos alunos (após 7 dias)

**PASSO 9 — LIÇÕES OPERACIONAIS RECORRENTES**

Coisas que dão errado em quase todo primeiro lançamento:

- Checkout travado no pico (stress test nunca foi suficiente)
- Emails agendados errado (timezone errado, lista errada)
- Ads pausados indevidamente por aprovação de plataforma
- Links quebrados em algum canal
- Acesso ao produto não liberado automaticamente
- Equipe de suporte overloaded
- Falha em integração (checkout → curso, checkout → CRM)

Tenha plano B pra cada um.

**PASSO 10 — MELHORIA CONTÍNUA**

Lançamento é sistema:
- 1º lançamento: aprendizado base, tudo novo
- 2º: documentar o que funcionou, consolidar playbook
- 3º+: melhorias incrementais, automações progressivas

Cada lançamento deve ter melhora em 1-2 métricas específicas vs anterior.
```

## Regras do blueprint operacional

**1. Timeline backwards > forward.** Comece do dia do lançamento e vá voltando. Forward planning perde deadlines.

**2. Responsabilidade nominal elimina ambiguidade.** "O marketing cuida disso" = ninguém cuida. "João é dono disso" = feito.

**3. Stress test é inegociável.** Validar capacidade técnica ANTES do lançamento, não durante. Checkout testado no dia do lançamento é aposta.

**4. Plano B por cenário, não por esperança.** Se algo dá errado (e vai dar), plano B já pronto evita improviso ruim.

**5. War room diário durante o lançamento.** Ajuste rápido em ciclo de 24h. Esperar até depois = decisão tardia.

## Erros clássicos em primeiro lançamento

- Foco só em copy, esquecer a operação
- Equipe despreparada pro volume
- Stack técnico sem stress test
- Sem plano B (se algo dá errado, pânico)
- Decisões sem donos (paralisia na hora crítica)
- Pós-lançamento esquecido (onboarding ruim = churn rápido)

## Sinais de lançamento bem operacionalizado

- Nenhuma surpresa grande (tudo que acontece já foi planejado)
- Equipe calma no dia D (sabe o que fazer)
- Problemas resolvidos em minutos, não horas
- Experiência de compra suave pro cliente
- Dados limpos pra analisar ao final (tracking preparado)
- Equipe sai com documentação pro próximo lançamento

## Diferenciação clara de responsabilidades

Este blueprint é a parte **operacional**. Combina com:
- Engine de emails de lançamento (copy dos emails de cada fase)
- Arquitetura de tracking (como medir tudo isso)
- Scorecard de métricas (como interpretar os dados)

Os três juntos = sistema completo.

---
**Maturidade operacional:** Depois de 3-5 lançamentos, você tem dados + playbook + processo documentado. A partir daí, lançamento vira produto repetível — não evento único. Escale pela repetição, não pela intensidade. Lançamentos recorrentes com menos estresse e mais previsibilidade > um lançamento épico exaustivo sem aprendizado replicável.
