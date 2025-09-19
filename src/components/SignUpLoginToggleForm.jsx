import React, { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { signUp, logIn } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const SignUpLoginToggleForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth(); 
  
  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/manage-passwords");
    }
  }, [currentUser, loading, navigate]);

  const onSubmit = async (data) => {
    try {
      if (isSignUp) {
        await signUp(data.name, data.email, data.password);
        toast.success("Account created successfully! You are now logged in.");
      } else {
        await logIn(data.email, data.password);
        toast.success("Logged in successfully!");
      }
      reset();
    } catch (error) {
      console.error("Authentication error:", error.code, error.message);
      let errorMessage = "An unexpected error occurred.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "Incorrect password.";
          break;
        default:
          errorMessage = `Authentication failed: ${error.message}`;
          break;
      }
      toast.error(errorMessage);
    }
  };

  if (loading || currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <section className="text-gray-600 dark:bg-gray-900 body-font min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                reset();
              }}
              className="font-medium text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300 focus:outline-none"
            >
              {isSignUp
                ? "log in to an existing account"
                : "create a new account"}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                  isSignUp ? "" : "rounded-t-md"
                } focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>


          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-400"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpLoginToggleForm;
