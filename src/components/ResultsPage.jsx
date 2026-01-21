import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { ingredients = [], filters = {} } = location.state || {};

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ingredients.length > 0) {
      fetchMatchingRecipes();
    }
  }, [ingredients]);
  const fetchMatchingRecipes = async () => {
    setIsLoading(true);

    try {
    } catch (error) {
      //Put error handling code here;
    } finally {
      setIsLoading(false);
    }
  };
  const toggleFavourite = async (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return;
    // TODO: Replace with actual API call when backend is ready
    setRecipes(
      recipes.map((r) =>
        r.id === recipeId ? { ...r, isFavourited: !r.isFavourited } : r,
      ),
    );
  };
  const getSortedRecipes = () => {
    const sorted = [...recipes];

    switch (sortBy) {
      case "date":
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));

      case "time":
        return sorted.sort((a, b) => a.cookingTime - b.cookingTime);

      case "difficulty":
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return sorted.sort(
          (a, b) =>
            difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
        );

      default:
        return sorted;
    }
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some((value) => value === true);
  };

  const getActiveFilterNames = () => {
    const filterLabels = {
      vegan: "🌱 Vegan",
      vegetarian: "🥗 Vegetarian",
      pescatarian: "🐟 Pescatarian",
      glutenFree: "🌾 Gluten-Free",
      keto: "🥑 Keto",
    };
    return Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => filterLabels[key] || key);
  };
  return (
    <div className="page-container">
      <Header />
      <div className="main-layout">
        <Navigation />
        <main className="results-content">
          {ingredients.length === 0 ? (
            <div className="empty-state"></div>
          ) : (
            <></>
          )}
        </main>
      </div>
    </div>
  );
}
