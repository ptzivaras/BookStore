export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="flex gap-3 flex-wrap mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded border ${
            selected === cat
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-slate-700 border-slate-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
