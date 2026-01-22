import React from "react";
import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";

const SearchResultsRecipeCard = ({ recipes }) => {
  return (
    <Link to={`/recipe/${recipes.RecipeId}`} className="recipe-card">
      <h3>{recipes.Name}</h3>

      <div className="match-percentage">
        <span>Match: {recipes.MatchPercentage}%</span>
      </div>

      {recipes.MissingIngredients && recipes.MissingIngredients.length > 0 && (
        <div className="missing-ingredients">
          <p className="missing-label">Missing Ingredients:</p>
          <ul>
            {recipes.MissingIngredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="recipe-info">
        <span className="cooking-time">Duration: {recipes.CookTime} mins</span>
        <span className="difficulty">Difficulty: {recipes.Difficulty}</span>
      </div>

      <div className="recipecard-actions">
        <FavouriteButton
          recipeId={recipes.RecipeId}
          isFavourite={recipes.IsFavourite}
        />
      </div>
    </Link>
  );
};

export default SearchResultsRecipeCard;
