---
name: laboratorio-de-testes-a-b-de-headlines
description: Pega uma headline existente e gera variações metodologicamente estruturadas para teste A/B, com hipótese clara por variação, plano de experimento e critérios de significância estatística. Não é "gerar 10 variações aleatórias" — é desenho experimental. Use sempre que mencionar: teste A/B, split test, otimizar headline, "testar variações", "vou fazer A/B", headline atual performando mal, "qual variação testo", ou quando alguém quiser melhorar CTR/abertura/conversão de algo que já tá no ar — mesmo sem usar "A/B".
---

# Laboratório de Testes A/B de Headlines

Teste A/B mal feito gera falsos vencedores. Você escolhe a variação "ganhadora" baseado em uma amostra pequena, sobe em escala, e os resultados somem. Isso acontece porque:

1. Você gerou variações cosméticas (mudou palavras, não arquitetura)
2. Você não formulou hipótese antes de testar
3. Você parou o teste cedo demais

Essa skill trata teste A/B como **experimento científico**, não como "ver qual frase gera mais cliques no olhômetro".

## O fluxo completo

```
Headline atual → análise estrutural → 12 variações com hipóteses distintas → 
plano de teste (o que testar primeiro + tamanho de amostra) → 
critérios de parada → decisão de escalada
```

## As 4 dimensões de variação (não confunda com "variações de texto")

Uma variação de headline precisa mudar UMA dimensão por vez pra você saber o que causou a diferença:

| Dimensão | O que muda | Exemplo do mesmo conceito |
|----------|-----------|---------------------------|
| Ângulo | Perspectiva da mesma mensagem | "Economize tempo" vs "Pare de perder tempo" vs "Faça em 5 min o que antes levava 2 horas" |
| Estrutura | Forma sintática | Declaração vs Pergunta vs Comando vs Lista vs Comparação |
| Tom | Energia emocional | Urgente vs Profissional vs Íntimo vs Provocativo |
| Especificidade | Grau de concretude | Genérico vs com número vs com prazo vs com nicho nomeado |

Se você varia 2 dimensões ao mesmo tempo entre controle e variante, o teste não diz nada — você ganhou, mas não sabe por quê. E não consegue replicar.

## O Prompt

```
Você é um cientista de otimização de conversão. Sua especialidade é desenho experimental de testes A/B de copy. Você opera sob o princípio de que teste sem hipótese é adivinhação — e adivinhação não escala.

**CONTEXTO:**
- Headline atual: "[cole aqui]"
- Onde ela está rodando: [LP / anúncio pago / assunto de email / post de feed / outro]
- Performance atual: [número concreto se tiver — CTR de 1.8%, abertura de 22%, conversão de 2.1% — ou "não sei" se não tiver]
- Benchmark do nicho: [se souber — ex: "CTR médio de ad do meu nicho é 3%"]
- Público: [quem vê a headline]
- Objetivo: [que métrica quero mover — clique / conversão / lead / venda]
- Volume de tráfego disponível pro teste: [alto (10k+/dia) / médio (1k-10k/dia) / baixo (<1k/dia)]
- Budget do teste: [tempo máximo que posso deixar rodando]

**PASSO 1 — DIAGNÓSTICO ESTRUTURAL DA HEADLINE ATUAL**

Identifique:
- Qual ângulo ela usa (benefício / dor / mecanismo / autoridade / outro)
- Qual estrutura (declaração / pergunta / comando / lista / outra)
- Qual tom dominante
- Qual nível de especificidade (1 a 5)
- Qual gatilho mental principal
- Qual é a fraqueza estrutural mais provável (o que tá sabotando)

**PASSO 2 — GERAÇÃO DE 12 VARIAÇÕES**

Para cada uma das 4 dimensões, gere 3 variações que mudam APENAS aquela dimensão (as outras 3 ficam constantes em relação ao controle):

**Dimensão A — Ângulo (3 variações)**
Cada uma com ângulo diferente do original.

**Dimensão B — Estrutura (3 variações)**
Mesmo ângulo do original, estruturas sintáticas diferentes.

**Dimensão C — Tom (3 variações)**
Mesmo conteúdo, energias emocionais diferentes.

**Dimensão D — Especificidade (3 variações)**
Mais/menos números, prazos ou concretude — mantém ângulo e tom.

**PARA CADA VARIAÇÃO:**
- A nova headline
- O que mudou em relação ao controle (só isso, nada além)
- HIPÓTESE: "Acredito que essa variação vai performar melhor/pior porque [razão específica baseada em comportamento do público]"
- RISCO: "Se essa variação ganhar por efeito colateral — que outro fator pode explicar que não seja minha hipótese"
- Priorização: [alta / média / baixa] — baseado em potencial de impacto e baixo custo de teste

**PASSO 3 — PLANO DE EXPERIMENTO**

- Qual variação testar PRIMEIRO contra o controle (e por quê — em 1 frase)
- Tamanho mínimo de amostra por variação pra significância (cálculo baseado em taxa de conversão atual e lift mínimo detectável de 20%)
- Tempo mínimo pra rodar (mínimo 7 dias pra cobrir ciclo semanal, pode ser mais dependendo do volume)
- Threshold de significância estatística: 95% de confiança
- Critério de parada antecipada: se uma variação performar X% melhor com p-value < 0.05 antes do tempo estipulado, pode parar
- Critério de descarte: se após Y impressões nenhuma das duas performar significativamente diferente, teste inconclusivo — não declarar vencedor

**PASSO 4 — O QUE FAZER DEPOIS**

Três cenários e resposta pra cada:

- Se a variação vence: o que testar em seguida (a próxima dimensão na ordem de priorização)
- Se o controle vence: o que isso significa sobre o público (e que hipótese eu deveria queimar da lista)
- Se empatar: próxima variação da mesma dimensão, não pular de dimensão

**REGRA DE OURO:**
Nunca teste 3 variações ao mesmo tempo. Amostra dilui, poder estatístico desaba, conclusão vira vibe. Teste sempre 1x1. Se você tem pressa, aumente tráfego, não o número de variantes.
```

## Regras que separam experimento de chute

**1. Uma mudança por vez.** Se você mudou ângulo E tom na mesma variação, o resultado não ensina nada transferível.

**2. Hipótese escrita antes do teste.** Se você formula a hipótese depois de ver o resultado, vai achar "razão" pra qualquer resultado e não aprende.

**3. Significância estatística, não achismo.** Ferramentas como Convert, VWO e Optimizely calculam p-value. Em ads nativos, você pode usar calculadoras online. Abaixo de 95% de confiança, não é vencedor — é ruído.

**4. Cuidado com novelty effect.** Uma variação "nova" pode performar melhor só por ser nova pra quem já viu o controle. Teste idealmente em público NOVO.

**5. Não teste no mesmo dia de lançamento.** Lançamentos distorcem dados. Espere o pico passar.

## Erros que arruínam testes

- Encerrar teste no dia 3 porque "a variação B tá ganhando claramente" (pode ser ruído)
- Testar headline em duas LPs visualmente diferentes (confunde variáveis)
- Comparar headline antiga com nova em períodos diferentes do ano (sazonalidade)
- Não registrar a versão vencedora com hipótese confirmada — você perde o aprendizado composto

## Métricas secundárias que importam

Só olhar CTR ou conversão é incompleto. Uma variação pode:

- Ter CTR mais alto mas conversão mais baixa (atraiu o público errado)
- Ter CTR mais baixo mas ticket médio maior (atraiu público mais qualificado)
- Ter CTR igual mas retenção diferente no funil

Sempre monitore **a métrica 2 passos depois** do ponto de teste.

---
**Jogada composta:** Depois de 3 rodadas de teste (12 comparações 1x1), compile as hipóteses confirmadas num documento. Isso vira seu "manual do copy pra esse público". A partir daí, próximas headlines já nascem afinadas — e você testa menos, converte mais.
