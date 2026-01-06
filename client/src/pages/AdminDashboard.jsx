import api from "../api/axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/admin/audit-logs")
      .then((res) => setLogs(res.data))
      .catch(() => alert("Access denied"))
      .finally(() => setLoading(false));
  }, []);

  const goToUserDashboard = () => {
    window.location.href = "/user";
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>

        <button style={styles.switchBtn} onClick={goToUserDashboard}>
          Go to User Dashboard
        </button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subtitle}>Audit Logs</h2>

        {loading && <p style={styles.info}>Loading logs...</p>}

        {!loading && logs.length === 0 && (
          <p style={styles.info}>No audit logs yet.</p>
        )}

        {!loading && logs.length > 0 && (
          <ul style={styles.list}>
            {logs.map((log) => (
              <li key={log._id} style={styles.listItem}>
                <span style={styles.action}>{log.action}</span>
                <span style={styles.time}>
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
    padding: "40px",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  title: {
    fontSize: "32px"
  },
  switchBtn: {
    padding: "10px 14px",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: "24px",
    borderRadius: "8px",
    maxWidth: "600px"
  },
  subtitle: {
    marginBottom: "16px",
    fontSize: "20px",
    borderBottom: "1px solid #333",
    paddingBottom: "8px"
  },
  info: {
    color: "#aaa",
    fontSize: "14px"
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #333"
  },
  action: {
    fontWeight: "bold",
    color: "#4ade80"
  },
  time: {
    fontSize: "13px",
    color: "#bbb"
  }
};