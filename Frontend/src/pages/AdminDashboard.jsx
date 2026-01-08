import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Check if admin is logged in
    const storedUser = localStorage.getItem("userData");
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("authToken");

    if (!storedUser || userRole !== "admin" || !token) {
      navigate("/login");
      return;
    }

    // Load admin data
    const admin = JSON.parse(storedUser);
    setAdminData(admin);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="partner-dashboard-page"
    >
      <div className="partner-dashboard-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-header"
        >
          <div>
            <h1>
              <span className="header-icon">⚙️</span>
              Admin Dashboard
            </h1>
            <p>System Administration Panel</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </motion.button>
        </motion.div>

        <div className="dashboard-tabs">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "tournaments", label: "Tournaments", icon: "🏆" },
            { id: "registrations", label: "Registrations", icon: "📋" },
            { id: "partners", label: "Partners", icon: "🤝" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`dashboard-tab ${activeTab === tab.id ? "active" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        <div className="dashboard-content">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>System Overview</h2>
              <div className="overview-grid">
                <div className="overview-item">
                  <div className="overview-icon">🏆</div>
                  <div>
                    <h3>Total Tournaments</h3>
                    <p>View all tournaments</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">👥</div>
                  <div>
                    <h3>Total Registrations</h3>
                    <p>Players and teams</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">🤝</div>
                  <div>
                    <h3>Active Partners</h3>
                    <p>Manage partnerships</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">⚽</div>
                  <div>
                    <h3>Matches</h3>
                    <p>Schedule and results</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tournaments" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Tournament Management</h2>
              <div style={{ marginTop: "2rem" }}>
                <a href="/admin" style={{ color: "var(--accent-color)", textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                  >
                    Create New Tournament
                  </motion.button>
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === "registrations" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Manage Registrations</h2>
              <div className="admin-placeholder">
                <p>📋 Registration management coming soon...</p>
                <p>View, approve, or reject player and team registrations</p>
              </div>
            </motion.div>
          )}

          {activeTab === "partners" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Partner Management</h2>
              <div className="admin-placeholder">
                <p>🤝 Partner management coming soon...</p>
                <p>Manage sponsors, academies, and event managers</p>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>System Settings</h2>
              <div className="admin-placeholder">
                <p>⚙️ System settings coming soon...</p>
                <p>Configure platform settings and preferences</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}


