import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { counterContextObj } from "../contexts/counterContextObj";
export default function EditEmployee() {
  const { counter, changeCounter } = useContext(counterContextObj);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // get empObj from navigate hook
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    setValue("name", state.name);
    setValue("email", state.email);
    setValue("mobile", state.mobile);
    setValue("designation", state.designation);
    setValue("companyName", state.companyName);
  }, []);
  const navigate = useNavigate();

  const saveModifiedEmployee = async (modifiedEmployee) => {
    //console.log(modifiedEmployye);
    //make http Put req
    const res = await axios.put(
      `http://localhost:5432/employee-api/employee/${state._id}`,
      modifiedEmployee,
    );
    if (res.status == 200) {
      //navigate to listOfEmps
      navigate("/list");
    }
  };

  return (
    <div className=" m-auto">
      <h1 className="text-3xl">Counter: {counter}</h1>
      <button onClick={changeCounter} className="bg-amber-300 p-5">
        Change
      </button>
      <h1 className="text-center text-3xl font-bold p-3">Edit Employee</h1>
      <form
        className="max-w-2xs  m-auto"
        onSubmit={handleSubmit(saveModifiedEmployee)}
      >
        <input
          type="text"
          placeholder="Enter name"
          id="name"
          {...register("name")}
          className="mb-3 border p-3 w-full rounded-3xl"
        />
        <input
          type="text"
          placeholder="Enter eamil"
          id="email"
          {...register("email")}
          className="mb-3 border p-3 w-full rounded-3xl"
          disabled
        />
        <input
          type="text"
          placeholder="Enter mobile"
          id="mobile"
          {...register("mobile")}
          className="mb-3 border p-3 w-full rounded-3xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          id="designation"
          {...register("designation")}
          className="mb-3 border p-3 w-full rounded-3xl"
        />
        <input
          type="text"
          placeholder="Enter company Name"
          id="companyName"
          {...register("companyName")}
          className="mb-3 border p-3 w-full rounded-3xl"
        />
        <button className="p-3  rounded-3xl text-center block m-auto bg-gray-700 text-amber-50">
          Update Employee
        </button>
      </form>
    </div>
  );
}
