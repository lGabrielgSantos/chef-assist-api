
# 🍳 CHEF ASSIST API

API built with **Node.js + TypeScript** for managing customers, orders, and products.  
It follows a clean **layered architecture** (Controller → Service → Repository), integrates **Prisma ORM**, **JWT authentication**, and includes **Swagger documentation**.

---

## 🧱 Project Structure

```
src/
├── config/              # Global configurations (env, prisma, etc.)
├── controllers/         # Route controllers (HTTP entrypoints)
├── docs/                # Swagger documentation (YAML)
├── dtos/                # Data Transfer Objects
├── interfaces/          # Contracts and interfaces (Repository, Service)
├── mappers/             # Entity/DTO mappers
├── middlewares/         # Global middlewares (auth, error handling, logging)
├── repositories/        # Data access layer (Prisma)
├── routes/              # Route definitions and modules
├── services/            # Business logic layer
├── tests/               # Unit tests (Jest)
├── utils/               # Utility functions
├── app.ts               # App initialization
└── server.ts            # HTTP server bootstrap
```

---

## ⚙️ Main Technologies

- **Node.js** + **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL** (or any configured database)
- **JWT** for authentication
- **Swagger** for API documentation
- **Jest** for unit testing
- **ESLint + Prettier** for code formatting and linting

---

## 🚀 Installation & Execution

### 1. Clone the repository
```bash
git clone https://github.com/your-username/chef-assist-api.git
cd chef-assist-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root using this template:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/chef_assist"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
```

### 4. Run Prisma migrations
```bash
npx prisma migrate dev
```

### 5. Start the server
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

---

## 📚 API Documentation

Swagger documentation is available at:
```
http://localhost:3000/api-docs
```

YAML files:
```
/src/docs/customer.yaml
/src/docs/order.yaml
/src/docs/product.yaml
```

---

## 🧩 Architectural Pattern

This project follows the **Service–Repository Pattern**, ensuring:
- Clear separation between **controllers**, **business logic**, and **data access**
- Easy testing and maintenance
- Low coupling and high cohesion

Execution flow:
```
Request → Controller → Service → Repository → Prisma → Database
```

---

## 🔐 Authentication

Authentication is handled with **JWT (JSON Web Token)**.

- Login endpoint: `POST /auth/login`
- Header required for protected routes:
  ```
  Authorization: Bearer <token>
  ```

---

## 🧪 Testing

Run all tests:
```bash
npm test
```

Generate coverage:
```bash
npm run test:coverage
```

Example of a unit test file:
```
src/tests/services/customer.service.spec.ts
```

---

## 📦 Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Run the server in development mode |
| `npm run build` | Transpile TypeScript to JavaScript |
| `npm start` | Run the compiled version |
| `npm run lint` | Check code style using ESLint |
| `npm test` | Run all unit tests |

---

## 🧰 Conventions

- **Commits:** follow [Conventional Commits](https://www.conventionalcommits.org/)
- **Branches:** `main` (production) / `develop` / `feature/*`
- **Linting:** eslint + prettier
- **Absolute imports:** configured via `tsconfig.json`

---

## 👨‍💻 Contributing

1. Fork the project  
2. Create a new branch for your feature  
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes  
   ```bash
   git commit -m "feat: add new order endpoint"
   ```
4. Push your branch and open a Pull Request 🚀

---

## 🧑‍🍳 Author

**Chef Assist API** — Developed by [Your Name]  
📧 [gabrielgsantos.dev@gmail.com]  
🌐 [https://gsdeveloper.vercel.app/]
