import express from 'express';
import { supabase } from '../supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Criar chamado
router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, prioridade, status, usuario_id, tecnico_id } = req.body;

    const { data, error } = await supabase
      .from('chamados')
      .insert([{
        id: uuidv4(),
        titulo,
        descricao,
        prioridade: prioridade || 'media',
        status: status || 'aberto',
        usuario_id,
        tecnico_id: tecnico_id || null,
        data_criacao: new Date(),
        data_atualizacao: new Date()
      }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar chamados
router.get('/', async (req, res) => {
  try {
    const { status, prioridade, usuario_id, tecnico_id } = req.query;

    let query = supabase.from('chamados').select('*');

    if (status) query = query.eq('status', status);
    if (prioridade) query = query.eq('prioridade', prioridade);
    if (usuario_id) query = query.eq('usuario_id', usuario_id);
    if (tecnico_id) query = query.eq('tecnico_id', tecnico_id);

    const { data, error } = await query.order('data_criacao', { ascending: false });
    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar chamado
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('chamados')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Chamado não encontrado' });
  }
});

// Atualizar chamado
router.put('/:id', async (req, res) => {
  try {
    const { titulo, descricao, prioridade, status, tecnico_id } = req.body;

    const { data, error } = await supabase
      .from('chamados')
      .update({
        titulo,
        descricao,
        prioridade,
        status,
        tecnico_id,
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
