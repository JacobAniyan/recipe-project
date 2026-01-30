import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import InlineError from "./Inlineerror";
import SearchResultsRecipeCard from "./Searchresultsrecipecard";
import SortByDropdown from "./Sortbydropdown";

import { searchRecipes } from "../utils/api";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    ingredientIds = [],
    dietaryRestrictionIds = [],
    ingredientNames = [],
    filterNames = [],
  } = location.state || {};

  let sort_by = searchParams.get("sort_by");
  let order = searchParams.get("order");

  useEffect(() => {
    if (ingredientIds.length === 0) {
      setRecipes([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    searchRecipes(ingredientIds, dietaryRestrictionIds, sort_by, order)
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to search recipes. Please try again later.");
        setIsLoading(false);
      });
  }, [ingredientIds, dietaryRestrictionIds, sort_by, order]);

  return (
    <div className="page-container search-results-page">
      <div className="page-header">
        <h1>Recipe Results</h1>
        <div className="search-summary">
          <p>Recipes containing: {ingredientNames.join(", ")}</p>
          {filterNames.length > 0 && (
            <p>Selected Filters: {filterNames.join(", ")}</p>
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
            {isLoading ? (
              [...Array(6)].map((_, index) => (
                <SearchResultsRecipeCard key={index} loading={true} />
              ))
            ) : recipes.length > 0 ? (
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
