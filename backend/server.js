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

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://moviedatabase-cxq9.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("The request is not allowed by CORS policy"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ message: "API is healthy" });
});
// Test route
app.get("/", (req, res) => {
  res.json({ message: "Movie Database API is running" });
});

app.use("/api/auth", authRoutes);
// Movie routes
app.use("/api/movies", movieRoutes);
app.use("/api/ai", aiRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await seedMovies();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();