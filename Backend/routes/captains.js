import express from "express";
import { getRows } from "../sheets.js";

const router = express.Router();

// Simple in-memory storage for captains (in production, use database)
let captainsStore = [];

// POST /api/captains/login - Team captain login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find captain in store
    let captain = captainsStore.find(
      (c) => c.captainEmail === email && c.password === password
    );

    // If not found in store, try to load from Google Sheets
    if (!captain) {
      try {
        const rows = await getRows("Teams");
        if (rows && rows.length > 1) {
          // Skip header row
          const captainRow = rows.find((row) => row[4] === email); // Email is column 4
          if (captainRow) {
            // For demo, we'll create a captain object from sheet data
            // In production, you'd have a separate captains table
            captain = {
              id: captainRow[0],
              teamName: captainRow[1],
              sport: captainRow[2],
              captainName: captainRow[3],
              captainEmail: captainRow[4],
              captainPhone: captainRow[5],
              password: "default123", // In production, store hashed passwords
            };
          }
        }
      } catch (sheetsError) {
        console.error("Error fetching from sheets:", sheetsError);
      }
    }

    if (!captain) {
      return res.status(401).json({ error: "Invalid credentials or team not registered" });
    }

    // Return captain data (without password)
    const { password: _, ...captainResponse } = captain;

    res.json({
      success: true,
      message: "Captain login successful",
      captain: captainResponse,
      token: "captain-authenticated", // In production, use JWT
    });
  } catch (error) {
    console.error("Captain login error:", error);
    res.status(500).json({
      error: "Failed to process login",
      message: error.message,
    });
  }
});

// GET /api/captains/:email - Get captain by email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find captain
    let captain = captainsStore.find((c) => c.captainEmail === email);

    if (!captain) {
      // Try to load from Google Sheets
      try {
        const rows = await getRows("Teams");
        if (rows && rows.length > 1) {
          const captainRow = rows.find((row) => row[4] === email);
          if (captainRow) {
            captain = {
              id: captainRow[0],
              teamName: captainRow[1],
              sport: captainRow[2],
              captainName: captainRow[3],
              captainEmail: captainRow[4],
              captainPhone: captainRow[5],
            };
          }
        }
      } catch (sheetsError) {
        console.error("Error fetching from sheets:", sheetsError);
      }

      if (!captain) {
        return res.status(404).json({ error: "Captain not found" });
      }
    }

    // Return captain data (without password)
    const { password: _, ...captainResponse } = captain;

    res.json({
      success: true,
      captain: captainResponse,
    });
  } catch (error) {
    console.error("Error fetching captain:", error);
    res.status(500).json({
      error: "Failed to fetch captain data",
      message: error.message,
    });
  }
});

// Store captain when team is registered (called from teams route)
export const addCaptain = (captainData) => {
  captainsStore.push(captainData);
};

export default router;


