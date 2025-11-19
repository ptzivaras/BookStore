import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const AddBook = lazy(() => import("./pages/AddBook"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const Favorites = lazy(() => import("./pages/Favorites"));

export default function App() {
  return (
    <Suspense fallback={<div className="text-center">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="add" element={<AddBook />} />
          <Route path="book/:isbn" element={<BookDetail />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
