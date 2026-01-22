const SortByDropdown = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-by">
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" value={sortBy} onChange={onSortChange}>
        <option value="match">Best Match</option>
        <option value="CookTime">Cook Time</option>
        <option value="Difficulty">Difficulty</option>
        <option value="CreatedAt">Date Added</option>
      </select>
    </div>
  );
};

export default SortByDropdown;
