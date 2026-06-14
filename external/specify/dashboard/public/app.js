const API = 'http://localhost:3333/api';
let catalog = {};
let currentCategory = 'scripts';

async function init() {
  await Promise.all([loadCatalog(), loadFeature()]);
  setupNav();
  setupSearch();
  renderCategory('scripts');
  lucide.createIcons();
}

async function loadCatalog() {
  const res = await fetch(`${API}/commands`);
  catalog = await res.json();
  document.getElementById('count-scripts').textContent = catalog.scripts.length;
  document.getElementById('count-skills').textContent = catalog.skills.length;
  document.getElementById('count-speckit').textContent = catalog.speckit.length;
  document.getElementById('count-templates').textContent = catalog.templates.length;
}

async function loadFeature() {
  const res = await fetch(`${API}/feature`);
  const data = await res.json();
  const el = document.getElementById('current-feature');
  el.textContent = data.feature_directory || '—';
  el.title = data.feature_directory || '';
}

function setupNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentCategory = item.dataset.category;
      document.getElementById('search-input').value = ''; // clear search on switch
      showList();
      renderCategory(currentCategory);
    });
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    showList();
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    renderCategory(currentCategory, e.target.value);
  });
}


function showList() {
  document.getElementById('command-list').classList.remove('hidden');
  document.getElementById('detail-panel').classList.add('hidden');
}

function showDetail(html) {
  document.getElementById('command-list').classList.add('hidden');
  const panel = document.getElementById('detail-panel');
  panel.classList.remove('hidden');
  document.getElementById('detail-content').innerHTML = html;
}

function renderCategory(cat, filterQuery = '') {
  const list = document.getElementById('command-list');
  list.innerHTML = '';

  let items = catalog[cat] || [];
  
  if (filterQuery) {
    const q = filterQuery.toLowerCase();
    items = items.filter(item => {
      const name = (item.name || item.id || '').toLowerCase();
      const desc = (item.description || '').toLowerCase();
      const cmd = (item.command || item.file || '').toLowerCase();
      return name.includes(q) || desc.includes(q) || cmd.includes(q);
    });
  }

  const titles = { scripts: 'Scripts Bash', skills: 'Skills Claude Code', speckit: 'Comandos SpecKit', templates: 'Templates' };
  const subtitles = {
    scripts: 'Execute scripts do SpecKit diretamente com argumentos e flags',
    skills: 'Utilize comandos de skill especializados no Claude Code ou Gemini',
    speckit: 'Instruções e comandos prontos para a inteligência artificial',
    templates: 'Visualize e copie os templates oficiais de documentação de features',
  };

  const header = document.createElement('div');
  header.className = 'category-header';
  header.innerHTML = `<h1>${titles[cat]}</h1><p>${subtitles[cat]}</p>`;
  list.appendChild(header);

  if (items.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.style.padding = '40px 0';
    noResults.style.color = 'var(--text-muted)';
    noResults.style.textAlign = 'center';
    noResults.innerHTML = `
      <i data-lucide="search-x" style="width: 48px; height: 48px; stroke-width: 1.5; margin-bottom: 12px; opacity: 0.5;"></i>
      <p>Nenhuma skill ou comando encontrado para sua busca.</p>
    `;
    list.appendChild(noResults);
    lucide.createIcons();
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = buildCardHTML(cat, item);
    card.addEventListener('click', () => openDetail(cat, item));
    grid.appendChild(card);
  });

  list.appendChild(grid);
  lucide.createIcons();
}


function buildCardHTML(cat, item) {
  const badge = {
    scripts: `<span class="badge badge-script"><i data-lucide="terminal" style="width: 12px; height: 12px;"></i> bash</span>`,
    skills: `<span class="badge badge-skill"><i data-lucide="cpu" style="width: 12px; height: 12px;"></i> skill</span>`,
    speckit: `<span class="badge badge-speckit"><i data-lucide="clipboard-list" style="width: 12px; height: 12px;"></i> speckit</span>`,
    templates: `<span class="badge badge-template"><i data-lucide="file-text" style="width: 12px; height: 12px;"></i> template</span>`,
  }[cat];

  const cmd = item.command || item.file || '';
  return `
    <div class="card-header">
      ${badge}
      <span class="card-title">${item.name || item.id}</span>
    </div>
    <p class="card-desc">${item.description}</p>
    <code class="card-cmd">${cmd}</code>
  `;
}

function openDetail(cat, item) {
  if (cat === 'scripts') openScriptDetail(item);
  else if (cat === 'skills') openSkillDetail(item);
  else if (cat === 'speckit') openSpeckitDetail(item);
  else if (cat === 'templates') openTemplateDetail(item);
}

function openScriptDetail(item) {
  const flagsHTML = (item.flags || []).map(f => `
    <label class="flag-item">
      <input type="checkbox" class="flag-check" value="${f.flag}" />
      <code>${f.flag}</code>
      <span>${f.description}</span>
    </label>
  `).join('');

  const argsHTML = (item.args || []).map(a => `
    <div class="arg-item">
      <label>${a.name}${a.required ? ' <span class="required">*</span>' : ''}</label>
      <input type="text" class="arg-input" data-arg="${a.name}" placeholder="${a.placeholder || ''}" />
    </div>
  `).join('');

  const html = `
    <div class="detail-header">
      <span class="badge badge-script"><i data-lucide="terminal" style="width: 12px; height: 12px;"></i> bash</span>
      <h2>${item.name}</h2>
    </div>
    <p class="detail-desc">${item.description}</p>
    <code class="detail-cmd">${item.command}</code>

    ${argsHTML ? `<div class="section"><h3>Argumentos</h3>${argsHTML}</div>` : ''}
    ${flagsHTML ? `<div class="section"><h3>Flags / Opções</h3><div class="flags-list">${flagsHTML}</div></div>` : ''}

    <button class="run-btn" id="run-btn" data-id="${item.id}"><i data-lucide="play" style="width: 16px; height: 16px;"></i> Executar Comando</button>

    <div id="output-box" class="output-box hidden">
      <div class="output-toolbar">
        <div class="terminal-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <span class="terminal-title">${item.id}_session.sh</span>
        <button class="clear-btn" id="clear-output"><i data-lucide="trash-2" style="width: 10px; height: 10px; vertical-align: middle; margin-right: 2px;"></i> Limpar</button>
      </div>
      <pre id="output-content"></pre>
    </div>
  `;

  showDetail(html);
  lucide.createIcons();

  document.getElementById('run-btn').addEventListener('click', () => runScript(item));
  document.getElementById('clear-output')?.addEventListener('click', () => {
    document.getElementById('output-content').textContent = '';
  });
}

async function runScript(item) {
  const flags = [...document.querySelectorAll('.flag-check:checked')].map(c => c.value);
  const args = [...document.querySelectorAll('.arg-input')].map(i => i.value).filter(Boolean);

  const outputBox = document.getElementById('output-box');
  const outputContent = document.getElementById('output-content');
  const runBtn = document.getElementById('run-btn');

  outputBox.classList.remove('hidden');
  outputContent.textContent = '';
  runBtn.disabled = true;
  runBtn.innerHTML = '<i data-lucide="loader" class="animate-spin" style="width: 16px; height: 16px;"></i> Executando...';
  lucide.createIcons();

  try {
    const res = await fetch(`${API}/run/${item.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flags, args }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const event = JSON.parse(line.slice(6));
        if (event.type === 'stdout') {
          outputContent.textContent += event.data;
          outputContent.scrollTop = outputContent.scrollHeight;
        } else if (event.type === 'stderr') {
          outputContent.textContent += `[stderr] ${event.data}`;
          outputContent.scrollTop = outputContent.scrollHeight;
        } else if (event.type === 'done') {
          const code = event.data.code;
          outputContent.textContent += `\n[Sessão encerrada com código de retorno: ${code}]`;
          outputContent.scrollTop = outputContent.scrollHeight;
          runBtn.innerHTML = code === 0 ? '<i data-lucide="check" style="width: 16px; height: 16px;"></i> Concluído com Sucesso' : '<i data-lucide="alert-triangle" style="width: 16px; height: 16px;"></i> Erro na Execução';
          runBtn.className = `run-btn ${code === 0 ? 'success' : 'error'}`;
          lucide.createIcons();
        } else if (event.type === 'error') {
          outputContent.textContent += `\n[Erro interno: ${event.data}]`;
          outputContent.scrollTop = outputContent.scrollHeight;
          runBtn.innerHTML = '<i data-lucide="alert-triangle" style="width: 16px; height: 16px;"></i> Erro na Execução';
          runBtn.className = 'run-btn error';
          lucide.createIcons();
        }
      }
    }
  } catch (err) {
    outputContent.textContent += `\nFalha na requisição de rede: ${err.message}`;
    runBtn.innerHTML = '<i data-lucide="alert-triangle" style="width: 16px; height: 16px;"></i> Erro de Rede';
    runBtn.className = 'run-btn error';
    lucide.createIcons();
  } finally {
    runBtn.disabled = false;
  }
}

function openSkillDetail(item) {
  const html = `
    <div class="detail-header">
      <span class="badge badge-skill"><i data-lucide="cpu" style="width: 12px; height: 12px;"></i> skill</span>
      <h2>${item.name}</h2>
    </div>
    <p class="detail-desc">${item.description}</p>
    <div class="usage-box">
      <p>Execute no prompt de comandos do Claude Code ou Gemini:</p>
      <div class="copy-row">
        <code class="usage-cmd">${item.command}</code>
        <button class="copy-btn" data-copy="${item.command}"><i data-lucide="copy" style="width: 12px; height: 12px; vertical-align: middle; margin-right: 4px;"></i> Copiar Comando</button>
      </div>
    </div>
  `;
  showDetail(html);
  setupCopyBtns();
  lucide.createIcons();
}

function openSpeckitDetail(item) {
  const html = `
    <div class="detail-header">
      <span class="badge badge-speckit"><i data-lucide="clipboard-list" style="width: 12px; height: 12px;"></i> speckit</span>
      <h2>${item.command}</h2>
    </div>
    <p class="detail-desc">${item.description}</p>
    <div class="usage-box">
      <p>Escreva esta diretiva no chat da Inteligência Artificial:</p>
      <div class="copy-row">
        <code class="usage-cmd">${item.command}</code>
        <button class="copy-btn" data-copy="${item.command}"><i data-lucide="copy" style="width: 12px; height: 12px; vertical-align: middle; margin-right: 4px;"></i> Copiar Prompt</button>
      </div>
    </div>
  `;
  showDetail(html);
  setupCopyBtns();
  lucide.createIcons();
}

async function openTemplateDetail(item) {
  const loadingHtml = `
    <div class="detail-header">
      <span class="badge badge-template"><i data-lucide="file-text" style="width: 12px; height: 12px;"></i> template</span>
      <h2>${item.file}</h2>
    </div>
    <p class="detail-desc">${item.description}</p>
    <div class="template-content"><em><i data-lucide="loader" class="animate-spin" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px;"></i> Carregando conteúdo do template...</em></div>
  `;
  showDetail(loadingHtml);
  lucide.createIcons();

  const res = await fetch(`${API}/template/${item.id}`);
  const data = await res.json();

  const html = `
    <div class="detail-header">
      <span class="badge badge-template"><i data-lucide="file-text" style="width: 12px; height: 12px;"></i> template</span>
      <h2>${item.file}</h2>
    </div>
    <p class="detail-desc">${item.description}</p>
    <div class="template-toolbar">
      <span>Conteúdo do template</span>
      <button class="copy-btn" data-copy="${escapeAttr(data.content)}"><i data-lucide="copy" style="width: 12px; height: 12px; vertical-align: middle; margin-right: 4px;"></i> Copiar Código</button>
    </div>
    <pre class="template-content">${escapeHtml(data.content)}</pre>
  `;
  showDetail(html);
  setupCopyBtns();
  lucide.createIcons();
}

function setupCopyBtns() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" style="width: 12px; height: 12px; vertical-align: middle; margin-right: 4px;"></i> Copiado!';
        lucide.createIcons();
        setTimeout(() => {
          btn.innerHTML = orig;
          lucide.createIcons();
        }, 1500);
      });
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;');
}

init();
