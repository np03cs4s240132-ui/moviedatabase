const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { genre, search } = req.query;
    const filter = {};

    if (genre) {
      filter.genre = new RegExp(`^${genre}$`, "i");
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, genre, year, director, synopsis } = req.body;

    if (!title || !genre || !year || !director || !synopsis) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const movie = await Movie.create({
      title,
      genre,
      year,
      director,
      synopsis,
      avgRating: 0,
      reviews: [],
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
