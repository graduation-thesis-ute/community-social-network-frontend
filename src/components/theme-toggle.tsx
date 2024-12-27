import React, { useState } from "react";

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme} className="p-2 border rounded">
      {isDarkMode ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}

export default ThemeToggle;
