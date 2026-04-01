import React, { useState, useEffect, useMemo } from 'react';
import { 
    CalendarDays, 
    ShoppingBag, 
    CheckCircle2, 
    XCircle, 
    TrendingUp, 
    Users, 
    Dog, 
    ChevronRight,
    ArrowUpRight,
    AlertCircle,
    Sparkles,
    ChevronDown,
    ChevronUp,
    ChevronLeft
} from 'lucide-react';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import { 
    RevenueChart, 
    ServiceDistribution, 
    OrderStatusChart,
    AIScanTrendChart,
    TopBreedsChart
} from './components/DashboardCharts';
import AdminQuickActions from './components/AdminQuickActions';

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [aiStats, setAiStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('overview');
    const [period, setPeriod] = useState('month');

    // Pagination State
    const [apptPage, setApptPage] = useState(1);
    const [orderPage, setOrderPage] = useState(1);
    const [userPage, setUserPage] = useState(1);
    const [breedPage, setBreedPage] = useState(1);
    const itemsPerPage = 20; // Updated to 20 as per user request

    const fetchData = async () => {
        setLoading(true);
        try {
            const [apptRes, orderRes, userRes, breedRes] = await Promise.all([
                api.get('/appointments/admin'),
                api.get('/orders/admin'),
                api.get('/users'),
                api.get('/breeds'),
            ]);
            setAppointments(apptRes.data.data || []);
            setOrders(orderRes.data.data || []);
            setUsers(userRes.data.data || []);
            setBreeds(breedRes.data.data || []);
            
            // Fetch AI Stats from port 8000 (Python AI Core)
            try {
                const aiRes = await fetch('http://localhost:8000/api/ai/analytics');
                const aiData = await aiRes.json();
                if (aiData.success) setAiStats(aiData.data);
            } catch (aiErr) {
                console.warn("AI Core unreachable:", aiErr);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateApptStatus = async (id, status) => {
        try {
            await api.put(`/appointments/${id}/status`, { status });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            await api.put(`/orders/admin/${id}/status`, { status });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const stats = useMemo(() => {
        const totalRevenue = orders
            .filter(o => o.status !== 'cancelled')
            .reduce((sum, o) => sum + Number(o.total_amount), 0);
        
        const pendingAppts = appointments.filter(a => a.status === 'pending').length;
        const pendingOrders = orders.filter(o => o.status === 'pending').length;

        return {
            totalRevenue,
            pendingAppts,
            pendingOrders,
            totalUsers: new Set(orders.map(o => o.user_id)).size + new Set(appointments.map(a => a.user_id)).size
        };
    }, [appointments, orders]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const STATUS_COLORS = {
        pending: 'bg-amber-100 text-amber-600',
        confirmed: 'bg-emerald-100 text-emerald-600',
        processing: 'bg-blue-100 text-blue-600',
        shipping: 'bg-purple-100 text-purple-600',
        delivered: 'bg-gray-100 text-gray-600',
        completed: 'bg-emerald-100 text-emerald-600',
        cancelled: 'bg-red-100 text-red-600'
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 font-nunito space-y-10 animate-fade-in">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Doanh thu', value: `${stats.totalRevenue.toLocaleString()}đ`, icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Lịch hẹn mới', value: stats.pendingAppts, icon: CalendarDays, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Đơn hàng mới', value: stats.pendingOrders, icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Khách hàng', value: stats.totalUsers, icon: Users, color: 'text-primary', bg: 'bg-peach' }
                ].map((s, i) => (
                    <Card key={i} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                                <h3 className="text-3xl font-fredoka font-bold text-gray-800">{s.value}</h3>
                            </div>
                            <div className={`${s.bg} ${s.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                                <s.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-2 py-1 rounded-lg">
                            <TrendingUp className="w-3 h-3" />
                            <span>+12.5%</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 p-1 bg-cream/30 rounded-2xl w-max overflow-x-auto max-w-full no-scrollbar">
                {[
                    { id: 'overview', label: 'Tổng quan', icon: TrendingUp },
                    { id: 'diagnostics', label: 'Chẩn đoán AI 🧠', icon: Sparkles },
                    { id: 'appointments', label: 'Lịch hẹn', icon: CalendarDays },
                    { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
                    { id: 'users', label: 'Khách hàng', icon: Users },
                    { id: 'breeds', label: 'Giống loài', icon: Dog }
                ].map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                            tab === t.id 
                            ? 'bg-white text-primary shadow-sm scale-[1.02]' 
                            : 'text-gray-500 hover:text-primary hover:bg-white/50'
                        }`}
                    >
                        <t.icon className="w-4 h-4" />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            {tab === 'overview' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                    <AdminQuickActions onActionComplete={fetchData} />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="p-8 border-none shadow-sm">
                            <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-6">Biểu đồ doanh thu</h3>
                            <RevenueChart appointments={appointments} orders={orders} period={period} />
                        </Card>
                        <Card className="p-8 border-none shadow-sm">
                            <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-6">Phân bổ dịch vụ</h3>
                            <ServiceDistribution appointments={appointments} />
                        </Card>
                    </div>
                </div>
            )}

            {tab === 'diagnostics' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    {!aiStats ? (
                        <Card className="p-20 text-center border-none shadow-sm flex flex-col items-center">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-2">AICore Offline</h3>
                            <p className="text-gray-400 font-semibold max-w-md mx-auto italic">
                                Không thể kết nối với trí tuệ nhân tạo. Hãy đảm bảo service Python đã được khởi động trên cổng 8000.
                            </p>
                        </Card>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <Card className="lg:col-span-2 p-8 border-none shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-fredoka font-bold text-gray-800">Xu hướng nhận diện giống loài (7 ngày qua)</h3>
                                        <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full tracking-widest animate-pulse">Live AI Feed</div>
                                    </div>
                                    <AIScanTrendChart data={aiStats.scans.trend} />
                                </Card>
                                <Card className="p-8 border-none shadow-sm">
                                    <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-6">Độ chính xác trung bình</h3>
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <div className="relative w-32 h-32 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-cream" />
                                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" 
                                                    strokeDasharray={364}
                                                    strokeDashoffset={364 - (aiStats.scans.avg_confidence * 364)}
                                                    className="text-primary transition-all duration-1000" />
                                            </svg>
                                            <span className="absolute text-2xl font-fredoka font-bold text-gray-800">
                                                {(aiStats.scans.avg_confidence * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <p className="mt-6 text-sm text-gray-500 font-bold uppercase tracking-widest">AI Confidence Index</p>
                                    </div>
                                </Card>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="p-8 border-none shadow-sm">
                                    <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-6">Top Giống Thú Cưng Được Quét</h3>
                                    <TopBreedsChart data={aiStats.scans.top_breeds} />
                                </Card>
                                <div className="space-y-4">
                                    <Card className="p-6 bg-indigo-600 text-white border-none shadow-lg shadow-indigo-200">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-indigo-100 text-xs font-bold uppercase mb-1">Tổng lượt quét</p>
                                                <h4 className="text-4xl font-fredoka font-bold">{aiStats.scans.total}</h4>
                                            </div>
                                            <Users className="w-10 h-10 opacity-20" />
                                        </div>
                                        <p className="mt-4 text-sm text-indigo-100 italic">Ghi nhận từ {aiStats.scans.unique_users} người dùng khác nhau</p>
                                    </Card>
                                    <Card className="p-6 bg-white border-none shadow-sm">
                                        <h4 className="text-lg font-fredoka font-bold text-gray-800 mb-4">Ghi chú vận hành AI</h4>
                                        <ul className="space-y-3">
                                            {[
                                                'Người dùng Poodle chiếm ưu thế trong các lượt quét.',
                                                'Tỷ lệ chính xác (Confidence) duy trì trên 80%.',
                                                'Cao điểm quét diễn ra vào các ngày cuối tuần.'
                                            ].map((note, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-500 font-semibold italic">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                                    {note}
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {tab === 'appointments' && (
                <div className="space-y-4">
                    <div className="grid gap-3">
                        {appointments.length === 0 ? (
                            <Card className="p-12 text-center text-gray-400 font-bold italic border-2 border-dashed border-cream">Chưa có lịch hẹn nào</Card>
                        ) : appointments.slice((apptPage - 1) * itemsPerPage, apptPage * itemsPerPage).map(appt => (
                            <Card key={appt.id} className="p-5 flex items-center gap-4 hover:shadow-md transition-shadow group">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-fredoka font-bold text-gray-800 group-hover:text-primary transition-colors italic">{appt.customer?.full_name}</span>
                                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[appt.status]}`}>{appt.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-semibold">
                                        🐾 {appt.pet?.name} • <span className="text-gray-400">Dịch vụ:</span> {appt.service?.name || 'Dịch vụ'} • {new Date(appt.appointment_date).toLocaleString('vi-VN')}
                                    </p>
                                    {appt.customer?.phone_number && <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 opacity-70">📞 {appt.customer.phone_number}</p>}
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    {appt.status === 'pending' && (
                                        <>
                                            <button onClick={() => updateApptStatus(appt.id, 'confirmed')} className="flex items-center gap-1 px-4 py-2 bg-green-50 text-green-600 font-bold text-xs rounded-xl hover:bg-green-600 hover:text-white transition-all">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Xác nhận
                                            </button>
                                            <button onClick={() => updateApptStatus(appt.id, 'cancelled')} className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-500 font-bold text-xs rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                                <XCircle className="w-3.5 h-3.5" /> Hủy
                                            </button>
                                        </>
                                    )}
                                    {appt.status === 'confirmed' && (
                                        <button onClick={() => updateApptStatus(appt.id, 'completed')} className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 font-bold text-xs rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn thành
                                        </button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    {appointments.length > itemsPerPage && (
                        <div className="flex items-center justify-center gap-4 pt-4 font-bold text-sm text-gray-500">
                             <button 
                                disabled={apptPage === 1}
                                onClick={() => setApptPage(p => p - 1)}
                                className="p-2 disabled:opacity-30 border-2 border-cream rounded-xl hover:bg-peach transition-colors text-primary"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-gray-800">Trang {apptPage} / {Math.ceil(appointments.length / itemsPerPage)}</span>
                            <button 
                                disabled={apptPage === Math.ceil(appointments.length / itemsPerPage)}
                                onClick={() => setApptPage(p => p + 1)}
                                className="p-2 disabled:opacity-30 border-2 border-cream rounded-xl hover:bg-peach transition-colors text-primary"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {tab === 'orders' && (
                <div className="space-y-4">
                    <div className="grid gap-3">
                        {orders.length === 0 ? (
                            <Card className="p-12 text-center text-gray-400 font-bold italic border-2 border-dashed border-cream">Chưa có đơn hàng nào</Card>
                        ) : orders.slice((orderPage - 1) * itemsPerPage, orderPage * itemsPerPage).map(order => (
                            <Card key={order.id} className="p-5 flex items-center gap-4 hover:shadow-md transition-all group">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-bold text-gray-300 text-xs tracking-tighter">#{order.order_number?.split('-')[1]}</span>
                                        <span className="font-fredoka font-bold text-gray-800 group-hover:text-primary transition-colors italic">{order.customer?.full_name}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-semibold">
                                        💰 {Number(order.total_amount).toLocaleString('vi-VN')} đ • <span className="text-gray-400 italic text-xs">{order.delivery_method === 'shipping' ? '🚚 Giao hàng' : '🏪 Nhận tại shop'}</span>
                                    </p>
                                    <p className="text-[10px] text-gray-300 mt-1 font-bold">{new Date(order.created_at).toLocaleString('vi-VN')}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        className="text-xs font-bold border-2 border-cream rounded-xl px-4 py-2 bg-white cursor-pointer hover:border-peach focus:border-primary focus:ring-0 outline-none transition-colors"
                                    >
                                        {['pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled'].map(s => (
                                            <option key={s} value={s} className="capitalize">{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </Card>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    {orders.length > itemsPerPage && (
                        <div className="flex items-center justify-center gap-4 pt-4 font-bold text-sm text-gray-500">
                             <button 
                                disabled={orderPage === 1}
                                onClick={() => setOrderPage(p => p - 1)}
                                className="p-2 disabled:opacity-30 border-2 border-cream rounded-xl hover:bg-peach transition-colors text-primary"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-gray-800">Trang {orderPage} / {Math.ceil(orders.length / itemsPerPage)}</span>
                            <button 
                                disabled={orderPage === Math.ceil(orders.length / itemsPerPage)}
                                onClick={() => setOrderPage(p => p + 1)}
                                className="p-2 disabled:opacity-30 border-2 border-cream rounded-xl hover:bg-peach transition-colors text-primary"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {tab === 'users' && (
                <div className="space-y-4">
                    <div className="grid gap-3">
                        {users.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage).map(u => (
                            <Card key={u.id} className="p-5 flex items-center gap-4 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-bold">
                                    {u.full_name?.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-fredoka font-bold text-gray-800 italic">{u.full_name}</h4>
                                    <p className="text-xs text-gray-500 font-semibold">{u.email}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Vai trò: {u.role}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button className="px-4 py-2 border-2 border-cream text-xs font-bold rounded-xl hover:bg-peach transition-colors">Chi tiết</button>
                                </div>
                            </Card>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    {users.length > itemsPerPage && (
                        <div className="flex items-center justify-center gap-4 pt-4 font-bold text-sm text-gray-500">
                             <button 
                                disabled={userPage === 1}
                                onClick={() => setUserPage(p => p - 1)}
                                className="p-2 disabled:opacity-30 border-2 border-cream rounded-xl hover:bg-peach transition-colors text-primary"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-gray-800">Trang {userPage} / {Math.ceil(users.length / itemsPerPage)}</span>
                            <button 
                                disabled={userPage === Math.ceil(users.length / itemsPerPage)}
                                onClick={() => setUserPage(p => p + 1)}
                                className="p-2 disabled:opacity-30 border-2 border-cream rounded-xl hover:bg-peach transition-colors text-primary"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {tab === 'breeds' && (
                <div className="space-y-4">
                    <div className="grid gap-3">
                        {breeds.slice((breedPage - 1) * itemsPerPage, breedPage * itemsPerPage).map(b => (
                            <Card key={b.id} className="p-5 flex items-center gap-4 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <Dog className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-fredoka font-bold text-gray-800 italic">{b.display_name}</h4>
                                    <p className="text-xs text-gray-300 font-bold italic">{b.breed_name}</p>
                                </div>
                                <div className="px-4 py-2 bg-cream/50 text-xs font-bold rounded-xl">ID: {b.id}</div>
                            </Card>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    {breeds.length > itemsPerPage && (
                        <div className="flex items-center justify-center gap-4 pt-4 font-bold text-sm text-gray-500">
                             <button 
                                disabled={breedPage === 1}
                                onClick={() => setBreedPage(p => p - 1)}
                                className="p-2 disabled:opacity-30 border-2 border-cream rounded-xl hover:bg-peach transition-colors text-primary"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-gray-800">Trang {breedPage} / {Math.ceil(breeds.length / itemsPerPage)}</span>
                            <button 
                                disabled={breedPage === Math.ceil(breeds.length / itemsPerPage)}
                                onClick={() => setBreedPage(p => p + 1)}
                                className="p-2 disabled:opacity-30 border-2 border-cream rounded-xl hover:bg-peach transition-colors text-primary"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
