import { useState, useEffect } from "react";
import Header from "../../Header";

function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      {
        /* GET Api */
      }
      setFavourites({
        /* insert parameter */
      });
    } catch {}
  };

  const removeFavourite = async (recipeId) => {
    try {
      setFavourites({
        /* insert parameter */
      });
      setFavourites(favourites.filter((recipe) => recipe.id !== recipeId));
    } catch {}
  };
}
