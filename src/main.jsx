import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About.jsx";
import Generate from "./components/Generate.jsx";
import SignUp from "./components/SignUpLoginToggleForm.jsx";
import Hero from "./components/Hero.jsx";
import SignUpLoginToggleForm from "./components/SignUpLoginToggleForm.jsx";
import ManagePasswords from "./components/ManagePasswords.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // This makes the Hero component the default component for the "/" path
        element: <Hero />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "generate",
        element: <Generate />,
      },
      {
        path: "signup",
        element: <SignUpLoginToggleForm />,
      },
      {
        path: "manage-passwords",
        element: (
          <ProtectedRoute>
            <ManagePasswords />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>
);
