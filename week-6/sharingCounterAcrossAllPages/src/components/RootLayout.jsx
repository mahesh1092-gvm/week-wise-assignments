import Header from "./Header";
import { Outlet } from "react-router";
import Home from "./Home";
export default function RootLayout() {
  return (
    <div>
      <Header />

      <div className="bg-gray-400 min-h-screen mx-20 p-20">
        <Outlet />
      </div>
    </div>
  );
}
