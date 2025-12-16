# 🚗 NestJS Authentication & Role Based Access System

This project is a backend API built with **NestJS + MongoDB** that supports:

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 🛠 Driver Registration & Login with Vehicle Management
- 🚙 Vehicle Management System
- 📅 Booking System with Rating
- ✏️ Update Profile (Role-based restrictions)
- 🛡 Secure routes using Guards & JWT Strategies
- 📝 Global Exception & Validation Filters
- 📊 HTTP Logging Middleware
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
│   ├── jwt-auth.guard.ts
│   └── dto/
│       ├── login.dto.ts
│       └── register.dto.ts
│
├── user/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.module.ts
│   └── dto/
│       ├── create-user.dto.ts
│       ├── login-user.dto.ts
│       └── update-user.dto.ts
│
├── driver/
│   ├── driver.controller.ts
│   ├── driver.service.ts
│   ├── driver.module.ts
│   ├── booking/
│   │   ├── booking.controller.ts
│   │   ├── booking.service.ts
│   │   ├── booking.module.ts
│   │   └── dto/
│   │       ├── create-booking.dto.ts
│   │       ├── rate-booking.dto.ts
│   │       └── update-booking.dto.ts
│   ├── vehicle/
│   │   ├── vehicle.controller.ts
│   │   ├── vehicle.service.ts
│   │   ├── vehicle.module.ts
│   │   └── dto/
│   │       ├── create-vehicle.dto.ts
│   │       └── update-vehicle.dto.ts
│   └── dto/
│       ├── create-driver.dto.ts
│       ├── create-vehicle.dto.ts
│       ├── login-driver.dto.ts
│       ├── update-driver.dto.ts
│       └── update-vehicle.dto.ts
│
├── schemas/
│   ├── admin.schema.ts
│   ├── booking.schema.ts
│   ├── driver.schema.ts
│   ├── user.schema.ts
│   └── vehicle.schema.ts
│
└── common/
    ├── decorators/
    │   └── role.decorator.ts
    ├── enums/
    │   └── role.enum.ts
    ├── filters/
    │   ├── global-exception.filter.ts
    │   └── validation-exception.filter.ts
    ├── guards/
    │   ├── jwt-auth.guard.ts
    │   └── roles.guard.ts
    ├── middleware/
    │   └── http-logging.middleware.ts
    ├── services/
    │   └── logging.service.ts
    ├── transformers/
    │   └── date.transformer.ts
    └── utils/
        └── date.util.ts
```

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

## � VEHICLE Routes (Token Required - DRIVER Only)

### Create Vehicle

```
POST /drivers/vehicles/create
Authorization: Bearer <token>
```

```json
{
  "licenseNumber": "KL-01-2024-1234567",
  "registrationNumber": "KL-01-AB-1234",
  "model": "Honda City",
  "year": 2023,
  "seatingCapacity": 5
}
```

### Get Driver Vehicles

```
GET /drivers/vehicles
Authorization: Bearer <token>
```

### Update Vehicle

```
PATCH /drivers/vehicles/:vehicleId
Authorization: Bearer <token>
```

### Delete Vehicle

```
DELETE /drivers/vehicles/:vehicleId
Authorization: Bearer <token>
```

---

## 📅 BOOKING Routes (Token Required)

### Create Booking

```
POST /drivers/bookings/create
Authorization: Bearer <token>
```

```json
{
  "passengerName": "John Doe",
  "pickupLocation": "Downtown",
  "dropoffLocation": "Airport",
  "fare": 250,
  "vehicleId": "vehicle_id_here"
}
```

### Get Bookings

```
GET /drivers/bookings
Authorization: Bearer <token>
```

### Get Booking Details

```
GET /drivers/bookings/:bookingId
Authorization: Bearer <token>
```

### Update Booking Status

```
PATCH /drivers/bookings/:bookingId
Authorization: Bearer <token>
```

```json
{
  "status": "COMPLETED"
}
```

### Rate Booking

```
POST /drivers/bookings/:bookingId/rate
Authorization: Bearer <token>
```

```json
{
  "rating": 5,
  "comment": "Great ride!"
}
```

---

## 🛡 Permissions

| Route                      | USER      | DRIVER    |
| -------------------------- | --------- | --------- |
| /users/update              | ✔ Allowed | ❌ Block   |
| /drivers/update            | ❌ Block   | ✔ Allowed |
| /drivers/vehicles/*        | ❌ Block   | ✔ Allowed |
| /drivers/bookings/*        | ❌ Block   | ✔ Allowed |

RBAC handled using:

* `@RoleRequired(Role.USER)`
* `@RoleRequired(Role.DRIVER)`
* JWT + RolesGuard

---

## �🛡 Permissions

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
