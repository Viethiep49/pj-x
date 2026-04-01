import React, { useState, useEffect } from 'react';
import { 
    Calendar, 
    ShoppingBag, 
    Plus, 
    User as UserIcon, 
    Dog, 
    Tag, 
    Clock, 
    MapPin, 
    Phone, 
    ChevronRight,
    Search,
    X,
    CheckCircle2,
    Sparkles
} from 'lucide-react';
import api from '../../../services/api';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';

const AdminQuickActions = ({ onActionComplete }) => {
    const [activeModal, setActiveModal] = useState(null); // 'appointment' or 'order'
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBaseData = async () => {
            try {
                const [uRes, sRes, pRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/services'),
                    api.get('/products')
                ]);
                setUsers(uRes.data.data || []);
                setServices(sRes.data.data || []);
                setProducts(pRes.data.data || []);
            } catch (err) {
                console.error("Failed to fetch quick action data:", err);
            }
        };
        fetchBaseData();
    }, []);

    const fetchUserPets = async (userId) => {
        if (!userId) return;
        try {
            const res = await api.get('/pets/admin'); 
            const userPets = res.data.data.filter(p => p.owner_id === userId);
            setPets(userPets);
        } catch (err) {
            console.error("Failed to fetch user pets:", err);
        }
    };

    const AppointmentModal = () => {
        const [form, setForm] = useState({
            user_id: '',
            pet_id: '',
            service_id: '',
            appointment_date: '',
            notes: ''
        });

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                await api.post('/appointments/admin', form);
                setActiveModal(null);
                if (onActionComplete) onActionComplete();
            } catch (err) {
                alert(err.response?.data?.message || "Lỗi khi tạo lịch hẹn");
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <Card className="w-full max-w-lg p-8 animate-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-primary" />
                            Tạo lịch hẹn mới
                        </h3>
                        <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-cream rounded-full"><X className="w-5 h-5" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Chọn Khách hàng</label>
                            <select 
                                className="w-full border-2 border-cream rounded-xl px-4 py-3 font-semibold focus:border-primary outline-none"
                                value={form.user_id}
                                onChange={(e) => {
                                    setForm({...form, user_id: e.target.value, pet_id: ''});
                                    fetchUserPets(e.target.value);
                                }}
                                required
                            >
                                <option value="">-- Chọn khách hàng --</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Chọn Thú cưng</label>
                            <select 
                                className="w-full border-2 border-cream rounded-xl px-4 py-3 font-semibold focus:border-primary outline-none disabled:opacity-50"
                                value={form.pet_id}
                                onChange={(e) => setForm({...form, pet_id: e.target.value})}
                                disabled={!form.user_id}
                                required
                            >
                                <option value="">-- {form.user_id ? 'Chọn bé thú cưng' : 'Vui lòng chọn khách hàng trước'} --</option>
                                {pets.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.breed})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Dịch vụ</label>
                            <select 
                                className="w-full border-2 border-cream rounded-xl px-4 py-3 font-semibold focus:border-primary outline-none"
                                value={form.service_id}
                                onChange={(e) => setForm({...form, service_id: e.target.value})}
                                required
                            >
                                <option value="">-- Chọn dịch vụ --</option>
                                {services.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} ({Number(s.price).toLocaleString()}đ)</option>
                                ))}
                            </select>
                        </div>
                        <Input 
                            label="Ngày & Giờ hẹn" 
                            type="datetime-local" 
                            value={form.appointment_date} 
                            onChange={(e) => setForm({...form, appointment_date: e.target.value})} 
                            required 
                        />
                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" className="flex-1" onClick={() => setActiveModal(null)}>Hủy</Button>
                            <Button type="submit" className="flex-[2] shadow-primary/20 shadow-lg" disabled={loading}>
                                {loading ? 'Đang lưu...' : 'Xác nhận đặt lịch'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        );
    };

    const OrderModal = () => {
        const [form, setForm] = useState({
            user_id: '',
            items: [],
            delivery_method: 'pickup',
            shipping_address: '',
            receiver_name: '',
            receiver_phone: '',
            notes: ''
        });

        const addItem = (product) => {
            const existing = form.items.find(i => i.product_id === product.id);
            if (existing) {
                setForm({
                    ...form,
                    items: form.items.map(i => i.product_id === product.id ? {...i, quantity: i.quantity + 1} : i)
                });
            } else {
                setForm({
                    ...form,
                    items: [...form.items, { product_id: product.id, quantity: 1, name: product.name, price: product.sale_price || product.price }]
                });
            }
        };

        const removeItem = (id) => {
            setForm({ ...form, items: form.items.filter(i => i.product_id !== id) });
        };

        const total = form.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (form.items.length === 0) return alert("Vui lòng chọn sản phẩm");
            setLoading(true);
            try {
                await api.post('/orders/admin', {
                    ...form,
                    receiver_name: form.receiver_name || users.find(u => u.id === form.user_id)?.full_name,
                    receiver_phone: form.receiver_phone || users.find(u => u.id === form.user_id)?.phone_number
                });
                setActiveModal(null);
                if (onActionComplete) onActionComplete();
            } catch (err) {
                alert(err.response?.data?.message || "Lỗi khi tạo đơn hàng");
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <Card className="w-full max-w-4xl p-8 animate-in zoom-in-95 duration-200 h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center mb-6 flex-shrink-0">
                        <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-secondary" />
                            Tạo đơn hàng nhanh
                        </h3>
                        <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-cream rounded-full"><X className="w-5 h-5" /></button>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8 flex-1 min-h-0">
                        <div className="flex flex-col min-h-0">
                            <label className="block text-sm font-bold text-gray-600 mb-2">1. Chọn sản phẩm</label>
                            <div className="border-2 border-cream rounded-xl overflow-hidden flex-1 overflow-y-auto p-4 space-y-2 bg-cream/5">
                                {products.map(p => (
                                    <div key={p.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:border-primary border border-transparent transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-cream rounded-md overflow-hidden">
                                                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-700">{p.name}</p>
                                                <p className="text-xs text-primary font-bold">{Number(p.sale_price || p.price).toLocaleString()}đ</p>
                                            </div>
                                        </div>
                                        <button onClick={() => addItem(p)} className="p-2 bg-primary/10 text-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
                            <label className="block text-sm font-bold text-gray-600 mb-2">2. Chi tiết đơn hàng</label>
                            <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                                <select 
                                    className="w-full border-2 border-cream rounded-xl px-4 py-3 font-semibold focus:border-primary outline-none"
                                    value={form.user_id}
                                    onChange={(e) => setForm({...form, user_id: e.target.value})}
                                    required
                                >
                                    <option value="">-- Chọn khách hàng --</option>
                                    {users.map(u => (
                                        <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>
                                    ))}
                                </select>

                                <div className="bg-white border-2 border-cream rounded-xl p-4 space-y-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-cream pb-2 mb-2">Giỏ hàng</p>
                                    {form.items.length === 0 ? (
                                        <p className="text-sm text-gray-400 italic py-4 text-center">Chưa có sản phẩm nào</p>
                                    ) : (
                                        form.items.map(item => (
                                            <div key={item.product_id} className="flex justify-between items-center text-sm">
                                                <span className="font-bold text-gray-700">{item.name} x {item.quantity}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-primary">{(item.price * item.quantity).toLocaleString()}đ</span>
                                                    <button onClick={() => removeItem(item.product_id)} className="text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <div className="border-t border-cream pt-4 mt-2 flex justify-between items-center px-2">
                                        <span className="text-lg font-fredoka font-bold text-gray-800">Tổng cộng</span>
                                        <span className="text-xl font-fredoka font-bold text-primary">{total.toLocaleString()}đ</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <select 
                                        className="w-full border-2 border-cream rounded-xl px-4 py-2 text-sm font-semibold focus:border-primary outline-none"
                                        value={form.delivery_method}
                                        onChange={(e) => setForm({...form, delivery_method: e.target.value})}
                                    >
                                        <option value="pickup">Nhận tại cửa hàng</option>
                                        <option value="shipping">Giao tận nơi (+30k)</option>
                                    </select>
                                    {form.delivery_method === 'shipping' && (
                                        <Input 
                                            placeholder="Địa chỉ giao hàng" 
                                            value={form.shipping_address} 
                                            onChange={(e) => setForm({...form, shipping_address: e.target.value})} 
                                            required 
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="pt-6 mt-auto">
                                <Button type="submit" className="w-full shadow-secondary/20 shadow-lg !bg-secondary" disabled={loading}>
                                    {loading ? 'Đang tạo...' : 'Hoàn tất đơn hàng'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        );
    };

    return (
        <Card className="p-8 border-none shadow-sm bg-gradient-to-br from-white to-peach/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                        Quản lý nhanh
                    </h3>
                    <p className="text-gray-500 font-semibold mt-1">Sử dụng phím tắt để phục vụ khách hàng ngay lập tức</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => setActiveModal('appointment')}
                        className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl shadow-primary/20 shadow-lg hover:scale-105 transition-transform"
                    >
                        <Calendar className="w-5 h-5" /> Đặt Spa nhanh
                    </button>
                    <button 
                        onClick={() => setActiveModal('order')}
                        className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-white font-bold rounded-2xl shadow-secondary/20 shadow-lg hover:scale-105 transition-transform"
                    >
                        <ShoppingBag className="w-5 h-5" /> Tạo Đơn hàng
                    </button>
                </div>
            </div>

            {activeModal === 'appointment' && <AppointmentModal />}
            {activeModal === 'order' && <OrderModal />}
        </Card>
    );
};

export default AdminQuickActions;
