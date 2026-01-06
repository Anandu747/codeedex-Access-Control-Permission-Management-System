import api from "../api/axios";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email: "admin@test.com",
        password: "password"
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.user.isAdmin);

      if (res.data.user.isAdmin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user";
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}
