import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DietaryFilters from "./Dietaryfilters";
import InlineError from "./Inlineerror";
import SearchBar from "./Searchbar";
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
        // Handle new API format: array of objects with ingredientId and ingredientName
        const parsedIngredients = data.map((item) => {
          // If item is already an object with ingredientId and ingredientName
          if (
            typeof item === "object" &&
            item.ingredientId &&
            item.ingredientName
          ) {
            return {
              IngredientId: item.ingredientId,
              IngredientName: item.ingredientName,
            };
          }
          // Handle old string format "1:Avocado"
          else if (typeof item === "string" && item.includes(":")) {
            const [id, ...nameParts] = item.split(":");
            return {
              IngredientId: Number(id),
              IngredientName: nameParts.join(":").trim(),
            };
          }
          // Fallback for plain strings
          else {
            console.warn(`Unexpected ingredient format:`, item);
            return {
              IngredientId: 0,
              IngredientName: String(item),
            };
          }
        });

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
        // Handle different data formats
        let filtersArray = [];

        if (Array.isArray(data)) {
          filtersArray = data;
        } else if (
          data.dietaryRestrictions &&
          Array.isArray(data.dietaryRestrictions)
        ) {
          // If it's an object with dietaryRestrictions property
          filtersArray = data.dietaryRestrictions;
        } else if (typeof data === "object" && data !== null) {
          // If it's an object, convert to array
          filtersArray = Object.values(data);
        }

        // Parse "1:Vegan" => { DietaryRestrictionId: 1, DietaryRestrictionName: "Vegan" }
        const parsedFilters = filtersArray.map((item, index) => {
          if (typeof item === "string") {
            if (item.includes(":")) {
              const [id, ...nameParts] = item.split(":");
              return {
                DietaryRestrictionId: Number(id),
                DietaryRestrictionName: nameParts.join(":").trim(),
              };
            } else {
              return {
                DietaryRestrictionId: index + 1,
                DietaryRestrictionName: item,
              };
            }
          } else if (typeof item === "object" && item !== null) {
            // If item is already an object
            return {
              DietaryRestrictionId:
                item.DietaryRestrictionId || item.id || index + 1,
              DietaryRestrictionName:
                item.DietaryRestrictionName || item.name || String(item),
            };
          }
          return {
            DietaryRestrictionId: index + 1,
            DietaryRestrictionName: String(item),
          };
        });

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

    // Require at least one ingredient OR one dietary filter
    if (selectedIngredients.length === 0 && activeFilterKeys.length === 0) {
      return;
    }

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

    console.log('Active Filter Keys:', activeFilterKeys);
    console.log('Dietary Restriction Map:', dietaryRestrictionMap);
    console.log('Dietary Restriction IDs:', dietaryRestrictionIds);
    console.log('Ingredient IDs:', ingredientIds);

    navigate(`/results`, {
      state: {
        ingredientIds,
        dietaryRestrictionIds,
        ingredientNames: selectedIngredients,
        filterNames: activeFilterKeys,
      },
    });
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
