import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.RecipeId}`} className="recipe-card">
      <h3>{recipe.name}</h3>
      <div className="recipe-info">
        <span className="cooking-time">Duration: {recipe.cookTime} mins</span>
        <span className="difficulty">Difficulty: {recipe.difficulty}</span>
        <span className="date-added">
          Added: {new Date(recipe.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="recipecard-actions">
        <FavouriteButton
          recipeId={recipe.recipeId}
          isFavourite={recipe.IsFavourite}
        />
      </div>
    </Link>
  );
};

export default RecipeCard;
