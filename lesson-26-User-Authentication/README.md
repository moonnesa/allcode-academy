# lesson-26-User-Authentication

A fullstack user authentication app built with React and Express. Users can register, log in, and access protected routes. Passwords are hashed with bcrypt and sessions are managed with JWT.

---

## Tech Stack

**Client:** React, Vite, Tailwind CSS, React Router, Zod

**Server:** Node.js 22, Express, Prisma ORM, SQLite (better-sqlite3), bcryptjs, JWT, CORS, dotenv

---

## Features

- Register new user (password hashed with bcrypt)
- Login with email and password
- JWT issued on login, stored client-side
- Protected routes — requires valid token
- Logout (token removed client-side)

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) with Docker Compose

### Environment variables

Create a `.env` file in `/server`:

```env
DATABASE_URL="file:./prisma/db.sqlite"
PORT=4000
SECRET_KEY="your_secret_key_here"
```

### Run the app

```bash
docker compose up --build
```

- Client: `http://localhost:5173`
- Server: `http://localhost:4000`

Prisma client is generated automatically inside the container.

---

## API Endpoints

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create new user | No |
| POST | `/login` | Login, returns JWT | No |
| GET | `/secret-sauce` | Get secret sauce (example protected route) | Yes |

---

## Project Structure

```
lesson-26-User-Authentication/
├── client/
│   └── src/
│       ├── components/
│       └── pages/
├── server/
│   ├── prisma/
│   └── src/
└── docker-compose.yml
```

---

## Notes

This project was built as part of the AllCode Academy fullstack web development course.
