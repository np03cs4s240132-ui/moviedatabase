function Dashboard({ totalMovies, averageRating }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl bg-white p-5 shadow-md">
        <p className="text-sm text-gray-500">Total Movies</p>
        <p className="text-3xl font-bold text-gray-900">{totalMovies}</p>
      </div>
      <div className="rounded-xl bg-white p-5 shadow-md">
        <p className="text-sm text-gray-500">Average Rating</p>
        <p className="text-3xl font-bold text-gray-900">
          {averageRating.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
