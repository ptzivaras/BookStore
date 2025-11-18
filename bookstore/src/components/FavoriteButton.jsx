import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";

export default function FavoriteButton({ isbn }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(isbn));
  }, [isbn]);

  function handleClick() {
    const updated = toggleFavorite(isbn);
    setFav(updated.includes(isbn));
  }

  return (
    <button
      onClick={handleClick}
      className={`btn ${fav ? "bg-yellow-400 border-yellow-400" : ""}`}
    >
      {fav ? "★ Favorite" : "☆ Add to Favorites"}
    </button>
  );
}
