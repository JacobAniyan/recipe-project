import RecipeCard from "./Recipecard";
import InlineError from "./Inlineerror";

const RelatedRecipes = ({ currentRecipeId, availableRecipes = [] }) => {
  // Filter out current recipe and take first 3
  const relatedRecipes = availableRecipes
    .filter((recipe) => recipe.recipeId !== currentRecipeId)
    .slice(0, 3);

  // Don't render section if there are no related recipes
  if (relatedRecipes.length === 0) {
    return null;
  }

  return (
    <section className="related-recipes-section">
      <h2>You Might Also Like</h2>
      <div className="recipe-grid">
        {relatedRecipes.map((recipe) => (
          <RecipeCard key={recipe.recipeId} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default RelatedRecipes;
