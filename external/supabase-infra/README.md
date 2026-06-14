# Supabase Self-Hosted — 3 Clientes

Stack Docker Swarm para rodar Supabase self-hosted com 3 databases isolados
na mesma VPS que já tem Chatwoot, N8N, MultiPost e Traefik.

## Arquitetura

```
api-soberano.soberano.pro     → auth-soberano + rest-soberano  → db: soberano
api-ortovital.soberano.pro    → auth-ortovital + rest-ortovital → db: ortovital
api-institutobelem.soberano.pro → auth-ib + rest-ib            → db: institutobelem
studio.soberano.pro           → Supabase Studio (admin)
                                          ↕
                              supabase-db (PostgreSQL 15, 1 container)
```

Sem Kong. Traefik faz o roteamento diretamente por PathPrefix.

## Pré-requisitos

- Docker Swarm ativo
- Rede `camposoberano` criada
- Traefik rodando com `letsencryptresolver`
- 4 entradas DNS apontando para o IP da VPS

## Passo a Passo

### 1. DNS (no painel do seu domínio)

Criar 4 registros tipo A apontando para o IP da VPS:
```
studio.soberano.pro          → IP_DA_VPS
api-soberano.soberano.pro    → IP_DA_VPS
api-ortovital.soberano.pro   → IP_DA_VPS
api-institutobelem.soberano.pro → IP_DA_VPS
```

### 2. Gerar Secrets (na VPS via SSH)

```bash
# Copiar este arquivo para a VPS
scp gerar-secrets.sh root@IP_DA_VPS:~/supabase/

# Na VPS:
cd ~/supabase
bash gerar-secrets.sh > meus-secrets.txt
cat meus-secrets.txt
```

Anote todos os valores gerados.

### 3. Criar volume do Postgres

```bash
# Na VPS:
docker volume create supabase_db_data
```

### 4. Preencher o supabase-stack.yml

Substituir todos os `<<PLACEHOLDERS>>`:

| Placeholder | Valor |
|---|---|
| `<<SENHA_POSTGRES_SUPABASE>>` | gerado no passo 2 |
| `<<SENHA_AUTH_ADMIN>>` | gerado no passo 2 |
| `<<SENHA_AUTHENTICATOR>>` | gerado no passo 2 |
| `<<JWT_SECRET_SOBERANO>>` | gerado no passo 2 |
| `<<ANON_KEY_SOBERANO>>` | gerado no passo 2 |
| `<<SERVICE_KEY_SOBERANO>>` | gerado no passo 2 |
| `<<JWT_SECRET_ORTOVITAL>>` | gerado no passo 2 |
| `<<ANON_KEY_ORTOVITAL>>` | gerado no passo 2 |
| `<<SERVICE_KEY_ORTOVITAL>>` | gerado no passo 2 |
| `<<JWT_SECRET_INSTITUTOBELEM>>` | gerado no passo 2 |
| `<<ANON_KEY_INSTITUTOBELEM>>` | gerado no passo 2 |
| `<<SERVICE_KEY_INSTITUTOBELEM>>` | gerado no passo 2 |
| `<<URL_APP_SOBERANO>>` | URL do app React do Soberano |
| `<<URL_APP_ORTOVITAL>>` | URL do app React do Ortovital |
| `<<URL_APP_INSTITUTOBELEM>>` | URL do app React do Instituto Belém |
| `<<SMTP_PASS_GMAIL>>` | `xftuliqqasjrzbor` (já tem no Chatwoot) |

### 5. Deploy via Portainer

1. Abrir Portainer → Stacks → Add Stack
2. Nome: `supabase`
3. Colar o conteúdo do `supabase-stack.yml` preenchido
4. Deploy

### 6. Setup dos databases (rodar 1x após deploy)

```bash
# Na VPS, aguardar supabase-db estar healthy (~30s), depois:
bash setup-databases.sh SENHA_POSTGRES SENHA_AUTH_ADMIN SENHA_AUTHENTICATOR
```

### 7. Verificar

```bash
# Studio deve abrir em:
# https://studio.soberano.pro

# Testar API:
curl https://api-soberano.soberano.pro/rest/v1/ \
  -H "apikey: ANON_KEY_SOBERANO"
# Retorna: {} ou lista de tabelas
```

### 8. Atualizar .env dos projetos React

```env
# E:\Projetos_Novos\soberano\.env
VITE_SUPABASE_URL=https://api-soberano.soberano.pro
VITE_SUPABASE_PUBLISHABLE_KEY=ANON_KEY_SOBERANO

# E:\Projetos_Novos\Ortovital\.env
VITE_SUPABASE_URL=https://api-ortovital.soberano.pro
VITE_SUPABASE_PUBLISHABLE_KEY=ANON_KEY_ORTOVITAL

# E:\Projetos_Novos\Instituto Belem\.env
VITE_SUPABASE_URL=https://api-institutobelem.soberano.pro
VITE_SUPABASE_PUBLISHABLE_KEY=ANON_KEY_INSTITUTOBELEM
```

### 9. Rodar migrations do Odonto PRO

Após atualizar os .env, rodar as migrations SQL do projeto em cada database.
Podem ser rodadas via Studio (SQL Editor) ou via Supabase CLI apontando para o self-hosted.

### 10. Migrar dados do Supabase Cloud (opcional)

```bash
# Dump do banco atual (na sua máquina local, requer psql instalado)
pg_dump "postgresql://postgres.ebpuykdqoqkmshfwrchd:SENHA_DB@aws-0-sa-east-1.pooler.supabase.com:5432/postgres" \
  --schema=public --data-only --no-owner -f dump_soberano.sql

# Restaurar no self-hosted (expor a porta 5432 do supabase-db temporariamente)
psql "postgresql://postgres:SENHA_POSTGRES_SUPABASE@IP_DA_VPS:5432/soberano" < dump_soberano.sql
```

## Integração com N8N

N8N já está na rede `camposoberano`. Pode acessar o Supabase diretamente:

**Via HTTP (REST API):**
- URL: `http://rest-soberano:3000`
- Header: `Authorization: Bearer SERVICE_KEY_SOBERANO`

**Via Postgres node (acesso direto ao banco):**
- Host: `supabase-db`
- Port: `5432`
- Database: `soberano` (ou `ortovital` / `institutobelem`)
- User: `postgres`
- Password: `SENHA_POSTGRES_SUPABASE`

## Troubleshooting

**auth-soberano não sobe:** Verificar se o schema `auth` foi criado no database. Rodar `setup-databases.sh` novamente.

**rest-soberano retorna 401:** JWT_SECRET no PostgREST deve ser igual ao usado para gerar o ANON_KEY. Verificar se não há espaços extras.

**Studio não conecta:** Verificar se `supabase-meta` está rodando e se `PG_META_DB_NAME=soberano` está correto.

**Porta 5432 conflito:** O `supabase-db` não expõe porta externamente (sem `ports:`), apenas acesso interno via rede Docker.
