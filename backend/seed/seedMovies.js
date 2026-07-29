import Movie from "../models/Movie.js";

const sampleMovies = [
  {
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    director: "Christopher Nolan",
    synopsis:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    avgRating: 8.8,
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    poster: "https://via.placeholder.com/200x300?text=Inception",
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    director: "Christopher Nolan",
    synopsis:
      "Batman must accept one of the greatest psychological and physical tests to fight injustice.",
    avgRating: 9.0,
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    poster: "https://via.placeholder.com/200x300?text=Dark+Knight",
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    director: "Christopher Nolan",
    synopsis:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    avgRating: 8.6,
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    poster: "https://via.placeholder.com/200x300?text=Interstellar",
  },
  {
    title: "Avengers Endgame",
    genre: "Action",
    year: 2019,
    director: "Anthony Russo",
    synopsis:
      "After the devastating events, the Avengers assemble once more to reverse Thanos's actions.",
    avgRating: 8.4,
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    poster: "https://via.placeholder.com/200x300?text=Endgame",
  },
  {
    title: "Joker",
    genre: "Drama",
    year: 2019,
    director: "Todd Phillips",
    synopsis:
      "In Gotham City, a mentally troubled comedian is disregarded by society and spirals into madness.",
    avgRating: 7.9,
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    poster: "https://via.placeholder.com/200x300?text=Joker",
  },
];

const seedMovies = async () => {
  const count = await Movie.countDocuments();

  if (count === 0) {
    await Movie.insertMany(sampleMovies);
    console.log("Sample movies seeded successfully");
  }
};

export default seedMovies;
