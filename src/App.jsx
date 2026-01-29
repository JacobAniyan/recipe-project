import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import FavouritesPage from "./components/FavouritesPage";
import RecipePage from "./components/RecipePage";
import InlineError from "./components/InlineError";
import SearchResultsPage from "./components/SearchResultsPage";
import AllRecipesPage from "./components/AllRecipesPage";
import "./CSS/App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/results" element={<SearchResultsPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/recipes" element={<AllRecipesPage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="*" element={<InlineError type="404" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
