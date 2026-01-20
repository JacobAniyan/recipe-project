import React from "react";

const RecipeCard = ({ recipes, onfavouriteClick, onCardClick }) => {
  const handleFavouriteClick = (event) => {
    event.stopPropagation(); //avoids propagating to card's onClick when favouriting
    onfavouriteClick(recipes.RecipeId);
  };

  return (
    <div className="recipe-card" onClick={() => onCardClick(recipes.RecipeId)}>
      <h3>{recipes.Name}</h3>
      <div className="recipe-info">
        <span className="cooking-time">Duration: {recipes.CookTime} mins</span>
        <span className="difficulty">Difficulty: {recipes.Difficulty}</span>
      </div>
      <div className="recipecard-actions">
        <button
          className="favourite-button"
          onClick={handleFavouriteClick}
          aria-label={
            recipes.IsFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          {recipes.IsFavourite ? "❤️" : "🤍"} Save to Favourites
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
