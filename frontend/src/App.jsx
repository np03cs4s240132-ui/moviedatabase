import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import AddMovieForm from "./components/AddMovieForm";
import MovieGrid from "./components/MovieGrid";
import MovieDetail from "./components/MovieDetail";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { createMovie, fetchMovies } from "./services/api";
import Chatbot from "./components/Chatbot";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activeView, setActiveView] = useState("browse");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalMovies, setTotalMovies] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const loadMovies = async (search = "") => {
    setLoading(true);
    setError("");

    try {
      const params = search ? { search } : {};
      const data = await fetchMovies(params);
      setMovies(data);
    } catch (err) {
      setError("Failed to load movies. Make sure the backend server is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeView === "browse" && !selectedMovie) {
        loadMovies(searchQuery.trim());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, activeView, selectedMovie]);

  useEffect(() => {
    setTotalMovies(movies.length);

    if (movies.length === 0) {
      setAverageRating(0);
      return;
    }

    const totalRating = movies.reduce(
      (sum, movie) => sum + (movie.avgRating ?? movie.rating ?? 0),
      0
    );
    setAverageRating(totalRating / movies.length);
  }, [movies]);

  const displayedMovies = useMemo(() => {
    if (activeView === "watchlist") {
      return watchlist;
    }
    return movies;
  }, [activeView, movies, watchlist]);

  const handleAddMovie = async (movieData) => {
    const newMovie = await createMovie(movieData);
    setMovies((prev) => [...prev, newMovie]);
    setActiveView("browse");
  };

  const handleToggleWatchlist = (movie) => {
    const movieId = movie._id || movie.id;

    setWatchlist((prev) => {
      const exists = prev.some((item) => (item._id || item.id) === movieId);
      if (exists) {
        return prev.filter((item) => (item._id || item.id) !== movieId);
      }
      return [...prev, movie];
    });
  };

  const isInWatchlist = (movie) => {
    const movieId = movie?._id || movie?.id;
    return watchlist.some((item) => (item._id || item.id) === movieId);
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {activeView === "browse" && !selectedMovie && (
          <>
            <Dashboard
              totalMovies={totalMovies}
              averageRating={averageRating}
            />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </>
        )}

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{error}</p>
        )}

        {loading && activeView === "browse" && !selectedMovie && (
          <p className="text-center text-gray-500">Loading movies...</p>
        )}

        {activeView === "add" && (
          <AddMovieForm onAddMovie={handleAddMovie} />
        )}

        {activeView === "login" && (
          <Login
            onSuccess={() => setActiveView("browse")}
            onSwitchToRegister={() => setActiveView("register")}
          />
        )}

        {activeView === "register" && (
          <Register
            onSuccess={() => setActiveView("browse")}
            onSwitchToLogin={() => setActiveView("login")}
          />
        )}

        {activeView === "browse" && selectedMovie && (
          <MovieDetail
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
            isInWatchlist={isInWatchlist(selectedMovie)}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {activeView === "browse" && !selectedMovie && !loading && (
          <MovieGrid
            movies={displayedMovies}
            onMovieClick={setSelectedMovie}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {activeView === "watchlist" && selectedMovie && (
          <MovieDetail
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
            isInWatchlist={isInWatchlist(selectedMovie)}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {activeView === "watchlist" && !selectedMovie && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">My Watchlist</h2>
            <MovieGrid
              movies={displayedMovies}
              onMovieClick={setSelectedMovie}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />
          </>
        )}
      </main>
      <Chatbot />
    </div>
  );
}

export default App;