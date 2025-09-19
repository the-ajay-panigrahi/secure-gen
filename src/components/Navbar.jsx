import ThemeBtn from "./ThemeBtn";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="text-gray-600 dark:bg-slate-900 dark:text-gray-300 body-font">
      <div className="container mx-auto flex flex-wrap px-5 py-4 flex-col md:flex-row items-center">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center text-gray-900 dark:text-white mb-4 md:mb-0"
        >
          <i className="fa-solid fa-key"></i>
          <span className="ml-2 text-xl">SecureGen</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <ThemeBtn />
          <Link
            to={"/about"}
            className="ml-5 mr-5 hover:text-gray-900 dark:hover:text-white"
          >
            About
          </Link>
          <Link
            to={"/generate"}
            className="mr-5 hover:text-gray-900 dark:hover:text-white"
          >
            Generate Password
          </Link>
        </nav>
        <Link
          to={"/signup"}
          className="inline-flex items-center bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-base mt-4 md:mt-0"
        >
          Sign Up
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
