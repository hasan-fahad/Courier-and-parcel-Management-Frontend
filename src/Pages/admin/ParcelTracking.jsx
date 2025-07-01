import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import API from "../../api/axios";

export default function TrackParcel({ parcelId }) {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await API.get(`/admin/location/${parcelId}`);
        setLocation(res.data.currentLocation);
        setStatus(res.data.status);
      } catch (err) {
        console.error("Error tracking parcel:", err);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 10000); 
    return () => clearInterval(interval);
  }, [parcelId]);

  return (
    <div>
      <h2>Parcel Status: {status}</h2>
      {location ? (
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>Current Location</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
