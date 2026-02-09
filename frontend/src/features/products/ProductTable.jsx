export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No products yet. Add a new product ✨
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white p-6 rounded-[var(--radius-clay)] shadow-[var(--shadow-clay-sm)]"
        >
          <h2 className="text-xl font-bold text-primary mb-2">{p.name}</h2>
          <p>💰 Price: {p.price.toLocaleString()} đ</p>
          <p>📦 Stock: {p.stock}</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => onEdit(p)}
              className="bg-secondary px-4 py-2 rounded-xl text-white"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(p.id)}
              className="bg-pink-400 px-4 py-2 rounded-xl text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
