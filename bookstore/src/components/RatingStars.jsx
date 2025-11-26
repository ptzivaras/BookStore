import { useState } from "react";

export default function RatingStars({ value = 0, onChange }) {
  const [hover, setHover] = useState(0);

  const visibleValue = hover || value;

  return (
    <div className="flex gap-1 cursor-pointer select-none">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange && onChange(n)}
          className={
            visibleValue >= n
              ? "text-yellow-500 text-2xl"
              : "text-gray-300 text-2xl"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}
