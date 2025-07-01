import { useState, useContext } from "react";
import API from "../../api/axios"; 
import { AuthContext } from "../../context/AuthContext";

export default function BookParcel() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    parcelType: "Documents",
    parcelSize: "Medium",
    paymentType: "COD",
    coordinates: {

      pickup: { lat: 23.78, lng: 90.38 },
      delivery: { lat: 23.79, lng: 90.40 },
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!user || !user.token) {
      setError("You must be logged in to book a parcel.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await API.post("/parcels", form, config);
      setSuccess(true);
    
      setForm({
        pickupAddress: "",
        deliveryAddress: "",
        parcelType: "Documents",
        parcelSize: "Medium",
        paymentType: "COD",
        coordinates: {
          pickup: { lat: 23.78, lng: 90.38 },
          delivery: { lat: 23.79, lng: 90.40 },
        },
      });
    } catch (err) {
      console.error("Failed to book parcel:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); 
      } else {
        setError("Failed to book parcel. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Book Your Parcel
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Fill in the details below to book a pickup.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            {/* Pickup Address */}
            <div>
              <label htmlFor="pickupAddress" className="sr-only">
                Pickup Address
              </label>
              <input
                id="pickupAddress"
                name="pickupAddress"
                type="text"
                autoComplete="street-address"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Pickup Address"
                value={form.pickupAddress}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {/* Delivery Address */}
            <div>
              <label htmlFor="deliveryAddress" className="sr-only">
                Delivery Address
              </label>
              <input
                id="deliveryAddress"
                name="deliveryAddress"
                type="text"
                autoComplete="street-address"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Delivery Address"
                value={form.deliveryAddress}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {/* Parcel Type */}
            <div className="pt-4">
              <label htmlFor="parcelType" className="sr-only">
                Parcel Type
              </label>
              <select
                id="parcelType"
                name="parcelType"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                value={form.parcelType}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Documents">Documents</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Fragile">Fragile Goods</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Parcel Size */}
            <div>
              <label htmlFor="parcelSize" className="sr-only">
                Parcel Size
              </label>
              <select
                id="parcelSize"
                name="parcelSize"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                value={form.parcelSize}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            {/* Payment Type */}
            <div>
              <label htmlFor="paymentType" className="sr-only">
                Payment Method
              </label>
              <select
                id="paymentType"
                name="paymentType"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                value={form.paymentType}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="COD">Cash On Delivery (COD)</option>
                <option value="Prepaid">Prepaid</option>
              </select>
            </div>
          </div>

          {error && (
            <div
              className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {success && (
            <div
              className="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Parcel booked successfully!</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Parcel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}