import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResultsRecipeCard from "./SearchResultsRecipeCard";
import Loading from "./Loading";
import SortByDropdown from "./SortByDropdown";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("match");

  const ingredientsParam = searchParams.get("ingredients");
  const filtersParam = searchParams.get("filters");

  const selectedIngredients = ingredientsParam //convert comma'd strings to array
    ? ingredientsParam.split(",")
    : [];
  const selectedFilters = filtersParam ? filtersParam.split(",") : [];

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
    getRecipes();
  }, [ingredientsParam, filtersParam]);

  const getRecipes = () => {
    if (selectedIngredients.length === 0) {
      navigate("/");
      return;
    }

    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams(); //Searchparams for API
    params.append("ingredients", ingredientsParam);
    if (filtersParam) {
      params.append("filters", filtersParam);
    }

    axios
      .get(`/recipes/search?${params.toString()}`)
      .then((response) => {
        setRecipes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Failed to load recipes. Please try again later.");
        setIsLoading(false);
      });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const recipesCopy = [...recipes]; //Sorted Duplicate Array logic
  let sortedRecipes;

  if (sortBy === "match") {
    sortedRecipes = recipesCopy.sort(
      (a, b) => (b.MatchPercentage || 0) - (a.MatchPercentage || 0),
    );
  } else if (sortBy === "CookTime") {
    sortedRecipes = recipesCopy.sort((a, b) => a.CookTime - b.CookTime);
  } else if (sortBy === "Difficulty") {
    const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
    sortedRecipes = recipesCopy.sort(
      (a, b) => difficultyOrder[a.Difficulty] - difficultyOrder[b.Difficulty],
    );
  } else if (sortBy === "CreatedAt") {
    sortedRecipes = recipesCopy.sort(
      (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt),
    );
  } else {
    sortedRecipes = recipesCopy;
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Recipe Results</h1>
        <div className="search-summary">
          <p>Recipes containing: {selectedIngredients.join(", ")}</p>
          {selectedFilters.length > 0 && (
            <p>Filters: {selectedFilters.join(", ")}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={getRecipes}>Try Again</button>
        </div>
      )}

      {!error && recipes.length > 0 && (
        <>
          <div className="results-sortBy">
            <SortByDropdown sortBy={sortBy} onSortChange={handleSortChange} />
          </div>

          <div className="results-list">
            {sortedRecipes.map((recipe) => (
              <SearchResultsRecipeCard key={recipe.RecipeId} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsPage;
