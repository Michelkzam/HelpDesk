import express from 'express';
import { supabase } from '../server.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Criar chamado
router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, prioridade, categoria, usuario_id } = req.body;

    const { data, error } = await supabase
      .from('chamados')
      .insert([{
        id: uuidv4(),
        titulo,
        descricao,
        prioridade: prioridade || 'media',
        categoria,
        usuario_id,
        status: 'aberto',
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
    const { usuario_id, status, prioridade } = req.query;

    let query = supabase.from('chamados').select('*');

    if (usuario_id) query = query.eq('usuario_id', usuario_id);
    if (status) query = query.eq('status', status);
    if (prioridade) query = query.eq('prioridade', prioridade);

    const { data, error } = await query.order('data_criacao', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter chamado específico
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
    const { titulo, descricao, status, prioridade, tecnico_id } = req.body;

    const { data, error } = await supabase
      .from('chamados')
      .update({
        titulo,
        descricao,
        status,
        prioridade,
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

// Fechar chamado
router.post('/:id/fechar', async (req, res) => {
  try {
    const { solucao } = req.body;

    const { data, error } = await supabase
      .from('chamados')
      .update({
        status: 'fechado',
        solucao,
        data_fechamento: new Date()
      })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;

    res.json({ message: 'Chamado fechado com sucesso', chamado: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
