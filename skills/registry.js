// skills/registry.js
// Registro de ferramentas locais (Skills) que os agentes do Pilar 2 podem executar

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const ALLOWED_DIR = path.resolve(process.cwd());
const SHELL_META_CHARS = /[|&;<>`]/;
const SAFE_GIT_SUBCOMMANDS = new Set([
  "status",
  "diff",
  "log",
  "show",
  "branch",
  "rev-parse",
  "ls-files",
]);

function resolveWithinWorkspace(inputPath) {
  if (!inputPath || typeof inputPath !== "string") {
    throw new Error("Caminho inválido.");
  }

  const targetPath = path.resolve(ALLOWED_DIR, inputPath);
  const relativePath = path.relative(ALLOWED_DIR, targetPath);
  const isOutside = relativePath.startsWith("..") || path.isAbsolute(relativePath);

  if (isOutside) {
    throw new Error("Acesso Negado: Caminho fora do diretório do projeto.");
  }

  return targetPath;
}

function tokenizeCommand(command) {
  const tokens = command.match(/"[^"]*"|'[^']*'|[^\s]+/g) || [];
  return tokens.map((token) => {
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'"))
    ) {
      return token.slice(1, -1);
    }
    return token;
  });
}

function validateCommand(command) {
  const rawCommand = typeof command === "string" ? command.trim() : "";
  if (!rawCommand) {
    throw new Error("command é obrigatório.");
  }
  if (SHELL_META_CHARS.test(rawCommand) || /[\r\n]/.test(rawCommand)) {
    throw new Error("Comando rejeitado: caracteres de shell não permitidos.");
  }

  const tokens = tokenizeCommand(rawCommand);
  if (tokens.length === 0) {
    throw new Error("Comando inválido.");
  }

  const executable = tokens[0];
  const args = tokens.slice(1);

  if (executable === "npm") {
    const blockedNpmFlags = args.some((arg) =>
      arg === "-g" ||
      arg === "--global" ||
      arg === "--prefix" ||
      arg.startsWith("--prefix=") ||
      arg === "--location=global"
    );
    if (blockedNpmFlags) {
      throw new Error("Comando npm rejeitado: flags globais não são permitidas.");
    }
    return { executable, args };
  }

  if (executable === "node") {
    if (args.length === 0) {
      throw new Error("Comando node rejeitado: informe um script do workspace.");
    }
    if (args[0] === "-e" || args[0] === "--eval" || args[0] === "-p" || args[0] === "--print") {
      throw new Error("Comando node rejeitado: modo inline não é permitido.");
    }
    const scriptPath = resolveWithinWorkspace(args[0]);
    if (!fs.existsSync(scriptPath) || !fs.statSync(scriptPath).isFile()) {
      throw new Error("Comando node rejeitado: script não encontrado no workspace.");
    }
    return { executable, args };
  }

  if (executable === "git") {
    if (args.length === 0 || !SAFE_GIT_SUBCOMMANDS.has(args[0])) {
      throw new Error("Comando git rejeitado: apenas subcomandos de leitura são permitidos.");
    }
    return { executable, args };
  }

  throw new Error(`Comando "${executable}" rejeitado. Permitidos: npm, node, git.`);
}

export const TOOLS = {
  readFile: {
    name: "readFile",
    description: "Lê o conteúdo completo de um arquivo do workspace para entender seu contexto.",
    parameters: {
      filePath: "Caminho relativo do arquivo no workspace"
    },
    execute: (args) => {
      const filePath = args.filePath || args.path;
      if (!filePath) throw new Error("filePath é obrigatório.");
      
      const targetPath = resolveWithinWorkspace(filePath);
      
      if (!fs.existsSync(targetPath)) {
        return `[ERRO] Arquivo não encontrado no caminho: ${filePath}`;
      }
      
      const stat = fs.statSync(targetPath);
      if (stat.size > 500_000) {
        return `[ERRO] Arquivo muito grande (>500kb).`;
      }
      
      const content = fs.readFileSync(targetPath, 'utf8');
      return content;
    }
  },

  writeFile: {
    name: "writeFile",
    description: "Cria ou edita um arquivo no workspace com o conteúdo fornecido.",
    parameters: {
      filePath: "Caminho relativo do arquivo no workspace (ex: src/App.jsx)",
      content: "Conteúdo completo em formato de texto para gravar no arquivo"
    },
    execute: (args) => {
      const filePath = args.filePath || args.path;
      const content = args.content;
      if (!filePath || content === undefined) {
        throw new Error("filePath e content são obrigatórios.");
      }
      
      const targetPath = resolveWithinWorkspace(filePath);
      
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, content, 'utf8');
      
      return `[SUCESSO] Arquivo gravado com êxito em: ${filePath} (${Buffer.byteLength(content, 'utf8')} bytes)`;
    }
  },

  listFiles: {
    name: "listFiles",
    description: "Lista arquivos e subpastas de um diretório no workspace.",
    parameters: {
      directoryPath: "Caminho relativo da pasta a listar (padrão: '.')",
      recursive: "Se true, lista recursivamente (padrão: false)"
    },
    execute: (args) => {
      const dirPath = args.directoryPath || args.path || ".";
      const recursive = !!args.recursive;
      
      const targetPath = resolveWithinWorkspace(dirPath);
      
      if (!fs.existsSync(targetPath)) {
        return `[ERRO] Diretório não encontrado: ${dirPath}`;
      }
      
      const ignore = ["node_modules", ".git", ".next", "dist", "build", "logs", "output", ".agents"];
      
      function scan(dir, level = 0) {
        if (level > 4) return [];
        const items = fs.readdirSync(dir);
        const result = [];
        for (const item of items) {
          if (ignore.some(i => item.startsWith(i))) continue;
          const full = path.join(dir, item);
          const stat = fs.statSync(full);
          const rel = path.relative(targetPath, full);
          
          if (stat.isDirectory()) {
            result.push({ tipo: "pasta", path: rel + "/" });
            if (recursive) {
              result.push(...scan(full, level + 1));
            }
          } else {
            result.push({
              tipo: "arquivo",
              path: rel,
              tamanho: `${Math.round(stat.size / 1024)}kb`
            });
          }
        }
        return result;
      }
      
      const list = scan(targetPath);
      return JSON.stringify({ directory: targetPath, items: list }, null, 2);
    }
  },

  runCommand: {
    name: "runCommand",
    description: "Executa comandos seguros no terminal dentro do workspace (compilar, rodar testes, lint).",
    parameters: {
      command: "Comando de terminal seguro (ex: npm test, eslint, npm run build)"
    },
    execute: (args) => {
      const { command } = args;
      const { executable, args: commandArgs } = validateCommand(command);
      
      try {
        const output = execFileSync(executable, commandArgs, {
          cwd: ALLOWED_DIR,
          timeout: 30_000,
          maxBuffer: 1024 * 1024,
          encoding: 'utf8',
          shell: false,
        });
        return `[SUCESSO]\nSaída do terminal:\n${output.trim()}`;
      } catch (err) {
        return `[FALHA] O comando retornou erro:\n${err.stdout || ''}\n${err.stderr || err.message}`;
      }
    }
  },

  searchFiles: {
    name: "searchFiles",
    description: "Busca um padrão de texto (como uma palavra-chave) dentro de arquivos do projeto.",
    parameters: {
      pattern: "Termo de pesquisa ou padrão",
      directory: "Caminho da subpasta onde pesquisar (padrão: '.')",
      extension: "Filtrar por extensão de arquivo (ex: '.js')"
    },
    execute: (args) => {
      const pattern = args.pattern;
      const directory = args.directory || ".";
      const extension = args.extension;
      
      if (!pattern) throw new Error("pattern é obrigatório.");
      
      const targetPath = resolveWithinWorkspace(directory);
      
      const results = [];
      
      function search(dir) {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir);
        for (const item of items) {
          if (["node_modules", ".git", "dist", "build", "logs", "output", ".agents"].includes(item)) continue;
          const full = path.join(dir, item);
          const stat = fs.statSync(full);
          if (stat.isDirectory()) {
            search(full);
          } else {
            if (extension && !item.endsWith(extension)) continue;
            if (stat.size > 200_000) continue;
            try {
              const content = fs.readFileSync(full, 'utf8');
              const lines = content.split('\n');
              lines.forEach((line, idx) => {
                if (line.toLowerCase().includes(pattern.toLowerCase())) {
                  results.push({
                    arquivo: path.relative(ALLOWED_DIR, full),
                    linha: idx + 1,
                    conteudo: line.trim()
                  });
                }
              });
            } catch (e) {}
          }
        }
      }
      
      search(targetPath);
      return JSON.stringify({
        pattern,
        total: results.length,
        resultados: results.slice(0, 30) // limita a 30 resultados
      }, null, 2);
    }
  },

  appendFile: {
    name: "appendFile",
    description: "Adiciona conteúdo ao final de um arquivo existente (como logs ou configurações).",
    parameters: {
      filePath: "Caminho relativo do arquivo",
      content: "Conteúdo a ser anexado ao final"
    },
    execute: (args) => {
      const filePath = args.filePath || args.path;
      const content = args.content;
      if (!filePath || content === undefined) {
        throw new Error("filePath e content são obrigatórios.");
      }
      
      const targetPath = resolveWithinWorkspace(filePath);
      
      if (!fs.existsSync(targetPath)) {
        return `[ERRO] Arquivo não encontrado: ${filePath}. Use writeFile para criar.`;
      }
      
      fs.appendFileSync(targetPath, "\n" + content, 'utf8');
      return `[SUCESSO] Conteúdo anexado ao arquivo: ${filePath}`;
    }
  },

  getProjectInfo: {
    name: "getProjectInfo",
    description: "Retorna um resumo do projeto atual: package.json, estrutura de pastas raiz e variáveis de ambiente disponíveis.",
    parameters: {},
    execute: () => {
      const info = { path: ALLOWED_DIR };
      
      // Ler package.json
      const pkgPath = path.join(ALLOWED_DIR, "package.json");
      if (fs.existsSync(pkgPath)) {
        try {
          info.package = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        } catch {
          info.package = "Erro ao carregar package.json";
        }
      }
      
      // Ler .env (apenas chaves, sem expor os segredos!)
      const envPath = path.join(ALLOWED_DIR, ".env");
      if (fs.existsSync(envPath)) {
        try {
          const envContent = fs.readFileSync(envPath, 'utf8');
          info.env_keys = envContent
            .split("\n")
            .filter(l => l.includes("=") && !l.startsWith("#"))
            .map(l => l.split("=")[0].trim());
        } catch {}
      }
      
      // Estrutura raiz
      try {
        info.estrutura_raiz = fs.readdirSync(ALLOWED_DIR).filter(i => !["node_modules", ".git", ".agents"].includes(i));
      } catch {}
      
      return JSON.stringify(info, null, 2);
    }
  }
};
