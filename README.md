# 🏥 Sistema de Gestão Hospitalar e Agendamentos Médicos (SGH)

## 📘 Introdução

O presente projeto tem como objetivo o desenvolvimento de um **Sistema de Gestão Hospitalar e de Agendamentos Médicos (SGH)**, voltado à administração de **pacientes, profissionais da saúde, consultas médicas, prontuários e prescrições**.

Este projeto foi desenvolvido como parte do **Trabalho Final do Curso de Análise e Desenvolvimento de Sistemas**, com foco em boas práticas de arquitetura, organização em camadas e uso de tecnologias modernas para o back-end.

---

## 🎯 Objetivo Geral

Desenvolver um **sistema back-end completo** para gerenciar:

* Pacientes
* Profissionais de saúde
* Consultas e agendamentos
* Prontuários médicos
* Prescrições
* Usuários e autenticação

Garantindo:

* **Integridade dos dados**
* **Segurança de acesso (JWT)**
* **Disponibilidade e escalabilidade**

---

## ⚙️ Considerações Técnicas

* Arquitetura baseada em **camadas independentes** (controllers, middlewares, rotas)
* API **RESTful** com respostas padronizadas em JSON
* Banco relacional **PostgreSQL**
* ORM utilizado: **Prisma**
* Backend desenvolvido com **Node.js + Express**
* Autenticação via **JWT** e hashing de senha com **bcryptjs**

---

## 🧩 Estrutura de Pastas

```bash
📦 sistema-gestao-hospitalar
 ┣ 📂 prisma
 ┃ ┣ 📜 schema.prisma        # Modelos e relacionamentos
 ┃ ┗ 📜 migrations/          # Migrações do Prisma
 ┣ 📂 src
 ┃ ┣ 📂 controllers          # Lógica das operações
 ┃ ┣ 📂 routes               # Rotas da API
 ┃ ┣ 📂 middlewares          # Autenticação JWT e permissões
 ┃ ┣ 📂 config               # Configurações de banco e utilidades
 ┃ ┗ 📜 server.js            # Ponto de entrada do servidor
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 .env                   # Variáveis de ambiente
```

---

# 🚀 Como Executar o Projeto

## 1️⃣ Requisitos

* Node.js (versão 18+ recomendada)
* npm (instalado com o Node)
* PostgreSQL instalado e rodando

---

## 2️⃣ Instalar dependências

```bash
npm install
```

---

## 3️⃣ Configurar variáveis de ambiente

Crie o arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/banco?schema=public"
PORT=3000
JWT_SECRET="minha_chave_secreta"
JWT_EXPIRES="8h"
```

---

## 4️⃣ Configurar Prisma e Banco de Dados

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Opcional: abrir o Prisma Studio

```bash
npx prisma studio
```

---

## 5️⃣ Iniciar o servidor

```bash
npm run dev
```

O servidor rodará em:

```
http://localhost:3000
```

---

# 📡 Endpoints da API

A seguir, um resumo das principais rotas do sistema.

---

## 👤 Pacientes

| Método | Rota               | Descrição                 |
| ------ | ------------------ | ------------------------- |
| GET    | /api/pacientes     | Listar todos os pacientes |
| GET    | /api/pacientes/:id | Buscar por ID             |
| POST   | /api/pacientes     | Criar paciente            |
| PUT    | /api/pacientes/:id | Atualizar paciente        |
| DELETE | /api/pacientes/:id | Excluir paciente          |

---

## 🩺 Profissionais

| Método | Rota                   |
| ------ | ---------------------- |
| GET    | /api/profissionais     |
| GET    | /api/profissionais/:id |
| POST   | /api/profissionais     |
| PUT    | /api/profissionais/:id |
| DELETE | /api/profissionais/:id |

---

## 📅 Consultas

| Método | Rota                        |
| ------ | --------------------------- |
| GET    | /api/consultas              |
| GET    | /api/consultas/:id          |
| POST   | /api/consultas              |
| PUT    | /api/consultas/:id          |
| PATCH  | /api/consultas/:id/cancelar |

---

## 📝 Prontuários

| Método | Rota                         |
| ------ | ---------------------------- |
| POST   | /api/prontuarios             |
| GET    | /api/prontuarios/:consultaId |
| PUT    | /api/prontuarios/:consultaId |

---

## 💊 Prescrição

| Método | Rota                          |
| ------ | ----------------------------- |
| POST   | /api/prescricao               |
| GET    | /api/prescricao/:prontuarioId |
| DELETE | /api/prescricao/:id           |

---

## 🔐 Autenticação e Usuários

| Método | Rota              |                         |
| ------ | ----------------- | ----------------------- |
| POST   | /api/usuarios     | Criar usuário           |
| POST   | /api/auth/login   | Login                   |
| GET    | /api/usuarios     | Listar usuários (admin) |
| GET    | /api/usuarios/:id | Buscar usuário          |

**Atenção:** rotas protegidas exigem header:

```
Authorization: Bearer <TOKEN>
```

---

# 🏛️ Arquitetura do Sistema

O projeto utiliza uma **arquitetura modular em camadas**, garantindo:

* Separação de responsabilidades
* Alta manutenibilidade
* Facilidade para testes
* Evolução escalável

Principais camadas:

* **Rotas:** definem os endpoints
* **Controllers:** regras de negócio e validações
* **Middlewares:** autenticação e permissões
* **Prisma ORM:** acesso e manipulação do banco PostgreSQL

---

Se tiver dúvidas ou quiser implementar novas funcionalidades, fique à vontade para abrir uma issue ou contribuir! 🚀
