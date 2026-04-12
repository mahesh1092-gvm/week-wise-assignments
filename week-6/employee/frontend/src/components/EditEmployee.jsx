import React from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation,useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios'
import { useContext } from 'react'
import { counterContextObj } from '../contexts/ContextProvider'
function EditEmployee() {
  const  {register,handleSubmit,formState:{errors}, setValue,}=useForm();
 const {counter,changeCounter}=useContext(counterContextObj)

  // get empobj from navigate hook
  const {state}=useLocation();
     useEffect(()=>{
     setValue("name",state.name);
     setValue("email",state.email);
     setValue("mobile",state.mobile);
     setValue("designation",state.designation);
     setValue("companyName",state.companyName);
  },[]);


const navigate=useNavigate();
  const saveModifiedEmp=async (modifiedEmp)=>{
  //console.log(modifiedEmp)
  //make http request
  const res=await axios.put(`http://localhost:8074/employee-api/employees/${state._id}`,modifiedEmp)
  if(res.status===200){
    //navigate to list of emps
    navigate("/list");
  }
  }
  return (
    <div>
      <h1 className='text-3xl'>counter:{counter}</h1>
      <button onClick={changeCounter} className='bg-amber-300 p-5'>change</button>
     <h1 className='text-5xl text-center text-pink-500'> Edit Employee</h1>
    {/* form */}
    <form className='max-w-md mx-auto mt-10'  onSubmit={handleSubmit(saveModifiedEmp)}>
        <input type="text" placeholder='enter name' {...register("name")} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        <input type="text" placeholder='enter email' {...register("email")} className='mb-3 border-2 p-3 w-full rounded-2xl'  />
        <input type="text" placeholder='enter mob no' {...register("mobile")} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        <input type="text" placeholder='enter desigination' {...register("designation")} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        <input type="text" placeholder='enter companyName' {...register("companyName")} className='mb-3 border-2 p-3 w-full rounded-2xl' />
        <button type="submit" className="text-2xl rounded-2xl bg-green-600 text-white block mx-auto p-4">Save</button>
    </form>
    </div>
  )
}

export default EditEmployee
