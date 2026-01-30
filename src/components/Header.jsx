import { useEffect, useState } from "react";

import NavBar from "./Navbar";

const Header = () => {
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
      <NavBar
        themeToggleButton={
          <button
            type="button"
            className="theme-toggle-button"
            onClick={toggleDarkMode}
            aria-pressed={isDark}
            aria-label="Toggle dark mode"
          >
            {isDark ? "Switch to: Light Mode" : "Switch to: Dark Mode"}
          </button>
        }
      />
    </header>
  );
};

export default Header;
