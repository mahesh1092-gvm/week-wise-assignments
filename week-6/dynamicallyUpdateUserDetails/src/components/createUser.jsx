import { useState } from "react";
import { useForm } from "react-hook-form";
function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState([]);
  const onSubmitForm = (obj) => {
    console.log(obj);
    setUsers([...users, obj]);
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-5">
      <h1 className="text-center">Create User Form</h1>
      <form className="p-3" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            {...register("firstName", {
              required: "First Name Required",
            })}
            id="firstName"
            className="border w-full p-3"
          />
          {errors.firstName?.type == "required" && (
            <p className="text-red-900">{errors.firstName.message}</p>
          )}
          {errors.firstName?.type == "validate" && (
            <p className="text-red-900">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email">email</label>
          <input
            type="email"
            {...register("email", {
              required: "email is required",
              minLength: 4,
              validate: (v) =>
                v.trim().length != 0 || "white space is not valid",
            })}
            id="email"
            className="border w-full p-3"
          />
        </div>
        {errors.firstName?.type == "required" && (
          <p className="text-red-900">{errors.message}</p>
        )}
        {errors.firstName?.type == "validate" && (
          <p className="text-red-900">{errors.message}</p>
        )}
        {errors.firstName?.type == "minLength" && (
          <p className="text-red-900">minimum 6 characters</p>
        )}
        <div className="mb-3">
          <label htmlFor="dateOdBirth">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="border w-full p-3"
          />
        </div>
        <button className="bg-pink-400 block mx-auto p-5 shadow-2xl rounded-2xl">
          Add User
        </button>
      </form>
      <div className="grid gap-5">
        <h1>List of Users</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Email</th>
              <th>Date Of Birth</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userObj, index) => (
              <tr key={index}>
                <td className="p-2">{userObj.firstName}</td>
                <td className="p-2">{userObj.email}</td>
                <td className="p-2">{userObj.dateOfBirth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CreateUserForm;
