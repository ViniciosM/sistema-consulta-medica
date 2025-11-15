import express from 'express';

import {
  criarConsulta,
  listarConsultas,
  buscarConsultaPorId,
  atualizarConsulta,
  cancelarConsulta,
} from '../controllers/consultas.controller.js';

export const router = express.Router();

router.post('/', criarConsulta);
router.get('/', listarConsultas);
router.get('/:id', buscarConsultaPorId);
router.put('/:id', atualizarConsulta);
router.patch('/:id/cancelar', cancelarConsulta);