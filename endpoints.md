# 📌 Documentação dos Endpoints da API

Este arquivo detalha todos os endpoints da API de usuários e eventos, incluindo parâmetros, exemplos de uso, e possíveis mensagens de erro.

---

## USERS

### 🔍 Listar todos os usuários

- **GET** `/api/v1/users`
- **Resposta de sucesso**:

```json
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
  }
]
```

- **Resposta de erro**:

```json
{
  "message": "No user registered"
}
```

---

### 📝 Registrar novo usuário (Sign Up)

- **POST** `/api/v1/users`
- **Body**:

```json
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

- **Respostas**:
  - Sucesso:

```json
{
  "status": "sucess",
  "user": { ... }
}
```

- Campos ausentes:

```json
{
  "status": "failure",
  "message": "Missing fields: lastName, city"
}
```

- E-mail existente:

```json
{
  "status": "failure",
  "message": "Email exemplo@gmail.com already exists."
}
```

- Senhas diferentes:

```json
{
  "status": "failure",
  "message": "The password confirmation does not match"
}
```

---

### 🔐 Login de usuário (Sign In)

- **POST** `/api/v1/users/signIn`
- **Body**:

```json
{
  "email": "exemplo@gmail.com",
  "password": "exemplo"
}
```

- **Sucesso**:

```json
{
  "status": "sucess",
  "message": "Logged User"
}
```

- **Erro**:

```json
{
  "status": "failure",
  "message": "Incorrect email or password."
}
```

---

## EVENTS

### 🔍 Listar todos os eventos

- **GET** `/api/v1/events`
- **Sucesso**:

```json
[
  {
    "id": "0",
    "description": "Evento 1",
    "dateTime": "2023-02-12T04:00:00.000Z",
    "weekday": "sunday",
    "createdAt": "..."
  }
]
```

- **Erro**:

```json
{
  "message": "No event registered"
}
```

---

### 📝 Criar evento

- **POST** `/api/v1/events`
- **Body**:

```json
{
  "description": "Evento 1",
  "dateTime": "2023/02/12"
}
```

- **Sucesso**:

```json
{
  "status": "sucess",
  "data": {
    "eventData": { ... }
  }
}
```

- **Erros**:

```json
{
  "status": "failure",
  "message": "Missing fields: description, dateTime"
}
```

```json
{
  "status": "failure",
  "message": "The dataTime format Invalid Date is not valid. Use format YYYY/MM/DD"
}
```

---

### 🔍 Buscar evento por ID

- **GET** `/api/v1/events/:id`
- **Sucesso**:

```json
{
  "id": "1",
  "description": "Evento 2",
  "dateTime": "2023-02-13T04:00:00.000Z",
  "weekday": "monday",
  "createdAt": "..."
}
```

- **Erro**:

```json
{
  "status": "failure",
  "message": "ID 1 not found"
}
```

---

### 🔍 Buscar eventos por dia da semana

- **GET** `/api/v1/events?dayOfTheWeek=monday`
- **Sucesso**:

```json
[
  {
    "id": "1",
    "description": "Evento 2",
    "dateTime": "2023-02-13T04:00:00.000Z",
    "weekday": "monday",
    "createdAt": "..."
  }
]
```

- **Erro**:

```json
{
  "message": "Event on monday not found"
}
```

---

### ❌ Deletar evento por ID

- **DELETE** `/api/v1/events/:id`
- **Sucesso**:

```json
{
  "status": "sucess",
  "message": "Event id: 1 - deleted"
}
```

- **Erro**:

```json
{
  "status": "failure",
  "message": "Event id 1 not found"
}
```

---

### ❌ Deletar evento por dia da semana

- **DELETE** `/api/v1/events?dayOfTheWeek=monday`
- **Sucesso**:

```json
{
  "status": "sucess",
  "event": null
}
```

- **Erro**:

```json
{
  "status": "failure",
  "message": "Event on monday not found"
}
```

---

### ✏️ Atualizar evento por ID

- **PUT** `/api/v1/events/:id`
- **Body**:

```json
{
  "description": "Novo nome do evento",
  "dateTime": "2025/06/30"
}
```

- **Respostas**:

```json
{
  "status": "sucess",
  "message": "Event id: 1 updated",
  "data": {
    "event": {
      "id": "1",
      "description": "Novo nome do evento",
      "dateTime": "2025-06-30T00:00:00.000Z",
      "weekday": "monday",
      "createdAt": "..."
    }
  }
}
```

```json
{
  "status": "failure",
  "message": "ID 1 not found"
}
```

```json
{
  "status": "failure",
  "message": "Missing fields: description, dateTime"
}
```

```json
{
  "status": "failure",
  "message": "The dateTime format \"30-06-2025\" is not valid. Use format YYYY/MM/DD"
}
```
