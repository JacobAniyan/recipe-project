import { useSearchParams } from "react-router-dom";

const SortByDropdown = () => {
  const [setSearchParams] = useSearchParams();

  return (
    <div className="sort-by">
      <label>Sort by:</label>
      <div className="sort-buttons">
        <button onClick={() => setSearchParams("?sort_by=match&order=DESC")}>
          Best Match
        </button>
        <button onClick={() => setSearchParams("?sort_by=CookTime&order=ASC")}>
          Cook Time (Low to High)
        </button>
        <button onClick={() => setSearchParams("?sort_by=CookTime&order=DESC")}>
          Cook Time (High to Low)
        </button>
        <button
          onClick={() => setSearchParams("?sort_by=Difficulty&order=ASC")}
        >
          Difficulty (Easy to Hard)
        </button>
        <button
          onClick={() => setSearchParams("?sort_by=Difficulty&order=DESC")}
        >
          Difficulty (Hard to Easy)
        </button>
        <button
          onClick={() => setSearchParams("?sort_by=CreatedAt&order=DESC")}
        >
          Date Added (Newest First)
        </button>
        <button onClick={() => setSearchParams("?sort_by=CreatedAt&order=ASC")}>
          Date Added (Oldest First)
        </button>
      </div>
    </div>
  );
};

export default SortByDropdown;
