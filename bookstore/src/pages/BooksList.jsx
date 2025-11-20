import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { fetchBooks } from "../services/api";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    load();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>Books</h1>

      {/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.isbn ?? book.id} book={book} />
          ))        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BooksList;
