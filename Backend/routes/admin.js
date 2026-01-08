import express from "express";

const router = express.Router();

// Simple admin credentials (in production, use database and hash passwords)
const ADMIN_CREDENTIALS = {
  email: "admin@sportshub.com",
  password: "admin123", // In production, hash this!
};

// POST /api/admin/login - Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminData = {
        id: "admin-001",
        email: ADMIN_CREDENTIALS.email,
        role: "admin",
        name: "System Administrator",
      };

      res.json({
        success: true,
        message: "Admin login successful",
        user: adminData,
        token: "admin-authenticated", // In production, use JWT
      });
    } else {
      res.status(401).json({ error: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      error: "Failed to process login",
      message: error.message,
    });
  }
});

export default router;


