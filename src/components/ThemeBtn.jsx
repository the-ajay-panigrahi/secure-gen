import { useEffect, useState } from "react";

const ThemeBtn = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setDarkMode(!darkMode)}
      className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors duration-200 
        bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100
        hover:bg-zinc-200 dark:hover:bg-zinc-700
        focus:outline-none focus-visible:ring-2 ring-offset-2 ring-zinc-400 dark:ring-zinc-600 ring-offset-white dark:ring-offset-[#0a0a0c] cursor-pointer"
    >
      <i
        className={`fa-solid ${
          darkMode ? "fa-sun" : "fa-moon"
        } text-base sm:text-lg transition-transform duration-200`}
      ></i>
    </button>
  );
};

export default ThemeBtn;
