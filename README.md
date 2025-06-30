![image](https://user-images.githubusercontent.com/103967442/218341093-588b71a8-f380-4ce4-92fb-12453e3e384e.png)
![image](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![image](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![image](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![image](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![image](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

# Rest API em Node.js e Express.js - Planner para registro e consulta de usuários e eventos


> Projeto desenvolvido para estudos de API RESTful com Express e Node.js

Essa aplicação em JavaScript segue a proposta de "Um planner que irá ajudar o cliente a organizar sua semanas, tarefas e quando elas acontecem". Nela foram implementadas as funções de: 

**Usuários** - listar todos os usuários, sign up e sign in;  
**Eventos** - criar novo evento, listar todos os eventos, listar eventos pelo id ou dia da semana e deletar eventos pelo id ou dia da semana.

No momento não é usado banco de dados. Os usuários e eventos são registrados em arquivos JSON, users.json e events.json, respectivamente.   

> 📄 A documentação detalhada dos endpoints (requisições, parâmetros, exemplos de request/response e erros) está disponível no arquivo [`endpoints.md`](./endpoints.md)

---

## Índice

<!--ts-->

- [Tecnologias usadas](#tecnologias-usadas)
- [Como rodar localmente](#como-rodar-localmente)
- [Validações](#validações)
  - [Registro de Usuário](#registro-de-usuário)
  - [Registro de Evento](#registro-de-evento)
- [Como testar usando Postman com servidor local](#como-testar-usando-postman-com-servidor-local)
- [Como testar usando Postman com deploy](#como-testar-usando-postman-com-deploy)
- [Créditos](#créditos)
<!--te-->

## Tecnologias usadas

- Node.js 8.19.3
- Express 4.18.2
- Nodemon 2.0.20
- Eslint 8.34.0
- Postman

## Como rodar localmente

1. Clonar esse repositório ou um fork dele no seu ambiente de desenvolvimento. (git clone + url do projeto)
2. Entrar no diretório do projeto
3. Instalar as dependências pelo terminal com o comando: `npm i`
4. Entrar em `package.json` e alterar em "scripts" de `"start": "node ./src/server.js"` para `"start": "nodemon ./src/server.js"`
5. Entrar em `./src/server.js` e alterar a `port` de `process.env.PORT` para a porta que você deseja rodar localmente (ex: 3000)
6. Rodar `npm start` no terminal (ou `node ./src/server.js` se não quiser usar o nodemon)

📌 Atenção: Os arquivos `users.json` e `events.json`, quando vazios, devem conter `[]` para evitar erros ao registrar objetos.

---

## Validações

### Registro de usuário

- Verifica se todos os campos obrigatórios foram preenchidos
- Impede criação de usuários com e-mail já existente
- Confirma se `password` e `confirmPassword` são iguais

### Registro de evento

- Verifica presença de campos obrigatórios
- Valida se o campo `dateTime` está em formato válido (`YYYY/MM/DD`)

---

## Como testar usando Postman com servidor local

1. Inicie o servidor local com `npm start`
2. No Postman, selecione o tipo de requisição (GET, POST, DELETE)
3. Use `http://127.0.0.1:3000/api/v1/...` como base
4. Para POST, vá em "Body" > "raw" > selecione "JSON" e insira os dados de entrada
5. Clique em "Send" e veja a resposta

---

## Como testar usando Postman com deploy

Caso esteja usando deploy (ex: Railway), substitua o `localhost` pela URL gerada.  
Exemplo:

```
POST https://challenge1-production-9cbc.up.railway.app/api/v1/users
```

Lembrando que para realizar o deploy, em ./scr/server.js a porta deve ser process.env.PORT e em package.json o "script" deve ser ```"start": "node ./src/server.js"```  

## 🧪 Testes Automatizados das Rotas de Eventos

Este projeto inclui um script para **testes automatizados das rotas de eventos** da API, garantindo que funcionalidades essenciais continuem funcionando corretamente após alterações no código.

### Como executar os testes

1. Certifique-se de que a API está rodando localmente (`npm start` ou `node src/server.js`).
2. No terminal, execute: ```node testEvents.js```


### O que é testado

O script `testEvents.js` realiza os seguintes testes automáticos:
- Criação de evento com dados válidos (`POST /api/v1/events`)
- Tentativa de criação de evento com data inválida (esperando erro)
- Consulta de eventos (`GET /api/v1/events`)
- Consulta de evento específico por ID (`GET /api/v1/events/:id`)
- Exclusão de evento por ID (`DELETE /api/v1/events/:id`)

Ao final, o resultado de cada teste é exibido diretamente no terminal, indicando sucesso ou detalhes do erro retornado pela API.

### Objetivo

Esses testes garantem que, a cada alteração ou correção realizada, as principais rotas de eventos continuam funcionando conforme o esperado, reduzindo o risco de bugs passarem despercebidos para produção.

---

## Créditos

Para o desenvolvimento dessa API, foram usados os conhecimentos adquiridos no curso **Node.js, Express, MongoDB & More: The Complete Bootcamp 2023** disponibilizado pela **Compass Uol** no programa de bolsas Back-end Journey (Node.js) na **Udemy**.  
[Curso na Udemy](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15064884?course_portion_id=282878&learning_path_id=4195930#overview)
