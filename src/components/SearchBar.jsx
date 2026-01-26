import { useState } from "react";
import InlineError from "./InlineError";

const SearchBar = ({ onSearch, availableIngredients = [] }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [error, setError] = useState(null);

  const dropdownIngredients = searchInput.trim()
    ? availableIngredients.filter((ingredient) =>
        ingredient.IngredientName.toLowerCase().startsWith(
          searchInput.toLowerCase(), //+ .includes(searchTerm.toLowerCase()) = More flexible search
        ),
      )
    : [];

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleAddIngredient = //EH: duplicate input
    (ingredientName) => {
      if (!selectedIngredients.includes(ingredientName)) {
        setSelectedIngredients([...selectedIngredients, ingredientName]);
      }
      // + setSearchTerm("");  = Clear input after selection
    };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove,
      ),
    );
  };

  const handleSubmit = //EH: page refresh & zero input
    (event) => {
      event.preventDefault();

      const result = onSearch(selectedIngredients);
      if (result && typeof result.then === "function") {
        result
          .then(() => setError(null))
          .catch((error) => {
            console.error("Search failed:", error);
            setError("Search failed. Please try again.");
          });
      } else {
        setError(null);
      }
    };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      {/* Search Input Wrapper - contains input, dropdown, and selected ingredients */}
      <div className="search-input-wrapper">
        <input
          type="text"
          id="ingredient-search"
          name="ingredientSearch"
          placeholder="Type your ingredient(s) here"
          value={searchInput}
          onChange={handleChange}
        />
        <ul className="ingredients-dropdown" role="listbox">
          {dropdownIngredients.map((ingredient) => (
            <li
              key={ingredient.IngredientName}
              onClick={() => handleAddIngredient(ingredient.IngredientName)}
              className="dropdown-item"
            >
              {ingredient.IngredientName}
            </li>
          ))}
        </ul>

        {error && <InlineError type="500" message={error} />}

        {selectedIngredients.length > 0 && (
          <div className="selected-ingredients">
            <p>Selected Ingredients:</p>
            <div className="selected-ingredients-list">
              {selectedIngredients.map((ingredient) => (
                <span key={ingredient} className="selected-ingredient-tag">
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient)}
                    aria-label={`Remove ${ingredient}`}
                    className="remove-ingredient-button"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="find-button"
        disabled={selectedIngredients.length === 0}
      >
        Find
      </button>
    </form>
  );
};

export default SearchBar;
