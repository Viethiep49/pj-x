import { Outlet, Link } from "react-router-dom";
import { Bell, Search } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] font-nunito flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-8">🐾 Admin Panel</h2>

          <nav className="space-y-2 text-lg">
            <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition">
              📦 Products
            </Link>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 cursor-pointer">
              🧾 Orders
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 cursor-pointer">
              👤 Users
            </div>
          </nav>
        </div>

        <p className="text-sm text-gray-400">Admin Dashboard v1.0</p>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <div className="h-16 bg-white shadow-sm px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-gray-600" />
            <div className="w-9 h-9 bg-orange-400 rounded-full"></div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
