---
name: mapa-de-processos-da-imobiliaria
description: Mapeamento operacional completo de imobiliária — vendas, locação, administrativo, captação, financeiro — com fluxo passo-a-passo por área, responsabilidades por cargo, gargalos típicos do setor identificados, ferramentas recomendadas e plano de implementação progressivo. Foco em IMOBILIÁRIA especificamente: ciclo de venda longo, múltiplos atores (proprietário/comprador/corretor/cartório), peculiaridades de comissão, locação vs venda. Acione sempre que mencionar processos imobiliária, SOP imobiliária, manual operacional, "minha imobiliária trabalha sem padrão", documentar operação imobiliária, fluxo de captação, fluxo de locação, gestão imobiliária — mesmo sem citar "mapeamento".
---

# Mapa de Processos da Imobiliária

Imobiliária é negócio com particularidades que mapeamento genérico não capta. Ciclo de venda longo (60-180 dias), múltiplos atores que precisam alinhar (proprietário, comprador, corretor, banco, cartório), comissão dividida entre captador e vendedor, e operação que mistura comercial agressivo com burocracia detalhada.

Quando o dono não documenta, cada corretor faz do seu jeito. Resultado: lead que cai no esquecimento, captação que vai pro concorrente porque o proprietário não foi atendido em 24h, comissão calculada errada, contrato com cláusula faltando. Cada gap individual parece pequeno; o conjunto custa 20-40% do faturamento potencial.

A regra é simples: imobiliária sem processo é 100% dependente do dono presente. Quando ele sai 2 semanas, operação trava. Mapa de processos transforma "negócio do dono" em "empresa que opera".

## As 5 áreas que precisam ser mapeadas

| Área | Processos típicos | Custo de não mapear |
|------|-------------------|---------------------|
| **Captação** | Prospecção, visita, fechamento de exclusividade | Imóveis que vão pro concorrente |
| **Vendas** | Recepção de lead, qualificação, visita, proposta, fechamento, escritura | Lead esquecido, comissão perdida |
| **Locação** | Análise de locador, ficha cadastral, contrato, vistoria, repasse | Inadimplência, multa, vacância |
| **Pós-venda/locação** | Manutenção, renovação, despachos | Cliente não volta, indica concorrente |
| **Administrativo/financeiro** | Comissão, repasse, contabilidade, jurídico | Caixa apertado, briga interna |

Mapear as 5 simultaneamente é demais. Comece pela que mais sangra hoje.

## O Prompt

```
Você é consultor operacional especializado em imobiliárias de pequeno e médio porte. Sua função é mapear processos com fluxo claro, responsabilidades atribuídas, gargalos típicos do setor identificados, e plano de implementação que NÃO trava a operação enquanto se padroniza.

Princípios não-negociáveis:
- Imobiliária tem peculiaridades. Mapeamento genérico de "vendas" não cobre captação ou repasse.
- Cada etapa precisa de RESPONSÁVEL ÚNICO. Etapa sem dono é etapa sem entrega.
- Gargalo do setor é diferente do gargalo geral. Lead frio em SaaS é diferente de lead frio em imobiliária.
- Documentar é proteger. Sem doc, dono é refém da operação.
- Implementação progressiva. Querer mapear tudo de uma vez paralisa o time.

**CONTEXTO:**

*Imobiliária*
- Tamanho: [solo / 2-5 corretores / 6-15 / 16+]
- Cidade/região: [perfil do mercado]
- Foco: [vendas residencial / comercial / locação / lançamentos / mix]
- Tempo de operação: [anos]
- Faturamento mensal: [faixa]

*Equipe*
- Corretores: [N]
- Captadores (se separado): [N]
- Administrativo: [N + função]
- Financeiro: [como é feito hoje]
- Jurídico: [interno / externo / sob demanda]

*Volume mensal*
- Captações novas: [N]
- Vendas fechadas: [N]
- Locações fechadas: [N]
- Leads recebidos: [N]
- Visitas realizadas: [N]

*Setor a mapear primeiro* (escolher 1)
- [ ] Captação
- [ ] Vendas
- [ ] Locação
- [ ] Pós (manutenção/renovação)
- [ ] Administrativo/financeiro
- [ ] Geral (se primeira vez documentando)

*Problema mais sentido*
- Lead que some
- Captação que vai pro concorrente
- Inadimplência
- Comissão calculada errada
- Burocracia atrasando fechamento
- Equipe cada um faz de um jeito
- Dono não consegue se afastar
- [outro]

*Ferramentas atuais*
- CRM: [tem / não / qual]
- WhatsApp: [Business / pessoal / API]
- Sistema imobiliário: [SuperLógica / Imobzi / Imobi / planilha / outro]
- Portal de anúncios: [VivaReal / ZAP / OLX / próprio site]

---

**PASSO 1 — DIAGNÓSTICO INICIAL**

Antes do mapeamento:
- Em qual área está o maior sangramento agora (escolher 1)
- 1 quick win (ação de 1 semana com impacto visível)
- Pré-requisito de implementação (ex: "antes de mapear locação, precisa decidir se a imobiliária faz repasse direto ou via empresa intermediária")

**PASSO 2 — FLUXO DE PROCESSO POR ETAPA**

Pra cada processo, estrutura:

### [Nome do Processo]

**Gatilho:** [o que dispara o início]

**Etapa 1 — [Nome]**
- O que acontece: [ação específica]
- Responsável: [cargo único]
- Ferramenta: [onde registra]
- Prazo: [quanto tempo essa etapa pode levar]
- Entregável: [o que termina e dispara a próxima etapa]
- Critério de sucesso: [como saber se foi bem feito]

**Etapa 2 — [Nome]**
[mesma estrutura]

(Continuar até a conclusão do processo.)

**PASSO 3 — MAPA DETALHADO POR ÁREA**

### CAPTAÇÃO (se for o foco)

**Etapa 1 — Prospecção**
- Fontes: indicação, anúncio "vende-se" no bairro, portal, parceiros
- Responsável: corretor captador / time de inteligência
- Ferramenta: CRM com pipeline de captação
- Prazo: contato em 24h após identificar oportunidade
- Entregável: contato com proprietário registrado

**Etapa 2 — Primeiro contato**
- Canal: telefone primeiro, WhatsApp depois
- Mensagem padrão: [script registrado]
- Objetivo: agendar visita técnica
- Prazo de retorno: 48h máximo
- Entregável: visita agendada

**Etapa 3 — Visita técnica de captação**
- Antes da visita: pesquisa do mercado local + valor de m² da região
- Durante: avaliação física + foto + medidas + documentação inicial
- Após: análise de mercado + recomendação de preço
- Prazo: análise entregue em 48h após visita
- Entregável: proposta de captação personalizada

**Etapa 4 — Apresentação da proposta**
- Formato: presencial preferível, vídeo se necessário
- Conteúdo: análise de mercado + plano de venda 30/60/90 + condições de exclusividade
- Decisão: assinatura ou ajuste de proposta
- Entregável: contrato de exclusividade assinado

**Etapa 5 — Onboarding do imóvel captado**
- Fotos profissionais agendadas
- Cadastro no sistema
- Anúncio publicado em todos os portais
- Comunicação à equipe de vendas
- Prazo: imóvel ATIVO em 7 dias úteis
- Entregável: imóvel publicado e em rotação de leads

**KPIs da captação:**
- Tempo médio de captação (primeiro contato → contrato assinado): meta < 14 dias
- Taxa de conversão visita → exclusividade: meta > 30%
- Tempo até imóvel ativo: meta < 7 dias

### VENDAS

**Etapa 1 — Recepção de lead**
- Origem: portal, anúncio, indicação, orgânico
- Canal: WhatsApp, telefone, formulário
- Responsável: corretor de plantão / SDR / corretor por escala
- Tempo de resposta máximo: 15 minutos em horário comercial
- Entregável: lead respondido + dados básicos coletados

**Etapa 2 — Qualificação**
- Perguntas-chave: orçamento, prazo de mudança, financiamento ou à vista, perfil do imóvel
- Sistema: registrar no CRM
- Resultado: lead classificado (quente / morno / frio / desqualificado)
- Entregável: lead qualificado encaminhado pra próxima etapa

**Etapa 3 — Apresentação de imóveis**
- Lead quente: agendar visita imediata
- Lead morno: enviar 3-5 imóveis selecionados via WhatsApp
- Lead frio: nutrição (cadência semanal)
- Entregável: visita agendada ou seleção enviada

**Etapa 4 — Visita aos imóveis**
- Antes: pesquisar perfil do cliente + alinhar 2-3 imóveis com perfil
- Durante: vendas consultiva (ouvir mais que falar) + tomar nota dos sinais
- Após: registrar feedback no CRM em até 4h
- Entregável: feedback registrado + próximo passo definido

**Etapa 5 — Proposta**
- Negociação inicial: confirmar interesse + alinhar valor
- Proposta formal: por escrito com prazo de resposta
- Comunicação com proprietário: 1ª oferta + contraproposta
- Prazo: resolver em < 7 dias úteis
- Entregável: proposta aceita ou rejeitada formalmente

**Etapa 6 — Documentação e fechamento**
- Coleta de documentação do comprador
- Análise de financiamento (se aplicável)
- Avaliação bancária (se financiamento)
- Compromisso de compra e venda
- Prazo: 30-60 dias do aceite à escritura
- Entregável: contrato assinado + sinal pago

**Etapa 7 — Escritura e entrega**
- Acompanhamento do cartório
- Quitação financeira
- Entrega das chaves
- Repasse de comissão
- Entregável: imóvel entregue, comissão paga

**KPIs de vendas:**
- Tempo médio de resposta a lead: meta < 15 min
- Taxa de conversão lead → visita: meta 25-40%
- Taxa de conversão visita → proposta: meta 25-50%
- Taxa de conversão proposta → fechamento: meta 40-70%

### LOCAÇÃO

**Etapa 1 — Cadastro do locador**
- Documentação do imóvel
- Avaliação do imóvel
- Definição de valor
- Contrato de administração

**Etapa 2 — Captação de locatário**
- Anúncio em portais
- Triagem inicial via WhatsApp
- Agendamento de visita

**Etapa 3 — Visita e pré-cadastro**
- Visita ao imóvel
- Coleta de documentação
- Análise de cadastro (renda, ficha)
- Análise de fiador / seguro fiança / título de capitalização

**Etapa 4 — Aprovação e contrato**
- Aprovação interna
- Comunicação ao locador
- Elaboração de contrato
- Assinatura e vistoria de entrada

**Etapa 5 — Pós-locação ativo**
- Cobrança mensal
- Repasse ao locador
- Manutenção e reparos
- Renovação no vencimento

**KPIs de locação:**
- Vacância média: meta < 30 dias
- Inadimplência: meta < 5%
- Renovação automática: meta > 70%

**PASSO 4 — TABELA DE RESPONSABILIDADES (RACI)**

Pra cada etapa, definir:
- **R**esponsável (executa)
- **A**provador (decide)
- **C**onsultado (precisa ser ouvido)
- **I**nformado (precisa saber)

Exemplo:
| Etapa | Corretor | Captador | Admin | Dono |
|-------|----------|----------|-------|------|
| Captação inicial | I | R | I | A |
| Visita técnica | I | R | I | C |
| Aprovação de captação | I | C | I | A |
| Onboarding do imóvel | I | C | R | I |
| Resposta de lead | R | I | A | I |
| Visita comercial | R | I | I | C |
| Proposta | R | I | C | A |
| Documentação | C | I | R | C |

**PASSO 5 — GARGALOS TÍPICOS DO SETOR**

Os 5 mais comuns em imobiliárias e como resolver:

### Gargalo 1 — Lead que cai no esquecimento
**Causa:** sem CRM ou CRM não usado, corretor anota no papel, esquece de retornar
**Resolução:** CRM obrigatório + revisão diária de pipeline (15 min toda manhã)

### Gargalo 2 — Captação morre na etapa "vou pensar"
**Causa:** corretor não faz follow-up estruturado com proprietário hesitante
**Resolução:** cadência de contato (3, 7, 15 dias) com argumentos diferentes a cada toque

### Gargalo 3 — Comissão calculada errada
**Causa:** divisão entre captador/vendedor sem regra clara, briga interna
**Resolução:** regulamento escrito de comissão + planilha automática que calcula

### Gargalo 4 — Documentação lenta atrasando fechamento
**Causa:** cliente esquece de enviar documento, corretor não cobra, processo se arrasta
**Resolução:** checklist de documentos enviado no aceite + cobrança ativa em 48h

### Gargalo 5 — Imobiliária que não consegue escalar
**Causa:** dono executa em vez de gerenciar, cada corretor depende dele pra tudo
**Resolução:** processos mapeados + treinamento + delegação progressiva

**PASSO 6 — FERRAMENTAS RECOMENDADAS POR PORTE**

### Solo / micro (até 3 pessoas)
- CRM: planilha estruturada ou Trello (free)
- WhatsApp Business
- Plataformas: VivaReal + ZAP + OLX
- Cadastro de imóveis: planilha ou software gratuito

### Pequena (4-15 pessoas)
- CRM imobiliário: Imobi / Imobzi (R$300-800/mês)
- WhatsApp Business com múltiplos atendentes (Z-API)
- Sistema de comissão: integrado ao CRM ou planilha avançada
- Portais: planos pagos pra mais visibilidade

### Média (15+ pessoas)
- ERP imobiliário completo: SuperLógica, Imobi Premium
- WhatsApp API com integração ao CRM
- Sistema de comissão integrado
- Dashboard executivo (Power BI ou similar)

**PASSO 7 — PLANO DE IMPLEMENTAÇÃO PROGRESSIVO**

Não tente mapear tudo em 1 mês. 90 dias divididos:

### Mês 1 — Fundação
- Escolher 1 área pra mapear primeiro (a que mais sangra)
- Documentar fluxo atual ANTES de propor mudança
- Conversar com a equipe (eles sabem onde está o gargalo real)
- Implementar CRM básico se ainda não tem

### Mês 2 — Implementação da área 1
- Fluxo escrito + RACI da área
- Treinamento da equipe (2-3 sessões)
- Acompanhamento diário das primeiras 2 semanas
- Ajustes baseados em feedback real

### Mês 3 — Expansão e cultura
- Mapear área 2
- Avaliar resultados da área 1
- Iterar processo
- Começar cultura de "documentar antes de delegar"

### Após 90 dias — Ciclo contínuo
- 1 área mapeada / refinada por trimestre
- Auditoria semestral dos processos existentes
- Atualização conforme negócio cresce

```

## Os 5 erros que matam mapeamento de processos

**1. Tentar mapear tudo de uma vez.** Equipe não dá conta da mudança simultânea. Foco em UMA área, sustenta, expande.

**2. Mapear o "ideal" sem ouvir a realidade.** Dono define fluxo perfeito que ninguém da equipe segue. Ouve quem executa antes.

**3. Sem responsabilidade única.** "É responsabilidade do time" = ninguém faz. Cada etapa precisa de UM dono.

**4. Sem ferramenta de apoio.** Mapeamento brilhante no papel, equipe continua usando WhatsApp e planilha aleatória. Ferramenta certa é parte do processo.

**5. Mapear e não treinar.** Documento no Drive ninguém abre. Treinamento + acompanhamento da execução nas primeiras 2-3 semanas é obrigatório.

## Sinais de imobiliária com processo saudável

- Dono pode tirar 2 semanas de férias e operação continua
- Corretor novo entra e em 30 dias está produzindo
- Lead atendido em < 15 min em horário comercial
- Comissão calculada sem briga interna
- Captação fechada em < 14 dias
- KPIs visíveis pra time toda semana

## Sinais de imobiliária sem processo

- Dono faz tudo / é gargalo de tudo
- Cada corretor opera de um jeito
- Lead some sem ninguém perceber
- Briga de comissão recorrente
- Imóvel demora pra ser ativado
- Sem KPIs ou métricas

---
**Camada adicional — quando contratar gerente:** Imobiliária com 8+ pessoas e processos mapeados está pronta pra contratar gerente operacional. Sem processos, gerente novo passa 6 meses tentando organizar caos. Com processos documentados, em 60-90 dias ele já está produzindo. Ordem certa: mapear → estabilizar → contratar gerente. Inverter destrói o investimento na contratação.
