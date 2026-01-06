import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          setError("Unauthorized. Please login again.");
        } else if (err.response?.status === 403) {
          setError("Access denied.");
        } else {
          setError("Something went wrong.");
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!user) {
    return <p className="info-text page-container">Loading user data...</p>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">User Dashboard</h1>

      <div className="card">
        <p>
          <span className="label">Email:</span> {user.email}
        </p>

        <p style={{ marginTop: "10px" }}>
          <span className="label">Role:</span>{" "}
          {user.isAdmin ? "Admin" : "User"}
        </p>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
