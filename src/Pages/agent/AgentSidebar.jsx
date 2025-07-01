import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AgentSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col w-64 h-screen text-white bg-red-600 shadow-lg">
      
      <Link to="/agent" className="p-6 text-2xl font-bold border-b border-red-400">
        📦 Agent Dashboard
      </Link>
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/agent/profile" className="block p-2 rounded hover:bg-red-700">
          👤 Profile
        </Link>
              <Link to="/agent/assigned-parcels" className="block p-2 rounded hover:bg-red-700">
          🧾 Assigned Parcels
        </Link>
      <Link
          to="/agent/parcel-tracking"
          className="block p-2 rounded hover:bg-red-700"
        >
          📍 Parcel Tracking
        </Link>
         <Link
          to="/agent/customer-booking-history"
          className="block p-2 rounded hover:bg-red-700"
        >
          📚 Bookings
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
