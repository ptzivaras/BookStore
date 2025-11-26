import { useEffect, useState } from "react";
import { fetchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";

export default function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    let alive = true;

    (async () => {
      const data = await fetchBooks({ q: query });
      if (!alive) return;
      setBooks(data);
      setCurrentPage(1);
    })();

    return () => (alive = false);
  }, [query]);

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const pageBooks = books.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      <h1 className="text-2xl font-bold mb-6 dark:text-slate-100">
        Search Books
      </h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="
            input
            bg-white dark:bg-slate-800
            text-slate-900 dark:text-slate-100
            border border-slate-300 dark:border-slate-700
          "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* No results */}
      {books.length === 0 && query.trim() !== "" && (
        <p className="text-slate-500 dark:text-slate-300 text-sm mb-6">
          No books found for "{query}"
        </p>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageBooks.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={books.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
