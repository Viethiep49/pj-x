export default function OrderForm({
  showModal,
  setShowModal,
  form,
  handleChange,
  handleSave,
  error,
}) {
  const isDisabled = !form.status;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={() => setShowModal(false)}>
      <div className="bg-clay-card p-8 rounded-clay w-[500px] shadow-clay-lg animate-squish" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl text-center text-primary font-fredoka font-bold mb-6">
          Update Order Status
        </h2>

        <div className="space-y-4 font-nunito font-semibold">
          <div>
            <label className="text-gray-500 text-sm mb-1 block">Customer</label>
            <input
              value={form.customer}
              disabled
              className="w-full p-3 rounded-xl bg-gray-100 shadow-inner text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-gray-500 text-sm mb-1 block">Total Amount</label>
            <input
              value={Number(form.total).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              disabled
              className="w-full p-3 rounded-xl bg-gray-100 shadow-inner text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-gray-500 text-sm mb-1 block font-bold text-gray-700">Order Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipping">Shipping</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4 text-center font-semibold bg-red-50 p-2 rounded-lg">{error}</p>}

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl font-semibold transition"
          >
            Cancel
          </button>

          <button
            disabled={isDisabled}
            onClick={handleSave}
            className={`px-8 py-3 rounded-xl text-white font-semibold transition ${isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary shadow-clay-puffy hover:scale-105"
              }`}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
