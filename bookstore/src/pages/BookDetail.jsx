import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookByIsbn, fetchBooks, updateBookRating } from "../services/api";

import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";

import RatingStars from "../components/RatingStars";
import FavoriteButton from "../components/FavoriteButton";
import BookCard from "../components/BookCard";

export default function BookDetail() {
  const { isbn } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const toast = useToast();

  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");

  // Load main book
  useEffect(() => {
    const load = async () => {
      try {
        showLoading();
        const data = await getBookByIsbn(isbn);
        setBook(data);

        // Related books (same publisher or category)
        const all = await fetchBooks();
        const rel = all
          .filter(
            (b) =>
              b.isbn !== isbn &&
              (b.publisher === data.publisher ||
                b.category === data.category)
          )
          .slice(0, 4);

        setRelated(rel);
      } catch {
        setError("Book not found.");
        toast.showError("Book not found.");
      } finally {
        hideLoading();
      }
    };

    load();
  }, [isbn]);

  // Rating handler
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
      <div className="p-6 text-center">
        <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
        <Link to="/books" className="mt-4 inline-block text-blue-600 dark:text-blue-400">
          Back to Books
        </Link>
      </div>
    );
  }

  if (!book) return null;

  const cover =
    book.cover?.trim() !== ""
      ? book.cover
      : `https://picsum.photos/seed/${book.isbn}/600/800`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-10">

      {/* Main Book Card */}
      <div className="
        bg-white dark:bg-slate-900 
        shadow rounded-xl p-6 
        flex flex-col md:flex-row gap-8
      ">
        <img
          src={cover}
          alt={book.title}
          className="w-56 h-80 rounded-lg object-cover shadow-md mx-auto md:mx-0"
        />

        <div className="flex flex-col justify-between flex-1">

          <div>
            <h1 className="text-3xl font-bold dark:text-slate-100">
              {book.title}
            </h1>

            <p className="mt-2 text-lg text-slate-700 dark:text-slate-300">
              By {book.author}
            </p>

            <div className="mt-3">
              <RatingStars value={book.rating} onChange={handleRating} />
            </div>

            <FavoriteButton isbn={book.isbn} className="mt-3" />

            <p className="mt-4 text-slate-800 dark:text-slate-200 leading-relaxed">
              {book.description}
            </p>

            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Year:</strong> {new Date(book.published).getFullYear()}</p>
              <p><strong>Pages:</strong> {book.pages}</p>
              <p><strong>Category:</strong> {book.category}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              to={`/edit/${isbn}`}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Edit Book
            </Link>

            <Link
              to="/books"
              className="px-4 py-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-slate-100 hover:bg-gray-300 dark:hover:bg-slate-700"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Related Books */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-slate-100">
            Related Books
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((b) => (
              <BookCard key={b.isbn} book={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
