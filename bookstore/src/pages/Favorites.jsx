import React from "react";
import mockData from "../data/books.json";
import BookCard from "../components/BookCard";
import { useFavorites } from "../context/FavoritesContext";

/**
 * Favorites page
 * - Uses same BookCard component
 * - Loads mockData.books (keeps compatibility with your JSON structure)
 */
export default function Favorites() {
  const { favorites } = useFavorites();

  const allBooks = Array.isArray(mockData)
    ? mockData
    : mockData?.books ?? [];

  const favBooks = allBooks.filter((b) => favorites.includes(b.isbn));

  if (favBooks.length === 0) {
    return <p className="mt-6 text-slate-600">No favorite books yet.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {favBooks.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>
    </div>
  );
}
