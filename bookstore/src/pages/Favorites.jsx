const KEY = "bookstore.favorites";

export const getFavorites = () =>
  new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));

export function toggleFavorite(isbn) {
  const set = getFavorites();
  if (set.has(isbn)) set.delete(isbn);
  else set.add(isbn);
  localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
  return set;
}
