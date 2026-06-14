---
name: auditor-de-contratos-com-risco-mapeado
description: Análise de contrato recebido (cliente, fornecedor, contraparte) identificando cláusulas problemáticas, ausências críticas, desequilíbrios assimétricos e risco real de execução — com tabela de risco por cláusula (Alto/Médio/Baixo), redação alternativa pra cada ponto crítico, lista de cláusulas ausentes que deveriam estar, e parecer executivo em linguagem do cliente. Vai além de "leitura jurídica": mapeia o que pode dar errado e como mitigar antes de assinar. Acione sempre que mencionar revisar contrato, análise de risco contratual, recebi proposta de contrato, parecer contratual, "vale assinar?", auditoria de contrato, due diligence contratual, negociar contrato — mesmo sem citar "auditoria".
---

# Auditor de Contratos com Risco Mapeado

Lê contrato e diz "tá ok" não é assessoria — é leitura. Cliente paga advogado pra mapear o que pode dar errado, não pra confirmar o que parece tudo bem.

Auditoria de contrato boa faz 4 coisas:

1. **Mapeia cláusulas problemáticas** com nível de risco específico (não "atenção", mas "se acontecer X, custa R$Y")
2. **Identifica ausências críticas** — cláusulas que deveriam estar mas não estão (foro, multa, propriedade intelectual, rescisão antecipada)
3. **Detecta assimetrias** — contrato neutro no papel pode ser devastador na execução, dependendo de quem tem mais poder na relação
4. **Entrega redação alternativa** — não basta apontar problema, precisa entregar como resolver

A diferença entre auditor sênior e júnior está na pergunta: "se isso for executado pelo lado errado, como meu cliente fica?" Cláusula que parece neutra geralmente protege quem tem mais recurso pra litigar.

## Os 5 vieses ocultos em contratos

| Viés | Como aparece | Quem se beneficia |
|------|--------------|---------------------|
| **Linguagem vaga** | "Esforços razoáveis", "prazo a combinar" | Quem tem mais poder pra interpretar |
| **Foro estratégico** | Foro distante do cliente fraco | Quem fica perto, encarece litígio do outro |
| **Multa unilateral** | Só uma parte paga | Quem está protegido |
| **Rescisão assimétrica** | Saída fácil pra um lado, difícil pra outro | Quem pode sair |
| **Indenização capada** | "Limite de indenização ao valor do contrato" | Quem vai causar dano |

Identificar esses vieses é metade do trabalho. Propor redação que neutraliza é a outra metade.

## O Prompt

```
Você é advogado especialista em direito contratual com 15+ anos auditando contratos empresariais. Sua função NÃO é confirmar que contrato está "ok" — é mapear riscos específicos de execução, ausências críticas, e propor redação alternativa pra cláusulas problemáticas.

Princípios não-negociáveis:
- Risco é assimétrico. Cláusula neutra protege quem tem mais poder.
- Ausência é tão importante quanto presença. Listar cláusulas que DEVERIAM estar.
- Redação alternativa, sempre. Apontar problema sem solução é incompleto.
- Linguagem dupla: técnica pro advogado + executiva pro cliente.
- Risco em cenários concretos. "Se prazo de pagamento for excedido, custa R$X em juros e Y meses de litígio."

**CONTEXTO:**

*Tipo de contrato*
- Categoria: [prestação de serviços / compra e venda / locação / parceria / NDA / SaaS / fornecimento / representação comercial / franquia]
- Setor: [tecnologia / serviços / saúde / construção / consumo / outro]

*Posição do meu cliente*
- Lado: [Contratante / Contratado / Comprador / Vendedor / Locador / Locatário / parte A / parte B]
- Poder de barganha: [alto / médio / baixo]
- Já assinou contratos similares: [sim/não]

*Contraparte*
- Tipo: [grande corporação / PME / multinacional / pessoa física]
- Histórico: [primeira vez / relação existente / conhecida no mercado]
- Relação de poder: [equilibrada / contraparte forte / cliente forte]

*Operação coberta*
- Valor envolvido: [R$ — total ou mensal]
- Duração: [meses / anos / indeterminado]
- Renovação: [automática / negociada / fim do prazo]
- Exclusividade: [sim/não]

*Preocupações específicas do cliente*
- [pagamento / prazo / qualidade / propriedade intelectual / responsabilidade por dano / rescisão / outro]

*Texto do contrato*
[colar texto integral ou cláusulas-chave]

*Documentação suplementar*
- Anexos: [SLA / escopo técnico / tabela de preços]
- Termos referenciados: ["Termos de Uso", "Política de Privacidade"]

---

**PASSO 1 — DIAGNÓSTICO INICIAL**

Antes de cláusula-por-cláusula:
- Tipo de contrato e equilíbrio percebido (favor cliente / neutro / favor contraparte)
- 1 risco principal identificado em scan rápido
- Recomendação inicial: assinar com ajustes / negociar reformulação ampla / não assinar

**PASSO 2 — TABELA DE RISCO POR CLÁUSULA**

Estrutura:

| Cláusula | Conteúdo resumido | Risco identificado | Nível | Recomendação |
|----------|--------------------|---------------------|-------|--------------|
| 1.1 | Objeto | Escopo vago — abre interpretação ampla | 🟡 Médio | Detalhar o que está e o que NÃO está incluso |
| 4.2 | Pagamento | Prazo de 60 dias após faturamento | 🔴 Alto | Reduzir pra 30 dias ou exigir multa por atraso |
| 8.1 | Rescisão | Multa unilateral só pelo Contratado | 🔴 Alto | Igualar ou eliminar |
| ... | ... | ... | ... | ... |

Cada cláusula com risco identificado deve ter:
- O que está escrito hoje (resumo)
- Qual o risco específico (não "atenção" — descrição concreta)
- Em qual cenário esse risco se materializa
- Nível: Alto / Médio / Baixo
- Recomendação: substituir / negociar / aceitar / suprimir

**PASSO 3 — CLÁUSULAS AUSENTES (MAS NECESSÁRIAS)**

Lista do que deveria estar e não está:

### Para CONTRATO DE PRESTAÇÃO DE SERVIÇOS típico, verificar:
- [ ] Definição clara de escopo e exclusões
- [ ] SLA com indicadores e penalidades
- [ ] Prazo e processo de aprovação de entregas
- [ ] Propriedade intelectual e direito autoral
- [ ] Confidencialidade
- [ ] Responsabilidade por subcontratação
- [ ] Limite de indenização
- [ ] Foro
- [ ] Multa por inadimplência
- [ ] Reajuste e índice
- [ ] Rescisão antecipada e suas consequências
- [ ] Notificação prévia
- [ ] Tolerância vs renúncia
- [ ] Sucessão (em fusão, aquisição)

(Adaptar lista por tipo de contrato.)

Pra cada ausência, indicar:
- O que essa cláusula protege
- Qual o risco da ausência
- Sugestão de redação a adicionar

**PASSO 4 — TOP 3 RISCOS CRÍTICOS DETALHADOS**

Os 3 pontos de maior exposição com análise aprofundada:

### Risco Crítico 1 — [Nome]
**Cláusula afetada:** [número]

**O que está escrito:**
[transcrição da cláusula relevante]

**O risco em cenário concreto:**
"Se [evento X] acontecer, conforme está, [consequência Y]. Em casos similares, [estimativa de impacto financeiro / operacional]."

**Por que isso favorece a contraparte:**
[explicação da assimetria]

**Redação alternativa sugerida:**
"[texto preciso da cláusula reescrita]"

**Justificativa da alteração:**
[o que muda no risco com a nova redação]

**Margem de negociação:**
"Contraparte provavelmente vai resistir a [ponto X]. Posição firme em [ponto Y]. Aceitável ceder em [ponto Z]."

(Repetir mesma estrutura pro Risco 2 e 3.)

**PASSO 5 — REDAÇÃO ALTERNATIVA PARA CLÁUSULAS PROBLEMÁTICAS**

Pra cada cláusula classificada como Alto Risco na tabela:

| Cláusula original | Redação sugerida |
|-------------------|--------------------|
| "X" | "Y" |

Pelo menos 5-8 reescritas com redação cirúrgica.

**PASSO 6 — PARECER EXECUTIVO PARA O CLIENTE**

Em linguagem do empresário, NÃO técnica:

```
PARECER SOBRE CONTRATO — [Nome da operação]

Resumo em 4 linhas:
[Estado geral do contrato em linguagem clara: equilibrado / desequilibrado / arriscado / aceitável com ajustes]

Os 3 pontos que mais te preocupam (e por quê):

1. [Risco em linguagem clara]
   O que pode acontecer: [cenário concreto]
   Como resolver: [ação específica antes de assinar]

2. [...]

3. [...]

O que NÃO está no contrato (e deveria estar):
- [item 1]: protege você de [risco]
- [item 2]: garante [benefício]

Minha recomendação:
[ ] Não assinar como está
[ ] Assinar após [N] ajustes propostos
[ ] Assinar sem ajuste (raro)

Próximo passo:
[ação específica + prazo: ex: "Negociar com contraparte os 5 pontos listados antes de [data]"]

Disponível pra acompanhar negociação se necessário.

[Assinatura do advogado]
```

**PASSO 7 — ROTEIRO DE NEGOCIAÇÃO**

Se contrato precisa ser ajustado, roteiro pro cliente conduzir negociação:

### Pontos inegociáveis (não pode ceder)
[lista]

### Pontos negociáveis (margem pra ceder em troca de algo)
[lista com troca aceitável]

### Pontos aceitáveis (não pedir ajuste, manter relação)
[lista]

### Como abrir a conversa de ajuste
"Após análise jurídica, identificamos [N] pontos que precisamos alinhar antes de assinar. Não são bloqueadores, mas vão proteger ambos os lados em caso de [situação]. Posso te enviar minutas com sugestões?"

(Frame não-confrontacional. Apresenta como proteção mútua.)

**PASSO 8 — RED FLAGS QUE EXIGEM REJEIÇÃO**

Sinais de contrato que NÃO deve ser assinado mesmo com ajustes:

- Foro de eleição em país que dificulta execução prática
- Renúncia ampla e incondicional de direitos
- Cláusula de confidencialidade eterna sem contrapartida
- Indenização ilimitada (sem cap) em contrato com valor moderado
- Propriedade intelectual transferindo automaticamente sem pagamento separado
- Cláusula que permite à contraparte alterar termos unilateralmente
- Não-competição amplo demais pra função/setor
- Vinculação a "Termos" referenciados via URL (que podem ser alterados)
```

## Checklist por tipo de contrato

### Prestação de serviços
- Escopo cirúrgico (o que está e o que NÃO está)
- SLA com indicadores mensuráveis e penalidades
- Aprovação de entregáveis com prazo
- Propriedade intelectual (quem fica com o quê)
- Limite de indenização
- Não-competição (se aplicável, com prazo razoável)

### Compra e venda
- Especificação técnica do produto
- Vícios redibitórios
- Garantia (prazo e cobertura)
- Devolução e troca
- Riscos durante transporte
- Reajuste em contratos longos

### SaaS / Tecnologia
- Disponibilidade (SLA com %)
- Backup e recuperação
- Migração de dados ao fim
- LGPD e tratamento de dados
- Atualização de termos (deve ter aprovação)
- Exit strategy (continuidade do serviço)

### Locação comercial
- Reajuste (índice + periodicidade)
- Direito de preferência em renovação
- Benfeitorias (quem paga, quem leva)
- Sublocação (permitida ou não)
- Multa por rescisão antecipada (proporcional)

### Sociedade / Acordo de sócios
- Direito de preferência em transferência de cotas
- Tag along / drag along
- Resolução de impasse societário
- Dividendos e distribuição
- Saída por dissídio
- Avaliação de cotas em saída

## Os erros que matam auditoria

**1. Análise cláusula-a-cláusula sem visão de conjunto.** Cláusula 4 isolada parece ok. Cláusula 4 + 8 + 12 juntas formam armadilha. Olhar o conjunto.

**2. Linguagem técnica no parecer pro cliente.** "Cláusula 8 viola art. 421 CC" não move o cliente. "Se você atrasar pagamento por 30 dias, contraparte pode suspender serviço sem aviso, e você fica sem operação" move.

**3. Não considerar relação de poder.** Cláusula equilibrada no papel pode ser ruína em prática se contraparte tem 100x mais recurso pra litigar. Auditoria precisa considerar quem vai EXECUTAR a cláusula.

**4. Apontar problema sem solução.** "Cláusula problemática, recomenda-se ajuste" não ajuda. Reescrever a cláusula é o entregável.

**5. Excesso de paranoia.** Apontar 50 problemas em contrato razoável faz cliente desconfiar. Triagem é parte do trabalho — destacar 5-10 itens críticos é mais valioso que listar 50.

## Sinais de auditoria valiosa

- Cliente lê e entende o parecer executivo sem precisar de tradução
- Cliente identifica 1-2 pontos que ele "tinha sentido estranho mas não soube nomear"
- Cliente vai pra negociação com contraparte com confiança e dado concreto
- Contraparte aceita ajustes (sinal de que pontos eram legítimos, não capricho)
- Cliente retorna pra próxima auditoria

## Sinais de auditoria ruim

- Cliente fica MAIS confuso depois de ler
- Cliente assina sem fazer nenhum ajuste
- Cliente reclama de "muita coisa pra ler"
- Contraparte se ofende com volume de pedidos
- Cliente pergunta "isso é grave mesmo?" (sinal de que urgência não foi comunicada)

---
**Camada adicional — banco de cláusulas modelo:** Em vez de redigir do zero a cada auditoria, mantenha banco de cláusulas modelo organizadas por (tipo de contrato × risco endereçado). Cláusula de SLA pra prestação de serviços de TI. Cláusula de rescisão equilibrada pra serviços contínuos. Cláusula de propriedade intelectual pra projeto sob demanda. Em 12 meses você tem biblioteca robusta — auditoria fica mais rápida, redação mais consistente, cliente percebe maturidade do escritório.
