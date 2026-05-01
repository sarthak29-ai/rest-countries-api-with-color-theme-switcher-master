import ThemeSwitcher from './ThemeSwitcher';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white dark:bg-dark-blue shadow-md py-6 px-4 md:px-16 flex justify-between items-center transition-colors">
      <Link to="/">
        <h1 className="font-extrabold text-lg md:text-2xl text-dark-gray-light dark:text-white">
          Where in the world?
        </h1>
      </Link>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
