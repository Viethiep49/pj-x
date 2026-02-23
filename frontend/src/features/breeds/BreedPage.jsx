import { useState, useEffect } from "react";
import BreedTable from "./BreedTable";
import BreedForm from "./BreedForm";
import api from "../../services/api";

export default function BreedPage() {
    const [breeds, setBreeds] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBreeds = async () => {
        try {
            setLoading(true);
            const res = await api.get('/breeds');
            setBreeds(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBreeds();
    }, []);

    const addOrUpdate = async (breed) => {
        try {
            if (breed.id) {
                await api.put(`/breeds/${breed.id}`, breed);
            } else {
                await api.post('/breeds', breed);
            }
            fetchBreeds();
            setEditing(null);
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving breed');
        }
    };

    const deleteBreed = async (id) => {
        if (!confirm('Are you sure you want to delete this breed?')) return;
        try {
            await api.delete(`/breeds/${id}`);
            fetchBreeds();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting breed');
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-primary tracking-tight">
                    Breed Management
                </h1>

                <button
                    onClick={() => setEditing({})}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition font-semibold"
                >
                    + Add Breed
                </button>
            </div>

            {loading ? (
                <div className="text-center py-24 text-gray-400 font-bold">Loading breeds...</div>
            ) : (
                <BreedTable
                    breeds={breeds}
                    onEdit={(breed) => setEditing(breed)}
                    onDelete={deleteBreed}
                />
            )}

            {editing && (
                <BreedForm
                    breed={editing}
                    onSave={addOrUpdate}
                    onClose={() => setEditing(null)}
                />
            )}
        </div>
    );
}
