import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Loading from "./Loading";
import SortByDropdown from "./SortByDropdown";
import { fetchRecipes } from "../utils/api";

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let sort_by = searchParams.get("sort_by");
  let order = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    fetchRecipes(sort_by, order)
      .then((data) => {
        setIsLoading(false);
        setRecipes(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error(error);
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message;
        navigate("/error", { state: { status, message } });
      });
  }, [sort_by, order, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="page-container all-recipes-page">
      <div className="page-header">
        <h1>All Recipes</h1>
      </div>

      <div className="sortBy-container">
        <SortByDropdown />
      </div>

      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.RecipeId} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default AllRecipesPage;
