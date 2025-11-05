import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// lazy routes (they resolve because placeholder files exist)
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const AddBook = lazy(() => import("./pages/AddBook"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const Favorites = lazy(() => import("./pages/Favorites"));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="text-center">Loading…</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="add" element={<AddBook />} />
          <Route path="book/:isbn" element={<BookDetail />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
