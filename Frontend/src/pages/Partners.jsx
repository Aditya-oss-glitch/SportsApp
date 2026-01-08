import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

const defaultPartners = [
  {
    name: "Sports Academy",
    type: "Academy",
    logo: "🏫",
    description: "Premier sports training facility",
    contact: "academy@sports.com",
  },
  {
    name: "Champion Sponsors",
    type: "Sponsor",
    logo: "💼",
    description: "Leading sports event sponsors",
    contact: "sponsor@champion.com",
  },
  {
    name: "Event Masters",
    type: "Event Manager",
    logo: "🎯",
    description: "Professional event management services",
    contact: "events@masters.com",
  },
  {
    name: "Elite Sports Gear",
    type: "Sponsor",
    logo: "⚽",
    description: "Premium sports equipment provider",
    contact: "gear@elite.com",
  },
];

const partnerTypeIcons = {
  sponsor: "💼",
  academy: "🏫",
  manager: "🎯",
  equipment: "⚽",
};

const partnerTypeLabels = {
  sponsor: "Sponsor",
  academy: "Sports Academy",
  manager: "Event Manager",
  equipment: "Equipment Provider",
};

export default function Partners() {
  const [partners, setPartners] = useState(defaultPartners);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch partners from backend
    const fetchPartners = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.PARTNERS);
        if (response.ok) {
          const data = await response.json();
          if (data.partners && data.partners.length > 0) {
            // Transform backend data to match frontend format
            const transformedPartners = data.partners.map((partner) => ({
              name: partner.organizationName,
              type: partnerTypeLabels[partner.partnerType] || partner.partnerType,
              logo: partnerTypeIcons[partner.partnerType] || "🤝",
              description: partner.description || partner.services || "Sports partner",
              contact: partner.email,
              website: partner.website,
              address: partner.address,
            }));
            setPartners(transformedPartners);
          }
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
        // Keep default partners if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);
  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        />
        <p>Loading partners...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="partners-page"
    >
      <div className="partners-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="partners-header"
        >
          <h1>
            <span className="header-icon">🤝</span>
            Our Partners
          </h1>
          <p>Working together to bring you the best sports experience</p>
        </motion.div>

        {partners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-state"
          >
            <div className="empty-icon">🤝</div>
            <p>No partners found</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="partners-grid"
          >
            {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="partner-card"
            >
              <div className="partner-logo">{partner.logo}</div>
              <div className="partner-type">{partner.type}</div>
              <h3>{partner.name}</h3>
              <p>{partner.description}</p>
              <div className="partner-contact">
                <span className="contact-icon">📧</span>
                {partner.contact}
              </div>
              {partner.website && (
                <div className="partner-website">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="website-link">
                    Visit Website →
                  </a>
                </div>
              )}
            </motion.div>
          ))}
          </motion.div>
        )}

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="become-partner"
        >
          <h2>Become a Partner</h2>
          <p>Join us in promoting sports and building a stronger community</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/partner-register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
              >
                Register as Partner
                <span className="btn-arrow">→</span>
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
              >
                Login
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
