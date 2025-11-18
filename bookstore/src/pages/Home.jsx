import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../utils/favorites";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    import("../data/books.json").then((m) => {
      // FIX: detect if JSON has "books" key
      const data = Array.isArray(m.default) ? m.default : m.default.books;
      setBooks(data || []);
    });

    setFavorites(getFavorites());
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Books</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {books.map((b) => (
          <Link key={b.isbn} to={`/book/${b.isbn}`} className="card p-4">
            <div className="font-medium">{b.title}</div>
            <div className="text-sm text-slate-600">{b.author}</div>

            {favorites.includes(b.isbn) && (
              <div className="text-yellow-500 text-sm mt-1">★ Favorited</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
