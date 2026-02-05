import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./CSS/App.css";

import AIRecipePage from "./components/AIRecipePage";
import AllRecipesPage from "./components/Allrecipespage";
import FavouritesPage from "./components/Favouritespage";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import InlineError from "./components/Inlineerror";
import RecipePage from "./components/Recipepage";
import SearchResultsPage from "./components/Searchresultspage";

function App() {
  return (
    <SkeletonTheme
      baseColor="#d4e7e0"
      highlightColor="#e8f4ef"
      borderRadius="8px"
      duration={2}
    >
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/results" element={<SearchResultsPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/recipes" element={<AllRecipesPage />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
            <Route path="/ai-recipe" element={<AIRecipePage />} />
            <Route path="*" element={<InlineError type="404" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
