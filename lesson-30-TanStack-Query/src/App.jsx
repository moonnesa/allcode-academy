import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Product from './pages/Product';


function App() {
  return (
    <main className="App">
      <nav className='flex gap-4 p-4 bg-black text-white fixed w-full top-0 left-0 z-10'>
        <Link to="/">Home</Link>
        <Link to="/add-product">Add Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </main>
  )
}

export default App
