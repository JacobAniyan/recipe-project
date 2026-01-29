import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";

const SearchResultsRecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.RecipeId}`} className="recipe-card">
      <h3>{recipe.Name}</h3>

      <div className="match-percentage">
        <span>Match: {recipe.MatchPercentage}%</span>
      </div>

      {recipe.MissingIngredients && recipe.MissingIngredients.length > 0 && (
        <div className="missing-ingredients">
          <p className="missing-label">Missing Ingredients:</p>
          <ul>
            {recipe.MissingIngredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="recipe-info">
        <span className="cooking-time">Duration: {recipe.CookTime} mins</span>
        <span className="difficulty">Difficulty: {recipe.Difficulty}</span>
        <span className="date-added">
          Added: {new Date(recipe.CreatedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="recipecard-actions">
        <FavouriteButton
          recipeId={recipe.RecipeId}
          isFavourite={recipe.IsFavourite}
        />
      </div>
    </Link>
  );
};

export default SearchResultsRecipeCard;
