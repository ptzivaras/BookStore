import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  if (!book) return null;

  return (
    <div className="card p-3 shadow-sm rounded bg-white">
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-slate-600">
        <strong>Author:</strong> {book.author}
      </p>

      <Link
        to={`/book/${book.isbn}`}
        className="btn mt-3 inline-block bg-indigo-600 text-white px-3 py-1 rounded"
      >
        View Details
      </Link>
    </div>
  );
}
