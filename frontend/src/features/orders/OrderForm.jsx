export default function OrderForm({
  showModal,
  setShowModal,
  form,
  handleChange,
  handleSave,
  error,
  editIndex,
}) {
  const isDisabled =
    !form.id || !form.customer || !form.total || !form.date;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-3xl w-[500px]">
        <h2 className="text-2xl text-center text-orange-500 font-bold mb-6">
          {editIndex !== null ? "Edit Order" : "Add Order"}
        </h2>

        <div className="space-y-4">
          {["id", "customer", "total"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
              className={`input border ${
                !form[field] && error ? "border-red-500" : ""
              }`}
            />
          ))}

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input border"
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`input border ${
              !form.date && error ? "border-red-500" : ""
            }`}
          />
        </div>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={isDisabled}
            onClick={handleSave}
            className={`px-5 py-2 rounded-lg text-white ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
