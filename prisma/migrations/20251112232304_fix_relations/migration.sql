-- CreateTable
CREATE TABLE "Consulta" (
    "id" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'agendada',
    "observacoes" TEXT,
    "pacienteId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prontuario" (
    "id" SERIAL NOT NULL,
    "consultaId" INTEGER NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "condutaMedica" TEXT NOT NULL,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prontuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescricao" (
    "id" SERIAL NOT NULL,
    "prontuarioId" INTEGER NOT NULL,
    "medicamento" TEXT NOT NULL,
    "dosagem" TEXT NOT NULL,
    "orientacoes" TEXT,

    CONSTRAINT "Prescricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prontuario_consultaId_key" ON "Prontuario"("consultaId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prontuario" ADD CONSTRAINT "Prontuario_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "Consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescricao" ADD CONSTRAINT "Prescricao_prontuarioId_fkey" FOREIGN KEY ("prontuarioId") REFERENCES "Prontuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
