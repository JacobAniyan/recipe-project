import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import InlineError from "./Inlineerror";
import SearchResultsRecipeCard from "./Searchresultsrecipecard";
import SortByDropdown from "./SortByDropdown";

import { searchRecipes } from "../utils/api";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get IDs from URL params (if available) or fallback to location.state
  const ingredientIdsParam = searchParams.get('ingredientIds');
  const dietaryIdsParam = searchParams.get('dietaryRestrictionIds');
  const ingredientNamesParam = searchParams.get('ingredientNames');
  const filterNamesParam = searchParams.get('filterNames');

  const ingredientIds = ingredientIdsParam 
    ? ingredientIdsParam.split(',').map(Number)
    : (location.state?.ingredientIds || []);
  
  const dietaryRestrictionIds = dietaryIdsParam
    ? dietaryIdsParam.split(',').map(Number)
    : (location.state?.dietaryRestrictionIds || []);

  const ingredientNames = ingredientNamesParam
    ? ingredientNamesParam.split(',')
    : (location.state?.ingredientNames || []);

  const filterNames = filterNamesParam
    ? filterNamesParam.split(',')
    : (location.state?.filterNames || []);

  // Memoize the IDs to prevent infinite loops
  const memoizedIngredientIds = useMemo(() => ingredientIds, [JSON.stringify(ingredientIds)]);
  const memoizedDietaryIds = useMemo(() => dietaryRestrictionIds, [JSON.stringify(dietaryRestrictionIds)]);

  let sortBy = searchParams.get("sortBy");
  let sortOrder = searchParams.get("sortOrder");

  console.log('Sort params:', { sortBy, sortOrder });

  useEffect(() => {
    // Allow search with either ingredients OR dietary filters
    if (memoizedIngredientIds.length === 0 && memoizedDietaryIds.length === 0) {
      setRecipes([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    searchRecipes(memoizedIngredientIds, memoizedDietaryIds, sortBy, sortOrder)
      .then((data) => {
        console.log('Search results data:', data);
        // Only filter out 0% match when searching with ingredients
        // For filter-only searches, keep all results
        const filteredRecipes = Array.isArray(data) 
          ? (memoizedIngredientIds.length > 0 
              ? data.filter(recipe => recipe.matchPercentage !== 0)
              : data)
          : [];
        console.log('Filtered recipes:', filteredRecipes);
        setRecipes(filteredRecipes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Search Error:", error);
        setError("Unable to search recipes. Please try again later.");
        setIsLoading(false);
      });
  }, [memoizedIngredientIds, memoizedDietaryIds, sortBy, sortOrder]);

  return (
    <div className="page-container search-results-page">
      <div className="page-header">
        <h1>Recipe Results</h1>
        <div className="search-summary">
          {ingredientNames.length > 0 && (
            <p>Recipes containing: {ingredientNames.join(", ")}</p>
          )}
          {filterNames.length > 0 && (
            <p>Dietary Filters: {filterNames.join(", ")}</p>
          )}
          {ingredientNames.length === 0 && filterNames.length === 0 && (
            <p>All Recipes</p>
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
                  key={recipe.recipeId}
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
