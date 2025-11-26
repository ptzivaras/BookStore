import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookByIsbn, updateBookRating } from "../services/api";
import { useLoading } from "../context/LoadingContext";
import RatingStars from "../components/RatingStars";
import FavoriteButton from "../components/FavoriteButton";

export default function BookDetail() {
  const { isbn } = useParams();
  const { showLoading, hideLoading } = useLoading();

  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        showLoading();
        const data = await getBookByIsbn(isbn);
        setBook(data);
      } catch {
        setError("Book not found.");
      } finally {
        hideLoading();
      }
    };
    load();
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
    book.cover && book.cover.trim() !== ""
      ? book.cover
      : `https://picsum.photos/seed/${book.isbn}/600/800`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 flex gap-8">
        <img
          src={cover}
          alt={book.title}
          className="w-60 h-80 rounded-lg object-cover shadow-md"
        />

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="mt-2 text-gray-700 text-lg">By {book.author}</p>

            <div className="mt-3">
              <RatingStars value={book.rating} onChange={handleRating} />
            </div>

            <FavoriteButton isbn={book.isbn} className="mt-3" />

            <p className="mt-4 text-gray-800 leading-relaxed">
              {book.description}
            </p>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p>
                <strong>Year:</strong>{" "}
                {new Date(book.published).getFullYear()}
              </p>
              <p><strong>Pages:</strong> {book.pages}</p>
              <p><strong>Category:</strong> {book.category}</p>
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
    </div>
  );
}
