import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import FavouritesPage from "./components/Favouritespage";
import IndividualRecipePage from "./components/IndividualRecipePage";
import ErrorPage from "./components/ErrorPage";
import SearchResultsPage from "./components/ResultsPage";
import ResultsPage from "./components/ResultsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/api/" element={<HomePage />} />
        <Route path="/api/results" element={<ResultsPage />} />
        <Route path="/api/recipe" element={<AllRecipesPage />} />
        <Route path="/api/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/api/favourites" element={<FavouritesPage />} />

        {/* 404 Error - Catch all unmatched routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
