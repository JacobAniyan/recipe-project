const BASE_URL = "https://api.example.com";

export async function fetchRecipes(ingredients, filters, sortBy) {
  const params = new URLSearchParams();
  if (ingredients && ingredients.length > 0) {
    params.append("ingredients", ingredients.join(","));
  }
  if (filters) {
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append("filters", key);
      }
    });
  }
  if (sortBy) {
    params.append("sortBy", sortBy);
  }

  const response = await fetch(`${BASE_URL}/recipes?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return response.json();
}

export async function fetchRecipeDetail(id) {
  const response = await fetch(`${BASE_URL}/recipe/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch recipe details");
  }
  return response.json();
}
