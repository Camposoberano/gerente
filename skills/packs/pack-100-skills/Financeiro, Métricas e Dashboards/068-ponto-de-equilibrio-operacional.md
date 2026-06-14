---
name: ponto-de-equilibrio-operacional
description: Calcula o break-even do negócio (receita mínima pra cobrir todos os custos) e traduz esse número em decisões práticas de preço, meta de vendas, desconto máximo viável e margem de segurança. Também compara cenários — e se eu baixar preço? e se aumentar custo fixo? e se tentar vender 20% mais? — pra evitar decisões de improviso. Acione sempre que mencionar: ponto de equilíbrio, break-even, margem de contribuição, "quantas vendas preciso pra cobrir", preço mínimo, desconto seguro, "posso dar desconto de X%", meta de venda realista, "vou contratar, posso me permitir", viabilidade de investimento — mesmo sem citar "break-even".
---

# Ponto de Equilíbrio Operacional

Operar um negócio sem saber o ponto de equilíbrio é dirigir sem painel. Você acha que tá indo bem até bater na reserva zero.

Break-even não é número pra contador. É **régua de decisão**:

- Até onde posso dar desconto? → até a margem de contribuição zerar
- Quantas vendas preciso garantir? → break-even / margem de contribuição
- Posso contratar esse designer? → novo break-even precisa caber na capacidade de venda realista
- Vale a pena esse canal de venda? → receita gerada precisa cobrir seu próprio custo variável E contribuir pro fixo

## O conceito que faz toda a diferença: margem de contribuição

Muita gente confunde margem com lucro. Não é a mesma coisa.

| Termo | Fórmula | O que representa |
|-------|---------|------------------|
| Margem bruta | (Receita - CMV) / Receita | Lucro antes de despesas |
| Margem de contribuição | (Receita - Custos variáveis) / Receita | Quanto cada venda contribui pro custo fixo e lucro |
| Margem líquida | Lucro final / Receita | Sobra real no bolso |

Pro break-even, a única que importa é **margem de contribuição**. Ela é a "sobra por venda" que vai cobrir o custo fixo. Quando o custo fixo é coberto, o resto vira lucro.

## O Prompt

```
Você é analista financeiro prático que sabe que o ponto de equilíbrio mal calculado já quebrou mais empresa que concorrente. Você calcula com rigor, mas traduz em decisões que o dono pode tomar amanhã de manhã.

Sua função não é "fazer conta". É transformar o break-even em régua operacional pra preço, meta, desconto e investimento.

**CONTEXTO:**

*Modelo*
- Tipo de negócio: [venda de produto / prestação de serviço / infoproduto / SaaS / consultoria]
- Se tiver mais de um produto, é foco em qual: [produto único / portfólio]

*Receita por venda*
- Preço de venda: [R$ — inclua se é à vista, parcelado, ou valor líquido após taxas]
- Se houver mais de um preço (bundle, versão): [liste]

*Custo variável (o que muda com cada venda)*
Liste tudo que sai do bolso por venda realizada:
- Custo de produto/produção: [R$]
- Taxa de gateway/plataforma: [% ou R$]
- Imposto sobre a venda: [% — varia por regime]
- Comissão de vendedor/afiliado: [% ou R$]
- Custo de entrega/envio: [R$ — se e-commerce]
- Outros: [liste]

*Custo fixo (sai do bolso independente de vender ou não)*
- Aluguel/infraestrutura: [R$/mês]
- Salários + encargos: [R$/mês]
- Pró-labore do dono: [R$/mês]
- Marketing em budget fixo (SEO, retainer): [R$/mês]
- Ferramentas/SaaS: [R$/mês]
- Contador: [R$/mês]
- Outros fixos: [liste]

*Meta de lucro*
- Quanto quer lucrar acima do break-even: [R$/mês]
- Isso é pro dono? pra reinvestir? pra reserva?

---

**PASSO 1 — CÁLCULOS FUNDAMENTAIS**

Apresente com clareza:

### Margem de Contribuição por venda
```
Preço de venda: R$ X
(-) Custos variáveis por venda: R$ Y
= Margem de contribuição: R$ Z
Margem de contribuição %: Z/X = W%
```

### Break-even em unidades (só cobrir custos)
```
Custo fixo total: R$ A
÷ Margem de contribuição por venda: R$ Z
= Vendas necessárias por mês: B vendas
```

### Break-even em receita
```
B vendas × R$ X (preço) = R$ C (receita mínima mensal)
```

### Break-even por dia/semana
```
B vendas ÷ 22 dias úteis = D vendas/dia (traduzido em meta diária)
B vendas ÷ 4.3 semanas = E vendas/semana
```

**PASSO 2 — INTERPRETAÇÃO CONCRETA**

Traduza em frase simples:
"Você precisa vender [B] unidades por mês, ou seja, [D] por dia útil, pra não ter prejuízo. Isso representa [X%] da sua capacidade atual/histórica de vendas."

Declare se a meta é:
- **Folgada** (vendas atuais > 150% do break-even): conforto operacional
- **Apertada** (vendas atuais 100-150%): margem de segurança pequena
- **Crítica** (vendas atuais < 100%): já tá no prejuízo, precisa agir

**PASSO 3 — BREAK-EVEN COM META DE LUCRO**

```
(Custo fixo + Meta de lucro): R$ A + R$ F = R$ G
÷ Margem de contribuição: R$ Z
= Vendas necessárias: H vendas/mês
```

Quanto acima do break-even puro isso representa (em %).

**PASSO 4 — CENÁRIOS DE PREÇO E DESCONTO**

### Cenário: dou 10% de desconto
- Novo preço: X × 0.9
- Nova margem de contribuição: recalcular
- Novo break-even em unidades: [novo número]
- **Conclusão**: "Esse desconto só vale se aumentar volume em pelo menos X% — abaixo disso, você tá pior."

### Cenário: dou 20% de desconto
[mesma estrutura]

### Cenário: dou 30% de desconto
[mesma estrutura]

### Limite: a que % o desconto começa a operar no prejuízo?
Calcular: ponto em que a margem de contribuição = 0 (não sobra nada pro fixo). Desconto maior que isso = venda que ativamente destrói dinheiro.

**PASSO 5 — CENÁRIOS DE CUSTO FIXO**

### E se eu contratar X pessoa (aumenta fixo em R$Y)?
- Novo custo fixo: A + Y
- Novo break-even: [quantidade]
- Quantas vendas A MAIS preciso fazer pra bancar essa contratação: [diferença]
- Viabilidade: [folgada / apertada / inviável] na capacidade atual

### E se eu mudar pra escritório que custa X a mais?
[mesma estrutura]

### E se eu cortar custo fixo em X%?
- Novo break-even (menor)
- "Cada R$ cortado em custo fixo libera R$ [Z] de lucro potencial"

**PASSO 6 — MARGEM DE SEGURANÇA**

```
Margem de segurança = (Vendas atuais - Break-even) / Vendas atuais
```

Interpretação:
- **> 40%**: folga saudável
- **20-40%**: atenção
- **< 20%**: crítico, qualquer queda te coloca no vermelho

Declare sua margem atual e o que ela significa.

**PASSO 7 — DECISÕES DESBLOQUEADAS**

Agora que tem o break-even, liste decisões que o dono pode tomar com base nele:

- Qual o desconto máximo aceitável em negociação: [%]
- Qual a meta mínima de venda mensal que a equipe DEVE bater: [quantidade]
- Qual aumento de preço o mercado comporta antes de cair muito volume: [análise]
- Quando vale contratar: [condição específica]
- Quando cortar: [gatilho específico]

**PASSO 8 — PERGUNTAS PRA ENCERRAR DÚVIDAS**

Antes de fechar, verifique se:
- [ ] Imposto tá no cálculo certo (se Simples, usar alíquota real do anexo)
- [ ] Pró-labore tá contabilizado como custo fixo (muitos esquecem)
- [ ] Custo de cartão/gateway tá em custo variável, não esquecido
- [ ] Sazonalidade foi considerada (break-even pode ser fácil em novembro e dramático em janeiro)
- [ ] Custo de aquisição (CAC) tá sendo considerado em custo variável

**PASSO 9 — SINAL DE QUE A ANÁLISE TÁ DESATUALIZADA**

- Aumentou preço / mudou produto → refazer
- Contratou pessoa nova → refazer
- Mudou de regime tributário → refazer
- Mudou estrutura de custo (saiu de aluguel, virou coworking) → refazer
- Passou 6 meses → refazer
```

## Regras que separam break-even útil de exercício teórico

**1. Custo fixo inclui pró-labore.** O dono que não se paga acha que tem "lucro" mas tá subsidiando o negócio com tempo não remunerado. Contabilize pró-labore como custo fixo — mesmo que você não saque todo mês.

**2. Imposto entra em variável, não em "depois".** Quando vende R$100 e 10% vai em imposto, seu custo variável tem R$10 daquela venda. Ignorar isso subestima break-even.

**3. Nem toda venda contribui igual.** Se você tem produtos com margens muito diferentes, calcule break-even por mix — ou pelo produto principal, e trate os outros como "bônus" de margem.

**4. Capacidade física importa.** Break-even de 80 vendas/mês num negócio que só consegue atender 60 significa reestruturação, não meta de venda.

**5. Desconto é concessão de margem, não "descontinho".** Cada ponto percentual de desconto é um ponto de margem de contribuição. Faça as contas antes de negociar.

## Erros que quebram análise

- Esquecer de incluir pró-labore no fixo (subestima break-even em muito)
- Misturar custo variável com custo fixo ("aluguel varia com volume?" — não)
- Usar margem bruta no lugar de margem de contribuição
- Não recalcular depois de aumentar custo fixo
- Fazer análise uma vez por ano e esquecer (realidade muda)

## Sinais de saúde

- Margem de contribuição > 50% (ótimo para infoproduto/serviço digital); > 30% (aceitável para produto físico)
- Margem de segurança > 30%
- Break-even atingido nas primeiras 2 semanas do mês (resto vira lucro)
- Cada mês começa sem pânico
- Dono sabe de cabeça o break-even mensal

## Aplicações não óbvias

- **Precificação**: "Meu preço precisa deixar margem de contribuição de ao menos X% pro break-even acontecer em volume realista"
- **Novo serviço**: "Esse serviço novo tem margem de contribuição Y. Só faz sentido se eu conseguir fazer X vendas/mês dele — abaixo disso, é esforço sem caixa"
- **Pivot**: "Esse segmento que vendo hoje tem margem X. Aquele outro tem margem Y. Mesmo volume menor, Y pode ser mais lucrativo"

---
**Jogada estratégica:** Em negócio maduro, calcule break-even em 3 versões: básico (só sobreviver), de qualidade (bancar reinvestimento), e premium (bancar vida confortável + reserva). Cada versão gera uma meta diferente pro time. Muitas empresas operam sempre no "básico" porque nunca definiram os outros dois — e aí dono trabalha 10 anos sem patrimônio construído.
