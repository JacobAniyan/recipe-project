import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import RecipeCard from "./RecipeCard";

function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = () => {
    setIsLoading(true);
    axios
      .get("/api/favourites")
      .then((response) => {
        setFavourites(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch favourites:", error);
        setIsLoading(false);
      });
  };

  const handleCardClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (isLoading) {
    return <Loading />;
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
              <RecipeCard
                key={recipe.RecipeId}
                recipes={recipe}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouritesPage;
