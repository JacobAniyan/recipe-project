function DietaryFilters({ filters, availableFilters = [], onToggle, onClearAll }) {
  // Generate filter options from API data or use default
  const filterOptions = availableFilters.length > 0
    ? availableFilters.map((filter) => ({
        key: filter.DietaryRestrictionName.toLowerCase().replace(/\s+/g, '-'),
        label: filter.DietaryRestrictionName,
      }))
    : [
        { key: "vegan", label: "Vegan" },
        { key: "vegetarian", label: "Vegetarian" },
        { key: "gluten-free", label: "Gluten-Free" },
        { key: "dairy-free", label: "Dairy-Free" },
        { key: "keto", label: "Keto" },
        { key: "paleo", label: "Paleo" },
      ];

  return (
    <div className="dietary-filters">
      <div className="filters-header">
        <p className="filters-description">Filter by Diet:</p>
        <button className="clear-filters-button" onClick={onClearAll}>
          Clear All
        </button>
      </div>

      <div className="filters-list">
        {filterOptions.map((filter) => (
          <label key={filter.key} className="filter-option">
            <input
              type="checkbox"
              checked={filters[filter.key] || false}
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
