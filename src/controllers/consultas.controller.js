import { prisma } from '../config/database.js';

// Criar (agendar) uma consulta
export const criarConsulta = async (req, res) => {
  try {
    const { dataHora, pacienteId, profissionalId, observacoes } = req.body;

    // Verifica se o paciente existe
    const paciente = await prisma.paciente.findUnique({
      where: { id: Number(pacienteId) },
    });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    // Verifica se o profissional existe
    const profissional = await prisma.profissional.findUnique({
      where: { id: Number(profissionalId) },
    });
    if (!profissional) {
      return res.status(404).json({ error: 'Profissional não encontrado' });
    }

    // Verifica se o horário já está ocupado pelo profissional
    const conflito = await prisma.consulta.findFirst({
      where: {
        profissionalId: Number(profissionalId),
        dataHora: new Date(dataHora),
        status: { not: 'cancelada' },
      },
    });

    if (conflito) {
      return res.status(400).json({
        error: 'Horário indisponível. O profissional já possui uma consulta nesse horário.',
      });
    }

    // Cria a consulta
    const consulta = await prisma.consulta.create({
      data: {
        dataHora: new Date(dataHora),
        pacienteId: Number(pacienteId),
        profissionalId: Number(profissionalId),
        observacoes,
      },
      include: {
        paciente: true,
        profissional: true,
      },
    });

    res.status(201).json(consulta);
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    res.status(500).json({ error: 'Erro ao criar consulta' });
  }
};

// Listar todas as consultas
export const listarConsultas = async (req, res) => {
  try {
    const consultas = await prisma.consulta.findMany({
      include: {
        paciente: true,
        profissional: true,
      },
      orderBy: { dataHora: 'asc' },
    });

    res.status(200).json(consultas);
  } catch (error) {
    console.error('Erro ao listar consultas:', error);
    res.status(500).json({ error: 'Erro ao listar consultas' });
  }
};

// Buscar consulta por ID
export const buscarConsultaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await prisma.consulta.findUnique({
      where: { id: Number(id) },
      include: {
        paciente: true,
        profissional: true,
      },
    });

    if (!consulta) {
      return res.status(404).json({ error: 'Consulta não encontrada' });
    }

    res.status(200).json(consulta);
  } catch (error) {
    console.error('Erro ao buscar consulta:', error);
    res.status(500).json({ error: 'Erro ao buscar consulta' });
  }
};

// Atualizar (remarcar) consulta
export const atualizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const { dataHora, status, observacoes } = req.body;
    
    //todo: verificar se o novo horário está disponível

    const consulta = await prisma.consulta.update({
      where: { id: Number(id) },
      data: {
        dataHora: dataHora ? new Date(dataHora) : undefined,
        status,
        observacoes,
      },
    });

    res.status(200).json(consulta);
  } catch (error) {
    console.error('Erro ao atualizar consulta:', error);
    res.status(500).json({ error: 'Erro ao atualizar consulta' });
  }
};

// Cancelar consulta
export const cancelarConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await prisma.consulta.update({
      where: { id: Number(id) },
      data: { status: 'cancelada' },
    });

    res.status(200).json({ message: 'Consulta cancelada com sucesso', consulta });
  } catch (error) {
    console.error('Erro ao cancelar consulta:', error);
    res.status(500).json({ error: 'Erro ao cancelar consulta' });
  }
};
