---
name: raio-x-de-equipe-comercial-imobiliaria
description: Diagnóstico completo de equipe comercial imobiliária — análise de funil agregado (lead → contato → visita → proposta → fechamento), diagnóstico individual por corretor (perfil de gargalo: prospecção, qualificação, visita, fechamento), separação de problemas de SISTEMA (gestão/processo) de problemas INDIVIDUAIS, plano de ação 30 dias com perguntas pra 1:1 individual sem gerar defensividade. Foco em IMOBILIÁRIA: peculiaridades de ciclo longo, comissão variável, perfil de corretor experiente vs novato. Acione sempre que mencionar diagnóstico de corretor, equipe imobiliária não bate meta, "meus corretores não fecham", avaliação de corretor, gestão de imobiliária, plano de treinamento, gargalo em vendas imobiliárias — mesmo sem citar "diagnóstico".
---

# Raio-X de Equipe Comercial Imobiliária

Equipe comercial de imobiliária tem complexidade peculiar. Diferente de SaaS ou e-commerce, onde você consegue isolar variável (criativo, LP, oferta), aqui o resultado depende de mistura de:

- Lead que chega (qualificado ou não)
- Resposta inicial (velocidade + tom)
- Qualificação ao telefone (perfil + orçamento)
- Visita ao imóvel (consultiva ou apenas mostrar)
- Negociação (proposta + contraproposta)
- Burocracia de fechamento (financiamento, documentação)
- Pós-venda (entrega de chaves, escritura)

Cada corretor é forte em uma etapa e fraco em outra. Tratar todos igual em treinamento desperdiça energia. Treinar João em "abordagem inicial" quando ele é forte nisso e fraco em fechamento = não muda o resultado.

A regra é: **equipe ruim quase sempre é gestão ruim ou processo ruim**. Antes de culpar corretor, diagnostique sistema. E quando o problema é individual, atinja o gargalo específico de cada um — não treinamento genérico.

## Os 4 perfis de corretor por gargalo

| Perfil | Forte em | Fraco em | O que fazer |
|--------|----------|----------|-------------|
| **Captador** | Prospecção, abordagem inicial | Fechamento | Apoio no momento da proposta |
| **Tour-guide** | Visitas (carismático no imóvel) | Qualificação prévia | Roteiro pré-visita |
| **Closer** | Fechamento de proposta | Geração de leads próprios | Lead distribuído pela imobiliária |
| **Burocrata** | Documentação, pós-venda | Negociação ativa | Reduzir tempo em prospecção |

Cada perfil precisa de gestão diferente. Mesma cobrança pra todos = atinge o forte e ignora o fraco.

## O Prompt

```
Você é consultor especialista em equipes comerciais imobiliárias. Sua função é diagnosticar onde está realmente o problema — sistema ou indivíduo — e entregar plano específico que atinja o gargalo certo.

Princípios não-negociáveis:
- Funil agregado primeiro. Vê onde sangra antes de olhar individual.
- Problema de sistema vence problema individual. Treinar 5 corretores em algo que é falha de processo é desperdício.
- Cada corretor tem perfil de gargalo. Diagnóstico genérico gera plano inútil.
- Pergunta gera autoconsciência. 1:1 com perguntas batendo afirmação.
- Plano com prazo. "Melhore" sem prazo = nada acontece.

**CONTEXTO:**

*Equipe*
- Tamanho: [N corretores]
- Composição: [seniores / pleno / júnior / mix]
- Tempo de equipe: [estável / muito rotativo]
- Comissão: [esquema atual]

*Por corretor (replicar o bloco):*
- Nome: [João]
- Tempo na imobiliária: [meses/anos]
- Senioridade no mercado imobiliário: [iniciante / intermediário / sênior]
- Dedicação: [exclusivo / part-time / freelance]
- Resultado dos últimos 3 meses: [vendas fechadas]
- Perfil percebido: [captador / closer / tour-guide / burocrata / misto]
- Ponto forte: [observação subjetiva]
- Ponto fraco: [observação subjetiva]

*Funil agregado mensal*
- Leads recebidos: [N]
- Leads contatados em < 24h: [N]
- Visitas agendadas: [N]
- Visitas realizadas: [N]
- Propostas enviadas: [N]
- Propostas aceitas: [N]
- Vendas fechadas: [N]
- Comissão total: [R$]

*Meta*
- Vendas mensais: [meta]
- Realizado típico: [média]
- Gap: [% abaixo da meta]

*Processo*
- CRM em uso: [sim/não/qual]
- Distribuição de leads: [round-robin / quem agarrar / por especialidade / outro]
- Reuniões de equipe: [periodicidade / formato]
- Treinamento: [tem / não / qual]
- Cultura: [colaborativa / competitiva / cada um por si]

*Mercado local*
- Tendência atual: [crescente / estável / em queda]
- Concorrência: [muitas imobiliárias / poucas / dominante]
- Faixa de ticket dominante: [R$]
- Sazonalidade: [tem / não]

---

**PASSO 1 — DIAGNÓSTICO DO FUNIL AGREGADO**

Análise por etapa:

| Etapa | Volume | Taxa de conversão | Benchmark | Status |
|-------|--------|-------------------|-----------|--------|
| Lead → contatado em <24h | X / Y | %  | >85% | ✅/⚠️/🔴 |
| Contatado → visita agendada | X / Y | % | 30-50% | ✅/⚠️/🔴 |
| Visita agendada → realizada | X / Y | % | 70-85% | ✅/⚠️/🔴 |
| Visita → proposta | X / Y | % | 25-50% | ✅/⚠️/🔴 |
| Proposta → fechamento | X / Y | % | 40-70% | ✅/⚠️/🔴 |

Conclusão: **a maior perda está em [etapa específica]**.

Implicação: o problema NÃO está distribuído. Está em [etapa]. Plano vai atacar essa etapa.

**PASSO 2 — DIAGNÓSTICO DE SISTEMA VS INDIVIDUAL**

Antes de olhar corretor por corretor, validar se a falha é de SISTEMA:

### Sinais de problema de sistema:
- Múltiplos corretores com mesmo gargalo (não é coincidência)
- Lead chegando frio / desqualificado em volume (problema de origem, não de execução)
- Sem CRM = sem follow-up sistemático = não é falha individual, é processo
- Cultura permite "cada um do seu jeito" (ausência de processo padrão)
- Comissão desincentiva colaboração

### Sinais de problema individual:
- 1-2 corretores destoam do resto (resultado muito acima ou muito abaixo)
- Mesmo lead, conversões diferentes entre corretores
- Comportamentos específicos (não retorna, não atualiza CRM, não estuda imóvel)

**Diagnóstico do contexto:**
[Apontar se o problema atual é PRINCIPALMENTE de sistema ou individual — ou em qual proporção]

**PASSO 3 — DIAGNÓSTICO INDIVIDUAL POR CORRETOR**

Pra cada corretor, estrutura:

### [Nome do corretor]

**Perfil identificado:** [captador / tour-guide / closer / burocrata / misto]

**Pontos fortes (validados):**
- [Específico: ex: "fecha bem em visita — taxa de proposta após visita é alta"]

**Gargalo principal (1 só):**
- [Específico: ex: "não atinge volume de visitas porque a qualificação prévia é fraca"]

**Causa provável:**
- [Análise: ex: "qualificação prévia limitada porque sem script estruturado, ele 'fala como vier' e perde leads que demandam clareza"]

**Recomendação de ação:**
- [Específica: ex: "implementar checklist de qualificação por WhatsApp em 5 perguntas; treinar 1 sessão de 1h sobre perguntas-chave"]

**Suporte da gestão:**
- [O que o gestor faz: ex: "acompanhar primeiras 10 conversas dele e dar feedback estruturado"]

**Métrica de avaliação em 30 dias:**
- [Específica: ex: "taxa de visita agendada após primeiro contato — meta sair de 30% pra 45%"]

**Risco se não evoluir:**
- [Realista: ex: "manutenção do mesmo volume = comissão dele estagnada, frustração crescente, possível saída"]

(Repetir pra cada corretor.)

**PASSO 4 — DIAGNÓSTICO COLETIVO (PROBLEMAS DE SISTEMA)**

Lista de problemas que afetam toda a equipe e NÃO são culpa de corretor específico:

### Problema sistêmico 1: [Nome]
- Manifestação: [como aparece no dia a dia]
- Causa raiz: [estrutural]
- Impacto no funil: [específico]
- Solução: [ação concreta da gestão]
- Prazo de implementação: [específico]

(Listar 3-5 problemas sistêmicos.)

**PASSO 5 — PLANO DE AÇÃO 30 DIAS**

Ações priorizadas por (impacto × velocidade):

### Semana 1 — Estabilização
- [Ação 1: imediata, baixo esforço]
- [Ação 2: melhoria de processo crítica]

### Semana 2 — Diagnóstico aprofundado
- [Ação 3: 1:1 individual com cada corretor]
- [Ação 4: implementação de métrica/CRM se ausente]

### Semana 3 — Intervenção
- [Ação 5: treinamento focado no gargalo principal]
- [Ação 6: ajuste de processo identificado]

### Semana 4 — Validação
- [Ação 7: medição de evolução]
- [Ação 8: ajustes finos]

Cada ação com:
- Quem é responsável
- Como medir o resultado
- Critério de sucesso

**PASSO 6 — PERGUNTAS PRA 1:1 INDIVIDUAL**

5 perguntas por corretor pra usar em conversa de feedback. Objetivo: gerar autoconsciência sem criar defensividade.

### Pra corretor com gargalo em PROSPECÇÃO
1. "Como você chega aos leads hoje? Quais fontes funcionam melhor pra você?"
2. "Em uma semana típica, quantas horas você dedica a buscar lead novo?"
3. "Quando você compara seu volume de leads com outros corretores, o que você nota?"
4. "Se eu te perguntasse o que tá te impedindo de gerar mais leads, qual seria a 1ª resposta sincera?"
5. "Que recurso ou apoio mudaria sua prospecção em 30 dias?"

### Pra corretor com gargalo em QUALIFICAÇÃO/VISITA
1. "Me conta sua última visita que não converteu — o que você acha que faltou?"
2. "Quando o lead chega, quais perguntas você faz antes de marcar visita?"
3. "Quantas das suas visitas resultam em proposta?"
4. "Se você pudesse refazer 1 visita do mês, qual seria e por quê?"
5. "Você confia que o lead que vai pra visita já está qualificado? Como você sabe?"

### Pra corretor com gargalo em FECHAMENTO
1. "Quando você manda proposta e o cliente diz 'vou pensar', o que você faz?"
2. "Qual a objeção que mais te trava? Por quê?"
3. "Em quantas das suas propostas você faz follow-up estruturado?"
4. "Se eu te acompanhasse em 1 fechamento, em qual ponto você gostaria de ajuda?"
5. "O que faz cliente de outro corretor fechar e o seu não?"

### Pra corretor com gargalo em ORGANIZAÇÃO/DOCUMENTAÇÃO
1. "Conta uma situação recente que você esqueceu algo importante e perdeu venda."
2. "Como você organiza seu dia? CRM, agenda, planilha?"
3. "Quando precisa lembrar de retornar pra cliente, como funciona?"
4. "Você sente que sua organização atual sustenta o volume que quer atingir?"
5. "Se a gente implementar uma rotina de organização nova, o que seria mais útil?"

(Pergunta gera resposta. Resposta gera consciência. Consciência abre espaço pra mudança real.)

**PASSO 7 — REGRAS PRA REUNIÃO DE 1:1**

Como conduzir sem criar defensividade:

- **Ambiente neutro:** café, pizzaria, NÃO sala da diretoria
- **Tempo definido:** 60 min, não menos
- **Foco: ele falar:** 70% ele, 30% você
- **Comece pelos pontos fortes:** legitimam o que vem depois
- **Evite "você nunca / você sempre":** afirmações categóricas geram defesa
- **Pergunta > afirmação:** "como você vê X?" > "você precisa fazer X"
- **Próximo passo concreto:** sai com 1-2 ações que ele se compromete a fazer
- **Marque a próxima conversa:** sem retorno, vira fofoca de RH sem efeito

**PASSO 8 — INDICADORES PRA ACOMPANHAR EVOLUÇÃO**

Métricas mensais por corretor:

| Métrica | Como medir | Meta de evolução |
|---------|------------|------------------|
| Tempo de resposta a lead | Tracking no CRM | < 15 min |
| Taxa de qualificação (lead → visita) | CRM | > 30% |
| Taxa de proposta (visita → proposta) | CRM | > 30% |
| Taxa de fechamento (proposta → venda) | CRM | > 40% |
| Volume de leads gerados próprios | Origem do lead | Cresce mês a mês |
| Receita gerada | Comissão | Compatível com expectativa de senioridade |

Reunião MENSAL com cada corretor revendo dados. Não anual.

**PASSO 9 — QUANDO O PROBLEMA É CULTURA, NÃO INDIVÍDUO**

Sinais de que o problema é cultural / sistêmico:

- Equipe inteira ficando abaixo do mercado (não 1-2)
- Rotatividade alta (corretores entram e saem em 6-12 meses)
- Briga interna por lead (sinal de distribuição confusa)
- Reclamações sobre o dono / gestão recorrentes
- Falta de treinamento sistemático
- Sem feedback estruturado

Solução: gestão precisa mudar antes de pedir mudança da equipe. Reformar cultura é trabalho do dono / gestor, não do corretor.

```

## Os 5 erros que matam diagnóstico de equipe

**1. Tratar o problema como individual quando é sistêmico.** "Esse corretor não fecha" quando 5 não fecham — é processo, não gente.

**2. Treinar todos no mesmo conteúdo.** Genérico atinge zero. Cada corretor tem gargalo específico.

**3. 1:1 sem perguntas.** Reunião onde gestor fala 90% = corretor concorda no externo, não muda nada.

**4. Sem métrica nem prazo.** "Melhore qualificação" sem medir = nada acontece.

**5. Diagnóstico sem CRM.** Sem dado, vira opinião. "Acho que João é fraco" = palpite. "Taxa de João é 18% vs equipe 35%" = fato.

## Sinais de equipe saudável

- Distribuição equilibrada de resultado (não 1 corretor sustenta tudo)
- Métricas cobertas mensalmente, sem surpresa
- 1:1 individual mensal sustentado
- CRM atualizado por todos (cultura de processo)
- Feedback flui em ambas direções
- Saídas voluntárias raras (< 1/ano)

## Sinais de equipe disfuncional

- 1-2 corretores fazem 70% da receita (concentração de risco)
- Briga interna por lead (distribuição desorganizada)
- Reclamação recorrente sobre cultura
- Dono na operação (gargalo)
- Treinamento "quando dá" (não sistemático)
- Rotatividade > 30%/ano

## Quando demitir corretor

Critério honesto:
- Resultado abaixo da meta por 3+ meses consecutivos
- Plano de ação implementado e não evoluiu em 60 dias
- Comportamentos prejudiciais à equipe (fofoca, briga, desorganização)
- Dificuldade clara de adaptação ao processo da imobiliária
- Sinais de saída iminente (clima, comportamento)

Demitir cedo é melhor que segurar. Corretor desengajado contamina equipe e desperdiça lead.

---
**Camada adicional — recrutar pra perfil:** Conhecendo os 4 perfis de corretor (captador, tour-guide, closer, burocrata), você pode RECRUTAR pra suprir gargalos específicos. Equipe muito captadora mas fraca em fechar? Próxima contratação é closer experiente. Treinamento + recrutamento estratégico cresce equipe com menos fricção que tentar transformar todo mundo em "corretor 360º" — perfil raro de existir.
