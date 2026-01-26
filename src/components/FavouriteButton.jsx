import { addFavourite, removeFavourite } from "../utils/api";

const FavouriteButton = ({ recipeId, isFavourite, onToggle }) => {
  const handleFavouriteClick = (event) => {
    event.stopPropagation();

    //pending BE implementation
    if (isFavourite) {
      removeFavourite(recipeId)
        .then(() => {
          //EH: remove favourite
          onToggle?.(recipeId, false);
        })
        .catch((error) => {
          console.error("Failed to remove favourite:", error);
        });
    } else {
      addFavourite(recipeId)
        .then(() => {
          //EH: add favourite
          onToggle?.(recipeId, true);
        })
        .catch((error) => {
          console.error("Failed to add favourite:", error);
        });
    }
  };

  return (
    <button
      className="favourite-button"
      onClick={handleFavouriteClick}
      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      {isFavourite ? "❤️" : "🤍"}
    </button>
  );
};

export default FavouriteButton;
