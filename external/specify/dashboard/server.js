const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3333;

const ROOT = path.resolve(__dirname, '..');
const SCRIPTS = path.join(ROOT, 'scripts', 'bash');
const TEMPLATES = path.join(ROOT, 'templates');
const SKILLS = path.join(ROOT, '.claude', 'skills');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const CATALOG = {
  skills: [
    {
      id: 'debug-issue',
      name: 'Debug Issue',
      command: '/debug-issue',
      description: 'Debug sistemático usando graph-powered navigation. Faz semantic search → call chain → flow analysis → impact radius.',
      executable: false,
    },
    {
      id: 'explore-codebase',
      name: 'Explore Codebase',
      command: '/explore-codebase',
      description: 'Navega estrutura do codebase via knowledge graph. Stats → architecture → communities → semantic search → flows.',
      executable: false,
    },
    {
      id: 'refactor-safely',
      name: 'Refactor Safely',
      command: '/refactor-safely',
      description: 'Refactoring seguro com dependency analysis. Suggestions → dead code → rename previews → apply renames.',
      executable: false,
    },
    {
      id: 'review-changes',
      name: 'Review Changes',
      command: '/review-changes',
      description: 'Code review estruturado com change detection. Risk scoring → affected flows → test coverage → blast radius.',
      executable: false,
    },
  ],
  scripts: [
    {
      id: 'check-prerequisites',
      name: 'Check Prerequisites',
      command: 'check-prerequisites.sh',
      description: 'Valida pré-requisitos da feature ativa. Verifica arquivos spec, plan, tasks, checklist.',
      executable: true,
      flags: [
        { flag: '--json', description: 'Output em JSON' },
        { flag: '--require-tasks', description: 'Exige tasks.md' },
        { flag: '--include-tasks', description: 'Inclui tasks.md na verificação' },
        { flag: '--paths-only', description: 'Retorna só os caminhos' },
      ],
    },
    {
      id: 'create-new-feature',
      name: 'Create New Feature',
      command: 'create-new-feature.sh',
      description: 'Cria branch + inicializa spec da feature. Auto-incrementa número da feature.',
      executable: true,
      flags: [
        { flag: '--json', description: 'Output em JSON' },
        { flag: '--dry-run', description: 'Simula sem criar arquivos' },
        { flag: '--timestamp', description: 'Usa formato YYYYMMDD-HHMMSS no nome' },
      ],
      args: [
        { name: 'feature-name', placeholder: 'Nome da feature (ex: minha-feature)', required: true },
      ],
    },
    {
      id: 'setup-plan',
      name: 'Setup Plan',
      command: 'setup-plan.sh',
      description: 'Inicializa plan.md para a feature ativa. Usa feature.json para localizar a feature.',
      executable: true,
      flags: [
        { flag: '--json', description: 'Output em JSON' },
      ],
    },
  ],
  speckit: [
    { id: 'specify', command: '/speckit.specify', description: 'Cria especificação da feature (user stories, requisitos, critérios de sucesso).' },
    { id: 'plan', command: '/speckit.plan', description: 'Cria plano de implementação (contexto técnico, arquitetura, estrutura).' },
    { id: 'analyze', command: '/speckit.analyze', description: 'Analisa especificação da feature ativa.' },
    { id: 'clarify', command: '/speckit.clarify', description: 'Clarifica requisitos ambíguos da spec.' },
    { id: 'checklist', command: '/speckit.checklist', description: 'Gera/gerencia checklists de build, test e deploy.' },
    { id: 'tasks', command: '/speckit.tasks', description: 'Gera lista de tarefas a partir do plano.' },
    { id: 'taskstoissues', command: '/speckit.taskstoissues', description: 'Converte tasks em issues do repositório.' },
    { id: 'constitution', command: '/speckit.constitution', description: 'Gerencia a constituição do projeto (princípios, restrições, workflow).' },
    { id: 'implement', command: '/speckit.implement', description: 'Guia de implementação baseado na spec e plano ativos.' },
  ],
  templates: [
    { id: 'spec', file: 'spec-template.md', description: 'Template de especificação. Seções: user scenarios (P1/P2/P3), requisitos funcionais, critérios de sucesso.' },
    { id: 'plan', file: 'plan-template.md', description: 'Template de plano. Seções: summary, contexto técnico, constitution check, estrutura do projeto.' },
    { id: 'checklist', file: 'checklist-template.md', description: 'Template de checklist. Categorias e itens numerados (CHK001+).' },
    { id: 'constitution', file: 'constitution-template.md', description: 'Template de constituição. Princípios, restrições, workflow, governance.' },
    { id: 'tasks', file: 'tasks-template.md', description: 'Template de tasks. Estrutura de tarefas e subtarefas por fase.' },
  ],
};

function loadSkillsFromDisk() {
  const list = [];
  const dirPath = path.join(ROOT, '..', '.claude', 'skills');
  if (!fs.existsSync(dirPath)) {
    return list;
  }

  
  try {
    const folders = fs.readdirSync(dirPath).filter(item => {
      const fullPath = path.join(dirPath, item);
      return fs.statSync(fullPath).isDirectory();
    });
    
    for (const folder of folders) {
      const skillFile = path.join(dirPath, folder, 'skill.md');
      if (fs.existsSync(skillFile)) {
        const content = fs.readFileSync(skillFile, 'utf-8');
        const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        let name = folder;
        let description = '';
        if (frontmatterMatch) {
          const lines = frontmatterMatch[1].split('\n');
          for (const line of lines) {
            const nameMatch = line.match(/^name:\s*(.+)$/i);
            const descMatch = line.match(/^description:\s*(.+)$/i);
            if (nameMatch) name = nameMatch[1].trim();
            if (descMatch) description = descMatch[1].trim();
          }
        }
        list.push({
          id: folder,
          name: name,
          command: '/' + folder,
          description: description || 'Sem descrição cadastrada.',
          executable: false
        });
      }
    }
  } catch (err) {
    console.error('Erro ao carregar skills dinâmicas:', err);
  }
  return list;
}

app.get('/api/commands', (req, res) => {
  const dynamicSkills = loadSkillsFromDisk();
  const updatedCatalog = {
    ...CATALOG,
    skills: dynamicSkills.length > 0 ? dynamicSkills : CATALOG.skills
  };
  res.json(updatedCatalog);
});

app.get('/api/feature', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(ROOT, 'feature.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch {
    res.json({ feature_directory: null });
  }
});

app.get('/api/template/:name', (req, res) => {
  const entry = CATALOG.templates.find(t => t.id === req.params.name);
  if (!entry) return res.status(404).json({ error: 'Template não encontrado' });

  try {
    const content = fs.readFileSync(path.join(TEMPLATES, entry.file), 'utf8');
    res.json({ name: entry.id, file: entry.file, content });
  } catch {
    res.status(500).json({ error: 'Erro ao ler template' });
  }
});

// SSE endpoint — executa script e envia output linha por linha
app.post('/api/run/:scriptId', (req, res) => {
  const entry = CATALOG.scripts.find(s => s.id === req.params.scriptId);
  if (!entry) return res.status(404).json({ error: 'Script não encontrado' });

  const { flags = [], args = [] } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const scriptPath = path.join(SCRIPTS, entry.command);
  const cmdArgs = [...args, ...flags];

  const send = (type, data) => res.write(`data: ${JSON.stringify({ type, data })}\n\n`);

  send('start', { script: entry.command, args: cmdArgs });

  // Scripts são bash — usar bash explicitamente no Windows via Git Bash / WSL
  const proc = spawn('bash', [scriptPath, ...cmdArgs], {
    cwd: ROOT,
    env: { ...process.env, PATH: process.env.PATH },
  });

  proc.stdout.on('data', chunk => send('stdout', chunk.toString()));
  proc.stderr.on('data', chunk => send('stderr', chunk.toString()));
  proc.on('close', code => {
    send('done', { code });
    res.end();
  });
  proc.on('error', err => {
    send('error', err.message);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`.specify Dashboard rodando em http://localhost:${PORT}`);
});
