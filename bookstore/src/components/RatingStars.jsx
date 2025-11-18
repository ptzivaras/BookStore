import { memo } from "react";

function RatingStars({ value = 4 }) {
  return (
    <div className="flex gap-0.5 text-yellow-500 select-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default memo(RatingStars);
