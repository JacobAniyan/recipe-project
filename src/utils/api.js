const BASE_URL = "https://api.example.com"; // Need to change to actual API base URL

export const fetchRecipes = () => {
  const url = `${BASE_URL}/recipes`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.recipes;
    })
    .catch((error) => {
      console.error("Error Fetching Recipe:", error);
      throw error;
    });
};
export const fetchRecipeById = (id) => {
  const url = `${BASE_URL}/recipes/${id}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.recipe;
    })
    .catch((error) => {
      console.error("Error Fetching Recipe by ID:", error);
      throw error;
    });
};

export const fetchFavourites = () => {
  const url = `${BASE_URL}/favourites`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.favourites;
    })
    .catch((error) => {
      console.error("Error Fetching Favourites:", error);
      throw error;
    });
};

export const addFavourite = (recipeId) => {
  const url = `${BASE_URL}/favourites`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error Adding Favourite:", error);
      throw error;
    });
};

export const removeFavourite = (recipeId) => {
  const url = `${BASE_URL}/favourites/${recipeId}`;
  return fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error Removing Favourite:", error);
      throw error;
    });
};
