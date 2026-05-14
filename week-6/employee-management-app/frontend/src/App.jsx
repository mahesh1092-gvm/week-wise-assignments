import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout";
import CreateEmployee from "./components/CreateEmployee";
import ListOfEmployees from "./components/ListOfEmployees";
import Home from "./components/Home";
import Employee from "./components/Employee";
import EditEmployee from "./components/EditEmployee";
function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "create-employee",
          element: <CreateEmployee />,
        },
        {
          path: "list",
          element: <ListOfEmployees />,
        },
        {
          path: "employee",
          element: <Employee />,
        },
        {
          path: "edit-employee",
          element: <EditEmployee />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routerObj} />;
}
export default App;
