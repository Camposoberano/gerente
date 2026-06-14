param(
  [ValidateSet("user", "project")]
  [string]$Scope = "user",
  [string[]]$Agents = @("codex", "cursor", "github-copilot"),
  [string]$SourceRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"
$script:GhCommand = $null

function Ensure-GhSkillAvailable {
  $gh = Get-Command gh -ErrorAction SilentlyContinue
  if (-not $gh) {
    $fallbacks = @(
      "C:\Program Files\GitHub CLI\gh.exe",
      "C:\Program Files (x86)\GitHub CLI\gh.exe",
      "$env:LOCALAPPDATA\Programs\GitHub CLI\gh.exe"
    )
    $ghPath = $fallbacks | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
    if (-not $ghPath) {
      throw "GitHub CLI (gh) não encontrado. Instale o gh >= 2.90 para usar 'gh skill'."
    }
    $script:GhCommand = $ghPath
  } else {
    $script:GhCommand = $gh.Path
  }

  & $script:GhCommand skill --help *> $null
  if ($LASTEXITCODE -ne 0) {
    throw "Seu gh não possui o comando 'gh skill'. Atualize para a versão 2.90+."
  }
}

function Install-BaseGerenteArtifacts {
  param(
    [string]$RootPath
  )

  if ($Scope -ne "user") {
    return
  }

  $globalInstaller = Join-Path $PSScriptRoot "install-gerente-global.ps1"
  if (-not (Test-Path -LiteralPath $globalInstaller)) {
    Write-Warning "Instalador base não encontrado: $globalInstaller"
    return
  }

  & powershell -ExecutionPolicy Bypass -File $globalInstaller -SourceRoot $RootPath
}

function Install-Skill {
  param(
    [string]$RepositoryPath,
    [string]$SkillPath,
    [string]$AgentHost,
    [string]$InstallScope
  )

  $args = @(
    "skill",
    "install",
    $RepositoryPath,
    $SkillPath,
    "--from-local",
    "--agent",
    $AgentHost,
    "--scope",
    $InstallScope,
    "-f"
  )

  $oldErrorAction = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $hadNativePref = Test-Path variable:PSNativeCommandUseErrorActionPreference
  if ($hadNativePref) {
    $oldNativePref = $PSNativeCommandUseErrorActionPreference
    $PSNativeCommandUseErrorActionPreference = $false
  }

  $outputObjects = & $script:GhCommand @args 2>&1
  $exitCode = $LASTEXITCODE

  if ($hadNativePref) {
    $PSNativeCommandUseErrorActionPreference = $oldNativePref
  }
  $ErrorActionPreference = $oldErrorAction

  $output = ($outputObjects | ForEach-Object { "$_" }) -join [Environment]::NewLine
  $ok = $exitCode -eq 0

  return @{
    Ok = $ok
    Output = "$output".Trim()
    Skill = $SkillPath
    Agent = $AgentHost
  }
}

Ensure-GhSkillAvailable
Install-BaseGerenteArtifacts -RootPath $SourceRoot

$skillPaths = @(
  "gerente",
  "gerente-dispatch",
  "github-triage",
  "github-reviews",
  "github-ci",
  "release-ops"
)

$successes = New-Object System.Collections.Generic.List[string]
$failures = New-Object System.Collections.Generic.List[string]

foreach ($agent in $Agents) {
  foreach ($skillPath in $skillPaths) {
    $result = Install-Skill -RepositoryPath $SourceRoot -SkillPath $skillPath -AgentHost $agent -InstallScope $Scope
    if ($result.Ok) {
      $successes.Add("[$agent] $skillPath")
      Write-Host "✅ [$agent] $skillPath"
    } else {
      $failures.Add("[$agent] $skillPath`n$($result.Output)")
      Write-Warning "Falhou: [$agent] $skillPath"
    }
  }
}

Write-Host ""
Write-Host "Resumo:"
Write-Host "  Sucessos: $($successes.Count)"
Write-Host "  Falhas:   $($failures.Count)"

if ($successes.Count -gt 0) {
  Write-Host ""
  Write-Host "Skills instaladas:"
  foreach ($item in $successes) {
    Write-Host "  - $item"
  }
}

if ($failures.Count -gt 0) {
  Write-Host ""
  Write-Host "Falhas detalhadas:"
  foreach ($item in $failures) {
    Write-Host "------------------------------"
    Write-Host $item
  }
  exit 1
}
