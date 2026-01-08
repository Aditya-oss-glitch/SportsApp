import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

// Mock data fallback
const mockTournaments = [
  {
    id: 1,
    name: "Summer Cricket Championship",
    sport: "Cricket",
    date: "2024-07-15",
    participants: 32,
    prize: "$5,000",
    status: "upcoming",
    icon: "🏏",
  },
  {
    id: 2,
    name: "Football League 2024",
    sport: "Football",
    date: "2024-07-20",
    participants: 48,
    prize: "$10,000",
    status: "upcoming",
    icon: "⚽",
  },
  {
    id: 3,
    name: "Basketball Showdown",
    sport: "Basketball",
    date: "2024-06-25",
    participants: 24,
    prize: "$3,500",
    status: "ongoing",
    icon: "🏀",
  },
  {
    id: 4,
    name: "Chess Masters Tournament",
    sport: "Chess",
    date: "2024-08-01",
    participants: 64,
    prize: "$2,000",
    status: "upcoming",
    icon: "♟️",
  },
];

export default function Tournament() {
  const [tournaments, setTournaments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.TOURNAMENTS);
        if (response.ok) {
          const data = await response.json();
          // Handle both array response and object with tournaments property
          if (Array.isArray(data)) {
            setTournaments(data);
          } else if (data.tournaments && Array.isArray(data.tournaments)) {
            setTournaments(data.tournaments);
          } else {
            setTournaments(mockTournaments);
          }
        } else {
          console.error("Failed to fetch tournaments");
          setTournaments(mockTournaments);
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        // Use mock data if backend is not available
        setTournaments(mockTournaments);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const filteredTournaments =
    filter === "all"
      ? tournaments
      : tournaments.filter((t) => t.status === filter);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="tournament-page"
    >
      <div className="tournament-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="tournament-header"
        >
          <h1>
            <span className="header-icon">🏆</span>
            Tournaments
          </h1>
          <p>Discover and join exciting tournaments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="filter-tabs"
        >
          {["all", "upcoming", "ongoing"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`filter-tab ${filter === tab ? "active" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {isLoading ? (
          <div className="loading-container">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="loading-spinner"
            />
            <p>Loading tournaments...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="tournaments-grid"
          >
            {filteredTournaments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <div className="empty-icon">🔍</div>
                <p>No tournaments found</p>
              </motion.div>
            ) : (
              filteredTournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="tournament-card"
                >
                  <div className="tournament-card-header">
                    <div className="tournament-icon">{tournament.icon}</div>
                    <span className={`tournament-status ${tournament.status}`}>
                      {tournament.status}
                    </span>
                  </div>

                  <h3 className="tournament-name">{tournament.name}</h3>
                  <p className="tournament-sport">{tournament.sport}</p>

                  <div className="tournament-details">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{new Date(tournament.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span>{tournament.participants} participants</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">💰</span>
                      <span>{tournament.prize} prize</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="join-button"
                  >
                    {tournament.status === "ongoing" ? "View Details" : "Join Tournament"}
                    <span className="button-arrow">→</span>
                  </motion.button>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
