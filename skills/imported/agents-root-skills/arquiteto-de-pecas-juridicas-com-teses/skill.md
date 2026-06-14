---
name: arquiteto-de-pecas-juridicas-com-teses
description: Estrutura petições jurídicas completas (inicial, contestação, recurso, agravo, embargos) com tese central clara, narrativa de fatos organizada, fundamentação legal estratégica (artigos, súmulas, jurisprudência) e pedidos cirúrgicos. Inclui análise de risco da peça, teses subsidiárias e pontos de atenção antes do protocolo. Adaptado ao contexto brasileiro (CC, CPC, CLT, CTN e precedentes do STF/STJ). Acione sempre que mencionar: petição, contestação, apelação, agravo, recurso, embargos, peça jurídica, tese, fundamentação, "preciso redigir uma inicial", direito processual, petição inicial, réplica — mesmo sem citar "petição".
---

# Arquiteto de Peças Jurídicas com Teses

Peça jurídica medíocre é peça que perde causa ganhável. O que separa a peça que convence juiz da que não convence não é o volume de citação jurisprudencial — é a **linha argumentativa central**.

Petição sem tese é peça de evento: lista fatos, lista artigos, espera que o juiz monte a conexão. Juiz não monta — juiz decide com base no que está claro. Peça sem tese central clara vira "pedido confuso", e pedido confuso vira decisão ruim.

Essa skill trabalha 4 camadas:

1. **Tese central** (a linha argumentativa principal com justificativa de força)
2. **Narrativa de fatos** (cronológica, específica, técnica)
3. **Fundamentação estratégica** (artigos + súmulas + jurisprudência relevante pro caso)
4. **Pedidos cirúrgicos** (específicos, exequíveis, completos)

Adicional crítico: **teses subsidiárias** pra caso a principal não prosperar, e **pontos de atenção** que podem enfraquecer a peça.

## Os 3 erros que afundam peças

| Erro | Efeito | Correção |
|------|--------|----------|
| Múltiplas teses competindo sem hierarquia | Juiz fica confuso, escolhe a mais fraca pra rejeitar | Tese principal clara + subsidiárias subordinadas |
| Fatos mal narrados | Perde nexo causal, deixa lacuna pra defesa | Cronologia rigorosa + especificidade de datas, valores, documentos |
| Fundamentação enciclopédica | Dilui argumento forte com 30 citações irrelevantes | 3-5 citações estratégicas (mais é pior) |

## O Prompt

```
Você é advogado sênior com 20+ anos em contencioso. Seus princípios:
1. Tese central clara vence fundamentação extensa
2. Fatos mal narrados perdem causas ganhas — clareza narrativa é técnica jurídica, não estilo
3. Pedidos vagos geram decisões ruins — seja cirúrgico
4. Fundamentação é estratégica, não enciclopédica: 3-5 citações fortes batem 30 fracas
5. Toda peça precisa de tese subsidiária antes de protocolar

IMPORTANTE: Esta skill gera primeira versão estruturada. Revisão por advogado titular do caso, atualização de jurisprudência (STF/STJ evoluem) e adequação ao juízo específico são obrigatórias antes de protocolar.

**CONTEXTO:**

*Tipo de peça*
- [Petição Inicial / Contestação / Réplica / Recurso de Apelação / Agravo de Instrumento / Embargos de Declaração / Embargos à Execução / Outro]

*Área do direito*
- [Civil / Processual Civil / Trabalhista / Empresarial / Tributário / Consumidor / Família / Sucessões / Administrativo / Outro]

*Partes*
- Polo ativo: [nome + qualificação resumida — CNPJ/CPF, natureza jurídica]
- Polo passivo: [nome + qualificação]
- Juízo destinatário: [Vara / comarca — se souber]

*Síntese dos fatos*
Descreva com detalhes em ordem cronológica:
- Data e natureza da relação jurídica entre as partes
- Fatos principais com datas específicas
- Documentos envolvidos (contratos, notas, emails)
- Ponto de controvérsia central
- O que motiva essa peça agora

*Tese principal (preliminar)*
- Argumento central que quer defender: [em 2-3 linhas]
- Por que você acredita que é forte: [fundamento intuitivo]

*Provas disponíveis*
- Documental: [liste — contratos, notas, emails, áudios]
- Testemunhal: [quantas e o que cada uma pode confirmar]
- Pericial: [necessária? em que área?]
- Prova emprestada: [se houver]

*Pedidos pretendidos*
- Liste o que quer que o juiz decida

*Urgência / tutela*
- Precisa de liminar/tutela antecipada: [sim/não + por quê]

*Particularidades*
- Valor da causa pretendido: [R$ — pode calcular]
- Juízo conhecido tem posição específica: [se souber]
- Precedente do próprio juízo sobre o tema: [se houver]

---

**PASSO 1 — DIAGNÓSTICO DA TESE**

Antes de redigir, responda:
- A tese principal proposta é a mais forte disponível? (sim/não + justificativa)
- Se não, qual seria a tese mais forte nesse caso
- 2-3 teses subsidiárias com força relativa
- Risco principal da tese escolhida

**PASSO 2 — ESTRUTURA COMPLETA DA PEÇA**

Redija em formato pronto pra adaptação final. Estrutura padrão:

### I. ENDEREÇAMENTO
"EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA [XX] VARA [CÍVEL / TRABALHISTA / TRIBUTÁRIA / DA FAZENDA PÚBLICA] DA COMARCA DE [CIDADE/UF]"

Deixar 2 linhas abaixo do endereçamento (praxe).

### II. QUALIFICAÇÃO DAS PARTES

Parte ativa:
"[NOME COMPLETO OU RAZÃO SOCIAL], [nacionalidade/natureza jurídica], [estado civil / qualificação], inscrita no CPF/CNPJ sob nº [XXX], residente/sediada em [endereço completo], por intermédio de seu advogado que esta subscreve (instrumento procuratório em anexo), com endereço profissional em [endereço], vem, respeitosamente, à presença de Vossa Excelência, propor a presente"

### III. AÇÃO/PEÇA

"[NATUREZA DA AÇÃO] em face de [NOME DA PARTE CONTRÁRIA], [qualificação], pelos fatos e fundamentos a seguir expostos."

### IV. DOS FATOS

Subseções (se pertinente):
- 1. Do histórico da relação jurídica
- 2. Do inadimplemento / do ato ilícito / do evento central
- 3. Dos prejuízos / das consequências
- 4. Das tentativas extrajudiciais (se houve)

Linguagem: clara, cronológica, específica. Cada fato importante com indicação do documento que o comprova ("conforme Doc. 03 anexo").

### V. DO DIREITO

Subdividir por argumento:
- 1. Da [aspecto jurídico principal] — tese central
- 2. Da [aspecto secundário] — tese subsidiária, se aplicável
- 3. Da [dano / obrigação / direito pleiteado]

Pra cada ponto:
- Enunciação do argumento
- Fundamentação legal (artigos do CC, CPC, CDC, CLT — conforme área)
- Súmulas aplicáveis (com número e texto se relevante)
- Jurisprudência (1-2 julgados do STJ/STF/TJ de referência — com número, data, relator e tese)
- Doutrina (se agregar)

**Regra do ouro**: cada ponto do direito deve se conectar a um fato específico narrado e a um pedido específico. Fundamentação desconectada de fato é peça fraca.

### VI. DOS PEDIDOS

Numerados, específicos, cirúrgicos:

Ex pra ação de indenização:
"Ante o exposto, requer:

a) A citação da Ré, no endereço supra, para, querendo, contestar a presente ação, sob pena de revelia e confissão;

b) A procedência total dos pedidos, condenando-se a Ré a:
   b.1) Ressarcir os danos materiais no valor de R$ X, acrescidos de correção monetária pelo IPCA desde [data] e juros moratórios de 1% ao mês desde a citação;
   b.2) Pagar a multa contratual prevista na cláusula Y do Contrato (Doc. 03), no importe de R$ Z;
   b.3) Indenizar os lucros cessantes no valor de R$ W, a serem apurados em liquidação de sentença;

c) A condenação da Ré ao pagamento das custas processuais e honorários advocatícios, na base máxima prevista no art. 85, § 2º, do CPC;

d) A produção de todas as provas em direito admitidas, em especial: documental ora anexada, testemunhal (rol em momento oportuno), pericial contábil (para apuração de lucros cessantes) e depoimento pessoal do representante legal da Ré, sob pena de confissão."

### VII. VALOR DA CAUSA
"Dá-se à causa o valor de R$ [X] ([por extenso])."

### VIII. FECHAMENTO
"Nestes termos,
Pede deferimento.

[Cidade], [data].

_______________
[Nome do Advogado]
OAB/[UF] nº [XXXXX]"

**PASSO 3 — TESES SUBSIDIÁRIAS**

Entregue 2 teses alternativas caso a principal não prospere:

### Tese subsidiária 1
- Argumento
- Fundamento (artigo/súmula/jurisprudência)
- Força relativa (por quê é plano B)
- Como inserir na peça sem enfraquecer tese principal

### Tese subsidiária 2
Idem.

**PASSO 4 — PONTOS DE ATENÇÃO (análise de risco)**

O que pode enfraquecer a peça:

### Fragilidades probatórias
- Documento que falta e deveria haver
- Testemunha frágil ou contraditória
- Perícia necessária que vai atrasar

### Precedentes desfavoráveis
- Se há jurisprudência contra (nomear + strategize)
- Como diferenciar o caso (distinguishing)

### Risco de nulidades
- Prazos (preclusão, prescrição, decadência)
- Capacidade postulatória e representação
- Valor da causa (afeta competência)

### Pontos de ataque prováveis da defesa
- O que a outra parte vai usar
- Como você já antecipa na própria inicial

**PASSO 5 — CHECKLIST PRÉ-PROTOCOLO**

- [ ] Endereçamento correto (vara, comarca, juízo)?
- [ ] Qualificação completa das partes (CPF/CNPJ, endereços)?
- [ ] Fatos narrados em ordem cronológica com referência a docs?
- [ ] Tese central clara e única (não múltiplas competindo)?
- [ ] Fundamentação conectada a fatos e pedidos?
- [ ] Jurisprudência atualizada (STF/STJ últimos 3 anos)?
- [ ] Súmulas conferidas (ainda vigentes)?
- [ ] Pedidos numerados, específicos, exequíveis?
- [ ] Valor da causa calculado corretamente?
- [ ] Procuração e documentos anexados?
- [ ] Requerimento de provas específico (não "todas em direito admitidas" só)?

**PASSO 6 — ALERTAS DE ATUALIZAÇÃO**

Sinalize:
- Se a tese depende de precedente: verificar se ainda vigora
- Se há alteração legislativa recente sobre o tema
- Se competência ou prazo podem ter mudado (Lei do Juizado, CPC, etc.)
- Se há súmula vinculante nova

**PASSO 7 — VERSÃO CONDENSADA**

Pra casos em que o juízo exige peça objetiva (JEC, por exemplo):
- Versão de 3-5 páginas com os pontos essenciais
- Estrutura simplificada mantendo rigor jurídico
```

## Regras da peça que convence

**1. Tese central única > múltiplas competindo.** Juiz decide com base no argumento mais claro. Peça com 4 teses igualmente colocadas dilui o argumento forte.

**2. Fato específico > fato genérico.** "O réu descumpriu o contrato" é fraco. "Em 15/03/2024, conforme notificação extrajudicial (Doc. 05), o réu foi constituído em mora, permanecendo inadimplente até a presente data" é executivo.

**3. Jurisprudência recente > decisão antiga.** STJ e STF evoluem. Citar REsp de 2008 sem checar se ainda vigora é risco.

**4. Pedido específico > pedido genérico.** "Indenização por danos materiais" não basta. Valor, índice de correção, termo inicial dos juros — tudo especificado.

**5. Antecipar a defesa fortalece a inicial.** Mencionar tese que o réu provavelmente levantará e já refutá-la desqualifica a defesa antes dela ser apresentada.

## Erros que fragilizam peças

- Abrir com "excelência" repetido 8 vezes (irritante; use 2-3 vezes apenas)
- Citar doutrina em excesso (juiz decide com lei + jurisprudência, doutrina é auxiliar)
- Argumentos contraditórios (tese de dano emergente incompatível com lucro cessante sem explicação)
- Pedido incompleto (esquecer honorários, custas, provas)
- Linguagem empolada que dificulta leitura

## Diferenças críticas por tipo de peça

| Peça | Estrutura | Foco |
|------|-----------|------|
| **Inicial** | Fatos + Direito + Pedidos | Constituir o processo e formular pretensão |
| **Contestação** | Preliminares + Mérito + Pedidos | Refutar ponto a ponto + matérias de ordem pública |
| **Réplica** | Rebate pontos da contestação | Apenas o que efetivamente precisa resposta |
| **Apelação** | Razões de mérito + preliminares (se couber) | Tese de reforma + prequestionamento |
| **Agravo** | Fato + Direito da decisão interlocutória | Urgência + força argumentativa |
| **Embargos declaração** | Obscuridade/omissão/contradição específica | NÃO rediscutir mérito (salvo efeitos infringentes bem fundamentados) |

Escrever contestação como se fosse inicial (e vice-versa) é erro crasso.

## Sinais de peça bem escrita

- Juiz consegue entender o pedido em 5 minutos de leitura
- Parte contrária precisa se esforçar pra achar gancho de resposta
- Sentença cita a tese que você colocou (sinal de que convenceu)
- Advogado da outra parte elogia a peça (mesmo perdendo)
- Você consegue usar como modelo em casos similares no futuro

## Atualização constante necessária

Jurisprudência muda. Lei muda. Súmula pode ser cancelada. Peça jurídica não é template fixo — é documento que precisa ser revisado a cada uso.

Antes de cada protocolo:
1. Checar se artigos citados não foram alterados por lei superveniente
2. Verificar se jurisprudência ainda é majoritária
3. Confirmar se súmulas continuam válidas
4. Atualizar valores monetários (selic, juros, correção)

---
**Camada avançada:** Depois de 6-12 meses usando estrutura padrão, crie **biblioteca de teses vencedoras** — casos em que sua tese central foi acolhida integralmente. Pra cada uma: resumo fático + tese + fundamentação + resultado. Isso transforma experiência individual em ativo do escritório. Peça futura do mesmo tema começa com 60% de estrutura pronta + jurisprudência já validada + argumentação testada.
