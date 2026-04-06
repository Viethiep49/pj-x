import { Outlet, NavLink, useNavigate, Link, useSearchParams, useLocation } from "react-router-dom";
import { Search, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const currentTab = searchParams.get('tab') || 
    (pathname.endsWith('/products') ? 'products' : 
     pathname.endsWith('/breeds') ? 'breeds' : 
     pathname.endsWith('/orders') ? 'orders' : 
     pathname.endsWith('/users') ? 'users' : 'overview');

  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const menuRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuClass = (tabId) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
     ${
       currentTab === tabId
         ? "bg-orange-100 text-orange-500 font-bold shadow-sm"
         : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
     }`;

  return (
    <div className="h-screen bg-[#f6f7fb] font-nunito flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col justify-between">
        <div>
          <Link to="/admin">
            <h2 className="text-xl font-bold text-orange-500 mb-8 hover:opacity-80 transition-opacity cursor-pointer">
              Admin Dashboard 🐾
            </h2>
          </Link>

          <nav className="space-y-2 text-lg">
            <NavLink to="/admin?tab=overview" className={menuClass('overview')}>
              📊 Tổng quan
            </NavLink>
            <NavLink to="/admin/products" className={menuClass('products')}>
              📦 Sản phẩm
            </NavLink>
            <NavLink to="/admin?tab=orders" className={menuClass('orders')}>
              🧾 Đơn hàng
            </NavLink>
            <NavLink to="/admin?tab=appointments" className={menuClass('appointments')}>
              📅 Lịch hẹn
            </NavLink>
            <NavLink to="/admin?tab=users" className={menuClass('users')}>
              👤 Khách hàng
            </NavLink>
            <NavLink to="/admin?tab=breeds" className={menuClass('breeds')}>
              🐕 Giống thú cưng
            </NavLink>
          </nav>
        </div>

        <p className="text-sm text-gray-400">Admin Dashboard v1.0</p>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="h-16 bg-white shadow-sm px-8 flex items-center justify-between">
          {/* SEARCH */}
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg w-72">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* AVATAR */}
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500
              flex items-center justify-center text-white font-bold cursor-pointer shadow-md"
            >
              {user?.full_name?.charAt(0) || "A"}
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border overflow-hidden z-50"
                >
                  {/* USER INFO */}
                  <div className="px-5 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                    <p className="font-semibold text-sm">
                      {user?.full_name || "System Admin"}
                    </p>
                    <p className="text-xs opacity-90">{user?.email}</p>
                  </div>

                  {/* MENU */}
                  <div className="py-2 text-sm">
                    <button className="w-full text-left px-5 py-2 hover:bg-gray-100">
                      👤 Profile
                    </button>

                    {/* SETTINGS */}
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="w-full text-left px-5 py-2 hover:bg-gray-100 flex justify-between"
                    >
                      ⚙️ Settings
                      <span>{showSettings ? "▾" : "▸"}</span>
                    </button>

                    <AnimatePresence>
                      {showSettings && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50"
                        >
                          <button className="w-full text-left px-8 py-2 hover:bg-gray-100 text-gray-600">
                            Account settings
                          </button>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-8 py-2 text-red-500 hover:bg-red-50"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
