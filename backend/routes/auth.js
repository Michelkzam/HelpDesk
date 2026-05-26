import express from 'express';
import jwt from 'jsonwebtoken';
import { supabase, supabaseAuth } from '../supabaseClient.js';

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

export default router;
