import { useState } from "react";
import { addFavourite, removeFavourite } from "../utils/api";

const FavouriteButton = ({
  recipeId,
  isFavourite: initialIsFavourite,
  onToggle,
}) => {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);

  const handleFavouriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFavourite) {
      removeFavourite(recipeId)
        .then(() => {
          //EH: remove favourite
          setIsFavourite(false);
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
          setIsFavourite(true);
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
      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      {isFavourite ? "❤️" : "🤍"}
    </button>
  );
};

export default FavouriteButton;
