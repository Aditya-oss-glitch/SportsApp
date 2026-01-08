import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const partnerTypes = [
  { value: "sponsor", label: "Sponsor", icon: "💼", description: "Sponsor sports events and tournaments" },
  { value: "academy", label: "Sports Academy", icon: "🏫", description: "Training facilities and academies" },
  { value: "manager", label: "Event Manager", icon: "🎯", description: "Professional event management services" },
  { value: "equipment", label: "Equipment Provider", icon: "⚽", description: "Sports equipment and gear suppliers" },
];

export default function PartnerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partnerType: "",
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    description: "",
    services: "",
    password: "",
    confirmPassword: "",
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.PARTNERS_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerType: formData.partnerType,
          organizationName: formData.organizationName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          address: formData.address,
          description: formData.description,
          services: formData.services,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Store partner info in localStorage for session
        localStorage.setItem("partnerData", JSON.stringify({
          email: formData.email,
          organizationName: formData.organizationName,
          partnerType: formData.partnerType,
        }));
        
        setTimeout(() => {
          navigate("/partner-dashboard");
        }, 2000);
      } else {
        setSubmitStatus("error");
        console.error("Partner registration failed:", data.error || data.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Partner registration error:", error);
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
      <div className="register-container" style={{ maxWidth: "900px" }}>
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
              🤝
            </motion.div>
            <h2>Partner Registration</h2>
            <p>Join SportsHub as a partner and grow your business</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="form-group"
            >
              <label htmlFor="partnerType">
                <span className="label-icon">🏢</span>
                Partner Type
              </label>
              <select
                id="partnerType"
                name="partnerType"
                value={formData.partnerType}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Partner Type</option>
                {partnerTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="form-group"
            >
              <label htmlFor="organizationName">
                <span className="label-icon">🏢</span>
                Organization Name
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Your organization name"
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
              <label htmlFor="contactPerson">
                <span className="label-icon">👤</span>
                Contact Person Name
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Primary contact person"
                required
                className="form-input"
              />
            </motion.div>

            <div className="form-row">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
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
                  placeholder="contact@organization.com"
                  required
                  className="form-input"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
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
            </div>

            <div className="form-row">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="form-group"
              >
                <label htmlFor="website">
                  <span className="label-icon">🌐</span>
                  Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                  className="form-input"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="form-group"
              >
                <label htmlFor="address">
                  <span className="label-icon">📍</span>
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, City, State, ZIP"
                  required
                  className="form-input"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="form-group"
            >
              <label htmlFor="description">
                <span className="label-icon">📝</span>
                Organization Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your organization..."
                rows="4"
                required
                className="form-input"
                style={{ resize: "vertical" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="form-group"
            >
              <label htmlFor="services">
                <span className="label-icon">🎯</span>
                Services Offered
              </label>
              <textarea
                id="services"
                name="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="List the services you offer..."
                rows="3"
                required
                className="form-input"
                style={{ resize: "vertical" }}
              />
            </motion.div>

            <div className="section-divider">
              <h3>Account Credentials</h3>
            </div>

            <div className="form-row">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
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
                  placeholder="Create a password"
                  required
                  minLength="6"
                  className="form-input"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="form-group"
              >
                <label htmlFor="confirmPassword">
                  <span className="label-icon">🔒</span>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  minLength="6"
                  className="form-input"
                />
              </motion.div>
            </div>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="status-message success"
              >
                ✅ Partner registration successful! Redirecting to dashboard...
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="status-message error"
              >
                ❌ Registration failed. Please check your information and try again.
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />
                  Registering Partner...
                </>
              ) : (
                <>
                  Register as Partner
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


