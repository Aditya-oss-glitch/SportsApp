import express from "express";

const router = express.Router();

// Comprehensive sports data
const sportsInfo = {
  Cricket: {
    name: "Cricket",
    icon: "🏏",
    description: "A bat-and-ball game played between two teams of eleven players",
    formats: ["T20", "ODI", "Test Match"],
    players: 11,
    duration: "3-8 hours depending on format"
  },
  Football: {
    name: "Football",
    icon: "⚽",
    description: "A team sport played between two teams of 11 players using a spherical ball",
    formats: ["90 Minutes", "Extra Time", "Penalty Shootout"],
    players: 11,
    duration: "90 minutes + stoppage time"
  },
  Basketball: {
    name: "Basketball",
    icon: "🏀",
    description: "A team sport where two teams of five players try to score points",
    formats: ["4 Quarters", "Overtime", "3x3"],
    players: 5,
    duration: "40-48 minutes (game time)"
  },
  Volleyball: {
    name: "Volleyball",
    icon: "🏐",
    description: "A team sport where two teams of six players are separated by a net",
    formats: ["Best of 5 Sets", "Beach Volleyball"],
    players: 6,
    duration: "60-90 minutes"
  },
  Chess: {
    name: "Chess",
    icon: "♟️",
    description: "A strategic board game for two players",
    formats: ["Classical", "Rapid", "Blitz", "Bullet"],
    players: 2,
    duration: "Varies by time control"
  },
  Badminton: {
    name: "Badminton",
    icon: "🏸",
    description: "A racquet sport played using racquets to hit a shuttlecock across a net",
    formats: ["Singles", "Doubles", "Mixed Doubles"],
    players: "1-2 per side",
    duration: "30-60 minutes"
  }
};

// GET /api/sports - Get all sports
router.get("/", (req, res) => {
  try {
    const sports = Object.values(sportsInfo).map(sport => ({
      name: sport.name,
      icon: sport.icon,
      description: sport.description,
      formats: sport.formats,
      players: sport.players,
      duration: sport.duration
    }));

    res.json({
      success: true,
      count: sports.length,
      sports
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch sports",
      message: error.message
    });
  }
});

// GET /api/sports/:sportName - Get specific sport details
router.get("/:sportName", (req, res) => {
  try {
    const sportName = req.params.sportName;
    const sportKey = sportName.charAt(0).toUpperCase() + sportName.slice(1);
    
    if (sportsInfo[sportKey]) {
      res.json({
        success: true,
        sport: sportsInfo[sportKey]
      });
    } else {
      res.status(404).json({
        error: "Sport not found",
        availableSports: Object.keys(sportsInfo)
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch sport details",
      message: error.message
    });
  }
});

export default router;