//with latency, filtering, full CRUD, localStorage persistence, and in-memory caching.
import seed from "../data/books.json";

const LS_KEY_BOOKS = "bookstore.books";
let memory = null; // in-memory cache only (no repeated JSON parsing)

const delay = (ms = 350) => new Promise((res) => setTimeout(res, ms));

// ---------------------------------------------------------------------------
// INITIALISATION
// ---------------------------------------------------------------------------
function seedIfEmpty() {
  if (!localStorage.getItem(LS_KEY_BOOKS)) {
    const initial = Array.isArray(seed) ? seed : seed.books || [];
    localStorage.setItem(LS_KEY_BOOKS, JSON.stringify(initial));
  }
}

function loadAll() {
  if (memory) return memory;

  seedIfEmpty();
  memory = JSON.parse(localStorage.getItem(LS_KEY_BOOKS) || "[]");
  return memory;
}

function saveAll(list) {
  memory = list;
  localStorage.setItem(LS_KEY_BOOKS, JSON.stringify(list));
}

// ---------------------------------------------------------------------------
// CATEGORY UTILITIES
// ---------------------------------------------------------------------------
function deriveCategory(b) {
  if (b.categories?.length) return b.categories[0];
  if (b.subtitle) return b.subtitle.split(" ")[0];
  if (b.publisher) return b.publisher.split(" ")[0];
  return "General";
}

// ---------------------------------------------------------------------------
// READ / SEARCH
// ---------------------------------------------------------------------------

/**
 * Fetch all books with optional filters.
 */
export async function fetchBooks({ q = "", year, publisher, category } = {}) {
  await delay();
  const all = loadAll().map((b) => ({ ...b, category: deriveCategory(b) }));

  let result = all;
  const text = q.trim().toLowerCase();

  if (text) {
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(text) ||
        b.author.toLowerCase().includes(text)
    );
  }

  if (year) {
    result = result.filter(
      (b) => new Date(b.published).getFullYear() === Number(year)
    );
  }

  if (publisher) {
    result = result.filter((b) => b.publisher === publisher);
  }

  if (category) {
    result = result.filter((b) => deriveCategory(b) === category);
  }

  return result;
}

/**
 * Read one book by ISBN.
 */
export async function getBookByIsbn(isbn) {
  await delay();
  const all = loadAll();
  const found = all.find((b) => b.isbn === isbn);

  if (!found) throw new Error("Book not found");
  return found;
}

// ---------------------------------------------------------------------------
// CREATE
// ---------------------------------------------------------------------------

/**
 * Creates a new book.
 */
export async function createBook(data) {
  await delay(500);

  const all = loadAll();

  if (all.some((b) => b.isbn === data.isbn)) {
    throw new Error("A book with this ISBN already exists");
  }

  const created = { ...data };
  saveAll([created, ...all]);

  return created;
}

// ---------------------------------------------------------------------------
// UPDATE
// ---------------------------------------------------------------------------

/**
 * Updates a book by ISBN.
 */
export async function updateBook(isbn, patch) {
  await delay(400);

  const all = loadAll();
  const exists = all.some((b) => b.isbn === isbn);
  if (!exists) throw new Error("Book not found");

  const updatedList = all.map((b) =>
    b.isbn === isbn ? { ...b, ...patch } : b
  );

  saveAll(updatedList);
  return updatedList.find((b) => b.isbn === isbn);
}

// ---------------------------------------------------------------------------
// DELETE
// ---------------------------------------------------------------------------

/**
 * Deletes a book by ISBN.
 */
export async function deleteBook(isbn) {
  await delay(350);

  const all = loadAll();
  const before = all.length;

  const filtered = all.filter((b) => b.isbn !== isbn);
  saveAll(filtered);

  return filtered.length !== before; // true = deleted
}
