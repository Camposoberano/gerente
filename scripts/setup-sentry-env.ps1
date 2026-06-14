param(
  [string]$AuthToken = "",
  [string]$Org = "",
  [string]$Project = "",
  [string]$BaseUrl = "https://sentry.io",
  [switch]$RunReview
)

$ErrorActionPreference = "Stop"

function Prompt-IfMissing {
  param(
    [string]$CurrentValue,
    [string]$PromptLabel,
    [switch]$Secret
  )

  if ($CurrentValue) {
    return $CurrentValue
  }

  if ($Secret) {
    $secure = Read-Host -Prompt $PromptLabel -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try {
      return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    } finally {
      if ($bstr -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
      }
    }
  }

  return (Read-Host -Prompt $PromptLabel).Trim()
}

$AuthToken = Prompt-IfMissing -CurrentValue $AuthToken -PromptLabel "Digite SENTRY_AUTH_TOKEN (read-only)" -Secret
$Org = Prompt-IfMissing -CurrentValue $Org -PromptLabel "Digite SENTRY_ORG"
$Project = Prompt-IfMissing -CurrentValue $Project -PromptLabel "Digite SENTRY_PROJECT"
$BaseUrl = Prompt-IfMissing -CurrentValue $BaseUrl -PromptLabel "Digite SENTRY_BASE_URL (Enter para https://sentry.io)"

if (-not $BaseUrl) {
  $BaseUrl = "https://sentry.io"
}

if (-not $AuthToken -or -not $Org -or -not $Project) {
  throw "Valores obrigatorios ausentes. Informe SENTRY_AUTH_TOKEN, SENTRY_ORG e SENTRY_PROJECT."
}

[Environment]::SetEnvironmentVariable("SENTRY_AUTH_TOKEN", $AuthToken, "User")
[Environment]::SetEnvironmentVariable("SENTRY_ORG", $Org, "User")
[Environment]::SetEnvironmentVariable("SENTRY_PROJECT", $Project, "User")
[Environment]::SetEnvironmentVariable("SENTRY_BASE_URL", $BaseUrl, "User")

[Environment]::SetEnvironmentVariable("SENTRY_AUTH_TOKEN", $AuthToken, "Process")
[Environment]::SetEnvironmentVariable("SENTRY_ORG", $Org, "Process")
[Environment]::SetEnvironmentVariable("SENTRY_PROJECT", $Project, "Process")
[Environment]::SetEnvironmentVariable("SENTRY_BASE_URL", $BaseUrl, "Process")

Write-Host ""
Write-Host "Variaveis Sentry configuradas com sucesso no escopo USER."
Write-Host "Org: $Org"
Write-Host "Project: $Project"
Write-Host "BaseUrl: $BaseUrl"
Write-Host ""

if ($RunReview) {
  $reviewScript = Join-Path $PSScriptRoot "review-sentry.ps1"
  & powershell -ExecutionPolicy Bypass -File $reviewScript -Limit 10 -IncludeDetails -DetailsLimit 3
}

