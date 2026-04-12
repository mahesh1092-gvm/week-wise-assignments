import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'
function CreateEmployee() {
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm()
    //form submit
    const onFormSubmit=async (newEmpObj)=>{
   //console.log(newEmpObj);
   try {
    setLoading(true);
   //make http POST req
   let res=await fetch("http://localhost:8074/employee-api/employees",{
    method:"POST",
    headers:{"content-Type":"application/json"},
    body:JSON.stringify(newEmpObj),
   });
   if(res.status===201){
    navigate("/list")
   }else{
    let errorRes=await res.json()
    console.log("error response is",errorRes);
    throw new Error(errorRes.reason)
   }
    }catch (err){
        console.log("err in catch",err)
        //deal with 
        setError(err.message);
    }finally{
        setLoading(false);
    }
};
console.log(error);
if(loading){
  return <p className='text-center text-4xl'>Loading....</p>;
}
if(error){
  return <p className='text-red-500 text-center text-3xl'>{error}</p>;
}
  return (
    <div>
      <h1 className='text-5xl text-center text-gray-500'> Create New Employee</h1>
    {/* form */}
    <form className='max-w-md mx-auto mt-10' onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" placeholder='enter name' {...register("name",{required:"Name is required",minLength:[4,"Min length is 4"]})} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        {
         errors.name?.type=="required" && <p className='text-red-500'>{errors.name.message}</p>
        // errors.name?.type==""
        }
        <input type="text" placeholder='enter email' {...register("email")} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        <input type="text" placeholder='enter mob no' {...register("mobile")} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        <input type="text" placeholder='enter desigination' {...register("designation")} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        <input type="text" placeholder='enter companyName' {...register("companyName")} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        <button type="submit" className="text-2xl rounded-2xl bg-gray-600 text-white block mx-auto p-4">Add Emp</button>
    </form>
    </div>
  )
}

export default CreateEmployee;
