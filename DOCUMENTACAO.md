# 📋 Documentação de Configuração - Helpdesk & RMM System

## 🔧 Setup Inicial

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env com suas credenciais do Supabase
npm run dev
```

### 2. Supabase (Banco de Dados)

**Criar tabelas no Supabase SQL Editor:**

```sql
-- Tabela de Usuários
CREATE TABLE usuarios (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  nome VARCHAR NOT NULL,
  tipo VARCHAR (cliente, tecnico, analista, admin),
  status VARCHAR DEFAULT 'ativo',
  avatar TEXT,
  telefone VARCHAR,
  departamento VARCHAR,
  data_criacao TIMESTAMP DEFAULT NOW(),
  data_atualizacao TIMESTAMP DEFAULT NOW()
);

-- Tabela de Chamados
CREATE TABLE chamados (
  id UUID PRIMARY KEY,
  titulo VARCHAR NOT NULL,
  descricao TEXT NOT NULL,
  status VARCHAR DEFAULT 'aberto',
  prioridade VARCHAR DEFAULT 'media',
  categoria VARCHAR,
  usuario_id UUID REFERENCES usuarios(id),
  tecnico_id UUID REFERENCES usuarios(id),
  solucao TEXT,
  data_criacao TIMESTAMP DEFAULT NOW(),
  data_atualizacao TIMESTAMP DEFAULT NOW(),
  data_fechamento TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE agendamentos (
  id UUID PRIMARY KEY,
  titulo VARCHAR NOT NULL,
  descricao TEXT,
  tipo VARCHAR DEFAULT 'visita',
  data_inicio TIMESTAMP NOT NULL,
  data_fim TIMESTAMP NOT NULL,
  status VARCHAR DEFAULT 'agendado',
  usuario_id UUID REFERENCES usuarios(id),
  tecnico_id UUID REFERENCES usuarios(id),
  chamado_id UUID REFERENCES chamados(id),
  data_criacao TIMESTAMP DEFAULT NOW(),
  data_atualizacao TIMESTAMP DEFAULT NOW()
);

-- Tabela de Dispositivos
CREATE TABLE dispositivos (
  id UUID PRIMARY KEY,
  nome_dispositivo VARCHAR NOT NULL,
  so VARCHAR NOT NULL,
  versao_so VARCHAR,
  ip_address VARCHAR,
  cpu VARCHAR,
  ram VARCHAR,
  disco VARCHAR,
  status VARCHAR DEFAULT 'ativo',
  cpu_uso NUMERIC,
  ram_uso NUMERIC,
  disco_uso NUMERIC,
  temperatura NUMERIC,
  usuario_id UUID REFERENCES usuarios(id),
  data_registro TIMESTAMP DEFAULT NOW(),
  ultimo_checkin TIMESTAMP DEFAULT NOW()
);

-- Tabela de Chat/Mensagens
CREATE TABLE chat_mensagens (
  id UUID PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id),
  destinatario_id UUID REFERENCES usuarios(id),
  conteudo TEXT NOT NULL,
  tipo VARCHAR,
  data_criacao TIMESTAMP DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_chamados_usuario ON chamados(usuario_id);
CREATE INDEX idx_chamados_tecnico ON chamados(tecnico_id);
CREATE INDEX idx_chamados_status ON chamados(status);
CREATE INDEX idx_agendamentos_usuario ON agendamentos(usuario_id);
CREATE INDEX idx_dispositivos_usuario ON dispositivos(usuario_id);
CREATE INDEX idx_chat_usuario ON chat_mensagens(usuario_id);
```

### 3. Variáveis de Ambiente

Criar `.env` na pasta backend:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=chave-anonima-do-supabase
SUPABASE_SERVICE_ROLE_KEY=chave-service-role
JWT_SECRET=sua-chave-secreta-muito-segura
PORT=3001
NODE_ENV=development
```

## 📱 Estrutura de Páginas

### Menu Lateral
- ✅ **Dashboard** - Visão geral, estatísticas, usuários online
- ✅ **Chamados** - Sistema completo de tickets
- ✅ **Atendimentos** - Chat ao vivo
- ✅ **SLA** - Monitoramento de acordos
- ✅ **Dispositivos** - RMM com métricas
- ✅ **Alertas** - Sistema de alertas
- ✅ **Inventário** - Hardware e software
- ✅ **Automação** - Fluxos automatizados
- ✅ **Clientes** - Gestão de clientes
- ✅ **Contratos** - Gestão de contratos
- ✅ **Relatórios** - Geração de relatórios
- ✅ **Configurações** - Settings do sistema

### Perfil do Usuário
- ✅ Chat ao vivo (integrado)
- ✅ Abrir chamados
- ✅ Histórico de chamados
- ✅ Informações pessoais

### Autenticação
- ✅ Página de Login
- ✅ Registro de usuário
- ✅ Integração com Supabase Auth

## 🔌 APIs Disponíveis

### Autenticação
- `POST /api/auth/register` - Criar usuário
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout

### Chamados
- `GET /api/chamados` - Listar chamados
- `POST /api/chamados` - Criar chamado
- `GET /api/chamados/:id` - Obter chamado
- `PUT /api/chamados/:id` - Atualizar chamado
- `POST /api/chamados/:id/fechar` - Fechar chamado

### Agendamento
- `GET /api/agendamento` - Listar agendamentos
- `POST /api/agendamento` - Criar agendamento
- `PUT /api/agendamento/:id` - Atualizar agendamento
- `GET /api/agendamento/mes/:mes/:ano` - Listar por mês

### Usuários
- `GET /api/usuarios` - Listar usuários
- `GET /api/usuarios/:id` - Obter usuário
- `PUT /api/usuarios/:id` - Atualizar usuário
- `PUT /api/usuarios/:id/status` - Atualizar status

### Dispositivos
- `POST /api/dispositivos/registrar` - Registrar dispositivo
- `GET /api/dispositivos` - Listar dispositivos
- `PUT /api/dispositivos/:id` - Atualizar dispositivo

### Relatórios
- `GET /api/relatorios/dashboard` - Dashboard stats
- `GET /api/relatorios/chamados` - Stats de chamados
- `GET /api/relatorios/dispositivos` - Stats de dispositivos

## 💬 WebSocket (Chat)

**Endpoint:** `ws://localhost:3001`

**Mensagens:**
```javascript
// Inicializar conexão
{
  type: 'init',
  usuario: 'id-do-usuario',
  nome: 'nome-do-usuario',
  userType: 'cliente' | 'tecnico'
}

// Enviar mensagem
{
  type: 'message',
  from: 'id-do-usuario',
  text: 'conteúdo da mensagem',
  userType: 'cliente' | 'tecnico',
  destinatario: 'id-ou-null'
}
```

## 🤖 Agente RMM (Remote Monitoring & Management)

O agente coleta informações do dispositivo do cliente:
- Informações do SO (Windows/Linux/Mac)
- Utilização de CPU, RAM, Disco
- Temperatura do processador
- Ip address
- Processos em execução
- Status dos serviços

**Para implementar o agente:**
1. Criar script Python/PowerShell para coleta de dados
2. Enviar dados para API `/api/dispositivos`
3. Agendar execução periódica (a cada 5 minutos)

## 🚀 Próximas Etapas

1. **Deploy em produção**
   - Usar Railway, Vercel ou similar
   - Configurar SSL/HTTPS
   - Backup automático do BD

2. **Melhorias**
   - Autenticação 2FA
   - Permissões granulares
   - API rate limiting
   - Logs de auditoria

3. **Integrações**
   - Integração com email
   - SMS para alertas
   - Slack/Discord webhooks
   - Integração com softwares populares

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação da API ou entre em contato com o suporte técnico.
