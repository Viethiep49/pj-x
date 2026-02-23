import React, { useState, useEffect } from 'react';
import { CalendarDays, ShoppingBag, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import Card from '../../components/ui/Card';

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('appointments');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [apptRes, orderRes] = await Promise.all([
                api.get('/appointments/admin'),
                api.get('/orders/admin'),
            ]);
            setAppointments(apptRes.data.data);
            setOrders(orderRes.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const updateApptStatus = async (id, status) => {
        await api.put(`/appointments/admin/${id}`, { status });
        fetchData();
    };

    const updateOrderStatus = async (id, status) => {
        await api.put(`/orders/admin/${id}`, { status });
        fetchData();
    };

    const STATUS_COLORS = {
        pending: 'bg-amber-100 text-amber-700',
        confirmed: 'bg-green-100 text-green-700',
        completed: 'bg-blue-100  text-blue-700',
        cancelled: 'bg-red-100   text-red-700',
        processing: 'bg-indigo-100 text-indigo-700',
        shipping: 'bg-cyan-100  text-cyan-700',
        delivered: 'bg-green-100 text-green-700',
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-fredoka font-bold text-gray-800">Admin Dashboard 🐾</h1>
                <p className="text-gray-500 font-semibold mt-1">Manage appointments and orders</p>
            </div>

            {/* Tab bar */}
            <div className="flex gap-3 mb-8">
                {[
                    { key: 'appointments', label: 'Appointments', icon: CalendarDays, count: appointments.length },
                    { key: 'orders', label: 'Orders', icon: ShoppingBag, count: orders.length },
                ].map(({ key, label, icon: Icon, count }) => (
                    <button
                        key={key}
                        onClick={() => setTab(key)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${tab === key
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-cream text-gray-600 hover:bg-peach'
                            }`}
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${tab === key ? 'bg-white/20' : 'bg-white'}`}>
                            {count}
                        </span>
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-20 font-bold text-gray-400">Loading...</div>
            ) : tab === 'appointments' ? (
                <div className="grid gap-3">
                    {appointments.length === 0 ? (
                        <Card className="p-12 text-center text-gray-400 font-bold">No appointments yet</Card>
                    ) : appointments.map(appt => (
                        <Card key={appt.id} className="p-5 flex items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-fredoka font-bold text-gray-800">{appt.customer?.full_name}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${STATUS_COLORS[appt.status]}`}>{appt.status}</span>
                                </div>
                                <p className="text-sm text-gray-500 font-semibold">
                                    🐾 {appt.pet?.name} • {appt.service?.name || 'Service'} • {new Date(appt.appointment_date).toLocaleString('vi-VN')}
                                </p>
                                {appt.customer?.phone_number && <p className="text-xs text-gray-400 mt-0.5">📞 {appt.customer.phone_number}</p>}
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                {appt.status === 'pending' && (
                                    <>
                                        <button onClick={() => updateApptStatus(appt.id, 'confirmed')} className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-600 font-bold text-sm rounded-xl hover:bg-green-100">
                                            <CheckCircle2 className="w-4 h-4" /> Confirm
                                        </button>
                                        <button onClick={() => updateApptStatus(appt.id, 'cancelled')} className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-500 font-bold text-sm rounded-xl hover:bg-red-100">
                                            <XCircle className="w-4 h-4" /> Cancel
                                        </button>
                                    </>
                                )}
                                {appt.status === 'confirmed' && (
                                    <button onClick={() => updateApptStatus(appt.id, 'completed')} className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-100">
                                        <CheckCircle2 className="w-4 h-4" /> Complete
                                    </button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid gap-3">
                    {orders.length === 0 ? (
                        <Card className="p-12 text-center text-gray-400 font-bold">No orders yet</Card>
                    ) : orders.map(order => (
                        <Card key={order.id} className="p-5 flex items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-bold text-gray-600 text-sm">#{order.order_number}</span>
                                    <span className="font-fredoka font-bold text-gray-800">{order.customer?.full_name}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                                </div>
                                <p className="text-sm text-gray-500 font-semibold">
                                    💰 {Number(order.total_amount).toLocaleString('vi-VN')} đ • {order.delivery_method === 'shipping' ? '🚚 Shipping' : '🏪 Pickup'}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">{new Date(order.created_at).toLocaleString('vi-VN')}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    className="text-sm font-bold border-2 border-cream rounded-xl px-3 py-2 bg-white"
                                >
                                    {['pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled'].map(s => (
                                        <option key={s} value={s} className="capitalize">{s}</option>
                                    ))}
                                </select>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
