import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import Loading from "./Loading";

function IndividualRecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    axios
      .get(`/recipe/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Failed to load recipe. Please try again.");
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="error-message">
        <p>Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="individual-recipe-page">
      <div className="recipe-header">
        <img src={recipe.ImageUrl} alt={recipe.Name} className="recipe-image" />
        <FavouriteButton
          recipeId={recipe.RecipeId}
          isFavourite={recipe.IsFavourite}
        />
      </div>

      <h1>{recipe.Name}</h1>
      {recipe.Description && (
        <p className="recipe-description">{recipe.Description}</p>
      )}

      <div className="recipe-info">
        {recipe.CookTime && (
          <div className="info-item">
            <dt className="info-label">Cook Time:</dt>
            <dd className="info-value">{recipe.CookTime} mins</dd>
          </div>
        )}
        {recipe.Difficulty && (
          <div className="info-item">
            <dt className="info-label">Difficulty:</dt>
            <dd className="info-value">{recipe.Difficulty}</dd>
          </div>
        )}
      </div>

      <section className="ingredients-section">
        <h2>Ingredients</h2>
        {recipe.Ingredients && recipe.Ingredients.length > 0 ? (
          <ul className="ingredients-list">
            {recipe.Ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients available</p>
        )}
      </section>

      <section className="instructions-section">
        <h2>Instructions</h2>
        {recipe.Instruction ? (
          <ol className="instructions-list">
            {recipe.Instruction.split("\n").map((step, index) => (
              <li key={index} className="instruction-step">
                {step}
              </li>
            ))}
          </ol>
        ) : (
          <p>No instructions available</p>
        )}
      </section>
    </div>
  );
}

export default IndividualRecipePage;
