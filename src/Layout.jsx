import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { FirebaseContext } from "./context/FirebaseContext";
const Layout = () => {
  const { user } = useContext(FirebaseContext);
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
    <div>
      <div className="p-4 flex justify-between items-center bg-[#FAF9F6]">
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <img
              src="https://www.logggos.club/logos/socialclub.svg"
              alt=""
              className="h-8 sm:h-8 md:h-8"
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
                navigate("/profile");
                setMenu(false);
              }}
            >
              <img
                src="https://img.icons8.com/?size=100&id=20749&format=png&color=000000"
                alt=""
                className="h-8 cursor-pointer border rounded-full border-purple-500 mt-10 md:mt-0"
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
          <img
            src="https://img.icons8.com/?size=100&id=68555&format=png&color=000000"
            alt=""
            className="h-10 "
          />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <hr />
        <p className="flex justify-center items-center p-2">
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
