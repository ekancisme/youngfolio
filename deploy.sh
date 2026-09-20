#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${1:-youngfolio}"
DOMAIN="${2:-ltcuong24.io.vn}"
CONTAINER_PORT="${3:-5001}"
ENV_FILE="${4:-deploy.env}"
VPS_HOST="${5:-root@36.50.54.246}"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_PATH="$PROJECT_ROOT/$ENV_FILE"
ARCHIVE_PATH="/tmp/${APP_NAME}-deploy.tar.gz"
REMOTE_ROOT="/root/apps/$APP_NAME"

if [[ ! -f "$ENV_PATH" ]]; then
    echo "Error: Environment file not found: $ENV_PATH" >&2
    exit 1
fi

echo "Checking port $CONTAINER_PORT on $VPS_HOST..."
PORT_CHECK=$(ssh "$VPS_HOST" "if ss -lntH | grep -Eq '[:.]${CONTAINER_PORT}[[:space:]]'; then if docker port '$APP_NAME' 2>/dev/null | grep -q '127.0.0.1:${CONTAINER_PORT}'; then echo OWNED; else echo OCCUPIED; fi; else echo FREE; fi")

if [[ "$PORT_CHECK" == *"OCCUPIED"* ]]; then
    echo "Error: Port $CONTAINER_PORT is already occupied on the VPS. Choose another port." >&2
    exit 1
fi

rm -f "$ARCHIVE_PATH"
echo "Creating deployment archive..."
tar --exclude=node_modules --exclude=dist --exclude=.git --exclude=tmp --exclude=output --exclude=graft -czf "$ARCHIVE_PATH" -C "$PROJECT_ROOT" .

cleanup() {
    rm -f "$ARCHIVE_PATH"
}
trap cleanup EXIT

echo "Uploading deployment archive to $VPS_HOST:$REMOTE_ROOT..."
ssh "$VPS_HOST" "mkdir -p '$REMOTE_ROOT'"
scp "$ARCHIVE_PATH" "${VPS_HOST}:${REMOTE_ROOT}/source.tar.gz"

echo "Building and restarting container on VPS..."
REMOTE_COMMAND=$(cat <<'EOF'
set -eu
APP_NAME="__APP_NAME__"
CONTAINER_PORT="__CONTAINER_PORT__"
DOMAIN="__DOMAIN__"
ENV_FILE="__ENV_FILE__"
REMOTE_ROOT="__REMOTE_ROOT__"

cd "$REMOTE_ROOT"
find . -mindepth 1 -maxdepth 1 ! -name source.tar.gz -exec rm -rf -- {} +
tar -xzf source.tar.gz
rm source.tar.gz

docker build --build-arg CONTAINER_PORT=$CONTAINER_PORT -t "${APP_NAME}:latest" .
docker rm -f "$APP_NAME" >/dev/null 2>&1 || true
docker run -d --name "$APP_NAME" --restart unless-stopped --network web-net --env-file "$ENV_FILE" -p "127.0.0.1:${CONTAINER_PORT}:${CONTAINER_PORT}" "${APP_NAME}:latest"

for attempt in 1 2 3 4 5 6; do
  status=$(docker inspect --format '{{.State.Health.Status}}' "$APP_NAME" 2>/dev/null || true)
  [ "$status" = "healthy" ] && break
  sleep 3
done

if ! grep -q "^$DOMAIN {" /root/caddy/Caddyfile; then
  cp /root/caddy/Caddyfile "/root/caddy/Caddyfile.backup.$(date +%Y%m%d%H%M%S)"
  printf '\n%s {\n    reverse_proxy %s:%s\n}\n' "$DOMAIN" "$APP_NAME" "$CONTAINER_PORT" >> /root/caddy/Caddyfile
fi

docker exec caddy caddy validate --config /etc/caddy/Caddyfile
docker exec caddy caddy reload --config /etc/caddy/Caddyfile
EOF
)

# Substitute placeholders
REMOTE_COMMAND="${REMOTE_COMMAND//__APP_NAME__/$APP_NAME}"
REMOTE_COMMAND="${REMOTE_COMMAND//__CONTAINER_PORT__/$CONTAINER_PORT}"
REMOTE_COMMAND="${REMOTE_COMMAND//__DOMAIN__/$DOMAIN}"
REMOTE_COMMAND="${REMOTE_COMMAND//__ENV_FILE__/$ENV_FILE}"
REMOTE_COMMAND="${REMOTE_COMMAND//__REMOTE_ROOT__/$REMOTE_ROOT}"

ENCODED_COMMAND=$(printf '%s' "$REMOTE_COMMAND" | base64 -w 0)
ssh "$VPS_HOST" "printf '%s' '$ENCODED_COMMAND' | base64 -d | sh"

echo "✅ Deployment completed successfully: https://$DOMAIN"
