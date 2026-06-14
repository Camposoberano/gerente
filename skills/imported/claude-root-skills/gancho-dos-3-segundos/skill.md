---
name: gancho-dos-3-segundos
description: Escreve hooks (ganchos de abertura) para vídeos verticais curtos — Reels, TikTok, YouTube Shorts e Stories — usando arquitetura psicológica de retenção dos primeiros 3 segundos. Vai além da criação: também diagnostica hooks existentes que estão com retenção baixa. Acione sempre que o usuário mencionar Reels, TikTok, Shorts, vídeo curto, vídeo vertical, "abertura do vídeo", "gancho", "retenção tá baixa", "as pessoas tão pulando", "os primeiros segundos", ou qualquer variação de criação/diagnóstico de vídeos shortform — mesmo que não use a palavra "hook".
---

# Gancho dos 3 Segundos

A retenção nos primeiros 3 segundos decide 80% da performance de um vídeo vertical. Essa skill foca nesse recorte crítico — hooks verbais + hooks visuais + pattern interrupts — e também serve como bisturi pra dissecar hooks que estão falhando.

## Dois modos de uso

**Modo Criação**: você tem um tema e quer ganchos de abertura prontos.
**Modo Diagnóstico**: você já gravou o vídeo, a retenção no analytics tá quebrada, e quer entender por quê.

Declare o modo antes de rodar o prompt.

## A anatomia de um hook que segura

Um hook forte opera em 3 camadas simultâneas:

| Camada | O que é | Exemplo |
|--------|---------|---------|
| Verbal | O que é dito nos primeiros 2 segundos | "90% das pessoas fazem isso errado" |
| Visual | O que aparece na tela (com ou sem texto) | Pessoa apontando pra tela + texto gigante |
| Pattern interrupt | A quebra que impede o scroll reflexo | Corte seco, zoom abrupto, som inesperado |

Se você só trabalha a camada verbal, tá deixando metade da retenção na mesa.

## O Prompt — Modo Criação

```
Você é um analista de retenção de vídeos shortform. Já estudou mais de mil vídeos com retenção acima de 70% nos primeiros 5 segundos — e sabe que hook bom não é sobre "ser criativo", é sobre disparar um de 4 gatilhos psicológicos específicos antes do dedo completar o scroll.

**CONTEXTO:**
- Nicho: [área]
- Tema específico do vídeo: [sobre o que é]
- Formato do vídeo: [falando pra câmera / texto na tela + voiceover / storytime / tutorial visual / trend com áudio popular]
- Plataforma principal: [Reels / TikTok / Shorts / Stories / múltiplas]
- Duração total planejada: [15s / 30s / 45s / 60s+]
- Público que você quer capturar: [inclua o estado mental dele — cansado no fim do dia? em pausa do trabalho? procurando distração?]
- Tom do canal: [uma linha]

**ENTREGA — 12 hooks, 3 por gatilho:**

**Gatilho 1 — Violação de Expectativa**
Frases que começam contradizendo o que o público espera ouvir no nicho.

**Gatilho 2 — Específico-Surpreendente**
Números, prazos ou dados que não parecem "inventados pra post".

**Gatilho 3 — Acusação Calibrada**
Frases que fazem o espectador se perguntar "é sobre mim?" sem parecer ataque.

**Gatilho 4 — Cena em Progresso**
Abrir no meio de uma ação — o cérebro precisa do contexto, então fica.

**Para cada hook, devolva:**
- Áudio (o que é dito — máximo 10 palavras)
- Texto na tela (máximo 7 palavras, diferente do áudio)
- Visual dos 3 primeiros segundos (o que a câmera mostra)
- Pattern interrupt embutido (corte, zoom, gesto, som)
- Tempo estimado pra falar: [X segundos]
- Risco: em que público esse hook pode dar ruim

**BÔNUS:**
- 2 transições pro segundo 3 pro segundo 10 (onde as pessoas pulam) — pra manter quem aguentou o hook
- 1 hook "curinga" que eu poderia usar pra qualquer vídeo desse nicho
```

## O Prompt — Modo Diagnóstico

```
Você é um analista de retenção. Vou te dar um hook que não performou. Sua missão é dissecar POR QUE não funcionou e propor correção cirúrgica — sem reescrever o vídeo todo.

**VÍDEO:**
- Hook original (primeiros 3 segundos): [transcreva o áudio + descreva o visual]
- Nicho: [área]
- Métrica que quebrou: [retenção aos 3s / aos 10s / likes baixos / pouca visualização]
- Dado concreto se tiver: [retenção %, comparado com a média do canal]

**DIAGNÓSTICO:**

1. Identifique qual(is) de 5 falhas comuns esse hook comete:
   - Enrolação (começa explicando contexto antes de prender)
   - Genérico (poderia estar em qualquer vídeo do nicho)
   - Prometer sem entregar (hook promete algo que o corpo não cumpre)
   - Dissonância visual/verbal (tela e fala não se reforçam)
   - Baixa fricção cognitiva (não dá trabalho nenhum pro cérebro, passa batido)

2. Proponha 3 correções — uma mínima (só a frase), uma média (frase + visual), uma radical (reestrutura os 5 primeiros segundos).

3. Aponte 1 coisa que o hook original acerta e deve ser preservada.
```

## Bancos úteis

**Aberturas que quase sempre funcionam em PT-BR:**
- "Ninguém vai te contar isso, então..."
- "Se você [ação comum], para tudo."
- "Eu errei por [X tempo] e não sabia."
- "Tem um detalhe em [assunto] que muda tudo."
- "[Número] de cada 10 pessoas fazem [ação] e não deviam."

Use como ponto de partida, não como produto final. Saturação mata.

**Aberturas queimadas (evite em 2026):**
- "Vem comigo que eu vou te contar..."
- "Plot twist: ..."
- "POV: você..."
- "Spoiler: ..."
- "Acaba que..."

Elas funcionaram. Não funcionam mais porque viraram sinal de "conteúdo de criador, ignore".

## Sinais de que o hook tá bom

- Quem não conhece seu nicho ainda entende o hook
- Tem no máximo uma informação nova por segundo
- O texto na tela NÃO é transcrição do áudio (redundância mata retenção)
- Existe um elemento visual que sozinho faz alguém parar o scroll (mesmo sem som)

## Erro clássico

Achar que hook = frase de impacto. Hook = **combinação de áudio + visual + interrupção que reduz a probabilidade de scroll para menos de 50% nos primeiros 3 segundos.** Se você só pensa na frase, tá trabalhando com um terço da ferramenta.

---
**Para publicações em lote:** Gere hooks em blocos de 4 no mesmo prompt e grave todos no mesmo dia — a consistência de energia facial e iluminação ajuda o algoritmo a reconhecer o canal como "estável".
