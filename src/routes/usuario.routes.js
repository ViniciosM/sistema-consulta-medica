import express from 'express';
import {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId
} from '../controllers/usuario.controller.js';

import { verifyToken, requireRole } from '../middlewares/auth.js';

export const router = express.Router();

// Criar usuário (em produção: só admin pode criar)
router.post('/', criarUsuario);

// Listar usuários (apenas admin)
router.get('/', verifyToken, requireRole('administrador'), listarUsuarios);

// Buscar por id (autenticado)
router.get('/:id', verifyToken, buscarUsuarioPorId);

//export default router;