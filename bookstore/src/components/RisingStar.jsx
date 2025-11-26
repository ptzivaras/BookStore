import { useEffect, useState } from "react";
import { getRisingStars } from "../services/api";
import { useLoading } from "../context/LoadingContext";

export default function RisingStar() {
  const [stars, setStars] = useState([]);
  const [index, setIndex] = useState(0);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        showLoading();
        const data = await getRisingStars();
        if (!alive) return;
        setStars(Array.isArray(data) ? data : []);
      } finally {
        hideLoading();
      }
    };

    load();
    return () => (alive = false);
  }, []);

  if (stars.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % stars.length);
  const prev = () => setIndex((i) => (i - 1 + stars.length) % stars.length);

  const book = stars[index];

  const cover =
    book.cover?.trim()
      ? book.cover
      : `https://picsum.photos/seed/${book.isbn}/300/400`;

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow rounded-xl p-6 mb-10 transition">
      
      <h2 className="text-2xl font-bold mb-5 text-slate-800 dark:text-gray-100">
        Rising Stars of the Month
      </h2>

      <div className="flex items-center justify-center relative px-10">

        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-0 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-full transition"
        >
          ◀
        </button>

        {/* Main Card */}
        <div className="text-center w-64">
          <img
            src={cover}
            alt={book.title}
            className="w-40 h-56 mx-auto object-cover rounded shadow-md"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-gray-100">
            {book.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300">By {book.author}</p>

          <p className="text-yellow-500 dark:text-yellow-400 font-bold mt-1">
            ⭐ {book.rating}
          </p>
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-0 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-full transition"
        >
          ▶
        </button>
      </div>

      {/* Carousel dots */}
      <div className="flex justify-center mt-4 gap-2">
        {stars.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i === index
                ? "bg-blue-600 dark:bg-blue-400"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
