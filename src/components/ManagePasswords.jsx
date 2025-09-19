import { useAuth } from "../context/AuthContext"; 

const ManagePasswords = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Welcome to Your Secure Password Manager!
        </h2>
        {currentUser && (
          <p className="text-lg mb-6 dark:text-gray-300">
            Hello, {currentUser.displayName || currentUser.email}! You are
            successfully logged in.
          </p>
        )}
        <p className="dark:text-gray-400">
          This is where you can securely generate, store, and manage all your
          passwords. (Implementation for password management goes here.)
        </p>
      </div>
    </div>
  );
};

export default ManagePasswords;
