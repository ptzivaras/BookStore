import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import { fetchBooks } from "../services/api";
import { useLoading } from "../context/LoadingContext";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { showLoading, hideLoading } = useLoading();
  const pageSize = 6;

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

  // Extract all categories dynamically
  const categories = [...new Set(books.map((b) => b.category))];

  // Category filtering
  const handleCategoryChange = (value) => {
    setCategory(value);

    let updated = [...books];

    if (value) {
      updated = updated.filter((b) => b.category === value);
    }

    // Apply existing sorting after filtering
    if (sortOption) {
      updated = applySorting(updated, sortOption);
    }

    setFilteredBooks(updated);
    setCurrentPage(1);
  };

  // Sorting logic
  const applySorting = (list, option) => {
    let sorted = [...list];

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
        sorted.sort((a, b) => b.year - a.year);
        break;
    }
    return sorted;
  };

  const handleSort = (option) => {
    setSortOption(option);

    let sorted = applySorting(filteredBooks, option);

    setFilteredBooks(sorted);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const pageBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Books List</h1>

      {/* Filters area */}
      <div className="flex items-center gap-4 mb-4">
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={handleCategoryChange}
        />

        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort by...</option>
          <option value="title">Title (A-Z)</option>
          <option value="author">Author (A-Z)</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="year">Year (New → Old)</option>
        </select>
      </div>

      {/* Books grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredBooks.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default BooksList;
