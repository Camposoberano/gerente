---
name: acordo-de-sigilo-estrategico
description: Redige Acordos de Confidencialidade (NDAs) em versões unilateral, bilateral e multilateral, calibrados pelo valor estratégico da informação protegida. Inclui cláusulas práticas (definição específica do que é confidencial, exceções realistas, prazo calibrado, consequência com força executiva) em linguagem clara. Sinaliza explicitamente quando revisão advocatícia é obrigatória (M&A, dados sensíveis, alto valor). Acione sempre que mencionar: NDA, acordo de confidencialidade, sigilo, "proteger informação", contrato de confidencialidade, non-disclosure agreement, antes de parceria, due diligence, compartilhar dado estratégico com terceiro — mesmo sem usar "NDA".
---

# Acordo de Sigilo Estratégico

Quase todo mundo assina NDA sem ler. Em 90% dos casos sem consequência — porque a informação trocada não tinha valor relevante. Nos 10% críticos, falta de rigor na redação custa milhões (literalmente — casos de vazamento de código-fonte, lista de clientes, estratégia de M&A).

Um NDA efetivo faz 4 coisas:

1. **Define com especificidade o que é confidencial** (não genericamente)
2. **Limita exceções reais** (informação pública, já conhecida, exigida por lei)
3. **Estipula consequência executiva** (multa concreta, não "indenização a ser apurada")
4. **Dura o prazo proporcional ao valor** (não "eterno", não "6 meses")

NDA copiado da internet falha em pelo menos 2 desses.

## Os 3 tipos e quando cada um serve

| Tipo | Quando usar | Armadilha |
|------|------------|-----------|
| **Unilateral** | Você compartilha — outro recebe | Definir "parte receptora" sem contemplar que info possa ir nos dois sentidos acidentalmente |
| **Bilateral (mútuo)** | Ambos compartilham | Desequilíbrio de cláusulas (um mais protegido que o outro) |
| **Multilateral** | 3+ partes envolvidas | Responsabilidade solidária mal definida |

Unilateral é o padrão em contratações de fornecedor. Bilateral é padrão em parcerias e M&A. Multilateral em consórcios e joint ventures.

## O Prompt

```
Você é especialista em contratos de confidencialidade. Sua função não é "gerar NDA bonito" — é redigir documento que efetivamente proteja em caso de conflito. Você sabe que NDA é testado apenas quando há disputa — e é aí que cláusulas mal escritas caem por terra.

IMPORTANTE: Para NDAs em contextos de M&A, captação de investimento, transferência de tecnologia, ou quando a informação tem valor estratégico alto (acima de R$500k em prejuízo potencial), revisão advocatícia é obrigatória. Esta skill gera primeira versão robusta, não substituta de advogado.

**CONTEXTO:**

*Partes*
- Tipo de NDA: [unilateral / bilateral / multilateral]
- Parte(s) divulgadora(s): [quem fornece informação + natureza jurídica]
- Parte(s) receptora(s): [quem recebe + natureza jurídica]

*Contexto da troca*
- Propósito da troca: [avaliação de parceria / due diligence M&A / contratação de fornecedor / negociação comercial / contratação de talent / avaliação de investimento]
- Duração esperada da troca: [uma reunião / semanas / meses / anos]
- Próxima etapa possível: [contrato principal / desistência / absorção]

*Informação a ser protegida*
- Natureza: [técnica / comercial / financeira / de propriedade intelectual / dados de clientes / estratégica]
- Descrição específica do que será compartilhado: [liste com precisão]
- Formato: [documentos escritos / apresentações / acesso a sistema / conversas verbais / visitas técnicas]
- Valor estimado da informação (em caso de vazamento): [baixo, médio, alto, crítico]

*Exceções que precisam aparecer*
- Informação já pública: [sim, padrão]
- Informação já conhecida da parte receptora: [sim, se houver histórico]
- Informação desenvolvida independentemente: [sim]
- Informação exigida por ordem judicial/regulatória: [sim — com obrigação de notificar]

*Prazo desejado*
- Duração da obrigação: [1 / 2 / 3 / 5 / 7 anos — cuidado com "indeterminado"]
- Prazo específico pra informações particulares (segredo industrial): [pode ser maior]

*Consequência por violação*
- Multa fixa pré-estabelecida: [R$ — recomendado]
- Adicional de perdas e danos: [sim/não — padrão sim]
- Tutela antecipada (injunção): [sim/não — padrão sim]

*Contexto operacional*
- Devolução/destruição de material ao fim: [sim/não — padrão sim, com prazo]
- Obrigação de reportar vazamento acidental: [sim — padrão]
- Sub-contratação permitida: [não / sim com consentimento prévio]
- Alcance: apenas partes ou funcionários/sócios também: [padrão: estende]

---

**PASSO 1 — DIAGNÓSTICO DE ADEQUAÇÃO**

Antes de redigir, declare:
- Tipo de NDA apropriado pro contexto
- Faixa de valor estratégico: [baixo / médio / alto / crítico]
- Se valor é alto ou crítico: recomendar revisão advocatícia explicitamente
- 1 risco específico desse contexto que merece cláusula reforçada

**PASSO 2 — NDA COMPLETO**

Entregue em formato pronto pra assinatura:

---

# ACORDO DE CONFIDENCIALIDADE

Celebrado entre [PARTE A], doravante denominada "DIVULGADORA", e [PARTE B], doravante denominada "RECEPTORA", tendo em vista [propósito específico].

### CLÁUSULA 1 — DO OBJETO
Estabelecer os termos sob os quais as PARTES compartilharão informações confidenciais, garantindo proteção ao uso, divulgação e exploração não autorizada.

### CLÁUSULA 2 — DAS INFORMAÇÕES CONFIDENCIAIS

2.1. Consideram-se Informações Confidenciais, independentemente de marcação como tal:
(a) [listagem específica — ex: arquitetura técnica, documentação de sistemas, listas de clientes, informações financeiras, projeções, estratégias comerciais, dados de PI]
(b) Qualquer informação que, por sua natureza, um profissional razoável identificaria como confidencial
(c) Informações verbais formalizadas por escrito dentro de 15 dias

2.2. NÃO são consideradas Informações Confidenciais:
(a) Informações já de domínio público antes da assinatura
(b) Informações comprovadamente já possuídas pela PARTE RECEPTORA
(c) Informações obtidas legalmente de terceiros sem obrigação de confidencialidade
(d) Informações desenvolvidas independentemente sem uso das Informações Confidenciais
(e) Informações que se tornaram públicas sem violação deste Acordo

### CLÁUSULA 3 — DAS OBRIGAÇÕES DA PARTE RECEPTORA

3.1. Utilizar as Informações Confidenciais exclusivamente para [propósito].
3.2. Não divulgar, compartilhar, copiar, reproduzir, publicar ou explorar comercialmente.
3.3. Restringir acesso apenas a funcionários/sócios/prestadores que:
(a) tenham necessidade efetiva de conhecê-las para o propósito do Acordo;
(b) estejam vinculados a obrigação de confidencialidade equivalente.
3.4. Aplicar medidas de segurança compatíveis com a natureza e sensibilidade (controle de acesso lógico, criptografia, senhas, backup seguro).
3.5. Notificar imediatamente em caso de vazamento ou suspeita, inclusive acidental.

### CLÁUSULA 4 — DAS EXCEÇÕES LEGAIS

4.1. A PARTE RECEPTORA poderá divulgar quando:
(a) Exigida por ordem judicial, arbitral ou autoridade competente
(b) Em resposta a requisição regulatória legítima

4.2. Nessas hipóteses, deverá:
(a) Notificar a PARTE DIVULGADORA em até 48h da ciência da exigência, salvo vedação legal
(b) Limitar a divulgação ao estritamente necessário
(c) Cooperar com medidas de proteção

### CLÁUSULA 5 — DA VIGÊNCIA

5.1. Entra em vigor na data de assinatura.
5.2. As obrigações vigorarão por [X] anos a contar da última divulgação de Informação Confidencial.
5.3. Para informações qualificadas como "Segredo Industrial", o prazo estende-se indefinidamente enquanto mantida a natureza secreta.

### CLÁUSULA 6 — DA DEVOLUÇÃO E DESTRUIÇÃO

6.1. Ao término ou a pedido, a PARTE RECEPTORA devolverá ou destruirá toda documentação em prazo não superior a 30 dias.
6.2. A destruição inclui cópias físicas, arquivos digitais, backups e materiais derivados.
6.3. Envio de termo de confirmação da destruição, assinado por representante legal.

### CLÁUSULA 7 — DA VIOLAÇÃO E PENALIDADES

7.1. A violação ensejará:
(a) Multa pré-estabelecida de [R$ X] por violação
(b) Indenização por perdas e danos efetivamente sofridos, cumulativamente à multa
(c) Possibilidade de tutela inibitória/antecipada para cessar a violação

7.2. As penalidades não excluem persecução criminal em casos de concorrência desleal (art. 195 da Lei 9.279/1996) ou violação de segredo industrial.

### CLÁUSULA 8 — DA RELAÇÃO INDEPENDENTE

8.1. Este Acordo não cria vínculo societário, contratual comercial, emprego ou mandato.
8.2. Nenhuma Parte pode representar a outra perante terceiros sem autorização expressa.

### CLÁUSULA 9 — DAS DISPOSIÇÕES GERAIS

9.1. Comunicações oficiais: [email ou canal formal]
9.2. Tolerância a descumprimento não implica renúncia
9.3. Nulidade parcial não invalida o Acordo
9.4. Alterações somente por aditivo escrito assinado por ambas

### CLÁUSULA 10 — DO FORO

Eleito o foro da Comarca de [cidade/estado], com renúncia a qualquer outro.

---

E por estarem assim justas e acertadas, as Partes assinam em [N] vias de igual teor.

[Cidade], [data].

_______________________
PARTE A (DIVULGADORA)

_______________________
PARTE B (RECEPTORA)

---

**PASSO 3 — CLÁUSULAS ADICIONAIS POR CONTEXTO**

### Se envolve ACESSO A SISTEMA/CÓDIGO:
- Não engenharia reversa
- Não desenvolvimento de produto competidor
- Retorno de credenciais ao fim

### Se envolve DADOS DE CLIENTES:
- Compliance LGPD
- Não prospecção dos clientes listados por prazo determinado
- Obrigação de informar em caso de uso para treino de IA

### Se envolve CONTRATAÇÃO (M&A, investimento):
- Non-solicitation: não contratar funcionários por 6-12 meses
- Exceções (aplicação espontânea)

### Se envolve PROPRIEDADE INTELECTUAL SENSÍVEL:
- Limitação de cópia e captura de tela
- Obrigação de destruição específica (não só "apagar")

**PASSO 4 — CHECKLIST DE VERIFICAÇÃO**

- [ ] Identificação completa e correta das partes?
- [ ] Propósito específico da troca mencionado?
- [ ] Informações listadas com especificidade (não "qualquer")?
- [ ] Exceções realistas incluídas?
- [ ] Prazo proporcional ao valor (não "eterno")?
- [ ] Multa em valor concreto (não "a ser apurada")?
- [ ] Cláusula de devolução/destruição com prazo?
- [ ] Foro adequado (preferencialmente da parte divulgadora)?
- [ ] Disclaimer de revisão advocatícia para alto valor?

**PASSO 5 — SINALIZAÇÕES FINAIS**

- Assinatura eletrônica: válida (Lei 14.063/2020). Plataformas: ClickSign, D4Sign, DocuSign.
- Reconhecimento de firma: opcional — fortalece em disputa, mas não obrigatório
- Testemunhas: opcionais, mas fortalecem disputas
- Registro em cartório: opcional, dá fé pública (útil em alto valor)

**PASSO 6 — ALERTAS ESPECÍFICOS**

Sinalize 2-3 riscos desse contexto específico que merecem atenção além do NDA:
- Ex: "Em M&A, NDA deve ser complementado por Letter of Intent antes da due diligence ampla"
- Ex: "Em acesso a código-fonte, contrato específico de licenciamento de visualização pode ser necessário"
```

## Regras do NDA que funciona em conflito

**1. Específico vence genérico.** "Todas as informações trocadas" não vale em disputa — juiz pede definição concreta. Liste categorias.

**2. Valor de multa pré-estabelecido poupa anos de litígio.** "Indenização a ser apurada" vira processo de anos. Multa fixa tem força executiva imediata.

**3. Exceções realistas protegem ambos.** NDA que proíbe divulgação até de informação pública é inexecutável — juiz invalida.

**4. Prazo proporcional.** NDA "eterno" é questionável — juiz pode invalidar por abusivo. 2-5 anos é padrão.

**5. Foro eleito estrategicamente.** Se você é a parte divulgadora, foro da sua sede reduz custo/complexidade.

## Erros que invalidam NDAs

- NDA genérico da internet com lacunas não preenchidas
- Proibições absolutas sem exceções realistas
- Multa simbólica (R$1.000) em contexto de milhões
- Obrigação eterna sem justificativa de segredo industrial
- Assinatura só de um lado em NDA bilateral

## Contexto de assinatura eletrônica no Brasil

Lei 14.063/2020 reconhece 3 tipos:
- **Simples** (clique em "aceito"): maioria dos contratos civis de baixo risco
- **Avançada** (login + verificação): quase todos contextos
- **Qualificada** (certificado ICP-Brasil): equivale a firma reconhecida

Pra NDA: avançada basta. Qualificada em alto valor.

## Sinais de NDA efetivo na prática

- Signatário leu e pediu ajuste de 1-2 cláusulas (levou a sério)
- Em violação, consegue tutela antecipada rapidamente
- Multa pré-estabelecida desencoraja tentativas
- Ao fim da relação, outra parte confirma destruição espontaneamente

---
**Camada em M&A/investment:** NDA antes de due diligence deve ser complementado por "NDA reforçado" antes de acesso a dados financeiros detalhados. Não misture num documento só — quanto mais sensível, mais específica a cláusula protetora.
