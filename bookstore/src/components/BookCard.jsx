import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  if (!book) return null;

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>

      <Link to={`/books/${book.id}`} className="btn btn-primary">
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
