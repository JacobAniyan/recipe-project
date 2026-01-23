import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFavourites } from "../utils/api";
import Loader from "./Loader";
import RecipeCard from "./RecipeCard";
import InlineError from "./InlineError";

function FavouritesPage() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  ////pending BE implementation
  // useEffect(() => {
  //   fetchFavouritesData();
  // }, []);

  const fetchFavouritesData = () => {
    setIsLoading(true);
    setError(null);

    fetchFavourites()
      .then((data) => {
        setFavourites(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load favourites:", error);
        setError("Unable to load your favourites. Please try again later.");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <InlineError type="500" message={error} />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Favourite Recipes</h1>
      </div>
      {favourites.length === 0 ? (
        <p>No favourited recipes yet!</p>
      ) : (
        <div className="recipe-grid">
          {favourites.map((recipe) => (
            <RecipeCard key={recipe.RecipeId} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavouritesPage;
