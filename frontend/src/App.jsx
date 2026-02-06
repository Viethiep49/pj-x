import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages (Placeholder imports for now, files will be created next)
import LandingPage from './features/landing/LandingPage';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import PricingPage from './features/pricing/PricingPage';
import BookingPage from './features/pricing/BookingPage';

function App() {
  return (
    <BrowserRouter>
<Routes>
  {/* Public Routes */}
  <Route element={<MainLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    {/* BẠN THÊM DÒNG NÀY Ở ĐÂY */}
    <Route path="/booking" element={<BookingPage />} />
  </Route>

  {/* Auth Routes giữ nguyên... */}
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>

  {/* Catch all */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
