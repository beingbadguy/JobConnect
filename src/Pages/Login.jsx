import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [password, setPassword] = useState(true);
  const loginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
    const handleLogin = (e) => {
      


        
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-[77vh] sm:min-h-[84vh]">
      <img
        src="https://img.icons8.com/?size=100&id=WP0ZFD6iSQ2B&format=png&color=000000"
        alt=""
        className="absolute left-4 cursor-pointer h-7 top-20"
        onClick={() => {
          window.history.back();
        }}
      />
      <img
        src="https://www.logggos.club/logos/socialclub.svg"
        alt=""
        className="h-8 sm:h-8 md:h-8 mb-2"
      />
      <p>Welcome Back!</p>
      <form className="flex items-center justify-center flex-col gap-4 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%]  ">
        <label htmlFor="" className="flex flex-col w-full gap-2 ">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={login.email}
            onChange={loginChange}
            required
            className="border border-black rounded p-2"
          />
        </label>
        <label htmlFor="" className="flex flex-col w-full gap-2 relative">
          Password
          <div>
            <input
              type={password ? "password" : "text"}
              id="email"
              name="password"
              value={login.password}
              onChange={loginChange}
              required
              className="border border-black rounded p-2  w-full"
            />
            {password ? (
              <IoMdEyeOff
                className=" absolute right-3 top-11 cursor-pointer"
                onClick={() => {
                  setPassword(!password);
                }}
              />
            ) : (
              <IoEye
                className=" absolute right-3 top-11 cursor-pointer"
                onClick={() => {
                  setPassword(!password);
                }}
              />
            )}
          </div>
        </label>
        <button className="bg-purple-400 w-full p-2 rounded">Login</button>
        <p>
          Don't have an account?{" "}
          <span className="underline text-purple-600">
            <Link to={"/signup"}> Signup </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
