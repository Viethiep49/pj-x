import { useState } from "react";

export default function ProductForm({ product, onSave, onClose }) {
  const [form, setForm] = useState({
    id: product.id || null,
    name: product.name || "",
    price: product.price || "",
    stock: product.stock || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;
    onSave({ ...form, price: Number(form.price), stock: Number(form.stock) });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-[var(--radius-clay)] w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-primary">
          {form.id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock quantity"
            value={form.stock}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-xl"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
