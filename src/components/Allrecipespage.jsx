import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import InlineError from "./Inlineerror";
import RecipeCard from "./RecipeCard";
import SortByDropdown from "./SortByDropdown";

import { fetchRecipes } from "../utils/api";

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("order");

  useEffect(() => {
    console.log("Fetching recipes with:", { sortBy, sortOrder });
    setError(null);
    setIsLoading(true);

    fetchRecipes(sortBy, sortOrder)
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Unable to load recipes.");
        setIsLoading(false);
      });
  }, [sortBy, sortOrder]);

  return (
    <div className="page-container all-recipes-page">
      <div className="page-header">
        <h1>All Recipes</h1>
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
              [...Array(9)].map((_, index) => (
                <RecipeCard key={index} loading={true} />
              ))
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.recipeId} recipe={recipe} />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllRecipesPage;
