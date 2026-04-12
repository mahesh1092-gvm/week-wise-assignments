import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';


function ListOfEmployees() {
    const [emps,setEmps]=useState([]);
    const navigate=useNavigate()

    const goToEmployee=(empObj)=>{
      //navigate to employee
      navigate("/employee",{state:empObj});
    };
    
      const goToEditEmployee=(empObj)=>{
      //navigate to employee
      navigate("/edit-emp",{state:empObj});
    };

    const deleteEmpById=async (id)=>{
      let res=await axios.delete(`http://localhost:8074/employee-api/employees/${id}`)
      if (res.status===200){
        //get latest emps data after delete
        getEmps();
      }
    }
    //get all emps 
     async function getEmps() {
            let res=await axios.get("http://localhost:8074/employee-api/employees");
            if(res.status===200) {
                let resObj=res.data;
                //console.log(resObj)
                setEmps(resObj.payload);
            }
        }
         //get all emps on component loading
    useEffect(()=>{

        getEmps();
    },[]);
  return (
    <div>
      <h1 className='text-4xl text-center'>list of Employees</h1>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {emps.map((empObj)=>(
  
            <div key={empObj._id} className='bg-white p-5 '>          
                  <p>{empObj.name}</p>
                   <p>{empObj.email}</p>
                   {/*  3 buttons*/}
                   <div className='flex justify-around'>
                    <button onClick={() => goToEmployee(empObj)} className='bg-green-600 p-3 rounded-3xl text-amber-50'>view</button>
                    <button onClick={() => goToEditEmployee(empObj)} className='bg-blue-600 p-3 rounded-3xl text-amber-50'>Edit</button>
                    <button onClick={()=> deleteEmpById(empObj._id)} className='bg-yellow-600 p-3 rounded-3xl text-amber-50'>Delete</button>
                   </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmployees;
