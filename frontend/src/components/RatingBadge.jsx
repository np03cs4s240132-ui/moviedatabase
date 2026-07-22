function RatingBadge({ rating }) {
  const score = Number(rating) || 0;

  let colorClass = "bg-red-500";
  if (score >= 8) {
    colorClass = "bg-green-500";
  } else if (score >= 5) {
    colorClass = "bg-amber-500";
  }

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold text-white ${colorClass}`}
    >
      {score.toFixed(1)}
    </span>
  );
}

export default RatingBadge;
