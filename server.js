import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router as pacientesRouter} from "./src/routes/pacientes.routes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/pacientes", pacientesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

