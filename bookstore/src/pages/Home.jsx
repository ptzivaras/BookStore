import { useState, useEffect } from "react";
import { fetchBooks } from "../services/api";

import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import RisingStar from "../components/RisingStar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  // Fetch books
  useEffect(() => {
    let alive = true;

    (async () => {
      const data = await fetchBooks({ q: searchQuery });
      if (!alive) return;
      setBooks(data);
    })();

    return () => (alive = false);
  }, [searchQuery]);

  const categories = [...new Set(books.map((b) => b.publisher))];

  useEffect(() => {
    if (category === "all") setFilteredBooks(books);
    else setFilteredBooks(books.filter((b) => b.publisher === category));

    setCurrentPage(1);
  }, [category, books]);

  const indexOfLast = currentPage * booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfLast - booksPerPage, indexOfLast);

  return (
    <div className="container-default py-6">
      <RisingStar />

      <SearchBar onSearch={setSearchQuery} />

      <h2 className="section-title">Book List</h2>

      <CategoryFilter
        categories={categories}
        selected={category}
        onChange={setCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentBooks.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
