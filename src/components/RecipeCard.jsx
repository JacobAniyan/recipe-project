import React from "react";
import FavouriteButton from "./FavouriteButton";

const RecipeCard = ({ recipes, onCardClick }) => {
  return (
    <div className="recipe-card" onClick={() => onCardClick(recipes.RecipeId)}>
      <h3>{recipes.Name}</h3>
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
    </div>
  );
};

export default RecipeCard;
