import express from "express";
import { appendRow } from "../sheets.js";
import { addCaptain } from "./captains.js";

const router = express.Router();

// Validation helper
const validateTeam = (req, res, next) => {
  const { teamName, captainName, captainEmail, captainPhone, sport, players } = req.body;

  if (!teamName || teamName.trim().length < 2) {
    return res.status(400).json({ 
      error: "Team name must be at least 2 characters long" 
    });
  }

  if (!sport || !sport.trim()) {
    return res.status(400).json({ 
      error: "Sport is required" 
    });
  }

  if (!captainName || captainName.trim().length < 2) {
    return res.status(400).json({ 
      error: "Captain name is required" 
    });
  }

  if (!captainEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captainEmail)) {
    return res.status(400).json({ 
      error: "Valid captain email is required" 
    });
  }

  if (!captainPhone || captainPhone.trim().length < 10) {
    return res.status(400).json({ 
      error: "Valid captain phone number is required" 
    });
  }

  if (!players || !Array.isArray(players) || players.length === 0) {
    return res.status(400).json({ 
      error: "At least one player is required" 
    });
  }

  next();
};

// POST /api/teams - Register a new team
router.post("/", validateTeam, async (req, res) => {
  try {
    const { teamName, captainName, captainEmail, captainPhone, sport, players } = req.body;

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const playerNames = players.map(p => p.name).join(", ");
    const playerCount = players.length;

    const rowData = [
      timestamp,
      teamName.trim(),
      sport.trim(),
      captainName.trim(),
      captainEmail.trim(),
      captainPhone.trim(),
      playerCount,
      playerNames,
    ];

    // Append to Google Sheets (will work even if not configured)
    try {
      await appendRow("Teams", rowData);
    } catch (sheetsError) {
      // Log error but don't fail the registration
      console.error("Google Sheets error (non-fatal):", sheetsError.message);
    }

    console.log(`✅ New team registration: ${teamName} - ${sport} (${playerCount} players)`);

    // Store captain data for login (in production, hash password and use database)
    const captainData = {
      id: Date.now().toString(),
      teamName: teamName.trim(),
      sport: sport.trim(),
      captainName: captainName.trim(),
      captainEmail: captainEmail.trim(),
      captainPhone: captainPhone.trim(),
      players: players,
      password: "default123", // In production, use password from registration or generate one
      createdAt: timestamp,
    };

    // Add captain to captains store for login
    addCaptain(captainData);

    res.status(201).json({
      success: true,
      message: "Team registered successfully!",
      data: {
        teamName: teamName.trim(),
        sport: sport.trim(),
        captain: captainName.trim(),
        playerCount,
      },
    });
  } catch (error) {
    console.error("Team registration error:", error);
    res.status(500).json({
      error: "Failed to process team registration",
      message: error.message,
    });
  }
});

// GET /api/teams - Get all teams
router.get("/", async (req, res) => {
  try {
    res.json({
      message: "Teams endpoint - GET not fully implemented yet",
      note: "Use POST to register a new team",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch teams",
      message: error.message,
    });
  }
});

export default router;
