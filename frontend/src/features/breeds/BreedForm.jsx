import { useState, useEffect } from "react";

export default function BreedForm({ breed = {}, onSave, onClose }) {
    const [form, setForm] = useState({
        id: null,
        name: "",
        display_name: "",
        species: "dog",
        fur_type: "medium",
        size_category: "medium",
        image_url: "",
    });

    useEffect(() => {
        setForm({
            id: breed.id || null,
            name: breed.name || "",
            display_name: breed.display_name || "",
            species: breed.species || "dog",
            fur_type: breed.fur_type || "medium",
            size_category: breed.size_category || "medium",
            image_url: breed.image_url || "",
        });
    }, [breed]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updates = {};
        if (name === "display_name" && !breed.id) {
            updates.name = value.replace(/\s+/g, '_');
        }
        setForm({ ...form, ...updates, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        if (!form.display_name.trim() || !form.name.trim()) return alert("Name/Display Name required");
        onSave(form);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
            <div className="bg-clay-card p-8 w-full max-w-lg rounded-clay shadow-clay-lg animate-squish overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>

                <h2 className="text-3xl font-fredoka font-bold text-primary text-center mb-6">
                    {form.id ? "Edit Breed" : "Add Breed"}
                </h2>

                <form onSubmit={submit} className="flex flex-col gap-4 font-nunito font-semibold">
                    <input
                        name="display_name"
                        placeholder="Display Name (e.g. American Bulldog)"
                        value={form.display_name}
                        onChange={handleChange}
                        className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />

                    <input
                        name="name"
                        placeholder="System Name (e.g. American_Bulldog)"
                        value={form.name}
                        onChange={handleChange}
                        className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-500 text-sm mb-1 block">Species</label>
                            <select name="species" value={form.species} onChange={handleChange} className="w-full p-3 rounded-xl bg-white shadow-clay-inner outline-none">
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-500 text-sm mb-1 block">Fur Type</label>
                            <select name="fur_type" value={form.fur_type} onChange={handleChange} className="w-full p-3 rounded-xl bg-white shadow-clay-inner outline-none">
                                <option value="short">Short</option>
                                <option value="medium">Medium</option>
                                <option value="long">Long</option>
                                <option value="hairless">Hairless</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-500 text-sm mb-1 block">Size Category</label>
                        <select name="size_category" value={form.size_category} onChange={handleChange} className="w-full p-3 rounded-xl bg-white shadow-clay-inner outline-none">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>

                    <input
                        name="image_url"
                        type="text"
                        placeholder="Image URL (optional)"
                        value={form.image_url}
                        onChange={handleChange}
                        className="p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />

                    {form.image_url && (
                        <img
                            src={form.image_url}
                            alt="preview"
                            className="h-32 w-full object-cover rounded-xl border mt-2"
                            onError={(e) => (e.target.style.display = "none")}
                        />
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-gray-500 hover:bg-gray-100 rounded-xl transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-xl shadow-clay-puffy hover:scale-105 transition"
                        >
                            Save Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
