import "./CSS/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import FavouritesPage from "./components/Favouritespage";
import IndividualRecipePage from "./components/IndividualRecipePage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recipe/:id" element={<IndividualRecipePage />} />
          {/* <Route path="/results" element={<SearchResultsPage />} /> */}
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
