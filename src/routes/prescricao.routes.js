import express from 'express';
import {
  criarPrescricao,
  listarPrescricoes,
  deletarPrescricao
} from '../controllers/prescricao.controller.js';

export const router = express.Router();

router.post('/', criarPrescricao);
router.get('/:prontuarioId', listarPrescricoes);
router.delete('/:id', deletarPrescricao);