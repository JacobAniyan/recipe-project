import { useState, useEffect } from "react";
import Header from "../../Header";
import Loading from "./Loading";

function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    setIsLoading(true);
    try {
      {
        const response = await fetch("/api/favourites");
        setIsLoading(false);
      }
      setFavourites({
        /* insert parameter */
      });
    } catch {}
  };

  const removeFavourite = async (recipeId) => {
    try {
      const response = await fetch(`/api/favourites/${recipeId}`, {
        method: "DELETE",
      });
      setFavourites(favourites.filter((recipe) => recipe.id !== recipeId));
    } catch {}
  };
}
if (isLoading) {
  return <Loading />;
}
export default FavouritesPage;
