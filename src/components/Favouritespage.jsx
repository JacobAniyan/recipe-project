import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFavourites } from "../utils/api";
import Loading from "./Loading";
import RecipeCard from "./RecipeCard";

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
        setFavourites(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load favourites:", error);
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message;
        setError({ status, message });
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>
          Error {error.status}: {error.message}
        </h2>
        <button onClick={fetchFavouritesData}>Try Again</button>
      </div>
    );
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
