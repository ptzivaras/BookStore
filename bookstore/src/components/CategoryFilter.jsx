import React from "react";

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-filter" style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "10px", fontWeight: "bold" }}>Category:</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
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
