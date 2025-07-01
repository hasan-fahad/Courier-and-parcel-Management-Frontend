import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AssignedParcels() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
 
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const fetchAssignedParcels = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/parcels/assigned", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching parcels:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (parcelId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(
        `/parcels/${parcelId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAssignedParcels();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchAssignedParcels();
  }, []);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Picked Up":
        return "bg-yellow-100 text-yellow-800";
      case "In Transit":
        return "bg-indigo-100 text-indigo-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };


 const agentStatusOptions = [
  { value: "Collected By Agent", label: "🏃 Collected By Agent" },
  { value: "Delivered", label: "✅ Delivered" },
  { value: "Failed", label: "❌ Failed" },
  { value: "Return", label: "↩️ Returned" },
];

const adminStatusOptions = [
  { value: "Booked", label: "🚫 Booked", disabled: true },
  { value: "Picked Up", label: "📦 Picked Up" },
  { value: "Sent To Warehouse", label: "🏢 Sent to Warehouse" },
  { value: "Warehouse Received", label: "📥 Warehouse Received" },
  { value: "In Transit", label: "🚚 In Transit" },
  { value: "Hub Received", label: "📦 Hub Received" },
  { value: "Agent Assigned", label: "👨‍💼 Agent Assigned" },
  { value: "Collected By Agent", label: "🏃 Collected By Agent" },
  { value: "Delivered", label: "✅ Delivered" },
  { value: "Failed", label: "❌ Failed" },
  { value: "Return", label: "↩️ Returned" },
];

const getStatusOptions = () => {
  if (userRole === "agent") return agentStatusOptions;
  return adminStatusOptions;
};
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-center text-red-600">
        📦 Assigned Parcels
      </h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : parcels.length === 0 ? (
        <div className="text-center text-gray-500">No parcels assigned yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {parcels.map((parcel) => (
            <div
              key={parcel._id}
              className="p-5 transition-shadow duration-300 bg-white border shadow-md hover:shadow-xl rounded-xl"
            >
              <div className="mb-2">
                <span className="font-semibold">📍 Pickup:</span> {parcel.pickupAddress}
              </div>
              <div className="mb-2">
                <span className="font-semibold">🚚 Delivery:</span> {parcel.deliveryAddress}
              </div>
              <div className="mb-2">
                <span className="font-semibold">📦 Type:</span> {parcel.parcelType}
              </div>
              <div className="mb-2">
                <span className="font-semibold">💰 Payment:</span> {parcel.paymentType}
              </div>
              <div className="mb-2">
                <span className="font-semibold">📐 Size:</span> {parcel.parcelSize}
              </div>
              <div className="mb-2">
                <span className="font-semibold">🔢 Tracking-Number:</span> {parcel.trackingNumber}
              </div>
              <div className="mb-2">
                <span className="font-semibold">📊 Status:</span>{" "}
                <span
                  className={`px-2 py-1 text-sm rounded ${getStatusBadgeColor(parcel.status)}`}
                >
                  {parcel.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Created: {new Date(parcel.createdAt).toLocaleString()}
              </div>

              <div className="mt-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  🔄 Update Status:
                </label>
                <div className="relative">
                  <select
                    value={parcel.status}
                    onChange={(e) => handleStatusChange(parcel._id, e.target.value)}
                    className="w-full px-4 py-2 pr-8 text-sm transition bg-white border rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                  >
                    {getStatusOptions().map(({ value, label, disabled }) => (
                      <option key={value} value={value} disabled={disabled}>
                        {label}
                      </option>
                    ))}
                  </select>

                  {/* Dropdown Arrow Icon */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
