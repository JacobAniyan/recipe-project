import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import FavouriteButton from "./FavouriteButton";

function IndividualRecipePage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRecipeDetail();
  }, [id]);

  const fetchRecipeDetail = () => {
    setIsLoading(true);
    axios
      .get(`/api/recipe/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch recipe details:", error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="page-container">
      {" "}
      {/*change necessary keys*/}
      <main className="recipe-detail-content">
        <div className="recipe-header">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="recipe-image"
          />
          <FavouriteButton
            recipeId={recipe.RecipeId || id}
            isFavourite={recipe.IsFavourite}
          />
        </div>

        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        {/*======Recipe Info==========*/}
        <div className="recipe-info">
          {recipe.info.map((info, i) => (
            <div key={i}>
              <span>{info.label}</span>
              <span>{info.value}</span>
            </div>
          ))}
        </div>
        {/*======Recipe Description=========*/}
        <section>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.amount} {ing.name}
              </li>
            ))}
          </ul>
        </section>
        {/*======Instructions=========*/}
        <section>
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

export default IndividualRecipePage;
