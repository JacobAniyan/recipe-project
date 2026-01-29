import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DietaryFilters from "./DietaryFilters";
import InlineError from "./InlineError";
import SearchBar from "./SearchBar";

const Homepage = () => {
  const navigate = useNavigate();

  //Hardcoded test data
  const mockIngredients = [
    { IngredientId: 1, IngredientName: "Chicken" },
    { IngredientId: 2, IngredientName: "Tomato" },
    { IngredientId: 3, IngredientName: "Garlic" },
    { IngredientId: 4, IngredientName: "Onion" },
    { IngredientId: 5, IngredientName: "Pasta" },
    { IngredientId: 6, IngredientName: "Rice" },
    { IngredientId: 7, IngredientName: "Cheese" },
    { IngredientId: 8, IngredientName: "Milk" },
    { IngredientId: 9, IngredientName: "Eggs" },
    { IngredientId: 10, IngredientName: "Bread" },
  ];

  const [availableIngredients, setAvailableIngredients] =
    useState(mockIngredients);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  ////pending BE implementation
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get("http://localhost:")
  //     .then((response) => {
  //       setAvailableIngredients(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       //EH: API failure
  //       setError("Failed to load ingredients");
  //       setLoading(false);
  //     });
  // }, []);

  const [filters, setFilters] = useState({
    //DEFAULT STATE
    vegan: false,
    vegetarian: false,
    "gluten-free": false,
    "dairy-free": false,
    keto: false,
    paleo: false,
  });

  const dietaryRestrictionMap = {
    vegan: 1,
    vegetarian: 2,
    "gluten-free": 3,
    "dairy-free": 4,
    keto: 5,
    paleo: 6,
  };

  const handleFilterToggle = (filterKey) => {
    setFilters((previous) => ({
      //UPDATED ON CLICK STATE
      ...previous,
      [filterKey]: !previous[filterKey],
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      //CLEAR ALL STATE
      vegan: false,
      vegetarian: false,
      "gluten-free": false,
      "dairy-free": false,
      keto: false,
      paleo: false,
    });
  };

  const handleIngredientsChange = (ingredients) => {
    setSelectedIngredients(ingredients);
  };

  const handleFindClick = () => {
    if (selectedIngredients.length === 0) {
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

    const activeFilterKeys = Object.keys(filters).filter((key) => filters[key]);
    const dietaryRestrictionIds = activeFilterKeys.map(
      (key) => dietaryRestrictionMap[key],
    );

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

  return (
    <div className="homepage">
      <h1>Welcome to Recipe Generator</h1>
      <div className="search-section">
        <SearchBar
          availableIngredients={availableIngredients}
          onIngredientsChange={handleIngredientsChange}
        />
        <DietaryFilters
          filters={filters}
          onToggle={handleFilterToggle}
          onClearAll={handleClearAllFilters}
        />
        <button
          type="button"
          className="find-button"
          onClick={handleFindClick}
          disabled={selectedIngredients.length === 0}
        >
          Find
        </button>
      </div>
    </div>
  );
};

export default Homepage;
