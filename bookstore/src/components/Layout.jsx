import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold tracking-tight">
            Bookstore
          </NavLink>

          <nav className="flex gap-4 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "font-semibold text-indigo-600" : "text-slate-700"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "font-semibold text-indigo-600" : "text-slate-700"
              }
            >
              Books
            </NavLink>

            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "font-semibold text-indigo-600" : "text-slate-700"
              }
            >
              Search
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? "font-semibold text-indigo-600" : "text-slate-700"
              }
            >
              Add Book
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "font-semibold text-indigo-600" : "text-slate-700"
              }
            >
              Favorites
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8 grow">
        <Outlet />
      </main>

      {/* Footer (polished) */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Bookstore. All rights reserved.
          </p>

          <div className="flex gap-3">
            <NavLink
              to="/books"
              className="hover:text-slate-700 transition-colors"
            >
              Browse books
            </NavLink>
            <NavLink
              to="/favorites"
              className="hover:text-slate-700 transition-colors"
            >
              Favorites
            </NavLink>
            <a
              href="https://github.com/ptzivaras/BookStore"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-700 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
