import React, { useState, useEffect } from "react";

import { Search, ShoppingBag, Loader, Star } from "lucide-react";
import api from "../../services/api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useCart } from "../../contexts/CartContext";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSpecie, setFilterSpecie] = useState("all");
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/products');
            // Thêm default rating mockup vì backend chưa return aggregate review
            const data = res.data.data.map(p => ({
                ...p,
                rating: 4 + Math.random(),
                reviewsCount: Math.floor(Math.random() * 50) + 5
            }));
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchSpecie = filterSpecie === "all" || p.target_species === filterSpecie || p.target_species === "all";
        return matchSearch && matchSpecie;
    });

    return (
        <div className="min-h-screen bg-clay-background pt-32 pb-20 font-nunito px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-6">
                    <div
                        className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4"
                    >
                        <ShoppingBag className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-5xl font-fredoka font-bold text-gray-800">
                        Chào mừng đến với <span className="text-primary">Pet Shop</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                        Khám phá các sản phẩm chăm sóc thú cưng cao cấp, thức ăn dinh dưỡng và phụ kiện đa dạng cho thú cưng của bạn.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-4 rounded-full shadow-clay-sm border border-cream">
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 px-2">
                        {["all", "dog", "cat"].map(specie => (
                            <button
                                key={specie}
                                onClick={() => setFilterSpecie(specie)}
                                className={`px-6 py-2.5 rounded-full font-bold capitalize whitespace-nowrap transition-colors ${filterSpecie === specie
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-cream text-gray-600 hover:bg-peach'
                                    }`}
                            >
                                {specie === 'all' ? 'Tất cả' : specie === 'dog' ? 'Chó' : 'Mèo'}
                            </button>
                        ))}
                    </div>

                    <div className="w-full md:w-96 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-cream/50 border-2 border-cream focus:border-primary focus:bg-white rounded-full py-3 pl-12 pr-4 font-semibold outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader className="w-12 h-12 text-primary animate-spin" />
                        <p className="mt-4 text-gray-500 font-bold">Đang tải sản phẩm...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-32">
                        <p className="text-2xl text-gray-400 font-bold mb-4">Không tìm thấy sản phẩm nào.</p>
                        <Button variant="outline" onClick={() => { setSearchTerm(""); setFilterSpecie("all") }}>Xóa bộ lọc</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <Card key={product.id} className="h-full flex flex-col p-4 group hover:-translate-y-2 transition-transform duration-300">
                                <div className="relative aspect-square w-full mb-6 rounded-2xl overflow-hidden bg-white">
                                    <img
                                        src={product.image_url || product.image || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={e => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80"; }}
                                    />
                                    {product.stock_quantity < 5 && product.stock_quantity > 0 && (
                                        <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            Chỉ còn {product.stock_quantity}
                                        </span>
                                    )}
                                    {product.stock_quantity === 0 && (
                                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            Hết hàng
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-center gap-1 mb-2">
                                        <Star className="w-4 h-4 text-secondary fill-secondary" />
                                        <span className="text-sm font-bold text-gray-700">{product.rating.toFixed(1)}</span>
                                        <span className="text-sm text-gray-400 font-semibold">({product.reviewsCount})</span>
                                    </div>

                                    <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>

                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        <span className="font-bold text-primary text-2xl">
                                            {Number(product.price).toLocaleString("vi-VN")} đ
                                        </span>
                                    </div>

                                    <Button
                                        className="w-full mt-4 flex items-center justify-center gap-2"
                                        disabled={product.stock_quantity === 0}
                                        onClick={() => addToCart(product)}
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        {product.stock_quantity === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
