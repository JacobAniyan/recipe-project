import { Link } from "react-router-dom";
import RecipeCard from "./Recipecard";
import InlineError from "./Inlineerror";

const RelatedRecipes = ({ currentRecipeId, availableRecipes = [] }) => {
  // Shuffle function to randomize array
  const shuffleArray = (array) => {
    const shuffled = [...array]; // Create a copy to avoid mutating original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  // Filter out current recipe, shuffle, and take first 3
  const relatedRecipes = shuffleArray(
    availableRecipes.filter((recipe) => recipe.recipeId !== currentRecipeId)
  ).slice(0, 3);

  // Don't render section if there are no related recipes
  if (relatedRecipes.length === 0) {
    return null;
  }

  return (
    <section className="related-recipes-section">
      <h2>You Might Also Like</h2>
      <div className="recipe-grid">
        {relatedRecipes.map((recipe) => (
          <Link
            key={recipe.recipeId}
            to={`/recipes/${recipe.recipeId}`}
            state={{ recipes: availableRecipes }}
          >
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedRecipes;
