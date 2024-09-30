import "./App.css";
import Header from "./components/header";
import ProductDetails from "./components/Product/productDetails";
import Cart from "./components/Cart/cart";
import { Route, Routes } from "react-router-dom";
import Product from "./components/Product/Product";
import Contact from "./components/Contact.js";
import NotFound from "./components/notFound";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
