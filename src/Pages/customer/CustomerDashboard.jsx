import { Outlet } from "react-router-dom";
import Sidebar from "./CustomerSidebar";



export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
