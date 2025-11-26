import { prisma } from '../config/database.js';

// Criar prescrição
export const criarPrescricao = async (req, res) => {
  try {
    const { prontuarioId, medicamento, dosagem, orientacoes } = req.body;

    // Verifica se o prontuário existe
    const prontuario = await prisma.prontuario.findUnique({
      where: { id: Number(prontuarioId) }
    });

    if (!prontuario) {
      return res.status(404).json({ error: 'Prontuário não encontrado' });
    }

    const prescricao = await prisma.prescricao.create({
      data: {
        prontuarioId: Number(prontuarioId),
        medicamento,
        dosagem,
        orientacoes
      }
    });

    res.status(201).json(prescricao);
  } catch (error) {
    console.error('Erro ao criar prescrição:', error);
    res.status(500).json({ error: 'Erro ao criar prescrição' });
  }
};

// Listar prescrições por prontuário
export const listarPrescricoes = async (req, res) => {
  try {
    const { prontuarioId } = req.params;

    const prescricoes = await prisma.prescricao.findMany({
      where: { prontuarioId: Number(prontuarioId) }
    });

    res.status(200).json(prescricoes);
  } catch (error) {
    console.error('Erro ao listar prescrições:', error);
    res.status(500).json({ error: 'Erro ao listar prescrições' });
  }
};

// Deletar prescrição
export const deletarPrescricao = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.prescricao.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar prescrição:', error);
    res.status(500).json({ error: 'Erro ao deletar prescrição' });
  }
};
