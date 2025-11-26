import { useEffect, useState } from "react";
import { getRisingStar } from "../services/api";
import { useLoading } from "../context/LoadingContext";

const RisingStar = () => {
  const [book, setBook] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const loadStar = async () => {
      try {
        showLoading();
        const data = await getRisingStar();
        setBook(data);
      } finally {
        hideLoading();
      }
    };
    loadStar();
  }, []);

  if (!book) return null;

  return (
    <div className="border rounded-lg shadow p-5 bg-white mt-4">
      <h2 className="text-xl font-bold mb-3">Rising Star of the Month</h2>

      <div className="flex flex-col items-center text-center">
        <img
          src={book.cover || "/placeholder.jpg"}
          alt={book.title}
          className="w-40 h-56 object-cover rounded mb-3"
        />

        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600">By {book.author}</p>
        <p className="text-yellow-600 font-bold mt-2">⭐ {book.rating}</p>
        <p className="text-sm mt-3 text-gray-700">{book.description}</p>
      </div>
    </div>
  );
};

export default RisingStar;
