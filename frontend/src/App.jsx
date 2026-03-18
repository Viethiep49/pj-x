import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import ChatWidget from "./components/ChatWidget";
import CartDrawer from "./components/CartDrawer";

// Pages — Public
import LandingPage from "./features/landing/LandingPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import PricingPage from "./features/pricing/PricingPage";
import BookingPage from "./features/pricing/BookingPage";
import ShopPage from "./features/shop/ShopPage";
import PetScannerPage from "./features/scanner/PetScannerPage";
import CheckoutPage from "./features/checkout/CheckoutPage";
import CheckoutResult from "./features/checkout/CheckoutResult";

// Pages — Customer (protected)
import MyPetsPage from "./features/pets/MyPetsPage";
import MyBookingsPage from "./features/bookings/MyBookingsPage";

// Pages — Admin (protected)
import AdminDashboard from "./features/admin/AdminDashboard";
import ProductPage from "./features/products/ProductPage";
import BreedPage from "./features/breeds/BreedPage";
import OrderPage from "./features/orders/OrderPage";
import UsersPage from "./features/users/UsersPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>

            {/* 🌍 PUBLIC & PROTECTED IN MAIN LAYOUT */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<PricingPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/scan" element={<PetScannerPage />} />

              {/* Protected Routes inside MainLayout */}
              <Route path="/booking" element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } />
              <Route path="/my-pets" element={
                <ProtectedRoute>
                  <MyPetsPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout/result" element={
                <ProtectedRoute>
                  <CheckoutResult />
                </ProtectedRoute>
              } />
              <Route path="/my-bookings" element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              } />
            </Route>

            {/* 🔐 AUTH */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* 🛠️ ADMIN (protected — admin/staff only) */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="staff">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductPage />} />
              <Route path="breeds" element={<BreedPage />} />
              <Route path="orders" element={<OrderPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>

            {/* ❌ 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>

          {/* Floating Components */}
          <ChatWidget />
          <CartDrawer />

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
