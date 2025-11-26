import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookByIsbn, fetchBooks, updateBookRating } from "../services/api";
import { useLoading } from "../context/LoadingContext";
import FavoriteButton from "../components/FavoriteButton";
import RatingStars from "../components/RatingStars";

export default function BookDetail() {
  const { isbn } = useParams();
  const { showLoading, hideLoading } = useLoading();

  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        showLoading();

        const data = await getBookByIsbn(isbn);
        if (!alive) return;
        setBook(data);

        // LOAD ALL BOOKS FOR RELATED
        const all = await fetchBooks({ q: "" });

        let matches = [];

        matches = all.filter(
          (b) => b.author === data.author && b.isbn !== data.isbn
        );

        if (matches.length < 4) {
          const derived =
            data.subtitle?.split(" ")[0] || data.publisher?.split(" ")[0];

          const extra = all.filter(
            (b) =>
              b.isbn !== data.isbn &&
              (b.subtitle?.includes(derived) ||
                b.publisher?.includes(derived))
          );

          const map = new Map();
          [...matches, ...extra].forEach((x) => map.set(x.isbn, x));
          matches = Array.from(map.values());
        }

        matches = matches.slice(0, 4);
        if (!alive) return;
        setRelated(matches);
      } catch (err) {
        setError("Book not found.");
      } finally {
        hideLoading();
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, [isbn]);

  const handleRating = async (rating) => {
    showLoading();
    const updated = await updateBookRating(isbn, rating);
    setBook(updated);
    hideLoading();
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
        <Link to="/books" className="inline-block mt-4 text-blue-600">
          Back to Books
        </Link>
      </div>
    );
  }

  if (!book) return null;

  const cover =
    book.cover || `https://picsum.photos/seed/${book.isbn}/600/800`;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex gap-8">
        {/* Cover */}
        <img
          src={cover}
          alt={book.title}
          className="w-60 h-80 rounded-lg object-cover shadow-md"
        />

        {/* Content */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {book.title}
            </h1>
            <p className="mt-2 text-gray-700 text-lg">
              By {book.author}
            </p>

            {/* ⭐ INTERACTIVE RATING */}
            <div className="mt-3">
              <RatingStars value={book.rating} onChange={handleRating} />
              <p className="text-gray-600 text-sm mt-1">
                {book.rating.toFixed(1)} / 5
              </p>
            </div>

            <p className="mt-4 text-gray-800 leading-relaxed">
              {book.description}
            </p>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Year:</strong> {new Date(book.published).getFullYear()}</p>
              <p><strong>Pages:</strong> {book.pages}</p>
              <p><strong>Category:</strong> {book.category}</p>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex items-center gap-4">
              <FavoriteButton isbn={book.isbn} />

              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                Share
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              to={`/books/edit/${isbn}`}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Book
            </Link>

            <Link
              to="/books"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* RELATED BOOKS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Other books you may like
        </h2>

        {related.length === 0 && (
          <p className="text-sm text-slate-500">No related books found.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {related.map((r) => (
            <Link
              key={r.isbn}
              to={`/book/${r.isbn}`}
              className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={
                  r.cover ||
                  `https://picsum.photos/seed/${r.isbn}/300/400`
                }
                alt={r.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 text-sm font-medium">{r.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
