const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    comment: { type: String, default: "" },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    director: { type: String, required: true, trim: true },
    synopsis: { type: String, required: true },
    avgRating: { type: Number, default: 0 },
    cast: { type: [String], default: [] },
    poster: { type: String, default: "" },
    reviews: { type: [reviewSchema], default: [] },
  },
  { timestamps: true }
);

movieSchema.index({ title: "text" });

module.exports = mongoose.model("Movie", movieSchema);
