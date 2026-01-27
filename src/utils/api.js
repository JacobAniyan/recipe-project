import axios from "axios";

//pending BE implementation - set BASE_URL once BE is deployed
const BASE_URL = "";

export const fetchRecipes = (sortBy, order) => {
  //GET all recipes
  const params = {};
  if (sortBy) params.sort_by = sortBy;
  if (order) params.order = order;

  return axios.get("/recipes", { params }).then((response) => response.data);
};

export const fetchRecipeById = (id) => {
  //GET recipe by ID
  return axios.get(`/recipe/${id}`).then((response) => response.data);
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
    ? `/recipes/search?${params.toString()}`
    : "/recipes/search";

  return axios.post(url, body).then((response) => response.data);
};

export const fetchFavourites = () => {
  //GET recipes if Favourited
  return axios.get("/favourites").then((response) => response.data);
};

export const addFavourite = (recipeId) => {
  //POST recipes to Favourited
  return axios
    .post(`/api/favourites/${recipeId}`)
    .then((response) => response.data);
};

export const removeFavourite = (recipeId) => {
  //DELETE recipe from favourites
  return axios
    .delete(`/api/favourites/${recipeId}`)
    .then((response) => response.data);
};
