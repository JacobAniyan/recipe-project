import axios from "axios";

const BASE_URL = "https://recipegenerator-api.azurewebsites.net/api";
const userId = 1; //Hardcoded

export const fetchRecipes = (sortBy, sortOrder) => {
  //GET all recipes
  const params = {};
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.sortorder = sortOrder;

  return axios
    .get(BASE_URL + "/recipes", { params })
    .then((response) => response.data);
};

export const fetchRecipeById = (id) => {
  //GET recipe by ID
  return axios
    .get(`${BASE_URL}/recipes/${id}`)
    .then((response) => response.data);
};

export const fetchDietaryFilters = () => {
  //GET all dietary filters
  return axios
    .get(`${BASE_URL}/recipes/dietary-restrictions`)
    .then((response) => response.data);
};
export const fetchIngredients = () => {
  //GET all ingredients
  return axios
    .get(`${BASE_URL}/recipes/ingredients`)
    .then((response) => response.data);
};
export const searchRecipes = (
  ingredientIds,
  dietaryRestrictionIds = [],
  sortBy,
  order,
) => {
  //POST recipes by ingredient IDs and dietary restriction IDs
  const body = {
    IngredientIds: ingredientIds,
    DietaryRestrictionIds: dietaryRestrictionIds,
  };

  const params = new URLSearchParams();
  if (sortBy) params.append("sort_by", sortBy);
  if (order) params.append("order", order);

  const url = params.toString()
    ? `${BASE_URL}/recipes/match?${params.toString()}`
    : `${BASE_URL}/recipes/match`;

  return axios.post(url, body).then((response) => response.data);
};

export const fetchFavourites = () => {
  //GET recipes if Favourited
  return axios
    .get(`${BASE_URL}/favourites/${userId}`)
    .then((response) => response.data);
};

export const addFavourite = (recipeId) => {
  //POST recipes to Favourited
  const body = {
    RecipeId: recipeId,
  };
  return axios
    .post(`${BASE_URL}/favourites/${userId}/recipes`, body)
    .then((response) => response.data);
};

export const removeFavourite = (recipeId) => {
  //DELETE recipe from Favourited
  return axios
    .delete(`${BASE_URL}/favourites/${userId}/recipes/${recipeId}`)
    .then((response) => response.data);
};

export const fetchRelatedRecipes = (
  currentRecipeId,
  currentRecipeIngredients,
) => {
  // Fetch all recipes and find similar ones based on shared ingredients
  return fetchRecipes().then((allRecipes) => {
    // Filter out current recipe
    const otherRecipes = allRecipes.filter(
      (recipe) => recipe.recipeId !== currentRecipeId,
    );

    // Calculate similarity score for each recipe based on shared ingredients
    const recipesWithScore = otherRecipes.map((recipe) => {
      // Count how many ingredients are shared (case-insensitive comparison)
      const sharedIngredients = recipe.ingredients.filter((ingredient) =>
        currentRecipeIngredients.some(
          (currentIng) =>
            currentIng.toLowerCase().trim() === ingredient.toLowerCase().trim(),
        ),
      );

      const similarityScore = sharedIngredients.length;

      return {
        ...recipe,
        similarityScore: similarityScore,
      };
    });

    // Sort by similarity score (highest first) and take top 6
    const relatedRecipes = recipesWithScore
      .filter((recipe) => recipe.similarityScore > 0) // Only include recipes with at least 1 shared ingredient
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 3);

    return relatedRecipes;
  });
};
