import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About.jsx";
import Generate from "./components/Generate.jsx";
import SignUp from "./components/SignUp.jsx";
import Hero from "./components/Hero.jsx";

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
        element: <SignUp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </StrictMode>
);
