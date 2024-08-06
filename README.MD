# Schedule Church

Bem-vindo ao **Schedule Church**, uma aplicação projetada para ajudar a gerenciar escalas, check-ins e muito mais para igrejas. Este README guiará você através das funcionalidades, instalação e uso da aplicação.

## Sumário

1. [Funcionalidades](#funcionalidades)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
4. [Uso](#uso)
5. [Endpoints da API](#endpoints-da-api)
6. [Modelos de Dados](#modelos-de-dados)
7. [Contribuições](#contribuições)
8. [Licença](#licença)

## Funcionalidades

- **Gerenciamento de Usuários**:
  [x] Registrar e autenticar usuários.
  [x] Listar perfis de usuários.
  [x] Atualizar roles de usuários (apenas admin).
  [] Visualizar perfil unico de usuário.

- **Check-Ins**:
  [x] Registrar check-ins na escala.
  [] Recusar um cehck-in de escala.

- **Escalas**:
  [] Visualizar e gerenciar escalas (passadas e futuras).
  [] Acessar o histórico de escalas do usuário.

## Requisitos

[x] **Node.js**: Versão 14.x ou superior
[x] **PostgreSQL**: Banco de dados para persistência dos dados
[x] **Fastify**: Framework web
[x] **Prisma**: ORM para interações com o banco de dados
[x] **JWT**: Para autenticação de usuários
