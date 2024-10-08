import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FirebaseContext } from "./context/FirebaseContext";
import { useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import ClipLoader from "react-spinners/ClipLoader";

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    // Set loading to true when path changes
    setLoading(true);
    // Simulate a network request or loading delay
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after delay
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timer); // Clear timeout on unmount or path change
  }, [location.pathname]);

  const { user, userData } = useContext(FirebaseContext);
  const [path, setPath] = useState(window.location.pathname);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="p-4 flex justify-between items-center bg-[#FAF9F6]">
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <img
              src="./logo.jpg"
              alt=""
              className="h-8 sm:h-8 md:h-8 rounded"
            />
            <div className="text-xl font-bold">
              Job<span className="text-purple-600">Connect</span>
            </div>
          </div>
        </Link>
        {/* menu  */}
        <div
          className={`flex items-center justify-center gap-4 lg:gap-10 flex-col md:flex-row absolute md:static bg-white h-[100vh] md:h-0 w-full md:w-auto  top-0 left-0 z-[999] ${
            menu ? "translate-x-[0%]" : "translate-x-[-100%] md:translate-x-0"
          } fixed  transition-all duration-500 `}
        >
          <div className=" md:block">
            <ul className="flex gap-6 md:gap-10 justify-between font-bold flex-col items-center  md:flex-row text-2xl md:text-sm ">
              <img
                src="https://img.icons8.com/?size=100&id=46&format=png&color=000000"
                alt=""
                className="absolute md:hidden right-5 top-5 h-5 cursor-pointer"
                onClick={() => {
                  setMenu(false);
                }}
              />
              <li
                className={`hover:text-purple-600 cursor-pointer transition-all duration-500 ${
                  path === "/" ? "text-purple-600" : ""
                }  `}
                onClick={() => {
                  setMenu(false);
                  setPath("/");
                }}
              >
                <Link to={"/"}>Home</Link>{" "}
              </li>
              <li
                className={`hover:text-purple-600 cursor-pointer transition-all duration-500 ${
                  path === "/jobs" ? "text-purple-600" : ""
                }  `}
                onClick={() => {
                  setMenu(false);
                  setPath("/jobs");
                }}
              >
                <Link to={"/jobs"}>Find Job</Link>{" "}
              </li>
              <li
                className={`hover:text-purple-600 cursor-pointer transition-all duration-500 ${
                  path === "/post" ? "text-purple-600" : ""
                }  `}
                onClick={() => {
                  setMenu(false);
                  setPath("/post");
                }}
              >
                <Link to={"/post"}>Post Job</Link>{" "}
              </li>
              <li
                className={`hover:text-purple-600 cursor-pointer transition-all duration-500 ${
                  path === "/about" ? "text-purple-600" : ""
                }  `}
                onClick={() => {
                  setMenu(false);
                  setPath("/about");
                }}
              >
                <Link to={"/about"}>About Us</Link>
              </li>
            </ul>
          </div>
          {user ? (
            <div
              onClick={() => {
                userData?.role == "Employee"
                  ? navigate("/profile")
                  : navigate("/organisation");

                setMenu(false);
              }}
            >
              <img
                src="https://img.icons8.com/?size=100&id=20749&format=png&color=000000"
                alt=""
                className="h-16 md:h-8 cursor-pointer border rounded-full border-purple-500 mt-10 md:mt-0"
              />
            </div>
          ) : (
            <div className=" gap-10 md:gap-4 font-bold  flex mt-10 md:mt-0">
              <div
                className="border border-purple-600 text-purple-600 p-1 px-4 rounded cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setMenu(false);
                }}
              >
                Login
              </div>
              <div
                className=" p-1 px-4  bg-purple-600 text-white rounded cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                  setMenu(false);
                }}
              >
                Sign Up
              </div>
            </div>
          )}
        </div>

        <div
          className="md:hidden cursor-pointer"
          onClick={() => {
            setMenu(true);
          }}
        >
          <svg
            className="h-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 10H3M20 6H3M20 14H3M16 18H3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {loading && loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
          <ClipLoader />
          {/* <PacmanLoader /> */}
        </div>
      ) : (
        <Outlet />
      )}

      <div>
        <hr />
        <p
          className={` ${
            loading ? "hidden" : "flex"
          } flex justify-center items-center p-2`}
        >
          <img
            src="https://img.icons8.com/?size=100&id=59825&format=png&color=000000"
            className="h-4"
            alt=""
          />
          © 2024 Job <span className="text-purple-500">Connect </span>.
        </p>
      </div>
    </div>
  );
};

export default Layout;
