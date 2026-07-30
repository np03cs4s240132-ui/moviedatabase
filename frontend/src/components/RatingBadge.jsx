function RatingBadge({ rating }) {
  const numericRating = Number(rating) || 0;

  const colorClasses =
    numericRating >= 8
      ? "bg-green-100 text-green-800"
      : numericRating >= 5
      ? "bg-amber-100 text-amber-800"
      : "bg-red-100 text-red-800";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${colorClasses}`}
    >
      ⭐ {numericRating.toFixed(1)}
    </span>
  );
}

export default RatingBadge;