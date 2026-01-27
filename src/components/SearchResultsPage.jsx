import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultsRecipeCard from "./SearchResultsRecipeCard";
import Loader from "./Loader";
import SortByDropdown from "./SortByDropdown";
import InlineError from "./InlineError";
import { searchRecipes } from "../utils/api";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ingredientsParam = searchParams.get("ingredients");
  const filtersParam = searchParams.get("filters");
  let sort_by = searchParams.get("sort_by");
  let order = searchParams.get("order");

  const selectedIngredients = ingredientsParam
    ? ingredientsParam.split(",")
    : [];
  const selectedFilters = filtersParam ? filtersParam.split(",") : [];

  useEffect(() => {
    if (selectedIngredients.length === 0) {
      setRecipes([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    searchRecipes(ingredientsParam, selectedFilters, sort_by, order)
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to search recipes. Please try again later.");
        setIsLoading(false);
      });
  }, [ingredientsParam, filtersParam, sort_by, order]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="page-container search-results-page">
      <div className="page-header">
        <h1>Recipe Results</h1>
        <div className="search-summary">
          <p>Recipes containing: {selectedIngredients.join(", ")}</p>
          {selectedFilters.length > 0 && (
            <p>Selected Filters: {selectedFilters.join(", ")}</p>
          )}
        </div>
      </div>

      {error ? (
        <InlineError type="500" message={error} />
      ) : (
        <>
          <div className="sortBy-container">
            <SortByDropdown />
          </div>

          <div className="recipe-grid">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <SearchResultsRecipeCard
                  key={recipe.RecipeId}
                  recipe={recipe}
                />
              ))
            ) : (
              <p>No recipes found matching your ingredients.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsPage;
