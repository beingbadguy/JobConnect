import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FirebaseContext } from "../context/FirebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Oval } from "react-loader-spinner";
import { auth } from "../config/firebase";

const Login = () => {
  const { user, setUser } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const [password, setPassword] = useState(true);
  const loginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (login.email === "" || login.password === "") {
      alert("Please fill in all fields");
      return;
    } else {
      try {
        setLoader(true);
        await signInWithEmailAndPassword(auth, login.email, login.password);
        // setUser(auth.currentUser);
        window.location.href = "/";
        setLogin({ email: "", password: "" });
        setLoader(false);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
        setLoader(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

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
      {error != "" ? <p className="text-sm text-red-500 mt-4">{error}</p> : ""}
      <form
        className="flex items-center justify-center flex-col gap-4 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%]  "
        onSubmit={handleLogin}
      >
        <label htmlFor="" className="flex flex-col w-full gap-2 ">
          Email
          <input
            type="email"
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

        <button className="bg-purple-400 w-full p-2 rounded flex items-center justify-center" type="submit">
          {loader ? (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="white"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Login"
          )}
        </button>
        <p>
          Don't have an account?``
          <span className="underline text-purple-600">
            <Link to={"/signup"}> Signup </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
