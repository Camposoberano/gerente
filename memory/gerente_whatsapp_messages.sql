create table if not exists public.gerente_whatsapp_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'whatsapp_go',
  sender text,
  chat_id text,
  original_message text,
  normalized_message text,
  response_preview text,
  result_kind text,
  task_id text,
  agent_id text,
  agent_name text,
  llm_id text,
  llm_label text,
  response_source text,
  audio_detected boolean not null default false,
  transcribed boolean not null default false,
  transcription_error text,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.gerente_whatsapp_messages enable row level security;

create index if not exists gerente_whatsapp_messages_created_at_idx
  on public.gerente_whatsapp_messages (created_at desc);

create index if not exists gerente_whatsapp_messages_chat_id_idx
  on public.gerente_whatsapp_messages (chat_id);

create index if not exists gerente_whatsapp_messages_result_kind_idx
  on public.gerente_whatsapp_messages (result_kind);
