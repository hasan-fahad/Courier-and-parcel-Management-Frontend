import React from "react";
import { format } from "date-fns";

const statusDescriptions = {
  Booked: "Order placed by customer",
  "Picked Up": "Parcel picked up from sender",
  "Sent to Warehouse": "Parcel is being sent to the main warehouse",
  "Warehouse Received": "Warehouse has received the parcel",
  "In Transit": "Parcel is on the way to the delivery hub",
  "Hub Received": "Reached delivery address hub",
  "Agent Assigned": "Delivery agent assigned",
  "Collected by Agent": "Agent collected parcel for delivery",
  Delivered: "Parcel successfully delivered",
  Failed: "Delivery failed",
  Return: "Parcel returned by customer",
};

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-500";
    case "Failed":
    case "Return":
      return "bg-red-500";
    case "In Transit":
    case "Collected by Agent":
      return "bg-blue-500";
    case "Picked Up":
    case "Agent Assigned":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

const TrackingResult = ({ data }) => {
  if (!data || !data.events || data.events.length === 0) {
    return (
      <p className="text-center text-gray-600">No tracking events found.</p>
    );
  }

  const sortedEvents = [...data.events].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold text-center text-blue-700">
        📦 Tracking History for {data.trackingNumber}
      </h2>
      <div className="space-y-4">
        {sortedEvents.map((event, index) => (
          <div key={index} className="flex items-start">
            <div
              className={`flex items-center justify-center flex-shrink-0 w-8 h-8 text-white rounded-full ${getStatusColor(
                event.status
              )}`}
            >
              ✓
            </div>
            <div className="flex-grow ml-4">
              <p className="font-semibold text-gray-800">
                {event.status} -{" "}
                <span className="italic text-gray-600">
                  {statusDescriptions[event.status] || "Update recorded"}
                </span>
              </p>

           
              {event.status === "Booked" && (
                <p className="text-sm text-gray-600">
                  📍 Pickup Address: {data.pickupAddress}
                </p>
              )}
              {event.status === "Picked Up" && (
                <p className="text-sm text-gray-600">
                  🚚 Pickup Address: {data.pickupAddress}
                </p>
              )}
              {event.status === "Delivered" && (
                <p className="text-sm text-gray-600">
                  🎯 Delivery Address: {data.deliveryAddress}
                </p>
              )}

              {event.locationName && (
                <p className="text-sm text-gray-500">
                  🌍 Location: {event.locationName}
                </p>
              )}

       
              {event.dispatchId && (
                <p className="text-sm text-gray-500">
                  🆔 Dispatch ID: {event.dispatchId}
                </p>
              )}

              <p className="text-sm text-gray-500">
                🕒 {format(new Date(event.timestamp), "MMM dd, yyyy hh:mm a")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingResult;
