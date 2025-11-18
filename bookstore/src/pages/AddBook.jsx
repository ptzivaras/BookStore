import { useState } from "react";
import { createBook } from "../services/api";
import { validateBook } from "../utils/validation";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    categories: [],
    authors: [],
    publisher: "",
    year: "",
    pages: "",
    isbn10: "",
    isbn13: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function update(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const err = validateBook(form);
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus("loading");
    try {
      await createBook({
        isbn: form.isbn13,
        title: form.title,
        subtitle: form.categories?.[0] || "General",
        author: form.authors?.[0] || "Unknown",
        published: `${form.year}-01-01T00:00:00.000Z`,
        publisher: form.publisher,
        pages: Number(form.pages),
        description: form.description,
        website: "#",
      });
      setStatus("success");
      setForm({
        title: "",
        description: "",
        categories: [],
        authors: [],
        publisher: "",
        year: "",
        pages: "",
        isbn10: "",
        isbn13: "",
      });
    } catch (err) {
      setStatus("error");
      setErrors({ form: err.message });
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Add new Book</h1>

      {errors.form && <p className="text-red-600 text-sm">{errors.form}</p>}
      {status === "success" && (
        <p className="text-green-700 text-sm">Book created successfully.</p>
      )}

      <div>
        <label className="label">Title</label>
        <input
          className="input"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          className="input min-h-[120px]"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Publisher</label>
          <input
            className="input"
            value={form.publisher}
            onChange={(e) => update("publisher", e.target.value)}
          />
          {errors.publisher && (
            <p className="text-red-600 text-sm">{errors.publisher}</p>
          )}
        </div>
        <div>
          <label className="label">Year</label>
          <input
            className="input"
            value={form.year}
            onChange={(e) => update("year", e.target.value)}
          />
          {errors.year && <p className="text-red-600 text-sm">{errors.year}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Page Numbers</label>
          <input
            className="input"
            value={form.pages}
            onChange={(e) => update("pages", e.target.value)}
          />
          {errors.pages && <p className="text-red-600 text-sm">{errors.pages}</p>}
        </div>
        <div>
          <label className="label">Categories (comma separated)</label>
          <input
            className="input"
            value={form.categories.join(", ")}
            onChange={(e) =>
              update(
                "categories",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
          {errors.categories && (
            <p className="text-red-600 text-sm">{errors.categories}</p>
          )}
        </div>
      </div>

      <div>
        <label className="label">Authors (comma separated, up to 3)</label>
        <input
          className="input"
          value={form.authors.join(", ")}
          onChange={(e) =>
            update(
              "authors",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
        {errors.authors && <p className="text-red-600 text-sm">{errors.authors}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">ISBN-10</label>
          <input
            className="input"
            value={form.isbn10}
            onChange={(e) => update("isbn10", e.target.value)}
          />
          {errors.isbn10 && <p className="text-red-600 text-sm">{errors.isbn10}</p>}
        </div>
        <div>
          <label className="label">ISBN-13</label>
          <input
            className="input"
            value={form.isbn13}
            onChange={(e) => update("isbn13", e.target.value)}
          />
          {errors.isbn13 && <p className="text-red-600 text-sm">{errors.isbn13}</p>}
        </div>
      </div>

      <button
        className="btn bg-indigo-600 text-white border-indigo-600"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
