import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import DietaryFilters from "./DietaryFilters";
import Loading from "./Loading";

const Homepage = ({ onCardClick }) => {
  //Hardcoded test data (search dropdown)
  const mockIngredients = [
    { IngredientName: "Chicken" },
    { IngredientName: "Tomato" },
    { IngredientName: "Garlic" },
    { IngredientName: "Onion" },
    { IngredientName: "Pasta" },
    { IngredientName: "Rice" },
    { IngredientName: "Cheese" },
    { IngredientName: "Milk" },
    { IngredientName: "Eggs" },
    { IngredientName: "Bread" },
  ];

  const [availableIngredients, setAvailableIngredients] =
    useState(mockIngredients);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // //When BE is ready
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

  //Dietary filters
  const [filters, setFilters] = useState({
    //DEFAULT STATE
    vegan: false,
    vegetarian: false,
    "gluten-free": false,
    "dairy-free": false,
    keto: false,
    paleo: false,
  });

  const handleSearch = (selectedIngredients) => {
    //TO-DO: navigate to /results with ingredients as URL param
  };

  const handleFilterToggle = (filterKey) => {
    setFilters((previous) => ({
      //'UPDATED ON CLICK' STATE
      ...previous,
      [filterKey]: !previous[filterKey],
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      //'CLEAR ALL' STATE
      vegan: false,
      vegetarian: false,
      "gluten-free": false,
      "dairy-free": false,
      keto: false,
      paleo: false,
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Welcome to Recipe Generator</h1>
      <SearchBar
        onSearch={handleSearch}
        availableIngredients={availableIngredients}
        onCardClick={onCardClick}
      />
      <DietaryFilters
        filters={filters}
        onToggle={handleFilterToggle}
        onClearAll={handleClearAllFilters}
      />
    </div>
  );
};

export default Homepage;
