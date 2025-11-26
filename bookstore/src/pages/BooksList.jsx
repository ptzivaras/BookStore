import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import { fetchBooks } from "../services/api";
import { useLoading } from "../context/LoadingContext";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const { showLoading, hideLoading } = useLoading();

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

  // Category filter
  const applyFilters = (category, sortOption) => {
    let list = [...books];

    if (category !== "all") {
      list = list.filter((b) => b.category === category);
    }

    if (sortOption === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "author") list.sort((a, b) => a.author.localeCompare(b.author));
    if (sortOption === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortOption === "year")
      list.sort((a, b) => new Date(b.published) - new Date(a.published));

    setFiltered(list);
    setCurrentPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    applyFilters(value, sortOption);
  };

  const handleSort = (value) => {
    setSortOption(value);
    applyFilters(category, value);
  };

  // Pagination
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold dark:text-slate-100 mb-4">Books List</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={handleCategory}
        />

        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="border px-3 py-2 rounded bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600"
        >
          <option value="">Sort by...</option>
          <option value="title">Title (A–Z)</option>
          <option value="author">Author (A–Z)</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="year">Year (New → Old)</option>
        </select>
      </div>

      {/* Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((b) => (
          <BookCard key={b.isbn} book={b} />
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
