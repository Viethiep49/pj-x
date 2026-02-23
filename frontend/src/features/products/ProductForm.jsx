import { useState, useEffect } from "react";

export default function ProductForm({ product = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    stock_quantity: "",
    slug: "",
    image_url: "",
  });

  useEffect(() => {
    setForm({
      id: product.id || null,
      name: product.name || "",
      price: product.price ?? "",
      stock_quantity: product.stock_quantity ?? "",
      slug: product.slug ?? "",
      image_url: product.image_url || "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Không cho nhập số âm
    if ((name === "price" || name === "stock_quantity") && value < 0) return;

    let slugUpdates = {};
    if (name === "name") {
      slugUpdates.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    setForm({ ...form, ...slugUpdates, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Product name required");
    if (form.price === "" || form.stock_quantity === "") return alert("Fill all fields");

    onSave({
      ...form,
      price: Number(form.price),
      stock_quantity: Number(form.stock_quantity),
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
            name="stock_quantity"
            type="number"
            placeholder="Stock quantity"
            value={form.stock_quantity}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* IMAGE URL */}
          <input
            name="image_url"
            type="text"
            placeholder="Image URL (optional)"
            value={form.image_url}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* PREVIEW ẢNH */}
          {form.image_url && (
            <img
              src={form.image_url}
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