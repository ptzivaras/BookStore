import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search books by title or author…"
        className="
          input flex-1
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          text-slate-800 dark:text-slate-100
        "
      />

      <button
        type="submit"
        className="
          bg-indigo-600 hover:bg-indigo-700
          text-white px-4 py-2 rounded
          transition
        "
      >
        Search
      </button>
    </form>
  );
}
