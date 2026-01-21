import React from "react";
import axios from "axios";

const FavouriteButton = ({ recipeId, isFavourite }) => {
  const handleFavouriteClick = (event) => {
    event.stopPropagation(); //Prevents triggering onclick of recipecard

    if (isFavourite) {
      axios
        .delete(`/api/favourites/${recipeId}`)
        .then(() => {
          //Favourite status pending BE implementation
          console.log("Removed from favourites:", recipeId);
        })
        .catch((error) => {
          console.error("Failed to remove favourite:", error);
        });
    } else {
      axios
        .post(`/api/favourites/${recipeId}`)
        .then(() => {
          console.log("Added to favourites:", recipeId);
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
      {isFavourite ? "❤️" : "🤍"} Save to Favourites
    </button>
  );
};

export default FavouriteButton;
