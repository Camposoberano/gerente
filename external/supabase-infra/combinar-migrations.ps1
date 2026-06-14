#!/usr/bin/env pwsh
# Combina migrations do Odonto PRO em ordem correta
# Gera: migrations_combined.sql (colar no Studio SQL Editor)

$MigrationsDir = "E:\Projetos_Novos\Odonto PRO\supabase\migrations"
$Output = "E:\Projetos_Novos\supabase-infra\migrations_combined.sql"

# Ordem canônica — variantes duplicadas resolvidas, imports de dados ignorados
$Ordem = @(
  "1.sql", "2.sql", "3.sql", "4.sql", "5.sql", "6.sql", "7.sql", "8.sql", "9.sql",
  "10.sql", "11.sql", "12.sql", "13.sql", "14.sql", "15.sql", "16.sql", "17.sql",
  "18.sql", "19.sql", "20.sql", "21.sql", "22.sql", "23.sql", "24.sql", "25.sql",
  "26.sql", "27.sql", "28.sql", "29.sql", "30.sql", "31.sql", "32.sql", "33.sql", "34.sql",
  "35_standalone.sql",
  # 36_importar_dados_csv*.sql IGNORADO: import de dados de sistema antigo
  "37_remover_constraint_os_unica.sql",
  "38_consolidar_dentistas_remover_doutores.sql",
  "39_procedimentos_pt_pm.sql",                 # CRIA procedimentos_pt_pm
  "40_remover_constraint_antiga.sql",
  "50_criar_procedimentos_fixa.sql",
  "51_procedimentos_protocolo.sql",
  "52_fix_protocolo_simples.sql",
  "53_protocolo_final.sql",
  "54_fix_protocolo_definitivo.sql",
  "55_criar_protocolo_limpo.sql",
  # 60, 61 IGNORADO: scripts de verificação/setup de perfil dev
  "70_criar_resina_impressa.sql",
  "71_criar_ceramica_ortovital.sql",
  "72_criar_placa_bruxismo.sql",
  "73_criar_provisorio_adesiva.sql",
  "74_criar_lab_externo.sql",
  # 07 AQUI: cria procedimentos_pt/pm/bruxismo/etc (LIKE pt_pm/placa/lab_externo/provisorio)
  # precisa estar ANTES das 75-82 que alteram essas tabelas
  "07_reestruturacao_procedimentos.sql",
  # 06 AQUI: adiciona valor_lab em todas as tabelas (pt_pm, placa, lab_externo criados acima)
  "06_financeiro_proteses.sql",
  # 04, 05: alterações em pacientes/agendamentos (tabelas existem desde 1-34)
  "04_estruturacao.sql",
  "05_remover_lgpd_pacientes.sql",
  "75_separacao_final_procedimentos.sql",
  "76_fix_relacionamentos_e_cache.sql",
  "77_view_procedimentos_unificada.sql",        # precisa de procedimentos_pt/pm (criados em 07)
  "78_fix_compatibilidade_nuclear.sql",
  "79_fix_view_unificada_nomes.sql",
  "80_fix_resgate_legado.sql",
  "81_reorganizacao_nuclear_procedimentos.sql",
  "82_sync_os_ajustes_finais.sql",
  # "01_habilitar_realtime.sql" IGNORADO: referencia tabelas de outro projeto
  "02_rpc_calcular_comissoes.sql",
  # "03_adicionar_campos_lgpd.sql" IGNORADO
  "83_adicionar_etapas_protocolo.sql",
  "84_campos_obrigatorios_moldagem.sql",
  "85_marca_dente_e_fluxo_fixa.sql",
  "86_add_cep_to_pacientes.sql",
  "86_auditoria_integridade_os.sql",
  "20241121_create_user_profiles.sql",           # ANTES das 90-98 que referenciam user_profiles
  "90_fix_proteticos_schema_and_rls.sql",
  "91_restore_visibility_and_fix_orphans.sql",
  "92_final_structural_leveling.sql",
  "93_global_integrity_audit.sql",
  "94_view_procedimentos_next_action.sql",
  "95_add_em_andamento_to_enum.sql",
  "96_agenda_moderna.sql",
  "97_kanban_projetos.sql",
  "98_multi_kanban_schema.sql",
  "99999999999998_optimize_rls_policies.sql",
  "99999999999999_audit_log_system.sql",
  "100_fix_global_unique_constraints.sql",
  "101_fix_view_protocolo_types.sql",
  "102_orcamentos_schema.sql",
  "103_procedimentos_seed.sql",
  "104_orcamento_dente_parcelas.sql",
  "105_pacientes_campos_extras.sql"
)

$Header = @"
-- ============================================================
-- ODONTO PRO — Schema Completo (migrations combinadas)
-- Gerado em: $(Get-Date -Format 'yyyy-MM-dd HH:mm')
-- Total de arquivos: $($Ordem.Count)
--
-- COMO USAR:
-- 1. Supabase Studio → SQL Editor → New query
-- 2. Colar TODO este conteúdo
-- 3. Clicar em Run
-- ============================================================

-- ────────────────────────────────────────
-- RESET: Limpa schema público para instalação limpa
-- (remove tudo que foi criado em tentativas anteriores)
-- ────────────────────────────────────────
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON SCHEMA public TO postgres, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

"@

$Combined = $Header
$Missing = @()

foreach ($File in $Ordem) {
  $Path = Join-Path $MigrationsDir $File
  if (Test-Path $Path) {
    $Combined += "`n-- ────────────────────────────────────────`n"
    $Combined += "-- Migration: $File`n"
    $Combined += "-- ────────────────────────────────────────`n"
    $Combined += (Get-Content $Path -Raw -Encoding UTF8)
    $Combined += "`n"
    Write-Host "✅ $File"
  } else {
    $Missing += $File
    Write-Host "❌ FALTANDO: $File"
  }
}

$Combined | Out-File -FilePath $Output -Encoding UTF8

Write-Host ""
Write-Host "Arquivo gerado: $Output"
Write-Host "Tamanho: $([math]::Round((Get-Item $Output).Length / 1KB, 1)) KB"

if ($Missing.Count -gt 0) {
  Write-Host ""
  Write-Host "Arquivos faltando ($($Missing.Count)):"
  $Missing | ForEach-Object { Write-Host "  - $_" }
}
