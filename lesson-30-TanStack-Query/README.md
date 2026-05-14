# Lesson 30 – TanStack Query

A React frontend built as part of the AllCode Academy fullstack course. Demonstrates data fetching and mutation with TanStack Query (React Query v5), Axios, and React Router.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| TanStack Query | v5 | Server state management |
| Axios | 1.x | HTTP client |
| React Router | v7 | Client-side routing |
| Tailwind CSS | v4 | Styling |
| Vite | v8 | Dev server & bundler |

---

## Features

- **Fetch products** from [dummyjson.com](https://dummyjson.com) using `useQuery`
- **Add a product** using `useMutation` with a controlled form
- Success feedback message that disappears after 3 seconds
- Loading and error states handled per page

---

## Project Structure

```
src/
├── lib/
│   ├── axios.jsx          # Axios instance with base URL
│   ├── queries/
│   │   └── getProducts.jsx  # useQuery fetcher function
│   └── mutations/
│       └── postProduct.jsx  # useMutation poster function
├── pages/
│   ├── Home.jsx           # Product list page
│   └── AddProduct.jsx     # Add product form page
├── App.jsx                # Routes and nav
└── main.jsx               # QueryClientProvider + BrowserRouter setup
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

---

## Key Concepts

### useQuery (fetching data)

```jsx
const { data, isPending, isError } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
});
```

> **Note:** Use `isPending` (not `isLoading`) in TanStack Query v5 to check if data is being fetched for the first time.

### useMutation (posting data)

```jsx
const mutation = useMutation({
  mutationFn: (formData) => postProduct(formData),
});

mutation.mutate({ title: 'New Product', price: 9.99 });
```

### Timed success message with useEffect

```jsx
const [showSuccess, setShowSuccess] = useState(false);

useEffect(() => {
  if (mutation.isSuccess) {
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);
  }
}, [mutation.isSuccess]);
```

---

## API

Uses the public [dummyjson.com](https://dummyjson.com) REST API.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Fetch all products |
| POST | `/products/add` | Add a new product |
