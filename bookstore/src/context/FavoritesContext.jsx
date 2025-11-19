import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

/**
 reads/writes favorites from localStorage
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(Array.isArray(saved) ? saved : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      // ignore write errors
    }
  }, [favorites]);

  const toggleFavorite = (isbn) => {
    setFavorites((prev) =>
      prev.includes(isbn) ? prev.filter((x) => x !== isbn) : [...prev, isbn]
    );
  };

  const isFavorite = (isbn) => favorites.includes(isbn);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return ctx;
}
