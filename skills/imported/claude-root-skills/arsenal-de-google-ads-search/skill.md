---
name: arsenal-de-google-ads-search
description: Produz pacotes completos de Responsive Search Ads (RSA) para Google Ads — 15 headlines + 4 descrições + extensões (sitelinks, callouts, structured snippets) — já calibrados para Quality Score alto, CTR elevado e respeitando o limite de caracteres de cada campo. Também revisa anúncios atuais para subir o Ad Strength e diagnosticar baixa performance. Acione sempre que o assunto for Google Ads Search, RSA, anúncio de pesquisa, AdWords, "anúncio no Google", "palavra-chave", Quality Score, Ad Strength, "campanha de pesquisa", "meu anúncio não tá clicando", — mesmo se o usuário não usar o termo "RSA".
---

# Arsenal de Google Ads Search

Diferente de Meta Ads, onde você caça o usuário, no Google Ads o usuário é que tá te caçando. A pessoa digitou uma busca com intenção. Seu trabalho não é chamar atenção — é **ser a resposta mais óbvia e clicável** na SERP.

Três forças operam ao mesmo tempo:

1. **Quality Score** (do Google): relevância da keyword + CTR esperado + experiência na LP
2. **Ad Strength** (do Google): diversidade e qualidade dos assets da RSA
3. **Comportamento do usuário**: o que faz ele clicar no seu anúncio em vez do concorrente

Esta skill escreve copy que otimiza as três simultaneamente.

## O que é RSA (e por que faz diferença)

Responsive Search Ad é o formato atual do Google Ads. Você manda:
- Até 15 headlines (título 1, 2, 3... — até 3 aparecem por vez)
- Até 4 descrições (até 2 aparecem por vez)
- O Google mistura em tempo real, testando combinações, e otimiza pra cada busca

Isso significa que **suas 15 headlines precisam ser combinatoriamente coerentes**. Se aparecer Headline 3 + Headline 7 + Headline 12, a mensagem tem que fazer sentido.

## O Prompt

```
Você é especialista certificado em Google Ads com foco em campanhas de rede de pesquisa. Você entende que RSA não é "15 headlines criativas" — é um sistema combinatório que o Google remonta em tempo real. Sua missão é escrever headlines e descrições que performem individualmente E se combinem bem entre si.

**CONTEXTO DA CAMPANHA:**

*Keyword e intenção*
- Palavra-chave principal: [ex: "curso de inglês online"]
- Palavras-chave secundárias do grupo de anúncios: [2-4 variações]
- Tipo de correspondência: [ampla modificada / frase / exata]
- Intenção de busca: [transacional / informacional / navegacional / comparação]
- Estágio de funil do buscador: [topo — tá pesquisando / meio — tá comparando / fundo — quase comprando]

*Oferta*
- Produto/serviço: [descreva em uma linha]
- Preço ou faixa: [valor explícito se política permitir mostrar]
- Oferta atual: [desconto, trial, frete grátis, brinde — ou "sem oferta"]
- Diferencial verificável: [o que é único E demonstrável]

*Contexto competitivo*
- Concorrentes principais na SERP: [nomes, se souber]
- Ângulo que o concorrente NÃO ataca: [o espaço em branco competitivo]

*Landing page*
- URL: [link]
- O que o visitante encontra no topo da LP: [headline + oferta imediata]

*Restrições*
- Domínio a aparecer em URL visível: [ex: meusite.com.br/curso]
- Caminhos de URL (até 2): [ex: /ingles-online]
- Palavras proibidas por política (dependendo do nicho): [se aplicável]

**ENTREGA:**

## 15 HEADLINES (máx 30 caracteres cada)

Distribua assim — essa diversidade é o que sobe o Ad Strength:

**Grupo 1: Keyword-match (5 headlines)**
Incluem a keyword principal ou variação próxima. Cruciais pro Quality Score.

**Grupo 2: Benefício concreto (3 headlines)**
Resultado específico que o produto entrega.

**Grupo 3: Oferta/Preço (3 headlines)**
Mencionam promoção, condição, preço ou formato comercial.

**Grupo 4: Prova/Autoridade (2 headlines)**
Números, volume de clientes, tempo de mercado, credenciais.

**Grupo 5: CTA direto (2 headlines)**
Comando claro pra ação imediata.

Para cada headline:
- Texto exato
- Contagem de caracteres
- Função que cumpre (Grupo de 1 a 5)
- Peso sugerido (PINNED na posição 1/2/3 — se estratégico — ou None)

Atenção: NÃO use "pinning" em mais de 3 headlines. Pinning excessivo mata o Ad Strength porque trava a combinatória.

## 4 DESCRIÇÕES (máx 90 caracteres cada)

- Descrição 1: Foco em benefício + diferencial
- Descrição 2: Foco em oferta + urgência (se houver)
- Descrição 3: Foco em prova social ou autoridade
- Descrição 4: Foco em CTA com remoção de fricção

Para cada:
- Texto exato
- Contagem
- Gatilho principal

## EXTENSÕES COMPLETAS

**Sitelinks (6 opções — use 4-6 na campanha)**
Cada sitelink com:
- Texto principal (máx 25 chars)
- Linha de descrição 1 (máx 35 chars)
- Linha de descrição 2 (máx 35 chars)
- URL de destino sugerida

**Callouts (8 opções — use todos os 8)**
Frases curtas de até 25 chars, começando com verbo ou benefício.

**Structured Snippets (2 tipos sugeridos)**
- Tipo: [ex: "Serviços", "Cursos", "Tipos", "Modelos"]
- 4 valores por tipo

**Price extension (se aplicável)**
- 3 pontos de preço com título e valor

## PLANO DE ATIVAÇÃO

- 2 variações adicionais de RSA pra testar em paralelo (Google recomenda 2-3 RSAs por grupo de anúncio)
- Negative keywords iniciais sugeridas (5-10 termos que você provavelmente NÃO quer impressionar)
- Sinalização de conflito com política: [algum termo na lista pode triggerar revisão? sim/não]
- Previsão qualitativa de Ad Strength: [Excelente / Boa / Mediana] — baseado em diversidade entregue
```

## Regras que elevam Quality Score

**1. Keyword na headline.** Não é opcional. Pelo menos 3 das 15 headlines precisam conter a keyword ou variação próxima. Isso é o sinal #1 de relevância que o Google lê.

**2. Message match com a LP.** Se o anúncio promete "curso de inglês online com professor nativo" e a LP abre com "Aprenda idiomas com método próprio", o Quality Score cai. A primeira coisa que a LP mostra tem que ecoar o anúncio.

**3. CTR alto no primeiro dia importa muito.** Se o CTR é baixo nas primeiras 500 impressões, o Google acha que sua relevância é ruim e o CPC sobe. Escreva pros primeiros cliques, não pra média.

**4. Ad Strength "Excelente" não é frescura.** Ads com Ad Strength alto têm CPC até 30% menor no mesmo leilão. Diversificar headlines NÃO é criatividade — é hack de economia.

## Erros típicos que matam campanhas

- Headlines similares demais (o Google rejeita por falta de diversidade — Ad Strength cai pra "Fraco")
- Não usar extensões (você tá jogando CPC pra cima por pura falta de preenchimento de formulário)
- Copy idêntica à do concorrente na SERP (CTR virou sorteio — sai caro)
- Pinning demais (o que trava a máquina de combinação do Google)
- Promessa no ad que a LP não cumpre (ganha CTR, perde Quality Score e conversão)

## Diagnóstico de RSA existente

Se seu anúncio tá com Ad Strength "Fraco" ou "Mediana":

1. Abra o relatório "Combinações" do Google Ads
2. Veja quais headlines são servidas com maior frequência
3. As que raramente aparecem são irrelevantes ou redundantes — substitua
4. Adicione diversidade nos grupos 2, 3 e 4 (benefício, oferta, prova)
5. Revise pinning — provavelmente tá limitando combinações

Se o CTR tá baixo (< 3% em busca de alta intenção):
- Problema é relevância com a keyword (headline não tá ancorando o termo) OU
- Descrição não diferencia do concorrente
- Na SERP em tempo real, compare — se você tá dizendo a mesma coisa que os 3 concorrentes, tá preso na commodityzação

---
**Jogada estratégica:** Crie um segundo RSA no mesmo grupo de anúncio, mas com ângulo competitivo oposto ao primeiro. Ex: o primeiro foca em "mais barato", o segundo em "premium com garantia". Google testa os dois em paralelo e a experiência mostra que quase sempre um dos dois performa muito melhor que a "média esperada" — porque atende intenções de busca sutilmente diferentes dentro da mesma keyword.
