import { useState, useEffect } from "react";
import { Plus, ShoppingBag, Search, Filter } from 'lucide-react';
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import api from "../../services/api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addOrUpdate = async (productData) => {
    try {
      if (productData.id) {
        await api.put(`/products/${productData.id}`, productData);
      } else {
        await api.post('/products', productData);
      }
      fetchProducts();
      setEditing(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi khi lưu sản phẩm');
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi khi xóa sản phẩm');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Quản lý Sản phẩm
          </h2>
          <p className="text-gray-500 font-semibold mt-1 italic text-sm">
            Hiện có {products.length} sản phẩm trong cửa hàng
          </p>
        </div>
        
        <button
          onClick={() => setEditing({})}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl shadow-primary/20 shadow-lg hover:scale-105 transition-all duration-200 font-bold"
        >
          <Plus className="w-5 h-5" /> Thêm sản phẩm
        </button>
      </div>

      <Card className="p-6 border-none shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm theo tên..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-cream/10 border-2 border-cream/30 rounded-2xl font-semibold focus:border-primary/50 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border-2 border-cream text-gray-500 font-bold rounded-2xl hover:bg-cream transition-colors whitespace-nowrap">
          <Filter className="w-5 h-5" /> Bộ lọc nâng cao
        </button>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={(product) => setEditing(product)}
          onDelete={deleteProduct}
        />
      )}

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
