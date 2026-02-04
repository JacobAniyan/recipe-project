import { useState, useEffect } from "react";

import RecipeCard from "./Recipecard";

import InlineError from "./Inlineerror";

import { fetchRelatedRecipes } from "../utils/api";

const RelatedRecipes = ({ currentRecipeId, currentRecipeIngredients }) => {
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if we don't have the necessary data
    if (
      !currentRecipeId ||
      !currentRecipeIngredients ||
      currentRecipeIngredients.length === 0
    ) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchRelatedRecipes(currentRecipeId, currentRecipeIngredients)
      .then((data) => {
        setRelatedRecipes(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch related recipes:", err);
        setError("Unable to load related recipes.");
        setIsLoading(false);
      });
  }, [currentRecipeId, currentRecipeIngredients]);

  // Don't render section if there are no related recipes and not loading
  if (!isLoading && relatedRecipes.length === 0 && !error) {
    return null;
  }

  return (
    <section className="related-recipes-section">
      <h2>You Might Also Like</h2>

      {error ? (
        <InlineError type="500" message={error} />
      ) : (
        <div className="recipe-grid">
          {isLoading ? (
            // Show skeleton loading cards
            [...Array(3)].map((_, index) => (
              <RecipeCard key={index} loading={true} />
            ))
          ) : relatedRecipes.length > 0 ? (
            // Show related recipe cards
            relatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.recipeId} recipe={recipe} />
            ))
          ) : (
            <p>No related recipes found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default RelatedRecipes;
