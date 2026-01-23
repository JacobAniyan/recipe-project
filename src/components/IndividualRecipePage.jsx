import { useState, useEffect } from "react";
import { fetchRecipeById } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import Loading from "./Loading";

function IndividualRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchRecipeById(id)
      .then((data) => {
        setRecipe(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Failed to load recipe:", error);
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message;
        navigate("/error", { state: { status, message } });
      });
  }, [id, navigate]);

  if (isLoading) {
    return <Loading />;
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
        <ul className="ingredients-list">
          {recipe.Ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="instructions-section">
        <h2>Instructions</h2>
        <ol className="instructions-list">
          {recipe.Instruction.split("\n").map((step, index) => (
            <li key={index} className="instruction-step">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default IndividualRecipePage;
