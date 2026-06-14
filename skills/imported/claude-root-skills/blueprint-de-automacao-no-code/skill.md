---
name: blueprint-de-automacao-no-code
description: Projeta arquitetura completa de fluxos no-code (n8n, Zapier, Make/Integromat) — com gatilho, encadeamento de nós, condicionais, tratamento de erros, retry logic, mapping de campos entre sistemas e cálculo de custo por execução. Documentação tão clara que cliente ou desenvolvedor júnior implementa em horas. Compara n8n (self-hosted, gratuito) vs Zapier (pago, simples) vs Make (visual, intermediário) e recomenda a stack certa por volume + complexidade. Acione sempre que mencionar: n8n, Zapier, Make, Integromat, automação no-code, integração de sistemas, "automatizar processo", workflow, fluxo automatizado, webhook, API, conectar ferramentas, sincronizar dados, Pipedream — mesmo sem citar "automação".
---

# Blueprint de Automação No-Code

Automação que vai pra produção sem blueprint vira pesadelo de manutenção. 6 meses depois, ninguém lembra por que aquele nó está ali, qual era a regra de exceção, ou o que faz quando a API do CRM cai. Resultado: automação quebra silenciosamente, e ninguém percebe até o cliente reclamar.

Blueprint bem feito faz 4 coisas críticas:

1. **Documenta antes de construir** (decide a arquitetura no papel, não testa em produção)
2. **Mapeia campos entre sistemas** (quase todo bug vem de mapping errado)
3. **Trata erros explicitamente** (retry, fallback, log, notificação)
4. **Calcula custo por execução** (Zapier/Make cobram por operação — sem cálculo, surpresa na fatura)

Essa skill entrega o blueprint, não o "exemplo bonitinho de fluxo simples". É documento que vai pra produção e sobrevive trocas de equipe.

## A escolha da plataforma — não é gosto, é matemática

| Plataforma | Custo | Curva | Quando usa |
|-----------|-------|-------|-----------|
| **n8n self-hosted** | R$0 + R$30-100 servidor | Alta (precisa entender JSON, expressões) | Volume alto (>5k execuções/mês) ou customização extrema |
| **n8n Cloud** | $20-50/mês | Média | Quem quer n8n sem gerir servidor |
| **Zapier** | $20-700/mês conforme volume | Baixa | Volume baixo (<2k execs/mês) e cliente pouco técnico |
| **Make (Integromat)** | $9-29/mês inicial, mais por volume | Média | Visual mais rica que Zapier, custo melhor em médio volume |
| **Pipedream** | $19-49/mês | Média-alta | Quando precisa de código JS/Python no meio do fluxo |

A escolha errada faz cliente pagar 5x mais ou ter que migrar tudo em 3 meses.

## A regra do cálculo de operações

Cada plataforma conta diferente:

- **Zapier** = 1 task = 1 ação executada (não conta gatilhos)
- **Make** = 1 operation = 1 nó executado (conta gatilhos e condicionais)
- **n8n** = sem limite (self-hosted) ou por execução de workflow (cloud)

Fluxo simples (gatilho + 3 ações + 1 condicional) executado 100 vezes/dia:
- Zapier: 300 tasks/dia → 9.000/mês → plano $49 (Starter 750/mês NÃO basta)
- Make: 500 ops/dia → 15.000/mês → plano $16 (Core)
- n8n self-hosted: ilimitado, R$0

A mesma automação custa de R$0 a R$1.500/mês. Por isso o blueprint inclui cálculo.

## O Prompt

```
Você é arquiteto de automação no-code com profundidade em n8n, Zapier, Make/Integromat e integrações via API. Você opera sob princípios:
1. Gatilho explícito — toda automação começa com "QUANDO X acontece". Sem gatilho claro, fluxo é evento solto
2. Um passo por vez — cada nó faz UMA coisa. Nó que faz 3 coisas vira impossível de debugar
3. Tratamento de erro NÃO é opcional — campo vazio, API caída, timeout, dados inválidos: tudo precisa ter caminho
4. Documente pra quem vai manter — quem construiu vai esquecer; quem vai herdar precisa entender em 30 minutos
5. Cálculo de custo é parte do design — escolher plataforma sem somar operações é receita pra surpresa de R$ no fim do mês

Sua função NÃO é "fazer o tutorial básico" — é projetar arquitetura de produção que sobrevive 12+ meses sem retrabalho.

**CONTEXTO:**

*Processo a automatizar*
Descreva passo-a-passo o fluxo desejado em linguagem natural:
[ex: "Quando lead preenche formulário no Typeform, quero que (1) receba email de boas-vindas com link de agendamento Calendly, (2) entre como contato no HubSpot com tag 'lead-quente', (3) eu receba notificação no Slack do canal #leads, e (4) se o lead marcar agendamento dentro de 24h, gere notificação extra no WhatsApp pra mim"]

*Sistemas envolvidos*
- Origem (gatilho): [Typeform / Tally / WordPress / Shopify / Google Forms / etc.]
- Destinos (ações):
  - [HubSpot / RD Station / Pipedrive / outro CRM]
  - [Gmail / Outlook / Mailchimp / outro email]
  - [Slack / Discord / WhatsApp / Telegram]
  - [Google Sheets / Notion / Airtable / outro storage]
  - [Stripe / Pagar.me / outro pagamento]
- Condicionais: [se houver — ex: só enviar se valor > R$500]

*Volume e frequência*
- Quantas execuções por dia/semana/mês: [estimativa]
- Pico esperado: [ex: 50/dia normalmente, 300/dia em campanha]
- Latência aceitável: [tempo real / aceito até 5min de delay / batch noturno]

*Critérios técnicos*
- Plataforma preferida (se houver): [n8n / Zapier / Make / sem preferência]
- Self-hosted permitido: [sim / não — clientes corporate às vezes não permitem]
- Budget mensal pra ferramenta: [R$ disponível]
- Quem vai manter depois: [eu / cliente técnico / cliente leigo / dev terceirizado]

*Dados sensíveis envolvidos*
- LGPD: [tem dado pessoal? cadastro completo? CPF? saúde?]
- Compliance setorial: [PCI / HIPAA / outro]

*Restrições do cliente*
- Sistemas legacy obrigatórios: [se houver]
- Integrações que JÁ EXISTEM: [se houver — não duplicar]
- Janelas de execução proibidas: [se houver — ex: nada entre 0h-6h por causa de manutenção do servidor]

---

**PASSO 1 — DIAGNÓSTICO E RECOMENDAÇÃO DE STACK**

Antes do blueprint, declare:
- Plataforma recomendada (n8n / Zapier / Make / outra) com justificativa de 3 linhas
- Volume mensal estimado de operações
- Custo mensal projetado da plataforma
- Custo mensal de outras ferramentas necessárias (Z-API se WhatsApp, etc.)
- Total estimado: R$ X/mês de stack
- Complexidade do fluxo (1-5)
- Tempo estimado de implementação: [horas]

**PASSO 2 — DIAGRAMA DE ARQUITETURA**

Diagrama em texto (ASCII art ou descrição) do fluxo completo:

```
┌────────────────────────────────────────────────────┐
│ GATILHO: Webhook Typeform — novo preenchimento    │
└─────────────────┬──────────────────────────────────┘
                  ↓
┌────────────────────────────────────────────────────┐
│ NÓ 1: Set/Format — extrair e padronizar campos    │
│ - nome (text)                                       │
│ - email (text, lowercase, trim)                    │
│ - telefone (regex: só números)                     │
│ - empresa (text)                                    │
│ - segmento (dropdown)                              │
└─────────────────┬──────────────────────────────────┘
                  ↓
┌────────────────────────────────────────────────────┐
│ NÓ 2: IF — Email é válido (regex)?                 │
└────┬───────────────────────────────────┬───────────┘
     │ TRUE                              │ FALSE
     ↓                                   ↓
┌─────────────────────┐         ┌────────────────────┐
│ NÓ 3a: Gmail —      │         │ NÓ 3b: Log error  │
│ enviar boas-vindas │         │ Sheets+notificação│
└──────────┬──────────┘         └────────────────────┘
           ↓
┌─────────────────────┐
│ NÓ 4: HubSpot —    │
│ create contact +   │
│ tag 'lead-quente'  │
└──────────┬──────────┘
           ↓
[continua...]
```

**PASSO 3 — BLUEPRINT NÓ-A-NÓ DETALHADO**

Pra cada nó do fluxo:

### Nó X — [Nome descritivo]
- **Tipo**: [Trigger / Action / Condition / Loop / Wait / Subworkflow]
- **Plataforma**: [Typeform / HubSpot / etc.]
- **Operação específica**: [ex: "Create or update contact"]

**Configuração:**
- [campo a configurar 1]: [valor / expressão]
- [campo a configurar 2]: [valor / expressão]

**Mapping de campos (o ponto crítico que mais causa bug):**

| Campo do nó atual | Origem (nó anterior) | Transformação aplicada |
|-------------------|---------------------|------------------------|
| email | {{ $json.email }} | toLowerCase + trim |
| firstname | {{ $json.nome.split(' ')[0] }} | first word |
| lastname | {{ $json.nome.split(' ').slice(1).join(' ') }} | rest of words |
| phone | {{ $json.telefone.replace(/\D/g, '') }} | só números |
| company | {{ $json.empresa }} | direct |
| lifecyclestage | "lead" | static |
| hs_lead_status | "NEW" | static |
| utm_source | {{ $json.utm_source ?? 'direct' }} | fallback se null |

**Output esperado:**
- Sucesso: [contact_id retornado]
- Falha possível: [duplicate / api error / rate limit]

**Tratamento de erro:**
- Retry: [3x com backoff exponencial 5s/15s/45s]
- Se falhar após retry: [enviar pra fila de erro + notificar Slack]
- Não bloquear fluxo: [continua os próximos nós com {{ contact_id: null }}]

**PASSO 4 — TRATAMENTO DE ERROS COMPLETO**

Documente pra cada categoria:

### Erro de DADO (campo vazio, formato errado)
- Ação: validar antes do nó da API; se inválido, log + notificar + continuar (sem propagar dados ruins)

### Erro de API (timeout, 500, rate limit)
- Ação: retry automático 3x com backoff
- Se persistir: enviar pra fila de erro (Sheets/Notion) + notificação Slack
- Re-execução manual: documentar como reprocessar

### Erro de AUTENTICAÇÃO (token expirado)
- Ação: notificação CRÍTICA imediata (token expirado bloqueia tudo)
- Sem retry automático (não vai resolver sem ação humana)

### Erro de DEPENDÊNCIA (sistema A precisa funcionar pra B)
- Ação: condicional de continuar mesmo com falha em A, ou abortar fluxo (decidir caso a caso)

### Erro SILENCIOSO (executou mas resultado errado)
- O mais perigoso
- Ação: validação pós-execução com asserções (se conta de contato no HubSpot deveria ter X tag, verificar e logar se não tem)

**PASSO 5 — TESTE ANTES DE PRODUÇÃO**

Roteiro de teste:

### Teste 1 — Caminho feliz
- Dado fictício completo + válido
- Executar manualmente
- Verificar TODOS os destinos receberam dado correto
- Tempo total de execução: [registrar pra benchmark]

### Teste 2 — Campo opcional vazio
- Dado com campos opcionais ausentes
- Verificar que fluxo não quebra
- Verificar que valor default ou null é tratado corretamente

### Teste 3 — Campo obrigatório inválido
- Email com formato errado, telefone com letras
- Verificar que validação detecta e roteia pro caminho de erro
- Verificar log/notificação

### Teste 4 — Falha simulada de API
- Desabilitar API key temporariamente OU usar endpoint inexistente
- Verificar retry funciona
- Verificar fila de erro recebe corretamente
- Verificar notificação Slack chega

### Teste 5 — Volume (load test)
- Disparar 50 execuções em 1 minuto
- Verificar que todas completam sem timeout
- Verificar que rate limit das APIs não estoura
- Documentar limite real de capacidade

**PASSO 6 — DEPLOY E MONITORAMENTO**

### Pré-deploy
- Backup do fluxo (export JSON)
- Documentação do blueprint salva
- Credenciais validadas
- Webhook URL atualizado em sistemas origem

### Deploy
- Ativar fluxo
- Monitorar primeiras 24h ativamente

### Monitoramento contínuo
- Dashboard de execuções (sucesso vs erro)
- Alerta automático se taxa de erro > 5%
- Revisão semanal do log de erros
- Re-execução manual de fluxos que falharam

**PASSO 7 — DOCUMENTAÇÃO DE HANDOFF**

Pra entregar o fluxo pro cliente ou outro dev manter:

### Documento README do fluxo:
- **Nome do fluxo** + descrição em 2 linhas
- **Quando dispara**: gatilho explícito
- **O que faz**: lista numerada das ações
- **Sistemas envolvidos**: e suas credenciais
- **Custos mensais estimados**: ferramenta + APIs
- **Como debugar**: passo-a-passo de troubleshooting comum
- **Como reprocessar**: pra fluxo que deu erro
- **Contato**: quem mantém / quem implementou

### Diagrama visual exportado
- Print do fluxo na plataforma + diagrama lógico em separado

### Backup
- Export JSON do fluxo (recriar em caso de desastre)

**PASSO 8 — CÁLCULO DETALHADO DE CUSTO**

Pra plataforma escolhida:

### Operações por execução
- Listar cada nó que conta como operação (varia por plataforma)
- Ex Make: 7 operações por execução

### Volume mensal estimado
- 50 execuções/dia × 30 dias = 1.500 execuções/mês
- 1.500 × 7 ops = 10.500 operações/mês

### Plano necessário
- Make Core ($9): 10.000 ops — INSUFICIENTE
- Make Pro ($16): 10.000 ops — INSUFICIENTE
- Make Pro+: precisa upgrade ou plano custom
- Recomendação: começar com Pro ($16), monitorar e migrar se necessário

### Custo total stack
- Make Pro: $16/mês ≈ R$ 80
- Z-API (WhatsApp): R$ 97/mês
- Total: R$ 177/mês

### Comparação com alternativa
- n8n self-hosted: R$ 0 + R$ 30 servidor = R$ 30/mês
- Diferença: R$ 147/mês = R$ 1.764/ano economizados se migrar pra n8n

**PASSO 9 — TEMPLATE PRA SETOR**

Se a automação atende setor específico, transforme em template replicável:

### Variáveis pra cliente preencher
- Nome empresa
- API keys de cada serviço
- Personalizações de copy
- Triggers de notificação

### Pasta de delivery padrão
- README.md (passo-a-passo)
- workflow.json (export pro cliente importar)
- credenciais.template.md (lista de o que ele precisa fornecer)

Isso transforma fluxo único em produto replicável (alta margem em consultoria de implementação).

**PASSO 10 — ANTI-PADRÕES**

- Construir direto na plataforma sem documentar (vira caixa preta)
- Não validar dados de entrada (vai propagar dado ruim pra todos os destinos)
- Não tratar erro de API (1 falha derruba todo o fluxo silenciosamente)
- Mistura mapping com transformação no mesmo nó (debug vira pesadelo)
- Hardcode de credenciais (queda de segurança)
- Sem cálculo de custo prévio (surpresa de R$1.500 na fatura mês 2)
- Sem teste de volume (estoura rate limit em campanha grande)
```

## Regras da automação que sobrevive 12+ meses

**1. Documente antes de construir.** Blueprint em texto SEMPRE precede o "drag and drop" na plataforma. Decisão arquitetural no papel é 10x mais barata que refazer fluxo.

**2. Mapping de campos é onde mora o bug.** 70% dos erros de automação vêm de campo mapeado errado. Tabela de mapping explícita SALVA muito retrabalho.

**3. Erro silencioso > erro escandaloso.** Erro que faz o fluxo travar é fácil de descobrir. Erro que executa "com sucesso" mas com dado errado é desastre. Validações pós-execução são essenciais.

**4. Volume mata fluxo simples.** Fluxo que roda 10x/dia perfeitamente pode quebrar quando rodar 500x. Teste de volume PRECEDE produção.

**5. Cálculo de custo evita migração forçada.** Cliente que descobriu que Zapier custa R$1.500/mês depois de 6 meses de uso vai precisar migrar TUDO. Calcular antes evita.

## Erros que matam automações

- Hardcode de API key (vaza com export do fluxo)
- Webhook URL sem autenticação (qualquer um dispara)
- Sem rate limit no nó de envio (Gmail bloqueia depois de 100/hora)
- Loop infinito por mapping mal feito (consome operações até estourar plano)
- Notificação no Slack sem ID de execução (quando dá erro, ninguém sabe qual foi)
- Sem versionamento (cliente edita, quebra, não consegue voltar)

## Sinais de automação saudável

- 95%+ de execuções com sucesso
- Tempo médio de execução estável (sem crescimento ao longo do tempo)
- Erros são detectados em horas, não dias
- Cliente nunca recebe dado errado por causa do fluxo
- Substituível: outra pessoa consegue manter sem ter construído

## Stack típica recomendada por contexto

### Cliente solo / pequeno (até 1k execs/mês)
- Plataforma: Zapier ou Make
- Custo: R$ 50-100/mês
- Fluxos: 5-10 ativos

### Empresa pequena (1k-10k execs/mês)
- Plataforma: Make ou n8n cloud
- Custo: R$ 100-300/mês
- Fluxos: 10-30 ativos

### Empresa média (10k-100k execs/mês)
- Plataforma: n8n self-hosted (custo plataforma R$ 0-150)
- Custo: R$ 150-500/mês (servidor + APIs)
- Fluxos: 30-100 ativos

### Operação alta escala (100k+ execs/mês)
- Plataforma: n8n self-hosted ou solução custom
- Custo: R$ 500-2.000/mês (cluster + monitoramento)
- Fluxos: 100+ ativos com governança

## Quando NÃO usar no-code

- Lógica complexa que exige loop com break complicado
- Volume massivo (>1M execs/mês) — código custom é mais barato
- Compliance pesado (precisa auditoria detalhada de cada execução)
- Latência ultra-baixa (<100ms requer arquitetura específica)

Em 90% dos casos de PME, no-code resolve. Os 10% restantes precisam de dev tradicional.

---
**Movimento avançado:** Depois de 6-12 meses operando 30+ fluxos, monte **biblioteca de subworkflows reutilizáveis** — funções comuns (validar email, enriquecer dado de empresa via Clearbit, sincronizar contato CRM-email-sheets) viram blocos chamáveis por outros fluxos. Isso reduz manutenção em 60%, padroniza tratamento de erro e cria ativo escalável. Operação que tinha 30 fluxos sobreposto e bagunçado vira 30 fluxos limpos chamando 8 subworkflows comuns. É o nível em que automação no-code se aproxima de arquitetura de software profissional.
