import { useState } from "react";
import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";

export default function OrderPage() {
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: "",
    customer: "",
    total: "",
    status: "Pending",
    date: "",
  });

  const formatVND = (value) =>
    Number(value).toLocaleString("vi-VN") + " đ";

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.id || !form.customer || !form.total || !form.date)
      return "Please enter all the information!";

    if (Number(form.total) <= 0 || isNaN(form.total))
      return "Total must be greater than 0";

    const isDuplicate = orders.some(
      (o, i) => o.id === form.id && i !== editIndex
    );

    if (isDuplicate) return "Order ID already exists!";

    return "";
  };

  const handleSave = () => {
    const msg = validate();
    if (msg) return setError(msg);

    const newOrder = {
      ...form,
      total: formatVND(form.total),
      date: new Date(form.date).toLocaleDateString("vi-VN"),
    };

    if (editIndex !== null) {
      const updated = [...orders];
      updated[editIndex] = newOrder;
      setOrders(updated);
      setEditIndex(null);
    } else {
      setOrders([...orders, newOrder]);
    }

    setShowModal(false);
    setForm({
      id: "",
      customer: "",
      total: "",
      status: "Pending",
      date: "",
    });
  };

  const handleEdit = (index) => {
    const rawTotal = orders[index].total.replace(/\D/g, "");

    setForm({
      ...orders[index],
      total: rawTotal,
      date: new Date(
        orders[index].date.split("/").reverse().join("-")
      )
        .toISOString()
        .slice(0, 10),
    });

    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-orange-500">
          Order Management
        </h1>

        <button
          onClick={() => {
            setForm({
              id: "",
              customer: "",
              total: "",
              status: "Pending",
              date: "",
            });
            setEditIndex(null);
            setError("");
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-xl"
        >
          + Add Order
        </button>
      </div>

      <OrderTable
        orders={orders}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <OrderForm
        showModal={showModal}
        setShowModal={setShowModal}
        form={form}
        handleChange={handleChange}
        handleSave={handleSave}
        error={error}
        editIndex={editIndex}
      />
    </div>
  );
}
