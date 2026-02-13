import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import LandingPage from "./features/landing/LandingPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import PricingPage from "./features/pricing/PricingPage";
import BookingPage from "./features/pricing/BookingPage";
import PetScannerPage from "./features/scanner/PetScannerPage";
import ProductPage from "./features/products/ProductPage";
import OrderPage from "./features/orders/OrderPage";
import UsersPage from "./features/users/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 PUBLIC */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<PricingPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/scan" element={<PetScannerPage />} />
        </Route>

        {/* 🔐 AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* 🛠️ ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<div className="p-6"></div>} />

          <Route path="products" element={<ProductPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="users" element={<UsersPage />} />

        </Route>

        {/* ❌ 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
