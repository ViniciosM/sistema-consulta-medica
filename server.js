import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router as pacientesRouter} from "./src/routes/pacientes.routes.js";
import {router as profissionaisRouter} from "./src/routes/profissional.routes.js";
import {router as consultasRoutes} from "./src/routes/consultas.routes.js";
import {router as prontuarioRoutes} from "./src/routes/prontuario.routes.js";
import {router as prescricaoRoutes} from "./src/routes/prescricao.routes.js";
import { router as authRoutes } from './src/routes/auth.routes.js';
import { router as usuarioRoutes } from './src/routes/usuario.routes.js';



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pacientes', pacientesRouter);
app.use('/api/profissionais', profissionaisRouter);
app.use('/api/consultas', consultasRoutes);
app.use('/api/prontuario', prontuarioRoutes);
app.use('/api/prescricao', prescricaoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


