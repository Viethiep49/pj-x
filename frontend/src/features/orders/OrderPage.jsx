import { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";
import api from "../../services/api";

export default function OrderPage() {
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: "",
    customer: "",
    total: "",
    status: "pending",
    date: "",
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/admin");
      setOrders(res.data.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatVND = (value) =>
    Number(value).toLocaleString("vi-VN") + " đ";

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.status)
      return "Please select a status!";
    return "";
  };

  const handleSave = async () => {
    const msg = validate();
    if (msg) return setError(msg);

    const payload = {
      status: form.status
    };

    try {
      if (editOrder) {
        // Admin currently only updates order status
        await api.put(`/orders/admin/${editOrder.id}`, payload);
      }
      setShowModal(false);
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving order");
    }
  };

  const handleEdit = (order) => {
    setForm({
      id: order.id,
      customer: order.customer?.full_name || order.receiver_name,
      total: order.total_amount,
      status: order.status,
      date: new Date(order.created_at).toISOString().slice(0, 10),
    });

    setEditOrder(order);
    setShowModal(true);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary tracking-tight">
          Order Management
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-24 text-gray-400 font-bold text-lg">Loading orders...</div>
      ) : (
        <OrderTable
          orders={orders}
          onEdit={handleEdit}
        />
      )}

      <OrderForm
        showModal={showModal}
        setShowModal={setShowModal}
        form={form}
        handleChange={handleChange}
        handleSave={handleSave}
        error={error}
        editIndex={editOrder ? 1 : null} // Just for UI logic in OrderForm
      />
    </div>
  );
}
