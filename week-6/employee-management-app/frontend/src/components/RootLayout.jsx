import Header from "./Header";
import { Outlet } from "react-router";
import Home from "./Home";
export default function RootLayout() {
  return (
    <div>
      <Header />

      <div className="bg-blue-300 min-h-screen mx-20 p-20">
        <Outlet />
      </div>
    </div>
  );
}
