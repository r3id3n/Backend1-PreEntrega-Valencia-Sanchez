import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProductList from "./components/ProductList/ProductList";
import AddProduct from "./components/AddProduct/AddProduct";
import EditProduct from "./components/EditProduct/EditProduct";
import Cart from "./components/Cart/Cart";
import CartList from "./components/CartList/CartList";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:pid" element={<EditProduct />} />
          <Route path="/cart/:cid" element={<Cart />} />
          <Route path="/carts" element={<CartList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
