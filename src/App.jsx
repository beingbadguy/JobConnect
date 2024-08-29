// import { FirebaseContext } from "./context/FirebaseContext";
//   const hey = useContext(FirebaseContext);
//   console.log(hey);

import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const App = () => {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const inputRef = useRef();
  const [error, setError] = useState("");
  return (
    <div className="">
      {/* hero  */}
      <div className="min-h-[78vh] md:min-h-[86vh] flex justify-center items-center flex-col  ">
        <img src=".\main.svg" alt="" className="h-32 md:h-48 mb-10" />
        <h1 className="mx-3 text-3xl sm:text-4xl md:text-6xl font-bold md:w-[600px] text-center text-purple-500">
          Modernizing the Job Search Experience
        </h1>
        <p className="mx-4 my-5 md:w-[500px] text-center text-gray-500">
          Unlock your true potential and discover a world of opportunities that
          align with your skills, interests, and aspirants.
        </p>
        <div className="flex items-center justify-center  gap-4 mx-4 flex-col sm:flex-row w-full">
          <div className="flex items-center justify-between gap-2 border-2 border-black p-1 w-[70%]  rounded sm:w-[40%]">
            <input
              type="text "
              className="outline-none font-bold w-full bg-transparent text-black placeholder:text-black"
              placeholder="Search job for..."
              ref={inputRef}
            />
            <IoSearchOutline className="text-xl" />
          </div>
          <button
            className={` font-bold bg-black text-white p-2 rounded w-[70%]  sm:w-[20%]`}
            onClick={() => {
              if (inputRef.current.value.length >= 2) {
                navigate(`/jobs/${inputRef.current.value}`);
              } else {
                setError("Please Enter a valid job name");
              }
            }}
          >
            Search
          </button>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
