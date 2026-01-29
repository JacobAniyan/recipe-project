import { useState, useEffect } from "react";
import { fetchRecipeById } from "../utils/api";
import { useParams } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import Loader from "./Loader";
import InlineError from "./InlineError";

function IndividualRecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || isNaN(id) || Number(id) <= 0) {
      setError({
        type: "400",
        message: "Invalid recipe ID format.",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchRecipeById(id)
      .then((data) => {
        //Validation malformed or missing recipe data
        if (!data || typeof data !== "object" || !data.RecipeId) {
          setError({
            type: "404",
            message:
              "Recipe not found. The recipe you're looking for doesn't exist.",
          });
          setIsLoading(false);
          setRecipe(null);
          return;
        }

        if (!data.Name || !data.Ingredients || !data.Instruction) {
          setError({
            type: "500",
            message: "Recipe data is incomplete. Please try again later.",
          });
          setIsLoading(false);
          setRecipe(null);
          return;
        }

        setRecipe(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Failed to load recipe:", error);

        if (error.response?.status === 404) {
          setError({
            type: "404",
            message: "Recipe not found.",
          });
        } else if (error.response?.status >= 500) {
          setError({
            type: "500",
            message: "Server error. Please try again later.",
          });
        } else {
          //Network error OR no response from BE
          setError({
            type: "404",
            message: "Recipe not found.",
          });
        }
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="page-container">
        <InlineError type={error.type} message={error.message} />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="page-container">
        <InlineError
          type="404"
          message="Recipe not found. The recipe you're looking for doesn't exist."
        />
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
          {recipe.Ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="instructions-section">
        <h2>Instructions</h2>
        <ol className="instructions-list">
          {recipe.Instruction?.split("\n").map((step, index) => (
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
