import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.RecipeId}`} className="recipe-card">
      <h3>{recipe.Name}</h3>
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

export default RecipeCard;
