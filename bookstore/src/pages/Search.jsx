import { useEffect, useState } from "react";
import { fetchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

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
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Find Your Next Book
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar onSearch={setQuery} />
      </div>

      {/* No results */}
      {books.length === 0 && query.trim() !== "" && (
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 text-center text-slate-600 dark:text-slate-300">
          No books found for <strong>"{query}"</strong>.
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {pageBooks.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={books.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
