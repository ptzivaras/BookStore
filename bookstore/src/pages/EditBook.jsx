import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookByIsbn, updateBook } from "../services/api";
import { useToast } from "../context/ToastContext";
import { useLoading } from "../context/LoadingContext";

export default function EditBook() {
  const { isbn } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    author: "",
    pages: "",
    description: "",
    publisher: "",
  });
  const [notFound, setNotFound] = useState(false);

  const toast = useToast();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        showLoading();
        const b = await getBookByIsbn(isbn);
        if (!alive) return;

        setForm({
          title: b.title || "",
          subtitle: b.subtitle || "",
          author: b.author || "",
          pages: b.pages || "",
          description: b.description || "",
          publisher: b.publisher || "",
        });
      } catch {
        setNotFound(true);
        toast.showError("Book not found.");
      } finally {
        hideLoading();
      }
    })();

    return () => {
      alive = false;
    };
  }, [isbn]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      showLoading();
      await updateBook(isbn, {
        title: form.title,
        subtitle: form.subtitle,
        author: form.author,
        pages: Number(form.pages) || form.pages,
        description: form.description,
        publisher: form.publisher,
      });
      toast.showSuccess("Book updated.");
      navigate(`/book/${isbn}`);
    } catch {
      toast.showError("Failed to update book.");
    } finally {
      hideLoading();
    }
  }

  if (notFound)
    return <p className="p-6 text-slate-600 dark:text-slate-400">Book not found.</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4 dark:text-slate-100">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            name="title"
            className="input"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Subtitle</label>
          <input
            name="subtitle"
            className="input"
            value={form.subtitle}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Author</label>
          <input
            name="author"
            className="input"
            value={form.author}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Publisher</label>
          <input
            name="publisher"
            className="input"
            value={form.publisher}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Pages</label>
          <input
            name="pages"
            className="input"
            value={form.pages}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            className="input min-h-[120px]"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3">
          <button
            className="btn bg-indigo-600 text-white"
            type="submit"
          >
            Save
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
