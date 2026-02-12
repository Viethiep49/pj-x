import { useState, useEffect } from "react";

export default function ProductForm({ product = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    setForm({
      id: product.id || null,
      name: product.name || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      image: product.image || "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Không cho nhập số âm
    if ((name === "price" || name === "stock") && value < 0) return;

    setForm({ ...form, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Product name required");
    if (form.price === "" || form.stock === "") return alert("Fill all fields");

    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-clay-card p-8 w-[420px] rounded-clay shadow-clay-lg animate-squish">
        
        <h2 className="text-2xl font-fredoka text-primary text-center mb-6">
          {form.id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={submit} className="flex flex-col gap-4">

          {/* NAME */}
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* PRICE */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* STOCK */}
          <input
            name="stock"
            type="number"
            placeholder="Stock quantity"
            value={form.stock}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* IMAGE URL */}
          <input
            name="image"
            type="text"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* PREVIEW ẢNH */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="h-32 object-cover rounded-xl border"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-black transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-xl shadow-clay-puffy hover:scale-105 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}