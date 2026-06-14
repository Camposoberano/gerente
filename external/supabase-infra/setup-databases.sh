#!/bin/bash
# ============================================================
# Setup inicial dos 3 databases no supabase-db
# Rodar UMA VEZ após o primeiro deploy da stack
#
# Uso: bash setup-databases.sh <SENHA_POSTGRES> <SENHA_AUTH_ADMIN> <SENHA_AUTHENTICATOR>
# Exemplo: bash setup-databases.sh minhaSenha123 senhaAuth456 senhaAuth789
# ============================================================

SENHA_POSTGRES=${1:?"Informe SENHA_POSTGRES como 1º argumento"}
SENHA_AUTH_ADMIN=${2:?"Informe SENHA_AUTH_ADMIN como 2º argumento"}
SENHA_AUTHENTICATOR=${3:?"Informe SENHA_AUTHENTICATOR como 3º argumento"}

# Encontrar o nome do container supabase-db no Swarm
CONTAINER=$(docker ps --filter name=supabase_supabase-db --format "{{.Names}}" | head -1)

if [ -z "$CONTAINER" ]; then
  echo "ERRO: Container supabase-db não encontrado. A stack está rodando?"
  exit 1
fi

echo "Container encontrado: $CONTAINER"
echo "Iniciando setup..."

docker exec -i "$CONTAINER" psql -U postgres <<SQL

-- ─────────────────────────────────────────────────────────
-- 1. Criar databases
-- ─────────────────────────────────────────────────────────
SELECT 'CREATE DATABASE soberano' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'soberano')\gexec
SELECT 'CREATE DATABASE ortovital' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ortovital')\gexec
SELECT 'CREATE DATABASE institutobelem' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'institutobelem')\gexec

-- ─────────────────────────────────────────────────────────
-- 2. Criar roles globais (compartilhadas entre databases)
-- ─────────────────────────────────────────────────────────
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'service_role') THEN
    CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'supabase_auth_admin') THEN
    CREATE ROLE supabase_auth_admin NOLOGIN CREATEROLE;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticator') THEN
    CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD '$SENHA_AUTHENTICATOR';
  END IF;
END \$\$;

GRANT anon TO authenticator;
GRANT authenticated TO authenticator;
GRANT service_role TO authenticator;
GRANT supabase_auth_admin TO authenticator;

-- ─────────────────────────────────────────────────────────
-- 3. Alterar senha do supabase_auth_admin
-- ─────────────────────────────────────────────────────────
ALTER ROLE supabase_auth_admin WITH LOGIN PASSWORD '$SENHA_AUTH_ADMIN';

SQL

# Setup por database (extensões + schemas + permissões)
setup_database() {
  local DB=$1
  echo ""
  echo "Configurando database: $DB ..."

  docker exec -i "$CONTAINER" psql -U postgres -d "$DB" <<SQL

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pgjwt";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Schema de auth (GoTrue vai criar as tabelas)
CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;

-- Permissões no schema public
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON SCHEMA public TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- Grant database para os roles
GRANT ALL PRIVILEGES ON DATABASE $DB TO supabase_auth_admin;
GRANT CONNECT ON DATABASE $DB TO authenticator;
GRANT CONNECT ON DATABASE $DB TO anon;
GRANT CONNECT ON DATABASE $DB TO authenticated;
GRANT CONNECT ON DATABASE $DB TO service_role;

SQL

  echo "Database $DB configurado."
}

setup_database "soberano"
setup_database "ortovital"
setup_database "institutobelem"

echo ""
echo "=============================================="
echo " Setup completo!"
echo " Próximo passo: os containers auth-* vão"
echo " criar as tabelas de auth automaticamente"
echo " ao subir pela primeira vez."
echo ""
echo " Depois rode as migrations do Odonto PRO"
echo " em cada database via Supabase Studio:"
echo " https://studio.soberano.pro"
echo "=============================================="
