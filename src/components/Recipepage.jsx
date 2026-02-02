import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import FavouriteButton from "./Favouritebutton";
import InlineError from "./Inlineerror";
import DietaryBadges from "./Dietarybatch";

import { fetchRecipeById } from "../utils/api";

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
        console.log('Recipe data:', data);
        console.log('Dietary restrictions:', data.dietaryRestrictions);
         //Validation malformed or missing recipe data
        if (!data || typeof data !== "object" || !data.recipeId) {
          setError({
            type: "404",
            message:
              "Recipe not found. The recipe you're looking for doesn't exist.",
          });
          setIsLoading(false);
          setRecipe(null);
          return;
        }

        if (!data.name || !data.ingredients || !data.instructions) {
          setError({
            type: "500",
            message: "Recipe data is incomplete. Please try again later.",
          });
          setIsLoading(false);
          setRecipe(null);
          return;
        }

        setRecipe({
          ...data,
          instructions:
            typeof data.instructions === "object" &&
            data.instructions.instruction
              ? data.instructions.instruction
              : "",
        });
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
          setError({
            type: "404",
            message: "Recipe not found.",
          });
        }
        setIsLoading(false);
      });
  }, [id]);

  if (error) {
    return (
      <div className="page-container">
        <InlineError type={error.type} message={error.message} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="individual-recipe-page">
        <div className="recipe-header">
          <Skeleton height={400} style={{ marginBottom: "16px" }} />
        </div>

      <h1>{isLoading ? <Skeleton width="60%" /> : recipe.name}</h1>

        <div style={{ marginBottom: "24px" }}>
          <Skeleton
            width={70}
            height={28}
            inline
            style={{ marginRight: "8px" }}
          />
          <Skeleton
            width={80}
            height={28}
            inline
            style={{ marginRight: "8px" }}
          />
          <Skeleton width={75} height={28} inline />
        </div>
      ) : (
        recipe.dietaryRestrictions &&
        recipe.dietaryRestrictions.length > 0 && (
          <div className="dietary-restrictions-section">
            <DietaryBadges dietaryRestrictions={recipe.dietaryRestrictions} />
          </div>
        </div>

        <section className="ingredients-section">
          <h2>
            <Skeleton width={200} />
          </h2>
          <ul className="ingredients-list">
            {[...Array(8)].map((_, index) => (
              <li key={index}>
                <Skeleton width="80%" />
              </li>
            ))}
          </ul>
        </section>

        <section className="instructions-section">
          <h2>
            <Skeleton width={200} />
          </h2>
          <ol className="instructions-list">
            {[...Array(6)].map((_, index) => (
              <li key={index} className="instruction-step">
                <Skeleton width="95%" count={2} />
              </li>
            ))}
          </ol>
        </section>
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
        <img src={recipe.img} alt={recipe.name} className="recipe-image" />
        <FavouriteButton
          recipeId={recipe.recipeId}
          isFavourite={recipe.IsFavourite}
        />
      </div>

      <h1>{recipe.Name}</h1>

      {recipe.DietaryRestrictions && recipe.DietaryRestrictions.length > 0 && (
        <div className="dietary-restrictions-section">
          <DietaryBadges dietaryRestrictions={recipe.DietaryRestrictions} />
        </div>
      )}

      {recipe.description && (
        <p className="recipe-description">{recipe.description}</p>
      )}

      <div className="recipe-info">
        {recipe.cookTime && (
          <div className="info-item">
            <div className="info-label">Cook Time:</div>
            <div className="info-value">{recipe.cookTime} mins</div>
          </div>
        )}
        {recipe.difficulty && (
          <div className="info-item">
            <div className="info-label">Difficulty:</div>
            <div className="info-value">{recipe.difficulty}</div>
          </div>
        )}
      </div>

      <section className="ingredients-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="instructions-section">
        <h2>Instructions</h2>
        <ol className="instructions-list">
          {recipe.instructions?.split("\n").map((step, index) => (
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
