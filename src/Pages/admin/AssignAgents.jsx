import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AssignAgents() {
  const [parcels, setParcels] = useState([]);
  const [assignedParcels, setAssignedParcels] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const parcelsRes = await API.get("/parcels/all-parcels?assigned=false");
        setParcels(parcelsRes.data);

        const agentsRes = await API.get("/auth/agents");
        setAgents(agentsRes.data);

        const assignedRes = await API.get("/parcels/assigned");
        setAssignedParcels(assignedRes.data);
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load parcels or agents" });
      }
    }
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedParcel || !selectedAgent) {
      setMessage({
        type: "error",
        text: "Please select both parcel and agent",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await API.patch("/parcels/assign", {
        parcelId: selectedParcel,
        agentId: selectedAgent,
      });

      setMessage({ type: "success", text: "Parcel assigned successfully!" });

      setParcels(parcels.filter((p) => p._id !== selectedParcel));
      setSelectedParcel("");
      setSelectedAgent("");
      const assignedRes = await API.get("/parcels/assigned");
      setAssignedParcels(assignedRes.data);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Assignment failed",
      });
    }

    setLoading(false);
  };

  // ✅ Handle unassign
  const handleUnassign = async (parcelId) => {
    try {
      setLoading(true);
      setMessage(null);

      await API.patch("/parcels/unassign", { parcelId });

      setMessage({ type: "success", text: "Parcel unassigned successfully!" });

      // ✅ Refresh data
      const [newUnassigned, newAssigned] = await Promise.all([
        API.get("/parcels/all-parcels?assigned=false"),
        API.get("/parcels/assigned")
      ]);

      setParcels(newUnassigned.data);
      setAssignedParcels(newAssigned.data);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Unassign failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        👷 Assign Agents
      </h1>

      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <label className="block mb-2 font-semibold text-gray-700" htmlFor="parcel">
          Select Parcel
        </label>
        <select
          id="parcel"
          value={selectedParcel}
          onChange={(e) => setSelectedParcel(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">-- Choose a parcel --</option>
          {parcels.map((parcel) => (
            <option key={parcel._id} value={parcel._id}>
              {parcel._id} - {parcel.pickupAddress} → {parcel.deliveryAddress}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="agent">
          Select Agent
        </label>
        <select
          id="agent"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded"
        >
          <option value="">-- Choose an agent --</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name} ({agent.email})
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Assigning..." : "Assign Agent"}
        </button>

        {message && (
          <p
            className={`mt-4 font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      {assignedParcels.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-700">
            📦 Assigned Parcels
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-center border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Parcel ID</th>
                  <th className="px-4 py-2 border">Parcel Type</th>
                   <th className="px-4 py-2 border">Parcel Track</th>
                  <th className="px-4 py-2 border">Pickup</th>
                  <th className="px-4 py-2 border">Delivery</th>
                  <th className="px-4 py-2 border">Assigned Agent</th>
                  <th className="px-4 py-2 border">Actions</th> 
                </tr>
              </thead>
              <tbody>
                {assignedParcels.map((parcel) => (
                  <tr key={parcel._id}>
                    <td className="px-4 py-2 border">{parcel._id}</td>
                    <td className="px-4 py-2 border">{parcel.parcelType}</td>
                    <td className="px-4 py-2 border">{parcel.trackingNumber}</td>
                    <td className="px-4 py-2 border">{parcel.pickupAddress}</td>
                    <td className="px-4 py-2 border">{parcel.deliveryAddress}</td>
                    <td className="px-4 py-2 border">
                      {parcel.agentId?.name} ({parcel.agentId?.email})
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleUnassign(parcel._id)}
                        disabled={loading}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Unassign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
