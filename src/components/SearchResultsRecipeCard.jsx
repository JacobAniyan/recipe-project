import React from "react";

const SearchResultsRecipeCard = ({
  recipes,
  onfavouriteClick,
  onCardClick,
}) => {
  const handleFavouriteClick = (event) => {
    event.stopPropagation(); //avoids propagating to card's onClick when favouriting
    onfavouriteClick(recipes.RecipeId);
  };

  return (
    <div
      className="search-results-recipe-card"
      onClick={() => onCardClick(recipes.RecipeId)}
    >
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

export default SearchResultsRecipeCard;
