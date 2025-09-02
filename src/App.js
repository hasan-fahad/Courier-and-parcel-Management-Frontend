import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  
} from "react-router-dom";
import AdminSidebar from "./Pages/admin/AdminSidebar";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AssignAgents from "./Pages/admin/AssignAgents";
import AllUsers from "./Pages/admin/AllUsers";
import Sidebar from "./Pages/customer/CustomerSidebar";
import Profile from "./Pages/Profile";
import BookParcel from "./Pages/customer/BookParcel";
import Login from "./Pages/Login";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ExportReports from "./Pages/admin/ExportReports";
import BookingHistory from "./Pages/admin/BookingHistory";

import CustomerBookingHistory from "./Pages/customer/CustomerBookingHistory";
import AgentSidebar from "./Pages/agent/AgentSidebar";
import AssignedParcels from "./Pages/agent/ViewAssignedParcels";
import TrackParcel from "./Pages/TrackParcel";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Render nested admin routes here */}
      </div>
    </div>
  );
}

function CustomerLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

function AgentLayout() {
  return (
    <div className="flex min-h-screen">
      <AgentSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user } = useContext(AuthContext);
  console.log("User:", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/track/:id" element={<TrackParcel />} />

        {user?.role === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="assign" element={<AssignAgents />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="export" element={<ExportReports />} />
            <Route path="bookings" element={<BookingHistory />} />
            <Route path="parcel-tracking" element={<TrackParcel />} />
            <Route path="assigned-parcels" element={<AssignedParcels />} />
          </Route>
        )}

        {user?.role === "customer" && (
          <Route path="/dashboard" element={<CustomerLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="book" element={<BookParcel />} />
            <Route path="parcel-tracking" element={<TrackParcel />} />
            <Route
              path="customer-booking-history"
              element={<CustomerBookingHistory />}
            />
          </Route>
        )}

        {user?.role === "agent" && (
          <Route path="/agent" element={<AgentLayout />}>
            <Route path="assigned-parcels" element={<AssignedParcels />} />
            <Route path="profile" element={<Profile />} />
            <Route path="parcel-tracking" element={<TrackParcel />} />
            <Route
              path="customer-booking-history"
              element={<CustomerBookingHistory />}
            />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
