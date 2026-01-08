import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [navItems, setNavItems] = useState([
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/register", label: "Register", icon: "✍️" },
    { path: "/team-register", label: "Team", icon: "👥" },
    { path: "/tournaments", label: "Tournaments", icon: "🏆" },
    { path: "/partners", label: "Partners", icon: "🤝" },
    { path: "/about", label: "About", icon: "ℹ️" },
    { path: "/admin", label: "Admin", icon: "⚙️" },
  ]);

  useEffect(() => {
    // Check user role and set navigation items accordingly
    try {
      const userRole = localStorage.getItem("userRole");
      const baseItems = [
        { path: "/", label: "Home", icon: "🏠" },
        { path: "/register", label: "Register", icon: "✍️" },
        { path: "/team-register", label: "Team", icon: "👥" },
        { path: "/tournaments", label: "Tournaments", icon: "🏆" },
        { path: "/partners", label: "Partners", icon: "🤝" },
        { path: "/about", label: "About", icon: "ℹ️" },
      ];
      
      if (userRole === "admin") {
        setNavItems([...baseItems, { path: "/admin-dashboard", label: "Admin", icon: "⚙️" }]);
      } else if (userRole === "partner") {
        setNavItems([...baseItems, { path: "/partner-dashboard", label: "My Dashboard", icon: "📊" }]);
      } else if (userRole === "captain") {
        setNavItems([...baseItems, { path: "/captain-dashboard", label: "My Team", icon: "👤" }]);
      } else {
        setNavItems([...baseItems, { path: "/login", label: "Login", icon: "🔐" }]);
      }
    } catch (error) {
      // If localStorage is not available, use default items
      console.error("Error accessing localStorage:", error);
      setNavItems([
        { path: "/", label: "Home", icon: "🏠" },
        { path: "/register", label: "Register", icon: "✍️" },
        { path: "/team-register", label: "Team", icon: "👥" },
        { path: "/tournaments", label: "Tournaments", icon: "🏆" },
        { path: "/partners", label: "Partners", icon: "🤝" },
        { path: "/about", label: "About", icon: "ℹ️" },
        { path: "/login", label: "Login", icon: "🔐" },
      ]);
    }
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="navbar"
    >
      <div className="navbar-container">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="navbar-logo"
        >
          <Link to="/">
            <span className="logo-icon">🏆</span>
            <span className="logo-text">SportsHub</span>
          </Link>
        </motion.div>

        <ul className="navbar-links">
          {navItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
