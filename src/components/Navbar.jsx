import ThemeBtn from "./ThemeBtn";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; 
import { logOut } from "../firebaseConfig"; 
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("Failed to log out.");
    }
  };

  return (
    <header className="text-gray-600 dark:bg-gray-800 dark:text-gray-300 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center text-gray-900 dark:text-white mb-4 md:mb-0"
        >
          <i className="fa-solid fa-key"></i>
          <span className="ml-2 text-xl">SecureGen</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to={"/about"}
            className="mr-5 hover:text-gray-900 dark:hover:text-white"
          >
            About
          </Link>
          <Link
            to={"/generate"}
            className="mr-5 hover:text-gray-900 dark:hover:text-white"
          >
            Generate Password
          </Link>
          {currentUser && (
            <Link
              to={"/manage-passwords"}
              className="mr-5 hover:text-gray-900 dark:hover:text-white"
            >
              Manage Passwords
            </Link>
          )}
          <ThemeBtn />
        </nav>

        {currentUser ? (
          <button
            onClick={handleLogout}
            className="inline-flex items-center bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-base mt-4 md:mt-0"
          >
            Log Out
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        ) : (
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
        )}
      </div>
    </header>
  );
};

export default Navbar;
