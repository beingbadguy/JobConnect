import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseContext } from "../context/FirebaseContext";
import { Oval } from "react-loader-spinner";

const Signup = () => {
  const { user } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [password, setPassword] = useState(true);
  const loginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      login.email != "" &&
      login.password != "" &&
      login.password.length >= 8 &&
      login.name != "" &&
      login.role != ""
    ) {
      try {
        setLoader(true);

        await createUserWithEmailAndPassword(auth, login.email, login.password);
        const userdata = auth.currentUser;
        // console.log(userdata);
        if (login.role == "Recruiter") {
          if (userdata) {
            await setDoc(doc(db, "users", userdata.uid), {
              name: login.name,
              profilePic:
                "https://img.icons8.com/?size=100&id=7820&format=png&color=1A1A1A",

              email: login.email,
              userId: userdata.uid,
              JobsCreated: [],
              JobsSaved: [],
              JobsApplied: [],
              role: login.role,
              address: "New Delhi",
              phone: "9876543210",
              resume: null,
              education: [],
              experience: [],
              skills: [],
              projects: [],
              achievements: [],
              lastLogin: new Date(),
              lastUpdated: new Date(),
              notifications: [],
            });
          }
          setLoader(false);
        } else {
          if (userdata) {
            await setDoc(doc(db, "users", userdata.uid), {
              name: login.name,
              email: login.email,
              userId: userdata.uid,
              profilePic:
                "https://img.icons8.com/?size=100&id=7820&format=png&color=1A1A1A",

              JobsCreated: [],
              JobsSaved: [],
              JobsApplied: [],
              role: login.role,
              address: "Jwala nagar",
              phone: "9876543210",
              resume: null,
              education: [],
              experience: [],
              skills: [],
              projects: [],
              achievements: [],
              lastLogin: new Date(),
              lastUpdated: new Date(),
              notifications: [],
            });
          }
        }

        console.log("user Created");
        setLoader(false);
        navigate("/");
      } catch (error) {
        console.log(error.message);
        setError(error.message);
        setLoader(false);
      }
    } else {
      setError("please fill all fields");
    }
  };
  // console.log(login);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-col min-h-[77vh] sm:min-h-[84vh]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 cursor-pointer h-7 top-20"
        onClick={() => {
          window.history.back();
        }}
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <img src="./logo.jpg" alt="" className="h-8 sm:h-8 md:h-8 mb-2 rounded" />
      <p>Hi, Welcome Back!</p>
      {error != "" ? <p className="text-sm text-red-500 mt-4">{error}</p> : ""}

      <form
        className="mt-2 flex items-center justify-center flex-col gap-4 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] "
        onSubmit={handleLogin}
      >
        <label htmlFor="" className="flex flex-col w-full gap-2 ">
          {login.role == "Recruiter" ? (
            <p>Organisation Name</p>
          ) : (
            <p>Full Name</p>
          )}
          <input
            type="text"
            id="name"
            name="name"
            value={login.name}
            onChange={loginChange}
            required
            className="border border-black rounded p-2"
          />
        </label>
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
        <label htmlFor="" className="flex flex-col w-full gap-2 relative ">
          Role
          <div>
            <select
              name="role"
              className="w-full p-2 border border-black rounded "
              value={login.role}
              onChange={loginChange}
            >
              <option value="">Select</option>

              <option value="Employee" className="cursor-pointer">
                Employee
              </option>
              <option value="Recruiter" className="cursor-pointer">
                Recruiter
              </option>
            </select>
          </div>
        </label>
        <button
          className="bg-purple-500 w-full p-2 rounded flex items-center justify-center font-bold text-white"
          type="submit"
        >
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
            "Create Account"
          )}
        </button>
        <p>
          Already have an account?{" "}
          <span className="underline text-purple-600">
            <Link to={"/Login"}> Login </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
