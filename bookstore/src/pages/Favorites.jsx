import { useFavorites } from "../context/FavoritesContext";
import BookCard from "../components/BookCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-slate-100">Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">
          You have no favorite books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((book) => (
            <BookCard key={book.isbn} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
