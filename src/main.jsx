import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MainContext from "./context/FirebaseContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Jobs from "./Pages/Jobs.jsx";
import Post from "./Pages/Post.jsx";
import About from "./Pages/About.jsx";
import Job from "./Pages/Job.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Profile from "./Pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "jobs/:searchValue",
        element: <Jobs />,
      },
      {
        path: "post",
        element: <Post />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "job/:id",
        element: <Job />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <MainContext>
    <RouterProvider router={router} />
    {/* <App /> */}
  </MainContext>
  // </StrictMode>
);
