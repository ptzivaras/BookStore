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

        if (Array.isArray(data)) {
          setStars(data);
        }
      } finally {
        hideLoading();
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, []);

  if (stars.length === 0) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % stars.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + stars.length) % stars.length);
  };

  const book = stars[index];

  return (
    <div className="w-full bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Rising Stars of the Month
      </h2>

      <div className="flex items-center justify-center gap-6 relative">
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-0 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-full"
        >
          ◀
        </button>

        {/* Card */}
        <div className="text-center w-64">
          <img
            src={book.cover || "/placeholder.jpg"}
            alt={book.title}
            className="w-40 h-56 mx-auto object-cover rounded shadow"
          />

          <h3 className="mt-3 text-lg font-semibold">{book.title}</h3>
          <p className="text-gray-600">By {book.author}</p>
          <p className="text-yellow-600 font-bold mt-1">⭐ {book.rating}</p>
          <p className="text-sm mt-2 text-gray-700">{book.description}</p>
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-0 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-full"
        >
          ▶
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {stars.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
