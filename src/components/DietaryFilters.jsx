function DietaryFilters({ filters, onToggle, onClearAll }) {
  const filterOptions = [
    { key: "vegan", label: "Vegan", icon: "🌱" },
    { key: "vegetarian", label: "Vegetarian", icon: "🥗" },
    { key: "pescatarian", label: "Pescatarian", icon: "🐟" },
    { key: "glutenFree", label: "Gluten-Free", icon: "🌾" },
    { key: "keto", label: "Keto", icon: "🥑" },
  ];

  const allFilterValues = Object.values(filters);
  const activeFilters = allFilterValues.filter(Boolean);
  const activeCount = activeFilters.length;

  return (
    <div className="dietary-filters">
      {/* Header */}
      <div className="filters-header">
        <h3>Dietary Filters</h3>

        {/* filters are optional */}
        <p className="filters-description">Refine your recipe matches</p>

        {/* Can Clear All button only at least one filter is active */}
        {activeCount > 0 && (
          <button className="clear-filters-btn" onClick={onClearAll}>
            Clear All ({activeCount})
          </button>
        )}
      </div>
      <div className="filter-grid">
        {/* Map through filterOptions array to create a checkbox for each filter */}
        {filterOptions.map((option) => (
          <label
            key={option.key}
            // Add 'active' class when this filter is selected for styling
            className={`filter-option ${filters[option.key] ? "active" : ""}`}
          >
            {/* Hidden checkbox - actual input element for accessibility */}
            <input
              type="checkbox"
              checked={filters[option.key] || false}
              onChange={() => onToggle(option.key)}
            />
            {/* Display icon and label directly */}
            {option.icon} {option.label}
          </label>
        ))}
      </div>

      {/* Active filters summary */}
      {activeCount > 0 && (
        <div className="active-filters">
          <p className="active-label">Active filters:</p>

          {/* Display active filters as tags */}
          <div className="active-tags">
            {/* only show active filters, then map to display */}
            {filterOptions
              .filter((opt) => filters[opt.key])
              .map((opt) => (
                <div key={opt.key} className="active-tag">
                  {opt.icon} {opt.label}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DietaryFilters;
