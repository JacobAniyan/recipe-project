import { useState, useEffect, useRef } from "react";

import InlineError from "./InlineError";

const SearchBar = ({ onIngredientsChange, availableIngredients = [] }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const dropdownIngredients = searchInput.trim()
    ? availableIngredients.filter((ingredient) =>
        ingredient.IngredientName.toLowerCase().startsWith(
          searchInput.toLowerCase(),
        ),
      )
    : [];

  useEffect(() => {
    if (searchInput.trim() && dropdownIngredients.length > 0) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [searchInput, dropdownIngredients.length]);

  useEffect(() => {
    onIngredientsChange(selectedIngredients);
  }, [selectedIngredients, onIngredientsChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    setError(null);
  };

  const handleAddIngredient = (ingredientName) => {
    if (!selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
      setError(null);
    } else {
      setError({
        type: "400",
        message: `"${ingredientName}" is already in your ingredients list.`,
      });
      return;
    }
    setSearchInput("");
    setIsDropdownVisible(false);
    inputRef.current?.focus();
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove,
      ),
    );
    setError(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsDropdownVisible(false);
      setSearchInput("");
    }
  };

  const handleInputFocus = () => {
    if (searchInput.trim() && dropdownIngredients.length > 0) {
      setIsDropdownVisible(true);
    }
  };

  if (availableIngredients.length === 0) {
    return (
      <div className="search-bar-container">
        <InlineError
          type="500"
          message="No ingredients available. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            id="ingredient-search"
            name="ingredientSearch"
            placeholder="Type your ingredient(s) here"
            value={searchInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            autoComplete="off"
          />

          <ul
            ref={dropdownRef}
            className={`ingredients-dropdown ${isDropdownVisible ? "visible" : ""}`}
            role="listbox"
          >
            {dropdownIngredients.length > 0
              ? dropdownIngredients.map((ingredient) => (
                  <li
                    key={ingredient.IngredientName}
                    onClick={() =>
                      handleAddIngredient(ingredient.IngredientName)
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    className="dropdown-item"
                    role="option"
                  >
                    {ingredient.IngredientName}
                  </li>
                ))
              : searchInput.trim() && (
                  <li className="dropdown-no-results">No ingredients found</li>
                )}
          </ul>
        </div>

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
    </div>
  );
};

export default SearchBar;
