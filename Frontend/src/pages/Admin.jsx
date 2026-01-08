import { motion } from "framer-motion";
import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("create");
  const [tournamentData, setTournamentData] = useState({
    name: "",
    sport: "",
    date: "",
    venue: "",
    format: "knockout",
    entryFee: "",
    prize: "",
    maxTeams: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setTournamentData({
      ...tournamentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_ENDPOINTS.TOURNAMENTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setTournamentData({
          name: "",
          sport: "",
          date: "",
          venue: "",
          format: "knockout",
          entryFee: "",
          prize: "",
          maxTeams: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Tournament creation error:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="admin-page"
    >
      <div className="admin-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-header"
        >
          <h1>
            <span className="header-icon">⚙️</span>
            Admin Dashboard
          </h1>
          <p>Manage tournaments, registrations, and matches</p>
        </motion.div>

        <div className="admin-tabs">
          {[
            { id: "create", label: "Create Tournament", icon: "➕" },
            { id: "manage", label: "Manage Registrations", icon: "📋" },
            { id: "matches", label: "Match Management", icon: "⚽" },
            { id: "partners", label: "Partners", icon: "🤝" },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`admin-tab ${activeTab === tab.id ? "active" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        <div className="admin-content">
          {activeTab === "create" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="admin-card"
            >
              <h2>Create New Tournament</h2>
              <form onSubmit={handleCreateTournament} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Tournament Name</label>
                    <input
                      type="text"
                      name="name"
                      value={tournamentData.name}
                      onChange={handleChange}
                      placeholder="Summer Championship 2024"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Sport</label>
                    <select
                      name="sport"
                      value={tournamentData.sport}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select Sport</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Football">Football</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Volleyball">Volleyball</option>
                      <option value="Chess">Chess</option>
                      <option value="Badminton">Badminton</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={tournamentData.date}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={tournamentData.venue}
                      onChange={handleChange}
                      placeholder="Main Stadium"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Format</label>
                    <select
                      name="format"
                      value={tournamentData.format}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="knockout">Knockout</option>
                      <option value="league">League</option>
                      <option value="round-robin">Round Robin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Max Teams/Players</label>
                    <input
                      type="number"
                      name="maxTeams"
                      value={tournamentData.maxTeams}
                      onChange={handleChange}
                      placeholder="32"
                      min="2"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Entry Fee ($)</label>
                    <input
                      type="number"
                      name="entryFee"
                      value={tournamentData.entryFee}
                      onChange={handleChange}
                      placeholder="50"
                      min="0"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Prize Pool</label>
                    <input
                      type="text"
                      name="prize"
                      value={tournamentData.prize}
                      onChange={handleChange}
                      placeholder="$5,000"
                      className="form-input"
                    />
                  </div>
                </div>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="status-message success"
                  >
                    ✅ Tournament created successfully!
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="status-message error"
                  >
                    ❌ Failed to create tournament. Please try again.
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Tournament
                      <span className="button-arrow">→</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {activeTab === "manage" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="admin-card"
            >
              <h2>Manage Registrations</h2>
              <div className="admin-placeholder">
                <p>📋 Registration management coming soon...</p>
                <p>View, approve, or reject player and team registrations</p>
              </div>
            </motion.div>
          )}

          {activeTab === "matches" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="admin-card"
            >
              <h2>Match Management</h2>
              <div className="admin-placeholder">
                <p>⚽ Match management coming soon...</p>
                <p>Create fixtures, update scores, and manage standings</p>
              </div>
            </motion.div>
          )}

          {activeTab === "partners" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="admin-card"
            >
              <h2>Partner Management</h2>
              <div className="admin-placeholder">
                <p>🤝 Partner management coming soon...</p>
                <p>Add sponsors, academies, and event managers</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}


