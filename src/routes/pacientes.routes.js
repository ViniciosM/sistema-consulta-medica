import express from "express";

import {
  criarPaciente,
  listarPacientes,
  buscarPacientePorId,
  atualizarPaciente,
  deletarPaciente
} from "../controllers/pacientes.controller.js"

export const router = express.Router();

router.get("/", listarPacientes); // listar todos
router.get("/:id", buscarPacientePorId); // buscar por id
router.post("/", criarPaciente); // criar
router.put("/:id", atualizarPaciente); // atualizar
router.delete("/:id", deletarPaciente); // excluir



