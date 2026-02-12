export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24 text-gray-400 text-xl">
        No products yet. Add a new product ✨
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
        >
          {/* 🖼 HIỂN THỊ ẢNH */}
          <img
            src={p.image || "https://via.placeholder.com/300"}
            alt={p.name}
            onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />

          <h2 className="text-2xl font-bold text-primary mb-4">{p.name}</h2>

          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-extrabold text-green-600">
              {Number(p.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              Stock: {p.stock}
            </span>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => onEdit(p)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-xl font-semibold transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(p.id)}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl font-semibold transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
