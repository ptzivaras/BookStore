export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="mb-6">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border border-slate-300 dark:border-slate-600 px-3 py-2 rounded shadow-sm bg-white dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
