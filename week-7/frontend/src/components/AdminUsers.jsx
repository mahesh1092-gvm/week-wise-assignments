import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    let res = await axios.get("http://localhost:4000/admin-api/users", {
      withCredentials: true,
    });
    setUsers(res.data.payload);
  };

  const toggleUserStatus = async (user) => {
    const url = user.isActive
      ? `http://localhost:4000/admin-api/deactivate-user/${user._id}`
      : `http://localhost:4000/admin-api/activate-user/${user._id}`;

    await axios.put(url, {}, { withCredentials: true });
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="text-center justify-around">
      <h1 className="text-4xl text-center p-3 font-bold">
        Admin Dashboard - Users
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-auto justify-around">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-5 rounded-2xl shadow-2xl shadow-gray-900 text-center"
          >
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
            <p>{user.role}</p>

            <p
              className={`mt-2 font-medium ${
                user.isActive ? "text-green-600" : "text-red-500"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </p>

            <div className="flex justify-around mt-3">
              {user.isActive ? (
                <button
                  onClick={() => toggleUserStatus(user)}
                  className="p-3 text-white bg-yellow-500 rounded-2xl"
                >
                  Deactivate
                </button>
              ) : (
                <button
                  onClick={() => toggleUserStatus(user)}
                  className="p-3 text-white bg-green-500 rounded-2xl"
                >
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
