import { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import api from "../../services/api";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addOrUpdate = async (product) => {
    try {
      if (product.id) {
        await api.put(`/products/${product.id}`, product);
      } else {
        await api.post('/products', product);
      }
      fetchProducts();
      setEditing(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting product');
    }
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
