import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import mockData from "../data/books.json";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    // load mock data
    const arr = mockData.books.map((b, idx) => ({
      ...b,
      isbn: b.isbn || String(100000 + idx),
    }));
    setBooks(arr);
    setFiltered(arr);
  }, []);

  const applyFilters = () => {
    let result = [...books];

    if (category) {
      result = result.filter((b) =>
        b.subtitle?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (searchTerm) {
      result = result.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [category, searchTerm, books]);

  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(startIdx, startIdx + pageSize);

  const categories = ["JavaScript", "Programming", "Design", "Git", "Tools"];

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <CategoryFilter
        categories={categories}
        selected={category}
        onChange={setCategory}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pageItems.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filtered.length / pageSize)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
