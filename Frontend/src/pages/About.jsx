import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="about-page"
    >
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="about-header"
        >
          <h1>
            <span className="header-icon">🏆</span>
            About SportsHub
          </h1>
          <p className="about-tagline">All Sports. One Platform.</p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="about-section"
        >
          <h2>Our Vision</h2>
          <p>
            SportsHub is a centralized platform that connects players, teams, tournaments, 
            and partners in one unified ecosystem. We aim to make sports management 
            accessible, efficient, and enjoyable for everyone.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="about-section"
        >
          <h2>What We Offer</h2>
          <div className="features-grid">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="feature-item"
            >
              <div className="feature-icon">👥</div>
              <h3>Player Registration</h3>
              <p>Easy registration for individual players</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="feature-item"
            >
              <div className="feature-icon">🏆</div>
              <h3>Team Management</h3>
              <p>Register and manage your teams</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="feature-item"
            >
              <div className="feature-icon">📅</div>
              <h3>Tournament Organization</h3>
              <p>Create and manage tournaments</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="feature-item"
            >
              <div className="feature-icon">⚽</div>
              <h3>Match Management</h3>
              <p>Track fixtures, scores, and standings</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="about-section contact-section"
        >
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>info@sportshub.com</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <strong>Phone</strong>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Address</strong>
                <p>123 Sports Avenue, City, State 12345</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}


