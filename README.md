![image](https://user-images.githubusercontent.com/103967442/218341093-588b71a8-f380-4ce4-92fb-12453e3e384e.png)
![image](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![image](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![image](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![image](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![image](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

# Rest API em Node.js e Express.js - Planner para registro e consulta de usuários e eventos

Essa aplicação em JavaScript segue a proposta de "Um planner que irá ajudar o cliente a organizar sua semanas, tarefas e quando elas acontecem". Referente ao "challenge 1" do programa de bolsas Back-end Journey (Node.js) da Compass Uol. Nela foram implementadas as funções de:   

**Usuários** - listar todos os usuários, sign up e sign in;    
**Eventos** - criar novo evento, listar todos os eventos, listar eventos pelo id ou dia da semana e deletar eventos pelo id ou dia da semana.

No momento não é usado banco de dados. Os usuários e eventos são registrados em arquivos JSON, users.json e events.json, respectivamente.

## Índice
<!--ts-->

   * [Tecnologias usadas](#tecnologias-usadas)
   * [Como rodar localmente](#como-rodar-localmente)
   * [Arquitetura](#arquitetura)
      * [Users](#users)
      * [Events](#events)
   * [Validações](#validações)
      * [Registro de Usuário](#registro-de-usuário)
      * [Registro de Evento](#registro-de-evento)
   * [Como testar usando Postman com servidor local](#como-testar-usando-postman-com-servidor-local)
   * [Como testar usando Postman com deploy](#como-testar-usando-postman-com-deploy)
   * [Créditos](#créditos)
<!--te-->

## Tecnologias usadas
* Node.js 8.19.3
* Express 4.18.2
* Nodemon 2.0.20
* Eslint 8.34.0
* Postman


## Como rodar localmente  
1. Clonar esse repositório ou um fork dele no seu ambiente de desenvolvimento. (git clone + url do projeto)
2. Entrar no diretório do projeto  
3. Instalar as dependências pelo terminal com o comando: ```npm i```   
4. Entrar em package.json e alterar em "scripts" de ```"start": "node ./src/server.js"``` para ```"start": "nodemon ./src/server.js"```  

   ![image](https://user-images.githubusercontent.com/103967442/218485548-4c2c3837-50df-481c-bc23-a0ec25c3811a.png) ![image](https://user-images.githubusercontent.com/103967442/218489364-2b3bb7ae-932d-458a-a9ca-d430b50d662e.png)


5. Entrar em ./src/server.js e alterar a port de ```process.env.PORT``` para a porta que você deseja rodar localmente. (ex: 3000)  

   ![image](https://user-images.githubusercontent.com/103967442/218485447-753d7de6-5395-444b-88db-778dce94bfde.png) ![image](https://user-images.githubusercontent.com/103967442/218489448-789111cf-1d70-415a-b467-8dc44996d2cb.png)


6. Usar o comando ```npm start``` no terminal, que executará o programa automaticamente até que você cancele com Ctrl + C.  
OBS: O Nodemon não é obrigatório, mas facilita. É possível rodar sem ele com o comando: ```node ./src/server.js```

Referente ao item 5. e 6.: a porta process.env.PORT e o script ```"start": "node ./src/server.js"``` estão dessa forma para realizar o deploy pelo Railway.

_Atenção_: Os arquivos users.json e events.json, quando vazios, devem conter [] para que os objetos possam ser registrados neles.

## Arquitetura
Configurações genéricas de local host na porta 3000:  
Obs: a rout base do projeto foi definida como /api/v1.

Caso tente acessar algum rota que não foi definida, é retornada a mensagem:  
  ```
  {
    "status": "failure",
    "message": "This route is not defined"
  }
  ```
  
### USERS 

* **Listagem de usuários** - GET 127.0.0.1:3000/api/v1/users  
  Em caso de sucesso retorna todos os usuários registrados no formato JSON. Veja o exemplo a seguir:  
  ```
  [
    {
        "firstName": "Fulano",
        "lastName": "de Tal",
        "birthDate": "2004-05-20",
        "city": "Campo Grande",
        "country": "Brasil",
        "email": "exemplo@gmail.com",
        "password": "exemplo",
        "confirmPassword": "exemplo"
    },
    {
        "firstName": "Beltrano",
        "lastName": "de Tal",
        "birthDate": "2004-05-20",
        "city": "Campo Grande",
        "country": "Brasil",
        "email": "exemplo1@gmail.com",
        "password": "exemplo1",
        "confirmPassword": "exemplo1"
    }
  ]   
  ```
  Se não houver nenhum usuário registrado, será retornada a mensagem:
  ```
  {
    "message": "No user registered"
  }
  ```
 
  
* **Sign Up** (registrar usuário) - POST 127.0.0.1:3000/api/v1/users  
  A entrada deve ser um JSON seguinto o padrão:  
  ```
  {
	"firstName": "Fulano",
	"lastName": "de Tal",
	"birthDate": "2004-05-20",
	"city": "Campo Grande",
	"country": "Brasil",
	"email": "exemplo@gmail.com",
	"password": "exemplo",
	"confirmPassword": "exemplo"
   }    
   ```  
   Todos os campos devem seguir a Camel Notation: se a palavra não é composta, tudo em minúsculo. Caso contratrário, apenas a primeira letra da palavra composta fica em maiúsculo. Como em "birthDate" e "confirmPassword".  
   A API não realiza o registro de mais de um usuário por vez.
  
   Em caso de sucesso, retorna o status "sucess" e o as informações do usuário no formato JSON. Veja o exemplo a seguir:  
   ```
   {
    "status": "sucess",
    "user": {
	"firstName": "Beltrano",
	"lastName": "de Tal",
	"birthDate": "2004-05-20",
	"city": "Campo Grande",
	"country": "Brasil",
	"email": "exemplo1@gmail.com",
	"password": "exemplo1",
	"confirmPassword": "exemplo1"
     }
   }   
 
  
* **Sign In** (entrar com usuário) - POST 127.0.0.1:3000/api/v1/users/signIn  
    A entrada deve ser um JSON seguinto o padrão:  
    ```
    {
    "email": "exemplo@gmail.com",
    "password": "exemplo"
    }  
    ```  
    
    Em caso de sucesso retorna o status "sucess" e o a mensagem de "Looged User" no formato JSON. Veja o exemplo a seguir:  
    ```
    {
    "status": "sucess",
    "message": "Logged User"
    }
    ```  
    
    Em caso de falha, retorna a mensagem:
    ```
    {
      "status": "failure",
      "message": "Incorrect email or password."
    }
    ```
    
 ### EVENTS  
 * **Listagem de eventos** - GET 127.0.0.1:3000/api/v1/events  
    Em caso de sucesso retorna todos os eventos registrados no formato JSON. Veja o exemplo a seguir:  
    ```[
      {
        "id": "0",
        "description": "Evento 1",
        "dateTime": "2023-02-12T04:00:00.000Z",
        "weekday": "sunday",
        "createdAt": "Sun Feb 12 2023 20:26:10 GMT-0400 (Horário Padrão do Amazonas)"
      },
      {
        "id": "1",
        "description": "Evento 2",
        "dateTime": "2023-02-13T04:00:00.000Z",
        "weekday": "monday",
        "createdAt": "Sun Feb 12 2023 20:26:18 GMT-0400 (Horário Padrão do Amazonas)"
      }
    ]  
    ```
   
   Se não houver nenhum evento registrado, é retornada a mensagem:
   ```
   {
    "message": "No event registered"
   }
   ```

* **Criar novo evento** - POST 127.0.0.1:3000/api/v1/events  
    A entrada deve ser um JSON seguinto o padrão:  
    ```
    {
     "description": "Evento 1",
     "dateTime": "2023/02/12"
    }   
    ```  
   
   OBS: o formato deve ser YYYY/MM/DD usando necessariamente / , senão a função de getDate() pode interpretar errado. Por exemplo, usando - no lugar de / , a função
   interpreta como MM-DD-YYYY.  
  
   A API se encarrega de criar um ID, ver o dia da semana e registrar o horário e data que o evento foi criado.    
  	
   Em caso de sucesso, retorna o status "sucess" e o evento registrado no formato JSON. Veja o exemplo a seguir:  
  
    ```
    {
      {
        "status": "sucess",
        "data": {  
	  "eventData": {
	      "id": "0",  
	      "description": "Evento 1",  
	      "dateTime": "2023-02-12T00:00:00.000Z",  
	      "weekday": "saturday",  
	      "createdAt": "Sun Feb 12 2023 20:20:14 GMT-0400 (Horário Padrão do Amazonas)"  
	  }
        }
      }
    }  
    ```   
 
     
* **Listar eventos pelo ID** - GET 127.0.0.1:3000/api/v1/events/:id   
  No lugar de :id se coloca o id que quer buscar, e se tudo der certo é retornado o evento em formato JSON. Exemplo:
     ```
     {
      "id": "1",
      "description": "Evento 2",
      "dateTime": "2023-02-13T04:00:00.000Z",
      "weekday": "monday",
      "createdAt": "Sun Feb 12 2023 20:26:18 GMT-0400 (Horário Padrão do Amazonas)"
    }
     ```
  Se não houver nenhum evento com o id passado, é retornada a mensagem:  
  ```
  {
    "status": "failure",
    "message": "ID 0 not found"
  }
  ```
  
* **Listar eventos pelo dia da semana** - GET 127.0.0.1:3000/api/v1/events/dayOfTheWeek=dia  
  Ex: 127.0.0.1:8000/api/v1/events?dayOfTheWeek=monday)  
  No lugar de dia se coloca o dia da semana que quer buscar,
  e se tudo der certo são retornados todos os eventos que serão nesse dia da semana em formato JSON. Exemplo:
     ```
     {
      "id": "1",
      "description": "Evento 2",
      "dateTime": "2023-02-13T04:00:00.000Z",
      "weekday": "monday",
      "createdAt": "Sun Feb 12 2023 20:26:18 GMT-0400 (Horário Padrão do Amazonas)"
    }
     ```     
  Se não houver nenhum evento com o dia passado, é retornada a mensagem:  
  ```
  {
    "message": "Event on monday not found"
  }
  ```
     
* **Deletar eventos pelo id** - DELETE 127.0.0.1:3000/api/v1/events/:id  
  No lugar de :id se coloca o id que quer buscar, e se tudo der certo é retornada uma mensagem com status "sucess" em formato JSON. Exemplo:
     ```
     {
      "status": "sucess",
      "message": "Event id: 0 - deleted"
     }
     ```      
  Se não houver evento com o id passado, é retornada a mensagem:
   ```
   {
    "status": "failure",
    "message": "ID 0 not found"
   }
   ```
  
* **Deletar eventos pelo dia da semana** - DELETE 127.0.0.1:3000/api/v1/events?dayOfTheWeek=dia  
  Ex: 127.0.0.1:8000/api/v1/events?dayOfTheWeek=monday  
  
  No lugar de dia se coloca o dia da semana que quer deletar o evento, o nome do dia da semana deve ser em inglês. A API reconhece independentemente se a letra for maiúscula ou minúscula.   
  se tudo der certo é retornada a mensagem de sucess em formato JSON. Exemplo:
     ```
     {
       "status": "sucess",
       "event": null
     }
     ```  
   Se não houver evento com o dia passado, é retornada a mensagem:
     ```
     {
      "status": "failure",
      "message": "Event on monday not found"
     }
     ```  


## Validações
 A API realiza algumas validações, são elas:  
 
 ### Registro de usuário 

  * **Campos preenchidos**  
    A API confere se todos os parâmetros foram passados. Todos os campos devem ser escritos em minúsculo, e, se forem palavras compostas, apenas a primeira letra da palavra composta em maiúsculo - como mostrado anteriormente. Se algum campo estiver ausente ou em branco, é retornada a seguinte mensagem: 
  ```
  {
    "status": "failure",
    "message": "Missing fields:  lastName, birthDate, city"
  }
  ```
  Se algum parâmetro a mais for passado, a API salvará ele junto.
  
  * **Email válido**  
  A API confere, ao registrar o usuário, se o email já está em uso. Se sim, é retornada a seguinte mensagem:
  ```
  {
    "status": "failure",
    "message": "Email exemplo@gmail.com already exists."
  }
  ```  
  
  * **Confirmação de senha**  
  A API confere se o "password" e "confirmPassword" coincidem. Se não,  é retornada a seguinte mensagem:  
  ```
  {
    "status": "failure",
    "message": "The password confirmation does not match"
  }
  ```  
 
  ### Registro de evento 

    * **Campos preenchidos**
    A API confere se todos os parâmetros foram passados. Todos os campos devem ser escritos em minúsculo, e, se forem palavras compostas, apenas a primeira letra da palavra composta em maiúsculo - como mostrado anteriormente. Se algum campo estiver ausente ou em branco, é retornada a seguinte mensagem:
  ```
  {
    "status": "failure",
    "message": "Missing fields: description, dateTime"
  }
  ```  
  
   * **Data do evento**
  A API confere se o valor de dateTime é uma data. Se for passada letra letras ela retorna a seguinte mensagem:
  ```
  {
    "status": "failure",
    "message": "The dataTime format Invalid Date is not valid. Use format YYYY/MM/DD"
  }
  ```
  Entretanto, datas imprecisas como "2023", "2023/01" não indicam erro e a função utilizada getDate() considera o primeiro dia do ano ou mês. Por isso, deve ser utilizado o formato YYYY/MM/DD.  
  
## Como testar usando Postman com servidor local
   Considerando que os passos de [Como rodar localmente](#como-rodar-localmente) foram concluídos e o servidor esteja no ar, seu terminal deve aparecer:  
     
   ![image](https://user-images.githubusercontent.com/103967442/218460123-3727d3a4-bffa-4676-a598-942195c41956.png)  
   no Postman:  
   * Selecione o tipo de consulta (GET, POST ou DELETE);  
   * Escreva o local host + a rota que deseja acessar:  
     
   ![image](https://user-images.githubusercontent.com/103967442/218457770-bef268eb-8a67-46ab-802f-9667af65aebc.png)  
   * Se for um evento que precise receber uma entrada JSON (POST), selecione a opção "Body" abaixo da url, em seguida "raw", e "JSON";  
    
   ![image](https://user-images.githubusercontent.com/103967442/218458727-4f66e5eb-ad53-4f88-aa6e-a23df0d1c4da.png)  
   * Coloque seu conteúdo em formato json no espaço entre "response" e a url;
   * Envie com o botão "Send" à direita da URL;  
   * A resposta do servidor aparece logo abaixo.   
     
   ![image](https://user-images.githubusercontent.com/103967442/218460375-c2bfd51f-3226-4f28-8fee-4590edd59b7f.png)  
      
   Lembrando que os parâmetros devem estar de acordo com os exemplos passados em [Arquitetura Rest](#arquitetura-rest).
   

## Como testar usando Postman com deploy
   Considerando o deploy feito pelo Railway, a forma de execução segue a mesma explicada em [Como testar usando Postman com servidor local](#como-testar-usando-postman-com-servidor-local). O que muda são as urls - substituindo o localHost pelo link gerado pelo Railway.  
   
   #### Link da api feito o deploy: https://challenge1-production-9cbc.up.railway.app  
   
   Exemplo:  
   em vez de POST 127.0.0.1:3000/api/v1/users/signUp,  
   POST https://challenge1-production-9cbc.up.railway.app/api/v1/users/signUp  
   
   ![image](https://user-images.githubusercontent.com/103967442/218486562-e157803c-82bc-48dc-9a84-869a1303bda8.png)

   Lembrando que para realizar o deploy, em ./scr/server.js a porta deve ser process.env.PORT e em package.json o "script" deve ser ```"start": "node ./src/server.js"```  
     

## Créditos  
Para o desenvolvimento dessa API, foram usados os conhecimentos adquiridos no curso Node.js, Express, MongoDB & More: The Complete Bootcamp 2023 
proporcionados pela Compass Uol no programa de bolsas Back-end Journey (Node.js) AWS Cloud Context na plataforma da Udemy.  
(https://udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15064884?course_portion_id=282878&learning_path_id=4195930#overview)

  
