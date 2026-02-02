import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import DietaryBadges from "./Dietarybatch";
import FavouriteButton from "./Favouritebutton";

const RecipeCard = ({ recipe, loading = false }) => {
  if (loading) {
    return (
      <div className="recipe-card skeleton-card">
        <Skeleton height={24} width="80%" style={{ marginBottom: "12px" }} />
        <div style={{ marginBottom: "12px" }}>
          <Skeleton
            width={70}
            height={24}
            inline
            style={{ marginRight: "8px" }}
          />
          <Skeleton width={80} height={24} inline />
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
    <Link to={`/recipes/${recipe.recipeId}`} className="recipe-card">
      <h3>{recipe.name}</h3>

      <DietaryBadges dietaryRestrictions={recipe.dietaryRestrictions} />
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
          isFavourite={recipe.isFavourite}
        />
      </div>
    </Link>
  );
};

export default RecipeCard;
