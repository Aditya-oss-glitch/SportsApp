import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const userRoles = [
  { value: "admin", label: "Admin", icon: "⚙️", description: "Tournament and system administrator" },
  { value: "partner", label: "Partner", icon: "🤝", description: "Sponsors, academies, and event managers" },
  { value: "captain", label: "Team Captain", icon: "👤", description: "Team captain and manager" },
];

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.role) {
      setError("Please select your role");
      setIsSubmitting(false);
      return;
    }

    try {
      let response;
      let endpoint;

      // Route to appropriate login endpoint based on role
      switch (formData.role) {
        case "admin":
          endpoint = API_ENDPOINTS.ADMIN_LOGIN;
          break;
        case "partner":
          endpoint = API_ENDPOINTS.PARTNERS_LOGIN;
          break;
        case "captain":
          endpoint = API_ENDPOINTS.CAPTAIN_LOGIN;
          break;
        default:
          setError("Invalid role selected");
          setIsSubmitting(false);
          return;
      }

      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user session based on role
        localStorage.setItem("userRole", formData.role);
        localStorage.setItem("userData", JSON.stringify(data.user || data.partner || data.captain));
        localStorage.setItem("authToken", data.token || "authenticated");

        // Redirect to appropriate dashboard
        switch (formData.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "partner":
            navigate("/partner-dashboard");
            break;
          case "captain":
            navigate("/captain-dashboard");
            break;
        }
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedRole = userRoles.find((r) => r.value === formData.role);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="register-page"
    >
      <div className="register-container" style={{ maxWidth: "600px" }}>
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
              🔐
            </motion.div>
            <h2>Login</h2>
            <p>Access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="form-group"
            >
              <label htmlFor="role">
                <span className="label-icon">👤</span>
                I am a...
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select your role</option>
                {userRoles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.icon} {role.label} - {role.description}
                  </option>
                ))}
              </select>
              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="role-hint-container"
                >
                  <p className="role-hint">{selectedRole.description}</p>
                  {selectedRole.value === "captain" && (
                    <p className="role-password-hint">
                      Default password: <strong>default123</strong> (change after first login)
                    </p>
                  )}
                  {selectedRole.value === "admin" && (
                    <p className="role-password-hint">
                      Admin credentials: <strong>admin@sportshub.com</strong> / <strong>admin123</strong>
                    </p>
                  )}
                </motion.div>
              )}
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
                placeholder="your@email.com"
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
              <label htmlFor="password">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="status-message error"
              >
                ❌ {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <span className="button-arrow">→</span>
                </>
              )}
            </motion.button>

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <p style={{ color: "var(--text-secondary)" }}>
                Don't have an account?{" "}
                {formData.role === "partner" && (
                  <Link to="/partner-register" style={{ color: "var(--accent-color)", textDecoration: "none" }}>
                    Register as Partner
                  </Link>
                )}
                {formData.role === "captain" && (
                  <Link to="/team-register" style={{ color: "var(--accent-color)", textDecoration: "none" }}>
                    Register Your Team
                  </Link>
                )}
                {!formData.role && (
                  <span style={{ color: "var(--text-secondary)" }}>
                    Select a role to see registration options
                  </span>
                )}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
