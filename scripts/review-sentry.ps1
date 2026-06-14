param(
  [string]$TimeRange = "24h",
  [string]$Environment = "prod",
  [int]$Limit = 10,
  [string]$Query = "is:unresolved",
  [switch]$IncludeDetails,
  [int]$DetailsLimit = 3,
  [string]$AuthToken = "",
  [string]$Org = "",
  [string]$Project = "",
  [string]$BaseUrl = ""
)

$ErrorActionPreference = "Stop"

function Load-DotEnv {
  param([string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) { return }
  Get-Content -LiteralPath $Path | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) { return }
    if ($line -notmatch "=") { return }

    $parts = $line -split "=", 2
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
    if (-not $key) { return }

    if (-not (Get-ChildItem "Env:$key" -ErrorAction SilentlyContinue)) {
      [Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
  }
}

function Ensure-EnvVar {
  param(
    [string]$Name,
    [string[]]$Aliases = @(),
    [string]$PreferredValue = ""
  )

  $value = $PreferredValue
  if (-not $value) {
    $value = [Environment]::GetEnvironmentVariable($Name, "Process")
  }

  if (-not $value -and $Aliases.Count -gt 0) {
    foreach ($aliasName in $Aliases) {
      $aliasValue = [Environment]::GetEnvironmentVariable($aliasName, "Process")
      if ($aliasValue) {
        $value = $aliasValue
        break
      }
    }
  }

  if (-not $value -or $value -match "^(sua_chave_aqui|seu_token_readonly|seu-org|seu-projeto)$") {
    throw "Variavel obrigatoria ausente: $Name"
  }
  return $value
}

function Invoke-SentryApi {
  param(
    [string]$ScriptPath,
    [string[]]$Arguments
  )

  $oldErrorAction = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $hadNativePref = Test-Path variable:PSNativeCommandUseErrorActionPreference
  if ($hadNativePref) {
    $oldNativePref = $PSNativeCommandUseErrorActionPreference
    $PSNativeCommandUseErrorActionPreference = $false
  }

  $outputObjects = & python $ScriptPath @Arguments 2>&1
  $exitCode = $LASTEXITCODE

  if ($hadNativePref) {
    $PSNativeCommandUseErrorActionPreference = $oldNativePref
  }
  $ErrorActionPreference = $oldErrorAction

  $rawOutput = ($outputObjects | ForEach-Object { "$_" }) -join [Environment]::NewLine
  if ($exitCode -ne 0) {
    throw "Falha ao consultar Sentry.`n$rawOutput"
  }
  if (-not $rawOutput.Trim()) {
    return @()
  }

  return ($rawOutput | ConvertFrom-Json)
}

Load-DotEnv -Path ".env"

try {
  $token = Ensure-EnvVar -Name "SENTRY_AUTH_TOKEN" -Aliases @("SENTRY_TOKEN") -PreferredValue $AuthToken
  $org = Ensure-EnvVar -Name "SENTRY_ORG" -PreferredValue $Org
  $project = Ensure-EnvVar -Name "SENTRY_PROJECT" -PreferredValue $Project
} catch {
  Write-Host "Configuração incompleta para revisão Sentry."
  Write-Host "Defina SENTRY_AUTH_TOKEN, SENTRY_ORG e SENTRY_PROJECT no .env ou passe parâmetros:"
  Write-Host "  powershell -ExecutionPolicy Bypass -File .\scripts\review-sentry.ps1 -AuthToken <token> -Org <org> -Project <project>"
  throw
}

$baseUrl = $BaseUrl
if (-not $baseUrl) {
  $baseUrl = [Environment]::GetEnvironmentVariable("SENTRY_BASE_URL", "Process")
  if (-not $baseUrl) {
    $baseUrl = "https://sentry.io"
  }
}

[Environment]::SetEnvironmentVariable("SENTRY_AUTH_TOKEN", $token, "Process")
[Environment]::SetEnvironmentVariable("SENTRY_ORG", $org, "Process")
[Environment]::SetEnvironmentVariable("SENTRY_PROJECT", $project, "Process")
[Environment]::SetEnvironmentVariable("SENTRY_BASE_URL", $baseUrl, "Process")

$sentryScript = "C:\Users\User\.codex\plugins\cache\openai-curated\sentry\fef63ecf\skills\sentry\scripts\sentry_api.py"
if (-not (Test-Path -LiteralPath $sentryScript)) {
  throw "Script do plugin Sentry não encontrado: $sentryScript"
}

$listArgs = @(
  "--base-url", $baseUrl,
  "--org", $org,
  "--project", $project,
  "list-issues",
  "--environment", $Environment,
  "--time-range", $TimeRange,
  "--limit", [Math]::Min([Math]::Max($Limit, 1), 50).ToString(),
  "--query", $Query
)

$issues = @(Invoke-SentryApi -ScriptPath $sentryScript -Arguments $listArgs)

Write-Host ""
Write-Host "Revisao Sentry"
Write-Host "Org: $org | Projeto: $project | Ambiente: $Environment | Período: $TimeRange"
Write-Host ""

if ($issues.Count -eq 0) {
  Write-Host "Nenhuma issue encontrada com o filtro informado."
  exit 0
}

$rows = $issues | ForEach-Object {
  [PSCustomObject]@{
    short_id  = $_.shortId
    status    = $_.status
    count     = $_.count
    last_seen = $_.lastSeen
    title     = ($_.title -replace "\s+", " ").Trim()
  }
}

$rows | Format-Table -AutoSize | Out-String | Write-Host

if ($IncludeDetails) {
  $detailsTake = [Math]::Min([Math]::Max($DetailsLimit, 1), $issues.Count)
  $selected = $issues | Select-Object -First $detailsTake

  Write-Host "Detalhes das top $detailsTake issues:"
  foreach ($issue in $selected) {
    $detailArgs = @(
      "--base-url", $baseUrl,
      "--org", $org,
      "issue-detail",
      "$($issue.id)"
    )
    $detail = Invoke-SentryApi -ScriptPath $sentryScript -Arguments $detailArgs

    Write-Host ""
    Write-Host "- $($detail.shortId) | $($detail.status) | count=$($detail.count)"
    Write-Host "  Título: $($detail.title)"
    Write-Host "  Última ocorrência: $($detail.lastSeen)"
    if ($detail.culprit) {
      Write-Host "  Culprit: $($detail.culprit)"
    }
    if ($detail.permalink) {
      Write-Host "  Link: $($detail.permalink)"
    }
  }
}
