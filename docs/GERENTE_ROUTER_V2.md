# Gerente Router V2

## Objetivo

Transformar o `gerente` de um sistema que chama varios agentes em sequencia para um
orquestrador reutilizavel em qualquer projeto, ambiente ou VPS.

O sistema deve escolher, para cada tarefa:

- melhor agente principal
- melhor LLM ou provedor para a funcao
- nivel de contexto necessario
- skills/ferramentas permitidas
- fiscal/revisor adequado
- fallback quando o executor travar
- budget de tokens e criterio de parada

EvoHub e apenas o primeiro laboratorio. O mesmo processo deve funcionar em:

- repos locais
- sites estaticos
- apps web
- projetos em Portainer
- VPS limpa
- Supabase
- GitHub
- n8n
- ambientes com Docker/Traefik/Cloudflare

## Problema Atual

O fluxo atual escolhe uma lista de agentes e executa todos:

```text
tarefa
  -> roteador escolhe gerente e agentes_diretos
  -> gerente planeja
  -> cada agente roda seu loop
  -> resultados sao impressos
```

Isso funciona para prototipo, mas gasta tokens e cria ruido porque:

- chama agentes demais para tarefas simples
- nao diferencia tarefa de baixo, medio e alto risco
- nao escolhe modelo por capacidade real
- nao mede custo, latencia ou qualidade por funcao
- injeta memoria e playbooks antes de saber se sao necessarios
- nao existe fiscal obrigatorio por risco
- nao existe protocolo claro quando um agente trava
- MCPs estao cadastrados, mas nao sao selecionados como ferramentas operacionais reais

## Principio V2

Trocar rotacao por roteamento.

```text
1. Classificar a tarefa
2. Montar plano de execucao
3. Chamar um executor principal
4. Chamar fiscal/revisor somente quando necessario
5. Chamar ajudante/fallback se o executor travar
6. Salvar decisao, handoff e resultado em memoria
```

Regra central:

```text
Nao chamar tres LLMs por padrao.
Chamar uma LLM principal.
Chamar fiscal por risco.
Chamar fallback por falha, baixa confianca ou timeout.
```

## Modelo De Trabalho De Times Para Agentes

Times de software eficientes reduzem conflito com quatro mecanismos:

1. unidade pequena de trabalho
2. ownership claro
3. revisao independente
4. integracao continua com checks objetivos

Para agentes, isso vira uma regra operacional:

```text
nenhum agente trabalha em "um projeto inteiro"
cada agente recebe uma task pequena, com fronteira, dono, artefato esperado e criterio de pronto
```

### Conversao De Praticas Humanas Para Agentes

| Pratica em times de codigo | Adaptacao para agentes |
|---|---|
| backlog | fila de `agent_tasks` priorizada |
| issue/story | `task_brief` com objetivo, escopo e fora de escopo |
| branch curta | `workspace_lane` ou `change_lane` por agente/tarefa |
| pull request | `change_proposal` com diff, resumo e validacao |
| code review | fiscal/reviewer independente |
| CI/checks | quality gates automaticos |
| protected branch | nenhuma mudanca em producao sem aprovacao/checks |
| daily/status | heartbeat curto por task |
| retrospective | ajuste de scoring e regras apos falha/sucesso |

### Fluxo Padrao

```text
intake
  -> triage
  -> decomposition
  -> ownership
  -> execution lane
  -> review gate
  -> integration gate
  -> release/deploy
  -> retrospective/memory
```

### Intake

O gerente recebe o pedido bruto e transforma em um card:

```json
{
  "goal": "corrigir envio de audio no WhatsApp",
  "scope": ["bridge", "media"],
  "out_of_scope": ["redesign do painel"],
  "risk": "medium",
  "environment": "repo_local",
  "definition_of_done": [
    "causa raiz documentada",
    "patch aplicado",
    "teste ou verificacao objetiva executada"
  ]
}
```

### Decomposition

Quebrar tarefas grandes em unidades pequenas, inspiradas em CLs pequenos:

```text
1 tarefa = 1 mudanca conceitual
```

Exemplos:

- refactor separado de bugfix
- migration separada de UI
- configuracao separada de codigo
- teste junto da logica que ele valida
- deploy separado da implementacao

### Ownership

Cada task precisa de:

- `owner`: agente executor principal
- `reviewer`: fiscal independente
- `arbiter`: gerente/usuario quando houver conflito
- `files_allowed`: fronteira de arquivos ou area
- `tools_allowed`: ferramentas permitidas
- `budget`: limite de chamadas/tokens/tempo

Regra:

```text
um arquivo critico nao deve ser editado por dois agentes simultaneamente
```

Se duas tasks tocam o mesmo arquivo, o gerente deve:

- sequenciar
- criar uma abstracao comum primeiro
- ou dividir horizontal/verticalmente com contrato claro

### Execution Lane

Cada agente trabalha em uma lane isolada:

```json
{
  "lane_id": "task-123-backend",
  "agent": "codex_exec",
  "files_locked": ["bridge/server.ts", "bridge/shared/media.ts"],
  "expected_artifact": "patch + comandos de validacao",
  "status": "running"
}
```

Para repo Git, a lane pode ser:

- branch curta
- patch file
- worktree
- diff planejado antes da aplicacao

Para VPS/Portainer, a lane pode ser:

- plano de mudanca
- compose proposto
- comando dry-run
- janela de deploy

### Review Gate

O fiscal nao deve refazer a tarefa. Deve revisar:

- escopo foi respeitado
- diff e pequeno o suficiente
- testes/checks foram executados
- risco novo foi introduzido
- rollback existe
- segredos nao vazaram

Resultado esperado:

```json
{
  "approved": true,
  "blocking_findings": [],
  "nits": ["renomear variavel em ciclo futuro"],
  "required_checks": ["npm test"],
  "risk_after_review": "low"
}
```

### Integration Gate

Antes de integrar:

- nenhum conflito de arquivo
- checks minimos passaram
- fiscal aprovou se risco medio/alto
- task tem registro de decisao
- rollback ou fix-forward definido

### Retrospective

Depois da task:

```text
o que funcionou
onde o agente travou
qual modelo custou demais
qual fiscal pegou erro real
qual skill economizou tempo
qual regra deve ser ajustada
```

Isso atualiza a arena interna e a memoria do projeto.

## Gamificacao Dos Agentes

Gamificar nao deve premiar volume. Deve premiar resultado seguro, barato e
validado.

### Pontuacao Base

| Evento | Pontos |
|---|---:|
| task concluida com DoD completo | +10 |
| passou checks/testes na primeira | +8 |
| fiscal aprovou sem bloqueio | +6 |
| reduziu custo vs baseline | +5 |
| criou handoff claro | +4 |
| encontrou bug real como fiscal | +8 |
| evitou alteracao fora de escopo | +5 |
| salvou memoria reutilizavel | +3 |
| rollback/documentacao de deploy | +4 |

### Penalidades

| Evento | Penalidade |
|---|---:|
| editou fora do escopo | -10 |
| quebrou build/teste | -8 |
| vazou segredo ou sugeriu expor segredo | -20 |
| chamou modelo premium sem justificativa | -6 |
| consumiu budget sem progresso | -5 |
| ignorou erro de ferramenta | -5 |
| fiscal aprovou erro critico | -12 |

### Indicadores Por Agente

- `success_rate`
- `review_pass_rate`
- `bugs_found_as_reviewer`
- `bugs_introduced`
- `avg_cost_per_task`
- `avg_latency`
- `rollback_rate`
- `scope_discipline`
- `handoff_quality`

### Ranking Por Categoria

Nao existe um ranking unico. Rankings separados:

- melhor executor de codigo
- melhor fiscal
- melhor visual/UI
- melhor infra/Portainer
- melhor SQL/Supabase
- melhor documentacao
- melhor custo-beneficio

O gerente usa esses rankings para escolher o proximo executor.

### Recompensa Correta

O jogo deve favorecer:

```text
menos tokens
menos retrabalho
mais checks
mais seguranca
mais entrega real
```

Nao deve favorecer:

```text
respostas longas
muitos agentes chamados
uso de modelo caro
alteracoes grandes
velocidade sem validacao
```

## Contrato De Roteamento

O roteador deve produzir um `execution_plan` estruturado antes de qualquer execucao:

```json
{
  "task_id": "uuid-ou-local-id",
  "project": "evohub",
  "environment": "repo_local",
  "area": "backend",
  "risk": "medium",
  "complexity": "medium",
  "budget": {
    "max_total_tokens": 12000,
    "max_model_calls": 4,
    "max_tool_calls": 10
  },
  "primary": {
    "agent": "backend",
    "model": "codex_exec",
    "provider": "openai",
    "reason": "tarefa exige leitura/edicao de codigo e validacao local"
  },
  "reviewer": {
    "agent": "qa",
    "model": "claude_review",
    "provider": "anthropic",
    "required": true,
    "reason": "mudanca toca fluxo de producao"
  },
  "fallback": {
    "agent": "backend",
    "model": "grok_debug",
    "provider": "xai",
    "condition": "primary_failed_twice_or_low_confidence"
  },
  "context_policy": {
    "mode": "targeted",
    "max_files": 8,
    "include_memory": true,
    "include_full_files": false
  },
  "allowed_tools": ["listFiles", "searchFiles", "readFile", "runCommand"],
  "blocked_tools": ["writeFile"],
  "done_when": [
    "causa raiz identificada",
    "patch proposto ou aplicado",
    "validacao objetiva executada"
  ]
}
```

## Areas De Tarefa

Usar uma taxonomia menor e mais forte que os nomes dos agentes:

| Area | Exemplos | Executor preferencial |
|---|---|---|
| `code` | bug, refactor, repo, teste, CLI | Codex/OpenAI |
| `architecture` | plano, desenho tecnico, decisao dificil | Claude |
| `frontend_visual` | landing, UI, layout, imagem, UX | Gemini |
| `infra` | VPS, Portainer, Docker, Traefik, deploy | Codex + Infra |
| `data` | Supabase, SQL, RLS, analytics | Codex + QA |
| `automation` | n8n, webhooks, integrações | Backend + Codex |
| `security` | LGPD, segredos, auth, permissoes | Claude + Segurança |
| `content` | copy, SEO, docs, proposta | Claude/Gemini |
| `review` | PR, CI, code review, auditoria | QA + Codex/Claude |
| `ops` | release, rollback, monitoramento | Release Ops |

## Matriz Inicial De Modelos

Nome operacional confirmado: OpenRouter.

OpenRouter entra como gateway de modelos, nao como gerente. O gerente continua
sendo nosso roteador proprio: ele decide objetivo, risco, budget, agente, fiscal
e fallback. OpenRouter apenas executa a chamada no modelo escolhido ou em um
router controlado.

Tambem separar:

- Grok: familia de modelos da xAI.
- Groq: provedor/infra de inferencia rapida para modelos hospedados.

### Sinal Externo Inicial

Snapshot de referencia: Arena AI leaderboard consultado em 2026-06-14.
Usar como ponto de partida, nao como verdade absoluta. O placar muda e tarefas
reais do usuario devem recalibrar os scores.

| Categoria | Sinal da Arena | Implicacao para o gerente |
|---|---|---|
| Agent/geral | Claude aparece muito forte no topo | Claude deve ser gerente/fiscal/arquitetura de alto risco |
| Text geral | Claude no topo, Gemini e GPT fortes no top tier | usar Claude/GPT/Gemini conforme custo e contexto |
| WebDev geral | Claude lidera; GPT e Kimi aparecem fortes em image-to-web/code harness | nao assumir Gemini sempre para site; usar Gemini para visual/multimodal e fiscal visual |
| Vision | Claude, Gemini e GPT aparecem fortes | usar Gemini/Claude para leitura de print; Codex so se virar acao de codigo |
| Image-to-WebDev | Claude e GPT Codex-harness fortes; Gemini tambem competitivo | para tela/site: Gemini/Claude fazem leitura visual, Codex aplica codigo |
| Search | Claude/GPT/Gemini/Grok aparecem competitivos | Grok pode entrar como contraponto/pesquisa, nao executor padrao |
| Image/Video | GPT/Gemini/Grok aparecem em rankings visuais | separar geracao de asset da implementacao de UI |

### Modelos Logicos Do Sistema

| Modelo logico | Provider/familia | Melhor uso | Evitar |
|---|---|---|---|
| `codex_exec` | OpenAI/GPT-Codex | codigo, repo local, terminal, testes, refactor, CI | copy visual pura |
| `claude_arch` | Anthropic/Claude | arquitetura, gerente, revisao profunda, contexto longo, decisao dificil | tarefas triviais e repetitivas |
| `claude_review` | Anthropic/Claude | fiscal de alto risco, auditoria, tradeoffs | executar patch simples sem necessidade |
| `gemini_visual` | Google/Gemini | UI, imagem, print, layout, multimodal, revisao visual | backend critico sem fiscal tecnico |
| `grok_research` | xAI/Grok | contraponto, pesquisa, hipotese alternativa, debate de solucao | alterar codigo sem fiscal |
| `groq_fast` | Groq/provider | chamadas baratas/rapidas em modelos abertos, classificacao e resumo | decisao de alto risco sem revisar |
| `openrouter_gateway` | OpenRouter | acesso unificado, fallback, modelos por alias, comparacao custo/latencia | deixar escolher sozinho sem politica propria |
| `openrouter_fusion` | OpenRouter Fusion | deliberacao multi-modelo em tarefas ambiguas | usar sempre; pode gastar mais |
| `cheap_classifier` | modelo barato/rapido | classificar tarefa, resumir, gerar JSON | decidir alto risco sozinho |
| `local_rules` | sem LLM | tarefas triviais, roteamento conhecido | tarefas ambiguas |

### Aliases Recomendados

Quando usar OpenRouter, preferir aliases/familias onde fizer sentido:

| Alias logico | OpenRouter/modelo alvo | Uso |
|---|---|---|
| `latest_gpt` | `~openai/gpt-latest` | fallback OpenAI sempre recente |
| `latest_claude_sonnet` | `~anthropic/claude-sonnet-latest` | gerente/fiscal economico |
| `latest_claude_opus` | `~anthropic/claude-opus-latest` ou modelo Opus fixo | revisao alta criticidade |
| `latest_gemini` | familia Gemini Pro/Flash disponivel | visual/multimodal/classificador |
| `grok_current` | melhor Grok disponivel no catalogo | pesquisa/contraponto |
| `fusion_vote` | `openrouter/fusion` | arena pontual/decisao ambigua |

## Arena Interna De Modelos

Nao depender somente de benchmark publico. Criar uma arena propria, baseada nas
tarefas reais do usuario.

### O Que Medir

Por area e por ambiente:

- taxa de sucesso
- custo estimado
- latencia
- quantidade de chamadas
- retrabalho causado
- qualidade do diff
- aprovacao do fiscal
- falhas de ferramenta
- necessidade de fallback

### Score De Escolha

Exemplo:

```text
score = qualidade * 0.45
      + confianca * 0.20
      + velocidade * 0.15
      + economia * 0.15
      + estabilidade * 0.05
```

Para tarefas de producao, aumentar peso de confianca e estabilidade.
Para tarefas visuais, aumentar peso de qualidade visual.
Para tarefas simples, aumentar peso de economia.

## Politica De Custo-Beneficio

O roteador nao deve escolher o modelo mais barato nem o modelo mais poderoso por
padrao. Ele deve escolher o melhor modelo dentro da faixa de qualidade necessaria
para aquela funcao.

### Regra Base

```text
Escolher o modelo mais barato que esteja dentro da faixa aceitavel de qualidade
para a area, risco e ambiente da tarefa.
```

Em outras palavras:

- se dois modelos estao proximos em qualidade, usar o mais barato
- se um modelo premium e muito melhor, usar apenas quando o risco/impacto pagar o custo
- se a tarefa for simples, usar modelo barato mesmo que exista modelo superior
- se a tarefa for critica, subir a qualidade minima e exigir fiscal

### Custo Efetivo

Nao comparar apenas preco de entrada. Cada tarefa tem proporcao diferente de
entrada/saida.

```text
custo_efetivo =
  preco_input * tokens_input_estimados
+ preco_output * tokens_output_estimados
+ custo_extra_web_search
+ custo_extra_imagem_audio_video
```

Exemplos de perfil:

| Perfil | Input | Output | Impacto |
|---|---:|---:|---|
| leitura de repo | alto | medio | preco de input/cache pesa mais |
| criacao de codigo | medio | alto | preco de output pesa mais |
| revisao curta | medio | baixo | modelo premium pode ser aceitavel |
| copy/texto longo | medio | alto | evitar modelo caro se qualidade for proxima |
| leitura de imagem | medio | medio | multimodal e preco de imagem entram no calculo |

### Qualidade Minima Por Risco

| Risco | Regra |
|---|---|
| `low` | usar modelo economico acima do piso minimo |
| `medium` | usar melhor custo-beneficio dentro do top 25% da area |
| `high` | usar modelo top tier ou dupla executor + fiscal |
| `critical` | usar modelo forte + fiscal independente + aprovacao humana |

### Bandas De Qualidade

Usar Arena externa + arena interna.

```text
quality_band:
  elite: top 5 ou ate 3% abaixo do lider
  strong: ate 8% abaixo do lider
  efficient: ate 15% abaixo do lider
  cheap: abaixo disso, apenas tarefas simples
```

Para cada area, o roteador deve:

1. filtrar modelos que suportam a modalidade da tarefa
2. descartar modelos abaixo da qualidade minima do risco
3. calcular custo efetivo para o tamanho esperado
4. remover modelos dominados pela fronteira de Pareto
5. escolher o menor custo dentro da banda adequada

### Fronteira De Pareto

Um modelo e dominado quando outro modelo e ao mesmo tempo:

- mais barato
- igual ou melhor na qualidade da area
- igual ou melhor em contexto/modalidade
- igual ou melhor em estabilidade recente

Modelos dominados nao devem ser escolhidos, salvo override manual.

### Regra De Upgrade Para Premium

Usar modelo premium somente se:

```text
ganho_qualidade >= 8%
ou risco >= high
ou modelo economico falhou
ou fiscal reprovou a resposta economica
ou tarefa exige modalidade/contexto que o economico nao cobre
```

Caso contrario, usar o melhor modelo custo-beneficio.

### Snapshot De Preco OpenRouter

Valores devem ser buscados em tempo real pelo `model-registry`. Snapshot observado
em 2026-06-14 na API publica do OpenRouter:

| Modelo | Input aprox./1M | Output aprox./1M | Leitura |
|---|---:|---:|---|
| Claude Fable 5 | US$ 10.00 | US$ 50.00 | qualidade alta, custo alto |
| Claude Opus 4.8 | US$ 5.00 | US$ 25.00 | forte, ainda caro |
| Qwen 3.7 Max | US$ 1.25 | US$ 3.75 | bom custo-beneficio para web/code categorias |
| Gemini 3.5 Flash | US$ 1.50 | US$ 9.00 | multimodal forte, bom para visual/agentes |
| Grok Build 0.1 | US$ 1.00 | US$ 2.00 | opcao rapida para coding/debug alternativo |
| Grok 4.3 | US$ 1.25 | US$ 2.50 | contraponto/pesquisa/agentico |

Nao hard-codear esses precos. O sistema deve atualizar pelo OpenRouter antes de
decidir.

### Regras Por Funcao

#### Texto, docs e copy

Se Claude e Gemini estiverem proximos no ranking da area:

```text
usar Gemini/Flash ou Claude economico para primeira versao
usar Claude forte apenas para revisao final de alto impacto
```

#### WebDev e UI

Se Claude Fable liderar mas o custo estiver alto:

```text
usar Qwen/Gemini/Claude Sonnet como executor de custo-beneficio
usar Claude Opus/Fable como fiscal ou consultor quando a tarefa for premium
usar Codex para aplicar codigo e rodar validacao local
```

#### Vision e leitura de print

Se Gemini estiver muito proximo de Opus/Fable e custar menos:

```text
usar Gemini como leitor/revisor visual padrao
usar Claude forte quando a decisao visual tiver alto risco ou envolver documento complexo
```

#### Codigo e repo local

```text
usar Codex/OpenAI como executor principal
usar Qwen/Grok Build como helper ou alternativa barata quando disponivel
usar Claude como fiscal de arquitetura/review em risco medio/alto
```

#### Infra, Portainer e VPS

```text
usar Codex/infra para execucao e comandos
usar Claude para plano/rollback quando risco alto
usar modelo barato para resumir logs longos
```

### Politica De Escalada

Comecar no menor nivel suficiente:

```text
low:
  cheap_classifier ou modelo eficiente

medium:
  modelo custo-beneficio forte + validacao

high:
  executor forte + fiscal independente

critical:
  executor forte + fiscal forte + aprovacao humana antes de aplicar
```

Se falhar:

```text
falha 1: pedir ajuda a helper barato/especialista
falha 2: subir para modelo premium da area
falha 3: acionar arbiter e pedir decisao humana
```

### Micro-Evals Periodicos

Criar pequenos testes por area:

- `eval_code_bugfix`
- `eval_frontend_visual`
- `eval_sql_rls`
- `eval_infra_portainer`
- `eval_docs_release`
- `eval_security_review`

Esses testes rodam sob demanda ou agendados e atualizam o ranking interno.

## Fiscal, Ajudante E Fallback

Todo plano pode ter quatro papeis:

| Papel | Obrigatorio quando | Responsabilidade |
|---|---|---|
| `primary` | sempre | executar a tarefa principal |
| `reviewer` | risco medio/alto ou alteracao real | fiscalizar, testar, apontar erro |
| `helper` | executor travou ou pediu ajuda | sugerir caminho alternativo |
| `arbiter` | conflito entre executor e reviewer | decidir ou pedir aprovacao humana |

### Regras De Fiscal

Fiscal nao deve refazer tudo. Ele deve receber handoff comprimido:

```text
objetivo
arquivos tocados
diff/resumo
comandos executados
falhas
riscos conhecidos
pergunta objetiva para revisao
```

Fiscal deve responder:

```json
{
  "approved": false,
  "severity": "medium",
  "findings": [
    {
      "file": "src/app.js",
      "risk": "falha em edge case",
      "fix": "validar valor nulo antes de salvar"
    }
  ],
  "required_actions": ["corrigir validacao", "rodar npm test"]
}
```

## Quando Chamar Cada LLM

### Codex

Usar para:

- editar codigo
- ler repo
- rodar testes
- corrigir CI
- criar scripts
- debugging com terminal
- validar build

Nao usar como primeira escolha para:

- layout visual subjetivo
- copy de marketing
- ideacao ampla sem codigo

### Claude

Usar para:

- arquitetura
- revisao profunda
- decomposicao de tarefa complexa
- decidir tradeoffs
- fiscal de alto risco
- documentos longos

Nao usar para:

- tarefas triviais de grep
- edicoes repetitivas pequenas
- classificacao barata

### Gemini

Usar para:

- UI/UX
- site, landing page, app visual
- leitura de print/imagem
- revisao visual
- proposta de layout
- copy visual com contexto de marca

Nao usar sozinho para:

- mexer em backend critico
- schema de banco sem review tecnico

### Grok

Usar para:

- contraponto
- debug alternativo
- pesquisa rapida
- validar hipotese

Nao usar como executor final de codigo sem fiscal.

### OpenVoter/OpenRouter

Usar para:

- gateway de varios modelos
- fallback automatico controlado
- comparar modelos disponiveis por custo/latencia
- rodar micro-arena

Nao deixar ele substituir o roteador proprio. Ele e provedor, nao gerente.

## Contexto E Economia De Tokens

### Politicas De Contexto

| Modo | Uso | Conteudo |
|---|---|---|
| `tiny` | tarefa simples | objetivo + 1-2 trechos |
| `targeted` | padrao | arquivos relevantes + memoria curta |
| `expanded` | risco medio | contexto tecnico + diff + logs |
| `full_review` | alto risco | plano + arquivos + validacoes + decisao |

### Regras

- nunca mandar repo inteiro
- nunca mandar todas as skills
- nunca mandar toda memoria
- preferir `searchFiles` antes de `readFile`
- limitar skill playbook a 1-2 por agente
- comprimir retorno de tool antiga
- salvar handoff curto por etapa
- nao chamar reviewer para tarefa trivial
- nao executar agente de negocio em tarefa puramente tecnica

## Ambientes Suportados

### Repo Local

Runner usa:

- leitura de arquivos
- busca por texto
- comandos seguros
- diff
- testes locais

### Portainer

Runner precisa de skills:

- listar stacks
- ler compose
- validar envs
- verificar logs
- propor alteracao
- aplicar somente com aprovacao

### VPS Limpa

Runner precisa de skills:

- diagnostico SO
- Docker/Portainer
- firewall
- Traefik
- DNS/SSL
- backups
- hardening

### Supabase

Runner precisa de skills:

- diagnostico schema
- migrations
- RLS
- storage
- auth
- SQL explain
- grants/Data API

### GitHub

Runner precisa de skills:

- triagem de issues
- review PR
- CI logs
- release
- branch/commit/PR

## Skills Necessarias

### Core

- `router-classify`: classifica area, risco, ambiente, custo
- `router-plan`: gera execution_plan
- `model-registry`: cadastra modelos/provedores/custos/capacidades
- `model-arena`: roda micro-evals e atualiza ranking
- `budget-guard`: corta execucao por tokens/chamadas/tempo
- `handoff-pack`: cria pacote compacto para fiscal/fallback
- `review-gate`: decide se precisa fiscal
- `confidence-score`: estima confianca da resposta
- `task-ledger`: registra etapas, decisoes e resultado

### Repo/Codigo

- `repo-map`: identifica stack e estrutura
- `code-search`: busca semantica/textual no repo
- `diff-review`: revisa diff antes de aplicar
- `test-runner`: roda testes/build/lint
- `patch-plan`: planeja alteracoes por arquivo
- `safe-apply`: aplica patch com limites
- `dependency-audit`: checa deps e vulnerabilidades

### Frontend/Visual

- `visual-brief`: transforma pedido em brief visual
- `ui-review`: fiscaliza responsividade, contraste e layout
- `screenshot-qa`: compara prints desktop/mobile
- `asset-plan`: decide imagens/icones/assets
- `copy-ux`: revisa microcopy e CTAs

### Infra/Portainer/VPS

- `portainer-inventory`: lista endpoints/stacks/services
- `compose-review`: valida docker-compose
- `container-logs`: resume logs relevantes
- `deploy-plan`: cria plano de deploy/rollback
- `traefik-check`: valida routers, middlewares, certificados
- `dns-check`: verifica DNS/Cloudflare
- `vps-hardening`: firewall, usuarios, updates, SSH
- `backup-check`: valida backups e restore

### Supabase/Data

- `supabase-schema-map`
- `migration-review`
- `rls-audit`
- `storage-policy-audit`
- `data-api-exposure-check`
- `sql-performance-check`
- `seed-fixture`
- `rollback-sql-plan`

### GitHub/Ops

- `github-triage`
- `github-reviews`
- `github-ci`
- `release-ops`
- `changelog-maker`
- `rollback-checklist`

### Memoria/Conhecimento

- `memory-save`
- `memory-search`
- `project-profile`
- `decision-log`
- `failure-patterns`
- `context-compressor`

### Provedores/LLMs

- `openai-provider`
- `anthropic-provider`
- `google-provider`
- `xai-provider`
- `openvoter-provider`
- `provider-healthcheck`
- `provider-cost-estimator`
- `provider-fallback`

## Aplicativos/Ferramentas Que Potencializam

Prioridade alta:

- Supabase central
- GitHub
- Portainer API
- Docker CLI remoto seguro
- Sentry
- Uptime Kuma
- Cloudflare
- n8n

Prioridade media:

- Google Drive/Docs
- Gmail
- Notion
- PostHog ou GA4
- Stripe, quando houver pagamentos

Prioridade baixa/por demanda:

- Canva/Picsart para material visual
- Browser automation para QA visual
- Playwright para E2E

## Banco Central Recomendado

O Supabase central deve guardar:

- `agent_projects`
- `agent_environments`
- `agent_runners`
- `agent_models`
- `agent_model_scores`
- `agent_tasks`
- `agent_execution_plans`
- `agent_runs`
- `agent_reviews`
- `agent_handoffs`
- `agent_artifacts`
- `agent_memories`
- `agent_failures`

Isso permite que o gerente aprenda:

- qual modelo foi melhor em cada area
- qual agente travou mais
- qual ambiente precisa de cuidado
- quais skills economizam tokens
- quais tarefas precisam sempre de fiscal

## Canal De Comando Por Voz, WhatsApp E Dashboard

O gerente deve ter uma camada de interface separada dos agentes executores.
Essa camada nao codifica, nao faz deploy e nao altera banco diretamente. Ela
serve para conversar com o usuario, entender comandos por texto ou audio,
consultar o orquestrador, pedir aprovacao e devolver status em canais rapidos.

Fluxo recomendado:

```text
usuario
  -> WhatsApp / audio / dashboard / Codex / Claude Code
  -> agente_de_interface
  -> transcricao + classificacao de intencao
  -> gerente_orquestrador
  -> agentes executores + fiscais
  -> resumo + pedido de aprovacao + alerta
  -> WhatsApp / audio / dashboard
```

### Responsabilidade Do Agente De Interface

- receber audio, texto e comandos curtos
- transcrever audio para texto
- identificar projeto, ambiente, risco e urgencia
- transformar pedido informal em `task_brief`
- pedir confirmacao quando a acao for perigosa
- enviar resumo curto por WhatsApp
- enviar audio quando o usuario pedir status falado
- apontar para dashboard quando houver log longo

### Regras De Seguranca Para Voz

Audio pode iniciar diagnostico, consulta e planejamento. Acoes destrutivas ou
de alto risco precisam de aprovacao explicita:

- deploy em producao
- escrita em banco
- alteracao de segredo
- exclusao de arquivo
- migracao de schema
- mudanca em DNS, proxy ou infraestrutura
- chamada de modelo premium acima do limite definido

Exemplo de aprovacao convertida em politica operacional:

```json
{
  "approved": true,
  "scope": "diagnostico",
  "allowed_tools": ["logs", "health_check", "api_test"],
  "blocked_tools": ["database_write", "deploy", "secret_read"]
}
```

### Comandos Padrao

- `status do projeto`
- `resumir pendencias`
- `somente diagnosticar`
- `aprovar execucao`
- `pausar tarefa`
- `cancelar tarefa`
- `chamar fiscal`
- `fazer deploy`
- `me mandar audio`
- `me avisar so se der erro`

### Politica De Notificacao

O gerente nao deve avisar tudo. Ele deve avisar por evento relevante:

- tarefa iniciada
- bloqueio encontrado
- aprovacao necessaria
- falha critica
- fallback acionado
- fiscal reprovou
- tarefa concluida
- custo passou do limite

Resposta curta vai para WhatsApp. Log tecnico, diff, prints e historico ficam
no dashboard.

## Roadmap De Implementacao

### Fase 1 - Router Sem Alterar Execucao

- criar `router/` separado
- gerar `execution_plan`
- manter execucao antiga como fallback
- registrar plano em JSON local

### Fase 2 - Provider Registry

- extrair chamadas Anthropic/Gemini do `orchestrator.js`
- criar provedores:
  - OpenAI/Codex
  - Anthropic/Claude
  - Google/Gemini
  - xAI/Grok
  - OpenVoter/OpenRouter
- adicionar healthcheck e estimativa de custo

### Fase 3 - Fiscal E Handoff

- criar fiscal obrigatorio por risco
- criar handoff compacto
- parar de passar contexto completo entre agentes

### Fase 4 - Arena Interna

- criar micro-evals por area
- salvar score por modelo
- usar score no roteamento

### Fase 5 - Runners Por Ambiente

- repo local
- Portainer
- VPS
- Supabase
- GitHub

### Fase 6 - Dashboard

- painel de projetos
- tarefas
- execucoes
- ranking dos modelos
- custos
- falhas
- aprovacoes pendentes

## Decisao Recomendada

Implementar primeiro o Router V2 como modulo separado, sem quebrar o CLI atual.

```text
orchestrator.js continua funcionando
router/v2.js gera execution_plan
providers/ centraliza LLMs
policies/ define custo, risco e revisao
arena/ mede performance
```

Depois trocar gradualmente o fluxo antigo por:

```text
task -> router v2 -> runner -> reviewer -> memory
```
