import React from "react";
import { NavLink, Outlet } from "react-router-dom";

/**
 * Layout
 * - Header nav (NavLink to keep active state)
 * - Main content via <Outlet />
 * - Footer
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold">
            Bookstore
          </NavLink>

          <nav className="flex gap-4 text-sm">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "font-semibold" : "")}>
              Home
            </NavLink>
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

      <main className="mx-auto w-full max-w-6xl px-4 py-8 grow">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Bookstore
      </footer>
    </div>
  );
}
