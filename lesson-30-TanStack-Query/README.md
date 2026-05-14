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

- **Fetch all products** from [dummyjson.com](https://dummyjson.com) using `useQuery`
- **View product details** — klikk på et produkt for å se detaljside med suksessmelding i 3 sekunder
- **Add a product** using `useMutation` med kontrollert skjema, med auto-reload etter 3 sekunder
- Loading og error states håndtert per side

---

## Project Structure

```
src/
├── lib/
│   ├── axios.jsx              # Axios instance with base URL
│   ├── queries/
│   │   ├── getProducts.jsx    # Fetches all products
│   │   └── getProduct.jsx     # Fetches single product by ID
│   └── mutations/
│       └── postProduct.jsx    # Posts a new product
├── pages/
│   ├── Home.jsx               # Product list with links to detail pages
│   ├── Product.jsx            # Single product detail page
│   └── AddProduct.jsx         # Add product form
├── App.jsx                    # Routes and nav
└── main.jsx                   # QueryClientProvider + BrowserRouter setup
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

### useQuery — hente alle produkter (Home.jsx)

```jsx
const { data: products, isPending, isLoading, isError } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
});

if (isLoading || isPending) return <p>Loading...</p>;
```

### useQuery — hente enkelt produkt (Product.jsx)

`queryKey` inkluderer `id` så TanStack Query cacher hvert produkt separat:

```jsx
const { data, isPending, isLoading, isError, isSuccess } = useQuery({
  queryKey: ['product', id],
  queryFn: () => getProduct(id),
});
```

> **Note:** Bruk `isPending || isLoading` for å dekke både første fetch og refetch i TanStack Query v5.

### useMutation — legge til produkt (AddProduct.jsx)

```jsx
const newProduct = useMutation({
  mutationFn: () => postProduct({ title: formData.title, price: formData.price }),
  onSuccess: () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});

// Trigger mutation på knappeklikk
<button type='button' onClick={() => newProduct.mutate()}>Add Product</button>
```

> **Note:** Bruk `type='button'` på submit-knappen — `type='submit'` refresher siden og nuller ut mutation-state før suksessmeldingen vises.

### Timed success message med useEffect (Product.jsx)

```jsx
const [showSuccess, setShowSuccess] = useState(false);

useEffect(() => {
  if (isSuccess) {
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer); // cleanup ved unmount
  }
}, [isSuccess]);
```

---

## API

Uses the public [dummyjson.com](https://dummyjson.com) REST API.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Fetch all products |
| GET | `/products/:id` | Fetch single product by ID |
| POST | `/products/add` | Add a new product |
