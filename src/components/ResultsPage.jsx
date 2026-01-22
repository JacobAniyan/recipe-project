import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { ingredients = [], filters = {} } = location.state || {};

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("bestMatch");

  useEffect(() => {
    if (ingredients.length > 0) {
      fetchMatchingRecipes();
    }
  }, [ingredients]);
  const fetchMatchingRecipes = async () => {
    setIsLoading(true);
    setError(null);

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
          {/* no ingredients provided */}
          {ingredients.length === 0 ? (
            <div className="empty-state">
              <h2>No Ingredients Found</h2>
              <p>Please add some ingredients first to find matching recipes.</p>
              <button
                onClick={() => navigate("/api/")}
                className="back-home-button"
              >
                Go Back to Home
              </button>
            </div>
          ) : (
            <>
              {/* Page header with title and sort controls */}
              <div className="results-header">
                <div className="results-title-section">
                  <h2 className="page-title">Recipe Results</h2>
                  <p className="results-subtitle">
                    Found {recipes.length} recipe
                    {recipes.length !== 1 ? "s" : ""} matching your ingredients
                  </p>
                </div>

                {/* Sort dropdown */}
                <div className="sort-controls">
                  <label htmlFor="results-sort-select">Sort by:</label>
                  <select
                    id="results-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="bestMatch">Best Match</option>
                    <option value="date">Date Added</option>
                    <option value="time">Cooking Time</option>
                    <option value="difficulty">Difficulty</option>
                  </select>
                </div>
              </div>

              {/* Display ingredients used for search */}
              <div className="ingredients-used">
                <h3>Your Ingredients:</h3>
                <div className="ingredient-tags">
                  {ingredients.map((ingredient, index) => (
                    <span key={index} className="ingredient-tag">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Display active filters if any */}
              {hasActiveFilters() && (
                <div className="filters-applied">
                  <h3>Filters Applied:</h3>
                  <div className="filter-tags">
                    {getActiveFilterNames().map((filterName, index) => (
                      <span key={index} className="filter-tag">
                        {filterName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading state */}
              {isLoading && (
                <div className="status-message">
                  Loading matching recipes...
                </div>
              )}

              {/* Error state */}
              {error && <div className="status-message error">{error}</div>}

              {/* Recipe results grid */}
              {!isLoading && !error && recipes.length > 0 && (
                <div className="results-grid">
                  {getSortedRecipes().map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onToggleFavourite={toggleFavourite}
                    />
                  ))}
                </div>
              )}

              {/* No results found state */}
              {!isLoading && !error && recipes.length === 0 && (
                <div className="no-results">
                  <p>No recipes found matching your ingredients and filters.</p>
                  <p>Try removing some filters or adding more ingredients.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default ResultsPage;
