---
name: contrato-blindagem-prestacao-servicos
description: Redige contratos de prestação de serviços em linguagem clara e juridicamente consistente, priorizando proteção prática (escopo creep, inadimplência, mudanças, rescisão) em vez de jargão genérico. Inclui checklist de cláusulas por faixa de risco e tipo de serviço. NÃO substitui revisão advocatícia — sinaliza quando revisão é obrigatória. Acione sempre que mencionar: contrato de serviço, contrato com cliente, modelo de contrato, proposta + contrato, acordo de prestação, "fechar com o cliente formalmente", "meu cliente atrasou pagamento", "cliente pediu coisas além do escopo", freelancer quer formalizar — mesmo sem citar "contrato".
---

# Contrato Blindagem Prestação de Serviços

Contrato não é documento protocolar pra assinar antes de começar. É **ferramenta de proteção operacional**. Bem escrito, evita 90% das discussões reais do dia a dia: cliente que pede coisa nova e acha que é cortesia, cliente que atrasa pagamento, cliente que diz "vou cancelar" no meio do projeto, cliente que mostra o trabalho pra concorrente.

Os 5 problemas mais comuns em contratos feitos pela internet:

1. **Copiados genericamente** de modelos da internet — cláusulas que nada têm a ver com o serviço
2. **Vagos no escopo** — o que SE a entrega precisar de uma versão extra?
3. **Omissos sobre inadimplência** — quando é considerado inadimplência? qual o juros? quando pode parar o serviço?
4. **Confusos na rescisão** — quem pode romper, em que condições, sem ônus
5. **Jurídiquês puro** — cliente não entende, você não entende, fica assinado mas inútil

Essa skill evita os 5.

## A regra da linguagem clara + cláusula específica

O contrato ideal combina:

- **Clareza**: qualquer pessoa entende ao ler
- **Especificidade**: os problemas reais daquele tipo de serviço aparecem com nome
- **Executividade**: se virar processo, as cláusulas funcionam no tribunal

Se sacrificar um desses, o contrato perde função.

## Faixas de risco (calibram nível do contrato)

| Risco | Valor envolvido | Profundidade | Revisão advocatícia |
|-------|----------------|--------------|---------------------|
| Baixo | Até R$5k | Contrato simples 2-3 páginas | Opcional |
| Médio | R$5k a R$30k | Contrato detalhado 4-6 páginas | Recomendada |
| Alto | R$30k a R$200k | Contrato robusto + anexo técnico | Obrigatória |
| Crítico | Acima de R$200k / confidencialidade sensível / IP estratégico | Contrato customizado por escritório | Obrigatória |

Abaixo do alto risco, essa skill serve como primeira versão. Acima, serve como ponto de partida pra advogado trabalhar.

## O Prompt

```
Você é especialista em contratos de prestação de serviço pra negócios digitais, agências, consultorias e freelancers. Você sabe que bom contrato não é o mais longo — é o que antecipa os problemas reais daquela categoria de serviço e os resolve com cláusula específica + linguagem clara.

IMPORTANTE: Para contratos acima de R$30k ou com risco reputacional/jurídico alto, recomende revisão advocatícia explicitamente.

**CONTEXTO:**

*Prestador*
- Nome/razão social: [qual]
- Tipo: [MEI / ME / LTDA / SLU / pessoa física]
- CNPJ: [se tiver]
- Endereço: [sede]
- Representante legal: [nome + CPF/RG]

*Contratante*
- Nome/razão social: [qual]
- Tipo: [PF / PJ — e qual porte se PJ]
- CNPJ/CPF: [qual]
- Endereço: [qual]
- Representante: [nome se PJ]

*Serviço*
- Descrição geral: [o que será feito]
- Categoria: [consultoria / desenvolvimento / design / marketing / educação / serviço técnico / mentoria / outro]
- Entregáveis concretos: [liste — específicos, não "estratégia")]
- O que NÃO está incluso: [limite claro]
- Nível de envolvimento do cliente: [alto / médio / baixo]

*Prazos*
- Duração total: [projeto único com prazo / mensal recorrente / indeterminado]
- Prazo de entrega (se projeto): [data ou duração em semanas]
- Marcos importantes: [milestones — se houver]
- Cronograma de execução: [se houver fases]

*Valor*
- Valor total ou mensal: [R$]
- Forma de pagamento: [à vista / parcelado — condições]
- Reajuste: [anual? IPCA? sem reajuste?]
- Multa por atraso: [%/mês padrão 2% + juros 1%/mês]
- Gateway/forma de recebimento: [PIX / boleto / transferência / cartão via plataforma]

*Risco do contrato*
- Faixa: [baixo / médio / alto]
- Preocupação principal do prestador: [o que você mais teme que aconteça]
- Preocupação principal do contratante: [o que ele mais teme]

*Especificidades*
- Confidencialidade é crítica: [sim / não]
- Haverá propriedade intelectual relevante: [quem fica com o quê]
- Há dados sensíveis/LGPD envolvidos: [sim / não — se sim, cláusula específica]
- Há uso de imagem/marca do cliente ou do prestador: [sim/ não]
- Há sub-contratação permitida: [sim / não]

---

**PASSO 1 — DIAGNÓSTICO DE RISCO**

Declare em 2-3 frases:
- Faixa de risco avaliada (baixo / médio / alto / crítico)
- Principais riscos específicos desse serviço (não genéricos — específicos)
- Se revisão advocatícia é recomendada ou obrigatória

**PASSO 2 — CONTRATO COMPLETO**

Entregue o contrato em formato pronto pra uso, com as 14 cláusulas:

---

### CONTRATO DE PRESTAÇÃO DE SERVIÇOS — [TÍTULO DO SERVIÇO]

### CLÁUSULA 1 — DAS PARTES
Qualificação completa das duas partes. Dados do prestador e contratante.

### CLÁUSULA 2 — DO OBJETO
Descrição clara e específica do serviço. **Primeira frase tem que deixar claro o que o prestador vai fazer**, sem ambiguidade.

### CLÁUSULA 3 — DO ESCOPO E ENTREGÁVEIS
- Lista dos entregáveis específicos
- Cronograma/marcos se aplicável
- **Subseção crítica**: "O seguinte NÃO está incluso neste contrato: [lista]"

### CLÁUSULA 4 — DO PRAZO E VIGÊNCIA
- Data de início
- Prazo de execução ou duração
- Marcos de entrega intermediária (se houver)
- Renovação automática ou não

### CLÁUSULA 5 — DO VALOR E FORMA DE PAGAMENTO
- Valor total
- Cronograma de pagamento (entrada, parcelas, condições)
- Forma de recebimento
- Emissão de nota fiscal (quem, quando)
- Impostos retidos (se aplicável)

### CLÁUSULA 6 — DA INADIMPLÊNCIA
**(Cláusula crítica — a mais ignorada em modelos genéricos)**
- Quando se configura inadimplência (ex: 15 dias após vencimento)
- Multa por atraso (ex: 2% sobre o valor)
- Juros de mora (ex: 1% ao mês)
- Correção monetária
- Consequência: direito de suspender o serviço após X dias sem penalidade ao prestador
- Protesto e negativação após Y dias

### CLÁUSULA 7 — DAS OBRIGAÇÕES DO PRESTADOR
Lista específica — não genérica. Adaptada à categoria do serviço.
- Prazo de execução
- Sigilo
- Qualidade técnica
- Comunicação regular
- Ajustes dentro do escopo (não criar novo trabalho)

### CLÁUSULA 8 — DAS OBRIGAÇÕES DO CONTRATANTE
Lista específica. Aqui prevenir 50% dos problemas:
- Fornecer informações/acessos necessários em prazo
- Aprovar ou solicitar ajustes em prazo definido (ex: 5 dias úteis) — senão considera-se aprovado
- Não interferir na metodologia do prestador
- Pagar pontualmente
- Indicar interlocutor único (evita "passei pra minha sócia e ela quer refazer tudo")

### CLÁUSULA 9 — DAS ALTERAÇÕES DE ESCOPO
**(Cláusula anti escopo-creep — a que salva margens)**
- Definição do que é "alteração": adicionar entregáveis, mudanças estruturais, revisões além das acordadas
- Processo formal: por escrito, com novo prazo e novo valor
- Prestador não é obrigado a executar alterações não formalizadas
- Distinção entre "ajuste fino" (dentro do escopo) vs "mudança de direção" (fora)

### CLÁUSULA 10 — DA CONFIDENCIALIDADE
- O que é informação confidencial
- Duração da obrigação (geralmente 2-5 anos após fim do contrato)
- Exceções (informação pública, ordem judicial, etc.)
- Multa por violação

### CLÁUSULA 11 — DA PROPRIEDADE INTELECTUAL
Define quem fica com o quê:
- Material entregue ao cliente: propriedade do cliente após pagamento integral
- Metodologia e know-how do prestador: permanece com o prestador
- Direito de uso em portfólio/case do prestador: explicitar (sim/não/com aprovação)
- Ferramentas, templates, sistemas do prestador: permanecem dele

### CLÁUSULA 12 — DA RESCISÃO
- Rescisão por mútuo acordo
- Rescisão por inadimplência (condições, aviso prévio)
- Rescisão imotivada: condições (aviso de X dias, pagamento proporcional do que foi entregue)
- Rescisão por quebra grave: definir o que é grave (confidencialidade violada, comportamento desabonador, etc.)

### CLÁUSULA 13 — DAS DISPOSIÇÕES GERAIS
- Comunicações oficiais (como/onde)
- Foro de eleição
- Sucessão contratual
- Tolerância não implica renúncia

### CLÁUSULA 14 — DO FORO
Cidade/comarca competente pra eventuais ações judiciais.

---

**E por estarem assim justas e acertadas, as partes assinam o presente contrato.**

Local, data.

_______________________
PRESTADOR

_______________________
CONTRATANTE

_______________________
TESTEMUNHA 1 (opcional)

_______________________
TESTEMUNHA 2 (opcional)

---

**PASSO 3 — CHECKLIST DE VERIFICAÇÃO PRÉ-ENVIO**

- [ ] Todos os dados das partes estão corretos?
- [ ] O valor está escrito por extenso também (boa prática)?
- [ ] A data de início e prazo fazem sentido operacional?
- [ ] O "não incluso" cobre os pedidos de escopo que você mais recebe?
- [ ] Cláusula de alteração de escopo é específica?
- [ ] Cláusula de inadimplência tem multa + juros + consequência prática?
- [ ] Confidencialidade tem duração específica?
- [ ] Propriedade intelectual tá clara (sem ambiguidade)?
- [ ] A rescisão prevê imotivada + motivada + grave?
- [ ] Foro está correto?

**PASSO 4 — ADAPTAÇÕES POR CATEGORIA**

### Se for serviço CONTINUADO (mensal)
- Cláusula de renovação automática (sim / não)
- Cláusula de reajuste anual (IPCA / índice)
- Cláusula de fidelidade (se houver — explicitar multa)

### Se for PROJETO PONTUAL
- Marcos de aprovação intermediária
- Cláusula de aceite final
- Cláusula de prazo de contestação pós-entrega

### Se for CONSULTORIA/MENTORIA
- Cláusula de responsabilidade: consultor orienta, decisão e execução é do cliente
- Cláusula de não-garantia de resultado específico
- Cláusula de propriedade das informações compartilhadas

### Se for DESENVOLVIMENTO DE SOFTWARE/TECNOLOGIA
- Cláusula de código-fonte (quem fica)
- Cláusula de bugs pós-entrega (prazo de garantia — geralmente 30-90 dias)
- Cláusula de propriedade do stack técnico

### Se for SERVIÇO COM DADOS PESSOAIS (LGPD)
- Cláusula específica de tratamento de dados
- Responsabilidades de controlador/operador
- DPO (encarregado) — quem é

---

**PASSO 5 — SINALIZAÇÕES OBRIGATÓRIAS**

Sinalizar o seguinte ao usuário final:

- **Revisão advocatícia**: recomendado acima de R$30k ou em situações complexas
- **Registro em cartório**: geralmente dispensado em contratos privados, mas útil pra dar fé pública em valores relevantes
- **Assinatura eletrônica**: plataformas como ClickSign, D4Sign têm validade jurídica no Brasil (Lei 14.063/2020)
- **Guardar cópia assinada**: ambas as partes precisam ter
- **Testemunhas**: não são obrigatórias, mas fortalecem contrato em disputa

**PASSO 6 — ALERTAS DE USO**

Sinalize 3-5 alertas específicos pro tipo de contrato gerado:
- "Atenção: no seu caso, [situação X] merece revisão advocatícia porque [razão]"
- "Recomendação: adicionar anexo técnico descrevendo [Y] em detalhe"
- "Cuidado: cláusula Z pode ser invalidada se o cliente for PF (CDC)"
```

## Regras que separam contrato funcional de papel decorativo

**1. Específico vence genérico.** "Obrigação do contratante: pagar pontualmente" é genérico. "Obrigação do contratante: pagar todo dia 5 do mês seguinte à prestação, via PIX chave CNPJ ou boleto emitido até dia 1" é específico — e executável.

**2. Cláusula que não vai ser usada é peso morto.** Tente imaginar o problema real: "E se ele não pagar? E se ele quiser cancelar? E se ele pedir refação?" Se o contrato não resolve essas, tá incompleto.

**3. Linguagem clara vence jurídiquês.** "Na hipótese de inadimplência configurada nos termos da cláusula XYZ, ensejará à parte inocente..." vs "Se o contratante atrasar o pagamento por mais de 15 dias, acontece isto: [X]." A segunda versão é igualmente válida juridicamente E compreensível.

**4. Assinatura eletrônica é válida.** Não precisa imprimir, reconhecer firma e enviar pelos correios. Assinatura eletrônica com certificado ou plataformas reconhecidas (ClickSign, D4Sign, DocuSign) tem validade jurídica plena.

**5. Mudanças formalizadas por email valem.** Cláusula 9 bem redigida permite alterações via email com resposta positiva — sem precisar assinar novo contrato. Isso agiliza operação, não enfraquece proteção.

## Erros que invalidam contratos

- Copiar modelo genérico sem adaptar (cláusulas que não se aplicam)
- Não definir foro (obriga a ação no lugar de residência do cliente — logística ruim)
- Confundir rescisão com cancelamento (termos diferentes, regras diferentes)
- Não explicitar o que é "entrega aceita" (cliente pode ficar pedindo refação infinitamente)
- Não limitar responsabilidade do prestador (risco de ação de danos morais desproporcional)

## Sinais de contrato efetivo

- Quando surge conflito, a cláusula específica resolve sem precisar processo
- Cliente atrasa 5 dias, vê multa prevista, paga no dia 6
- Cliente pede alteração de escopo, vê cláusula 9, entende que precisa formalizar
- Nenhuma ambiguidade sobre "e se a gente parar no meio?"
- Advogado do cliente aprova sem exigir refação completa (sinal de contrato bem estruturado)

---
**Movimento operacional:** Crie 3 versões do seu contrato padrão — light (até R$5k), médio (R$5-30k), robusto (R$30k+). Cliente pequeno não precisa de 8 páginas. Cliente grande vai querer as 8 páginas. Tentar servir os dois com o mesmo contrato degrada ambos. E revise os 3 modelos a cada 12 meses — legislação muda, seu negócio muda, seus problemas recorrentes mudam.
