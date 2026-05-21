# README - Helpdesk & RMM System

Sistema profissional completo de **Helpdesk** e **RMM** (Remote Monitoring & Management) desenvolvido com tecnologia moderna.

## 🎯 Características Principais

### 📊 Dashboard Executivo
- Estatísticas em tempo real
- Visualização de usuários online
- Técnicos e analistas conectados
- Gráficos de performance

### 🎫 Sistema de Chamados
- Criação e rastreamento de tickets
- Priorização automática
- Atribuição de técnicos
- Histórico completo
- Status em tempo real

### 📅 Agendamento Profissional
- Calendário estilo Google Calendar
- Agendamento de visitas técnicas
- Sincronização de eventos
- Notificações de compromissos

### 💬 Chat ao Vivo
- Comunicação em tempo real (WebSocket)
- Suporte 24/7
- Histórico de conversas
- Integração com tickets

### 📡 Monitoramento RMM
- Monitoramento de dispositivos em tempo real
- Coleta automática de métricas
- Alertas de performance
- Dashboard de status

### 🚨 Sistema de Alertas
- Alertas críticos, medium e informativos
- Notificações em tempo real
- Histórico de eventos
- Automação de respostas

### 📋 Gestão Completa
- Gerenciamento de clientes
- Contratos e licenças
- Inventário de hardware/software
- SLA monitoring

### 📈 Relatórios
- Relatórios customizáveis
- Exportação em PDF
- Agendamento automático
- Histórico de relatórios

## 🛠 Stack Tecnológico

### Frontend
- **HTML5** - Markup semântico
- **CSS3** - Design responsivo e moderno
- **JavaScript Puro** - Sem frameworks desnecessários
- **Chart.js** - Gráficos profissionais

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **WebSocket** - Chat em tempo real
- **JWT** - Autenticação segura

### Banco de Dados
- **Supabase** - PostgreSQL gerenciado
- **Realtime** - Atualizações em tempo real
- **Auth integrado** - Autenticação robusta

## 📁 Estrutura do Projeto

```
projeto/
├── backend/
│   ├── server.js                 # Servidor principal
│   ├── routes/
│   │   ├── auth.js              # Autenticação
│   │   ├── chamados.js          # Tickets
│   │   ├── agendamento.js       # Calendário
│   │   ├── usuarios.js          # Usuários
│   │   ├── dispositivos.js      # RMM
│   │   └── relatorios.js        # Analytics
│   ├── package.json
│   └── .env.example
├── pages/
│   ├── dashboard.html           # Visão geral
│   ├── chamados.html            # Tickets
│   ├── agendamento.html         # Calendário
│   ├── atendimentos.html        # Chat
│   ├── sla.html                 # Monitoramento SLA
│   ├── dispositivos.html        # RMM
│   ├── alertas.html             # Sistema de alertas
│   ├── inventario.html          # Gestão de assets
│   ├── automacao.html           # Fluxos automáticos
│   ├── clientes.html            # Clientes
│   ├── contratos.html           # Contratos
│   ├── relatorios.html          # Relatórios
│   ├── configuracoes.html       # Settings
│   └── perfil.html              # Perfil do usuário
├── js/
│   └── [scripts customizados]
├── index.html                   # Layout principal
├── login.html                   # Página de login
├── style.css                    # Estilos globais
├── DOCUMENTACAO.md              # Guia de configuração
├── RMM-AGENT.md                # Agente de monitoramento
└── README.md                    # Este arquivo
```

## 🚀 Quickstart

### Pré-requisitos
- Node.js 14+
- npm ou yarn
- Conta Supabase (gratuita)
- Git

### 1. Clonar projeto
```bash
git clone [seu-repositorio]
cd projeto
```

### 2. Configurar Backend

```bash
cd backend
npm install

# Criar arquivo .env
cp .env.example .env

# Editar .env com credenciais do Supabase
nano .env
```

### 3. Criar tabelas no Supabase

Copie o conteúdo de `DOCUMENTACAO.md` (seção SQL) e execute no Supabase SQL Editor.

### 4. Iniciar servidor

```bash
npm run dev
# Servidor rodará em http://localhost:3001
```

### 5. Abrir no navegador

```
http://localhost:3000/login.html
```

**Credenciais de teste:**
- Email: `teste@example.com`
- Senha: `senha123`

## 📦 Instalação do Agente RMM

Para monitorar dispositivos dos clientes:

```bash
# Windows
powershell -ExecutionPolicy RemoteSigned -File backend/rmm-agent.ps1

# Linux/Mac
python3 backend/rmm-agent.py
```

Veja [RMM-AGENT.md](RMM-AGENT.md) para instruções detalhadas.

## 🔐 Segurança

### Implementado
- ✅ Hashing de senhas (bcryptjs)
- ✅ JWT para autenticação
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Rate limiting recomendado

### Recomendações Adicionais
- [ ] Implementar 2FA
- [ ] Usar HTTPS em produção
- [ ] Ativar WAF
- [ ] Logs de auditoria
- [ ] Backup automático

## 🌐 Deployment

### Opção 1: Railway
```bash
# Conectar repositório GitHub
# Railway detectará Node.js automaticamente
```

### Opção 2: Vercel (Frontend)
```bash
# Frontend apenas
npm install -g vercel
vercel
```

### Opção 3: Docker
```bash
docker build -t helpdesk-rmm .
docker run -p 3001:3001 helpdesk-rmm
```

## 📚 API Documentation

### Autenticação
```bash
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Chamados
```bash
GET /api/chamados
POST /api/chamados
GET /api/chamados/:id
PUT /api/chamados/:id
POST /api/chamados/:id/fechar
```

### Agendamento
```bash
GET /api/agendamento
POST /api/agendamento
PUT /api/agendamento/:id
GET /api/agendamento/mes/:mes/:ano
```

Veja [DOCUMENTACAO.md](DOCUMENTACAO.md) para referência completa.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob licença MIT. Veja arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como sistema profissional de Helpdesk & RMM.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato através do email de suporte.

## 🎓 Próximos Passos

- [ ] Integração com email
- [ ] Integração com Slack/Discord
- [ ] App mobile (React Native)
- [ ] Integração SSO
- [ ] Backup gerenciado
- [ ] Multi-tenancy
- [ ] Analytics avançado
- [ ] Integração com sistemas externos

---

**Versão**: 1.0.0  
**Última atualização**: 21/05/2026
