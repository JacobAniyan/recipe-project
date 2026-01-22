import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Homepage</Link>
      <Link to="/recipe">All Recipes</Link>
      <Link to="/favourites">Favourites</Link>
    </nav>
  );
};

export default NavBar;
