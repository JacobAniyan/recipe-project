import Skeleton from "react-loading-skeleton";

import DietaryBadges from "./Dietarybatch";
import FavouriteButton from "./Favouritebutton";

const SearchResultsRecipeCard = ({ recipe, loading = false }) => {
  if (loading) {
    return (
      <div className="recipe-card skeleton-card">
        <Skeleton height={24} width="80%" style={{ marginBottom: "12px" }} />
        <div className="match-percentage">
          <Skeleton height={20} width={80} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <Skeleton
            width={70}
            height={24}
            inline
            style={{ marginRight: "8px" }}
          />
          <Skeleton width={80} height={24} inline />
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
    <div className="recipe-card">
      <h3>{recipe.name}</h3>

      {recipe.matchPercentage !== undefined && (
        <div className="match-percentage">
          <span>Match: {recipe.matchPercentage}%</span>
        </div>
      )}

      {recipe.dietaryRestrictions && recipe.dietaryRestrictions.length > 0 && (
        <DietaryBadges dietaryRestrictions={recipe.dietaryRestrictions} />
      )}

      {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
        <div className="missing-ingredients">
          <p className="missing-label">Missing Ingredients:</p>
          <ul>
            {recipe.missingIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="recipe-info">
        <span className="cooking-time">Duration: {recipe.cookTime} mins</span>
        <span className="difficulty">Difficulty: {recipe.difficulty}</span>
        {recipe.createdAt && (
          <span className="date-added">
            Added: {new Date(recipe.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="recipecard-actions">
        <FavouriteButton
          recipeId={recipe.recipeId}
          isFavourite={recipe.isFavourite}
        />
      </div>
    </div>
  );
};

export default SearchResultsRecipeCard;
