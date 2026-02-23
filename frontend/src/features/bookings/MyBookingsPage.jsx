import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import Card from '../../components/ui/Card';

const STATUS_CONFIG = {
    pending: { label: 'Chờ xác nhận', icon: AlertCircle, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    confirmed: { label: 'Đã xác nhận', icon: CheckCircle2, color: 'text-green-600 bg-green-50 border-green-200' },
    completed: { label: 'Đã hoàn thành', icon: CheckCircle2, color: 'text-blue-600  bg-blue-50  border-blue-200' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'text-red-400   bg-red-50   border-red-200' },
};

const MyBookingsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/appointments')
            .then(res => setAppointments(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const formatDate = (d) => {
        const date = new Date(d);
        return {
            date: date.toLocaleDateString('vi-VN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }),
            time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="mb-8">
                <h1 className="text-4xl font-fredoka font-bold text-gray-800">Lịch Đặt Của Tôi 📅</h1>
                <p className="text-gray-500 font-semibold mt-1">Lịch sử và các lịch hẹn chăm sóc thú cưng sắp tới</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400 font-bold">Đang tải dữ liệu...</div>
            ) : appointments.length === 0 ? (
                <Card className="p-16 text-center">
                    <CalendarDays className="w-16 h-16 text-cream mx-auto mb-4" />
                    <h3 className="text-2xl font-fredoka font-bold text-gray-600 mb-2">Chưa có lịch đặt nào</h3>
                    <p className="text-gray-400 font-semibold">Hãy đặt lịch chăm sóc cho thú cưng của bạn nhé!</p>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {appointments.map(appt => {
                        const { date, time } = formatDate(appt.appointment_date);
                        const status = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending;
                        const StatusIcon = status.icon;

                        return (
                            <Card key={appt.id} className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <CalendarDays className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-fredoka font-bold text-gray-800 text-lg">
                                                    {appt.service?.name || 'Gói Dịch Vụ Spa'}
                                                </h3>
                                                <p className="text-gray-500 font-semibold text-sm">
                                                    🐾 {appt.pet?.name} ({appt.pet?.species})
                                                </p>
                                            </div>
                                            <span className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${status.color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 mt-3 text-sm font-semibold text-gray-500">
                                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" />{date}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{time}</span>
                                            {appt.service?.price && <span>💰 {Number(appt.service.price).toLocaleString('vi-VN')} đ</span>}
                                        </div>
                                        {appt.notes && <p className="mt-2 text-sm text-gray-400 italic">"{appt.notes}"</p>}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;
