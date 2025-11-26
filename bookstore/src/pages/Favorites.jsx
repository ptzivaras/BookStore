import { useFavorites } from "../context/FavoritesContext";
import BookCard from "../components/BookCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Your Favorite Books
      </h1>

      {/* Empty state */}
      {favorites.length === 0 && (
        <div className="
          p-6 rounded-xl border border-slate-300 dark:border-slate-700
          bg-slate-100 dark:bg-slate-800
          text-center text-slate-600 dark:text-slate-300
        ">
          You haven’t added any favorites yet.
        </div>
      )}

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {favorites.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

    </div>
  );
}
