import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Header = (props) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? saved === "true" : false;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", String(isDark));
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((v) => !v);

  return (
    <header className="site-header">
      <NavBar />

      <button
        type="button"
        className="theme-toggle-btn"
        onClick={toggleDarkMode}
        aria-pressed={isDark}
        aria-label="Toggle dark mode"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </header>
  );
};

export default Header;
