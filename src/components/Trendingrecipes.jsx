import { useState, useEffect } from "react";
import RecipeCard from "./Recipecard";
import { fetchTrendingRecipes } from "../utils/api";

export default function Trendingrecipes() {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrendingRecipes = async () => {
      try {
        setIsLoading(true);
        const recipes = await fetchTrendingRecipes();
        setTrendingRecipes(recipes);
      } catch (err) {
        console.log(err.message);
      }
    };

    loadTrendingRecipes();
  }, []);

  //   useEffect(() => {
  //     const loadTrendingRecipes = async () => {
  //       try {
  //         setIsLoading(true);

  //         // Hardcoded recipes for testing
  //         const recipes = [
  //           {
  //             recipeId: 1,
  //             name: "Spaghetti Carbonara",
  //             description: "Classic Italian pasta dish",
  //             img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
  //             cookTime: 20,
  //             difficulty: "Easy",
  //           },
  //           {
  //             recipeId: 2,
  //             name: "Chicken Tikka Masala",
  //             description: "Creamy Indian curry",
  //             img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  //             cookTime: 45,
  //             difficulty: "Medium",
  //           },
  //           {
  //             recipeId: 3,
  //             name: "Caesar Salad",
  //             description: "Fresh and crispy salad",
  //             img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
  //             cookTime: 15,
  //             difficulty: "Easy",
  //           },
  //         ];

  //         setTrendingRecipes(recipes);
  //         setIsLoading(false);
  //       } catch (err) {
  //         setError(err.message);
  //         setIsLoading(false);
  //       }
  //     };

  //     loadTrendingRecipes();
  //   }, []);

  if (isLoading) return <div>Loading trending recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="trending-recipes">
      <h2>Trending Recipes</h2>
      <div className="recipe-grid">
        {trendingRecipes.map((recipe) => (
          <RecipeCard key={recipe.recipeId} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
