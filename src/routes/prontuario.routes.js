import express from 'express';

import {
  criarProntuario,
  buscarProntuarioPorConsulta,
  atualizarProntuario
} from '../controllers/prontuario.controller.js';

console.log(">>> carregou prontuarios.routes.js");

export const router = express.Router();

router.post('/', criarProntuario);
router.get('/:consultaId', buscarProntuarioPorConsulta);
router.put('/:consultaId', atualizarProntuario);