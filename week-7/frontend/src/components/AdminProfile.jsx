import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const gotoUser = (userObj) => {
    navigate("/user-profile", { state: userObj });
  };

  const deactivateUser = async (id) => {
    let res = await axios.put(
      `http://localhost:4000/admin-api/deactivate-user/${id}`,
      {},
      { withCredentials: true },
    );

    if (res.status === 200) {
      getUsers();
    }
  };

  const activateUser = async (id) => {
    let res = await axios.put(
      `http://localhost:4000/admin-api/activate-user/${id}`,
      {},
      { withCredentials: true },
    );

    if (res.status === 200) {
      getUsers();
    }
  };

  const deleteUser = async (id) => {
    let res = await axios.delete(
      `http://localhost:4000/admin-api/delete-user/${id}`,
      { withCredentials: true },
    );

    if (res.status === 200) {
      getUsers();
    }
  };

  async function getUsers() {
    let res = await axios.get("http://localhost:4000/admin-api/users", {
      withCredentials: true,
    });

    if (res.status === 200) {
      setUsers(res.data.payload);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl p-3 font-bold">All Users</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-auto">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-5 rounded-2xl shadow-2xl text-center"
          >
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p className={user.isActive ? "text-green-600" : "text-red-600"}>
              {user.isActive ? "Active" : "Deactivated"}
            </p>

            <div className="flex justify-around mt-3">
              <button
                onClick={() => gotoUser(user)}
                className="p-2 bg-blue-600 text-white rounded"
              >
                View
              </button>

              {user.isActive ? (
                <button
                  onClick={() => deactivateUser(user._id)}
                  className="p-2 bg-yellow-500 text-white rounded"
                >
                  Deactivate
                </button>
              ) : (
                <button
                  onClick={() => activateUser(user._id)}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  Activate
                </button>
              )}

              <button
                onClick={() => deleteUser(user._id)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
