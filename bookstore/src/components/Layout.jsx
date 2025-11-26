import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            BookStore
          </Link>

          <nav className="flex gap-6 text-sm">
            <Link to="/books" className="hover:text-indigo-600">Books</Link>
            <Link to="/favorites" className="hover:text-indigo-600">Favorites</Link>
            <Link to="/add" className="hover:text-indigo-600">Add Book</Link>
            <Link to="/search" className="hover:text-indigo-600">Search</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
