![image](https://user-images.githubusercontent.com/103967442/218341093-588b71a8-f380-4ce4-92fb-12453e3e384e.png)

# Rest API em Node.js e Express.js - Planner para para registro e consulta de usuários e eventos

Essa aplicação em JavaScript segue a proposta de "Um planner que irá ajudar o cliente a organizar sua semana e suas tarefas e quando elas acontecem". Referente ao "challenge 1 do programa de bolsas Back-end Journey (Node.js) da Compass Uol". Nela foram implementadas as funções de:   

**Usuários** - listar, sign up e sign in;    
**Eventos** - criar novo evento, listar todos os eventos, listar ou deletar eventos pelo id ou dia da semana.

No momento não é usado banco de dados. Os usuários e eventos são registrados em arquivos JSON, users.json e events.json, respectivamente.

## Tecnologias usadas
* Node 8.19.3
* Express 4.18.2
* Nodemon 

## Como rodar localmente  
1. Crie um fork desse projeto e clone ele no seu ambiente de desenvolvimento.
2. Entrar no diretório do projeto  
3. Instalar as dependências com: ```npm i```  
4. Instalar nodemon: ```npm i nodemon```  
5. Adicionar no package.json em "scripts": ```"start": "nodemon ./src/server.js"```
![image](https://user-images.githubusercontent.com/103967442/218343281-c8222927-fd60-40d6-9456-cd93ec25e069.png)  
OBS: No repositório está ```"start": "node ./src/server.js"``` para poder fazer o deploy com railway em vez de rodar localmente.  
  
6. Entrar no diretório ./src/server.js e alterar a "port" para a porta que você pretende rodar localmente. Ex: 3000
![image](https://user-images.githubusercontent.com/103967442/218344118-4c507c15-14dd-4895-bece-566640337599.png)

7.Usar o comando ```npm start``` no terminal, que executará o programa automaticamente até que você cancele com Ctrl + C.  
OBS: Nodemon não é obrigatório, mas facilita. É possível rodar com o comando: ```node ./src/server.js```

## Arquitetura Rest
Configurações genéricas de local host na porta 3000:  
Obs: a rout base do projeto foi definida como /api/v1.
  
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
 
  
* **Sign Up** (registrar usuário) - GET 127.0.0.1:3000/api/v1/users  
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
   A API não realiza o registro de uma de um usuário por vez.
  
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
 
  
* **Sign In** (entrar com usuário) - 127.0.0.1:3000/api/v1/users/signIn  
    A entrada deve ser um JSON seguinto o padrão:  
    ```
    {
    "email": "exemplo@gmail.com",
    "password": "exemplo"
    }  
    ```  
    
    Em caso de sucesso retorna o status "sucess" e o a mensagem de "Looged User" no formato JSON. Veja o exemplo a seguir:  
    ```{
    "status": "sucess",
    "message": "Logged User"
    }```  
    
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
   interpreta como MM-DD-YYYY  
  
   A API se encarrega de criar um ID, ver o dia da semana e registrar o horário e data que o registro do evento foi criado.    
  	
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
  e se tudo der certo é retornado o evento em formato JSON. Exemplo:
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
  
  No lugar de dia se coloca o dia da semana que quer, o nome do dia da semana deve ser em inglês. A API reconhece independente se a letra for maiúscula ou minúscula. 
  e se tudo der certo é retornada a mensagem de sucess em formato JSON. Exemplo:
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
   
     


## VALIDAÇÕES

* **Registro de usuário**  

  **Campos preenchidos**  
  A API confere se todos os parâmetros foram passados. Todos os campos devem ser escritos em minúsculo. Se algum campo estiver ausente ou em branco, é retornada a seguinte mensagem:
  ```
  {
    "status": "failure",
    "message": "Missing fields:  lastName, birthDate, city"
  }
  ```
  
  **Email válido**  
  A API confere, ao registrar o usuário, se o email já está em uso. Se sim, é retornada a seguinte mensagem:
  ```
  {
    "status": "failure",
    "message": "Email exemplo@gmail.com already exists."
  }
  ```  
  
  **Confirmação de senha**  
  A API confere se o "password" e "confirmPassword" coincidem. Se não,  é retornada a seguinte mensagem:  
  ```
  {
    "status": "failure",
    "message": "The password confirmation does not match"
  }
  ```  
 
* **Registro de evento**  
  **Campos preenchidos**
  A API confere se todos os parâmetros foram passados. Todos os campos devem ser escritos em minúsculo. Se algum campo estiver ausente ou em branco, é retornada a seguinte mensagem:
  ```
  {
    "status": "failure",
    "message": "Missing fields: description, dateTime"
  }
  ```  
  
  **Data do evento**
  A API confere se o valor de dateTime é uma data. Se for passada letra letras ela retorna a seguinte mensagem:
  ```
  {
    "status": "failure",
    "message": "The dataTime format Invalid Date is not valid. Use format YYYY/MM/DD"
  }
  ```
  Entretanto, datas imprecisas como "2023", "2023/01" não indicam erro e a função utilizada getDate() considera o promeiro dia do ano ou mês. Por isso, deve ser utilizado o formato YYYY/MM/DD.
  
  
  
  
