import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PawPrint,
  Scan,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, openCart } = useCart();

  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Bubble Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`${
            isHomePage ? "max-w-[1600px]" : "max-w-6xl"
          } mx-auto bg-white/80 backdrop-blur-md rounded-full shadow-clay-md border border-white/50 px-8 py-3 flex items-center justify-between transition-all duration-500`}
        >
          <div className="flex items-center gap-10">
            <Link 
              to="/" 
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-clay-sm group-hover:rotate-12 transition-transform">
                <PawPrint className="text-white w-6 h-6" />
              </div>
              <span className="font-fredoka font-bold text-2xl text-primary tracking-tight">
                Pawsitive
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 whitespace-nowrap">
              <Link
                to="/services"
                className="font-fredoka font-bold text-gray-500 hover:text-primary transition-colors relative group"
              >
                Dịch vụ
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-full" />
              </Link>

              <a
                href={isHomePage ? "#gallery" : "/#gallery"}
                className="font-fredoka font-bold text-gray-500 hover:text-primary transition-colors relative group"
              >
                Thư viện
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-full" />
              </a>

              <a
                href={isHomePage ? "#reviews" : "/#reviews"}
                className="font-fredoka font-bold text-gray-500 hover:text-primary transition-colors relative group"
              >
                Nhận xét
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-full" />
              </a>

              <Link
                to="/shop"
                className="font-fredoka font-bold text-gray-500 hover:text-primary transition-colors relative group flex items-center gap-1"
              >
                Cửa hàng
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-full" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 border-l border-gray-200 pl-3 ml-3">
              {isAuthenticated ? (
                <div className="relative group cursor-pointer flex items-center gap-2">
                  <div className="w-10 h-10 bg-lavender rounded-full flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-gray-700">
                    {user?.full_name?.split(" ")[0]}
                  </span>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-clay-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-50">
                    <Link
                      to="/my-bookings" 
                      className="block px-4 py-2 hover:bg-cream rounded-lg font-bold text-gray-600"
                    >
                      Lịch hẹn
                    </Link>
                    <Link
                      to="/my-pets"
                      className="block px-4 py-2 hover:bg-cream rounded-lg font-bold text-gray-600"
                    >
                      Thú cưng
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 rounded-lg font-bold mt-1 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-fredoka font-bold text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                  >
                    Đăng nhập
                  </Link>
                  <Link to="/register">
                    <Button className="py-2.5 px-6 text-sm whitespace-nowrap">
                      Đăng ký
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link to="/scan">
                <Button
                  className="hidden sm:flex py-3 px-6 text-sm gap-2 whitespace-nowrap"
                  variant="outline"
                >
                  <Scan className="w-4 h-4" /> Scan Pet
                </Button>
              </Link>
              <Link to="/booking">
                <Button
                  className="hidden sm:flex py-3 px-8 text-sm whitespace-nowrap"
                  variant="primary"
                >
                  Đặt lịch ngay!
                </Button>
              </Link>

              {/* Cart Toggle */}
              <button
                onClick={openCart}
                className="relative w-12 h-12 flex items-center justify-center bg-cream rounded-full hover:bg-peach transition-colors shadow-clay-sm"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs font-bold flex items-center justify-center rounded-full animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-cream shadow-clay-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-clay-background pt-24 px-6 md:hidden"
          >
            <div className="grid gap-4">
              {[
                { name: "Services", link: "/services" },
                { name: "Gallery", link: isHomePage ? "#gallery" : "/#gallery" },
                { name: "Reviews", link: isHomePage ? "#reviews" : "/#reviews" },
                { name: "Shop", link: "/shop" }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  to={item.link.startsWith("#") ? "/" + item.link : item.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Card
                    className="text-center py-4"
                  >
                    <span className="font-fredoka font-bold text-xl text-gray-700">
                      {item.name}
                    </span>
                  </Card>
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="peach" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
