import RatingBadge from "./RatingBadge";

function MovieCard({ movie, onClick, isInWatchlist, onToggleWatchlist }) {
  const rating = movie.avgRating ?? movie.rating ?? 0;

  return (
    <article
      className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
      onClick={() => onClick(movie)}
    >
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-slate-300">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-4xl">🎬</span>
        )}
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{movie.title}</h3>
          <RatingBadge rating={rating} />
        </div>

        <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
          {movie.genre}
        </span>

        <p className="text-sm text-gray-500">{movie.year}</p>

        <button
          type="button"
          className={`w-full rounded-md px-3 py-2 text-sm font-medium transition ${
            isInWatchlist
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(movie);
          }}
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
