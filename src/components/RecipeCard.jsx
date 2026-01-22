import React from "react";
import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";

const RecipeCard = ({ recipes }) => {
  return (
    <Link to={`/recipe/${recipes.RecipeId}`} className="recipe-card">
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
    </Link>
  );
};

export default RecipeCard;
