import React, { useEffect, useState } from 'react';
import { HiOutlineMoon, HiMoon } from 'react-icons/hi';

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="flex items-center gap-2 font-semibold text-sm md:text-base transition-all text-dark-gray-light dark:text-very-light-gray"
    >
      {darkMode ? <HiOutlineMoon size={20} />: <HiMoon size={20} />}
      {darkMode ? "Light Mode": "Dark Mode"}
      
    </button>
  );
};

export default ThemeSwitcher;
