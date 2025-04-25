# 🔐 Login com JWT

Para fazer o login, siga o passo a passo abaixo:

---

### 📥 Registrar um novo usuário

**Endpoint:** `POST /register`  
**Body:**
```json
{
  "email": "SeuUsuario@example.com",
  "password": "SuaSenha"
}
```

**✅ Resposta esperada:**
```json
{
  "token": "Token Gerado"
}
```

Esse token será o **identificador da sua sessão**.

---

### 🔑 Login do usuário

**Endpoint:** `POST /login`  
**Body:**
```json
{
  "email": "SeuUsuario@example.com",
  "password": "SuaSenha"
}
```

**✅ Resposta esperada:**
```json
{
  "token": "Token Gerado"
}
```

> 💡 Guarde esse token (por exemplo no `localStorage` ou `sessionStorage`) — ele será usado para autenticar nas outras rotas do sistema.

---

### 🧪 Rota protegida (autenticação com token)

Criamos uma rota protegida temporária para **testes**:

**Endpoint:** `GET http://localhost:3000/api/private`  
**Headers:**
```
Authorization: Bearer <SeuToken>
```

**📌 Exemplo de header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**✅ Resposta esperada:**
```json
{
  "message": "Olá, usuário com ID 680adb59da4a1159de07911f"
}
```

---

🗒️ **Nota:**  
Esse endpoint de teste será removido futuramente — foi criado apenas para fins didáticos (inclusive para usuários iniciantes e burros como o **Pedro Ramos** testarem a autenticação ).