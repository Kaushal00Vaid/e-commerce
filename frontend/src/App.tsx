import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import AuthSuccess from "./pages/AuthSuccess.tsx";

import "./App.css";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminProducts from "./pages/admin/AdminProducts.tsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.tsx";
import AdminAddProduct from "./pages/admin/AdminAddProduct.tsx";
import EditProduct from "./pages/admin/EditProduct.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Orders from "./pages/Orders.tsx";
import AdminOrders from "./pages/admin/AdminOrders.tsx";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails.tsx";
import ContactPage from "./pages/Contact.tsx";

function App() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <AdminProtectedRoute>
              <AdminAddProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminProtectedRoute>
              <EditProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <AdminProtectedRoute>
              <AdminOrderDetails />
            </AdminProtectedRoute>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
