import React from 'react';
import { Edit2, Trash2, Package, Star, ShoppingBag } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <Card className="p-20 text-center border-2 border-dashed border-cream/50 bg-transparent flex flex-col items-center">
        <div className="w-16 h-16 bg-cream/30 text-gray-400 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-fredoka font-bold text-gray-800">Chưa có sản phẩm nào</h3>
        <p className="text-gray-400 font-semibold mt-2 italic">Hãy thêm sản phẩm mới để bắt đầu kinh doanh!</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {products.map((p) => (
        <Card
          key={p.id}
          className="group p-4 border-none shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden bg-white"
        >
          {/* Tag status */}
          {!p.is_active && (
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gray-500 text-white text-[10px] font-bold uppercase rounded-full tracking-widest">
              Ngừng bán
            </div>
          )}
          
          <div className="relative h-48 mb-4 overflow-hidden rounded-2xl bg-cream/10">
            <img
              src={p.image_url || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80"}
              alt={p.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80";
              }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Hover overlay with quick actions */}
            <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
              <button
                onClick={() => onEdit(p)}
                className="flex-1 flex items-center justify-center gap-1 bg-white/90 backdrop-blur-sm text-primary py-2 rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all shadow-lg"
              >
                <Edit2 className="w-3 h-3" /> Chỉnh sửa
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-start">
               <span className="px-2 py-0.5 bg-peach/20 text-primary-dark text-[9px] font-bold rounded-lg uppercase tracking-tight">
                 {p.target_species === 'both' ? 'Chó & Mèo' : (p.target_species === 'dog' ? 'Chó' : 'Mèo')}
               </span>
               {p.rating_avg > 0 && (
                 <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-lg">
                    <Star className="w-3 h-3 fill-amber-500" />
                    {Number(p.rating_avg).toFixed(1)}
                 </div>
               )}
             </div>

            <h3 className="text-lg font-fredoka font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors italic">
                {p.name}
            </h3>

            <div className="flex items-center justify-between pt-2 border-t border-cream/50">
              <div className="flex flex-col">
                {p.sale_price && Number(p.sale_price) < Number(p.price) ? (
                   <>
                     <span className="text-xl font-fredoka font-bold text-primary">
                       {Number(p.sale_price).toLocaleString()}đ
                     </span>
                     <span className="text-[10px] text-gray-400 line-through font-bold">
                       {Number(p.price).toLocaleString()}đ
                     </span>
                   </>
                ) : (
                  <span className="text-xl font-fredoka font-bold text-gray-800 group-hover:text-primary transition-colors">
                    {Number(p.price).toLocaleString()}đ
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl">
                 <Package className="w-3.5 h-3.5 text-gray-400" />
                 <span className={`text-xs font-bold ${p.stock_quantity <= 5 ? 'text-red-500' : 'text-gray-600'}`}>
                   {p.stock_quantity ?? 0} <span className="text-[10px] opacity-70">tồn</span>
                 </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
