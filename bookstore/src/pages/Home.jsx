import { useState, useEffect } from "react";
import { fetchBooks } from "../services/api";

import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";

import CategoryFilter from "../components/CategoryFilter";
import RisingStar from "../components/RisingStar";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("all");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchBooks();
        if (!alive) return;
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error("Failed to load books", err);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const categories = [...new Set(books.map((b) => b.publisher))];

  useEffect(() => {
    if (category === "all") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((b) => b.publisher === category));
    }
    setCurrentPage(1);
  }, [category, books]);

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-5">
      <RisingStar/>

      <h2 className="text-2xl font-bold mt-8 mb-4">Book List</h2>

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
