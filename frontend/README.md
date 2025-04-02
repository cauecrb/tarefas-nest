# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Projeto Full Stack NestJS e React
Este projeto consiste em uma aplicação full stack com backend em NestJS e frontend em React. Abaixo estão as instruções detalhadas para instalação, execução e uma visão geral das funcionalidades.

Estrutura do Projeto
O projeto está dividido em duas partes principais:

Backend: API RESTful desenvolvida com NestJS
Frontend: Interface de usuário desenvolvida com React
Requisitos de Sistema
Node.js (v14 ou superior)
npm (v6 ou superior)
Git
Instalação
1. Clone o Repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio



2. Configuração do Backend
cd backend
npm install



3. Configuração do Frontend
cd ../frontend
npm install



Execução do Projeto
Backend
Para iniciar o servidor backend, navegue até a pasta backend e execute um dos seguintes comandos:

# Modo de desenvolvimento
npm run start



# Modo de desenvolvimento com hot-reload
npm run start:dev



# Modo de produção
npm run start:prod



O servidor backend estará disponível em http://localhost:3000 por padrão.

Frontend
Para iniciar a aplicação frontend, navegue até a pasta frontend e execute:

npm start



A aplicação frontend estará disponível em http://localhost:3001 por padrão.

Testes
Backend
# Executar testes unitários
npm run test



# Executar testes end-to-end
npm run test:e2e



# Verificar cobertura de testes
npm run test:cov



Funcionalidades
Backend (NestJS)
API RESTful: Endpoints para gerenciamento de recursos
Autenticação e Autorização: Sistema seguro de login e controle de acesso
Validação de Dados: Validação de entrada para garantir integridade dos dados
Conexão com Banco de Dados: Integração com banco de dados para persistência
Documentação da API: Documentação automática dos endpoints disponíveis
Tratamento de Erros: Sistema robusto de tratamento de exceções
Frontend (React)
Interface Responsiva: Design adaptável para diferentes tamanhos de tela
Gerenciamento de Estado: Controle eficiente do estado da aplicação
Formulários Interativos: Formulários com validação em tempo real
Navegação entre Páginas: Sistema de roteamento para múltiplas páginas
Consumo da API: Integração com o backend para obtenção e envio de dados
Feedback Visual: Notificações e indicadores de carregamento para melhor experiência do usuário
Estrutura de Diretórios
projeto/
├── backend/           # Código do servidor NestJS
│   ├── src/           # Código fonte
│   ├── test/          # Testes
│   └── README.md      # Documentação do backend
│
└── frontend/          # Código da aplicação React
    ├── public/        # Arquivos estáticos
    ├── src/           # Código fonte
    └── README.md      # Documentação do frontend



Deployment
Backend
O backend pode ser implantado em diversos ambientes. Para ambientes de produção, recomendamos:

npm run build
npm run start:prod



Para implantação na nuvem, o NestJS oferece suporte oficial através da plataforma Mau:

npm install -g mau
mau deploy



Frontend
Para preparar o frontend para produção:

npm run build



Isso criará uma versão otimizada da aplicação na pasta build/, que pode ser servida por qualquer servidor web estático.

# 📋 Gerenciador de Tarefas Fullstack

Aplicação web moderna para gerenciamento de tarefas pessoais com autenticação JWT e CRUD completo.

## 📚 Sumário
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)

## 📋 Pré-requisitos
- Node.js v18+
- npm v9+
- PostgreSQL v15+
- Git

## 📥 Instalação

### 1. Clone o repositório

git clone https://github.com/seu-usuario/gerenciador-tarefas.git
cd gerenciador-tarefas


2. Configure o Backend

cd backend
npm install


3. Configure o Frontend

cd ../frontend
npm install


⚙️ Configuração

Banco de Dados (PostgreSQL)

CREATE DATABASE tarefas_db;
Variáveis de Ambiente (Backend)


Crie um arquivo .env na pasta backend:

PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tarefas_db
DB_USER=postgres
DB_PASSWORD=sua_senha
JWT_SECRET=seu_secreto_jwt

🚀 Execução

Inicie o Backend

cd backend
npm run start:dev

Inicie o Frontend

cd ../frontend
npm start
Acesse no navegador:
http://localhost:3001

✨ Funcionalidades
🔐 Autenticação
Registro de usuário com confirmação de senha

Login com JWT

Logout seguro

✅ Gerenciamento de Tarefas
Criação de tarefas com título, descrição e data de vencimento

Visualização em grid responsivo

Edição em modal flutuante

Exclusão com confirmação

Filtro por status:

⏳ Pendente

🚧 Em Progresso

✅ Concluída

🎨 Interface Moderna
Design com Glassmorphism

Animações suaves

Responsividade mobile-first

Feedback visual em tempo real

🛠 Tecnologias
Frontend
React 18

TypeScript

Axios

React Router 6

React Icons

CSS Moderno (Grid/Flexbox)

Backend
NestJS

TypeORM

PostgreSQL

JWT Authentication

Class-Validator

Bcrypt

Banco de Dados
PostgreSQL