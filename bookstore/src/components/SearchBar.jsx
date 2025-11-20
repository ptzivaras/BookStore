// import { useState } from "react";

// export default function SearchBar({ onSearch }) {
//   const [term, setTerm] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(term);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
//       <input
//         value={term}
//         onChange={(e) => setTerm(e.target.value)}
//         placeholder="Search books..."
//         className="input w-full"
//       />
//       <button type="submit" className="btn">
//         Search
//       </button>
//     </form>
//   );
// }
import { useState, useEffect } from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  const [term, setTerm] = useState(value ?? "");

  useEffect(() => {
    setTerm(value ?? "");
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(term);
    else if (onChange) onChange(term);
  };

  const handleChange = (e) => {
    const v = e.target.value;
    setTerm(v);
    if (onChange) onChange(v);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={term}
        onChange={handleChange}
        placeholder="Search books..."
        className="input w-full"
      />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
}