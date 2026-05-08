# CLAUDE.md — Project Intelligence File

## 👨‍💻 About the Developer
- **Role:** Senior Full Stack Developer
- **Experience:** 7 years
- **Style:** Highly adaptive — works across multiple tech stacks depending on project needs
- **Strength:** Deep fundamentals in both Frontend and Backend architecture
- **Approach:** Concept and architecture-first; implementation details are handled with Claude's assistance

---

## 🧠 How to Work With Me
- I understand **architecture, design patterns, and proof of concepts** very well
- I may not remember exact syntax — **always provide complete, working code**
- Do not assume I remember boilerplate — **always generate full implementations**
- When I describe an idea, **translate it into code** without asking too many clarifying questions
- If something is ambiguous, **make a reasonable assumption, state it, and proceed**
- I prefer **clean, readable, production-ready code** over shortcuts

---

## 🛠️ Tech Stack Experience

### Frontend
- Angular (primary for this project)
- Vue JS
- React

### Backend
- NestJS (primary for this project)
- ExpressJS
- Laravel
- ASP.NET
- Frappe

### Databases
- **NoSQL:** MongoDB (Mongoose)
- **SQL:** MySQL, MariaDB, PostgreSQL, MS SQL, Snowflake

### Others
- Windows Form Application (C#)
- JWT Authentication
- REST API design
- GraphQL API

---

## 📁 Current Project Stack
- **Frontend:** Angular 17 — runs on `http://localhost:4200`
- **Backend:** NestJS — runs on `http://localhost:3000`
- **Auth:** JWT Authentication (Login / Logout)
- **Package Manager:** npm

---

## 📂 Folder Structure
```
Claude/
├── CLAUDE.md
├── .claude/
├── backend/        ← NestJS App
│   └── src/
│       ├── auth/
│       ├── users/
│       └── main.ts
└── frontend/       ← Angular App
    └── src/
        ├── app/
        │   ├── auth/
        │   ├── dashboard/
        │   └── shared/
        └── environments/
```

---

## ✅ Code Standards

### General
- Always use **TypeScript** with strict mode enabled
- Use **async/await** — never use `.then()` chaining
- Always add **error handling** (try/catch) on every async operation
- Never hardcode credentials, secrets, or API URLs
- Use **environment variables** for all sensitive config
- Write **comments** on complex logic

### Frontend (Angular)
- Follow the **Angular Style Guide**
- Use **Angular Material** for UI components unless told otherwise
- Use **Reactive Forms** — never template-driven forms
- Always use **HttpClient** with proper error interceptors
- Store JWT token in **localStorage** with an auth service
- Use **route guards** to protect authenticated pages
- Always **unsubscribe** from observables (use `takeUntilDestroyed` or `async` pipe)

### Backend (NestJS)
- Follow **NestJS modular architecture** (module, controller, service per feature)
- Always use **DTOs** with class-validator for input validation
- Use **Guards** for JWT protection on routes
- Return consistent **HTTP status codes**
- Always use **ConfigModule** for environment variables
- Structure: `module → controller → service → repository`

### Database
- Always use **migrations** for schema changes
- Never use raw queries when ORM methods are available
- Always **index foreign keys** and frequently queried fields

---

## 🔐 Security Rules
- NEVER expose JWT secret in code
- ALWAYS validate and sanitize all user inputs
- Use **bcrypt** for password hashing — minimum 10 salt rounds
- JWT token expiration: **1 hour** for access token, **7 days** for refresh token
- Enable **CORS** only for known origins

---

## 🚀 Running the Project
```bash
# Backend (NestJS)
cd backend
npm run start:dev

# Frontend (Angular)
cd frontend
ng serve
```

---

## 🧪 Testing Expectations
- Write **unit tests** for all services
- Write **e2e tests** for critical flows (login, logout)
- Always run tests before marking a task as complete
- If tests fail, fix them before moving on

---

## 💬 Communication Style
- Be **direct and concise** — no need for long explanations unless asked
- When making assumptions, **state them briefly** then proceed
- When task is done, **summarize what was done** in bullet points
- If there are multiple approaches, **recommend the best one** with a short reason
- Flag **potential issues or risks** proactively

---

## ⛔ Hard Rules
- NEVER use jQuery
- NEVER use `any` type in TypeScript unless absolutely necessary
- NEVER skip error handling
- NEVER leave console.log statements in production code
- NEVER commit `.env` files
- ALWAYS follow REST conventions for API endpoints

## Git Agent Rules
- Always use conventional commits format
- Never force push to main
- Always pull before push
- Create feature branches for new features
- Branch naming: feature/, fix/, chore/, hotfix/

## Required NPM Scripts
Both frontend and backend must always have:
- "lint": ESLint check
- "test": Run unit tests
- "build": Production build