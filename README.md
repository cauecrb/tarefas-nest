# Projeto Full Stack: Backend em NestJS e Frontend em React

Este projeto é uma aplicação full stack composta por um backend desenvolvido com NestJS e um frontend construído com React. A seguir, você encontrará instruções detalhadas para instalação, configuração e execução de ambas as partes da aplicação.

---

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
  - [Clonando o Repositório](#clonando-o-repositório)
  - [Configuração do Backend](#configuração-do-backend)
  - [Configuração do Frontend](#configuração-do-frontend)
- [Execução](#execução)
  - [Executando o Backend](#executando-o-backend)
  - [Executando o Frontend](#executando-o-frontend)

---

## Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)
- Git

---

# Frontend

- React 18: Biblioteca para construção de interfaces
- TypeScript: Superset tipado de JavaScript
- React Router 6: Gerenciamento de rotas
- Axios: Cliente HTTP para requisições à API
- Material Icons: Biblioteca de ícones
- CSS Moderno: Flexbox, Grid, Animações

# Backend
- Node.js: Ambiente de execução JavaScript
- Nest.js: Framework web para Node.js
- Postgresql: Banco de dados SQL
- JWT: Autenticação baseada em tokens
- Bcrypt: Criptografia de senhas
- Cors: Middleware para habilitar CORS
- Dotenv: Gerenciamento de variáveis de ambiente


---

## Instalação

### 1. Clonando o Repositório

Abra o terminal e clone o repositório:

```bash
git clone https://github.com/cauecrb/tarefas-nest.git
```

Depois, navegue até o diretório do projeto:

```bash
cd tarefas-nest
```

### 2. Configuração do Backend

Navegue até a pasta do backend e instale as dependências:

```bash
cd backend
npm install
```

*Observação:* O backend foi desenvolvido utilizando o framework NestJS. Após a instalação das dependências, você pode configurar variáveis de ambiente, se necessário, em um arquivo `.env`.

### 3. Configuração do Frontend

Navegue até a pasta do frontend e instale as dependências:

```bash
cd ../frontend
npm install
```

*Observação:* O frontend utiliza React com TypeScript e outras bibliotecas (ex.: React Router, Axios, Material Icons). Certifique-se de que todas as dependências sejam instaladas corretamente.

---

## Execução

As instruções abaixo mostram como iniciar as duas partes do projeto.

### Executando o Backend

Navegue para a pasta `backend` e execute um dos comandos abaixo para iniciar o servidor:

- Modo de desenvolvimento:

  ```bash
  npm run start
  ```

- Modo de desenvolvimento com hot-reload:

  ```bash
  npm run start:dev
  ```

- Modo de produção:

  ```bash
  npm run start:prod
  ```

Após a execução, o backend estará disponível em `http://localhost:3000` por padrão.

### Executando o Frontend

Navegue para a pasta `frontend` e inicie a aplicação:

```bash
npm start
```

O frontend será inicializado e, geralmente, estará disponível em `http://localhost:3001` (ou outra porta configurada, conforme o seu ambiente).

---

## Funcionalidades

### Autenticação de Usuários

- Registro de novas contas
- Login com email e senha
- Armazenamento seguro de tokens JWT

### Gerenciamento de Tarefas

- Criação de novas tarefas
- Visualização em grid com cards
- Edição via modal interativo
- Exclusão com confirmação
- Filtragem por status

### Paginação

- Exibição de 10 tarefas por página
- Navegação intuitiva entre páginas
- Indicador visual da página atual

### Notificações de Vencimento

- Indicadores visuais para tarefas atrasadas
- Alertas para tarefas que vencem hoje
- Notificações para tarefas que vencem em breve (próximos 3 dias)

Desenvolvido por Caue Rafael Burgardt.
