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

export const searchRecipes = (ingredients, filters = [], sortBy, order) => {
  //GET recipes by ingredients and diet filters
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
