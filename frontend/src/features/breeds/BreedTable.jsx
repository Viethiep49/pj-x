export default function BreedTable({ breeds, onEdit, onDelete }) {
    if (breeds.length === 0) {
        return (
            <div className="text-center py-24 text-gray-400 text-xl">
                No breeds yet. Add a new breed ✨
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {breeds.map((b) => (
                <div
                    key={b.id}
                    className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
                >
                    {/* 🖼 HIỂN THỊ ẢNH */}
                    <img
                        src={b.image_url || "https://via.placeholder.com/300"}
                        alt={b.display_name}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                    />

                    <h2 className="text-2xl font-bold text-primary mb-2 line-clamp-1" title={b.display_name}>{b.display_name}</h2>
                    <p className="text-sm font-semibold text-gray-400 italic mb-4">{b.name}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold uppercase">
                            {b.species}
                        </span>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                            Fur: {b.fur_type}
                        </span>
                        {b.size_category && (
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                                Size: {b.size_category}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => onEdit(b)}
                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-xl font-semibold transition"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(b.id)}
                            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl font-semibold transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
