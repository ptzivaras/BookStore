import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/filters/CategoryFilter";
import { fetchBooks } from "../services/api";
import { useLoading } from "../context/LoadingContext";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { showLoading, hideLoading } = useLoading();
  const pageSize = 6;

  // Load all books
  useEffect(() => {
    const loadBooks = async () => {
      try {
        showLoading();
        const data = await fetchBooks();
        setBooks(data);
        setFilteredBooks(data);
      } finally {
        hideLoading();
      }
    };
    loadBooks();
  }, []);

  // Extract categories dynamically
  const categories = [...new Set(books.map((b) => b.category))];

  // Apply sorting
  const applySorting = (list, option) => {
    const sorted = [...list];

    switch (option) {
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        sorted.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "year":
        sorted.sort(
          (a, b) =>
            new Date(b.published).getFullYear() -
            new Date(a.published).getFullYear()
        );
        break;
    }

    return sorted;
  };

  // Category filtering
  const handleCategoryChange = (value) => {
    setCategory(value);

    let updated = [...books];

    if (value) {
      updated = updated.filter((b) => b.category === value);
    }

    // Apply sorting after filtering
    if (sortOption) {
      updated = applySorting(updated, sortOption);
    }

    setFilteredBooks(updated);
    setCurrentPage(1);
  };

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);

    let sorted = applySorting(filteredBooks, option);
    setFilteredBooks(sorted);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const pageBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

return (
  <div className="max-w-6xl mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold mb-6 dark:text-slate-100">Books</h1>

    {/* Filters Row */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      <CategoryFilter
        categories={categories}
        selected={category}
        onChange={handleCategoryChange}
      />

      <select
        value={sortOption}
        onChange={(e) => handleSort(e.target.value)}
        className="input w-full sm:w-auto"
      >
        <option value="">Sort by...</option>
        <option value="title">Title (A-Z)</option>
        <option value="author">Author (A-Z)</option>
        <option value="rating">Rating (High → Low)</option>
        <option value="year">Year (New → Old)</option>
      </select>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pageBooks.map((book) => (
        <BookCard key={book.isbn} book={book} />
      ))}
    </div>

    {/* Pagination */}
    <div className="mt-8">
      <Pagination
        currentPage={currentPage}
        totalItems={filteredBooks.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  </div>
);

}
