import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
export default function CreateEmployee() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = async (newEmployeeObj) => {
    console.log(newEmployeeObj);
    //make HttpPot req
    try {
      setLoading(true);
      let res = await axios.post(
        "http://localhost:5432/employee-api/employee",
        newEmployeeObj,
      );
      if (res.status == 201) {
        navigate("/list");
      } else {
        let errResponse = await res.json();
        throw new Error(errResponse.reason);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" m-auto">
      <h1 className="text-center text-3xl font-bold p-3">
        Create New Employee
      </h1>
      <form
        className="max-w-2xs  m-auto "
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <input
          type="text"
          placeholder="Enter name"
          id="name"
          {...register("name", {
            required: "name is required",
            minLength: [6, "minimum 6 characters"],
          })}
          className="mb-3 border bg-white  p-3 w-full rounded-2xl"
        />
        {errors.name?.type == "required" && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
        {errors.name?.type == "minLength" && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
        <input
          type="text"
          placeholder="Enter eamil"
          id="email"
          {...register("email")}
          className="mb-3 border bg-white  p-3 w-full rounded-2xl"
        />
        {errors.email?.type == "required" && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
        <input
          type="text"
          placeholder="Enter mobile"
          id="mobile"
          {...register("mobile")}
          className="mb-3 border bg-white  p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          id="designation"
          {...register("designation")}
          className="mb-3 border bg-white  p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter company Name"
          id="companyName"
          {...register("companyName")}
          className="mb-3 border bg-white p-3 w-full rounded-2xl"
        />
        <button className="p-3  rounded-3xl text-center block m-auto bg-gray-700 text-amber-50">
          Add Employee
        </button>
      </form>
    </div>
  );
}
