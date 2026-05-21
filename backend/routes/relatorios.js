import express from 'express';
import { supabase } from '../server.js';

const router = express.Router();

// Dashboard - Estatísticas gerais
router.get('/dashboard', async (req, res) => {
  try {
    // Usuários online
    const { data: usuariosOnline } = await supabase
      .from('usuarios')
      .select('id')
      .eq('status', 'online');

    // Técnicos online
    const { data: tecnicosOnline } = await supabase
      .from('usuarios')
      .select('id')
      .eq('tipo', 'tecnico')
      .eq('status', 'online');

    // Analistas online
    const { data: analistasOnline } = await supabase
      .from('usuarios')
      .select('id')
      .eq('tipo', 'analista')
      .eq('status', 'online');

    // Chamados abertos
    const { data: chamadosAbertos } = await supabase
      .from('chamados')
      .select('id')
      .eq('status', 'aberto');

    // Chamados em progresso
    const { data: chamadosProgresso } = await supabase
      .from('chamados')
      .select('id')
      .eq('status', 'em_progresso');

    res.json({
      usuarios_total: usuariosOnline?.length || 0,
      tecnicos_online: tecnicosOnline?.length || 0,
      analistas_online: analistasOnline?.length || 0,
      chamados_abertos: chamadosAbertos?.length || 0,
      chamados_em_progresso: chamadosProgresso?.length || 0,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Relatório de chamados
router.get('/chamados', async (req, res) => {
  try {
    const { data_inicio, data_fim } = req.query;

    let query = supabase
      .from('chamados')
      .select('id, status, prioridade, data_criacao, data_fechamento');

    if (data_inicio && data_fim) {
      query = query
        .gte('data_criacao', data_inicio)
        .lte('data_criacao', data_fim);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Agrupar estatísticas
    const stats = {
      total: data.length,
      abertos: data.filter(c => c.status === 'aberto').length,
      fechados: data.filter(c => c.status === 'fechado').length,
      em_progresso: data.filter(c => c.status === 'em_progresso').length,
      alta: data.filter(c => c.prioridade === 'alta').length,
      media: data.filter(c => c.prioridade === 'media').length,
      baixa: data.filter(c => c.prioridade === 'baixa').length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Relatório de dispositivos
router.get('/dispositivos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('dispositivos')
      .select('id, status, so, ultimo_checkin');

    if (error) throw error;

    const stats = {
      total: data.length,
      ativos: data.filter(d => d.status === 'ativo').length,
      inativos: data.filter(d => d.status === 'inativo').length,
      por_so: {}
    };

    data.forEach(d => {
      stats.por_so[d.so] = (stats.por_so[d.so] || 0) + 1;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
