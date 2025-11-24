import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import { FavoritesProvider } from "./context/FavoritesContext";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingOverlay from "./components/LoadingOverlay";

import Home from "./pages/Home";
import BooksList from "./pages/BooksList";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <FavoritesProvider>
        <BrowserRouter>

          {/* Global spinner */}
          <LoadingOverlay />

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="books" element={<BooksList />} />
              <Route path="book/:isbn" element={<BookDetail />} />
              <Route path="add" element={<AddBook />} />
              <Route path="edit/:isbn" element={<EditBook />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="search" element={<Search />} />
            </Route>
          </Routes>

        </BrowserRouter>
      </FavoritesProvider>
    </LoadingProvider>
  </React.StrictMode>
);
