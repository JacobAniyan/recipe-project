import { useState } from "react";
import { addFavourite, removeFavourite } from "../utils/api";

const FavouriteButton = ({ recipeId, isFavourite, onToggle }) => {
  const [isFavourited, setIsFavourited] = useState(isFavourite || false);

  const handleFavouriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFavourited) {
      removeFavourite(recipeId)
        .then(() => {
          //EH: remove favourite
          setIsFavourited(false);
          if (onToggle) {
            onToggle(recipeId, false);
          }
        })
        .catch((error) => {
          console.error("Failed to remove favourite:", error);
        });
    } else {
      addFavourite(recipeId)
        .then(() => {
          //EH: add favourite
          setIsFavourited(true);
          if (onToggle) {
            onToggle(recipeId, true);
          }
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
      aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
    >
      {isFavourited ? "❤️" : "🤍"}
    </button>
  );
};

export default FavouriteButton;
