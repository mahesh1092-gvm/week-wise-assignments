import React from 'react'
import { NavLink } from 'react-router'
function Header() {
  return (
    <nav className='flex justify-end text-2xl p-7 bg-gray-600  text-white gap-8'>
        <NavLink to="" className={({isActive})=>(isActive ? "text-orange-400" :"")}>Home</NavLink>
        <NavLink to="createEmployee" className={({isActive})=>(isActive ? "text-orange-400" :"")}> Create Emp</NavLink>
        <NavLink to="list" className={({isActive})=>(isActive ? "text-orange-400" :"")}>Emp List</NavLink>
    
    </nav>
  );
}

export default Header;
