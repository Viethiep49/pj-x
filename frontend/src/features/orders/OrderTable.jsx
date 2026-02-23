export default function OrderTable({ orders, onEdit, onDelete }) {
  const statusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "shipping":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-orange-100 text-orange-600">
          <tr>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Date</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-400">
                No orders yet
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id} className="border-t hover:bg-orange-50/50 transition duration-150">
                <td className="p-4 font-mono text-gray-600">{o.order_number}</td>
                <td className="p-4 font-medium text-gray-700">{o.customer?.full_name || o.receiver_name || "Unknown"}</td>
                <td className="p-4 text-green-600 font-bold">
                  {Number(o.total_amount).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColor(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </td>

                <td className="p-4 text-center text-gray-500">
                  {new Date(o.created_at).toLocaleDateString("vi-VN")}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(o)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-xl transition"
                    >
                      Update Status
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
