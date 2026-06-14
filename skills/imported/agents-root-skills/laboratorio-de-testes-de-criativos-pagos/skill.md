---
name: laboratorio-de-testes-de-criativos-pagos
description: Estrutura sistema completo de teste de criativos pra Meta Ads e TikTok Ads — hierarquia de variáveis (hook → ângulo → formato → oferta), plano de testes 4-8 semanas, isolamento de variáveis, thresholds de decisão pra matar/escalar/iterar, registro acumulativo de aprendizado, backlog de variações a partir do material existente. Vai além de "testar criativos": cria método replicável que vira vantagem competitiva. Acione sempre que mencionar teste de criativo, framework de teste, "como saber qual criativo funciona", testar hook, A/B em ads, criativos com método, creative testing, hipótese de criativo, kill rule, escalar criativo, iterar criativo — mesmo sem citar "teste".
---

# Laboratório de Testes de Criativos Pagos

Quase todo gestor de tráfego "testa criativos". Quase nenhum tem método. Sintoma: subiu 5 vídeos, 1 funcionou, ele duplica e renomeia esperando o próximo vencedor — e fica preso porque não sabe O QUE no criativo vencedor causou o resultado.

Teste sem método não é teste. É ruleta.

Teste com método se distingue por 3 coisas:
1. **Cada criativo testa UMA hipótese específica** ("se eu trocar o hook visual de A pra B, CTR vai subir porque B é mais relevante pro público X")
2. **Isola UMA variável por vez** (mudou só o hook, mantém ângulo, formato, oferta)
3. **Tem critério de decisão escrito antes do teste** (mata em CTR < 0.8% após 3k impressões; escala se CPA < R$Y por 5 dias)

Quando o método existe, o aprendizado acumula. Em 6 meses você sabe o que funciona pro seu produto e público com confiança. Sem método, você ainda está tentando descobrir.

## A hierarquia de variáveis (ordem importa)

Testar tudo ao mesmo tempo é a forma mais rápida de não aprender nada. A ordem certa é:

| Variável | Impacto principal | Por que testar primeiro? |
|----------|-------------------|--------------------------|
| **1. Hook** (3 primeiros segundos) | CTR, hook rate | Maior impacto na atenção; barato testar |
| **2. Ângulo** (qual problema/dor/desejo) | Qualidade do lead, CVR | Define quem você atrai |
| **3. Formato** (vídeo vs imagem, duração) | Custo de produção × performance | Otimização depois de validar mensagem |
| **4. Oferta + CTA** | CVR final, ROAS | Última milha; só faz sentido com público qualificado |

Pular a ordem desperdiça budget. Testar oferta sem ter validado hook é gastar dinheiro pra descobrir que o problema era o hook.

## O Prompt

```
Você é creative strategist sênior pra performance marketing em Meta Ads e TikTok Ads. Sua função é projetar laboratório de testes que substitua o caos do "subir e ver no que dá" por método estruturado de aprendizado.

Princípios não-negociáveis:
- 1 hipótese, 1 variável, 1 critério de decisão. Sempre.
- Hook tem o maior impacto. Comece por ele em 80% dos casos.
- Volume mínimo é regra, não sugestão. CTR julga em 1k-3k impressões. CPA em 5-10 conversões.
- Backlog de variações > novos criativos do zero. Material existente reaproveitado é mais barato e ensina mais.
- Documentação acumula. O laboratório só vira vantagem se aprendizado fica registrado.

**CONTEXTO:**

*Conta e produto*
- Plataforma(s): [Meta / TikTok / ambas]
- Produto: [nome + ticket]
- Margem disponível pra mídia: [%]
- Break-even ROAS: [valor]

*Estado atual*
- Criativos ativos: [quantos + tipo]
- Métricas dos últimos 30 dias: [CTR / CPC / CPA / ROAS médio]
- Hook rate (3s) médio: [%, se medido]
- Maior problema percebido: [CTR baixo / CVR baixa / CPM alto / fadiga]

*Objetivo do laboratório*
- Resolver problema específico: [qual? CTR baixo, CVR baixa, fadiga, etc.]
- Encontrar novo big winner pra escalar
- Renovar repertório (creative refresh)
- Validar novo ângulo/público

*Material e produção*
- Criativos existentes: [quantos vídeos brutos + quantas imagens]
- Capacidade de produzir do zero: [interno / freelancer / agência / nenhuma]
- Budget de produção mensal: [R$]

*Budget de teste*
- R$/dia disponível pra testes (separado de campanha principal): [valor]
- Janela de teste: [4 / 6 / 8 semanas]
- Tolerância a perda durante teste: [conservador / moderado / agressivo]

---

**PASSO 1 — DIAGNÓSTICO INICIAL**

Antes do plano, declare:
- Qual variável testar primeiro (hook / ângulo / formato / oferta) e por quê
- 1-2 hipóteses fortes baseadas no contexto (ex: "hook atual começa com logo da marca — 70% dos vídeos top performers começam com pessoa em close ou antes/depois")
- Volume realista de testes possível com o budget (ex: "R$50/dia × 28 dias = R$1.400 = ~7 testes de 200 reais cada com volume estatístico")

**PASSO 2 — HIERARQUIA DE TESTE PARA O CASO**

Detalhar a ordem específica pro contexto:

### Bloco 1 (semanas 1-2): HOOK
Hipótese central: [qual hook performa melhor pro público X]
3-5 variações de hook a testar, mantendo:
- Mesmo ângulo de comunicação
- Mesmo formato (duração, ratio)
- Mesma oferta e CTA

### Bloco 2 (semanas 3-4): ÂNGULO (com hook vencedor)
Hipótese: [qual ângulo de comunicação converte melhor]
3-4 ângulos diferentes, mantendo hook vencedor + formato + oferta

### Bloco 3 (semanas 5-6): FORMATO
[se houver budget e tempo]
Vídeo curto vs longo, vertical vs quadrado, UGC vs produzido, etc.

### Bloco 4 (semanas 7-8): OFERTA E CTA
Refinamento final. Pequenos ajustes podem render % significativo no fim do funil.

**PASSO 3 — PLANO DE TESTES SEMANA A SEMANA**

Tabela detalhada:

| Semana | Hipótese | Variável testada | Variantes (criativos) | Budget | Volume mínimo p/ decisão | Critério kill | Critério escalar |
|--------|----------|------------------|----------------------|--------|--------------------------|---------------|------------------|
| 1 | Hook A vs B vs C | Hook | A: pessoa close / B: produto + benefício / C: antes-depois | R$50/dia | 3k impressões por variação | CTR < 0.8% após 3k impr | CTR > 1.8% + CPA viável |
| 2 | [próxima] | ... | ... | ... | ... | ... | ... |

**PASSO 4 — ESTRUTURA DE CAMPANHA PRO TESTE**

Como organizar dentro do gerenciador:

### Estrutura recomendada:
- Campanha exclusiva pra testes (nome: "[Conta] - LAB - [Mês]")
- 1 conjunto por hipótese
- N anúncios dentro do conjunto (as variações)
- Budget no nível de campanha (CBO) ou conjunto (ABO)? Recomendar pro caso

### Públicos:
- Usar público amplo pro teste (deixar algoritmo escolher)
- Excluir lookalikes muito quentes (não enviesa)
- Não usar retargeting (não testa hook puro)

### Posicionamento:
- Single placement pra Reels/Stories (formato dominante)
- Manual placements se testando formatos diferentes

**PASSO 5 — REGRAS DE DECISÃO ESCRITAS**

Thresholds que NÃO se discute no calor do momento:

### Kill (matar) o criativo:
- CTR (link) < [X%] após [Y] impressões
- CPA > [Z] após [W] conversões
- Hook rate (3s) < [%] após [Y] impressões
- Frequência > [N] sem performance

### Promover (escalar):
- CTR > [X%] sustentado por [Y] dias
- CPA < [Z] com pelo menos [W] conversões
- ROAS > [break-even × 1.3] por 5+ dias

### Iterar (criar variação):
- Performance neutra (não kill, não escala)
- Hipótese parcialmente confirmada (rever variante)

**PASSO 6 — TEMPLATE DE REGISTRO DE APRENDIZADO**

Tabela acumulativa pra cada teste rodado:

| Data | Hipótese | Variável | Variante A | Variante B | Resultado | Conclusão | Próxima ação |
|------|----------|----------|------------|------------|-----------|-----------|--------------|
| | | | | | | | |

Importante registrar até dos testes que "deram errado" — aprendizado vem de saber o que NÃO funciona.

**PASSO 7 — BACKLOG DE VARIAÇÕES (REAPROVEITANDO MATERIAL)**

A partir dos criativos que já tem, gere 10-15 variações possíveis SEM produzir do zero:

### Mudanças baratas (1h cada):
1. Trocar hook (primeiros 3s)
2. Trocar trilha sonora
3. Trocar legenda/texto na tela
4. Trocar CTA final
5. Trocar miniatura/thumbnail
6. Cortar versão curta (15s do vídeo de 60s)
7. Inverter ordem das cenas
8. Adicionar frame de "antes/depois" no início
9. Adicionar countdown/urgência no fim
10. Trocar primeira frame (visual de abertura)

Cada variação é 1 hipótese testável. R$0 de produção.

### Mudanças médias (2-4h):
- Regravar VO com voz diferente
- Substituir 30-50% do B-roll
- Re-edição com pacing diferente

### Mudanças caras (>1 dia):
- Produzir do zero
- Contratar criador novo
- Filmar com modelo/ator diferente

Comece sempre pelas baratas. 80% das descobertas saem daí.

**PASSO 8 — KPIs DO LABORATÓRIO**

Métricas pra avaliar se o laboratório em si está funcionando:

- Hit rate: % de testes que geram criativo escalável (ideal 15-25%)
- Velocidade: testes concluídos por mês
- Custo médio por teste
- Tempo médio até decisão (kill ou escalar)
- Lifetime do criativo vencedor médio (% que dura > 30 dias)
- Aprendizados documentados / mês

**PASSO 9 — INTEGRAÇÃO COM CAMPANHA PRINCIPAL**

Quando criativo vencedor sai do laboratório:

### Migração:
1. Pausar versão de teste no LAB
2. Subir versão idêntica em campanha principal de escala
3. Monitorar se performance se mantém (1-2 semanas)
4. Se sim → integrar definitivamente no rotation
5. Se cair → investigar (público diferente? saturação?)

### Rotação:
- Manter no mínimo 3-5 criativos ativos em campanha principal
- Substituir 1 criativo a cada 2-4 semanas
- Sempre ter 1-2 criativos "novos do laboratório" no mix

**PASSO 10 — ANTI-PADRÕES A EVITAR**

Erros comuns que invalidam o método:

1. Subir 5 criativos diferentes em 5 variáveis diferentes → não isola nada
2. Matar criativo em 12h sem volume estatístico → decisão por viés, não dado
3. Promover criativo sustentado por 1 dia atípico (sazonalidade, evento)
4. Testar hook sem ter conferido que ângulo + formato + oferta estão estáveis
5. Não documentar testes "negativos" → repete erros
6. Mudar critério de kill no meio do teste pra "salvar" criativo
7. Comparar criativos rodando em públicos diferentes
8. Testar com budget tão baixo que volume nunca é estatístico
```

## Os volumes mínimos pra decisão

Sem volume, é palpite, não teste:

| Decisão | Mínimo necessário | Por quê |
|---------|-------------------|---------|
| Avaliar CTR / Hook rate | 3.000 impressões por variação | Confiança estatística |
| Avaliar CPA | 5-10 conversões | Lei dos grandes números |
| Decisão de escalar | 5-7 dias acima do threshold | Evita decisão por dia atípico |
| Decisão de kill por CPA | 3x o CPA-alvo gasto sem conversão | Evita matar criativo lento |

Trabalhe com janelas de 5-7 dias e budget calibrado pra atingir esses volumes.

## Hierarquia de hipóteses fortes

Hipóteses não nascem iguais. As mais fortes:

**1. Hipóteses baseadas em dado interno** ("vídeos com close de pessoa têm 40% mais hook rate na nossa conta")

**2. Hipóteses baseadas em pattern de top performers** ("90% dos vídeos top no nicho começam sem mostrar logo")

**3. Hipóteses baseadas em comportamento do público** ("público de 35-45 reage mais a depoimento; público de 18-25 reage mais a antes-depois")

**4. Hipóteses baseadas em gut feel do gestor** (último recurso — testar, mas com baixa prioridade)

## Os 5 hooks que mais aparecem em winners (Brasil + nicho geral)

Como ponto de partida pra hipóteses iniciais:
1. **Pergunta direta ao público** ("você sabia que...")
2. **Antes-depois visível** (problema mostrado em 1s)
3. **Pessoa em close olhando pra câmera** (UGC vibe)
4. **Movimento + objeto/produto em ação** (alta retenção)
5. **Texto provocativo na tela + voz off** (parar o scroll)

Não significa que sempre vence. Significa que é base sólida pra primeira rodada.

## Erros que matam o laboratório

- Misturar testes com escala (campanha de escala muda regras o tempo todo)
- Não ter budget separado (cliente entra em pânico vendo "custo do teste")
- Testar com público pequeno (algoritmo não consegue otimizar)
- Trocar hipótese no meio do teste
- Esperar resultado perfeito antes de escalar (perfeito é inimigo do bom)

## Sinais de laboratório saudável

- Hit rate de 20%+ (1 em 5 testes vira escalável)
- Aprendizado documentado em planilha que cresce mensalmente
- Equipe sabe responder "qual hook funciona pro nosso produto?"
- Rotação de criativos saudável em campanha principal (sem fadiga)
- Custo de produção POR criativo vencedor cai com o tempo (porque você sabe o que pedir)

---
**Camada adicional — biblioteca de hooks vencedores:** Mantenha biblioteca interna (Notion ou pasta do Drive) com TODOS os criativos que já venceram, organizados por: variável testada, métrica vencedora, público, época. Em 6 meses isso vira ativo competitivo. Quando precisar de novo criativo, primeiro consulte a biblioteca — geralmente uma variação de algo que já venceu performa melhor que invenção do zero.
