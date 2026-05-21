# 🚀 GUIA DE USO - Sistema Helpdesk & RMM

## 📌 Como Usar o Sistema

### 1️⃣ Abrindo o Sistema

**Via Browser:**
```
1. Abra VS Code
2. Clique com botão direito em index.html
3. Selecione "Open with Live Server"
OU
4. Digite no navegador: http://localhost:5500/index.html
```

---

## 🎯 Funcionalidades Implementadas por Seção

### 📊 OPERAÇÕES

#### Dashboard
- **O que faz:** Exibe principais métricas do sistema
- **Como acessar:** OPERAÇÕES → Dashboard
- **Dados exibidos:**
  - Total de Usuários (9)
  - Técnicos Online (2)
  - Analistas Online (2)
  - Chamados Abertos (12)
  - Chamados em Progresso (5)
- **Novo:** Seção "Usuários, Técnicos e Analistas" com abas navegáveis
- **Como navegar:** Click nas abas (👥 👨‍💻 📊 👑)

#### Chamados
- Gerenciamento de tickets/chamados do sistema

#### Atendimentos  
- Chat em tempo real e atendimento aos clientes

#### SLA
- Visualização de SLA (Service Level Agreement)

#### 🆕 Agendamento
- **O que faz:** Agenda de eventos e compromissos
- **Como acessar:** OPERAÇÕES → Agendamento

---

### 💼 GESTÃO

#### 🆕 Usuários
- **O que faz:** Gerenciar todos os usuários do sistema
- **Como acessar:** GESTÃO → Usuários
- **Funcionalidades:**
  1. **Listar Usuários**
     - Tabela com: Nome, Email, Cliente, Perfis, Status, Ações
     - 3 usuários demo pré-carregados
  
  2. **Criar Novo Usuário**
     - Click em "+ Novo Usuário"
     - Preencher:
       - Nome: João Silva
       - Email: joao@example.com
       - Cliente: Empresa A Ltda (dropdown)
       - Marcar perfis: ☑ Cliente ☑ Técnico
       - Status: Ativo
     - Click em "Salvar Usuário"
  
  3. **Editar Usuário**
     - Click em "Editar" na linha do usuário
     - Modificar dados
     - Click em "Salvar Usuário"
  
  4. **Deletar Usuário**
     - Click em "Deletar"
     - Confirmar exclusão
  
  5. **Filtrar por Perfil**
     - Click em: "Todos" | "Clientes" | "Técnicos" | "Analistas" | "Admins"

#### Clientes
- Cadastro e gerenciamento de clientes

#### Contratos
- Gerenciamento de contratos com clientes

#### Relatórios
- Geração de relatórios do sistema

#### Configurações
- **O que faz:** Configuração do sistema
- **Como acessar:** GESTÃO → Configurações

---

### 🔐 CONFIGURAÇÕES

#### Logo do Sistema
- **O que faz:** Alterar a logo do sistema
- **Como acessar:** GESTÃO → Configurações → Logo do Sistema (no menu esquerdo)
- **Passo a passo:**
  1. Click em "Logo do Sistema"
  2. Visualizar logo atual
  3. Click na área de upload (ou drag-drop)
  4. Selecionar arquivo PNG/SVG (máx 2MB)
  5. Preview atualiza automaticamente
  6. Escolher tamanho: Pequena | Média | Grande
  7. Escolher posição: Topo | Centro | Fundo
  8. Click em "Salvar Logo"
  9. Logo aparece na sidebar automaticamente
  10. **Persiste após recarregar página!**

#### Perfil
- Configurações do perfil do usuário logado

---

### 🖥️ MONITORAMENTO RMM

#### 🆕 Dispositivos
- **O que faz:** Monitorar computadores/servidores via agente RMM
- **Como acessar:** MONITORAMENTO RMM → Dispositivos
- **Dados Mostrados:**
  - Nome do dispositivo
  - SO (Windows/Linux/Mac)
  - IP Address
  - Utilização (CPU%, RAM%, Disco%)
  - Temperatura
  - Status (Online/Offline)
  - Empresa responsável

#### Visualizações Disponíveis

1. **Vista em Cards**
   - Cards coloridos com resumo
   - Barras de utilização
   - Indicador de temperatura
   - Botão "Ver Detalhes"

2. **Vista em Tabela**
   - Tabela completa com todos os dados
   - Scroll horizontal em mobile
   - Ordenação por coluna

3. **Modal de Detalhes**
   - Click em "Ver Detalhes"
   - Mostra informações completas:
     - Status em tempo real
     - Hardware completo
     - Responsável e empresa
     - Histórico

#### Filtros

- **Todos:** Mostra os 5 dispositivos
- **Online:** Mostra dispositivos conectados (4)
- **Offline:** Mostra dispositivos desconectados (1)
- **Alerta:** Mostra dispositivos com CPU/RAM/Temp > 70% (2)

#### Cores de Alerta

- 🟢 **Verde:** Utilização baixa (< 70%)
- 🟠 **Laranja:** Utilização média (70-80%)
- 🔴 **Vermelho:** Utilização alta (> 80%)

---

## 👥 Perfis e Permissões

### Cliente
- ✅ Dashboard
- ✅ Chamados
- ✅ Atendimentos
- ❌ Dispositivos
- ❌ Alertas
- ❌ Relatórios

### Técnico
- ✅ Dashboard
- ✅ Chamados
- ✅ Atendimentos
- ✅ **Dispositivos** ← Pode ver RMM
- ✅ Alertas
- ❌ Relatórios

### Analista
- ✅ Dashboard
- ✅ Chamados
- ❌ Atendimentos
- ❌ Dispositivos
- ✅ Alertas
- ✅ Relatórios

### Admin
- ✅ Tudo (acesso completo)

---

## 💡 Dados Demo (para Teste)

### Usuários Pré-carregados
```
1. João Silva
   Email: joao@example.com
   Cliente: Empresa A Ltda
   Perfis: Cliente + Técnico
   Status: Ativo

2. Maria Santos
   Email: maria@example.com
   Cliente: Empresa B Ltda
   Perfis: Analista
   Status: Ativo

3. Carlos Admin
   Email: admin@example.com
   Perfis: Admin
   Status: Ativo
```

### Dispositivos Pré-carregados
```
1. DESKTOP-USUARIO1
   SO: Windows 10
   CPU: 45% | RAM: 68% | Disco: 82%
   Temp: 62°C | Status: 🟢 Online

2. LAPTOP-VENDAS
   SO: Windows 11
   CPU: 12% | RAM: 34% | Disco: 56%
   Temp: 45°C | Status: 🟢 Online

3. SERVER-BACKUP
   SO: Ubuntu 22.04
   CPU: 78% | RAM: 92% | Disco: 88%
   Temp: 68°C | Status: 🟢 Online (⚠️ ALERTA)

4. DESKTOP-TI
   SO: Windows 10
   CPU: 5% | RAM: 45% | Disco: 60%
   Temp: 42°C | Status: 🔴 Offline

5. WORKSTATION-3D
   SO: Windows 10
   CPU: 95% | RAM: 87% | Disco: 92%
   Temp: 78°C | Status: 🟢 Online (🚨 CRÍTICO)
```

---

## 🔘 Botões de Navegação

### Botão "Perfil"
- **Local:** Topbar (canto superior direito)
- **Função:** Abre a página Configurações
- **Uso:** Alterar dados do perfil, logo do sistema

### Botão "Sair"
- **Local:** Topbar (canto superior direito)
- **Função:** Faz logout do sistema
- **Processo:**
  1. Click em "Sair"
  2. Confirmação: "Tem certeza que deseja sair?"
  3. Click em "OK" → vai para login.html
  4. Click em "Cancelar" → volta para página anterior

---

## 🎨 Cores do Sistema

| Seção | Cor | Hex |
|-------|-----|-----|
| Dashboard | Azul | #1976d2 |
| Chamados | Verde | #4caf50 |
| Atendimentos | Laranja | #ff9800 |
| SLA | Roxo | #9c27b0 |
| Agendamento | Rosa | #e91e63 |
| Dispositivos | Ciano | #00bcd4 |
| Alertas | Vermelho | #f44336 |
| Clientes | Índigo | #3f51b5 |
| Contratos | Âmbar | #ffc107 |
| Relatórios | Teal | #009688 |
| Usuários | Azul | #1976d2 |
| Configurações | Cinza | #757575 |

---

## ⌨️ Atalhos Úteis

| Atalho | Função |
|--------|---------|
| F5 | Recarregar página |
| F12 | Abrir DevTools |
| Ctrl+A | Selecionar tudo |
| Ctrl+C | Copiar |
| Ctrl+V | Colar |
| ESC | Fechar modal |

---

## 🔍 Troubleshooting

### Problema 1: Página não carrega
**Solução:** 
- Verificar se Live Server está rodando
- Verificar console (F12) para erros
- Recarregar página (F5)

### Problema 2: Logo não aparece após upload
**Solução:**
- Verificar se navegador permite localStorage
- Limpar cache (Ctrl+Shift+Delete)
- Recarregar página

### Problema 3: Usuários não aparecem em usuarios.html
**Solução:**
- Abrir DevTools (F12)
- Verificar console para erros
- Recarregar página

### Problema 4: Filtros de dispositivos não funcionam
**Solução:**
- Verificar se há dispositivos com os critérios
- Click em "Todos" e depois em outro filtro
- Limpar localStorage

### Problema 5: Modais não fecham
**Solução:**
- Pressionar ESC
- Click no X do modal
- Recarregar página

---

## 📞 Suporte

Para mais informações, consulte os arquivos de documentação:
- **STATUS_FINAL.md** - Status completo do projeto
- **RESUMO_IMPLEMENTACAO.md** - Resumo das mudanças
- **FUNCIONALIDADES_IMPLEMENTADAS.md** - Documentação técnica
- **GUIA_TESTES.md** - Checklist de testes
- **DOCUMENTACAO.md** - Documentação técnica detalhada

---

**Versão:** 1.0.0  
**Status:** ✅ PRONTO PARA USO  
**Data:** 21/05/2026
