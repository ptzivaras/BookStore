import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

export default function BookCard({ book }) {
  if (!book) return null;

  const cover =
    book.cover && book.cover.trim() !== ""
      ? book.cover
      : `https://picsum.photos/seed/${book.isbn}/300/400`;

  return (
    <div className="card p-3 shadow-sm rounded bg-white">
      <img
        src={cover}
        alt={book.title}
        className="w-full h-48 object-cover rounded mb-3"
      />

      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-slate-600">
        <strong>Author:</strong> {book.author}
      </p>

      <FavoriteButton isbn={book.isbn} className="mt-2" />

      <Link
        to={`/book/${book.isbn}`}
        className="btn mt-3 inline-block bg-indigo-600 text-white px-3 py-1 rounded"
      >
        View Details
      </Link>
    </div>
  );
}
