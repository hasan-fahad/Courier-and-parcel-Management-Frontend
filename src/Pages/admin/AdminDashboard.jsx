import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await API.get("/admin/metrics");
        setMetrics(res.data);
      } catch (err) {
        console.error("Failed to fetch metrics", err);
      }
    };

    fetchMetrics();
  }, []);

  if (!metrics) return <p className="p-6">Loading metrics...</p>;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">📦 Parcel Metrics (Today)</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">Daily Bookings</h2>
          <p className="text-3xl font-bold text-red-600">{metrics.dailyBookings}</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">Failed Deliveries</h2>
          <p className="text-3xl font-bold text-yellow-600">{metrics.failedDeliveries}</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">COD Collected</h2>
          <p className="text-3xl font-bold text-green-600">৳ {metrics.codAmount}</p>
        </div>
      </div>
    </div>
  );
}
