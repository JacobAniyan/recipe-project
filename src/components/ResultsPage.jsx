import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchResultsRecipeCard from "./SearchResultsRecipeCard";
import Loading from "./Loading";
import SortByDropdown from "./SortByDropdown";
import { searchRecipes } from "../utils/api";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ingredientsParam = searchParams.get("ingredients");
  const filtersParam = searchParams.get("filters");
  let sort_by = searchParams.get("sort_by");
  let order = searchParams.get("order");

  const selectedIngredients = ingredientsParam
    ? ingredientsParam.split(",")
    : [];
  const selectedFilters = filtersParam ? filtersParam.split(",") : [];

  useEffect(() => {
    if (selectedIngredients.length === 0) {
      setIsLoading(false);
      navigate("/recipes");
      return;
    }

    setIsLoading(true);

    searchRecipes(ingredientsParam, selectedFilters, sort_by, order)
      .then((data) => {
        setIsLoading(false);
        setRecipes(data);
      })
      .catch((error) => {
        console.error(error);
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message;
        navigate("/error", { state: { status, message } });
      });
  }, [ingredientsParam, filtersParam, sort_by, order, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Recipe Results</h1>
        <div className="search-summary">
          <p>Recipes containing: {selectedIngredients.join(", ")}</p>
          {selectedFilters.length > 0 && (
            <p>Filters: {selectedFilters.join(", ")}</p>
          )}
        </div>
      </div>

      <div className="sortBy-container">
        <SortByDropdown />
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <SearchResultsRecipeCard key={recipe.RecipeId} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
