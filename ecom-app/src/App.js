import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import { useState } from "react";
import CartContext from "./context/CartContext";

function App() {

  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />      
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
