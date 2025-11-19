import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search books..."
        className="input w-full"
      />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
}
