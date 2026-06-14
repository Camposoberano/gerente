param(
  [string]$SourceRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"

function Ensure-Dir {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Copy-Checked {
  param(
    [string]$Source,
    [string]$Target
  )
  if (-not (Test-Path -LiteralPath $Source)) {
    throw "Arquivo de origem não encontrado: $Source"
  }
  Ensure-Dir -Path (Split-Path -Parent $Target)
  Copy-Item -LiteralPath $Source -Destination $Target -Force
}

$userProfile = [Environment]::GetFolderPath("UserProfile")
$appData = [Environment]::GetFolderPath("ApplicationData")

$sourceVsCodePrompt = Join-Path $SourceRoot ".github\prompts\gerente.prompt.md"
$sourceCursorCommand = Join-Path $SourceRoot ".cursor\commands\gerente.md"
$sourceCodexSkill = Join-Path $SourceRoot ".codex\skills\gerente\SKILL.md"

$targetVsCodePrompt = Join-Path $appData "Code\User\prompts\gerente.prompt.md"
$targetCursorCommand = Join-Path $userProfile ".cursor\commands\gerente.md"
$targetCodexSkill = Join-Path $userProfile ".codex\skills\gerente\SKILL.md"
$targetAgentsSkill = Join-Path $userProfile ".agents\skills\gerente\SKILL.md"

Copy-Checked -Source $sourceVsCodePrompt -Target $targetVsCodePrompt
Copy-Checked -Source $sourceCursorCommand -Target $targetCursorCommand
Copy-Checked -Source $sourceCodexSkill -Target $targetCodexSkill
Copy-Checked -Source $sourceCodexSkill -Target $targetAgentsSkill

Write-Host "✅ Instalação global concluída:"
Write-Host "   VS Code: $targetVsCodePrompt"
Write-Host "   Cursor:  $targetCursorCommand"
Write-Host "   Codex:   $targetCodexSkill"
Write-Host "   Agents:  $targetAgentsSkill"
