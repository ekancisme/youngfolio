param(
    [Parameter(Mandatory = $true)][string]$AppName,
    [Parameter(Mandatory = $true)][string]$Domain,
    [Parameter(Mandatory = $true)][ValidateRange(1024, 65535)][int]$ContainerPort,
    [Parameter(Mandatory = $true)][string]$EnvFile,
    [string]$VpsHost = "root@36.50.54.246"
)

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot
$envPath = Join-Path $projectRoot $EnvFile
$archivePath = Join-Path ([System.IO.Path]::GetTempPath()) "$AppName-deploy.tar.gz"
$remoteRoot = "/root/apps/$AppName"

if (-not (Test-Path -LiteralPath $envPath)) {
    throw "Environment file not found: $envPath"
}

Write-Host "Checking port $ContainerPort on $VpsHost..."
$portCheck = ssh -o BatchMode=yes $VpsHost "if ss -lntH | grep -Eq '[:.]$ContainerPort[[:space:]]'; then if docker port '$AppName' 2>/dev/null | grep -q '127.0.0.1:$ContainerPort'; then echo OWNED; else echo OCCUPIED; fi; else echo FREE; fi"
if ($LASTEXITCODE -ne 0) { throw "Could not inspect ports on the VPS." }
if ($portCheck -contains "OCCUPIED") { throw "Port $ContainerPort is already occupied on the VPS. Choose another port." }

if (Test-Path -LiteralPath $archivePath) { Remove-Item -LiteralPath $archivePath -Force }
Push-Location $projectRoot
try {
    tar --exclude=node_modules --exclude=dist --exclude=.git -czf $archivePath .
} finally {
    Pop-Location
}

try {
    ssh -o BatchMode=yes $VpsHost "mkdir -p '$remoteRoot'"
    if ($LASTEXITCODE -ne 0) { throw "Could not create the remote application directory." }
    scp -q $archivePath "${VpsHost}:${remoteRoot}/source.tar.gz"
    if ($LASTEXITCODE -ne 0) { throw "Could not upload the deployment archive." }

    $remoteCommand = @"
set -eu
cd '$remoteRoot'
find . -mindepth 1 -maxdepth 1 ! -name source.tar.gz -exec rm -rf -- {} +
tar -xzf source.tar.gz
rm source.tar.gz
docker build --network=host --build-arg CONTAINER_PORT=$ContainerPort -t '${AppName}:latest' .
docker rm -f '$AppName' >/dev/null 2>&1 || true
docker run -d --name '$AppName' --restart unless-stopped --network web-net --env-file '$EnvFile' -p '127.0.0.1:${ContainerPort}:${ContainerPort}' '${AppName}:latest'
for attempt in 1 2 3 4 5 6; do
  status=`$(docker inspect --format '{{.State.Health.Status}}' '$AppName' 2>/dev/null || true)
  [ "`$status" = healthy ] && break
  sleep 3
done
[ "`$(docker inspect --format '{{.State.Health.Status}}' '$AppName')" = healthy ]
if ! grep -q '^$Domain {' /root/caddy/Caddyfile; then
  cp /root/caddy/Caddyfile "/root/caddy/Caddyfile.backup.`$(date +%Y%m%d%H%M%S)"
  printf '\n$Domain {\n    reverse_proxy ${AppName}:$ContainerPort\n}\n' >> /root/caddy/Caddyfile
fi
docker exec caddy caddy validate --config /etc/caddy/Caddyfile
docker exec caddy caddy reload --config /etc/caddy/Caddyfile
"@
    $normalizedCommand = $remoteCommand.Replace("`r", "")
    $encodedCommand = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($normalizedCommand))
    ssh -o BatchMode=yes $VpsHost "printf '%s' '$encodedCommand' | base64 -d | sh"
    if ($LASTEXITCODE -ne 0) { throw "Remote deployment failed." }
} finally {
    if (Test-Path -LiteralPath $archivePath) { Remove-Item -LiteralPath $archivePath -Force }
}

Write-Host "Deployment completed: https://$Domain"
