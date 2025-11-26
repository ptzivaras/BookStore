import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import { fetchBooks } from "../services/api";
import { useLoading } from "../context/LoadingContext";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { showLoading, hideLoading } = useLoading();
  const pageSize = 6;

  // Load books
  useEffect(() => {
    const load = async () => {
      try {
        showLoading();
        const data = await fetchBooks();
        setBooks(data);
        setFiltered(data);
      } finally {
        hideLoading();
      }
    };
    load();
  }, []);

  // Dynamic categories
  const categories = [...new Set(books.map((b) => b.category))];

  // Apply category + sort
  useEffect(() => {
    let result = [...books];

    if (category) {
      result = result.filter((b) => b.category === category);
    }

    switch (sortOption) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        result.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "year":
        result.sort(
          (a, b) =>
            new Date(b.published).getFullYear() -
            new Date(a.published).getFullYear()
        );
        break;
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [category, sortOption, books]);

  // Pagination
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const pageBooks = filtered.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      <h1 className="text-3xl font-bold mb-6 dark:text-slate-100">
        Browse Books
      </h1>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">

        {/* Category Dropdown */}
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="
            border px-3 py-2 rounded
            bg-white dark:bg-slate-800
            border-slate-300 dark:border-slate-700
            text-slate-800 dark:text-slate-100
          "
        >
          <option value="">Sort by…</option>
          <option value="title">Title (A–Z)</option>
          <option value="author">Author (A–Z)</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="year">Year (New → Old)</option>
        </select>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <p className="text-slate-500 dark:text-slate-300">
          No books match your filters.
        </p>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageBooks.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filtered.length}
        pageSize={pageSize}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}
