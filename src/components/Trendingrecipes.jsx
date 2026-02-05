import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./Recipecard";
import { fetchTrendingRecipes } from "../utils/api";

export default function Trendingrecipes() {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrendingRecipes = async () => {
      try {
        const recipes = await fetchTrendingRecipes();
        setTrendingRecipes(recipes);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };

    loadTrendingRecipes();
  }, []);

  if (isLoading) return <div>Loading trending recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="trending-recipes">
      <h2>Trending Recipes</h2>
      <div className="recipe-grid">
        {trendingRecipes.map((recipe) => (
          <Link
            key={recipe.recipeId}
            to={`/recipes/${recipe.recipeId}`}
            state={{ recipes: trendingRecipes }}
          >
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
    </section>
  );
}
