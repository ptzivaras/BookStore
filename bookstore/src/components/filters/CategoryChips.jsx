export default function CategoryChips({ categories, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-full border ${
          selected === "all"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full border ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
