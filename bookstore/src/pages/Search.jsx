import { useEffect, useMemo, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { fetchBooks, getBookByIsbn, createBook, updateBook, deleteBook } from "../services/api";

export default function Search() {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchBooks({ q, ...filters }).then((list) => {
      if (alive) {
        setData(list);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [q, filters]);

  const options = useMemo(() => {
    const years = [...new Set(data.map((b) => new Date(b.published).getFullYear()))].sort(
      (a, b) => b - a
    );
    const publishers = [...new Set(data.map((b) => b.publisher))].sort();
    const categories = [...new Set(data.map((b) => b.category))].sort();
    return { years, publishers, categories };
  }, [data]);

  const onFilterChange = (patch) => setFilters((prev) => ({ ...prev, ...patch }));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold dark:text-slate-100">Search to find your new book</h1>
      <SearchBar value={q} onChange={setQ} />
      <div>
        <p className="label mb-2">Filters</p>
        <Filters {...filters} onChange={onFilterChange} options={options} />
      </div>
      {loading ? (
        <p className="dark:text-slate-300">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((b) => (
            <BookCard key={b.isbn} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
