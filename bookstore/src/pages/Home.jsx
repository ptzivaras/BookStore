import { useState, useEffect } from "react";
import { getBooks } from "../services/bookApi";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("all");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    const data = getBooks();
    setBooks(data);
    setFilteredBooks(data);
  }, []);

  // Extract categories dynamically
  const categories = [...new Set(books.map((b) => b.publisher))];

  // Filter books when category changes
  useEffect(() => {
    if (category === "all") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((b) => b.publisher === category));
    }
    setCurrentPage(1); // reset pagination on filter
  }, [category, books]);

  // Pagination logic
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book List</h2>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selected={category}
        onChange={setCategory}
      />

      {/* Books List */}
      <div className="book-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {currentBooks.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
