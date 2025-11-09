import { prisma } from "../config/database.js";

// Criar paciente
export const criarPaciente = async (req, res) => {
    try {
        const paciente = await prisma.paciente.create({
            data: req.body,
        });
        res.status(201).json(paciente);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Listar os pacientes
export const listarPacientes = async (req, res) => {
    try {
        const pacientes = await prisma.paciente.findMany();
        res.status(200).json(pacientes);
    } catch (error) {
        console.error('Erro ao listar pacientes:', error);
        res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
}

// Buscar paciente por ID
export const buscarPacientePorId = async (req, res) => {
    const { id } = req.params;
    const paciente = await prisma.paciente.findUnique({
        where: { id: Number(id) },
    });
    if(!paciente) return res.status(404).json({ error: "Paciente não encontrado"});
    res.json(paciente);
};

// Atualizar paciente
export const atualizarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await prisma.paciente.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.json(paciente)
    } catch (error) {
        res.status(400).json( { erro: "Erro ao atualizar paciente" });
    }
};

// Deletar paciente
export const deletarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.paciente.delete({
            where: { id: Number(id) },
        });
    } catch(error) {
        res.status(400).json( {error: "Erro ao excluir paciente"} );
    }
}

