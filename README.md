
# 🍳 CHEF ASSIST API

API desenvolvida em **Node.js + TypeScript** para gerenciamento de clientes, pedidos e produtos, com arquitetura em camadas (Controller → Service → Repository), integração com **Prisma ORM**, autenticação JWT e documentação **Swagger**.

---

## 🧱 Estrutura do Projeto

```
src/
├── config/              # Configurações gerais (env, prisma, etc.)
├── controllers/         # Controladores de rotas (entrypoints HTTP)
├── docs/                # Documentação Swagger (YAML)
├── dtos/                # Data Transfer Objects
├── interfaces/          # Contratos e interfaces (Repository, Service)
├── mappers/             # Conversões de entidades/DTOs
├── middlewares/         # Middlewares globais (auth, erros, logs)
├── repositories/        # Camada de acesso a dados (Prisma)
├── routes/              # Definição das rotas e módulos
├── services/            # Regras de negócio
├── tests/               # Testes unitários (Jest)
├── utils/               # Funções utilitárias
├── app.ts               # Inicialização da aplicação
└── server.ts            # Bootstrap do servidor HTTP
```

---

## ⚙️ Tecnologias Principais

- **Node.js** + **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL** (ou outro banco configurado)
- **JWT** para autenticação
- **Swagger** para documentação da API
- **Jest** para testes unitários
- **ESLint + Prettier** para padronização de código

---

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/chef-assist-api.git
cd chef-assist-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com base no exemplo:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/chef_assist"
JWT_SECRET="sua_chave_jwt"
PORT=3000
```

### 4. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

### 5. Inicie o servidor
Modo desenvolvimento:
```bash
npm run dev
```

Modo produção:
```bash
npm run build
npm start
```

---

## 📚 Documentação da API

A documentação Swagger está disponível em:
```
http://localhost:3000/api-docs
```

Arquivos YAML:
```
/src/docs/customer.yaml
/src/docs/order.yaml
/src/docs/product.yaml
```

---

## 🧩 Padrão Arquitetural

O projeto segue o padrão **Service-Repository Pattern**, garantindo:
- Separação clara entre **controladores**, **regras de negócio** e **acesso a dados**
- Facilidade para testar e manter o código
- Baixo acoplamento e alta coesão

Fluxo de execução:
```
Request → Controller → Service → Repository → Prisma → Banco de Dados
```

---

## 🔐 Autenticação

Autenticação via **JWT (JSON Web Token)**.

- Endpoint de login: `POST /auth/login`
- Header necessário nas rotas protegidas:
  ```
  Authorization: Bearer <token>
  ```

---

## 🧪 Testes

Rodar todos os testes:
```bash
npm test
```

Gerar cobertura:
```bash
npm run test:coverage
```

Exemplo de teste unitário:
```
src/tests/services/customer.service.spec.ts
```

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Executa o servidor em modo desenvolvimento |
| `npm run build` | Transpila o código TypeScript para JavaScript |
| `npm start` | Executa a versão compilada |
| `npm run lint` | Verifica a padronização de código |
| `npm test` | Executa os testes unitários |

---

## 🧰 Convenções

- **Commits:** padrão [Conventional Commits](https://www.conventionalcommits.org/)
- **Branches:** `main` (prod) / `develop` / `feature/*`
- **Lint:** eslint + prettier
- **Imports absolutos:** configurados via `tsconfig.json`

---

## 👨‍💻 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça commit das alterações
   ```bash
   git commit -m "feat: adiciona novo endpoint de pedidos"
   ```
4. Envie um PR 🚀

---

## 🧑‍🍳 Autor

**Chef Assist API** — Desenvolvido por [Seu Nome]  
📧 [seu.email@empresa.com]  
🌐 [https://seusite.com](https://seusite.com)
