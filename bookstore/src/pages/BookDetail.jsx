import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBooks, getBookByIsbn } from "../services/api";
import FavoriteButton from "../components/FavoriteButton";
import RatingStars from "../components/RatingStars";

export default function BookDetail() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const b = await getBookByIsbn(isbn);
        if (!alive) return;
        setBook(b);

        const all = await fetchBooks({ q: "" });

        // ---- Improved Related Books Logic ----
        let matches = [];

        // 1) Same author
        matches = all.filter(
          (x) => x.author === b.author && x.isbn !== b.isbn
        );

        // 2) If <4, add books from same "category"
        if (matches.length < 4) {
          const cat = b.subtitle?.split(" ")[0] || b.publisher?.split(" ")[0];
          const extra = all.filter(
            (x) =>
              x.isbn !== b.isbn &&
              (x.subtitle?.includes(cat) ||
                x.publisher?.includes(cat))
          );

          // Merge without duplicates
          const set = new Map();
          [...matches, ...extra].forEach((bk) => set.set(bk.isbn, bk));
          matches = Array.from(set.values());
        }

        // Limit to 4 results
        matches = matches.slice(0, 4);

        if (!alive) return;
        setRelated(matches);
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [isbn]);

  if (loading) return <p>Loading…</p>;
  if (!book) return <p>Not found.</p>;

  const year = new Date(book.published).getFullYear();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
      <div className="card overflow-hidden">
        <img
          loading="lazy"
          src={`https://picsum.photos/seed/${book.isbn}/600/800`}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="mt-2 text-slate-600">{book.description}</p>

        <div className="mt-4 flex gap-2">
          <FavoriteButton isbn={book.isbn} />
          <button
            className="btn"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Share
          </button>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <dt className="font-semibold">Category</dt>
            <dd>{book.subtitle?.split(" ")[0] || "General"}</dd>
          </div>
          <div>
            <dt className="font-semibold">Year</dt>
            <dd>{year}</dd>
          </div>
          <div>
            <dt className="font-semibold">Pages</dt>
            <dd>{book.pages}</dd>
          </div>
          <div>
            <dt className="font-semibold">Publisher</dt>
            <dd>{book.publisher}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-semibold">ISBN-10 / ISBN-13</dt>
            <dd>
              {book.isbn.slice(3, 13)} / {book.isbn}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <p className="label">Author</p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div>
              <div className="font-medium">{book.author}</div>
              <RatingStars value={4} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="btn bg-indigo-600 text-white border-indigo-600">
            BUY
          </button>
        </div>
      </div>

      <div className="md:col-span-2 mt-10">
        <h2 className="text-xl font-semibold mb-3">Other books you may like</h2>

        {related.length === 0 && (
          <p className="text-sm text-slate-500">No similar books found.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {related.map((r) => (
            <Link key={r.isbn} to={`/book/${r.isbn}`} className="card overflow-hidden">
              <img
                loading="lazy"
                src={`https://picsum.photos/seed/${r.isbn}/300/400`}
                alt={r.title}
              />
              <div className="p-3 text-sm">{r.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
