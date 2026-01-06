import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import "./App.css";



function App() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            token && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />

        {/* User Route */}
        <Route
          path="/user"
          element={
            token ? <UserDashboard /> : <Navigate to="/login" />
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
