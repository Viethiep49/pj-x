import React, { useState, useEffect } from 'react';
import { PawPrint, Plus, Pencil, Trash2, X } from 'lucide-react';
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
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-fredoka font-bold text-gray-800">Thú Cưng Của Tôi 🐾</h1>
                    <p className="text-gray-500 font-semibold mt-1">Quản lý các bé thú cưng của bạn</p>
                </div>
                <Button onClick={() => { setEditingPet(null); setShowForm(true); }} className="flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Thêm thú cưng
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400 font-bold">Đang tải dữ liệu...</div>
            ) : pets.length === 0 ? (
                <Card className="p-16 text-center">
                    <PawPrint className="w-16 h-16 text-cream mx-auto mb-4" />
                    <h3 className="text-2xl font-fredoka font-bold text-gray-600 mb-2">Chưa có thú cưng nào!</h3>
                    <p className="text-gray-400 font-semibold mb-6">Thêm thú cưng đầu tiên của bạn để bắt đầu nhé</p>
                    <Button onClick={() => setShowForm(true)}>Thêm thú cưng</Button>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {pets.map(pet => (
                        <Card key={pet.id} className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-cream">
                                {pet.image_url ? (
                                    <img src={pet.image_url} alt={pet.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl">{pet.species === 'dog' ? '🐶' : '🐱'}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-fredoka font-bold text-gray-800">{pet.name}</h3>
                                <div className="flex flex-wrap gap-2 text-sm font-bold text-gray-500 mt-2">
                                    <span className="capitalize px-2 py-1 bg-cream/50 rounded-md">
                                        {pet.species === 'dog' ? 'Chó' : 'Mèo'}
                                    </span>
                                    {pet.breed && <span className="px-2 py-1 bg-cream/50 rounded-md">Giống: {pet.breed}</span>}
                                    {pet.age && <span className="px-2 py-1 bg-cream/50 rounded-md">{pet.age} tuổi</span>}
                                    {pet.weight && <span className="px-2 py-1 bg-cream/50 rounded-md">{pet.weight} kg</span>}
                                    {pet.gender && <span className="px-2 py-1 bg-cream/50 rounded-md capitalize">
                                        {pet.gender === 'male' ? 'Đực' : 'Cái'}
                                    </span>}
                                </div>
                                {pet.medical_history && (
                                    <div className="mt-3 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">
                                        <span className="font-bold">Lịch sử y tế/Ghi chú: </span>
                                        {pet.medical_history}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0 justify-end">
                                <button onClick={() => { setEditingPet(pet); setShowForm(true); }} className="p-3 hover:bg-cream rounded-xl transition-colors bg-white shadow-sm border border-gray-100">
                                    <Pencil className="w-5 h-5 text-gray-500" />
                                </button>
                                <button onClick={() => handleDelete(pet.id)} className="p-3 hover:bg-red-50 rounded-xl transition-colors bg-white shadow-sm border border-gray-100">
                                    <Trash2 className="w-5 h-5 text-red-500" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

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
