import { useState, useEffect } from "react";
import { fetchBooks } from "../services/api";

import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/filters/CategoryFilter";
import RisingStar from "../components/RisingStar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // --- Load books (with search) ---
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await fetchBooks({ q: searchQuery });
        if (!alive) return;
        setBooks(data);
      } catch (err) {
        console.error("Failed to load books", err);
      }
    })();

    return () => (alive = false);
  }, [searchQuery]);

  // --- Dynamic categories (publisher used as category) ---
  const categories = [...new Set(books.map((b) => b.publisher))];

  // --- Apply category filter ---
  useEffect(() => {
    if (category === "all") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((b) => b.publisher === category));
    }
    setCurrentPage(1);
  }, [category, books]);

  // --- Pagination ---
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const pageBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Rising Star Section */}
      <div className="mb-10">
        <RisingStar />
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={(q) => setSearchQuery(q)} />
      </div>

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 dark:text-slate-100">
        Book List
      </h2>

      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>

      {/* Books Grid */}
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
