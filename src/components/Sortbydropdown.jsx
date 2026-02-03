import { useSearchParams } from "react-router-dom";

const SortByDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleSort = (sortBy, sortOrder) => {
    // Preserve existing search params and update sort params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", sortBy);
    newParams.set("sortOrder", sortOrder);
    setSearchParams(newParams);
  };

  return (
    <div className="sort-by">
      <label>Sort by:</label>
      <div className="sort-buttons">
        <button onClick={() => handleSort("match", "desc")}>
          Best Match
        </button>
        <button onClick={() => handleSort("cooktime", "asc")}>
          Cook Time (Low to High)
        </button>
        <button onClick={() => handleSort("cooktime", "desc")}>
          Cook Time (High to Low)
        </button>
        <button onClick={() => handleSort("difficulty", "asc")}>
          Difficulty (Easy to Hard)
        </button>
        <button onClick={() => handleSort("difficulty", "desc")}>
          Difficulty (Hard to Easy)
        </button>
        <button onClick={() => handleSort("date", "asc")}>
          Date Added (Newest First)
        </button>
        <button onClick={() => handleSort("date", "desc")}>
          Date Added (Oldest First)
        </button>
      </div>
    </div>
  );
};

export default SortByDropdown;
