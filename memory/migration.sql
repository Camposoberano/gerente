-- ============================================================
-- MEMÓRIA DOS AGENTES — Migration Supabase (Pilar 3)
-- Execute no SQL Editor do seu Supabase para sincronizar
-- ============================================================

-- 1. Ativar extensão pgvector (se ainda não estiver ativa)
create extension if not exists vector;

-- 2. Tabela principal de memórias
create table if not exists agent_memories (
  id          uuid primary key default gen_random_uuid(),
  agent_id    text not null,                    -- ex: "frontend", "backend"
  tipo        text not null,                    -- "tarefa", "projeto", "padrao", "erro"
  titulo      text not null,                    -- resumo curto
  conteudo    text not null,                    -- conteúdo completo
  tags        text[] default '{}',              -- ["dental-jua", "react", "supabase"]
  projeto     text,                             -- nome do projeto relacionado
  embedding   vector(1536),                     -- vetor semântico (OpenAI) ou null
  importancia int default 5,                    -- 1-10, quanto mais alto mais relevante
  criado_em   timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 3. Tabela de contexto de projetos
create table if not exists agent_projects (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null unique,             -- "dental-jua", "multipost", "campo-soberano"
  descricao   text,
  stack       jsonb default '{}',               -- {"frontend": "React", "db": "Supabase", ...}
  notas       text,                             -- notas livres sobre o projeto
  ativo       boolean default true,
  criado_em   timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 4. Índice para busca por agente e tipo
create index if not exists idx_memories_agent on agent_memories(agent_id);
create index if not exists idx_memories_tipo  on agent_memories(tipo);
create index if not exists idx_memories_tags  on agent_memories using gin(tags);

-- 5. Índice vetorial para busca semântica
create index if not exists idx_memories_embedding
  on agent_memories using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- 6. Função de busca por texto (fallback sem embeddings)
create or replace function buscar_memorias_texto(
  query_text   text,
  agent_filter text default null,
  limit_count  int  default 5
)
returns setof agent_memories
language sql stable
as $$
  select *
  from agent_memories
  where
    (agent_filter is null or agent_id = agent_filter)
    and (
      titulo   ilike '%' || query_text || '%'
      or conteudo ilike '%' || query_text || '%'
      or query_text = any(tags)
    )
  order by importancia desc, criado_em desc
  limit limit_count;
$$;
