import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import register from "./routes/register.js";
import teams from "./routes/teams.js";
import tournaments from "./routes/tournaments.js";
import sports from "./routes/sports.js";
import partners from "./routes/partners.js";
import admin from "./routes/admin.js";
import captains from "./routes/captains.js";

dotenv.config();

const app = express();

// CORS configuration - allow frontend to connect
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173", // Vite default port for local development
  "http://localhost:3000", // Alternative local port
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow requests from allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      // In production, allow any Render URL
      if (origin.includes(".onrender.com") || origin.includes(".render.com")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "SportsHub API is running",
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/register", register);
app.use("/api/teams", teams);
app.use("/api/tournaments", tournaments);
app.use("/api/sports", sports);
app.use("/api/partners", partners);
app.use("/api/admin", admin);
app.use("/api/captains", captains);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    path: req.path 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});