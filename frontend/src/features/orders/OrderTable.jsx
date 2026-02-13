export default function OrderTable({ orders, onEdit, onDelete }) {
  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-orange-100 text-orange-600";
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
            orders.map((o, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4">{o.id}</td>
                <td className="p-4">{o.customer}</td>
                <td className="p-4">{o.total}</td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusColor(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </td>

                <td className="p-4 text-center">{o.date}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(i)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(i)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
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
