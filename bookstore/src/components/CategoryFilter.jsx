export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="mb-6">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 rounded shadow-sm"
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
