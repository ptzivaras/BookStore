import { useEffect, useState } from "react";
import { fetchBooks } from "../services/api";
import { getFavorites } from "../services/favorites";
import BookCard from "../components/BookCard";

export default function Favorites() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const set = getFavorites();
    fetchBooks().then((list) => setBooks(list.filter((b) => set.has(b.isbn))));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((b) => (
          <BookCard key={b.isbn} book={b} />
        ))}
      </div>
    </div>
  );
}
