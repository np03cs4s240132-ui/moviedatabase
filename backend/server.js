import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import seedMovies from "./seed/seedMovies.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// ALLOWED FRONTEND ORIGINS
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://moviedatabase-cxq9.onrender.com",
];

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, server-to-server requests, etc.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(cookieParser());

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    message: "API is healthy",
  });
});

// ==========================================
// HOME / TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Movie Database API is running",
  });
});

// ==========================================
// AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

// ==========================================
// MOVIE ROUTES
// ==========================================

app.use("/api/movies", movieRoutes);

// ==========================================
// AI ROUTES
// ==========================================

app.use("/api/ai", aiRoutes);

// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {
  try {
    await connectDB();

    await seedMovies();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();