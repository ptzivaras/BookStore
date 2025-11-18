import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";

export default function BookDetail() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    import("../data/books.json").then((m) => {
      const found = m.default.find((b) => b.isbn === isbn);
      setBook(found || null);
    });
  }, [isbn]);

  if (!book) return <p>Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{book.title}</h1>

      <p className="mt-2 text-slate-700">{book.subtitle}</p>

      <div className="mt-4">
        <FavoriteButton isbn={isbn} />
      </div>

      <div className="mt-6">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
      </div>
    </div>
  );
}
