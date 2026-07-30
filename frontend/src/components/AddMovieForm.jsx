import { useState } from "react";

function AddMovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [rating, setRating] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre || !year || !director || !synopsis || rating === "") {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      await onAddMovie({
        title,
        genre,
        year: Number(year),
        director,
        synopsis,
        avgRating: Number(rating),
      });

      setTitle("");
      setGenre("");
      setYear("");
      setDirector("");
      setSynopsis("");
      setRating("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-4 rounded-xl bg-white p-6 shadow-md sm:grid-cols-2"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-900 sm:col-span-2">
        Add a New Movie
      </h2>

      <input
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <input
        type="text"
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <input
        type="number"
        step="0.1"
        min="0"
        max="10"
        placeholder="Rating (0-10)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <textarea
        placeholder="Synopsis"
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
        className="min-h-28 resize-none rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 sm:col-span-2"
      />

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60 sm:col-span-2"
      >
        {submitting ? "Adding..." : "Add Movie"}
      </button>
    </form>
  );
}

export default AddMovieForm;