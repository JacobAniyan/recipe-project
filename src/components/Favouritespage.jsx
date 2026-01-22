import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import RecipeCard from "./RecipeCard";

function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = () => {
    setIsLoading(true);
    setError(null);
    axios
      .get("/api/favourites")
      .then((response) => {
        setFavourites(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch favourites:", error);
        setError("Failed to load favourites. Please try again.");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchFavourites}>Try Again</button>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div>
      <div className="favourites-page-content" style={{ padding: "20px" }}>
        <h1>My Favourite Recipes</h1>
        {favourites.length === 0 ? (
          <p>No favourite recipes yet. Start adding some!</p>
        ) : (
          <div className="recipe-grid">
            {favourites.map((recipe) => (
              <RecipeCard key={recipe.RecipeId} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouritesPage;
