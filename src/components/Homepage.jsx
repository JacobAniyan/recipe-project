import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Loading from "./Loading";

const Homepage = () => {
  //Hardcoded test data
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
  //   axios
  //     .get("http://localhost:")
  //     .then((response) => {
  //       setAvailableIngredients(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //      //EH: API failure
  //       setError("Failed to load ingredients");
  //       setLoading(false);
  //     });
  // }, []);

  const handleSearch = (selectedIngredients) => {
    //navigate to /results with ingredients as URL param
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome to Recipe Generator</h1>
      <SearchBar
        onSearch={handleSearch}
        availableIngredients={availableIngredients}
      />
    </div>
  );
};

export default Homepage;
