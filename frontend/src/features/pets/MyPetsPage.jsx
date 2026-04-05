import React, { useState, useEffect } from 'react';
import { PawPrint, Plus, Pencil, Trash2, X, Sparkles, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const PetForm = ({ pet, onSave, onClose }) => {
    const [form, setForm] = useState({
        name: pet?.name || '',
        species: pet?.species || 'dog',
        breed: pet?.breed || '',
        age: pet?.age || '',
        weight: pet?.weight || '',
        gender: pet?.gender || 'male',
        fur_length: pet?.fur_length || 'short',
        medical_history: pet?.medical_history || '',
        image_url: pet?.image_url || '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (pet?.id) {
                await api.put(`/pets/${pet.id}`, form);
            } else {
                await api.post('/pets', form);
            }
            onSave();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving pet');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <Card className="w-full max-w-lg p-8 h-max max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-fredoka font-bold text-gray-800">{pet?.id ? 'Chỉnh sửa thú cưng' : 'Thêm thú cưng mới'} 🐾</h3>
                    <button onClick={onClose} className="p-2 hover:bg-cream rounded-full"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <Input label="Tên thú cưng" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Loài</label>
                        <select className="w-full border-2 border-cream rounded-clay px-4 py-3 font-semibold" value={form.species} onChange={e => setForm({ ...form, species: e.target.value })}>
                            <option value="dog">🐶 Chó</option>
                            <option value="cat">🐱 Mèo</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Giới tính</label>
                        <select className="w-full border-2 border-cream rounded-clay px-4 py-3 font-semibold" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                            <option value="male">Đực</option>
                            <option value="female">Cái</option>
                        </select>
                    </div>
                    <Input label="Giống" value={form.breed} onChange={e => setForm({ ...form, breed: e.target.value })} />
                    <Input label="Tuổi (năm)" type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
                    <Input label="Cân nặng (kg)" type="number" step="0.1" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} />
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Độ dài lông</label>
                        <select className="w-full border-2 border-cream rounded-clay px-4 py-3 font-semibold" value={form.fur_length} onChange={e => setForm({ ...form, fur_length: e.target.value })}>
                            <option value="short">Ngắn</option>
                            <option value="medium">Trung bình</option>
                            <option value="long">Dài</option>
                            <option value="hairless">Không lông</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <Input label="Link ảnh (image URL)" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-600 mb-2">Lịch sử bệnh lý / Y tế</label>
                        <textarea className="w-full border-2 border-cream rounded-clay px-4 py-3 font-semibold resize-none" rows={3} value={form.medical_history} onChange={e => setForm({ ...form, medical_history: e.target.value })} placeholder="Dị ứng, bệnh lý nền..." />
                    </div>
                    <div className="col-span-2 flex gap-3 mt-2">
                        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Hủy</Button>
                        <Button type="submit" className="flex-[2]" disabled={loading}>{loading ? 'Đang lưu...' : 'Lưu thông tin'}</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

const PetRecommendations = ({ breedName, petName }) => {
    const [recs, setRecs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const fetchRecs = async () => {
        if (!breedName || recs) {
            setExpanded(!expanded);
            return;
        }
        setLoading(true);
        setExpanded(true);
        try {
            const res = await api.get(`/ai/recommendations?breedName=${encodeURIComponent(breedName)}`);
            if (res.data.success) {
                setRecs(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch recs:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!breedName) return null;

    return (
        <div className="mt-4 border-t border-cream/50 pt-4">
            <button 
                onClick={fetchRecs}
                className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
                <Sparkles className="w-4 h-4 fill-primary/20" />
                {expanded ? 'Ẩn gợi ý thông minh' : `Xem gợi ý từ AI cho ${petName}`}
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expanded && (
                <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                    {loading ? (
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold italic py-2">
                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            Đang phân tích giống loài...
                        </div>
                    ) : recs ? (
                        <div className="space-y-4">
                            {recs.products?.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sản phẩm khuyên dùng</p>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                        {recs.products.map(p => (
                                            <a key={p.id} href={`/shop?search=${p.name}`} className="flex-shrink-0 w-32 group">
                                                <div className="aspect-square rounded-xl bg-cream/30 overflow-hidden mb-2 border border-cream/50 group-hover:border-primary/30 transition-colors">
                                                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                                </div>
                                                <p className="text-[11px] font-bold text-gray-700 line-clamp-1">{p.name}</p>
                                                <p className="text-[10px] text-primary font-bold">{Number(p.price).toLocaleString()}đ</p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {(recs.services?.length > 0 || recs.suggested_products?.length > 0) && (
                                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">💡 Lời khuyên cho {recs.breed?.display_name || breedName}</p>
                                    <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                                        {recs.products?.[0]?.recommendation_reason || 
                                         recs.suggested_products?.[0]?.recommendation_reason ||
                                         `Giống ${breedName} cần được chú trọng dinh dưỡng và chăm sóc lông định kỳ. Xem các dịch vụ Spa của chúng tôi!`}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400 italic">Không tìm thấy gợi ý cụ thể cho giống này.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const MyPetsPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPet, setEditingPet] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchPets = async () => {
        try {
            setLoading(true);
            const res = await api.get('/pets');
            setPets(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPets(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Bạn có chắc chắn muốn xóa thú cưng này không?')) return;
        await api.delete(`/pets/${id}`);
        fetchPets();
    };

    const handleSaved = () => {
        setShowForm(false);
        setEditingPet(null);
        fetchPets();
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <Card className="min-h-[70vh] p-8 md:p-14 border-none shadow-clay-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-fredoka font-bold text-gray-800">Thú Cưng Của Tôi 🐾</h1>
                        <p className="text-gray-500 font-semibold mt-2">Quản lý và chăm sóc các bé yêu của bạn</p>
                    </div>
                    <Button onClick={() => { setEditingPet(null); setShowForm(true); }} className="flex items-center gap-2 px-8 py-4 text-lg">
                        <Plus className="w-6 h-6" /> Thêm thú cưng
                    </Button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-gray-400 font-bold gap-4">
                         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                         Đang tải danh sách...
                    </div>
                ) : pets.length === 0 ? (
                    <div className="py-20 text-center bg-cream/10 rounded-clay border-2 border-dashed border-cream">
                        <PawPrint className="w-20 h-20 text-cream mx-auto mb-6" />
                        <h3 className="text-2xl font-fredoka font-bold text-gray-600 mb-2">Chưa có thú cưng nào!</h3>
                        <p className="text-gray-400 font-semibold mb-8">Hãy thêm thú cưng đầu tiên để nhận được các gợi ý thông minh từ AI nhé</p>
                        <Button onClick={() => setShowForm(true)} className="px-10">Thêm thú cưng ngay</Button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {pets.map(pet => (
                            <Card key={pet.id} className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8 bg-cream/5 hover:bg-white border-2 border-transparent hover:border-cream transition-all group">
                                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center flex-shrink-0 overflow-hidden border-4 border-white shadow-sm group-hover:scale-105 transition-transform">
                                    {pet.image_url ? (
                                        <img src={pet.image_url} alt={pet.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-5xl">{pet.species === 'dog' ? '🐶' : '🐱'}</span>
                                    )}
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-3xl font-fredoka font-bold text-gray-800">{pet.name}</h3>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingPet(pet); setShowForm(true); }} className="p-3 hover:bg-cream rounded-xl transition-colors bg-white shadow-sm border border-cream/50 text-gray-500 hover:text-primary">
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(pet.id)} className="p-3 hover:bg-red-50 rounded-xl transition-colors bg-white shadow-sm border border-cream/50 text-gray-400 hover:text-red-500">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm font-bold text-gray-500 mt-3">
                                        <span className="capitalize px-3 py-1.5 bg-white rounded-full shadow-sm">
                                            {pet.species === 'dog' ? '🐶 Chó' : '🐱 Mèo'}
                                        </span>
                                        {pet.breed && <span className="px-3 py-1.5 bg-white rounded-full shadow-sm">Giống: {pet.breed}</span>}
                                        {pet.age && <span className="px-3 py-1.5 bg-white rounded-full shadow-sm">{pet.age} tuổi</span>}
                                        {pet.weight && <span className="px-3 py-1.5 bg-white rounded-full shadow-sm">{pet.weight} kg</span>}
                                        {pet.gender && <span className="px-3 py-1.5 bg-white rounded-full shadow-sm capitalize">
                                            {pet.gender === 'male' ? 'Đực' : 'Cái'}
                                        </span>}
                                    </div>
                                    {pet.medical_history && (
                                        <div className="mt-4 text-sm text-amber-700 bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 italic flex gap-3">
                                            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500" />
                                            <div>
                                                <span className="font-bold block not-italic text-xs uppercase tracking-widest mb-1">Ghi chú y tế</span>
                                                {pet.medical_history}
                                            </div>
                                        </div>
                                    )}
                                    <PetRecommendations breedName={pet.breed} petName={pet.name} />
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Card>

            {showForm && (
                <PetForm
                    pet={editingPet}
                    onSave={handleSaved}
                    onClose={() => { setShowForm(false); setEditingPet(null); }}
                />
            )}
        </div>
    );
};

export default MyPetsPage;
