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
};
export const fetchIngredients = () => {
  //GET all ingredients
  return axios
    .get(`${BASE_URL}/recipes/ingredients`)
    .then((response) => response.data);
};
export const searchRecipes = async (
  ingredientIds,
  dietaryRestrictionIds,
  sortBy = null,
  sortOrder = null
) => {
  const requestBody = {
    IngredientIds: ingredientIds || [],
    DietaryRestrictionIds: dietaryRestrictionIds || [],
  };

  const params = {};
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.sortOrder = sortOrder;

  console.log("Search Request Body:", requestBody);
  console.log("Search Request Params:", params);
  console.log("Search URL:", `${BASE_URL}/recipes/match`);
  console.log("Full request details:", {
    url: `${BASE_URL}/recipes/match`,
    params,
    data: requestBody,
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/recipes/match`,
      requestBody,
      {
        params,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Search Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Search API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      requestBody,
      params,
    });
    throw error;
  }
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
