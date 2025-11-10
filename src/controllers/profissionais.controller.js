import { prisma } from '../config/database.js';

// Criar um profissional
export const criarProfissional = async (req, res) => {
    try {
        const { nome, crm, especialidade, telefone, email } = req.body;

        const profissional = await prisma.profissional.create({
            data: { nome, crm, especialidade, telefone, email }
        });

        res.status(201).json(profissional);
    } catch (error) {
        console.error('Erro ao criar profissionais: ', error);
        res.status(400).json( { error: 'Erro ao criar profissional'});
    }
};

// Listar profissionais
export const listarProfissionais = async (req, res) => {
    try {
        const profissionais = await prisma.profissional.findMany();
        res.status(200).json(profissionais);
    } catch (error) {
        console.error('Erro ao listar profissionais: ', error);
        res.status(500).json( {error: 'Erro ao listar os profissionais'} );
    }    
};

// Buscar profissional por ID
export const buscarProfissionalPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const profissional = await prisma.profissional.findUnique({
            where: { id: Number(id) },
        });

        if(!profissional) {
            return res.status(404),json( {error:'Profissional não encontrado'} );
        }

        res.status(200).json(profissional);
    } catch (error) {
        console.error('Erro ao buscar profissional:', error);
        res.status(500).json({ error: 'Erro ao buscar profissional' });
    }
};

// Atualizar profissional
export const atualizarProfissional = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, crm, especialidade, telefone, email } = req.body;
  
      const profissional = await prisma.profissional.update({
        where: { id: Number(id) },
        data: { nome, crm, especialidade, telefone, email },
      });
  
      res.status(200).json(profissional);
    } catch (error) {
      console.error('Erro ao atualizar profissional:', error);
      res.status(500).json({ error: 'Erro ao atualizar profissional' });
    }
  };
  
  // Deletar profissional
  export const deletarProfissional = async (req, res) => {
    try {
      const { id } = req.params;
  
      await prisma.profissional.delete({
        where: { id: Number(id) },
      });
  
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar profissional:', error);
      res.status(500).json({ error: 'Erro ao deletar profissional' });
    }
  };