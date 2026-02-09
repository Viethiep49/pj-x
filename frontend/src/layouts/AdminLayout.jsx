import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-clay-background font-nunito flex gap-6 p-6">
      
      {/* Clay Sidebar */}
      <aside className="w-64 bg-white p-6 rounded-[var(--radius-clay)] shadow-[var(--shadow-clay-md)] space-y-6 h-fit">
        <h2 className="text-2xl font-fredoka text-primary text-puffy">🐾 Admin Panel</h2>

        <nav className="space-y-3 text-lg">
          <Link
            to="/admin/products"
            className="block px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition"
          >
            📦 Products
          </Link>

          <div className="px-4 py-3 rounded-xl hover:bg-primary/10 cursor-pointer">
            🧾 Orders
          </div>

          <div className="px-4 py-3 rounded-xl hover:bg-primary/10 cursor-pointer">
            👤 Users
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-8 rounded-[var(--radius-clay)] shadow-[var(--shadow-clay-lg)]">
        <Outlet />
      </main>

    </div>
  );
}
