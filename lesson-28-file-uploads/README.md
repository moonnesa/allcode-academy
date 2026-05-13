# Lesson 28 – File Uploads

A fullstack image upload app built with React + Express. Upload images from the browser, store metadata in a SQLite database via Prisma, and display all uploaded images in a responsive grid.

## Tech Stack

### Client
- **React 19** with Vite
- **Tailwind CSS v4**
- **Axios** for HTTP requests

### Server
- **Express 5**
- **Prisma 7** with `better-sqlite3` adapter
- **express-fileupload** for handling multipart/form-data
- **dotenv** for environment variables

## Project Structure

```
lesson-28-file-uploads/
├── client/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       └── components/
│           ├── Navbar.jsx
│           └── FileInput.jsx
└── server/
    ├── index.js
    ├── images/              # Uploaded images stored here
    ├── prisma/
    │   ├── schema.prisma
    │   └── db.sqlite
    └── src/
        └── generated/
            └── prisma/      # Prisma generated client
```

## Features

- Upload images via a file input
- Images are saved to `server/images/` on disk
- File metadata (`fileName`, `filePath`, `name`) is stored in SQLite via Prisma
- All uploaded images are fetched and displayed in a 5-column grid
- Success/error toast messages with fade-out animation

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload-picture` | Upload an image file |
| `GET` | `/api/get-pictures` | Fetch all uploaded images |

Images are served statically from `/images/:filename`.

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Run with PowerShell (Windows)

```powershell
.\run-my-app.ps1
```

This installs dependencies, runs Prisma migrations, and starts both the client and server.

### Manual Setup

**Server:**
```bash
cd server
npm install
npx prisma migrate deploy
node index.js
```

**Client** (in a separate terminal):
```bash
cd client
npm install
npm run dev
```

### Environment Variables

The server reads from `server/.env`:

```env
DATABASE_URL="file:prisma/db.sqlite"
PORT=4000
```

## URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:4000 |
