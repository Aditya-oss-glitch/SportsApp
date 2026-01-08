import { motion } from "framer-motion";
import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

const sports = [
  "Cricket",
  "Football",
  "Basketball",
  "Volleyball",
  "Chess",
  "Badminton",
];

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    age: "",
    email: "",
    phone: "",
    experience: "",
    skillLevel: "",
    position: "",
    rating: "",
    bio: "",
    achievements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          sport: formData.sport,
          age: parseInt(formData.age),
          email: formData.email,
          phone: formData.phone,
          experience: formData.experience || "0",
          skillLevel: formData.skillLevel || "Beginner",
          position: formData.position || "",
          rating: parseFloat(formData.rating) || 0,
          bio: formData.bio || "",
          achievements: formData.achievements || "",
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ 
          name: "", 
          sport: "", 
          age: "", 
          email: "", 
          phone: "",
          experience: "",
          skillLevel: "",
          position: "",
          rating: "",
          bio: "",
          achievements: "",
        });
      } else {
        setSubmitStatus("error");
        console.error("Registration failed:", data.error || data.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Registration error:", error);
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
      <div className="register-container">
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
              ✍️
            </motion.div>
            <h2>Player Registration</h2>
            <p>Join our sports community and start competing</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="form-group"
            >
              <label htmlFor="name">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
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
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="form-group"
            >
              <label htmlFor="phone">
                <span className="label-icon">📱</span>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="form-group"
            >
              <label htmlFor="sport">
                <span className="label-icon">🏆</span>
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

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="form-group"
            >
              <label htmlFor="age">
                <span className="label-icon">🎂</span>
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="10"
                max="100"
                required
                className="form-input"
              />
            </motion.div>

            <div className="section-divider">
              <h3>Player Information</h3>
            </div>

            <div className="form-row">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="form-group"
              >
                <label htmlFor="experience">
                  <span className="label-icon">⏱️</span>
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  max="50"
                  className="form-input"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="form-group"
              >
                <label htmlFor="skillLevel">
                  <span className="label-icon">⭐</span>
                  Skill Level
                </label>
                <select
                  id="skillLevel"
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
              </motion.div>
            </div>

            <div className="form-row">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="form-group"
              >
                <label htmlFor="position">
                  <span className="label-icon">📍</span>
                  Position/Role
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g., Striker, Point Guard, Batsman"
                  className="form-input"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="form-group"
              >
                <label htmlFor="rating">
                  <span className="label-icon">🏆</span>
                  Self Rating (1-10)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="5.0"
                  min="1"
                  max="10"
                  step="0.1"
                  className="form-input"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="form-group"
            >
              <label htmlFor="bio">
                <span className="label-icon">📝</span>
                Bio/About Me
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself as a player..."
                rows="3"
                className="form-input"
                style={{ resize: "vertical" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="form-group"
            >
              <label htmlFor="achievements">
                <span className="label-icon">🏅</span>
                Achievements (Optional)
              </label>
              <textarea
                id="achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="List your achievements, awards, or notable performances..."
                rows="2"
                className="form-input"
                style={{ resize: "vertical" }}
              />
            </motion.div>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="status-message success"
              >
                ✅ Registration successful! Welcome to SportsHub!
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="status-message error"
              >
                ❌ Registration failed. Please try again.
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
                  Registering...
                </>
              ) : (
                <>
                  Register Now
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