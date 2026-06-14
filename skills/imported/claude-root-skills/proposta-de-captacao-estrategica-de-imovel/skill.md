---
name: proposta-de-captacao-estrategica-de-imovel
description: Proposta pra fechar exclusividade na captação de imóvel — com análise comparativa de mercado local (3-5 imóveis similares), plano de venda concreto 30/60/90 dias, justificativa de comissão pelo trabalho efetivo (não pelo "%"), respostas pras 3 objeções clássicas do proprietário (já tentei sozinho / vocês cobram caro / outra imobiliária prometeu mais barato), e roteiro de apresentação. Foco em PROPRIETÁRIO HESITANTE que está em fase de comparar imobiliárias ou tentar sozinho. Acione sempre que mencionar captar imóvel, exclusividade imobiliária, fechar contrato com proprietário, "como faço o proprietário escolher minha imobiliária", proposta pra captação, autorização de venda, captador imobiliário — mesmo sem citar "captação".
---

# Proposta de Captação Estratégica de Imóvel

Captação de imóvel não é venda comum. O proprietário não está comprando algo — está confiando algo. Ele já tem o ativo (o imóvel), e está decidindo quem cuida pra vender da melhor forma.

A maioria das captações falha por 1 de 3 motivos:

1. **Tentar primeiro sozinho.** Proprietário coloca foto no Facebook, OLX, fala com vizinho. Acredita que vai vender direto e economizar comissão.

2. **Já tem outras imobiliárias falando.** Cada imobiliária promete o mesmo: "vendemos rápido, temos compradores na lista". Vira competição genérica.

3. **Acha que comissão é cara.** "Vocês ficam com 6% por que? Eu trabalho pra vender também."

Proposta de captação que vence neutraliza os 3. Mostra trabalho concreto que justifica comissão (não a comissão em si). Apresenta análise de mercado que tira o "achismo" do proprietário. E entrega plano de venda com prazos que faz qualquer alternativa parecer amadora.

A regra: o proprietário NÃO escolhe a imobiliária mais barata, nem a mais conhecida. Escolhe a que parece mais COMPETENTE no que vai fazer.

## A arquitetura da proposta vencedora

| Elemento | Função | Erro padrão |
|----------|--------|-------------|
| **Análise de mercado local** | Tira o "achismo" do preço | Proprietário acha que vale 20% acima do mercado |
| **Plano de venda 30/60/90** | Mostra trabalho concreto | "Vamos divulgar nos portais" — todo mundo diz |
| **Diferencial específico** | Separa de outras imobiliárias | Adjetivos genéricos ("excelência") |
| **Comissão justificada** | Conecta % ao trabalho | Discutir % isolada vira commodity |
| **Resposta a objeções** | Antecipa hesitação | Esperar proprietário verbalizar pra reagir |
| **Próximo passo cronometrado** | Reduz fricção pra fechar | "Aguardamos retorno" — perde captação |

## O Prompt

```
Você é especialista em captação imobiliária. Sua função é redigir proposta que faz o proprietário escolher SUA imobiliária — não a mais barata, não a mais antiga, mas a que parece mais competente no que vai fazer.

Princípios não-negociáveis:
- Análise de mercado SEMPRE. Sem dado, é palpite. Proprietário desconfia de palpite.
- Plano de venda concreto. "Vamos divulgar" = todo mundo diz. "Sessão de fotos profissionais dia X, anúncio em 4 portais até dia Y, abordagem ativa de N compradores qualificados na semana Z" = trabalho específico.
- Comissão é trabalho, não percentual. Justifique pelo que você FAZ, não pelo % isolado.
- Antecipar objeções > reagir a elas. Os 3 grandes (sozinho / outra imobiliária / cara) precisam estar endereçados na própria proposta.
- Próximo passo cronometrado. "Te espero" = perde. "Vamos assinar dia X às 14h" = ganha.

**CONTEXTO:**

*Imóvel*
- Tipo: [apartamento / casa / terreno / comercial]
- Bairro + cidade: [específico]
- Características: [m² / quartos / vagas / andar / particularidades]
- Estado de conservação: [novo / reformado / precisa reforma / antigo]
- Documentação: [regular / pendência X / em regularização]

*Proprietário*
- Perfil: [investidor / família que mora no imóvel / herdeiro / casal mudando de cidade]
- Motivação pra vender: [investimento / mudança / divisão / emergência financeira]
- Timing desejado: [imediato / 6 meses / sem pressa]
- Já tentou vender: [sim — quando, como, resultado / não]
- Outra imobiliária consultada: [sim / não / qual]

*Sua imobiliária*
- Nome / posicionamento: [boutique / volume / digital / família]
- Tempo de atuação no bairro: [anos]
- Diferenciais reais: [tráfego pago / fotografia profissional / rede de compradores / tecnologia]
- Volume médio mensal: [vendas / captações]

*Análise de mercado disponível*
- Imóveis similares anunciados na região: [3-5]
- Preços e tempo de anúncio dos similares: [dados específicos]
- Vendas recentes na região: [últimos 6-12 meses]

*Condições oferecidas*
- Comissão: [% sugerida]
- Prazo de exclusividade: [3 / 6 / 12 meses]
- Serviços inclusos: [fotos / vídeo / staging / tráfego pago / portais / etc.]

*Preço ideal vs realista*
- Quanto o proprietário quer: [R$ — geralmente acima do mercado]
- Faixa real de mercado: [R$]
- Preço sugerido pra captação: [R$ — equilibrando expectativa e realidade]

---

**PASSO 1 — DIAGNÓSTICO DA CAPTAÇÃO**

Antes da proposta:
- 1 risco principal (ex: "proprietário com expectativa 25% acima do mercado — preço alto vai fazer imóvel ficar parado, quem capta sem alinhar isso vai pagar a conta")
- 1 ângulo específico que pode separar você (ex: "perfil de comprador no Setor Bueno é casal jovem primeiro imóvel — sua estratégia precisa ser focada nisso, não em investidor")
- Estimativa realista de tempo de venda no preço sugerido

**PASSO 2 — PROPOSTA COMPLETA**

Estrutura por seção:

### CABEÇALHO
- Imobiliária + corretor responsável
- Para: [Proprietário]
- Imóvel: [endereço]
- Data + validade da proposta (15 dias)

### 1. ENTENDIMENTO DA SITUAÇÃO

Parágrafo curto que demonstra que você ouviu o proprietário:

"[Nome], conforme conversamos, você está buscando vender o [imóvel] por [motivo]. Seu objetivo é [timing + valor desejado]. Já [se aplicável: tentou X / consultou Y]. Esta proposta foi montada considerando esse cenário específico."

### 2. ANÁLISE DE MERCADO LOCAL

Tabela comparativa de imóveis similares:

| Imóvel | Localização | Características | Anunciado por | Tempo no mercado | Status |
|--------|-------------|-----------------|---------------|------------------|--------|
| 1 | [endereço] | [m², quartos] | R$ X | Y meses | Ativo / Vendido |
| 2 | ... | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... | ... |

**Análise:**
- Faixa de preço de imóveis similares: R$ [X-Y]
- Tempo médio de venda: [meses]
- Tendência da região (últimos 6 meses): [valorização / estabilidade / queda]
- Perfil de comprador típico: [perfil]

**Recomendação de preço:**
"Considerando o cenário, o preço estratégico pra venda em [prazo desejado] seria R$ [valor]. [Justificativa específica baseada em comparativos]."

(Se proprietário quer preço mais alto, addressar diretamente:)
"Você mencionou expectativa de R$ [X]. Honestamente, esse valor é viável APENAS se aceitar prazo de [Y meses+]. No preço de R$ [Z], conseguimos vender em [prazo menor]. A escolha é sua — eu te entrego os 2 cenários com clareza."

### 3. PLANO DE VENDA — 90 DIAS

Cronograma específico:

#### Semana 1 — Preparação
- Sessão de fotografia profissional (data marcada)
- Vídeo de tour curto (Reel pra Instagram)
- Cadastro nos portais (VivaReal, ZAP, OLX, próprio site)
- Anúncio nas redes sociais da imobiliária

#### Semana 2-4 — Aceleração inicial
- Tráfego pago nas redes sociais (R$ [valor]/dia)
- Abordagem ativa pra base de compradores qualificados ([N] contatos)
- Captação de visitas (meta: [N] visitas/semana)
- Relatório semanal pra você

#### Mês 2 — Análise e ajuste
- Avaliação das visitas: feedback dos visitantes
- Avaliação do interesse: % de quem visitou demonstrou interesse
- Ajuste de preço se necessário (com sua aprovação prévia)
- Renovação de fotos e anúncios
- Estratégia de open house se cabível

#### Mês 3 — Foco de fechamento
- Revisão de ofertas recebidas
- Negociação ativa
- Documentação preparada (sua + nossa)
- Assinatura prevista [data]

### 4. POR QUE NOSSA IMOBILIÁRIA

Diferenciais ESPECÍFICOS (não adjetivos genéricos):

- **[Diferencial 1 com dado]**: ex: "Atuamos no [Bairro] há [X] anos com [Y] vendas registradas no setor."
- **[Diferencial 2 com dado]**: ex: "Base de [N] compradores ativos qualificados, com perfil mapeado por orçamento e prazo."
- **[Diferencial 3 com dado]**: ex: "Investimos R$ [X]/mês em tráfego pago, gerando média de [Y] leads/mês."
- **[Diferencial 4 com dado]**: ex: "Fotografia profissional inclusa: imóveis com fotos de qualidade vendem [Z]% mais rápido nas nossas estatísticas."

### 5. INVESTIMENTO E CONDIÇÕES

#### Comissão
- Valor: [%] sobre o valor de venda
- Forma de cobrança: na assinatura do contrato de compra e venda
- Inclui: [tudo que está incluso na comissão — fotos, anúncios, tráfego pago, atendimento, documentação]

**Justificativa do percentual:**
"Vou ser direto sobre o que sua comissão de [%] cobre:
- Sessão de fotografia profissional (R$ [valor]) — incluída
- Investimento em tráfego pago de pelo menos R$ [X] no período — incluído
- Atendimento de [N] leads em média — sem custo extra pra você
- [N]+ horas de trabalho de corretor em visitas, negociação, documentação
- Apoio jurídico e cartório — incluído

Comparando com você fazendo sozinho, o ROI da comissão é positivo em [X]% dos casos."

#### Exclusividade
- Prazo: [3 / 6 meses]
- Por que exclusividade: explicação simples ("imobiliária que sabe que tem prazo limitado prioriza seu imóvel; sem exclusividade, fica em fila e perde foco")
- Cláusula de saída: condições pra cancelar antes do prazo (justas)

### 6. RESPOSTAS ÀS 3 OBJEÇÕES

#### Objeção: "Vou tentar sozinho antes"

"Faz sentido pensar isso, e respeito. Mas vou te trazer o cenário real:

- Tempo médio de venda direta no [bairro]: [X] meses (vs [Y] com imobiliária ativa)
- Risco de baixa exposição: você atinge sua rede pessoal + portal grátis. Imobiliária atinge [Z] leads/mês ativos.
- Negociação: comprador que vê 'venda por proprietário' sabe que pode pressionar mais — economia da comissão geralmente vira desconto no preço.
- Burocracia: documentação, financiamento do comprador, escritura — sem suporte vira pesadelo.

Se mesmo assim quiser tentar sozinho, faço uma proposta: deixa eu fazer um diagnóstico do seu imóvel sem custo. Te dou orientação de preço, fotos e plano. Se em 30 dias você não vender direto, fechamos a exclusividade. Sem perder tempo."

#### Objeção: "Outra imobiliária prometeu vender mais barato / com comissão menor"

"Posso entender que pareça sedutor. Vou ser honesto: comissão é o que financia o trabalho real. Imobiliária que cobra 3% geralmente entrega [exemplos de o que não entrega — tráfego pago, fotos, atendimento dedicado]. Não digo que está errada — digo que é serviço diferente.

A pergunta certa não é 'qual cobra menos'. É 'em qual prazo cada uma entrega meu imóvel vendido'. Imobiliária A: [%] em [N] meses. Imobiliária B: [%] em [N] meses. Calcule o custo de oportunidade dos meses a mais — geralmente sai mais caro pagar mais barato."

#### Objeção: "Já tive imobiliária e não vendeu nada"

"Sinto muito por essa experiência. Pra ser sincero, [X]% das imobiliárias do mercado entregam exatamente isso — listam no portal e esperam tocar o telefone.

Por isso a primeira coisa que pergunto é: o que faltou na imobiliária anterior? Foi atendimento? Foi exposição? Foi negociação? Quero entender pra te garantir que NÃO se repete aqui.

E meu compromisso: vou te enviar relatório semanal mostrando atividade real (visitas, contatos, anúncios). Se em 60 dias você sentir que não está rodando, conversamos sobre o cenário — sem briga, sem multa abusiva."

### 7. PRÓXIMO PASSO

Cronograma claro:

- **Hoje:** análise desta proposta
- **Próximos 3 dias:** dúvidas que tiver, me chame por WhatsApp
- **[Data + 5 dias]:** reunião de fechamento — 30 min, presencial ou videochamada
- **[Data + 7 dias]:** assinatura do contrato de exclusividade
- **[Data + 14 dias]:** imóvel ATIVO em todos os portais
- **[Data + 30 dias]:** primeira reunião de checkpoint

"Vamos agendar a reunião de fechamento agora? Tenho disponibilidade [opções específicas]. Qual funciona pra você?"

(Não deixar com "qualquer dúvida me chame". Cronograma cria movimento.)

```

## Os 5 erros que matam captação

**1. Sem análise de mercado.** Proprietário acha que vale R$X com base em "o vizinho vendeu por isso". Sem comparativo objetivo, conversa vira disputa de opiniões.

**2. Plano genérico.** "Vamos divulgar nos portais" — todas as imobiliárias dizem isso. Plano específico com datas e ações cria diferenciação.

**3. Discutir % de comissão isolada.** "Por que vocês cobram 6%?" sem amarrar ao trabalho concreto = você perde. Sempre conecte % a o que você FAZ.

**4. Não endereçar objeções na própria proposta.** Esperar o proprietário verbalizar "vou tentar sozinho" pra reagir é tarde — antecipe na proposta escrita.

**5. Sem fechamento cronometrado.** "Aguardo seu retorno" mata captação. Próximo passo com data faz acontecer.

## Sinais de proposta funcionando

- Proprietário lê toda e tem perguntas específicas (sinal de leitura atenta)
- Proprietário fala "deixa eu pensar UM dia" (não uma semana — sinal de que vai fechar)
- Proprietário pergunta sobre detalhes do plano de venda (sinal de adesão à estratégia)
- Proprietário cita conhecidos / vizinhos pra você consultar (sinal de aprovação)
- Negociação é sobre prazo de exclusividade ou cláusulas (não sobre %)

## Sinais de captação que vai falhar

- Proprietário fala "vou pensar" e some
- Proprietário pergunta APENAS sobre comissão / desconto
- Proprietário compara linha-a-linha com proposta concorrente
- Proprietário insiste em preço acima do mercado sem ouvir argumentação
- Proprietário quer "testar 30 dias sem exclusividade"

## Quando RECUSAR a captação

- Proprietário com expectativa 30%+ acima do mercado e que NÃO aceita argumentação
- Imóvel com documentação grave irregular (vai consumir 6 meses sem vender)
- Proprietário que já trocou de 3+ imobiliárias em 12 meses (perfil difícil)
- Proprietário hostil ou desrespeitoso na primeira conversa

Recusar protege seu tempo e reputação. Captação ruim queima o trabalho dos meses seguintes.

---
**Camada adicional — captação como ativo recorrente:** Captação fechada bem feita vira INDICAÇÃO. 90 dias após assinar, agradeça o cliente pelo profissionalismo na decisão. 12 meses após (independente da venda ter ocorrido), envie atualização de mercado da região do imóvel. Vizinhança fica sabendo: "essa imobiliária acompanha mesmo". Cada captação satisfeita rende 1-3 indicações em 24 meses. É como você vira referência no bairro sem precisar prospectar tanto.
