import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { fetchBooks } from "../services/api";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };

    loadBooks();
  }, []);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const visibleBooks = books.slice(start, end);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BookList;
