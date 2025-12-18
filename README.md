# 🚗 Gokeral - NestJS Ride-Sharing Backend

A robust backend API built with **NestJS + MongoDB** for a ride-sharing platform with comprehensive user and driver management.

### ✨ Core Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👤 **User Management** - Registration, login, and profile management
- 🚗 **Driver Management** - Full driver registration with license verification
- 🚙 **Vehicle Management** - Support for S3-based documents and images
- 📅 **Advanced Booking System** - Create, track, and rate rides
- 🛡️ **Role-Based Access Control** - USER and DRIVER roles with route guards
- 📝 **Global Exception Handling** - Unified error responses
- 📊 **HTTP Logging Middleware** - Request tracking and monitoring
- 🎯 **Scalable Architecture** - Modular, production-ready structure

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
POST /auth/register-user
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "password": "Password123"
}
```

**Fields:**
- `fullName` (string, required) - User's full name
- `email` (string, required, unique) - Email address
- `phoneNumber` (string, required) - Contact number
- `password` (string, required, min 6 chars) - Login password

---

### 🟦 Register Driver

```
POST /auth/register-driver
```

**Request Body:**
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phoneNumber": "+1987654321",
  "driverLicenseNumber": "DL123456789",
  "password": "Password123"
}
```

**Fields:**
- `fullName` (string, required) - Driver's full name
- `email` (string, required, unique) - Email address
- `phoneNumber` (string, required) - Contact number
- `driverLicenseNumber` (string, required, unique) - License number
- `password` (string, required, min 6 chars) - Login password

---

### 🟨 User Login

```
POST /auth/login-user
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

---

### 🟧 Driver Login

```
POST /auth/login-driver
```

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "Password123"
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
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "fullName": "Updated Name",
  "phoneNumber": "+1234567890",
  "address": "New Address"
}
```

---

## 🚘 DRIVER Routes (Token Required)

### Update Driver Profile

```
PATCH /drivers/update
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "fullName": "Updated Driver Name",
  "phoneNumber": "+1987654321"
}
```

### Reset Drivers Collection (Dev Only)

```
DELETE /drivers/reset
```

**Purpose:** Clear all drivers from database and reset MongoDB indexes. Use this during development to remove duplicate key conflicts.

**Note:** This endpoint is for development/testing only. Remove or protect it in production.

---

## � VEHICLE Routes (Token Required - DRIVER Only)

### Create Vehicle

```
POST /drivers/vehicles
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "companyName": "Tesla Motors",
  "model": "Model 3",
  "year": 2023,
  "seats": 5,
  "licensePlateNumber": "ABC123XYZ",
  "vehicleType": "Sedan",
  "vehicleClass": "Economy",
  "vehicleImage": "https://example-bucket.s3.amazonaws.com/vehicles/tesla-model-3.jpg",
  "documents": {
    "drivingLicense": "https://example-bucket.s3.amazonaws.com/documents/dl.pdf",
    "insuranceProof": "https://example-bucket.s3.amazonaws.com/documents/insurance.pdf",
    "addressProof": "https://example-bucket.s3.amazonaws.com/documents/address.pdf",
    "policeCertificate": "https://example-bucket.s3.amazonaws.com/documents/police-cert.pdf"
  },
  "fareStructure": {
    "minimumFare": 5.00,
    "perKilometerRate": 1.50,
    "waitingChargePerMinute": 0.30
  }
}
```

### Get All Vehicles

```
GET /drivers/vehicles
Authorization: Bearer <JWT_TOKEN>
```

### Get Vehicle Details

```
GET /drivers/vehicles/:vehicleId
Authorization: Bearer <JWT_TOKEN>
```

### Update Vehicle

```
PATCH /drivers/vehicles/:vehicleId
Authorization: Bearer <JWT_TOKEN>
```

### Delete Vehicle

```
DELETE /drivers/vehicles/:vehicleId
Authorization: Bearer <JWT_TOKEN>
```

---

## 📅 BOOKING Routes (Token Required)

### Create Booking

```
POST /bookings/create
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "userId": "user_id",
  "driverId": "driver_id",
  "vehicleId": "vehicle_id",
  "pickupLocation": "Downtown",
  "dropoffLocation": "Airport",
  "fare": 250.00
}
```

### Get My Bookings

```
GET /bookings/my-bookings
Authorization: Bearer <JWT_TOKEN>
```

### Get Pending Bookings

```
GET /bookings/my-bookings/pending
Authorization: Bearer <JWT_TOKEN>
```

### Get Booking Details

```
GET /bookings/:bookingId
Authorization: Bearer <JWT_TOKEN>
```

### Cancel Booking

```
PATCH /bookings/:bookingId/cancel
Authorization: Bearer <JWT_TOKEN>
```

### Rate Booking

```
POST /bookings/:bookingId/rate
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Great driver and smooth ride!"
}
```

### Accept Booking (Driver Only)

```
POST /bookings/:bookingId/accept
Authorization: Bearer <JWT_TOKEN>
```

### Start Booking (Driver Only)

```
PATCH /bookings/:bookingId/start
Authorization: Bearer <JWT_TOKEN>
```

### Complete Booking (Driver Only)

```
PATCH /bookings/:bookingId/complete
Authorization: Bearer <JWT_TOKEN>
```

---

## 🛡️ Role-Based Access Control (RBAC)

| Route                   | USER      | DRIVER    |
| :---------------------- | :-------: | :-------: |
| `/auth/register-user`   | ✔ Public  | ✔ Public  |
| `/auth/register-driver` | ✔ Public  | ✔ Public  |
| `/auth/login-user`      | ✔ Public  | ✔ Public  |
| `/auth/login-driver`    | ✔ Public  | ✔ Public  |
| `/users/profile`        | ✔ Allowed | ❌ Blocked |
| `/users/update`         | ✔ Allowed | ❌ Blocked |
| `/drivers/update`       | ❌ Blocked | ✔ Allowed |
| `/drivers/vehicles/*`   | ❌ Blocked | ✔ Allowed |
| `/bookings/my-bookings` | ✔ Allowed | ✔ Allowed |

**RBAC Implementation:**
- `@RoleRequired(Role.USER)` - User only routes
- `@RoleRequired(Role.DRIVER)` - Driver only routes
- `JwtAuthGuard` - Token validation
- `RolesGuard` - Role enforcement

---

## 🗄️ Database Schemas

### User Schema
- `fullName` - User's full name (string, required)
- `email` - Unique email address (string, required, unique)
- `phoneNumber` - Contact number (string, required)
- `password` - Hashed password using bcrypt (string, required)
- `address` - Physical address (string, required)
- `location` - GeoJSON point {type: "Point", coordinates: [longitude, latitude]}
- `agreement` - Terms acceptance flag (boolean, required)

### Driver Schema
- `fullName` - Driver's full name (string, required)
- `email` - Unique email address (string, required, unique)
- `phoneNumber` - Contact number (string, required)
- `driverLicenseNumber` - Unique license number (string, required, unique)
- `password` - Hashed password (string, required)
- `address` - Physical address (string, required)
- `profileImage` - Profile image S3 URL (string, optional)
- `personalInfo` - Additional driver info including emergency contacts
- `drivingExperience` - Experience details (years, trips, rating)
- `role` - Always set to "DRIVER"

### Vehicle Schema
- `companyName` - Manufacturer/company (string, required)
- `model` - Vehicle model (string, required)
- `year` - Manufacturing year (number, required)
- `seats` - Seating capacity (number, required, min 1)
- `licensePlateNumber` - Unique plate number (string, required)
- `vehicleType` - Type: Sedan, SUV, Auto, etc. (string, required)
- `vehicleClass` - Class: Economy, Premium, Luxury (string, required)
- `vehicleImage` - Vehicle image S3 URL (string, optional)
- `documents` - S3 URLs for DL, insurance, address proof, police certificate
- `fareStructure` - Pricing: minimumFare, perKilometerRate, waitingChargePerMinute
- `driverId` - Reference to driver

### Booking Schema
- `userId` - Reference to User (ObjectId)
- `driverId` - Reference to Driver (ObjectId)
- `vehicleId` - Reference to Vehicle (ObjectId)
- `pickupLocation` - Pickup address (string, required)
- `dropoffLocation` - Dropoff address (string, required)
- `fare` - Ride fare amount (number, required)
- `status` - PENDING | ACCEPTED | STARTED | COMPLETED | CANCELLED
- `rating` - Rating 1-5 (number, optional)
- `comment` - Feedback comment (string, optional)

---

## 🧩 Future Enhancements

- 🔁 Refresh token implementation
- 📄 Swagger/OpenAPI documentation
- 🔏 Password reset functionality
- 📱 Real-time notifications
- 💳 Payment gateway integration
- 🗺️ Live GPS tracking
- ⭐ Advanced rating system
- 📞 SMS/Email notifications

---

## 📄 License

MIT License - Feel free to use and modify for your projects!

---

## 👨‍💻 Developed by Corestone Innovations

For support and inquiries, contact the development team.

*Last Updated: December 18, 2025*
- 🗺️ Live GPS tracking
- ⭐ Advanced rating system

---

## 📄 License

MIT License

---

## 👨‍💻 Developed by Corestone Innovations

*Last Updated: December 2025*
