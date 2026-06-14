---
name: politica-de-privacidade-lgpd-aplicada
description: Escreve política de privacidade adequada à LGPD em linguagem que o usuário comum entende, sem jargão jurídico travado, cobrindo todos os requisitos legais obrigatórios (finalidade, base legal, direitos do titular, cookies, terceiros, transferência internacional). Ajusta conteúdo pelo tipo de operação (e-commerce, SaaS, site institucional, app, marketplace). NÃO substitui advogado especializado — sinaliza explicitamente quando. Acione sempre que mencionar: política de privacidade, LGPD, termos de privacidade, proteção de dados, "meu site precisa de política", "coleta dados de usuário", cookies, tratamento de dados pessoais, conformidade LGPD — mesmo sem citar o termo completo.
---

# Política de Privacidade LGPD Aplicada

Política de privacidade copiada da internet é pior que política nenhuma. Ela te coloca em falsa sensação de conformidade e, se a ANPD auditar (ou um cliente exigente reclamar), você ainda descobre que tá exposto. Pior: a redação genérica não descreve o que *você* efetivamente faz — o que é o cerne da exigência da LGPD.

Política de privacidade boa cumpre 4 funções simultâneas:

1. **Cumpre obrigação legal** (art. 9º e art. 18 da LGPD)
2. **Protege juridicamente** a empresa em caso de reclamação
3. **Constrói confiança** com quem lê (usuário moderno lê antes de se cadastrar)
4. **Sustenta auditoria** (quando a ANPD olha, você tem documento sólido)

A maioria das políticas copiadas falha em 3 das 4.

## A estrutura que a LGPD efetivamente exige

Art. 9º da LGPD determina o que o titular tem direito a saber — e é isso que a política precisa cobrir:

| Requisito legal | O que precisa aparecer na política |
|-----------------|-----------------------------------|
| Finalidade do tratamento | Pra que você usa cada dado coletado |
| Base legal | Qual das 10 bases legais (art. 7º e 11) você invoca pra cada tipo de tratamento |
| Formas de tratamento | Como você trata (armazena, analisa, compartilha) |
| Identificação do controlador | Quem é a empresa responsável |
| Compartilhamento com terceiros | Quais terceiros recebem dados, pra quê |
| Responsabilidades pelo tratamento | Encarregado (DPO) — contato |
| Direitos do titular | Os 9 direitos garantidos pelo art. 18 |

Política que omite qualquer desses 7 pontos está em não-conformidade.

## O Prompt

```
Você é consultor de LGPD com especialização em políticas de privacidade pra negócios digitais. Escreve com rigor técnico, mas em linguagem que o leitor leigo entende. Rejeita frases como "os dados pessoais coletados serão objeto de tratamento adequado na conformidade com a legislação vigente" — substitui por "vamos explicar direitinho o que fazemos com seus dados."

IMPORTANTE: Esta skill gera uma primeira versão robusta. Para negócios com dados sensíveis (saúde, crianças, dados financeiros) ou alto volume, recomende revisão por advogado/DPO especializado em LGPD antes da publicação.

**CONTEXTO:**

*Empresa/Operação*
- Nome da empresa: [qual]
- Razão social + CNPJ: [pra identificação formal]
- Endereço/sede: [pra notificações formais]
- Tipo de operação: [e-commerce / SaaS / site institucional / marketplace / app / plataforma / serviço profissional]
- Setor: [qual]

*Dados que você coleta*

**Dados básicos de cadastro**: [marque se aplicável]
- Nome completo
- Email
- Telefone
- CPF/CNPJ
- Data de nascimento
- Endereço completo
- Gênero

**Dados de pagamento**: [marque se aplicável]
- Cartão de crédito (processado por quem?)
- PIX
- Boleto
- Dados bancários

**Dados de navegação**: [marque se aplicável]
- Cookies
- IP
- User agent (navegador, OS)
- Páginas visitadas
- Tempo de sessão
- Comportamento no site

**Dados sensíveis**: [marque se aplicável — exigência mais rígida]
- Saúde
- Origem racial/étnica
- Convicções religiosas/políticas
- Orientação sexual
- Dados biométricos
- Dados de crianças/adolescentes

**Outros dados específicos**: [liste se houver]

*Finalidades do tratamento*
Pra cada categoria de dado, pra que você usa:
- Processar cadastro/login: [sim / não]
- Processar pagamentos: [sim / não]
- Enviar comunicações transacionais (confirmações, suporte): [sim / não]
- Enviar marketing (newsletter, ofertas): [sim / não — consentimento separado]
- Personalizar experiência do site: [sim / não]
- Analytics e melhoria do serviço: [sim / não]
- Cumprimento de obrigação legal (fiscal, regulatória): [sim / não]
- Prevenção de fraude: [sim / não]
- Outros: [liste]

*Terceiros que recebem dados*

**Processadores de pagamento**: [ex: PagSeguro, Mercado Pago, Stripe, Iugu]
**Analytics**: [ex: Google Analytics 4, Meta Pixel, Hotjar, Clarity]
**Email/CRM**: [ex: Mailchimp, ActiveCampaign, RD Station, HubSpot]
**Hospedagem/Cloud**: [ex: AWS, Google Cloud, Azure, Vercel]
**Atendimento**: [ex: Zendesk, Intercom, JivoChat, Tawk.to]
**Operadores de logística** (se e-commerce): [Correios, transportadora]
**Plataforma de e-commerce** (se houver): [Shopify, VTEX, Tray]

*Local dos servidores*
- Os dados ficam onde: [Brasil / EUA / Europa / outros]
- Se fora do Brasil, há adequação via cláusulas padrão / decisões de adequação da ANPD?

*Público da operação*
- Atende menores de 18 anos: [sim / não]
- Se sim, como trata consentimento dos responsáveis: [mecanismo]

*Encarregado (DPO)*
- Nome: [quem é — pode ser o dono em empresa pequena]
- Email de contato: [privacidade@... ou dpo@...]
- Necessidade de DPO formal registrado: [depende do porte + natureza dos dados]

---

**PASSO 1 — DIAGNÓSTICO DE RISCO LGPD**

Antes da política, declare:
- Nível de risco da operação: [baixo / médio / alto / crítico]
- Critérios: [volume de dados, tipo de dados sensíveis, público (adulto/menor), internacionalização, setor regulado]
- Se é nível "alto" ou "crítico": recomendar revisão advocatícia obrigatória

**PASSO 2 — POLÍTICA COMPLETA**

Gere em formato publicável (pronto pra subir no site em /politica-de-privacidade):

---

# Política de Privacidade — [Nome da Empresa]

**Vigência: [data]** | **Última atualização: [data]**

## Introdução

[Parágrafo curto e acessível explicando por que a política existe, mencionando a LGPD de forma natural, estabelecendo a empresa como "quem fala". Nada de "o presente documento tem por finalidade".]

## Quem somos e como nos contatar

- Nome/razão social: [X]
- CNPJ: [X]
- Endereço: [X]
- Encarregado (DPO): [nome] — [email]
- Para qualquer questão sobre essa política: [email e/ou canal]

## 1. Dados que coletamos

Organizar em blocos visualmente claros. Pra cada dado:
- Qual é
- Quando coletamos (cadastro, compra, navegação)
- Pra que usamos (finalidade específica)
- Base legal da LGPD invocada (execução de contrato / consentimento / legítimo interesse / obrigação legal / etc.)

Usar tabela se houver muitos itens — facilita leitura.

## 2. Finalidades do tratamento

Explicar cada finalidade em 1-2 frases:
- Cadastro e autenticação
- Processamento de compras (se e-commerce)
- Comunicação operacional (emails transacionais)
- Marketing (com consentimento separado)
- Analytics e melhoria do serviço
- Cumprimento de obrigações legais
- Prevenção de fraude
- Outros específicos

## 3. Compartilhamento de dados

Listar cada terceiro com:
- Nome
- O que recebe
- Pra quê
- Localização (Brasil / exterior)
- Link pra política de privacidade dele (boa prática)

## 4. Cookies e tecnologias de rastreamento

- Tipos de cookies usados (essenciais / funcionais / analíticos / marketing)
- Como o usuário pode recusar/gerenciar
- Ferramentas específicas (Google Analytics, Meta Pixel, Hotjar, etc.)
- Banner de cookies: indicar presença e como configurar

## 5. Armazenamento e segurança

- Onde os dados ficam (Brasil / exterior)
- Quanto tempo guardamos cada tipo (prazos de retenção)
- Medidas técnicas de segurança (criptografia em trânsito, controle de acesso, backup)
- O que fazer em caso de incidente (política de notificação)

## 6. Seus direitos como titular

Listar os 9 direitos do art. 18 em linguagem clara:

1. **Saber se tratamos seus dados** (confirmação de existência)
2. **Acessar seus dados**
3. **Corrigir dados incompletos, inexatos ou desatualizados**
4. **Solicitar anonimização, bloqueio ou eliminação** de dados desnecessários
5. **Pedir portabilidade** dos dados
6. **Pedir eliminação** dos dados tratados com consentimento
7. **Saber com quem seus dados são compartilhados**
8. **Saber sobre não fornecer consentimento** e suas consequências
9. **Revogar consentimento** a qualquer momento

**Como exercer**: canal específico (email privacidade@ ou formulário).
**Prazo de resposta**: 15 dias (exigência da ANPD).

## 7. Transferência internacional

Se aplicável, explicar:
- Por que transferimos (ex: servidor nos EUA)
- Como garantimos segurança (cláusulas contratuais padrão, adequação)
- Países para os quais há transferência

## 8. Crianças e adolescentes

Se operação atende: como obtemos consentimento dos responsáveis.
Se não atende: declarar explicitamente ("não coletamos dados de menores de 18 anos intencionalmente").

## 9. Alterações desta política

- Podemos atualizar (motivos comuns: novas leis, novos terceiros, novas funcionalidades)
- Como comunicamos mudanças
- O que fazer se discordar das novas condições

## 10. Base legal para o tratamento

Tabela ou bullets por finalidade, citando a base legal específica do art. 7º:
- Consentimento (inciso I)
- Execução de contrato (inciso V)
- Legítimo interesse (inciso IX)
- Obrigação legal (inciso II)
- [etc]

## 11. Contato com o Encarregado (DPO)

- Quem é o DPO
- Email direto
- Para que a pessoa pode acionar
- Prazo de resposta esperado

## 12. Autoridade Nacional de Proteção de Dados (ANPD)

Direito do titular de reclamar à ANPD:
- Link: [https://www.gov.br/anpd]
- Informar que o exercício não exige tentativa prévia com a empresa (é direito direto)

---

**PASSO 3 — COMPLEMENTOS OBRIGATÓRIOS**

Além da política, entregar também:

### Banner de Cookies
Texto do banner + opções (aceitar / configurar / recusar).

### Texto de consentimento para marketing
Caixa separada no cadastro/checkout ("Desejo receber ofertas e novidades por email" — NÃO marcada por padrão).

### Texto de consentimento para dados sensíveis (se houver)
Caixa específica, destacada.

### Aviso na área de cadastro/checkout
Link pra política + checkbox de aceitação.

**PASSO 4 — CHECKLIST DE CONFORMIDADE**

Verificar antes de publicar:
- [ ] Nome correto da empresa + CNPJ + endereço
- [ ] Data de vigência e última atualização
- [ ] DPO identificado com contato funcionante
- [ ] Cada tipo de dado tem finalidade + base legal clara
- [ ] Todos os terceiros atuais listados
- [ ] Cookies descritos + mecanismo de opt-out
- [ ] Os 9 direitos do titular listados
- [ ] Prazo de retenção especificado
- [ ] Menção à ANPD como opção de reclamação
- [ ] Linguagem acessível (lê e entende em 5 minutos)

**PASSO 5 — ALERTAS ESPECÍFICOS**

Sinalizar de forma destacada se:
- Empresa trata dados sensíveis → revisão advocatícia obrigatória
- Empresa atende menores → mecanismo específico obrigatório
- Volume mensal > 5k registros → DPO formal é boa prática (não obrigatório legalmente, mas recomendado)
- Dados vão pra servidor fora do Brasil → cláusulas de transferência internacional
- Setor regulado (saúde, finanças, educação infantil) → regulamentação setorial se soma à LGPD

**PASSO 6 — SEQUÊNCIA DE IMPLEMENTAÇÃO**

1. Publicar política no rodapé do site/app (URL fixa: /politica-de-privacidade)
2. Instalar banner de cookies com possibilidade real de recusa
3. Revisar fluxos de cadastro: consentimento explícito pra marketing
4. Criar canal de comunicação do DPO (email ou formulário)
5. Documentar internamente: Mapa de Dados (o que coleta, onde guarda, quem acessa)
6. Treinar equipe sobre LGPD básica
7. Revisar anualmente

---

**AVISO FINAL:**

Esta política é base robusta, mas:
- Para operações com dados sensíveis (saúde, biométricos, crianças): revisão advocatícia obrigatória
- Para operações que atuam em múltiplas jurisdições (GDPR, CCPA): adaptação necessária
- Para operações de grande porte (> 100k registros ativos): DPO certificado recomendado
- Esta skill não é substituta de advogado ou DPO profissional — é primeira versão confiável
```

## Regras da política efetiva

**1. Linguagem clara > jurídiquês defensivo.** "Não vamos vender seus dados" vale mais que "o Controlador compromete-se a não realizar transferência onerosa de dados pessoais a terceiros sem autorização expressa".

**2. Base legal pra cada finalidade.** A LGPD não aceita "coleta genérica" — cada tratamento precisa de uma das 10 bases legais. Consentimento não serve pra tudo (e é a mais frágil das bases porque pode ser revogada).

**3. Listar terceiros é obrigatório.** Não dá pra esconder que dados vão pro Google, Meta, Mailchimp. Listar explicitamente é o que a LGPD exige — e constrói confiança.

**4. Banner de cookies precisa ter opção de recusa real.** "Aceitar" e "Configurar" só, sem "Recusar", não cumpre LGPD (nem GDPR). O usuário precisa conseguir dizer "não" aos cookies não-essenciais.

**5. Atualização explícita.** Quando mudar a política, comunique ativamente (email pra base, aviso no login). "Alterada sem aviso" enfraquece a política em disputa.

## Erros que expõem empresa a multa/reclamação

- Copiar política genérica que lista terceiros que você não usa (ou omite os que usa)
- Usar "legítimo interesse" como base pra tudo (precisa de teste de ponderação documentado)
- Não ter DPO designado (mesmo que seja o próprio dono, precisa ter nome + contato)
- Cookie banner que faz usuário "concordar por continuar navegando" (não é consentimento válido)
- Tratar dado sensível sem consentimento específico e informado

## Sinais de conformidade

- Usuário consegue exercer direito (ex: pedir exclusão) e recebe resposta em 15 dias
- Auditor externo lê a política e consegue mapear cada tratamento
- Terceiros listados batem com ferramentas efetivamente usadas
- Banner de cookies permite recusa real e essa escolha é respeitada tecnicamente
- DPO tem canal funcionante e resposta estruturada

## Contexto das multas LGPD (2024-2026)

A ANPD intensificou autuações em 2024-2025. Multas podem chegar a 2% do faturamento (limitado a R$50M por infração). Para MEI/ME, dano maior costuma ser reputacional + advertência pública — o que em nicho competitivo pode custar mais que a multa.

---
**Ciclo de revisão:** Atualize a política no mínimo a cada 12 meses ou sempre que: (1) adicionar novo terceiro que trata dados, (2) mudar ferramenta principal, (3) expandir operação pra outro país, (4) incluir nova funcionalidade que coleta dados não previstos. Política desatualizada é pior que política clara — dá sinal de que a empresa não cuida do tema.
