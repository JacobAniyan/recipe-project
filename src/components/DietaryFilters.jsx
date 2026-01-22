function DietaryFilters({ filters, onToggle, onClearAll }) {
  const filterOptions = [
    { key: "vegan", label: "Vegan" },
    { key: "vegetarian", label: "Vegetarian" },
    { key: "gluten-free", label: "Gluten-Free" },
    { key: "dairy-free", label: "Dairy-Free" },
    { key: "keto", label: "Keto" },
    { key: "paleo", label: "Paleo" },
  ];

  return (
    <div className="dietary-filters">
      {/* Header */}
      <div className="filters-header">
        <p className="filters-description">filter by diet</p>
        <button className="clear-filters-button" onClick={onClearAll}>
          Clear All
        </button>
      </div>

      {/* Filter checkboxes */}
      <div className="filters-list">
        {filterOptions.map((filter) => (
          <label key={filter.key} className="filter-option">
            <input
              type="checkbox"
              checked={filters[filter.key]}
              onChange={() => onToggle(filter.key)}
            />
            {filter.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default DietaryFilters;
