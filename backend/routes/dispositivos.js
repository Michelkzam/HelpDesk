import express from 'express';
import { supabase } from '../server.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Registrar dispositivo
router.post('/registrar', async (req, res) => {
  try {
    const { nome_dispositivo, so, versao_so, ip_address, cpu, ram, disco, usuario_id } = req.body;

    const { data, error } = await supabase
      .from('dispositivos')
      .insert([{
        id: uuidv4(),
        nome_dispositivo,
        so,
        versao_so,
        ip_address,
        cpu,
        ram,
        disco,
        usuario_id,
        status: 'ativo',
        data_registro: new Date(),
        ultimo_checkin: new Date()
      }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar dispositivos
router.get('/', async (req, res) => {
  try {
    const { usuario_id } = req.query;

    let query = supabase.from('dispositivos').select('*');

    if (usuario_id) query = query.eq('usuario_id', usuario_id);

    const { data, error } = await query.order('nome_dispositivo', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar dados do dispositivo
router.put('/:id', async (req, res) => {
  try {
    const { cpu_uso, ram_uso, disco_uso, temperatura } = req.body;

    const { data, error } = await supabase
      .from('dispositivos')
      .update({
        cpu_uso,
        ram_uso,
        disco_uso,
        temperatura,
        ultimo_checkin: new Date()
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
