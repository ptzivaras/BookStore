import { Outlet, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Footer from "./Footer";

export default function Layout() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Book Explorer
        </Link>

        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/books" className="hover:text-indigo-600">Books</Link>
          <Link to="/add" className="hover:text-indigo-600">Add Book</Link>

          <Link to="/favorites" className="hover:text-indigo-600 flex items-center gap-1">
            Favorites
            {favorites.length > 0 && (
              <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link to="/search" className="hover:text-indigo-600">Search</Link>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
