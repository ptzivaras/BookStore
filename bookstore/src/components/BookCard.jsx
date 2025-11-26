import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

export default function BookCard({ book }) {
  if (!book) return null;

  const cover =
    book.cover?.trim()
      ? book.cover
      : `https://picsum.photos/seed/${book.isbn}/300/400`;

  return (
    <div
      className="
        card 
        p-4 
        bg-white dark:bg-slate-800 
        border border-slate-200 dark:border-slate-700
        rounded-xl 
        shadow-sm hover:shadow-md 
        transition
      "
    >
      <img
        src={cover}
        alt={book.title}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
        {book.title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
        {book.author}
      </p>

      <div className="mt-3">
        <FavoriteButton isbn={book.isbn} />
      </div>

      <Link
        to={`/book/${book.isbn}`}
        className="
          block mt-4 
          bg-indigo-600 hover:bg-indigo-700 
          text-white text-center 
          py-2 
          rounded-md 
          text-sm
        "
      >
        View Details
      </Link>
    </div>
  );
}
