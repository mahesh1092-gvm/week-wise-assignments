import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function ListOfEmployees() {
  const [emps, setEmps] = useState([]);

  const navigate = useNavigate();

  // Navigate to employee details page
  const gotoEmployee = (empObj) => {
    navigate("/employee", { state: empObj });
  };

  // Navigate to edit employee page
  const editEmployee = (emp) => {
    console.log("Employee Object:", emp);

    navigate("/edit-employee", {
      state: emp,
    });
  };

  // Delete employee
  const deleteEmpById = async (id) => {
    try {
      console.log("Deleting Employee ID:", id);

      const res = await axios.delete(
        `http://localhost:5432/employee-api/employee/${id}`,
      );

      console.log(res);

      if (res.status === 200) {
        // Refresh employees list
        getEmps();
      }
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  // Get all employees
  async function getEmps() {
    try {
      const res = await fetch("http://localhost:5432/employee-api/employee");

      if (res.status === 200) {
        const resObj = await res.json();

        console.log("Employees:", resObj.payload);

        setEmps(resObj.payload);
      }
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  }

  // Load employees on component mount
  useEffect(() => {
    getEmps();
  }, []);

  return (
    <div className="text-center p-5">
      <h1 className="text-4xl font-bold p-5">List of Employees</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {emps.map((empObj) => (
          <div
            key={empObj._id}
            className="bg-white p-5 rounded-2xl shadow-2xl shadow-gray-300"
          >
            <h2 className="text-2xl font-bold">{empObj.name}</h2>

            <p className="text-gray-600 mt-2">{empObj.email}</p>

            <div className="flex justify-around mt-5">
              <button
                onClick={() => gotoEmployee(empObj)}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                View
              </button>

              <button
                onClick={() => editEmployee(empObj)}
                className="bg-green-500 text-white px-4 py-2 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEmpById(empObj._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
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
