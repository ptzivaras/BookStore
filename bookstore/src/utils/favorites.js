// LocalStorage-based favorites system

const KEY = "favorites";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function toggleFavorite(isbn) {
  const favs = getFavorites();
  const exists = favs.includes(isbn);

  const updated = exists
    ? favs.filter((x) => x !== isbn)
    : [...favs, isbn];

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function isFavorite(isbn) {
  const favs = getFavorites();
  return favs.includes(isbn);
}
