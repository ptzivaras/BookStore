import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookByIsbn, updateBookRating } from "../services/api";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";

import RatingStars from "../components/RatingStars";
import FavoriteButton from "../components/FavoriteButton";

export default function BookDetail() {
  const { isbn } = useParams();

  const { showLoading, hideLoading } = useLoading();
  const toast = useToast();

  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        showLoading();
        const data = await getBookByIsbn(isbn);
        if (!alive) return;
        setBook(data);
      } catch {
        setError("Book not found.");
        toast.showError("Book not found.");
      } finally {
        hideLoading();
      }
    };

    load();
    return () => (alive = false);
  }, [isbn]);

  const handleRating = async (rating) => {
    try {
      toast.showInfo("Saving rating...");
      const updated = await updateBookRating(isbn, rating);
      setBook(updated);
      toast.showSuccess("Rating updated!");
    } catch {
      toast.showError("Failed to update rating.");
    }
  };

  if (error) {
    return (
      <div className="p-6 text-center dark:text-slate-200">
        <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
        <Link
          to="/books"
          className="inline-block mt-4 text-blue-600 dark:text-blue-400"
        >
          Back to Books
        </Link>
      </div>
    );
  }

  if (!book) return null;

  const cover =
    book.cover?.trim()
      ? book.cover
      : `https://picsum.photos/seed/${book.isbn}/600/800`;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-8">

        {/* Cover */}
        <img
          src={cover}
          alt={book.title}
          className="w-56 h-80 rounded-lg object-cover shadow-md mx-auto md:mx-0"
        />

        {/* Details */}
        <div className="flex flex-col justify-between flex-1">

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold dark:text-slate-100">
              {book.title}
            </h1>
            <p className="mt-1 text-gray-700 dark:text-slate-300 text-lg">
              By {book.author}
            </p>

            {/* Rating */}
            <div className="mt-3">
              <RatingStars value={book.rating} onChange={handleRating} />
            </div>

            {/* Favorites */}
            <div className="mt-4">
              <FavoriteButton isbn={book.isbn} />
            </div>

            {/* Description */}
            <p className="mt-5 text-gray-800 dark:text-slate-300 leading-relaxed">
              {book.description}
            </p>

            {/* Info Fields */}
            <div className="mt-5 text-sm text-gray-600 dark:text-slate-400 space-y-1">
              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>
              <p>
                <strong>Year:</strong>{" "}
                {new Date(book.published).getFullYear()}
              </p>
              <p>
                <strong>Pages:</strong> {book.pages}
              </p>
              <p>
                <strong>Category:</strong> {book.category}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <Link
              to={`/edit/${isbn}`}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Book
            </Link>

            <Link
              to="/books"
              className="px-4 py-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-700"
            >
              Back
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
