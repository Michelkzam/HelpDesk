import express from 'express';
import jwt from 'jsonwebtoken';
import { supabase, supabaseAuth } from '../supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, senha, nome, tipo } = req.body;

    // Validação básica
    if (!email || !senha || !nome) {
      return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
    }

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabaseAuth.auth.signUp({
      email,
      password: senha
    });

    if (authError) throw authError;

    // Salvar usuário no banco de dados
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{
        id: authData.user.id,
        email,
        nome,
        tipo: tipo || 'cliente',
        status: 'ativo',
        data_criacao: new Date()
      }]);

    if (error) throw error;

    res.json({ 
      message: 'Usuário criado com sucesso',
      usuario: { id: authData.user.id, email, nome }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (error) throw error;

    // Buscar dados do usuário
    const { data: usuario } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single();

    const token = jwt.sign(
      { id: data.user.id, email: data.user.email },
      process.env.JWT_SECRET || 'seu-segredo'
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        avatar: usuario.avatar
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Email ou senha inválidos' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    await supabaseAuth.auth.signOut();
    res.json({ message: 'Desconectado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar login via Google (retorna redirect)
router.get('/google', async (req, res) => {
  try {
    const { data, error } = await supabaseAuth.auth.signInWithOAuth({ provider: 'google' });
    if (error) throw error;
    // data.url contém a URL de redirecionamento do Supabase
    return res.redirect(data.url);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Solicitação de acesso (não cria usuário no Auth imediatamente)
router.post('/request-access', async (req, res) => {
  try {
    const { nome, email, tipo, senha, solicitar_criacao_senha } = req.body;

    if (!nome || !email) return res.status(400).json({ error: 'Nome e email são obrigatórios' });

    // Verifica se já existe usuário com esse email
    const { data: existente } = await supabase.from('usuarios').select('id,email').eq('email', email).limit(1);
    if (existente && existente.length > 0) {
      return res.status(400).json({ error: 'Já existe um usuário com esse email' });
    }

    // Tenta inserir em uma tabela de solicitações, se existir
    try {
      const { data, error } = await supabase.from('solicitacoes_acesso').insert([{
        id: uuidv4(),
        nome,
        email,
        tipo: tipo || 'cliente',
        senha_proposta: senha || null,
        solicitar_criacao_senha: !!solicitar_criacao_senha,
        status: 'pendente',
        data_criacao: new Date()
      }]).select();

      if (error) throw error;
      return res.json({ message: 'Solicitação registrada' });
    } catch (err) {
      // Se a tabela não existir, criamos usuário provisório com status pendente
      const { data, error } = await supabase.from('usuarios').insert([{
        id: uuidv4(),
        nome,
        email,
        tipo: tipo || 'cliente',
        status: 'pendente',
        solicitar_criacao_senha: !!solicitar_criacao_senha,
        senha_proposta: senha || null,
        data_criacao: new Date()
      }]).select();

      if (error) throw error;
      return res.json({ message: 'Solicitação registrada (usuario pendente)' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
