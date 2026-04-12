import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router'
import CreateEmployee from './components/CreateEmployee'
import Home from "./components/Home"
import RootLayout from "./components/RootLayout"
import ListOfEmployees from "./components/ListOfEmployees"
import Employee from './components/Employee'
import EditEmployee from './components/EditEmployee'
function App() {
  const routeObj=createBrowserRouter([
{
  path:"/",
  element:<RootLayout/>,
  children:[{
    path:"",
    element:<Home/>,
  },
  {
    path:"createEmployee",
    element:<CreateEmployee />
  },
  {
    path:"list",
    element:<ListOfEmployees/>
  },
  {
    path:"employee",
    element:<Employee/>
  },
  {
    path:"edit-emp",
    element:<EditEmployee/>
  },
],
},
  ]);
  return (
      <RouterProvider router={routeObj} />
  );
}

export default App
