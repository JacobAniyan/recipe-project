import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DietaryFilters from "./Dietaryfilters";
import InlineError from "./Inlineerror";
import SearchBar from "./SearchBar";

import { fetchIngredients, fetchDietaryFilters } from "../utils/api";

const Homepage = () => {
  const navigate = useNavigate();
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [availableDietaryFilters, setAvailableDietaryFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  //Fetch ingredients from API
  useEffect(() => {
    setLoading(true);
    fetchIngredients()
      .then((data) => {
        const parsedIngredients = data.map((item) => ({
          IngredientId: item.ingredientId,
          IngredientName: item.ingredientName,
        }));

        setAvailableIngredients(parsedIngredients);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
        setError("Failed to load ingredients");
        setLoading(false);
      });
  }, []);

  //Fetch dietary restrictions from API
  useEffect(() => {
    fetchDietaryFilters()
      .then((data) => {
        const filtersArray = data.dietaryRestrictions || [];

        // Convert array of strings to objects with IDs
        const parsedFilters = filtersArray.map((name, index) => ({
          DietaryRestrictionId: index + 1,
          DietaryRestrictionName: name,
        }));

        setAvailableDietaryFilters(parsedFilters);
      })
      .catch((error) => {
        console.error("Failed to load dietary filters:", error);
      });
  }, []);

  const [filters, setFilters] = useState({});

  // Initialize filters when dietary restrictions are loaded
  useEffect(() => {
    if (availableDietaryFilters.length > 0) {
      const initialFilters = {};
      availableDietaryFilters.forEach((filter) => {
        const key = filter.DietaryRestrictionName.toLowerCase().replace(
          /\s+/g,
          "-",
        );
        initialFilters[key] = false;
      });
      setFilters(initialFilters);
    }
  }, [availableDietaryFilters]);

  // Create dynamic dietary restriction map
  const dietaryRestrictionMap = availableDietaryFilters.reduce(
    (map, filter) => {
      const key = filter.DietaryRestrictionName.toLowerCase().replace(
        /\s+/g,
        "-",
      );
      map[key] = filter.DietaryRestrictionId;
      return map;
    },
    {},
  );

  const handleFilterToggle = (filterKey) => {
    setFilters((previous) => ({
      //UPDATED ON CLICK STATE
      ...previous,
      [filterKey]: !previous[filterKey],
    }));
  };

  const handleClearAllFilters = () => {
    const clearedFilters = {};
    Object.keys(filters).forEach((key) => {
      clearedFilters[key] = false;
    });
    setFilters(clearedFilters);
  };

  const handleIngredientsChange = (ingredients) => {
    setSelectedIngredients(ingredients);
  };

  const handleFindClick = () => {
    const activeFilterKeys = Object.keys(filters).filter((key) => filters[key]);

    const ingredientIds = selectedIngredients
      .map((name) => {
        const ingredient = availableIngredients.find(
          (ingredient) => ingredient.IngredientName === name,
        );

        if (ingredient) {
          return ingredient.IngredientId;
        } else {
          return null;
        }
      })
      .filter((id) => id !== null);

    const dietaryRestrictionIds = activeFilterKeys.map(
      (key) => dietaryRestrictionMap[key],
    );

    console.log("Active Filter Keys:", activeFilterKeys);
    console.log("Dietary Restriction Map:", dietaryRestrictionMap);
    console.log("Dietary Restriction IDs:", dietaryRestrictionIds);
    console.log("Ingredient IDs:", ingredientIds);

    // Use URL params to persist data across navigation
    const params = new URLSearchParams();
    if (ingredientIds.length > 0) {
      params.set("ingredientIds", ingredientIds.join(","));
      params.set("ingredientNames", selectedIngredients.join(","));
    }
    if (dietaryRestrictionIds.length > 0) {
      params.set("dietaryRestrictionIds", dietaryRestrictionIds.join(","));
      params.set("filterNames", activeFilterKeys.join(","));
    }

    navigate(`/results?${params.toString()}`);
  };

  if (error) {
    return <InlineError type="500" message={error} />;
  }

  const ingredientNames = availableIngredients.map((i) => i.IngredientName);

  return (
    <div className="homepage">
      <h1>Welcome to Recipe Generator</h1>
      <div className="search-section">
        <SearchBar
          availableIngredients={ingredientNames}
          onIngredientsChange={handleIngredientsChange}
          loading={loading}
        />
        <DietaryFilters
          filters={filters}
          availableFilters={availableDietaryFilters}
          onToggle={handleFilterToggle}
          onClearAll={handleClearAllFilters}
        />
        <button
          type="button"
          className="find-button"
          onClick={handleFindClick}
          disabled={
            selectedIngredients.length === 0 &&
            Object.values(filters).every((value) => value === false)
          }
        >
          Find
        </button>
      </div>
    </div>
  );
};

export default Homepage;
