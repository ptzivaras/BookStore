import { useState } from "react";
import { createBook } from "../services/api";
import { validateBook } from "../utils/validation";
import { useToast } from "../context/ToastContext";
import { useLoading } from "../context/LoadingContext";

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

  const toast = useToast();
  const { showLoading, hideLoading } = useLoading();

  function update(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const err = validateBook(form);
    setErrors(err);
    if (Object.keys(err).length) return;

    try {
      showLoading();
      setStatus("loading");

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

      toast.showSuccess("Book created successfully.");
      setStatus("success");

      // Reset
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
      setErrors({});
    } catch (err) {
      const msg = err?.message || "Failed to create book.";
      setErrors({ form: msg });
      toast.showError(msg);
    } finally {
      hideLoading();
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6 space-y-6">
        <h1 className="text-2xl font-semibold dark:text-slate-100">
          Add New Book
        </h1>

        {errors.form && (
          <p className="text-red-600 dark:text-red-400 text-sm">{errors.form}</p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title}</p>
            )}
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

          {/* Publisher + Year */}
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
              {errors.year && (
                <p className="text-red-600 text-sm">{errors.year}</p>
              )}
            </div>
          </div>

          {/* Pages + Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Page Numbers</label>
              <input
                className="input"
                value={form.pages}
                onChange={(e) => update("pages", e.target.value)}
              />
              {errors.pages && (
                <p className="text-red-600 text-sm">{errors.pages}</p>
              )}
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

          {/* Authors */}
          <div>
            <label className="label">Authors (comma separated)</label>
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
            {errors.authors && (
              <p className="text-red-600 text-sm">{errors.authors}</p>
            )}
          </div>

          {/* ISBNs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">ISBN-10</label>
              <input
                className="input"
                value={form.isbn10}
                onChange={(e) => update("isbn10", e.target.value)}
              />
              {errors.isbn10 && (
                <p className="text-red-600 text-sm">{errors.isbn10}</p>
              )}
            </div>

            <div>
              <label className="label">ISBN-13</label>
              <input
                className="input"
                value={form.isbn13}
                onChange={(e) => update("isbn13", e.target.value)}
              />
              {errors.isbn13 && (
                <p className="text-red-600 text-sm">{errors.isbn13}</p>
              )}
            </div>
          </div>

          <button
            className="btn bg-indigo-600 text-white border-indigo-600"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Saving…" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
