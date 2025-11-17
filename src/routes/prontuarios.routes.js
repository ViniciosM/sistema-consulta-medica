import express from 'express';
import {
  criarProntuario,
  buscarProntuarioPorConsulta,
  atualizarProntuario
} from '../controllers/prontuarios.controller.js';

export const router = express.Router();

router.post('/', criarProntuario);
router.get('/:consultaId', buscarProntuarioPorConsulta);
router.put('/:consultaId', atualizarProntuario);