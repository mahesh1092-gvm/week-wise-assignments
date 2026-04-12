import { useForm } from "react-hook-form";
function FormDemo() {
  const {
    register, //to register from fields
    handleSubmit, //to handle for submission
    formState: { errors }, //to handle validations
  } = useForm();
  //form submit function
  const onFormSubmit = (obj) => {
    console.log(obj);
  };
  return (
    <div>
      <h1 className="mx-w-md mx-auto text-center mt-4 text-4xl">FormDemo</h1>
      {/* form */}
      <form
        className="max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username Required",
              minLength: 4,
              validate: (v) =>
                v.trim().length != 0 || "white space is not valid",
            })}
            id="username"
            className="border w-full p-3"
          />
          {/* username validation error message */}
          {errors.username?.type == "required" && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          {errors.username?.type == "validate" && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          {errors.username?.type == "minLength" && (
            <p className="text-red-500">minimum 4 characters are required</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email">email</label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className="border w-full p-3"
          />
        </div>
        <button className="p-5 bg-blue-400 block mx-auto">Submit</button>
      </form>
    </div>
  );
}
export default FormDemo;
