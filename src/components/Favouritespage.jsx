import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InlineError from "./Inlineerror";
import RecipeCard from "./Recipecard";

import { fetchFavourites } from "../utils/api";

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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Favourite Recipes</h1>
      </div>

      {error ? (
        <InlineError type="500" message={error} />
      ) : (
        <>
          {isLoading ? (
            <div className="recipe-grid">
              {[...Array(6)].map((_, index) => (
                <RecipeCard key={index} loading={true} />
              ))}
            </div>
          ) : favourites.length === 0 ? (
            <p>No favourited recipes yet!</p>
          ) : (
            <div className="recipe-grid">
              {favourites.map((recipe) => (
                <RecipeCard key={recipe.RecipeId} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FavouritesPage;
