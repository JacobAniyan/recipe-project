import axios from "axios";

const BASE_URL = "https://recipegenerator-api.azurewebsites.net/api";
const userId = 1; //Hardcoded

export const fetchRecipes = (sortBy, sortOrder) => {
  //GET all recipes
  const params = {};
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.sortOrder = sortOrder;

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
}
export const fetchIngredients = () => {
  //GET all ingredients
  return axios
    .get(`${BASE_URL}/recipes/ingredients`)
    .then((response) => response.data);
}
export const searchRecipes = (
  ingredientIds,
  dietaryRestrictionIds = [],
  sortBy,
  sortOrder,
) => {
  //POST recipes by ingredient IDs and dietary restriction IDs
  const body = {
    IngredientIds: ingredientIds,
    DietaryRestrictionIds: dietaryRestrictionIds,
  };

  console.log('Search Request Body:', body);

  const params = new URLSearchParams();
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);

  const url = params.toString()
    ? `${BASE_URL}/recipes/match?${params.toString()}`
    : `${BASE_URL}/recipes/match`;

  console.log('Search URL:', url);

  return axios.post(url, body).then((response) => {
    console.log('Search Response:', response.data);
    return response.data;
  });
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
