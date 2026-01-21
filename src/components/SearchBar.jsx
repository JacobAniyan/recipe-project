import React, { useState } from "react";

const SearchBar = ({ onSearch, availableIngredients = [] }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [error, setError] = useState("");

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
      }
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

      if (selectedIngredients.length === 0) {
        setError("Please select at least one ingredient");
        return;
      }

      onSearch(selectedIngredients)
        .then(() => {
          setError("");
        })
        .catch((error) => {
          //EH: API failure
          setError("Search failed. Please try again.");
        });
    };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Enter ingredients"
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

        {error && <p className="error-message">{error}</p>}

        {selectedIngredients.length > 0 && (
          <div className="selected-ingredients">
            <p>Selected Ingredients:</p>
            <ul>
              {selectedIngredients.map((ingredient) => (
                <li key={ingredient} className="selected-ingredient">
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient)}
                    aria-label={`Remove ${ingredient}`}
                    className="remove-ingredient-btn"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" disabled={selectedIngredients.length === 0}>
          Find
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
