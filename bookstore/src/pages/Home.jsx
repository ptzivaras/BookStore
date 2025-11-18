import { useEffect, useMemo, useState } from "react";
import { fetchBooks } from "../services/api";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchBooks().then((b) => {
      if (alive) {
        setBooks(b);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const list = useMemo(() => books.slice(0, 8), [books]);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Welcome</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((b) => (
            <BookCard key={b.isbn} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
