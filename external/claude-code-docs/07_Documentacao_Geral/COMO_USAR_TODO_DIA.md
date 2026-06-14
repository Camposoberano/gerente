# 🦷 SISTEMA ORTOVITAL - GUIA DE USO DIÁRIO

## 🚀 INICIAR O SISTEMA

### **Todos os dias, faça isso:**

1. Vá até: `C:\Users\User\`
2. **Duplo clique** em: `PASSO_3_RODAR.bat`
3. Aguarde aparecer "Ready"
4. Abra navegador: `http://localhost:3001`

✅ **Pronto! Sistema rodando!**

---

## 📋 FUNCIONALIDADES DISPONÍVEIS

### **1. VER ESTATÍSTICAS (Dashboard)**

**URL:** `http://localhost:3001`

**O que você vê:**
- Total de Pacientes
- Procedimentos em Andamento
- Procedimentos Concluídos
- Próximas Entregas
- Gráfico por tipo de procedimento

**Atualiza automaticamente!**

---

### **2. CADASTRAR NOVO PACIENTE**

**Passo a passo:**

1. Dashboard → Botão **"+ Novo Paciente"**
2. Preencher formulário:
   - **OS** (Ordem de Serviço) - obrigatório
   - **CPF** - obrigatório
   - **Nome** - obrigatório
   - **Procedimento** - escolher tipo
   - **Arcada ou Dente** - conforme procedimento
   - **Datas**
   - **Profissionais** (Doutor, Protético)

3. Clicar em **"Cadastrar Paciente"**

**O sistema automaticamente:**
- ✅ Salva no banco
- ✅ Cria registro na tabela específica (ex: ppr, pt_pm)
- ✅ Define todas etapas como "Pendente"
- ✅ Atualiza estatísticas

---

### **3. VER TODOS OS PACIENTES** (Supabase)

Por enquanto, para ver todos os pacientes em detalhes:

1. Acesse: https://app.supabase.com
2. Entre no projeto "ortovital"
3. Menu lateral → **"Table Editor"**
4. Clique em **"cadastro_pacientes"**

**Você verá:**
- Todos os pacientes cadastrados
- Dados completos
- Pode editar, filtrar, buscar

---

### **4. ATUALIZAR ETAPAS DE UM PROCEDIMENTO**

**Exemplo: Marcar uma etapa como finalizada**

**Via Supabase:**

1. Vá em: https://app.supabase.com
2. Table Editor → Escolha a tabela (ex: `ppr`)
3. Encontre a OS do paciente
4. Clique na célula da etapa (ex: "moldagem")
5. Mude de "Pendente" para "Finalizado"
6. Aperte Enter

**O sistema automaticamente:**
- ✅ Registra a mudança no log (se configurado)
- ✅ Atualiza o progresso
- ✅ Pode disparar notificações (se configurado)

---

### **5. VER PROCEDIMENTOS EM ANDAMENTO**

**Via SQL no Supabase:**

1. Supabase → SQL Editor
2. Cole este comando:

```sql
SELECT * FROM v_procedimentos_andamento;
```

3. Clique em "Run"

**Retorna:**
- Todos os procedimentos que estão "Em andamento"
- OS, Nome, CPF, Procedimento, Doutores

---

### **6. VER PRÓXIMAS ENTREGAS**

**Via SQL no Supabase:**

```sql
SELECT * FROM v_proximas_entregas;
```

**Retorna:**
- Entregas agendadas
- Data de entrega
- Paciente e procedimento

---

### **7. VER RESUMO DO DASHBOARD**

**Via SQL no Supabase:**

```sql
SELECT * FROM v_dashboard_resumo;
```

**Retorna:**
- Total por tipo de procedimento
- Quantos em andamento
- Quantos concluídos

---

## 🔍 CONSULTAS ÚTEIS

### **Buscar um paciente específico:**

```sql
SELECT * FROM cadastro_pacientes
WHERE nome ILIKE '%parte do nome%';
```

### **Ver todos os PPR:**

```sql
SELECT * FROM ppr ORDER BY os;
```

### **Ver detalhes completos de uma OS:**

```sql
SELECT * FROM buscar_procedimento_completo(100);
```
(Substitua 100 pela OS desejada)

### **Contar pacientes por doutor:**

```sql
SELECT
    doutores,
    COUNT(*) as total
FROM cadastro_pacientes
GROUP BY doutores
ORDER BY total DESC;
```

### **Ver mudanças recentes:**

```sql
SELECT * FROM cadastro_pacientes
ORDER BY updated_at DESC
LIMIT 10;
```

---

## ⚠️ IMPORTANTE - PARAR O SERVIDOR

**Quando terminar de usar:**

1. Vá na janela preta (terminal) que ficou aberta
2. Aperte **Ctrl+C**
3. Confirme (se perguntar): **S** e Enter
4. Pode fechar a janela

**OU simplesmente feche a janela preta!**

---

## 🔄 ROTINA DIÁRIA SUGERIDA

### **MANHÃ (8h):**
1. Iniciar sistema (PASSO_3_RODAR.bat)
2. Ver dashboard para overview do dia
3. Cadastrar novos pacientes

### **DURANTE O DIA:**
- Atualizar etapas conforme progresso
- Cadastrar novos procedimentos
- Ver próximas entregas

### **FINAL DO DIA (18h):**
1. Verificar o que foi concluído
2. Ver o que está pendente
3. Fechar o servidor (Ctrl+C)

---

## 📊 O QUE CADA PROCEDIMENTO FAZ

### **PPR** (Prótese Parcial Removível)
**11 etapas:**
1. Moldagem
2. VG (Vazamento de Gesso)
3. Envio Metal Lab
4. Recebimento Metal Lab
5. Prova Metal
6. Plano de Cera
7. Prova de Cera
8. Montagem de Dente
9. Prova de Dente
10. Acrilização e Acabamento
11. Entrega

### **PT/PM** (Prótese Total/Mista)
**13 etapas** (inclui Moldagem Funcional)

### **Protocolo Definitivo**
**10 etapas** (inclui Prova de Barra)

### **Protocolo Provisório**
**8 etapas** (sem Prova de Barra)

### **Fixa Ortovital**
**3 etapas** (Moldagem, VG, Montagem, Entrega)

### **Provisório/Adesiva**
**8 etapas** (Fluxo digital: Escaner → ExoCAD → Impressão)

### **Placa de Bruxismo/Clareamento**
**7 etapas** (Digital + Confecção de Placa)

### **Cerâmica Ortovital**
**10 etapas** (Digital + Queima de Cerâmica)

### **Resina Impressa**
**5 etapas** (100% digital - mais rápido)

### **Lab Mauricio**
**10 etapas** (Laboratório externo)

---

## 🎯 PRÓXIMAS MELHORIAS POSSÍVEIS

**No futuro você pode:**

1. ✅ Criar página de listagem de pacientes
2. ✅ Criar página de atualização de etapas
3. ✅ Adicionar notificações por email
4. ✅ Criar relatórios em PDF
5. ✅ Adicionar gráficos mais detalhados
6. ✅ Integrar com WhatsApp
7. ✅ App mobile

**Mas por enquanto, você já tem um sistema completo e funcional!**

---

## 📞 PRECISA DE AJUDA?

**Supabase:**
- Dashboard: https://app.supabase.com
- Documentação: https://supabase.com/docs

**Next.js:**
- Documentação: https://nextjs.org/docs

---

## ✨ RESUMO

Você tem:
- ✅ Sistema rodando localmente
- ✅ Banco de dados na nuvem (Supabase)
- ✅ Dashboard profissional
- ✅ Cadastro de pacientes
- ✅ 10 tipos de procedimentos
- ✅ Automação completa
- ✅ Estatísticas em tempo real

**TUDO FUNCIONANDO! 🎉**

---

**Criado por: Claude AI**
**Data: Outubro 2025**
