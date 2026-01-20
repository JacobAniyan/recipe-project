import React from "react";
import SearchBar from "./searchBar";

function HomePage() {
  return (
    <main className="home-page">
      <section className="welcome-section">
        <h2>Welcome to the recipe generator</h2>
        <h2> What is in your kitchen?</h2>
        <p>Insert your ingredients to generate a recipe </p>
      </section>

      <SearchBar />
    </main>
  );
}

export default HomePage;
