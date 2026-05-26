import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabaseClient.js';
import authRoutes from './routes/auth.js';
import chamadosRoutes from './routes/chamados.js';
import agendamentoRoutes from './routes/agendamento.js';
import usuariosRoutes from './routes/usuarios.js';
import dispositivosRoutes from './routes/dispositivos.js';
import relatoriosRoutes from './routes/relatorios.js';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Store de conexões WebSocket
const chatConnections = new Map();
const supportAgents = new Map();

// WebSocket para Chat
wss.on('connection', (ws) => {
  const clientId = uuidv4();
  chatConnections.set(clientId, { ws, usuario: null, tipo: null });

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'init') {
        const client = chatConnections.get(clientId);
        client.usuario = message.usuario;
        client.tipo = message.userType; // 'cliente' ou 'tecnico'

        if (message.userType === 'tecnico') {
          supportAgents.set(clientId, { ws, nome: message.nome });
        }
      }

      if (message.type === 'message') {
        await salvarMensagemChat(message);
        
        if (message.destinatario) {
          // Enviar para destinatário específico
          for (const [id, conn] of chatConnections) {
            if (conn.usuario === message.destinatario && conn.ws.readyState === 1) {
              conn.ws.send(JSON.stringify({
                type: 'message',
                from: message.from,
                text: message.text,
                timestamp: new Date()
              }));
            }
          }
        } else {
          // Broadcast para todos os agentes
          supportAgents.forEach((agent, id) => {
            if (agent.ws.readyState === 1) {
              agent.ws.send(JSON.stringify({
                type: 'new_chat',
                cliente: message.from,
                texto: message.text
              }));
            }
          });
        }
      }
    } catch (error) {
      console.error('WebSocket error:', error);
    }
  });

  ws.on('close', () => {
    chatConnections.delete(clientId);
    supportAgents.delete(clientId);
  });
});

// Função para salvar mensagem no BD
async function salvarMensagemChat(message) {
  const { data, error } = await supabase
    .from('chat_mensagens')
    .insert([{
      usuario_id: message.from,
      destinatario_id: message.destinatario || null,
      conteudo: message.text,
      tipo: message.userType
    }]);

  if (error) console.error('Erro ao salvar mensagem:', error);
  return data;
}

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/chamados', chamadosRoutes);
app.use('/api/agendamento', agendamentoRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/dispositivos', dispositivosRoutes);
app.use('/api/relatorios', relatoriosRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
