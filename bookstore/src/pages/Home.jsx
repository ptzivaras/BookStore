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

  // ---------------------------------
  // Load books (with search)
  // ---------------------------------
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

    return () => {
      alive = false;
    };
  }, [searchQuery]);

  // ---------------------------------
  // Dynamic categories
  // ---------------------------------
  const categories = [...new Set(books.map((b) => b.publisher))];

  // ---------------------------------
  // Category filter
  // ---------------------------------
  useEffect(() => {
    if (category === "all") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((b) => b.publisher === category));
    }

    setCurrentPage(1);
  }, [category, books]);

  // ---------------------------------
  // Pagination
  // ---------------------------------
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-5">
      {/* Rising Star Carousel */}
      <RisingStar />

      {/* SearchBar RESTORED */}
      <SearchBar onSearch={(q) => setSearchQuery(q)} />

      <h2 className="text-2xl font-bold mt-4 mb-3">Book List</h2>

      <CategoryFilter
        categories={categories}
        selected={category}
        onChange={setCategory}
      />

      <div className="grid grid-cols-3 gap-5 mt-4">
        {currentBooks.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
