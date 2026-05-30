# Sistema de Treinamentos Profissionais

Monorepo contendo frontend (Next.js) e backend (Node.js/Express) para gestão de treinamentos corporativos.

## Estrutura

```
.
├── apps/
│   ├── web/          # Frontend Next.js 14 (App Router)
│   └── api/          # Backend Node.js + Express + TypeScript
├── .env.example      # Variáveis de ambiente
└── README.md         # Este arquivo
```

## Pré-requisitos

- Node.js 18+
- npm 9+
- Docker (para banco de dados)

## Setup Inicial

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd training-system
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Edite o .env com suas configurações
   ```

4. **Configure o banco de dados:**
   ```bash
   docker compose up -d
   ```

5. **Configure o Prisma:**
   ```bash
   cd apps/api
   npx prisma migrate dev
   npx prisma generate
   ```

## Desenvolvimento

### Rodar o Backend (API)

```bash
npm run dev:api
# ou
cd apps/api && npm run dev
```

A API estará disponível em: http://localhost:3001

Health check: http://localhost:3001/api/health

### Rodar o Frontend (Web)

```bash
npm run dev:web
# ou
cd apps/web && npm run dev
```

O frontend estará disponível em: http://localhost:3000

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev:api` | Inicia o backend em modo de desenvolvimento |
| `npm run dev:web` | Inicia o frontend em modo de desenvolvimento |
| `npm run build:api` | Compila o backend TypeScript |
| `npm run build:web` | Compila o frontend Next.js |
| `npm run typecheck:api` | Verifica tipos do backend |

## Variáveis de Ambiente

### Backend (`apps/api/.env`)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/training_system"
PORT=3001
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
```

### Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Tecnologias

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- App Router

## Licença

ISC