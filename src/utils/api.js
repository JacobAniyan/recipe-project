import axios from "axios";

//pending BE implementation - set BASE_URL once BE is deployed
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

export const searchRecipes = (
  ingredientIds,
  dietaryRestrictionIds = [],
  sortBy,
  order,
) => {
  //POST recipes by ingredient IDs and dietary restriction IDs
  const body = {
    ingredientIds: ingredientIds,
    dietaryRestrictionIds: dietaryRestrictionIds,
  };

  const params = new URLSearchParams();
  if (sortBy) params.append("sort_by", sortBy);
  if (order) params.append("order", order);

  const url = params.toString()
    ? `${BASE_URL}/recipes/search?${params.toString()}`
    : `${BASE_URL}/recipes/search`;

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
    recipeId: recipeId,
  };
  return axios
    .post(`${BASE_URL}/favourites/${userId}/recipes`, body)
    .then((response) => response.data);
};

export const removeFavourite = (recipeId) => {
  //DELETE recipe from Favourited
  return axios
    .delete(`${BASE_URL}/favourites/${recipeId}`)
    .then((response) => response.data);
};
