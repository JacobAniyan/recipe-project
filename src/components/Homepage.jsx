import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const Homepage = () => {
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:")
      .then((response) => {
        setAvailableIngredients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load ingredients"); //EH: API failure
        setLoading(false);
      });
  }, []);

  const handleSearch = (selectedIngredients) => {
    //navigate to /results with ingredients as URL param
  };

  if (loading) {
    return <div>Loading...</div>;
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
