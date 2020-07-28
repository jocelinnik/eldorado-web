# Eldorado Web

Este sistema foi desenvolvido como um teste para vaga de estágio no Instituto de Pesquisa Eldorado.

## Contexto do sistema

O sistema foi desenvolvido em duas camadas: **Backend** e **Frontend**

### Backend

O backend do sistema foi desenvolvido na arquitetura **ReST API**, usando o ambiente Node JS:

* Framework **Express**
* Framework ORM **Sequelize**
* Banco de dados local **SQLite**
* Biblioteca de testes **Mocha**, **Chai** e **Supertest**

Os endpoints utilizados são

* GET /api/usuario/:email
* POST /api/usuario
* PUT /api/usuario/:id
* DELETE /api/usuario/:id

### Frontend

O frontend do sistema foi desenvolvido no padrão **Single Page Application (SPA)**, usando o Framework **Ionic** com **Angular**.

As telas desenvolvidas são:

* Entrar: região de login e cadastro no sistema
* Home: área restrira do sistema disponível após login
* Perfil: janela contendo informações do usuário, edição de dados e exclusão do perfil

(inserir imagens aqui)

## Instalação

* Backend: para instalar as depenências do projeto, abra um terminal ou prompt de comando, navegue até o diretório `ew-backend/` e rode o comando `npm install`;
* Frontend: para instalar as depenências do projeto, abra um terminal ou prompt de comando, navegue até o diretório `ew-frontend/` e rode o comando `npm install`;

## Execução

Para executar o sistema, abra dois terminais ou prompts de comando, um para o diretório `ew-backend` e outro para o diretório `ew-frontend` e siga os seguintes passos, nessa ordem:

* Diretório `ew-backend`: rode o comando `npm start`;
* Diretório `ew-frontend`: rode o comando `ionic serve`. Será aberto uma janela/aba do seu navegador padrão no endereço **http://localhost:8100/entrar**;

## Teste

Infelizmente não consegui configurar os testes unitários disponíveis nos componentes do frontend Angular. Dessa forma, estão disponíveis apenas testes unitários no backend do sistema. Para executá-los, vá até o terminal ou prompt de comando no diretório `ew-backend` (pare a execução do servidor se o mesmo estiver ativo, pressionando `CTRL + C`) e rode o comando `npm test`. Os testes unitários serão executados, e en seguida o servidor do backend será reiniciado. Após a execução de todos os testes, caso ache necessário pare a execução do servidor e rode novamente usando o comando `npm start`.