import axios from "axios";

//pending BE implementation - set BASE_URL once backend is deployed
const BASE_URL = "";

export const fetchRecipes = (sortBy, order) => {
  //pending BE implementation - GET all recipes
  const params = {};
  if (sortBy) params.sort_by = sortBy;
  if (order) params.order = order;

  return axios.get("/recipes", { params }).then((response) => response.data);
};

export const fetchRecipeById = (id) => {
  //pending BE implementation - GET recipe by ID
  return axios.get(`/recipe/${id}`).then((response) => response.data);
};

export const searchRecipes = (ingredients, filters = [], sortBy, order) => {
  //pending BE implementation - GET recipes by ingredients and filters
  const params = new URLSearchParams();
  params.append("ingredients", ingredients);
  if (filters.length > 0) {
    params.append("filters", filters);
  }
  if (sortBy) params.append("sort_by", sortBy);
  if (order) params.append("order", order);

  return axios
    .get(`/recipes/search?${params.toString()}`)
    .then((response) => response.data);
};

export const fetchFavourites = () => {
  //pending BE implementation - GET recipes if Favourited

  return axios.get("/favourites").then((response) => response.data);
};

export const addFavourite = (recipeId) => {
  //pending BE implementation - POST recipes to Favourited
  return axios
    .post(`/api/favourites/${recipeId}`)
    .then((response) => response.data);
};

export const removeFavourite = (recipeId) => {
  //pending BE implementation - DELETE recipe from favourites
  return axios
    .delete(`/api/favourites/${recipeId}`)
    .then((response) => response.data);
};
