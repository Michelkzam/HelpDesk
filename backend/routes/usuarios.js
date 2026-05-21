import express from 'express';
import { supabase } from '../server.js';

const router = express.Router();

// Listar usuários
router.get('/', async (req, res) => {
  try {
    const { tipo, status } = req.query;

    let query = supabase.from('usuarios').select('id, nome, email, tipo, status, avatar, data_criacao');

    if (tipo) query = query.eq('tipo', tipo);
    if (status) query = query.eq('status', status);

    const { data, error } = await query.order('nome', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar usuários online
router.get('/online', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, nome, tipo, avatar')
      .eq('status', 'online')
      .order('nome', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter usuário
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const { nome, avatar, telefone, departamento } = req.body;

    const { data, error } = await supabase
      .from('usuarios')
      .update({
        nome,
        avatar,
        telefone,
        departamento,
        data_atualizacao: new Date()
      })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar status de usuário
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const { data, error } = await supabase
      .from('usuarios')
      .update({
        status,
        data_atualizacao: new Date()
      })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
