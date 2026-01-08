import express from "express";
import { appendRow, getRows } from "../sheets.js";

const router = express.Router();

// Simple in-memory storage for partners (in production, use a database)
// This is just for demo - in real app, use proper database
let partnersStore = [];

// Validation helper
const validatePartnerRegistration = (req, res, next) => {
  const {
    partnerType,
    organizationName,
    contactPerson,
    email,
    phone,
    address,
    description,
    services,
    password,
  } = req.body;

  if (!partnerType || !partnerType.trim()) {
    return res.status(400).json({ error: "Partner type is required" });
  }

  if (!organizationName || organizationName.trim().length < 2) {
    return res.status(400).json({ error: "Organization name must be at least 2 characters" });
  }

  if (!contactPerson || contactPerson.trim().length < 2) {
    return res.status(400).json({ error: "Contact person name is required" });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  if (!phone || phone.trim().length < 10) {
    return res.status(400).json({ error: "Valid phone number is required" });
  }

  if (!address || address.trim().length < 5) {
    return res.status(400).json({ error: "Address is required" });
  }

  if (!description || description.trim().length < 10) {
    return res.status(400).json({ error: "Description must be at least 10 characters" });
  }

  if (!services || services.trim().length < 5) {
    return res.status(400).json({ error: "Services description is required" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  next();
};

// POST /api/partners/register - Register a new partner
router.post("/register", validatePartnerRegistration, async (req, res) => {
  try {
    const {
      partnerType,
      organizationName,
      contactPerson,
      email,
      phone,
      website,
      address,
      description,
      services,
      password,
    } = req.body;

    // Check if email already exists
    const existingPartner = partnersStore.find((p) => p.email === email);
    if (existingPartner) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      partnerType,
      organizationName.trim(),
      contactPerson.trim(),
      email.trim(),
      phone.trim(),
      website || "N/A",
      address.trim(),
      description.trim(),
      services.trim(),
    ];

    // Append to Google Sheets
    try {
      await appendRow("Partners", rowData);
    } catch (sheetsError) {
      console.error("Google Sheets error (non-fatal):", sheetsError.message);
    }

    // Store partner data (in production, hash password and use database)
    const partnerData = {
      id: Date.now().toString(),
      partnerType,
      organizationName: organizationName.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim(),
      phone: phone.trim(),
      website: website || "",
      address: address.trim(),
      description: description.trim(),
      services: services.trim(),
      password, // In production, hash this!
      createdAt: timestamp,
    };

    partnersStore.push(partnerData);

    console.log(`✅ New partner registration: ${organizationName} - ${partnerType}`);

    // Return partner data (without password)
    const { password: _, ...partnerResponse } = partnerData;

    res.status(201).json({
      success: true,
      message: "Partner registered successfully!",
      partner: partnerResponse,
    });
  } catch (error) {
    console.error("Partner registration error:", error);
    res.status(500).json({
      error: "Failed to process partner registration",
      message: error.message,
    });
  }
});

// POST /api/partners/login - Partner login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find partner (in production, use database and hash comparison)
    const partner = partnersStore.find(
      (p) => p.email === email && p.password === password
    );

    if (!partner) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return partner data (without password)
    const { password: _, ...partnerResponse } = partner;

    res.json({
      success: true,
      message: "Login successful",
      partner: partnerResponse,
      token: "authenticated", // In production, use JWT
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Failed to process login",
      message: error.message,
    });
  }
});

// GET /api/partners/:email - Get partner by email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find partner
    const partner = partnersStore.find((p) => p.email === email);

    if (!partner) {
      // Try to load from Google Sheets
      try {
        const rows = await getRows("Partners");
        if (rows && rows.length > 1) {
          const partnerRow = rows.find((row) => row[4] === email); // Email is column 4
          if (partnerRow) {
            const partnerFromSheet = {
              id: partnerRow[0],
              partnerType: partnerRow[1],
              organizationName: partnerRow[2],
              contactPerson: partnerRow[3],
              email: partnerRow[4],
              phone: partnerRow[5],
              website: partnerRow[6],
              address: partnerRow[7],
              description: partnerRow[8],
              services: partnerRow[9],
            };
            return res.json({
              success: true,
              partner: partnerFromSheet,
            });
          }
        }
      } catch (sheetsError) {
        console.error("Error fetching from sheets:", sheetsError);
      }

      return res.status(404).json({ error: "Partner not found" });
    }

    // Return partner data (without password)
    const { password: _, ...partnerResponse } = partner;

    res.json({
      success: true,
      partner: partnerResponse,
    });
  } catch (error) {
    console.error("Error fetching partner:", error);
    res.status(500).json({
      error: "Failed to fetch partner data",
      message: error.message,
    });
  }
});

// GET /api/partners - Get all partners (for admin)
router.get("/", async (req, res) => {
  try {
    // Return all partners without passwords
    const partners = partnersStore.map(({ password: _, ...partner }) => partner);

    res.json({
      success: true,
      count: partners.length,
      partners,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch partners",
      message: error.message,
    });
  }
});

export default router;


