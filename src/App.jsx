import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import FavouritesPage from "./components/Favouritespage";
import IndividualRecipePage from "./components/IndividualRecipePage";
import ErrorPage from "./components/ErrorPage";
import ResultsPage from "./components/ResultsPage";
import "./CSS/App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          {/* <Route path="/recipe" element={<All Recipes Page/>} /> */}
          <Route path="/recipe/:id" element={<IndividualRecipePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
