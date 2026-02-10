import { useState } from "react";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const addOrUpdate = (product) => {
    setProducts((prev) => {
      // UPDATE
      if (product.id) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      // ADD
      return [...prev, { ...product, id: Date.now() }];
    });

    setEditing(null);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary tracking-tight">
          Product Management
        </h1>

        <button
          onClick={() => setEditing({})}
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition font-semibold"
        >
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={(product) => setEditing(product)}
        onDelete={deleteProduct}
      />

      {editing && (
        <ProductForm
          product={editing}
          onSave={addOrUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
