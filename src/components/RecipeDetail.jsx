import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ReceipeDetailPage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipeDetail();
  }, [id]);

  const fetchRecipeDetail = async () => {
    try {
      //GET api and convert to json file
    } catch {}
  };

  return (
    <div className="page-container">
      {" "}
      {/*change necessary keys*/}
      <Header />
      <div className="main-layout">
        <Navigation />

        <main className="recipe-detail-content">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="recipe-image"
          />

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
    </div>
  );
}

export default RecipeDetailPage;
