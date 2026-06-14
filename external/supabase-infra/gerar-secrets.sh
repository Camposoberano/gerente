#!/bin/bash
# ============================================================
# Gerar secrets para o Supabase self-hosted
# Rodar na VPS: bash gerar-secrets.sh
# Requer: openssl e pip3 install PyJWT
# ============================================================

# Instalar PyJWT se necessário
pip3 install PyJWT --quiet 2>/dev/null || pip install PyJWT --quiet 2>/dev/null

generate_jwt_keys() {
  local NAME=$1
  local SECRET=$2

  python3 - <<PYEOF
import jwt, datetime
secret = "$SECRET"
now = datetime.datetime.utcnow()
exp = now + datetime.timedelta(days=3650)

anon = jwt.encode(
  {'role':'anon','iss':'supabase','iat':int(now.timestamp()),'exp':int(exp.timestamp())},
  secret, algorithm='HS256'
)
service = jwt.encode(
  {'role':'service_role','iss':'supabase','iat':int(now.timestamp()),'exp':int(exp.timestamp())},
  secret, algorithm='HS256'
)

# PyJWT pode retornar bytes ou string dependendo da versão
if isinstance(anon, bytes):
    anon = anon.decode('utf-8')
if isinstance(service, bytes):
    service = service.decode('utf-8')

print(f"ANON_KEY_{NAME.upper()}: {anon}")
print(f"SERVICE_KEY_{NAME.upper()}: {service}")
PYEOF
}

echo ""
echo "=============================================="
echo " SUPABASE SELF-HOSTED — Gerador de Secrets"
echo "=============================================="
echo ""

# Senhas compartilhadas
SENHA_POSTGRES=$(openssl rand -hex 20)
SENHA_AUTH_ADMIN=$(openssl rand -hex 16)
SENHA_AUTHENTICATOR=$(openssl rand -hex 16)

echo "=== SENHAS COMPARTILHADAS (mesmas para todos os clientes) ==="
echo "SENHA_POSTGRES_SUPABASE: $SENHA_POSTGRES"
echo "SENHA_AUTH_ADMIN:        $SENHA_AUTH_ADMIN"
echo "SENHA_AUTHENTICATOR:     $SENHA_AUTHENTICATOR"
echo ""

# Secrets por cliente
for CLIENTE in soberano ortovital institutobelem; do
  JWT_SECRET=$(openssl rand -base64 32)
  echo "=== CLIENTE: $CLIENTE ==="
  echo "JWT_SECRET_${CLIENTE^^}: $JWT_SECRET"
  generate_jwt_keys "$CLIENTE" "$JWT_SECRET"
  echo ""
done

echo "=============================================="
echo " Copie os valores acima e substitua os"
echo " <<PLACEHOLDERS>> no supabase-stack.yml"
echo "=============================================="
