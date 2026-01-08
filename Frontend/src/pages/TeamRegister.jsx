import { motion } from "framer-motion";
import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

const sports = [
  "Cricket",
  "Football",
  "Basketball",
  "Volleyball",
  "Badminton",
];

export default function TeamRegister() {
  const [formData, setFormData] = useState({
    teamName: "",
    captainName: "",
    captainEmail: "",
    captainPhone: "",
    sport: "",
    players: [{ name: "", email: "", phone: "", age: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...formData.players];
    newPlayers[index][field] = value;
    setFormData({ ...formData, players: newPlayers });
  };

  const addPlayer = () => {
    setFormData({
      ...formData,
      players: [...formData.players, { name: "", email: "", phone: "", age: "" }],
    });
  };

  const removePlayer = (index) => {
    if (formData.players.length > 1) {
      const newPlayers = formData.players.filter((_, i) => i !== index);
      setFormData({ ...formData, players: newPlayers });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_ENDPOINTS.TEAMS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Store captain info for login
        localStorage.setItem("teamRegistration", JSON.stringify({
          email: formData.captainEmail,
          teamName: formData.teamName,
        }));
        setFormData({
          teamName: "",
          captainName: "",
          captainEmail: "",
          captainPhone: "",
          sport: "",
          players: [{ name: "", email: "", phone: "", age: "" }],
        });
      } else {
        setSubmitStatus("error");
        console.error("Team registration failed:", data.error || data.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Team registration error:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="register-page"
    >
      <div className="register-container" style={{ maxWidth: "800px" }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="register-card"
        >
          <div className="register-header">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="register-icon"
            >
              👥
            </motion.div>
            <h2>Team Registration</h2>
            <p>Register your team and start competing together</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="form-group"
            >
              <label htmlFor="teamName">
                <span className="label-icon">🏆</span>
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Enter your team name"
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="form-group"
            >
              <label htmlFor="sport">
                <span className="label-icon">⚽</span>
                Select Sport
              </label>
              <select
                id="sport"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Choose a sport...</option>
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </motion.div>

            <div className="section-divider">
              <h3>Captain Information</h3>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="form-group"
            >
              <label htmlFor="captainName">
                <span className="label-icon">👤</span>
                Captain Name
              </label>
              <input
                type="text"
                id="captainName"
                name="captainName"
                value={formData.captainName}
                onChange={handleChange}
                placeholder="Enter captain's name"
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="form-row"
            >
              <div className="form-group">
                <label htmlFor="captainEmail">
                  <span className="label-icon">📧</span>
                  Captain Email
                </label>
                <input
                  type="email"
                  id="captainEmail"
                  name="captainEmail"
                  value={formData.captainEmail}
                  onChange={handleChange}
                  placeholder="captain@example.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="captainPhone">
                  <span className="label-icon">📱</span>
                  Captain Phone
                </label>
                <input
                  type="tel"
                  id="captainPhone"
                  name="captainPhone"
                  value={formData.captainPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="form-input"
                />
              </div>
            </motion.div>

            <div className="section-divider">
              <h3>Team Members</h3>
              <button
                type="button"
                onClick={addPlayer}
                className="add-player-btn"
              >
                + Add Player
              </button>
            </div>

            {formData.players.map((player, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="player-card"
              >
                <div className="player-header">
                  <h4>Player {index + 1}</h4>
                  {formData.players.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePlayer(index)}
                      className="remove-player-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Player name"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={player.email}
                      onChange={(e) => handlePlayerChange(index, "email", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={player.phone}
                      onChange={(e) => handlePlayerChange(index, "phone", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Age"
                      value={player.age}
                      onChange={(e) => handlePlayerChange(index, "age", e.target.value)}
                      className="form-input"
                      min="10"
                      max="100"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="status-message success"
              >
                ✅ Team registered successfully!
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="status-message error"
              >
                ❌ Team registration failed. Please try again.
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />
                  Registering Team...
                </>
              ) : (
                <>
                  Register Team
                  <span className="button-arrow">→</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
