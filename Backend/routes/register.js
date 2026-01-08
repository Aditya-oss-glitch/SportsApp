import express from "express";
import { appendRow } from "../sheets.js";

const router = express.Router();

// Validation helper
const validateRegistration = (req, res, next) => {
  const { name, sport, age, email, phone, rating } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ 
      error: "Name must be at least 2 characters long" 
    });
  }

  if (!sport || !sport.trim()) {
    return res.status(400).json({ 
      error: "Sport is required" 
    });
  }

  if (!age || isNaN(age) || age < 10 || age > 100) {
    return res.status(400).json({ 
      error: "Age must be a number between 10 and 100" 
    });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ 
      error: "Valid email is required" 
    });
  }

  if (!phone || phone.trim().length < 10) {
    return res.status(400).json({ 
      error: "Valid phone number is required" 
    });
  }

  if (rating && (isNaN(rating) || rating < 1 || rating > 10)) {
    return res.status(400).json({ 
      error: "Rating must be between 1 and 10" 
    });
  }

  next();
};

// POST /api/register - Register a new player
router.post("/", validateRegistration, async (req, res) => {
  try {
    const { 
      name, 
      sport, 
      age, 
      email, 
      phone, 
      experience, 
      skillLevel, 
      position, 
      rating, 
      bio, 
      achievements 
    } = req.body;

    // Calculate overall rating if not provided
    const calculatedRating = rating 
      ? parseFloat(rating) 
      : calculateRating(experience, skillLevel);

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      name.trim(),
      email.trim(),
      phone.trim(),
      sport.trim(),
      parseInt(age),
      experience || "0",
      skillLevel || "Beginner",
      position || "",
      calculatedRating.toFixed(1),
      bio || "",
      achievements || "",
    ];

    // Append to Google Sheets (will work even if not configured)
    try {
      await appendRow("Registrations", rowData);
    } catch (sheetsError) {
      // Log error but don't fail the registration
      console.error("Google Sheets error (non-fatal):", sheetsError.message);
    }

    console.log(`✅ New registration: ${name} - ${sport}`);

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: {
        name: name.trim(),
        sport: sport.trim(),
        age: parseInt(age),
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Failed to process registration",
      message: error.message,
    });
  }
});

// GET /api/register - Get all registrations (for admin purposes)
router.get("/", async (req, res) => {
  try {
    // This would typically fetch from database or sheets
    res.json({
      message: "Registrations endpoint - GET not implemented yet",
      note: "Use POST to register a new player",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch registrations",
      message: error.message,
    });
  }
});

export default router;