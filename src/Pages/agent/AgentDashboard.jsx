import { Outlet } from "react-router-dom";
import AgentSidebar from "./AgentSidebar";




export default function AgentDashboard() {
  return (
    <div className="flex min-h-screen">
      <AgentSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
