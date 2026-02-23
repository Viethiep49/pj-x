import { useState, useEffect } from "react";
import api from "../../services/api";

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: "",
    email: "",
    full_name: "",
    role: "customer",
    is_active: "Active",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.full_name || !form.email)
      return "Please enter all required information!";
    return "";
  };

  const handleSave = async () => {
    const msg = validate();
    if (msg) return setError(msg);

    const payload = {
      full_name: form.full_name,
      email: form.email,
      role: form.role,
      is_active: form.is_active === "Active",
    };

    try {
      if (editUser) {
        // Update user
        await api.put(`/users/${editUser.id}`, payload);
      } else {
        // Add new user
        await api.post("/users", payload);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving user");
    }
  };

  const handleEdit = (user) => {
    setForm({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      is_active: user.is_active ? "Active" : "Banned",
    });

    setEditUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting user");
    }
  };

  const roleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-600";
      case "staff":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statusColor = (isActive) => {
    return isActive
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  const isDisabled = !form.full_name || !form.email;

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary tracking-tight">
          Users Management
        </h1>

        <button
          onClick={() => {
            setForm({
              id: "",
              email: "",
              full_name: "",
              role: "customer",
              is_active: "Active",
            });
            setEditUser(null);
            setError("");
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition font-semibold"
        >
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-orange-50 text-orange-600 font-bold border-b border-orange-100">
            <tr>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Created At</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-12 text-gray-400 text-lg font-semibold">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-12 text-gray-400 text-lg font-semibold">
                  No users yet.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-t border-gray-100 hover:bg-orange-50/50 transition duration-150">
                  <td className="p-4 font-medium text-gray-700">{u.email}</td>
                  <td className="p-4 text-gray-600">{u.full_name}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${roleColor(
                        u.role
                      )}`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColor(
                        u.is_active
                      )}`}
                    >
                      {u.is_active ? "Active" : "Banned"}
                    </span>
                  </td>

                  <td className="p-4 text-center text-gray-500">
                    {new Date(u.created_at).toLocaleDateString("vi-VN")}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(u)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-xl transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(u.id)}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-xl transition"
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-clay-card p-8 rounded-clay shadow-clay-lg w-[500px] animate-squish" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl text-center text-primary font-fredoka font-bold mb-6">
              {editUser ? "Edit User" : "Add User"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-sm mb-1 block font-semibold">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  className="w-full p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40 font-nunito"
                  disabled={!!editUser} // Usually email can't be changed easily 
                />
              </div>

              <div>
                <label className="text-gray-500 text-sm mb-1 block font-semibold">Full Name</label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 rounded-xl bg-white shadow-clay-inner focus:outline-none focus:ring-2 focus:ring-primary/40 font-nunito"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 text-sm mb-1 block font-semibold">Role</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-white shadow-clay-inner outline-none font-nunito"
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-500 text-sm mb-1 block font-semibold">Status</label>
                  <select
                    name="is_active"
                    value={form.is_active}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-white shadow-clay-inner outline-none font-nunito"
                  >
                    <option value="Active">Active</option>
                    <option value="Banned">Banned</option>
                  </select>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-500 mt-4 text-center font-semibold bg-red-50 p-2 rounded-lg">{error}</p>
            )}

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
                {editUser ? "Update Details" : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
