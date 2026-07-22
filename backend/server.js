const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const seedMovies = require("./seed/seedMovies");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Movie Database API is running" });
});

app.use("/api/movies", movieRoutes);

const startServer = async () => {
  await connectDB();
  await seedMovies();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
