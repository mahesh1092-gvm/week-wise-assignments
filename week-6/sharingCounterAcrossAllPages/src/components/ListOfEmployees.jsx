import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function ListOfEmployees() {
  const [emps, setEmps] = useState([]);

  const navigate = useNavigate();

  const gotoEmployee = (empObj) => {
    navigate("/employee", { state: empObj });
  };

  const editEmployee = (emp) => {
    console.log("Emp Object in LIST OF EMPLOYEES", emp);
    navigate("/edit-employee", { state: emp });
  };

  //delete employee card
  const deleteEmpById = async (id) => {
    let res = await axios.delete(
      `http://localhost:5432/employee-api/employee/${id}`,
    );
    console.log(res);
    if (res.status == 200) {
      //get latest emps
      getEmps();
    }
  };

  //get all employees
  async function getEmps() {
    let res = await fetch("http://localhost:5432/employee-api/employee");
    if (res.status == 200) {
      let resObj = await res.json();
      setEmps(resObj.payload);
    }
  }

  //get all emps on component loading
  useEffect(() => {
    getEmps();
  }, []);

  return (
    <div className=" text-center justify-around">
      <h1 className="text-4xl text-center p-3 font-bold">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-auto justify-around">
        {emps.map((empObj) => (
          <div
            key={empObj._id}
            className="bg-white p-5 rounded-2xl shadow-2xl shadow-gray-900 text-center"
          >
            <p>{empObj.name}</p>
            <p>{empObj.email}</p>

            <div className="flex justify-around">
              <button
                onClick={() => gotoEmployee(empObj)}
                className="p-3 text-white bg-blue-700 rounded-2xl"
              >
                view
              </button>
              <button
                onClick={() => editEmployee(empObj)}
                className="p-3 text-white bg-green-400 rounded-2xl "
              >
                Edit
              </button>
              <button
                onClick={() => deleteEmpById(empObj.id)}
                className="p-3 text-white bg-red-500 rounded-2xl"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
