import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">👤 My Profile</h1>
      {user ? (
        <div className="p-4 bg-white rounded shadow">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
