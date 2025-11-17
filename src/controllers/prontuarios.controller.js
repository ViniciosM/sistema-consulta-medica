import { prisma } from '../prisma/client.js';

// Criar prontuário
export const criarProntuario = async (req, res) => {
  try {
    const { consultaId, diagnostico, condutaMedica, observacoes } = req.body;

    // Verifica se a consulta existe
    const consulta = await prisma.consulta.findUnique({
      where: { id: Number(consultaId) },
      include: { paciente: true, profissional: true }
    });

    if (!consulta) {
      return res.status(404).json({ error: 'Consulta não encontrada' });
    }

    // Impede criar prontuário para consulta cancelada
    if (consulta.status === 'cancelada') {
      return res.status(400).json({
        error: 'Não é possível criar prontuário para uma consulta cancelada'
      });
    }

    // Verifica se já existe prontuário para essa consulta
    const existe = await prisma.prontuario.findUnique({
      where: { consultaId: Number(consultaId) }
    });

    if (existe) {
      return res.status(409).json({
        error: 'Já existe um prontuário para esta consulta'
      });
    }

    // Cria o prontuário
    const prontuario = await prisma.prontuario.create({
      data: {
        consultaId: Number(consultaId),
        diagnostico,
        condutaMedica,
        observacoes
      },
      include: {
        consulta: {
          include: {
            paciente: true,
            profissional: true
          }
        }
      }
    });

    res.status(201).json(prontuario);
  } catch (error) {
    console.error('Erro ao criar prontuário:', error);
    res.status(500).json({ error: 'Erro ao criar prontuário' });
  }
};

// Buscar prontuário pelo ID da consulta
export const buscarProntuarioPorConsulta = async (req, res) => {
  try {
    const { consultaId } = req.params;

    const prontuario = await prisma.prontuario.findUnique({
      where: { consultaId: Number(consultaId) },
      include: {
        consulta: {
          include: {
            paciente: true,
            profissional: true
          }
        }
      }
    });

    if (!prontuario) {
      return res.status(404).json({ error: 'Prontuário não encontrado para esta consulta' });
    }

    res.status(200).json(prontuario);
  } catch (error) {
    console.error('Erro ao buscar prontuário:', error);
    res.status(500).json({ error: 'Erro ao buscar prontuário' });
  }
};

// Atualizar prontuário
export const atualizarProntuario = async (req, res) => {
  try {
    const { consultaId } = req.params;
    const { diagnostico, condutaMedica, observacoes } = req.body;

    const prontuario = await prisma.prontuario.update({
      where: { consultaId: Number(consultaId) },
      data: { diagnostico, condutaMedica, observacoes },
      include: {
        consulta: {
          include: {
            paciente: true,
            profissional: true
          }
        }
      }
    });

    res.status(200).json(prontuario);
  } catch (error) {
    console.error('Erro ao atualizar prontuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar prontuário' });
  }
};
