import { useState, useEffect } from "react";
import { X, Image as ImageIcon, ShoppingBag } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ProductForm({ product = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    sale_price: "",
    stock_quantity: "",
    slug: "",
    image_url: "",
    target_species: "both",
    description: "",
    is_active: true
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      id: product.id || null,
      name: product.name || "",
      price: product.price ?? "",
      sale_price: product.sale_price ?? "",
      stock_quantity: product.stock_quantity ?? "",
      slug: product.slug ?? "",
      image_url: product.image_url || "",
      target_species: product.target_species || "both",
      description: product.description || "",
      is_active: product.is_active ?? true
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    if ((name === "price" || name === "sale_price" || name === "stock_quantity") && value < 0) return;

    let slugUpdates = {};
    if (name === "name" && !form.id) { // Only auto-slug for new products
      slugUpdates.slug = value.toLowerCase()
        .replace(/[^a-z0-9\s]+/g, "")
        .replace(/\s+/g, "-")
        .trim();
    }

    setForm({ ...form, ...slugUpdates, [name]: finalValue });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Tên sản phẩm là bắt buộc");
    if (form.price === "" || form.stock_quantity === "") return alert("Vui lòng điền đủ Giá và Số lượng");

    setLoading(true);
    await onSave({
      ...form,
      price: Number(form.price),
      sale_price: form.sale_price ? Number(form.sale_price) : null,
      stock_quantity: Number(form.stock_quantity),
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <Card className="w-full max-w-2xl p-8 animate-in zoom-in-95 duration-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -translate-y-12 translate-x-12 rounded-full" />
        
        <div className="flex justify-between items-center mb-8 relative">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-peach/20 text-primary rounded-2xl">
               <ShoppingBag className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-2xl font-fredoka font-bold text-gray-800 italic">
                  {form.id ? "Chỉnh sửa Sản phẩm" : "Thêm Sản phẩm Mới"}
                </h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Chi tiết hàng hóa 🐾</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-cream rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
        </div>

        <form onSubmit={submit} className="space-y-6 relative overflow-y-auto max-h-[75vh] pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <Input 
                label="Tên sản phẩm" 
                name="name"
                placeholder="Nhập tên sản phẩm..."
                value={form.name}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Giá gốc (VNĐ)" 
                  name="price"
                  type="number"
                  placeholder="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
                <Input 
                  label="Giá khuyến mãi" 
                  name="sale_price"
                  type="number"
                  placeholder="0"
                  value={form.sale_price}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Số lượng tồn" 
                  name="stock_quantity"
                  type="number"
                  placeholder="0"
                  value={form.stock_quantity}
                  onChange={handleChange}
                  required
                />
                 <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">Thú cưng mục tiêu</label>
                    <select 
                      name="target_species"
                      className="w-full border-2 border-cream rounded-xl px-4 py-3 font-semibold focus:border-primary outline-none text-sm"
                      value={form.target_species}
                      onChange={handleChange}
                    >
                      <option value="both">Chó & Mèo</option>
                      <option value="dog">Chó</option>
                      <option value="cat">Mèo</option>
                    </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Input 
                label="Đường dẫn ảnh" 
                name="image_url"
                placeholder="https://images.unsplash.com/..."
                value={form.image_url}
                onChange={handleChange}
              />
              
              <div className="h-40 bg-cream/10 rounded-2xl border-2 border-dashed border-cream/50 flex items-center justify-center overflow-hidden">
                {form.image_url ? (
                  <img src={form.image_url} alt="Xem trước" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-cream-dark mx-auto mb-2" />
                    <p className="text-[10px] font-bold text-gray-400 italic">Xem trước hình ảnh</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-gray-600">Trạng thái kinh doanh</span>
                  <p className="text-[10px] text-gray-400 italic font-semibold">Tắt để ngừng hiển thị tại cửa hàng</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="is_active" 
                    checked={form.is_active} 
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-600 mb-2">Mô tả sản phẩm (Tùy chọn)</label>
             <textarea 
              name="description"
              rows={3}
              className="w-full border-2 border-cream rounded-xl px-4 py-3 font-semibold focus:border-primary outline-none text-sm resize-none"
              placeholder="Ghi chú về công dụng, thành phần, kích thước..."
              value={form.description}
              onChange={handleChange}
             />
          </div>

          <div className="flex gap-4 pt-6 mt-4 border-t border-cream/50 relative">
            <Button variant="outline" className="flex-1" onClick={onClose}>Hủy bỏ</Button>
            <Button type="submit" className="flex-[2] shadow-primary/20 shadow-lg" disabled={loading}>
              {loading ? 'Đang lưu...' : (form.id ? 'Cập nhật Sản phẩm' : 'Lưu Sản phẩm mới')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}