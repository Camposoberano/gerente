---
name: diagnostico-de-conformidade-lgpd
description: Avalia o estado atual de conformidade com a LGPD usando checklist prático em 8 áreas, atribui score de conformidade, identifica gaps por prioridade e gera plano de adequação priorizado por risco. Não confunde "lista de tarefas jurídicas" com "mapa de ação" — calibra pelo porte e tipo da empresa. Acione sempre que mencionar: checklist LGPD, adequação LGPD, auditoria de privacidade, "minha empresa tá em conformidade com LGPD", "o que preciso fazer pra LGPD", diagnóstico de proteção de dados, conformidade LGPD, score LGPD, plano de adequação — mesmo sem citar "checklist".
---

# Diagnóstico de Conformidade LGPD

Quase toda empresa digital no Brasil tá em algum grau de não-conformidade com a LGPD. O que varia é o risco dessa não-conformidade.

Empresa pequena com dados simples (cadastro, email, histórico de compra): risco menor. Empresa média com dados de saúde, menores ou financeiros: risco alto mesmo com operação pequena. Empresa grande: risco proporcional ao tamanho + natureza.

Essa skill não entrega "lista de 50 coisas pra fazer". Entrega **score de conformidade + priorização de ações por relação risco × esforço × impacto**.

## As 8 áreas que a LGPD cobre

Uma conformidade real cobre as 8 áreas abaixo. Skills de checklist genérico costumam focar só em 3-4 (política + banner + termos) e ignorar o resto.

| Área | O que avalia |
|------|--------------|
| 1. Governança e responsabilidade | DPO, responsáveis pelo tratamento, políticas internas |
| 2. Mapeamento de dados | Você sabe quais dados coleta, onde armazena, por quanto tempo, quem acessa |
| 3. Direitos dos titulares | Canal funcionante, prazo de resposta, processo estabelecido |
| 4. Consentimento e transparência | Política acessível, base legal clara, consentimento opt-in |
| 5. Segurança da informação | Criptografia, controle de acesso, backup, plano de incidente |
| 6. Compartilhamento e terceiros | Contratos com processadores, due diligence, revisão periódica |
| 7. Retenção e descarte | Prazo definido, mecanismo de exclusão, anonimização quando aplicável |
| 8. Treinamento e cultura | Equipe treinada, cultura de privacidade, rotinas periódicas |

Score baixo em qualquer uma dessas 8 = risco de não-conformidade.

## O Prompt

```
Você é consultor de LGPD com visão pragmática. Não enche empresário com exigências que não fazem sentido pro porte dele, mas também não minimiza riscos reais. Você sabe que: (1) MEI de serviço com 30 clientes tem risco diferente de plataforma com 100k usuários, (2) dados sensíveis multiplicam risco por 5x, (3) conformidade absoluta é ilusão — o objetivo é gerenciar risco.

IMPORTANTE: Esta skill não substitui consultoria jurídica/técnica especializada. Recomende DPO certificado ou escritório especializado pra empresas de risco alto ou crítico.

**CONTEXTO:**

*Empresa*
- Nome/tipo: [qual]
- Porte: [MEI / ME / EPP / médio / grande]
- Setor: [qual]
- Modelo: [e-commerce / SaaS / serviço profissional / agência / educação / saúde / financeiro / outro]
- Faturamento anual aproximado: [faixa]
- Número de clientes/usuários ativos: [ordem de grandeza]

*Dados que coleta*
Marque o que se aplica:
- [ ] Dados básicos (nome, email, telefone)
- [ ] CPF/CNPJ
- [ ] Endereço
- [ ] Dados de pagamento
- [ ] Dados de navegação (cookies, IP)
- [ ] Dados de localização
- [ ] Dados de saúde
- [ ] Dados financeiros detalhados
- [ ] Dados de crianças/adolescentes
- [ ] Dados biométricos
- [ ] Dados sobre convicções (política, religião, etc.)
- [ ] Outros dados sensíveis

*Canais de coleta*
- [ ] Formulário no site
- [ ] Checkout de e-commerce
- [ ] App mobile
- [ ] WhatsApp
- [ ] Formulário de contato/atendimento
- [ ] Redes sociais
- [ ] Eventos presenciais
- [ ] Parceiros/indicações

*Ferramentas/terceiros que tratam dados*
Liste todas (CRM, email, analytics, ads, pagamento, cloud, atendimento, BI).

*Status atual declarado (auto-avaliação honesta)*
- Tem política de privacidade publicada: [sim / sim mas desatualizada / não]
- Tem DPO ou responsável formal pela LGPD: [sim / não / dono acumula]
- Tem banner de cookies funcional: [sim / sim mas sem opção de recusa / não]
- Tem processo pra atender solicitações de titulares: [sim / ad hoc / nunca recebi]
- Treinou a equipe sobre LGPD: [sim / parcialmente / não]
- Tem mapeamento dos dados coletados (RIPD): [sim / parcial / não]
- Tem contratos com terceiros que tratam dados: [sim / alguns / não]

---

**PASSO 1 — CÁLCULO DE RISCO**

Declare:
- **Risco base por porte**: [baixo / médio / alto]
- **Multiplicadores que elevam o risco**:
  - Dados sensíveis coletados: +50% de peso
  - Menores como público: +100% de peso
  - Setor regulado (saúde, financeiro, educação): +50%
  - Volume grande (>10k registros ativos): +30%
  - Transferência internacional: +20%
  - Histórico de incidente: +40%
- **Nível final de risco**: [baixo / médio / alto / crítico]
- **Implicação do nível**: o que muda no plano de adequação

**PASSO 2 — CHECKLIST COMPLETO POR ÁREA**

Para cada uma das 8 áreas, avalie 4-8 itens concretos. Cada item com:
- **Status**: Conforme / Parcial / Não conforme / Não aplicável
- **Prioridade**: Alta / Média / Baixa
- **Ação requerida**: específica, não "adequar à LGPD"
- **Esforço estimado**: baixo (< 1 dia) / médio (1-5 dias) / alto (> 5 dias)
- **Impacto se ignorado**: reputacional / operacional / multa

### Área 1 — Governança e Responsabilidade
- [ ] DPO/Encarregado nomeado e informado publicamente
- [ ] Política interna de privacidade documentada
- [ ] Responsabilidades por tratamento de dados definidas
- [ ] Comitê de privacidade (se porte exigir)

### Área 2 — Mapeamento de Dados (Record of Processing / RIPD)
- [ ] Documento de Inventário de Dados (RIPD) criado
- [ ] Cada tratamento com finalidade e base legal documentadas
- [ ] Fluxo de dados mapeado (de onde vem, onde armazena, quem acessa)
- [ ] Prazo de retenção definido por tipo

### Área 3 — Direitos dos Titulares
- [ ] Canal funcionante pra solicitações (email ou formulário)
- [ ] Processo documentado pra responder em 15 dias
- [ ] Titulares informados sobre direitos na política
- [ ] Histórico de solicitações mantido

### Área 4 — Consentimento e Transparência
- [ ] Política de privacidade publicada e acessível
- [ ] Política atualizada nos últimos 12 meses
- [ ] Base legal explícita por tipo de tratamento
- [ ] Consentimento opt-in (não marcado por padrão) pra marketing
- [ ] Consentimento renovável (não eterno)
- [ ] Dados sensíveis com consentimento específico destacado

### Área 5 — Segurança da Informação
- [ ] Criptografia em trânsito (HTTPS em todas as páginas)
- [ ] Criptografia em repouso (dados críticos)
- [ ] Controle de acesso (quem vê o quê)
- [ ] Senhas fortes + 2FA nos acessos administrativos
- [ ] Backup regular e testado
- [ ] Plano de resposta a incidente documentado
- [ ] Notificação de incidente à ANPD em até 48-72h em caso de vazamento

### Área 6 — Compartilhamento e Terceiros
- [ ] Lista completa de processadores (terceiros que tratam dados)
- [ ] Contrato ou cláusula de tratamento de dados com cada um
- [ ] Due diligence mínimo (os terceiros são conformes?)
- [ ] Revisão anual dos contratos

### Área 7 — Retenção e Descarte
- [ ] Prazo de retenção por tipo de dado
- [ ] Mecanismo de exclusão após prazo
- [ ] Anonimização quando possível (em vez de exclusão)
- [ ] Processo pra excluir dados quando titular solicita

### Área 8 — Treinamento e Cultura
- [ ] Equipe treinada sobre LGPD básica
- [ ] Rotina de revisão periódica (semestral/anual)
- [ ] Novos funcionários recebem orientação de privacidade
- [ ] Cultura de "não vazar dados" é reforçada

**PASSO 3 — SCORE DE CONFORMIDADE**

Atribua score por área (0-100) e score global ponderado:

| Área | Score | Peso |
|------|-------|------|
| Governança | X/100 | 15% |
| Mapeamento | X/100 | 15% |
| Direitos dos titulares | X/100 | 15% |
| Consentimento/transparência | X/100 | 15% |
| Segurança | X/100 | 15% |
| Compartilhamento | X/100 | 10% |
| Retenção | X/100 | 10% |
| Treinamento | X/100 | 5% |

**Score global: X/100**

Interpretação:
- **0-30**: Não-conformidade grave. Plano de 90 dias obrigatório.
- **30-50**: Não-conforme. Risco significativo, exige ação em 60 dias.
- **50-70**: Parcial. Maior parte estruturada, gaps pontuais corrigíveis em 30 dias.
- **70-85**: Boa conformidade. Gaps menores, revisão periódica suficiente.
- **85+**: Conformidade alta. Manter + auditoria anual.

**PASSO 4 — TOP 5 AÇÕES PRIORITÁRIAS**

Ações que:
- Fecham gaps graves (áreas 1-5 com score < 40)
- Reduzem risco de multa/reclamação
- Têm custo-benefício alto (esforço baixo, impacto grande)

Para cada:
- Ação específica
- Área que endereça
- Esforço (dias-pessoa)
- Custo aproximado (se envolver fornecedor)
- Prazo recomendado
- O que NÃO fazer antes de completar essa

**PASSO 5 — PLANO DE ADEQUAÇÃO EM FASES**

### Fase 1 — Primeiros 30 dias (urgente)
Ações de risco alto + esforço baixo.

### Fase 2 — 30-60 dias
Construção do básico (RIPD, política atualizada, canal DPO).

### Fase 3 — 60-90 dias
Consolidação (treinamento, revisão de contratos, auditoria interna).

### Fase 4 — Contínuo
Rotinas periódicas (revisão semestral, treinamento anual, auditoria).

**PASSO 6 — RISCOS DE NÃO-CONFORMIDADE**

Detalhar pro caso específico:
- **Risco de multa**: faixa possível (até 2% do faturamento, máximo R$50M)
- **Risco reputacional**: dano em mercado competitivo
- **Risco jurídico**: ações individuais por dano moral
- **Risco comercial**: clientes B2B exigirem conformidade como condição
- **Risco regulatório** (setor específico): sanções setoriais somando-se à ANPD

**PASSO 7 — ORIENTAÇÃO FINAL**

Recomendar:
- Quando buscar DPO certificado
- Quando contratar escritório especializado
- Quando basta consultor pontual
- Quando o dono pode conduzir (com auditoria ocasional)
- Qual ferramenta/software pode automatizar (OneTrust, Privacy Tools, etc. se porte justificar)
```

## Regras do diagnóstico útil

**1. Conformidade não é binário.** É escalar (0 a 100). Qualquer checklist que diga "você está conforme" ou "não está" é simplista demais. O real é "conformidade X% com gaps em Y áreas".

**2. Risco calibra esforço.** Empresa pequena com dados simples pode viver com score 60 e plano de melhoria contínua. Empresa grande com dados sensíveis precisa de score 80+ e estrutura robusta.

**3. Política publicada ≠ conformidade.** Ter política é o mais visível mas 15% do trabalho. Os outros 85% são internos: RIPD, segurança, processo pra titular, contratos, treinamento.

**4. Consentimento não salva tudo.** Muitos negócios acham que "se eu pedir consentimento, posso fazer qualquer coisa". Falso. Consentimento é só uma das 10 bases legais — e é a mais frágil porque pode ser revogada.

**5. LGPD é processo, não projeto.** Adequação não termina. É rotina: revisões, atualizações, treinamentos, auditorias. Empresa que "fez a adequação em 2023" e nunca mais revisou tá tão exposta quanto se nunca tivesse feito.

## Erros que parecem conformidade mas não são

- Banner de cookies que só tem botão "Aceitar" (sem opção real de recusa)
- Política que cita GDPR europeu em vez de LGPD brasileira
- Consentimento que a pessoa "dá ao continuar navegando" (não é consentimento válido)
- Base legal "legítimo interesse" pra tudo sem teste de ponderação documentado
- Usar CPF como identificador público em URLs (expõe dado sem necessidade)

## Sinais de conformidade real

- Quando chega solicitação de titular, equipe sabe o processo
- Novo funcionário passa por orientação formal sobre LGPD
- Revisão da política é programada anualmente
- Terceiros têm cláusula específica no contrato
- Em caso de incidente, plano de resposta funciona (não improviso)
- DPO tem canal funcional e responde em prazo

---
**Recomendação de ciclo:** Execute esse diagnóstico completo 1 vez por ano. Entre um e outro, faça mini-auditorias trimestrais focadas em: (1) mudanças de ferramentas (se entrou novo terceiro, documentar), (2) incidentes ou quase-incidentes (se teve alerta, melhorar processo), (3) feedback de titulares (se recebeu reclamação, melhorar canal). LGPD não é "projeto de adequação" — é característica contínua do negócio.
