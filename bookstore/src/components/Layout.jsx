import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold">
            Bookstore
          </NavLink>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/search" className={({ isActive }) => (isActive ? "font-semibold" : "")}>
              Search
            </NavLink>
            <NavLink to="/add" className={({ isActive }) => (isActive ? "font-semibold" : "")}>
              Add Book
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => (isActive ? "font-semibold" : "")}>
              Favorites
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 grow">{children}</main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Bookstore
      </footer>
    </div>
  );
}
