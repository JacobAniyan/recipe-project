import { useState } from "react";
import InlineError from "./InlineError";

const SearchBar = ({ onSearch, availableIngredients = [] }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [error, setError] = useState(null);

  const dropdownIngredients = searchInput.trim()
    ? availableIngredients.filter((ingredient) =>
        ingredient.IngredientName.toLowerCase().startsWith(
          searchInput.toLowerCase(),
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
        setError(null);
      }
    };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove,
      ),
    );
    setError(null);
  };

  const handleSubmit = //EH: page refresh & zero input
    (event) => {
      event.preventDefault();

      if (selectedIngredients.length === 0) {
        setError({
          type: "400",
          message: "Please select at least one ingredient to search.",
        });
        return;
      }

      setError(null);
      onSearch(selectedIngredients);
    };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      {/* Search Input */}
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

        {error && <InlineError type={error.type} message={error.message} />}

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
      <button type="submit" className="find-button">
        Find
      </button>
    </form>
  );
};

export default SearchBar;
