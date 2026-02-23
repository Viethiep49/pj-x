import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookingStep, setBookingStep] = useState(1);
  const [services, setServices] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data.data)).catch(console.error);
    api.get('/pets').then(r => setPets(r.data.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      api.get(`/appointments/slots?date=${selectedDate}`)
        .then(r => setAvailableSlots(r.data.data))
        .catch(() => setAvailableSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']));
    }
  }, [selectedDate]);

  const handleConfirm = async () => {
    if (!selectedService || !selectedPet || !selectedDate || !selectedSlot) {
      alert('Vui lòng hoàn thành tất cả các bước');
      return;
    }
    setLoading(true);
    try {
      const appointment_date = `${selectedDate}T${selectedSlot}:00`;
      await api.post('/appointments', {
        pet_id: selectedPet.id,
        service_id: selectedService.id,
        appointment_date,
        notes,
      });
      setDone(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Đặt lịch thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <section className="py-32 min-h-screen bg-clay-background font-nunito flex items-center justify-center">
        <Card className="p-16 max-w-md text-center">
          <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-fredoka font-bold text-gray-800 mb-3">Đặt lịch thành công! 🐾</h2>
          <p className="text-gray-500 font-semibold mb-8">
            Chúng tôi sẽ đón <strong>{selectedPet?.name}</strong> vào ngày <strong>{selectedDate}</strong> lúc <strong>{selectedSlot}</strong>
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate('/my-bookings')}>Xem lịch đặt</Button>
            <Button className="flex-1" onClick={() => { setDone(false); setBookingStep(1); }}>Đặt lịch mới</Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="py-32 relative bg-clay-background min-h-screen font-nunito">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="p-12 overflow-hidden relative">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-cream">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(bookingStep / 3) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>

          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-fredoka font-bold text-gray-800">Đặt lịch Dịch Vụ</h2>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-1 rounded-full text-sm">
                  <Lock className="w-4 h-4" /> Bảo mật và Nhanh chóng
                </div>
                <p className="text-gray-400 font-bold">Bước {bookingStep} trên 3</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1 — Choose Service */}
              {bookingStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-3xl font-fredoka font-bold text-center">Chọn dịch vụ</h3>
                  <div className="grid gap-4">
                    {services.length === 0 ? (
                      <p className="text-center text-gray-400 font-semibold py-8">Đang tải dịch vụ...</p>
                    ) : services.map(svc => (
                      <div
                        key={svc.id}
                        onClick={() => { setSelectedService(svc); setBookingStep(2); }}
                        className={`p-6 rounded-clay border-2 cursor-pointer transition-all ${selectedService?.id === svc.id ? 'border-primary bg-primary/5' : 'border-cream hover:border-peach'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-xl font-bold text-gray-700">{svc.name}</span>
                            {svc.description && <p className="text-sm text-gray-400 font-semibold mt-1">{svc.description}</p>}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{Number(svc.price).toLocaleString('vi-VN')} đ</p>
                            {svc.duration_minutes && <p className="text-xs text-gray-400">{svc.duration_minutes} phút</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — Choose Pet */}
              {bookingStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-3xl font-fredoka font-bold text-center">Chọn thú cưng</h3>
                  <div className="grid gap-4">
                    {pets.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400 font-semibold mb-4">Chưa có thú cưng nào. Hãy thêm thú cưng trước!</p>
                        <Button variant="outline" onClick={() => navigate('/my-pets')}>Thêm thú cưng</Button>
                      </div>
                    ) : pets.map(pet => (
                      <div
                        key={pet.id}
                        onClick={() => setSelectedPet(pet)}
                        className={`p-5 rounded-clay border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedPet?.id === pet.id ? 'border-primary bg-primary/5' : 'border-cream hover:border-peach'
                          }`}
                      >
                        <span className="text-3xl">{pet.species === 'dog' ? '🐶' : '🐱'}</span>
                        <div>
                          <p className="font-bold text-gray-700 text-lg">{pet.name}</p>
                          <p className="text-sm text-gray-400 font-semibold capitalize">{pet.species}{pet.breed ? ` • ${pet.breed}` : ''}</p>
                        </div>
                        {selectedPet?.id === pet.id && <CheckCircle2 className="w-6 h-6 text-primary ml-auto" />}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={() => setBookingStep(1)}>Quay lại</Button>
                    <Button className="flex-[2]" onClick={() => setBookingStep(3)} disabled={!selectedPet}>Tiếp tục</Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Pick Date & Time */}
              {bookingStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-3xl font-fredoka font-bold text-center">Chọn ngày giờ</h3>
                  <div className="grid gap-6">
                    <Input label="Ngày ưu tiên" type="date" value={selectedDate}
                      onChange={e => { setSelectedDate(e.target.value); setSelectedSlot(''); }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {availableSlots.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {availableSlots.map(t => (
                          <div
                            key={t}
                            onClick={() => setSelectedSlot(t)}
                            className={`p-3 text-center rounded-clay font-bold cursor-pointer transition-all border-2 ${selectedSlot === t ? 'bg-primary text-white border-primary' : 'bg-cream border-cream hover:border-peach'
                              }`}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-2">Ghi chú (tuỳ chọn)</label>
                      <textarea
                        className="w-full border-2 border-cream rounded-clay px-4 py-3 font-semibold resize-none"
                        rows={2}
                        placeholder="Yêu cầu đặc biệt..."
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={() => setBookingStep(2)}>Quay lại</Button>
                    <Button className="flex-[2]" onClick={handleConfirm} disabled={!selectedDate || !selectedSlot || loading}>
                      {loading ? 'Đang xác nhận...' : 'Xác nhận Đặt lịch 🐾'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-center gap-8 text-gray-400 text-sm font-bold pt-8 border-t border-black/5">
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" />Thanh toán sau</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" />Xác nhận tức thì</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BookingPage;