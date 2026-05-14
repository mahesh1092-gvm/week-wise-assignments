import { Outlet } from "react-router";
import { NavLink } from "react-router";
export default function Header() {
  return (
    <div className="">
      <nav className="bg-gray-500 flex p-5 gap-5 items-center  justify-end">
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive ? " bg-gray-700 rounded-3xl text-amber-50 p-3 " : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="create-employee"
          className={({ isActive }) =>
            isActive ? " bg-gray-700 rounded-3xl text-amber-50 p-3" : ""
          }
        >
          CreateEmployee
        </NavLink>
        <NavLink
          to="list"
          className={({ isActive }) =>
            isActive ? " bg-gray-700 rounded-3xl text-amber-50 p-3" : ""
          }
        >
          Employees
        </NavLink>
      </nav>
    </div>
  );
}
