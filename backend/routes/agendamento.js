import express from 'express';
import { supabase } from '../supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Criar evento
router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, data_inicio, data_fim, tipo, usuario_id, tecnico_id, chamado_id } = req.body;

    const { data, error } = await supabase
      .from('agendamentos')
      .insert([{
        id: uuidv4(),
        titulo,
        descricao,
        data_inicio,
        data_fim,
        tipo: tipo || 'visita',
        usuario_id,
        tecnico_id,
        chamado_id,
        status: 'agendado',
        data_criacao: new Date()
      }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar agendamentos
router.get('/', async (req, res) => {
  try {
    const { usuario_id, mes, ano, tecnico_id } = req.query;

    let query = supabase.from('agendamentos').select('*');

    if (usuario_id) query = query.eq('usuario_id', usuario_id);
    if (tecnico_id) query = query.eq('tecnico_id', tecnico_id);

    const { data, error } = await query.order('data_inicio', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar agendamento
router.put('/:id', async (req, res) => {
  try {
    const { titulo, descricao, data_inicio, data_fim, status, tecnico_id } = req.body;

    const { data, error } = await supabase
      .from('agendamentos')
      .update({
        titulo,
        descricao,
        data_inicio,
        data_fim,
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

// Listar agendamentos do mês
router.get('/mes/:mes/:ano', async (req, res) => {
  try {
    const { mes, ano } = req.params;
    const dataInicio = new Date(ano, mes - 1, 1);
    const dataFim = new Date(ano, mes, 0);

    const { data, error } = await supabase
      .from('agendamentos')
      .select('*')
      .gte('data_inicio', dataInicio.toISOString())
      .lte('data_inicio', dataFim.toISOString())
      .order('data_inicio', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
