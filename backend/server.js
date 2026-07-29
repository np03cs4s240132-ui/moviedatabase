import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import seedMovies from "./seed/seedMovies.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Middleware
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("The request is not allowed by CORS policy"));
    },
    credentials: true, // lowercase 'c'
  })
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Movie Database API is running" });
});

// Movie routes
app.use("/api/movies", movieRoutes);

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