import { prisma } from '../config/database.js';
import bcrypt from 'bcryptjs';

// Criar usuário (registro)
export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;
    if (!nome || !email || !senha || !perfil) {
      return res.status(400).json({ error: 'nome, email, senha e perfil são obrigatórios' });
    }

    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    const hash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hash,
        perfil
      }
    });

    const { senha: _senha, ...usuarioSafe } = usuario;
    res.status(201).json(usuarioSafe);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Listar usuários (apenas admins)
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { id: true, nome: true, email: true, perfil: true, createdAt: true }
    });
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

// Buscar usuário por id (autenticado ou admin)
export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: { id: true, nome: true, email: true, perfil: true, createdAt: true }
    });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};