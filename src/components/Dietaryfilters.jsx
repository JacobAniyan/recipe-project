function DietaryFilters({
  filters,
  availableFilters = [],
  onToggle,
  onClearAll,
}) {
  const filterOptions = availableFilters.map((filter) => ({
    key: filter.DietaryRestrictionName.toLowerCase().replace(/\s+/g, "-"),
    label: filter.DietaryRestrictionName,
  }));

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
