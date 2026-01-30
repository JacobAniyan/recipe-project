import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import FavouriteButton from "./FavouriteButton";

const SearchResultsRecipeCard = ({ recipe, loading = false }) => {
  if (loading) {
    return (
      <div className="recipe-card skeleton-card">
        <Skeleton height={24} width="80%" style={{ marginBottom: "12px" }} />
        <div className="match-percentage">
          <Skeleton height={20} width={80} />
        </div>
        <div className="missing-ingredients">
          <Skeleton height={16} width="60%" style={{ marginBottom: "8px" }} />
          <Skeleton height={16} width="70%" count={2} />
        </div>
        <div className="recipe-info">
          <Skeleton height={16} width="60%" style={{ marginBottom: "8px" }} />
          <Skeleton height={16} width="50%" style={{ marginBottom: "8px" }} />
          <Skeleton height={16} width="70%" />
        </div>
        <div className="recipecard-actions">
          <Skeleton circle width={40} height={40} />
        </div>
      </div>
    );
  }

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
