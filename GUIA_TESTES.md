# 🧪 GUIA DE TESTES - Sistema Implementado

## ✅ Checklist de Funcionalidades para Testar

### 1. MENU LATERAL - Agendamento em OPERAÇÕES
- [ ] Click em "OPERAÇÕES" para expandir
- [ ] Verificar se "Agendamento" aparece (com ícone de calendário rosa)
- [ ] Click em "Agendamento" deve abrir a página
- [ ] Verificar cor da topbar muda para #e91e63 (rosa)

### 2. MENU LATERAL - Usuários em GESTÃO  
- [ ] Click em "GESTÃO" para expandir
- [ ] Verificar se "Usuários" aparece (com ícone azul)
- [ ] Click em "Usuários" deve abrir usuarios.html
- [ ] Verificar cor da topbar muda para #1976d2 (azul)

### 3. PÁGINA USUARIOS.HTML - GESTÃO COMPLETA
```
Teste 1: Listar Usuários
- [ ] Página carrega corretamente
- [ ] Tabela mostra 3 usuários demo
- [ ] Colunas: Nome, Email, Cliente Atrelado, Perfis, Status, Ações

Teste 2: Filtros
- [ ] Click em "Todos" - mostra 3 usuários
- [ ] Click em "Clientes" - mostra 1 usuário (João Silva)
- [ ] Click em "Técnicos" - mostra 1 usuário (João Silva)
- [ ] Click em "Analistas" - mostra 1 usuário (Maria Santos)
- [ ] Click em "Admins" - mostra 1 usuário (Carlos Admin)

Teste 3: Criar Novo Usuário
- [ ] Click em "+ Novo Usuário"
- [ ] Modal abre com formulário vazio
- [ ] Preencher dados:
  - Nome: "Pedro Silva"
  - Email: "pedro@example.com"
  - Cliente: "Empresa A Ltda"
- [ ] Marcar múltiplos perfis: Cliente + Técnico
- [ ] Verificar que permissões se atualizam automaticamente
- [ ] Click em "Salvar Usuário"
- [ ] Novo usuário aparece na tabela

Teste 4: Editar Usuário
- [ ] Click em "Editar" de um usuário
- [ ] Modal abre com dados preenchidos
- [ ] Alterar dados
- [ ] Alterar perfis
- [ ] Click em "Salvar Usuário"
- [ ] Mudanças aparecem na tabela

Teste 5: Deletar Usuário
- [ ] Click em "Deletar"
- [ ] Confirmação aparece
- [ ] Usuário é removido da tabela

Teste 6: Perfis e Permissões
- [ ] Marcar "Cliente" - mostra permissões básicas
- [ ] Marcar "Técnico" + "Cliente" - mostra mais permissões
- [ ] Marcar "Admin" - mostra todas as permissões
```

### 4. CONFIGURAÇÕES - ALTERAR LOGO DO SISTEMA
```
Teste 1: Visualizar Seção Logo
- [ ] Click em "GESTÃO" → "Configurações"
- [ ] Sidebar esquerdo mostra opciones
- [ ] Click em "Logo do Sistema"
- [ ] Seção carrega corretamente
- [ ] Logo atual é exibida

Teste 2: Upload de Logo
- [ ] Clicar na área de upload (ou drag-drop)
- [ ] Selecionar imagem PNG/SVG
- [ ] Preview atualiza com nova logo
- [ ] Escolher tamanho: "Média"
- [ ] Escolher posição: "Centro"
- [ ] Click em "Salvar Logo"
- [ ] Logo deve aparecer na sidebar após salvar

Teste 3: Persistência
- [ ] Recarregar página (F5)
- [ ] Logo salva deve aparecer na sidebar
- [ ] Tamanho deve ser o selecionado
```

### 5. DASHBOARD - USUÁRIOS/TÉCNICOS/ANALISTAS
```
Teste 1: Cards de Estatísticas
- [ ] 5 cards mostram dados corretos:
  - Total de Usuários: 9
  - Técnicos Online: 2
  - Analistas Online: 2
  - Chamados Abertos: 12
  - Em Progresso: 5

Teste 2: Gráficos
- [ ] Gráfico de pizza (Chamados por Status) carrega
- [ ] Gráfico de barras (Chamados por Prioridade) carrega
- [ ] Cores estão corretas

Teste 3: Seção de Usuários/Técnicos/Analistas
- [ ] Abas aparecem:
  - 👥 Usuários
  - 👨‍💻 Técnicos
  - 📊 Analistas
  - 👑 Admins

Teste 4: Aba Usuários
- [ ] Mostra 3 cards de usuários
- [ ] Cada card mostra:
  - Avatar com iniciais
  - Nome
  - Email
  - Status (🟢 Online ou 🔴 Offline)

Teste 5: Aba Técnicos
- [ ] Mostra 3 cards de técnicos
- [ ] João Silva deve aparecer (tem perfil técnico)
- [ ] 2 devem estar online (verde)
- [ ] 1 offline (cinza)

Teste 6: Aba Analistas
- [ ] Mostra 2 cards de analistas
- [ ] Maria Santos deve aparecer
- [ ] Status corretos

Teste 7: Aba Admins
- [ ] Mostra 1 card (Carlos Admin)
- [ ] Status Online
```

### 6. DISPOSITIVOS - DADOS DO AGENTE RMM
```
Teste 1: Carregar Página
- [ ] Página carrega sem erros
- [ ] 5 cards de dispositivos aparecem
- [ ] Tabela abaixo com lista completa

Teste 2: Filtros
- [ ] Click em "Todos" - 5 dispositivos
- [ ] Click em "Online" - 4 dispositivos
- [ ] Click em "Offline" - 1 dispositivo (DESKTOP-TI)
- [ ] Click em "Alerta" - 2 dispositivos (SERVER-BACKUP, WORKSTATION-3D)

Teste 3: Cards de Dispositivos
- [ ] Cada card mostra:
  - Nome do dispositivo
  - SO (Windows/Linux)
  - Versão
  - Empresa responsável
  - Barras de CPU, RAM, Disco
  - IP Address
  - Temperatura com indicador de cor
  - Status (🟢 Online / 🔴 Offline)
  - Botão "Ver Detalhes"

Teste 4: Cores de Alerta
- [ ] Verde: CPU/RAM < 70%, Temp < 65°C
- [ ] Laranja: CPU/RAM 70-80%, Temp 65-75°C
- [ ] Vermelho: CPU/RAM > 80%, Temp > 75°C

Teste 5: Tabela Completa
- [ ] Mostra todos os dados:
  - Nome, SO, Versão, IP, CPU%, RAM%, Disco%, Temp, Status, Último Acesso

Teste 6: Modal de Detalhes
- [ ] Click em "Ver Detalhes" de um dispositivo
- [ ] Modal abre com:
  - 📊 Status em Tempo Real (CPU, RAM, Disco, Temp)
  - 🖥️ Informações do Dispositivo (SO, IP, MAC)
  - ⚙️ Hardware (Processador, Núcleos, RAM, Disco)
  - 👤 Responsável (Usuário, Empresa)
  - 📅 Histórico (Data Registro, Último Checkin)

Teste 7: Verificar Dados Completos do Agente
- [ ] DESKTOP-USUARIO1 deve mostrar:
  - SO: Windows 10
  - Versão: Build 19044
  - CPU: Intel Core i7-10700K
  - RAM: 16 GB DDR4
  - Disco: 512 GB SSD
  - Temperatura: 62°C
  - Usuário: joão.silva
  - Empresa: Empresa A Ltda

Teste 8: Fechar Modal
- [ ] Click no X ou fora do modal
- [ ] Modal fecha corretamente
```

### 7. BOTÕES NAVEGAÇÃO (Perfil e Sair)
```
Teste 1: Botão Perfil
- [ ] Click em "Perfil" na topbar
- [ ] Deve navegar para Configurações
- [ ] Seção "Perfil" deve estar selecionada

Teste 2: Botão Sair
- [ ] Click em "Sair" na topbar
- [ ] Apareça confirmação: "Tem certeza que deseja sair do sistema?"
- [ ] Click em "OK" deve ir para login.html
- [ ] Click em "Cancelar" deve voltar para página anterior
```

---

## 🎯 Dados Demo para Referência

### Usuários
| Nome | Email | Cliente | Perfis | Status |
|------|-------|---------|--------|--------|
| João Silva | joao@example.com | Empresa A Ltda | Cliente, Técnico | Ativo |
| Maria Santos | maria@example.com | Empresa B Ltda | Analista | Ativo |
| Carlos Admin | admin@example.com | - | Admin | Ativo |

### Dispositivos
| Nome | SO | IP | CPU | RAM | Disco | Temp | Status |
|------|----|----|-----|-----|-------|------|--------|
| DESKTOP-USUARIO1 | Windows 10 | 192.168.1.100 | 45% | 68% | 82% | 62°C | Online |
| LAPTOP-VENDAS | Windows 11 | 192.168.1.101 | 12% | 34% | 56% | 45°C | Online |
| SERVER-BACKUP | Ubuntu 22.04 | 192.168.1.50 | 78% | 92% | 88% | 68°C | Online |
| DESKTOP-TI | Windows 10 | 192.168.1.102 | 5% | 45% | 60% | 42°C | Offline |
| WORKSTATION-3D | Windows 10 | 192.168.1.103 | 95% | 87% | 92% | 78°C | Online |

---

## 🐛 Possíveis Problemas e Soluções

### Problema 1: Logo não aparece após upload
**Solução:** Verificar se o navegador permite localStorage

### Problema 2: Cards de dispositivos vazios
**Solução:** A API não está rodando, usando dados mock automaticamente

### Problema 3: Filtros não funcionam
**Solução:** Limpar localStorage e recarregar página

### Problema 4: Modal não fecha
**Solução:** Pressionar ESC ou F12 para verificar console de erros

---

## ✅ Checklist Final de Validação

- [ ] Todos os menus aparecem corretamente
- [ ] Cores da topbar mudam ao clicar em diferentes páginas
- [ ] Usuários podem ser criados/editados/deletados
- [ ] Logo pode ser alterada e persiste
- [ ] Dashboard mostra estatísticas corretas
- [ ] Dispositivos mostram dados completos
- [ ] Filtros funcionam em todas as páginas
- [ ] Modais abrem e fecham corretamente
- [ ] Botão Sair funciona
- [ ] Botão Perfil funciona
- [ ] Responsivo em mobile

---

**Testes Executados Por:** ________________  
**Data:** ________________  
**Status:** ✅ APROVADO / ❌ REPROVADO
