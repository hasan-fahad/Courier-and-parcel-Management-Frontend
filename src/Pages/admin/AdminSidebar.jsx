import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex flex-col w-64 h-screen text-white bg-red-600 shadow-md">
      <div className="p-6 text-2xl font-bold border-b border-red-400">
        📊 Admin Dashboard
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link
          to="/admin/dashboard"
          className="block p-2 rounded hover:bg-red-700"
        >
          📦 Metrics
        </Link>
        <Link to="/admin/assign" className="block p-2 rounded hover:bg-red-700">
          👷 Assign Agents
        </Link>
        <Link to="/admin/users" className="block p-2 rounded hover:bg-red-700">
          👥 All Users
        </Link>
        <Link
          to="/admin/bookings"
          className="block p-2 rounded hover:bg-red-700"
        >
          📚 Bookings
        </Link>
        <Link
          to="/admin/parcel-tracking"
          className="block p-2 rounded hover:bg-red-700"
        >
          📍 Parcel Tracking
        </Link>
        <Link to="/admin/assigned-parcels" className="block p-2 rounded hover:bg-red-700">
          📦 Assigned Parcels
        </Link>
        <Link to="/admin/export" className="block p-2 rounded hover:bg-red-700">
          📤 Export Reports
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className="px-4 py-2 m-4 bg-red-500 rounded hover:bg-red-700"
      >
        🚪 Logout
      </button>
    </div>
  );
}
