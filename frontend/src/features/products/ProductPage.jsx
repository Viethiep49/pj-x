import { useState } from "react";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const addOrUpdate = (product) => {
    if (product.id) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      product.id = Date.now();
      setProducts([...products, product]);
    }
    setEditing(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Product Management</h1>
        <button
          onClick={() => setEditing({})}
          className="bg-primary text-white px-6 py-3 rounded-[var(--radius-clay)] shadow-[var(--shadow-clay-puffy)] font-semibold"
        >
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={setEditing}
        onDelete={deleteProduct}
      />

      {editing !== null && (
        <ProductForm
          product={editing}
          onSave={addOrUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
