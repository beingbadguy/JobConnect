import { IoSearchOutline } from "react-icons/io5";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { VscGear } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FirebaseContext } from "../context/FirebaseContext";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineStar } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

const Jobs = () => {
  const { searchValue } = useParams();
  // console.log(searchValue);

  const { jobs, saveJobs, userData } = useContext(FirebaseContext);
  const [filter, setFilter] = useState(false);

  const [newJobs, setNewJobs] = useState();
  const [search, setSearch] = useState({
    search: "",
  });
  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };
  // console.log(search);

  const selectedJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(search.search.toLowerCase().trim());
  });

  useEffect(() => {
    setNewJobs(selectedJobs);
    window.scrollTo(0, 0);
  }, [search]);
  useEffect(() => {
    if (searchValue != undefined && searchValue.length > 2) {
      setSearch({ ...search, search: searchValue });
    }
  }, []);

  const [rangeValue, setRangeValue] = useState(1);

  const handleRange = (e) => {
    setRangeValue(e.target.value);
  };
  const inputRef = useRef(null);

  return (
    <div className="mb-10">
      <div className="flex items-start  mt-5 gap-5  mx-4 min-h-[85vh]">
        {/* right */}
        <div className="w-full">
          <div className="min-h-36  bg-gradient-to-r from-violet-100 to-violet-300 ">
            <h1 className="p-4 text-4xl font-bold">Find your dream job here</h1>
          </div>
          <div className="flex items-center  gap-4 my-4 ">
            <div className="flex items-center justify-between gap-2 border border-black p-2  rounded-md w-[80%]">
              <input
                type="text "
                className="outline-none  w-full bg-transparent "
                placeholder="Search job for..."
                name="search"
                value={search.search}
                onChange={handleSearch}
                ref={inputRef}
              />
              <IoSearchOutline
                className="text-xl"
                onClick={() => {
                  inputRef.current.blur();
                }}
              />
            </div>
            <button
              className="bg-purple-600 text-white p-2 rounded w-[20%]"
              onClick={() => {
                inputRef.current.blur();
              }}
            >
              Search
            </button>
          </div>
          {/* filter  */}
          {/* <div
            className={`border  p-2 min-w-[250px] md:flex flex-col rounded pl-3 shadow-sm shadow-gray-400  mb-6 ${
              filter ? "h-[620px]" : "h-10"
            } transition-all duration-500 h-10 overflow-hidden cursor-pointer  `}
          >
            <div
              className="flex items-center justify-between"
              onClick={() => {
                setFilter(!filter);
              }}
            >
              <p className="font-bold">Filter</p>
              <FaAngleDown className="cursor-pointer" />
            </div>
            <hr className="mt-4" />
            <label className="mt-4 font-bold flex items-center gap-1">
              <IoLocation /> Preffered Job Location
            </label>
            <div className=" grid grid-cols-2 my-3">
              <div>
                <input type="radio" name="" id="" /> New Delhi
              </div>
              <div>
                <input type="radio" name="" id="" /> Noida
              </div>
              <div>
                <input type="radio" name="" id="" /> Ghaziabad
              </div>
              <div>
                <input type="radio" name="" id="" /> Gurgaon
              </div>
              <div>
                <input type="radio" name="" id="" /> Bangalore
              </div>
              <div>
                <input type="radio" name="" id="" /> Pune
              </div>
              <div>
                <input type="radio" name="" id="" /> Chandigarh
              </div>
              <div>
                <input type="radio" name="" id="" /> Kolkata
              </div>
            </div>
            <label className="my-3 font-bold flex items-center gap-1">
              <BiSolidCategoryAlt />
              Category
            </label>
            <select
              name=""
              id=""
              className="border border-black p-1 outline-none w-full"
            >
              <option value="">Remote</option>
              <option value="">On Site</option>
            </select>
            <label className="mt-4 font-bold flex items-center gap-1">
              <VscGear /> Job Type
            </label>
            <div className=" grid grid-cols-2 my-3">
              <div>
                <input type="checkbox" name="" id="" /> Full time
              </div>
              <div>
                <input type="checkbox" name="" id="" /> Intership
              </div>
              <div>
                <input type="checkbox" name="" id="" /> Freelance
              </div>
              <div>
                <input type="checkbox" name="" id="" /> Part Time
              </div>
            </div>

            <label className="mt-4 font-bold flex items-center gap-1">
              <IoIosStar /> Experience Level
            </label>
            <div className=" grid grid-cols-2 my-3">
              <div>
                <input type="checkbox" name="" id="" /> Entry Level
              </div>
              <div>
                <input type="checkbox" name="" id="" /> Intermediate
              </div>
              <div>
                <input type="checkbox" name="" id="" /> Expert
              </div>
            </div>
            <label className="mt-4 font-bold flex items-center gap-1  ">
              <MdOutlineCurrencyRupee />
              Salary Expectation
            </label>
            <input
              type="range"
              min="1"
              max="90"
              name="rangeValue"
              value={rangeValue}
              onChange={handleRange}
              className="w-full"
            />
            <div className="flex justify-between mt-3">
              <p>{rangeValue} Lakhs</p>
            </div>
          </div> */}

          {/* all about jobs  */}
          <div className="  ">
            {search && search.search.length > 2 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newJobs.length === 0 ? (
                  <p>No Job Found for this Keyword</p>
                ) : (
                  newJobs &&
                  newJobs.map((job, i) => (
                    <div
                      key={i}
                      className="flex flex-col border p-2 rounded shadow-md"
                    >
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex gap-4">
                          <div className="">
                            <img
                              src={job?.companyLogo}
                              alt=""
                              className="h-10 w-10 object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-bold">{job.title}</div>
                            <div>{job.companyName}.</div>
                          </div>
                        </div>

                        <div className=" p-2">
                          {userData && userData.JobsSaved.includes(job.id) ? (
                            <img
                              src="https://img.icons8.com/?size=100&id=59740&format=png&color=000000"
                              alt=""
                              className="cursor-pointer h-5"
                            />
                          ) : (
                            <img
                              src="https://img.icons8.com/?size=100&id=82461&format=png&color=000000"
                              alt=""
                              className="cursor-pointer h-5"
                              onClick={() => {
                                saveJobs(job.id);
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between my-2">
                        <div className="flex items-center gap-1">
                          <MdOutlineCurrencyRupee />

                          {job.salary + "L"}
                        </div>
                        <div className="flex items-center gap-1 my-1">
                          <IoLocation /> {job.location}
                        </div>
                      </div>

                      <div>{job.description.slice(0, 80) + "..."} </div>
                      {/* <div className="flex gap-2 flex-wrap mt-2">
                      {job?.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="border px-2  border-purple-600 text-purple-600"
                        >
                          <div>{skill}</div>
                        </div>
                      ))}
                    </div> */}
                      <div className="flex ic justify-between mt-2 mb-1">
                        <div className="flex items-center gap-1">
                          <MdOutlineStar className="text-yellow-500" />
                          <MdOutlineStar className="text-yellow-500" />
                          <MdOutlineStar className="text-yellow-500" />
                          <MdOutlineStar className="text-yellow-500" />
                          <MdOutlineStar className="text-yellow-500" />
                        </div>
                        <div className="bg-purple-700 font-semibold rounded text-white px-2 p-1 cursor-pointer">
                          <Link to={`/job/${job.id}`}>View Job</Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs &&
                  jobs.map((job, i) => (
                    <div
                      key={i}
                      className="flex flex-col border p-2 rounded shadow-md"
                    >
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex gap-4">
                          <div className="">
                            <img
                              src={job.companyLogo}
                              alt=""
                              className="h-10 w-10 object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-bold">{job.title}</div>
                            <div>{job.companyName}.</div>
                          </div>
                        </div>

                        <div className=" p-2">
                          {/* <img
                          src="https://img.icons8.com/?size=100&id=59740&format=png&color=000000"
                          alt=""
                          className="cursor-pointer h-5"
                        /> */}
                          {userData && userData.JobsSaved.includes(job.id) ? (
                            <img
                              src="https://img.icons8.com/?size=100&id=59740&format=png&color=000000"
                              alt=""
                              className="cursor-pointer h-5"
                            />
                          ) : (
                            <img
                              src="https://img.icons8.com/?size=100&id=82461&format=png&color=000000"
                              alt=""
                              className="cursor-pointer h-5"
                              onClick={() => {
                                saveJobs(job.id);
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between my-2">
                        <div className="flex items-center gap-1">
                          <MdOutlineCurrencyRupee />

                          {job.salary + "L"}
                        </div>
                        <div className="flex items-center gap-1 my-1">
                          <IoLocation /> {job.location}
                        </div>
                      </div>

                      <div>{job.description.slice(0, 80) + "..."} </div>
                      {/* <div className="flex gap-2 flex-wrap mt-2">
                      {job?.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="border px-2  border-purple-600 text-purple-600"
                        >
                          <div>{skill}</div>
                        </div>
                      ))}
                    </div> */}
                      <div className="flex ic justify-between mt-2 mb-1">
                        <div className="flex items-center gap-1">
                          <MdOutlineStar className="text-yellow-500" />
                          <MdOutlineStar className="text-yellow-500" />
                          <MdOutlineStar className="text-yellow-500" />
                          <MdOutlineStar className="text-yellow-500" />
                          <MdOutlineStar className="text-yellow-500" />
                        </div>
                        <div className="bg-purple-700 font-semibold rounded text-white px-2 p-1 cursor-pointer">
                          <Link to={`/job/${job.id}`}>View Job</Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
