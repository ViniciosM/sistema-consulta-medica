# 🏥 Sistema de Gestão Hospitalar e Agendamentos Médicos (SGH)

## 📘 Introdução

O presente projeto tem como objetivo o desenvolvimento de um **Sistema de Gestão Hospitalar e de Agendamentos Médicos (SGH)**, voltado à administração de **pacientes, profissionais da saúde e consultas médicas**.  

Este projeto foi desenvolvido como parte do **Trabalho Final do Curso de Análise e Desenvolvimento de Sistemas**, com foco em boas práticas de arquitetura, separação em camadas e uso de tecnologias modernas para o back-end.

---

## 🎯 Objetivo Geral

Desenvolver um **sistema back-end** para gestão de **pacientes, profissionais de saúde e agendamento de consultas**, garantindo:
- **Integridade dos dados**
- **Segurança no acesso**
- **Disponibilidade e confiabilidade dos serviços**

---

## ⚙️ Considerações Técnicas

- Arquitetura baseada em **camadas independentes** (controllers, services, repositories), favorecendo **manutenção, testes e reuso**.
- Tecnologias:
- **Node.js**, **Express**
- Banco de Dados: **PostgreSQL** 
- ORM utilizado: **Prisma**
- Retorno dos endpoints em formato **padronizado JSON**

---

## 🧩 Estrutura de Pastas

```bash
📦 sistema-gestao-hospitalar
 ┣ 📂 prisma
 ┃ ┣ 📜 schema.prisma        # Definição dos modelos e configuração do banco
 ┃ ┗ 📜 client.js            # Instância do Prisma Client
 ┣ 📂 src
 ┃ ┣ 📂 controllers          # Controladores (lógica das rotas)
 ┃ ┣ 📂 routes               # Definição das rotas
 ┃ ┣ 📂 services             # (Opcional) Regras de negócio
 ┃ ┗ 📜 server.js            # Ponto de entrada da aplicação
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 .env                   # Configurações do banco de dados e variáveis de ambiente
