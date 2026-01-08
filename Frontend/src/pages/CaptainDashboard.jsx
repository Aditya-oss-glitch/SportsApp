import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export default function CaptainDashboard() {
  const navigate = useNavigate();
  const [captainData, setCaptainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Check if captain is logged in
    const storedUser = localStorage.getItem("userData");
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("authToken");

    if (!storedUser || userRole !== "captain" || !token) {
      navigate("/login");
      return;
    }

    // Load captain data
    const captain = JSON.parse(storedUser);
    setCaptainData(captain);
    setLoading(false);

    // Fetch latest data from backend
    fetchCaptainData(captain.email);
  }, [navigate]);

  const fetchCaptainData = async (email) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.CAPTAINS}/${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data.captain) {
          setCaptainData(data.captain);
          localStorage.setItem("userData", JSON.stringify(data.captain));
        }
      }
    } catch (error) {
      console.error("Error fetching captain data:", error);
    }
  };

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

  if (!captainData) {
    return null;
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
              <span className="header-icon">👤</span>
              Team Captain Dashboard
            </h1>
            <p>Welcome back, {captainData.captainName || captainData.name}</p>
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
            { id: "team", label: "My Team", icon: "👥" },
            { id: "tournaments", label: "Tournaments", icon: "🏆" },
            { id: "matches", label: "Matches", icon: "⚽" },
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
              <h2>Overview</h2>
              <div className="overview-grid">
                <div className="overview-item">
                  <div className="overview-icon">👤</div>
                  <div>
                    <h3>Captain Name</h3>
                    <p>{captainData.captainName || captainData.name}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">🏆</div>
                  <div>
                    <h3>Team Name</h3>
                    <p>{captainData.teamName}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">⚽</div>
                  <div>
                    <h3>Sport</h3>
                    <p>{captainData.sport}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">📧</div>
                  <div>
                    <h3>Email</h3>
                    <p>{captainData.email || captainData.captainEmail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>My Team</h2>
              <div className="profile-details">
                <div className="profile-section">
                  <h3>Team Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Team Name:</span>
                    <span className="detail-value">{captainData.teamName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Sport:</span>
                    <span className="detail-value">{captainData.sport}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Captain:</span>
                    <span className="detail-value">{captainData.captainName || captainData.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{captainData.email || captainData.captainEmail}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{captainData.phone || captainData.captainPhone}</span>
                  </div>
                </div>
                {captainData.players && (
                  <div className="profile-section">
                    <h3>Team Members</h3>
                    <div className="team-members-list">
                      {captainData.players.map((player, index) => (
                        <div key={index} className="team-member-item">
                          <span className="member-number">{index + 1}</span>
                          <div>
                            <strong>{player.name}</strong>
                            {player.email && <p>{player.email}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "tournaments" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>My Tournaments</h2>
              <div className="partner-tournaments">
                <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "2rem" }}>
                  Tournaments your team is registered for will appear here.
                  <br />
                  <a href="/tournaments" style={{ color: "var(--accent-color)" }}>Browse tournaments</a>
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "matches" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Upcoming Matches</h2>
              <div className="analytics-placeholder">
                <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "2rem" }}>
                  Your team's match schedule will appear here.
                  <br />
                  Check back after tournament registration.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}


