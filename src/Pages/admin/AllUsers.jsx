import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const roles = ["admin", "agent", "customer"];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      setLoading(true);
      await API.patch("/auth/change-role", { userId, newRole });
      await fetchUsers();
    } catch (err) {
      console.error("Failed to update role:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((user) => user.role === roleFilter);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">👥 All Users</h1>

      {/* Role Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Role:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="text-white bg-red-600">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Change Role</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 bg-white">
            {filteredUsers.map((u, i) => (
              <tr key={i}>
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4 capitalize">{u.role}</td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleChangeRole(u._id, e.target.value)}
                    disabled={loading}
                    className="p-2 border rounded"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
