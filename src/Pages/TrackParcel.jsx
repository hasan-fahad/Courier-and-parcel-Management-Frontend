import React, { useState } from "react";

import API from "../api/axios";
import TrackingResult from "./TrackingResult";

function TrackParcel() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    setLoading(true);
    setError(null);
    setTrackingData(null);
    try {
      const response = await API.get(
        `/api/parcels/track/${trackingNumber}`
      );
      setTrackingData(response.data);
    } catch (err) {
      setError("Error tracking parcel. Please check the tracking number.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Parcel Tracking</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button
            onClick={handleTrack}
            className="p-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Tracking..." : "Track Parcel"}
          </button>
        </div>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        {trackingData && <TrackingResult data={trackingData} />}
      </div>
    </div>
  );
}

export default TrackParcel;
