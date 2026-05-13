# Lesson 29 – Advanced React Hooks

A React learning project exploring advanced hooks including `useReducer`, `useMemo`, `useCallback`, `useRef`, `useLayoutEffect`, custom hooks, and the React Context API.

## Tech Stack

- **React 19** with Vite
- **Tailwind CSS v4**
- Custom hook: `useEmojis`
- Context API: `UserContext`

## Concepts Covered

| Hook / Feature | What It Does |
|---|---|
| `useReducer` | Manages background color cycling with a reducer function |
| `useMemo` | Memoizes an expensive calculation so it only runs when dependencies change |
| `useRef` | Holds a reference to a DOM element (the button) |
| `useLayoutEffect` | Runs synchronously before the browser paints — used to load emojis |
| `useEffect` | Picks a random emoji every time the counter changes |
| Custom hook (`useEmojis`) | Encapsulates emoji state and logic, reusable across components |
| Context API (`useUser`) | Provides user data globally without prop drilling |

## Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── hooks/
│   └── useEmojis.js
└── context/
    └── UserContext.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Run with PowerShell (Windows)

```powershell
.\run-my-app.ps1
```

### Manual Setup

```bash
npm install
npm run dev
```

The app runs on [http://localhost:5173](http://localhost:5173)

## How It Works

Click the **Increment!** button to:

- Increase the counter
- Cycle the button background through a list of colors (managed by `useReducer`)
- Display a new random emoji (via `useEffect` + custom hook)

User info is fetched from `UserContext` and displayed below the counter.
