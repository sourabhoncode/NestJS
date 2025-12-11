# Copilot Instructions for AI Agents

## Project Overview
- **Stack:** NestJS (TypeScript), MongoDB (Mongoose ODM), Passport-JWT, Bcrypt, Class Validator
- **Purpose:** Modular backend API for user/driver registration, authentication, RBAC, and vehicle management.
- **Key Modules:**
  - `auth/`: Handles registration, login, JWT issuance, and authentication logic for both users and drivers.
  - `user/`, `driver/`, `vehicle/`: CRUD and profile management for each entity, using Mongoose models and DTO validation.
  - `common/`: Shared enums, decorators, and guards for RBAC and role-based route protection.
  - `schemas/`: Mongoose schema definitions for all main entities.

## Architecture & Patterns
- **Modular Structure:** Each domain (user, driver, vehicle) is a NestJS module with its own controller, service, DTOs, and schema.
- **RBAC:**
  - Use `@RoleRequired(Role.USER)` and `@RoleRequired(Role.DRIVER)` decorators (see `common/decorators/role.decorator.ts`).
  - Enforced by `RolesGuard` (see `common/guards/roles.guard.ts`).
- **Authentication:**
  - JWT-based, with `JwtAuthGuard` and `JwtStrategy`.
  - Secret is hardcoded as `MY_SECRET_KEY` in dev (see `auth/jwt.strategy.ts`).
- **Validation:**
  - DTOs use `class-validator` decorators for input validation.
  - Global validation pipe enabled in `main.ts`.
- **Database:**
  - MongoDB connection via `MongooseModule.forRoot` in `app.module.ts`.
  - Each entity has a schema in `schemas/` and is registered in its module.

## Developer Workflows
- **Install:** `npm install`
- **Run (dev):** `npm run start:dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test (unit):** `npm run test`
- **Test (e2e):** `npm run test:e2e`
- **Format:** `npm run format`
- **MongoDB:** Expects local instance at `mongodb://localhost:27017/driverdb` (see README).

## Conventions & Gotchas
- **User/Driver Registration:**
  - Separate endpoints: `/auth/register-user` and `/auth/register-driver`.
  - Driver registration requires `termsAccepted: true` and valid `licenseNumber` format.
- **Password Hashing:** Always via `bcrypt` in `auth.service.ts`.
- **Sensitive Data:** Passwords are excluded from returned objects using `.select('-password')` in services.
- **Role Enforcement:**
  - Only users with correct role can access/update their profile (see `user.controller.ts`, `driver.controller.ts`).
- **Environment Variables:**
  - MongoDB URI and other secrets should be set in `.env` (but are hardcoded in some files for dev).
- **Testing:**
  - Unit and e2e tests use Jest. E2E config in `test/jest-e2e.json`.

## Examples
- **Protecting a route:**
  ```ts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleRequired(Role.USER)
  @Get('profile')
  profile(@Request() req) { ... }
  ```
- **Registering a Mongoose schema:**
  ```ts
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ```

## Key Files
- `src/app.module.ts` — Main module, sets up DB and imports all features
- `src/auth/auth.service.ts` — Auth logic, registration, login, JWT
- `src/common/guards/roles.guard.ts` — Role-based access control
- `src/common/decorators/role.decorator.ts` — Role decorator
- `src/schemas/` — Mongoose schemas for all entities
- `src/user/`, `src/driver/`, `src/vehicle/` — Feature modules

---

For more details, see the project [README.md](../README.md).
