import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false); // Toggle form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });
    login(res.data);

    const role = res.data.user.role;

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "customer") {
      navigate("/dashboard");
    } else if (role === "agent") {
      navigate("/agent");
    } else {
      alert("Invalid user role!");
    }
  } catch (err) {
    alert("Login failed!");
  }
};

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      alert("Registration successful. Please log in.");
      console.log(res);
      setIsSignup(false); 
    } catch (err) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-gray-50 lg:flex-row">
      {/* Left Section (Image) */}
      <div className="relative flex items-center justify-center w-full h-full p-8 lg:w-1/2 lg:p-0">
        <div className="relative flex items-center justify-center w-[500px] h-[500px] rounded-full bg-red-500 overflow-hidden">
          <img
            src="/assets/courier.jpg"
            alt="Delivery Person"
            className="absolute bottom-0 object-cover transform h-4/5 translate-y-1/8"
            style={{
              width: "auto",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
          {/* Decorative Boxes */}
         <div className="absolute p-2 transform -translate-x-1/2 -translate-y-1/2 shadow-md top-1/4 left-1/4">
  <img src="/assets/box.png" alt="" className="w-12 h-12 rounded-md" />
</div>
<div className="absolute left-0 p-2 transform -translate-x-1/2 -translate-y-1/2 shadow-md top-1/2">
  <img src="/assets/box.png" alt="" className="w-12 h-12 border-2 border-white rounded-md" />
</div>
<div className="absolute p-2 transform -translate-x-1/2 translate-y-1/2 shadow-md bottom-1/4 left-1/4">
  <img src="/assets/box.png" alt="" className="w-12 h-12 border-2 border-white rounded-md" />
</div>
<div className="absolute right-0 p-2 transform translate-x-1/2 translate-y-1/2 shadow-md">
  <img src="/assets/box.png" alt="" className="w-12 h-12 border-2 border-white rounded-md" />
</div>
        </div>
      </div>

      {/* Right Section (Login/Signup Form) */}
      <div className="flex flex-col items-center justify-center w-full p-8 lg:w-1/2 lg:p-16">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-gray-800">
            Welcome To Excel Courier!
          </h1>
          <p className="text-gray-600">
            {isSignup ? "Create your account below" : "Sign in to book your delivery"}
          </p>
        </div>

        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>
          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
            {isSignup && (
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white transition duration-300 ease-in-out bg-red-600 rounded-md hover:bg-red-700"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-red-600 cursor-pointer hover:underline"
                    onClick={() => setIsSignup(false)}
                  >
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-red-600 cursor-pointer hover:underline"
                    onClick={() => setIsSignup(true)}
                  >
                    Sign Up
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
