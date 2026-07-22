import MovieCard from "./MovieCard";

function MovieGrid({ movies, onMovieClick, watchlist, onToggleWatchlist }) {
  if (movies.length === 0) {
    return (
      <p className="rounded-lg bg-white p-8 text-center text-gray-500 shadow">
        No movies found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id || movie.id}
          movie={movie}
          onClick={onMovieClick}
          isInWatchlist={watchlist.some(
            (item) => (item._id || item.id) === (movie._id || movie.id)
          )}
          onToggleWatchlist={onToggleWatchlist}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
