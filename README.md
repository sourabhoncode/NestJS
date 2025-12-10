# 🚗 NestJS Authentication & Role Based Access System

This project is a backend API built with **NestJS + MongoDB** that supports:

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 🛠 Driver Registration & Login
- ✏️ Update Profile (Role-based restrictions)
- 🛡 Secure routes using Guards & JWT Strategies
- 🎯 Scalable modular structure

---

## 📁 Folder Structure

```

src/
│
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── dto/
│       └── register.dto.ts
│
├── user/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.module.ts
│   └── dto/
│       ├── update-user.dto.ts
│
├── driver/
│   ├── driver.controller.ts
│   ├── driver.service.ts
│   ├── driver.module.ts
│   └── dto/
│       ├── update-driver.dto.ts
│
├── schemas/
│   ├── user.schema.ts
│   └── driver.schema.ts
│
└── common/
├── decorators/
│   ├── role.decorator.ts
├── enums/
│   ├── role.enum.ts
└── guards/
├── jwt-auth.guard.ts
└── roles.guard.ts

````

---

## 🧰 Tech Stack

| Technology | Purpose |
|-----------|---------|
| NestJS | Node Framework |
| MongoDB + Mongoose | Database |
| Passport-JWT | Authentication Strategy |
| Bcrypt | Password Hashing |
| Class Validator | DTO Validation |

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repo

```sh
git clone https://github.com/sourabhoncode/NestJS.git
cd NestJS
````

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure MongoDB

Make sure for MONGODB:

```
create your own .ENV file
```

### 4️⃣ Start Server

```sh
npm run start:dev
```

API running 👉 [http://localhost:3000/](http://localhost:3000/)

---

## 🔐 Authentication Endpoints

### 🟩 Register User

```
POST /auth/register
```

```json
{
  "fullName": "Test User",
  "email": "user@test.com",
  "password": "123456",
  "role": "USER"
}
```

### 🟦 Register Driver

```
POST /auth/register
```

```json
{
  "fullName": "Driver Test",
  "email": "driver@test.com",
  "password": "123456",
  "phone": "9999999999",
  "licenseNumber": "KL-01-2024-1234567",
  "role": "DRIVER"
}
```

### 🟨 Login

```
POST /auth/login
```

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

📌 Response contains JWT token:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "role": "USER"
}
```

---

## 🧑 USER Routes (Token Required)

### Get Profile

```
GET /users/profile
Authorization: Bearer <token>
```

### Update Profile

```
PATCH /users/update
Authorization: Bearer <token>
```

```json
{
  "fullName": "Updated User Name"
}
```

---

## 🚘 DRIVER Routes (Token Required)

### Update Driver Profile

```
PATCH /drivers/update
Authorization: Bearer <token>
```

```json
{
  "phone": "8888888888"
}
```

---

## 🛡 Permissions

| Route           | USER      | DRIVER    |
| --------------- | --------- | --------- |
| /users/update   | ✔ Allowed | ❌ Block   |
| /drivers/update | ❌ Block   | ✔ Allowed |

RBAC handled using:

* `@RoleRequired(Role.USER)`
* `@RoleRequired(Role.DRIVER)`
* JWT + RolesGuard

---

## 🧩 Future Enhancements

* 🔁 Refresh tokens
* 📄 Swagger API Docs
* 🔏 Password Update Endpoint
* 🗑 Soft delete user/driver
* 🛠 Upload Driver License & User Image

---

## 📌 Author

👨‍💻 Developed by **Sourabh **
📧 Email: sourabhshris12@gmail.com
⚡ Passionate about backend & scalable architecture

---
