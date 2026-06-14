---
name: sop-operacional-escalavel
description: Documenta procedimentos operacionais (SOPs) em formato executável — pensado pra que qualquer membro novo da equipe consiga executar o processo na primeira tentativa, com checagem, tratamento de exceções, métricas e protocolo de atualização. Vai além de "lista de passos": inclui pré-requisitos, troubleshooting, cenários-limite e histórico de versões. Acione sempre que mencionar: SOP, procedimento operacional, POP, processo documentado, manual de execução, "documentar como fazer", padronizar rotina, treinar alguém novo sem depender do veterano, "a pessoa que sabe sair de férias" — mesmo sem citar "SOP".
---

# SOP Operacional Escalável

Processo que "só a Maria sabe fazer" é bomba-relógio. Quando Maria sai, fica doente, ou é promovida, o processo para — e junto com ele, parte do negócio.

SOP existe pra separar **conhecimento institucional** de **conhecimento pessoal**. O processo vira propriedade da empresa, não do indivíduo.

Mas a maioria dos SOPs fracassa pela mesma razão: são escritos por quem JÁ SABE fazer. Texto cheio de pressupostos, passos pulados ("é óbvio"), exceções não cobertas. O iniciante lê e trava no passo 3.

Essa skill cuida de:
1. Ser **executável por novato**
2. Cobrir **exceções comuns**
3. Ter **métricas**
4. Ter **protocolo de revisão**

## As 3 falhas estruturais dos SOPs ruins

| Falha | Sintoma | Correção |
|-------|---------|----------|
| Pressuposição | "Acesse o sistema" (qual? onde?) | Link, login, ação exata |
| Falta de checagem | Passo executado errado sem perceber | Confirmação visual após cada passo crítico |
| Sem tratamento de exceção | Novato trava na primeira variação | "Troubleshooting" explícito |

## O Prompt

```
Você é especialista em documentação de processos operacionais. Sua regra: escreva pensando em alguém que NUNCA executou o processo — não em alguém que "só quer relembrar". Se um novato segue o SOP sem ajuda e executa direito na primeira vez, seu SOP funcionou.

SOP morto-na-gaveta não vale o arquivo. Precisa ter vida: métricas, responsável, histórico de revisão, protocolo de atualização.

**CONTEXTO:**

*Processo*
- Nome: [ex: "Publicação de post no Instagram de cliente"]
- Departamento/Área: [Marketing / Operações / Financeiro / RH / Suporte / outro]
- Quem executa hoje (cargo/função): [quem ESTÁ fazendo]
- Quem deveria poder executar (cargo alvo mais júnior): [cargo]
- Frequência: [diária / semanal / mensal / por demanda]
- Tempo médio de execução: [minutos/horas]
- Criticidade: [baixa / média / alta]

*Ferramentas e inputs*
- Sistemas/softwares: [liste com URL se aplicável]
- Credenciais/acessos: [quem autoriza]
- Inputs antes de começar: [documentos, dados, aprovações]
- Outputs esperados: [o que fica pronto]

*Problemas reais*
- O que COSTUMA dar errado: [liste]
- Onde novato trava: [pontos problemáticos]
- Variações/exceções: [casos não-padrão]

*Objetivos*
- O que o processo alcança: [resultado específico]
- Métrica de sucesso: [como medir execução correta]

---

**PASSO 1 — CABEÇALHO DO SOP**

### SOP #[código]: [Nome]

- **Área**: [departamento]
- **Versão**: 1.0
- **Data de criação**: [data]
- **Última revisão**: [data]
- **Próxima revisão prevista**: [data — 6-12 meses]
- **Responsável pelo processo (dono)**: [nome/cargo]
- **Aprovado por**: [gestor]
- **Quem pode executar**: [cargos autorizados]

**PASSO 2 — OBJETIVO**

2-3 linhas:
- O que realiza
- Por que importa
- Resultado gerado

**PASSO 3 — ESCOPO**

### Cobre:
- [atividade A]
- [atividade B]

### NÃO cobre:
- [atividade relacionada com SOP próprio]
- [atividade fora do escopo]

**PASSO 4 — PRÉ-REQUISITOS**

Checklist antes de começar (100% atendido pra iniciar):
- [ ] Acesso ao sistema X (se não tiver, [canal])
- [ ] Input Y recebido (se não, [pessoa/área])
- [ ] Aprovação Z conferida
- [ ] Ferramentas instaladas: [liste]

**PASSO 5 — PASSO A PASSO DETALHADO**

Numerado sequencialmente. Cada passo com:

### Passo X: [Ação específica]

**O que fazer**: [verbo imperativo + objeto específico]

**Como fazer**:
1. [sub-ação]
2. [sub-ação]
3. [sub-ação]

**Como confirmar que deu certo**: [checagem visual — o que vê na tela, qual mensagem, que arquivo]

**Tempo estimado**: [minutos]

**Se der errado**: [ação corretiva ou quem acionar]

**Screenshot/exemplo**: [se aplicável]

---

Repita 5-15 passos.

**PASSO 6 — EXCEÇÕES E TROUBLESHOOTING**

| Situação | Por que acontece | O que fazer |
|----------|-----------------|-------------|
| Cliente mudou requisito após aprovação | Reaprovação em fluxo | Mover pra "Em revisão", refazer, reaprovar |
| Sistema X caiu | Instabilidade | Usar alternativa Y ou aguardar Z min |
| Falta dado essencial | Input incompleto | Não prosseguir — solicitar a [pessoa] |

**PASSO 7 — CHECKLIST DE QUALIDADE**

Antes de considerar "executado":
- [ ] Output principal entregue
- [ ] Documentação salva em [local]
- [ ] Notificação a stakeholders (se aplicável)
- [ ] Métrica registrada
- [ ] Ticket fechado no sistema

**PASSO 8 — MÉTRICAS DO PROCESSO**

O que monitorar:
- **Tempo de execução**: meta X min, alerta se > Y
- **Taxa de erro**: meta < X%, alerta se > Y%
- **Satisfação do stakeholder interno**: [NPS se aplicável]
- **Onde registrar**: [ferramenta + frequência]

**PASSO 9 — HISTÓRICO DE ALTERAÇÕES**

| Versão | Data | Alteração | Autor |
|--------|------|-----------|-------|
| 1.0 | [data] | Criação inicial | [nome] |

**PASSO 10 — PROTOCOLO DE ATUALIZAÇÃO**

- Revisão obrigatória: 6-12 meses
- Revisão reativa: falha 2+ vezes ou ferramenta muda
- Quem aciona: dono + executor atual
- Como sugerir melhoria: [canal]

---

**REGRAS DE LINGUAGEM:**

1. **Imperativo**: "Acesse o sistema X", não "É necessário acessar"
2. **Específico**: "Clique no botão azul 'Publicar' no canto superior direito"
3. **Nunca assuma**: "Se é novo: fala com [pessoa] pra receber acesso" antes de "Acesse"
4. **Evite jargão sem definir**
5. **Frases curtas** (max 20 palavras)
6. **Screenshots valem mais que texto**

**PASSO 11 — TESTE DE USABILIDADE**

Antes de publicar:
- Dê pra alguém que NUNCA executou
- Peça pra executar só com o SOP
- Anote onde trava, pergunta, hesita
- Corrija — são os defeitos do documento
```

## Regras do SOP que vive

**1. Escreva pra quem não sabe.** Dói pro veterano (parece "óbvio demais"), mas é a única forma em escala.

**2. Mídia visual quando possível.** Screenshot substitui 3 parágrafos. Vídeo curto (5 min) mostra o que texto não mostra.

**3. SOP sem métrica é receita morta.** Se não mede, não sabe se é seguido. "Documentado" ≠ "seguido corretamente".

**4. Revisão é parte do processo.** SOP de 2 anos sem atualização provavelmente tem 2-3 passos obsoletos.

**5. Dono explícito é crítico.** SOP "de todo mundo" é de ninguém.

## Erros que matam aplicação

- SOP só no Drive de um veterano que nunca compartilha
- Linguagem tão corporativa que parece política pública
- Passos longos demais sem subdivisão
- Sem screenshots em processos visuais
- Revisado uma vez, nunca mais mexido
- Confundido com política (SOP é "como fazer", política é "o que é permitido")

## Diferenças importantes

| Documento | Serve pra | NÃO é |
|-----------|-----------|-------|
| SOP | Como executar UM processo | Política geral |
| Política | O que é permitido/proibido | Execução passo a passo |
| Guia | Referência educativa | Execução estrita |
| Manual | Coletânea de SOPs + contexto | SOP único |
| Playbook | Repertório pra cenários | Rigidez operacional |

## Benchmark de cobertura

Em empresa madura operacionalmente:
- 80%+ dos processos recorrentes têm SOP
- 60%+ revisados em até 12 meses
- 90%+ dos onboardings começam por ler SOPs relevantes
- Tempo pra novato dominar processo cai 30-50% com SOP bem feito

---
**Camada avançada:** Depois de 80%+ dos processos cobertos, o próximo nível é **automação de SOPs**. Cada processo recorrente documentado vira candidato a automação (n8n, Make, Zapier). SOP não é substituído pela automação — é o que permite desenhá-la corretamente. Sem SOP, você automatiza processo quebrado.
