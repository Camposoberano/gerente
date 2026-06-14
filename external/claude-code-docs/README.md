# Claude Code - Repositório Organizado

## 📋 Índice Geral

Bem-vindo ao repositório organizado de projetos desenvolvidos com Claude Code. Este repositório contém todos os projetos, documentações e configurações em uma estrutura lógica e fácil de navegar.

---

## 🗂️ Estrutura de Pastas

```
D:\Claude_code\
├── 01_Projetos_CECAPE/          # Checklists CECAPE de materiais odontológicos
├── 02_Sistema_Ortovital/        # Sistema de gestão de laboratório protético (Backend/SQL)
├── 03_N8N_Workflows/            # Workflows de automação N8N
├── 04_Ortovital_Dashboard/      # Dashboard web Next.js do Ortovital ⭐ NOVO
├── 05_Ortovital_Automacoes/     # Triggers e automações Supabase ⭐ NOVO
├── 06_Configuracoes/            # Arquivos de configuração
├── 07_Documentacao_Geral/       # Documentação geral do sistema
└── README.md                    # Este arquivo
```

---

## 📁 Projetos

### 1️⃣ [Projetos CECAPE](01_Projetos_CECAPE/)
**Descrição:** Checklists interativos para materiais odontológicos da Faculdade CECAPE

**Conteúdo:**
- ✅ Checklist 1º Semestre (2025.2) - **PRINCIPAL**
- ✅ Checklist 9º Semestre (Estágio em Clínica Odontológica 6)
- ✅ Checklist 10º Semestre (Clínica Integrada + Urgência)

**Tecnologias:** React 18, Tailwind CSS, Webhook Integration

**Status:** ✅ Pronto para produção

**Acesso Rápido:**
- [README Detalhado](01_Projetos_CECAPE/README.md)
- [1º Semestre HTML](01_Projetos_CECAPE/1_semestre/index.html)
- [9º Semestre HTML](01_Projetos_CECAPE/9_semestre/checklist-9-semestre.html)
- [10º Semestre HTML](01_Projetos_CECAPE/10_semestre/checklist-10-semestre.html)

**Hospedagem Atual:**
- https://soberano.pro/odonto/1_semestre_cecape/

---

### 2️⃣ [Sistema Ortovital](02_Sistema_Ortovital/)
**Descrição:** Sistema completo de gestão para laboratórios protéticos dentários

**Conteúdo:**
- 📊 Schema completo de banco de dados (Supabase/PostgreSQL)
- 📚 Documentação técnica completa
- 🚀 Scripts de instalação e execução
- 📈 Sistema de rastreamento de procedimentos
- 👨‍⚕️ Gestão de doutores protéticos e técnicos

**Tecnologias:** Supabase, PostgreSQL, React/Next.js (sugerido)

**Status:** ✅ Backend completo | 🔄 Frontend em desenvolvimento

**Acesso Rápido:**
- [README Detalhado](02_Sistema_Ortovital/README.md)
- [SQL - Schema Completo](02_Sistema_Ortovital/sql/)
- [Documentação](02_Sistema_Ortovital/docs/)
- [Scripts de Instalação](02_Sistema_Ortovital/scripts/)

**Guias Principais:**
- [Guia para Leigos](02_Sistema_Ortovital/docs/GUIA_PARA_LEIGOS.md)
- [Guia de Implementação Supabase](02_Sistema_Ortovital/docs/GUIA_IMPLEMENTACAO_SUPABASE.md)
- [Resumo Executivo](02_Sistema_Ortovital/docs/RESUMO_EXECUTIVO_SISTEMA.md)

---

### 3️⃣ [N8N Workflows](03_N8N_Workflows/)
**Descrição:** Automação de atendimento e vendas via WhatsApp para produtos odontológicos

**Conteúdo:**
- 🤖 Sistema multi-agente conversacional
- 🔍 Busca inteligente de produtos
- 💾 Sistema de memória com Supabase
- 📱 Integração WhatsApp Business
- ⚙️ Scripts de correção e otimização

**Tecnologias:** N8N, OpenAI GPT, Supabase, WhatsApp API

**Status:** ✅ Workflows funcionais | 🔄 Otimizações contínuas

**Acesso Rápido:**
- [README Detalhado](03_N8N_Workflows/README.md)
- [Workflows Principais](03_N8N_Workflows/workflows/)
- [Prompts de IA](03_N8N_Workflows/prompts/)
- [Scripts de Correção](03_N8N_Workflows/scripts_correcao/)
- [Documentação Técnica](03_N8N_Workflows/docs/)

**Workflows Destacados:**
- [Fluxo Completo Otimizado](03_N8N_Workflows/workflows/fluxo_dental_jua_otimizado_final.json)
- [Sistema de Busca Robusta](03_N8N_Workflows/workflows/n8n_robust_product_search_workflow.json)
- [Automação Multi-Semestre CECAPE](03_N8N_Workflows/workflows/automacao_multi_semestre.json)

---

### 4️⃣ [Ortovital Dashboard](04_Ortovital_Dashboard/) ⭐ NOVO
**Descrição:** Dashboard web completo para gestão de laboratório protético

**Conteúdo:**
- 🎯 Dashboard principal com métricas em tempo real
- 📝 Cadastro completo de pacientes/dentistas
- 📊 Gerenciamento de procedimentos
- ✅ Atualização visual de etapas
- 📅 Calendário de entregas
- 📱 Design responsivo (desktop e mobile)

**Tecnologias:** Next.js 14, TypeScript, Tailwind CSS, Supabase Client, Recharts

**Status:** 🔄 Em desenvolvimento ativo

**Acesso Rápido:**
- [README Detalhado](04_Ortovital_Dashboard/README.md)
- [Estrutura do Projeto](04_Ortovital_Dashboard/src/)
- [Componentes](04_Ortovital_Dashboard/src/components/)

**Como Usar:**
```bash
cd 04_Ortovital_Dashboard
npm install
# Configure .env.local com credenciais Supabase
npm run dev
# Acesse http://localhost:3000
```

**Integração:**
- Backend: [02_Sistema_Ortovital](02_Sistema_Ortovital/)
- Automações: [05_Ortovital_Automacoes](05_Ortovital_Automacoes/)

---

### 5️⃣ [Ortovital Automações](05_Ortovital_Automacoes/) ⭐ NOVO
**Descrição:** Sistema completo de automações, triggers e Edge Functions para Supabase

**Conteúdo:**
- 🤖 Triggers SQL automáticos (log, progresso, status)
- ⚡ Edge Functions do Supabase (notificações, alertas)
- 📜 Sistema de auditoria e histórico completo
- 🔔 Webhooks para notificações externas
- 📊 Relatórios automáticos

**Tecnologias:** Supabase Triggers, PostgreSQL Functions, Edge Functions (Deno)

**Status:** ✅ Triggers funcionais | 🔄 Edge Functions em desenvolvimento

**Acesso Rápido:**
- [README Detalhado](05_Ortovital_Automacoes/README.md)
- [Triggers SQL](05_Ortovital_Automacoes/triggers_automacao_avancados.sql)
- [Edge Functions](05_Ortovital_Automacoes/supabase/functions/)

**Como Instalar:**
```bash
# 1. Execute triggers SQL no Supabase SQL Editor
# 2. Deploy Edge Functions via Supabase CLI
supabase functions deploy
```

**Integração:**
- Backend: [02_Sistema_Ortovital](02_Sistema_Ortovital/)
- Frontend: [04_Ortovital_Dashboard](04_Ortovital_Dashboard/)

---

## ⚙️ Configurações

### 6️⃣ [Configurações](06_Configuracoes/)
**Descrição:** Arquivos de configuração do sistema

**Conteúdo:**
- `claude-mcp-config.json` - Configuração MCP do Claude
- `.claude.json` - Configurações gerais
- `.claude.json.backup` - Backup de configurações

---

## 📖 Documentação Geral

### 7️⃣ [Documentação Geral](07_Documentacao_Geral/)
**Descrição:** Documentação transversal e guias gerais

**Conteúdo:**
- [LEIA_PRIMEIRO.txt](07_Documentacao_Geral/LEIA_PRIMEIRO.txt) - Introdução geral
- [INDICE_ARQUIVOS.txt](07_Documentacao_Geral/INDICE_ARQUIVOS.txt) - Índice de todos os arquivos
- [ACOES_IMEDIATAS.txt](07_Documentacao_Geral/ACOES_IMEDIATAS.txt) - Ações prioritárias
- [COMO_USAR_TODO_DIA.md](07_Documentacao_Geral/COMO_USAR_TODO_DIA.md) - Guia de uso diário
- [COMECE_AQUI.txt](07_Documentacao_Geral/COMECE_AQUI.txt) - Início rápido

---

## 🚀 Início Rápido

### Para Projetos CECAPE
```bash
1. Navegue até: 01_Projetos_CECAPE/1_semestre/
2. Abra: index.html no navegador
3. Teste localmente
4. Faça upload para hospedagem
```

### Para Sistema Ortovital
```bash
1. Leia: 02_Sistema_Ortovital/docs/GUIA_PARA_LEIGOS.md
2. Execute: 02_Sistema_Ortovital/scripts/INICIAR_AQUI.bat
3. Configure Supabase com SQL em: 02_Sistema_Ortovital/sql/
```

### Para N8N Workflows
```bash
1. Importe: 03_N8N_Workflows/workflows/fluxo_dental_jua_otimizado_final.json
2. Configure credenciais (OpenAI, Supabase, WhatsApp)
3. Ative o workflow
4. Teste via WhatsApp
```

### Para Ortovital Dashboard (Frontend)
```bash
1. Configure banco: 02_Sistema_Ortovital/sql/ (primeiro!)
2. Instale triggers: 05_Ortovital_Automacoes/ (segundo!)
3. cd 04_Ortovital_Dashboard
4. npm install
5. Configure .env.local com credenciais Supabase
6. npm run dev
7. Acesse: http://localhost:3000
```

### Para Ortovital Automações
```bash
1. Configure banco: 02_Sistema_Ortovital/sql/ (primeiro!)
2. Execute triggers: 05_Ortovital_Automacoes/triggers_automacao_avancados.sql
3. Deploy Edge Functions: supabase functions deploy (se tiver)
```

---

## 📊 Status dos Projetos

| Projeto | Status | Pronto para Produção | Documentação |
|---------|--------|---------------------|--------------|
| **01_CECAPE Checklists** | ✅ Completo | ✅ Sim | ✅ Completa |
| **02_Sistema Ortovital (Backend)** | ✅ Backend completo | ✅ Sim (SQL) | ✅ Completa |
| **03_N8N Workflows** | ✅ Funcional | ✅ Sim | ✅ Completa |
| **04_Ortovital Dashboard** ⭐ | 🔄 Em desenvolvimento | ⚠️ Dev Ativo | ✅ Completa |
| **05_Ortovital Automações** ⭐ | ✅ Triggers prontos | ✅ Sim (Triggers) | ✅ Completa |

**Nota:** Projetos 04 e 05 são componentes ativos em desenvolvimento do Sistema Ortovital.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **Next.js 14** - Framework React com App Router ⭐
- **TypeScript** - Tipagem estática ⭐
- **Tailwind CSS** - Utility-first CSS
- **Babel Standalone** - Transpilação em runtime
- **Recharts** - Gráficos e visualizações ⭐

### Backend
- **Supabase** - PostgreSQL + API REST + Realtime
- **PostgreSQL Functions** - Triggers e automações ⭐
- **Edge Functions** - Serverless Deno ⭐
- **N8N** - Automação de workflows
- **OpenAI GPT** - IA conversacional

### Integrações
- **WhatsApp Business API** - Mensagens
- **Webhooks** - Eventos externos
- **Supabase Realtime** - Updates em tempo real
- **Zustand** - State management ⭐

---

## 📝 Convenções e Padrões

### Nomenclatura de Pastas
- `01_`, `02_`, etc. = Ordem de prioridade/importância
- Nomes descritivos em PascalCase ou snake_case
- Subpastas organizadas por tipo (sql, docs, scripts, etc.)

### Nomenclatura de Arquivos
- `README.md` = Documentação principal de cada pasta
- `.sql` = Scripts SQL
- `.json` = Workflows, configs, dados
- `.md` = Documentação markdown
- `.txt` = Notas e guias rápidos
- `.bat` = Scripts Windows
- `.js` = Scripts JavaScript

### Estrutura de README
1. Descrição
2. Estrutura de Pastas
3. Funcionalidades
4. Tecnologias
5. Como Usar
6. Status e Roadmap

---

## 🔍 Como Encontrar o que Precisa

### Por Tipo de Tarefa

**Implementar checklist CECAPE:**
→ `01_Projetos_CECAPE/`

**Configurar sistema de laboratório:**
→ `02_Sistema_Ortovital/`

**Automatizar atendimento WhatsApp:**
→ `03_N8N_Workflows/`

**Configurar ambiente:**
→ `04_Configuracoes/`

**Ler documentação geral:**
→ `05_Documentacao_Geral/`

### Por Tipo de Arquivo

**Arquivos SQL:**
→ `02_Sistema_Ortovital/sql/`
→ `03_N8N_Workflows/docs/` (memória)

**Workflows N8N:**
→ `03_N8N_Workflows/workflows/`

**Documentação:**
→ Cada pasta tem `/docs/` e `README.md`

**Scripts:**
→ `02_Sistema_Ortovital/scripts/`
→ `03_N8N_Workflows/scripts_correcao/`

**HTMLs:**
→ `01_Projetos_CECAPE/*/`

---

## 📚 Documentação Recomendada

### Para Iniciantes
1. [LEIA_PRIMEIRO.txt](05_Documentacao_Geral/LEIA_PRIMEIRO.txt)
2. [COMECE_AQUI.txt](05_Documentacao_Geral/COMECE_AQUI.txt)
3. [GUIA_PARA_LEIGOS.md](02_Sistema_Ortovital/docs/GUIA_PARA_LEIGOS.md)

### Para Desenvolvedores
1. [CECAPE README](01_Projetos_CECAPE/README.md)
2. [Ortovital - Guia Completo](02_Sistema_Ortovital/docs/GUIA_COMPLETO_SISTEMA.md)
3. [N8N Workflows README](03_N8N_Workflows/README.md)

### Para Gestores
1. [Resumo Executivo Ortovital](02_Sistema_Ortovital/docs/RESUMO_EXECUTIVO_SISTEMA.md)
2. [ACOES_IMEDIATAS.txt](05_Documentacao_Geral/ACOES_IMEDIATAS.txt)

---

## 🔧 Manutenção e Atualizações

### Backup
- Configurações têm backup em `04_Configuracoes/`
- Sempre exporte workflows antes de modificar
- Versione arquivos SQL antes de executar

### Versionamento
- Use nomes descritivos com sufixos: `_v1`, `_v2`, `_final`, `_corrigido`
- Mantenha backups de versões anteriores
- Documente mudanças em README

### Organização
- Novos projetos: Crie pasta numerada (ex: `06_Novo_Projeto/`)
- Novos documentos: Adicione em pasta apropriada
- Atualize este README ao adicionar conteúdo

---

## 💡 Dicas e Boas Práticas

### CECAPE Checklists
- ✅ Teste localmente antes de fazer upload
- ✅ Valide webhook antes de produção
- ✅ Mantenha backup da versão anterior

### Sistema Ortovital
- ✅ Execute SQL em ordem (schema → cadastros → updates)
- ✅ Teste com dados de teste primeiro
- ✅ Configure variáveis de ambiente antes de rodar

### N8N Workflows
- ✅ Teste workflows em ambiente de dev primeiro
- ✅ Configure credenciais corretamente
- ✅ Monitore logs para identificar erros
- ✅ Use scripts de correção quando necessário

---

## 📞 Suporte

### Problemas Comuns

**Arquivo não encontrado:**
→ Verifique estrutura de pastas neste README
→ Use busca do Windows: Win + S

**Erro em workflow N8N:**
→ Consulte: `03_N8N_Workflows/docs/`
→ Veja scripts de correção em: `03_N8N_Workflows/scripts_correcao/`

**Erro SQL Ortovital:**
→ Verifique ordem de execução
→ Consulte: `02_Sistema_Ortovital/docs/GUIA_IMPLEMENTACAO_SUPABASE.md`

**HTML não funciona:**
→ Verifique se está abrindo no navegador
→ Verifique console do browser (F12)

---

## 🎯 Roadmap Geral

### Curto Prazo
- [ ] Interface web completa para Ortovital
- [ ] Novos semestres CECAPE (2º, 3º, 4º, etc.)
- [ ] Dashboard analytics N8N

### Médio Prazo
- [ ] App mobile Ortovital
- [ ] Integração CECAPE ↔ N8N ↔ Ortovital
- [ ] Sistema de notificações unificado

### Longo Prazo
- [ ] Multi-tenancy para Ortovital
- [ ] Marketplace de workflows N8N
- [ ] Sistema de gestão acadêmica completo

---

## 📄 Licença e Uso

Todos os projetos neste repositório foram desenvolvidos com Claude Code para uso específico dos clientes/projetos mencionados.

**Uso permitido:**
- ✅ Uso interno nos projetos relacionados
- ✅ Modificação e adaptação conforme necessário
- ✅ Compartilhamento com equipes autorizadas

**Uso restrito:**
- ❌ Redistribuição comercial sem autorização
- ❌ Uso em projetos não relacionados sem adaptação
- ❌ Remoção de créditos e atribuições

---

## 🏆 Créditos

**Desenvolvido com:**
- Claude Code (Anthropic)
- AI-Assisted Development

**Para:**
- Faculdade CECAPE - Juazeiro do Norte, CE
- Sistema Ortovital - Gestão de Laboratório Protético
- Dental Jua - Automação de Atendimento

---

## 📌 Última Atualização

**Data:** 26 de Outubro de 2025
**Versão:** 1.0
**Organizado por:** Claude Code

---

## 🔗 Links Úteis

- [Supabase](https://supabase.com)
- [N8N](https://n8n.io)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Claude Code Docs](https://docs.claude.com/claude-code)

---

**Fim do README Principal**

*Para navegar, clique nos links azuis ou acesse as pastas diretamente pelo explorador de arquivos.*
