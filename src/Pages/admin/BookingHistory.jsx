import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

export default function BookingHistory() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await API.get('/parcels/all-parcels'); 
        setParcels(res.data);
      } catch (err) {
        console.error('Failed to load history:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="p-6 ">
      <h1 className="mb-4 text-2xl font-bold">📦 Booking History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : parcels.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-center border border-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 border">Booking ID</th>
                <th className="px-4 py-2 border">Pickup Address</th>
                <th className="px-4 py-2 border">Delivery Address</th>
                <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Tracking Number</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p) => (
                <tr key={p._id}>
                  <td className="px-4 py-2 border">{p._id}</td>
                  <td className="px-4 py-2 border">{p.pickupAddress}</td>
                  <td className="px-4 py-2 border">{p.deliveryAddress}</td>
                  <td className="px-4 py-2 font-semibold text-blue-700 capitalize border">
                    {p.status}
                  </td>
                   <td className="px-4 py-2 font-semibold text-red-700 capitalize border">
                    {p.trackingNumber}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
