import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DietaryFilters from "./DietaryFilters";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

const Homepage = () => {
  const navigate = useNavigate();

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
  const [error, setError] = useState(null);

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

  const handleSearch = (selectedIngredients) => {
    const params = new URLSearchParams();
    params.append("ingredients", selectedIngredients.join(","));

    const activeFilters = Object.keys(filters).filter((key) => filters[key]);
    if (activeFilters.length > 0) {
      params.append("filters", activeFilters.join(","));
    }

    navigate(`/results?${params.toString()}`);
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
