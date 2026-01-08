import express from "express";
import { appendRow, getRows } from "../sheets.js";

const router = express.Router();

// Validation helper
const validateTournament = (req, res, next) => {
  const { name, sport, date, venue, format, prize } = req.body;

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ 
      error: "Tournament name must be at least 3 characters long" 
    });
  }

  if (!sport || !sport.trim()) {
    return res.status(400).json({ 
      error: "Sport is required" 
    });
  }

  if (!date) {
    return res.status(400).json({ 
      error: "Date is required" 
    });
  }

  if (!venue || venue.trim().length < 3) {
    return res.status(400).json({ 
      error: "Venue must be at least 3 characters long" 
    });
  }

  next();
};

// GET /api/tournaments - Get all tournaments
router.get("/", async (req, res) => {
  try {
    // Try to fetch from Google Sheets, fallback to mock data
    let tournaments = [];
    
    try {
      const rows = await getRows("Tournaments");
      if (rows && rows.length > 1) {
        // Skip header row
        tournaments = rows.slice(1).map((row, index) => ({
          id: index + 1,
          name: row[0] || "Unnamed Tournament",
          sport: row[1] || "Unknown",
          date: row[2] || new Date().toISOString().split("T")[0],
          venue: row[3] || "TBA",
          format: row[4] || "Standard",
          prize: row[5] || "$0",
          participants: parseInt(row[6]) || 0,
          status: row[7] || "upcoming",
          icon: getSportIcon(row[1] || "Unknown"),
        }));
      }
    } catch (sheetsError) {
      console.log("Using mock tournament data (Google Sheets not configured)");
    }

    // If no tournaments from sheets, use mock data
    if (tournaments.length === 0) {
      tournaments = [
        {
          id: 1,
          name: "Summer Cricket Championship",
          sport: "Cricket",
          date: "2024-07-15",
          venue: "Main Stadium",
          format: "T20",
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
          venue: "City Arena",
          format: "90 minutes",
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
          venue: "Sports Complex",
          format: "4 quarters",
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
          venue: "Convention Center",
          format: "Classical",
          participants: 64,
          prize: "$2,000",
          status: "upcoming",
          icon: "♟️",
        },
      ];
    }

    res.json({
      success: true,
      count: tournaments.length,
      tournaments,
    });
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    res.status(500).json({
      error: "Failed to fetch tournaments",
      message: error.message,
    });
  }
});

// POST /api/tournaments - Create a new tournament
router.post("/", validateTournament, async (req, res) => {
  try {
    const { name, sport, date, venue, format, prize } = req.body;

    const rowData = [
      name.trim(),
      sport.trim(),
      date,
      venue.trim(),
      format || "Standard",
      prize || "$0",
      0, // participants count
      "upcoming", // status
    ];

    // Append to Google Sheets (will work even if not configured)
    try {
      await appendRow("Tournaments", rowData);
    } catch (sheetsError) {
      // Log error but don't fail the creation
      console.error("Google Sheets error (non-fatal):", sheetsError.message);
    }

    console.log(`✅ New tournament created: ${name} - ${sport}`);

    res.status(201).json({
      success: true,
      message: "Tournament created successfully!",
      data: {
        name: name.trim(),
        sport: sport.trim(),
        date,
        venue: venue.trim(),
      },
    });
  } catch (error) {
    console.error("Tournament creation error:", error);
    res.status(500).json({
      error: "Failed to create tournament",
      message: error.message,
    });
  }
});

// Helper function to get sport icon
function getSportIcon(sport) {
  const icons = {
    Cricket: "🏏",
    Football: "⚽",
    Basketball: "🏀",
    Volleyball: "🏐",
    Chess: "♟️",
    Badminton: "🏸",
    "Table Tennis": "🏓",
  };
  return icons[sport] || "🏆";
}

export default router;