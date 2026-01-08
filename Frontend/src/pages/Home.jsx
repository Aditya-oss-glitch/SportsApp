import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const sports = [
  { name: "Cricket", icon: "🏏", color: "#FF6B6B" },
  { name: "Football", icon: "⚽", color: "#4ECDC4" },
  { name: "Basketball", icon: "🏀", color: "#45B7D1" },
  { name: "Volleyball", icon: "🏐", color: "#FFA07A" },
  { name: "Chess", icon: "♟️", color: "#98D8C8" },
  { name: "Badminton", icon: "🏸", color: "#F7DC6F" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSportClick = (sportName) => {
    navigate(`/sport/${sportName.toLowerCase()}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-section"
      >
        <div className="hero-background" />
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="floating-shapes"
        >
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </motion.div>

        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-title"
          >
            All Sports.
            <br />
            <span className="gradient-text">One Platform.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-subtitle"
          >
            Join tournaments, compete with the best, and showcase your skills
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-buttons"
          >
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
              >
                Register as Player
                <span className="btn-arrow">→</span>
              </motion.button>
            </Link>
            <Link to="/team-register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
              >
                Register Team
              </motion.button>
            </Link>
            <Link to="/tournaments">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
              >
                View Tournaments
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Sports Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="sports-section"
      >
        <motion.h2 variants={itemVariants} className="section-title">
          Choose Your Sport
        </motion.h2>
        <motion.p variants={itemVariants} className="section-subtitle">
          Select from our wide range of sports and start competing today
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="sports-grid"
        >
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="sport-card"
              style={{ "--sport-color": sport.color }}
              onClick={() => handleSportClick(sport.name)}
            >
              <div className="sport-icon">{sport.icon}</div>
              <h3 className="sport-name">{sport.name}</h3>
              <p className="sport-click-hint">Click to learn more →</p>
              <div className="sport-glow" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="features-section"
      >
        <div className="features-container">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="feature-card"
          >
            <div className="feature-icon">⚡</div>
            <h3>Quick Registration</h3>
            <p>Register in seconds and join tournaments instantly</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="feature-card"
          >
            <div className="feature-icon">🎯</div>
            <h3>Fair Competition</h3>
            <p>Compete with players of similar skill levels</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="feature-card"
          >
            <div className="feature-icon">🏅</div>
            <h3>Track Progress</h3>
            <p>Monitor your performance and climb the leaderboard</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}