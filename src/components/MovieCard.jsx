function MovieCard({ movie }) {
  let badgeColor = "";

  if (movie.rating >= 8) {
    badgeColor = "green";
  } else if (movie.rating >= 5) {
    badgeColor = "amber";
  } else {
    badgeColor = "red";
  }

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />

      <h3>{movie.title}</h3>

      <p>{movie.genre}</p>

      <p>{movie.year}</p>

      <span className={`badge ${badgeColor}`}>
        ⭐ {movie.rating}
      </span>
    </div>
  );
}

export default MovieCard;