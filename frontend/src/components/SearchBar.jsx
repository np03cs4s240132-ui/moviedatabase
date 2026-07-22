function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search movies by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}

export default SearchBar;
