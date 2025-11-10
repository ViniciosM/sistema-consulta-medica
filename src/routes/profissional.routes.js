import express from 'express';

import {
    criarProfissional,
    listarProfissionais,
    buscarProfissionalPorId,
    atualizarProfissional,
    deletarProfissional
} from '../controllers/profissionais.controller.js';

export const router = express.Router();

router.post('/', criarProfissional); // criar
router.get('/', listarProfissionais); // listar todos
router.get('/:id', buscarProfissionalPorId); // buscar por id
router.put('/:id', atualizarProfissional) // atualizar 
router.delete('/:id', deletarProfissional); // excluir