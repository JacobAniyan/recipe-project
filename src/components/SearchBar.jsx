import React from "react";

const SearchBar = () => {
  return (
    <form>
      <input type="text" placeholder="Type your ingredient(s) here" />
      <button type="submit">What's cooking?</button>
    </form>
  );
};

export default SearchBar;
