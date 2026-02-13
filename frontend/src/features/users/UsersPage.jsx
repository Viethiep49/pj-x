import { useState } from "react";

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "Customer",
    status: "Active",
    createdAt: "",
  });

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.id || !form.name || !form.email || !form.createdAt)
      return "Please enter all the information!";

    const isDuplicate = users.some(
      (u, i) => u.id === form.id && i !== editIndex
    );

    if (isDuplicate) return "User ID already exists!";

    return "";
  };

  const handleSave = () => {
    const msg = validate();
    if (msg) return setError(msg);

    const newUser = {
      ...form,
      createdAt: new Date(form.createdAt).toLocaleDateString("vi-VN"),
    };

    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = newUser;
      setUsers(updated);
      setEditIndex(null);
    } else {
      setUsers([...users, newUser]);
    }

    setShowModal(false);
    setForm({
      id: "",
      name: "",
      email: "",
      role: "Customer",
      status: "Active",
      createdAt: "",
    });
  };

  const handleEdit = (index) => {
    setForm({
      ...users[index],
      createdAt: new Date(
        users[index].createdAt.split("/").reverse().join("-")
      )
        .toISOString()
        .slice(0, 10),
    });

    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const roleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-600";
      case "Staff":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  const isDisabled =
    !form.id || !form.name || !form.email || !form.createdAt;

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-orange-500">
          Users Management
        </h1>

        <button
          onClick={() => {
            setForm({
              id: "",
              name: "",
              email: "",
              role: "Customer",
              status: "Active",
              createdAt: "",
            });
            setEditIndex(null);
            setError("");
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-xl"
        >
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-orange-100 text-orange-600">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Created</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-400">
                  No users yet
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-4">{u.id}</td>
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${roleColor(
                        u.role
                      )}`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColor(
                        u.status
                      )}`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">{u.createdAt}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(i)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(i)}
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-8 rounded-3xl w-[500px]">
            <h2 className="text-2xl text-center text-orange-500 font-bold mb-6">
              {editIndex !== null ? "Edit User" : "Add User"}
            </h2>

            <div className="space-y-4">
              {["id", "name", "email"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.toUpperCase()}
                  className="input border"
                />
              ))}

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input border"
              >
                <option>Admin</option>
                <option>Staff</option>
                <option>Customer</option>
              </select>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input border"
              >
                <option>Active</option>
                <option>Banned</option>
              </select>

              <input
                type="date"
                name="createdAt"
                value={form.createdAt}
                onChange={handleChange}
                className="input border"
              />
            </div>

            {error && (
              <p className="text-red-500 mt-3 text-sm">{error}</p>
            )}

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
      )}
    </div>
  );
}
