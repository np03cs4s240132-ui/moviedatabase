import RatingBadge from "./RatingBadge";

function MovieDetail({ movie, onBack, isInWatchlist, onToggleWatchlist }) {
  if (!movie) return null;

  const rating = movie.avgRating ?? movie.rating ?? 0;
  const cast = movie.cast || [];

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        ← Back to Browse
      </button>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex h-72 w-full shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-slate-300 md:w-48">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <span className="text-5xl">🎬</span>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900">{movie.title}</h2>
            <RatingBadge rating={rating} />
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
              {movie.genre}
            </span>
            <span>{movie.year}</span>
            <span>Director: {movie.director}</span>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">Synopsis</h3>
            <p className="leading-relaxed text-gray-700">{movie.synopsis}</p>
          </div>

          {cast.length > 0 && (
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">Cast</h3>
              <ul className="flex flex-wrap gap-2">
                {cast.map((member) => (
                  <li
                    key={member}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              isInWatchlist
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => onToggleWatchlist(movie)}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
