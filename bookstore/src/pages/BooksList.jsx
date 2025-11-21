import { useEffect, useState } from "react";
import { fetchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const all = await fetchBooks();
      if (!active) return;

      setBooks(all);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  // Collect category names
  const categoryList = [...new Set(books.map((b) => b.category))];

  // Apply category filter
  const filtered =
    category === "all"
      ? books
      : books.filter((b) => b.category === category);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageSlice = filtered.slice(start, start + PAGE_SIZE);

  // reset to page 1 when switching category
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Books</h2>

      <CategoryFilter
        categories={categoryList}
        selected={category}
        onChange={setCategory}
      />

      {loading && <p>Loading books...</p>}

      {!loading && pageSlice.length === 0 && (
        <p className="text-slate-500 mt-6">No books found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageSlice.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      {totalPages > 1 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
