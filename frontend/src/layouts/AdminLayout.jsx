import { Outlet, NavLink } from "react-router-dom";
import { Bell, Search } from "lucide-react";

export default function AdminLayout() {

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
     ${isActive
        ? "bg-orange-100 text-orange-500 font-bold shadow-sm"
        : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
     }`;

  return (
    <div className="h-screen bg-[#f6f7fb] font-nunito flex overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-8">
            🐾 Admin Panel
          </h2>

          <nav className="space-y-2 text-lg">

            <NavLink to="/admin/products" className={menuClass}>
              📦 Products
            </NavLink>

            <NavLink to="/admin/orders" className={menuClass}>
              🧾 Orders
            </NavLink>

            <NavLink to="/admin/users" className={menuClass}>
              👤 Users
            </NavLink>

          </nav>
        </div>

        <p className="text-sm text-gray-400">Admin Dashboard v1.0</p>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 bg-white shadow-sm px-8 flex items-center justify-between">

          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg w-72">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-gray-600 cursor-pointer" />
            <div className="w-9 h-9 bg-orange-400 rounded-full"></div>
          </div>

        </header>

        {/* CONTENT SCROLL AREA */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
