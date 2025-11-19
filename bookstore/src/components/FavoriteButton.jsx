import React from "react";
import { useFavorites } from "../context/FavoritesContext";

/**
 * FavoriteButton
 * - Controlled by global FavoritesContext
 * - Renders differently when favorited
 */
export default function FavoriteButton({ isbn, className = "" }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(isbn);

  return (
    <button
      onClick={() => toggleFavorite(isbn)}
      aria-pressed={fav}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border transition ${className} ${
        fav ? "bg-amber-100 border-amber-300" : "bg-white border-slate-300"
      }`}
    >
      {fav ? "★ Favorited" : "☆ Favorite"}
    </button>
  );
}
