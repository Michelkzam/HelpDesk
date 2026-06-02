-- Banco de dados Supabase schema para Helpdesk & RMM System

-- Tabela de Usuários
CREATE TABLE usuarios (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  nome VARCHAR NOT NULL,
  tipo VARCHAR,
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

-- Tabela de solicitações de acesso (opcional)
CREATE TABLE IF NOT EXISTS solicitacoes_acesso (
  id UUID PRIMARY KEY,
  nome VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  tipo VARCHAR DEFAULT 'cliente',
  senha_proposta TEXT,
  solicitar_criacao_senha BOOLEAN DEFAULT FALSE,
  status VARCHAR DEFAULT 'pendente',
  data_criacao TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_chamados_usuario ON chamados(usuario_id);
CREATE INDEX idx_chamados_tecnico ON chamados(tecnico_id);
CREATE INDEX idx_chamados_status ON chamados(status);
CREATE INDEX idx_agendamentos_usuario ON agendamentos(usuario_id);
CREATE INDEX idx_dispositivos_usuario ON dispositivos(usuario_id);
CREATE INDEX idx_chat_usuario ON chat_mensagens(usuario_id);
