import axios from "axios";

const FavouriteButton = ({ recipeId, isFavourite, onToggle }) => {
  const handleFavouriteClick = (event) => {
    event.stopPropagation(); //Prevents triggering onclick of recipecard

    if (isFavourite) //Favourite status pending BE implementation
    {
      axios
        .delete(`/api/favourites/${recipeId}`)
        .then(() => {
          onToggle?.(recipeId, false);
        })
        .catch((error) => {});
    } else {
      axios
        .post(`/api/favourites/${recipeId}`)
        .then(() => {
          onToggle?.(recipeId, true);
        })
        .catch((error) => {});
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
