import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router as pacientesRouter} from "./src/routes/pacientes.routes.js";
import {router as profissionaisRouter} from "./src/routes/profissional.routes.js";
import {router as consultasRoutes} from "./src/routes/consultas.routes.js";
import {router as prontuarioRoutes} from "./src/routes/prontuario.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pacientes', pacientesRouter);
app.use('/api/profissionais', profissionaisRouter);
app.use('/api/consultas', consultasRoutes);
app.use('/api/prontuario', prontuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

