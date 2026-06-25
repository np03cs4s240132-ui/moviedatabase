import MovieCard from "./MovieCard";
import movies from "../data/movie";

function MovieGrid() {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie} 
        />
      ))}
    </div>
  );
}

export default MovieGrid;