import { useSearchParams } from "react-router-dom";

const SortByDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="sort-by">
      <label>Sort by:</label>
      <div className="sort-buttons">
        <button onClick={() => setSearchParams({sortBy: "match", sortorder: "desc"})}>
          Best Match
        </button>
        <button onClick={() => setSearchParams({sortBy: "cooktime", sortorder: "asc"})}>
          Cook Time (Low to High)
        </button>
        <button onClick={() => setSearchParams({sortBy: "cooktime", sortorder: "desc"})}>
          Cook Time (High to Low)
        </button>
        <button
          onClick={() => setSearchParams({sortBy: "difficulty", sortorder: "asc"})}
        >
          Difficulty (Easy to Hard)
        </button>
        <button
          onClick={() => setSearchParams({sortBy: "difficulty", sortorder: "desc"})}
        >
          Difficulty (Hard to Easy)
        </button>
        <button
          onClick={() => setSearchParams({sortBy: "date", sortorder: "asc"})}
        >
          Date Added (Newest First)
        </button>
        <button onClick={() => setSearchParams({sortBy: "date", sortorder: "desc"})}>
          Date Added (Oldest First)
        </button>
      </div>
    </div>
  );
};

export default SortByDropdown;
