import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookByIsbn } from "../services/api";
import { useLoading } from "../context/LoadingContext";
import FavoriteButton from "../components/FavoriteButton";
import RatingStars from "../components/RatingStars";

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

  if (error) return (
    <div className="p-6 text-center">
      <p className="text-red-600 font-semibold">{error}</p>
      <Link to="/books" className="mt-4 inline-block text-indigo-600 hover:underline">Back</Link>
    </div>
  );

  if (!book) return null;

  const cover = book.cover?.trim()
    ? book.cover
    : `https://picsum.photos/seed/${book.isbn}/600/800`;

  return (
    <div className="container-default py-8">
      <div className="bg-white shadow rounded-xl p-6 grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
        
        <img
          src={cover}
          alt={book.title}
          className="w-full h-full object-cover rounded-xl shadow-md"
        />

        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-600 mt-2 text-lg">{book.author}</p>

          <div className="mt-4">
            <RatingStars value={book.rating} isbn={book.isbn} />
          </div>

          <p className="mt-5 leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm mt-6">
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Year:</strong> {new Date(book.published).getFullYear()}</p>
          </div>

          <div className="mt-6 flex gap-4">
            <FavoriteButton isbn={book.isbn} />

            <Link
              to={`/books/edit/${isbn}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
            >
              Edit Book
            </Link>

            <Link
              to="/books"
              className="bg-gray-200 px-4 py-2 rounded text-gray-700 hover:bg-gray-300 text-sm"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
