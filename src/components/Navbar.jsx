import { Link } from "react-router-dom";

import logo from "../assets/Logo.png";

const NavBar = ({ themeToggleButton }) => {
  return (
    <nav>
      <Link to="/" className="logo-link" aria-label="Homepage/ Search Recipe">
        <img src={logo} alt="Recipe Gen Logo" className="brand-logo" />
      </Link>
      <div className="nav-links">
        <Link to="/recipes">All Recipes</Link>
        <Link to="/favourites">Favourites</Link>
        <Link to="/">Search</Link>
        <Link to="/ai-recipe">AI Recipe</Link>
        {themeToggleButton}
      </div>
    </nav>
  );
};

export default NavBar;
