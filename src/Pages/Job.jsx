import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Make sure to import the necessary functions
import { IoLocation } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { db } from "../config/firebase";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { VscGear } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { FirebaseContext } from "../context/FirebaseContext";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineStar } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

const Job = () => {
  const { jobs } = useContext(FirebaseContext);

  const { id } = useParams();
  console.log(typeof id);
  const [job, setJob] = useState();

  const fetchJobById = async (id) => {
    const jobRef = doc(db, "jobs", id);
    const jobSnapshot = await getDoc(jobRef);

    if (jobSnapshot.exists()) {
      const jobData = jobSnapshot.data();
      setJob(jobData);
      console.log("Job data:", jobData);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    fetchJobById(id);
    window.scrollTo(0, 0);
  }, [id]);

  const suggestedJobs = jobs.filter((job) => {
    return job.id !== id;
  });
  console.log(suggestedJobs);

  return (
    <div>
      <div className="p-4 flex justify-evenly items-center flex-col sm:flex-row mt-10 sm:mt-0">
        <img
          src="https://img.icons8.com/?size=100&id=WP0ZFD6iSQ2B&format=png&color=000000"
          alt=""
          className="absolute left-4 cursor-pointer h-7 top-20"
          onClick={() => {
            window.history.back();
          }}
        />
        <div className="md:min-w-[60%] md:max-w-[60%]">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">{job?.title}</h1>
            

              <img
                src="https://img.icons8.com/?size=100&id=82461&format=png&color=000000"
                alt=""
                className="cursor-pointer h-5 "
              />
            
          </div>
          <div className="flex items-start  justify-start gap-4 mt-5">
            <img src={job?.companyLogo} alt="" className="h-16 sm:h-12" />
            <div className="flex gap-2 flex-col">
              <div>
                <div className="flex flex-col sm:flex-row gap-0 sm:gap-2 ">
                  <h2 className="font-bold text-purple-600 flex items-center gap-0 sm:gap-2">
                    {job?.companyName}
                  </h2>
                  <div className="flex items-center">
                    <div>
                      <IoLocation className="" />
                    </div>
                    <p>{job?.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdOutlineCurrencyRupee />
                  <p>{job?.salary + " Lakhs"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* this  */}
          <div>
            <div className="flex gap-10 flex-col md:flex-row items-start ">
              <div className="">
                <div>
                  <p className="font-bold mt-8 ">About this role</p>
                  <div className="mt-3">{job?.description}</div>
                </div>
                <div>
                  <p className="font-bold mt-8">Qualification</p>
                  <div className="mt-3">{job?.education}</div>
                </div>
                <div>
                  <p className="font-bold mt-8">Responsibilities</p>
                  <div className="mt-3">{job?.responsibilities}</div>
                </div>
              </div>
              <div className="p-4 border shadow-md rounded w-[100%] grid grid-cols-2 md:block">
                <div>
                  <p className="font-bold mt-8 flex items-center gap-2">
                    {" "}
                    <img
                      src="https://img.icons8.com/?size=100&id=99268&format=png&color=000000"
                      alt=""
                      className="h-4"
                    />{" "}
                    Vacancy
                  </p>
                  <div className="mt-1">{job?.vacancy}</div>
                </div>
                <div>
                  <p className="font-bold mt-8  flex items-center gap-2">
                    {" "}
                    <img
                      src="https://img.icons8.com/?size=100&id=67020&format=png&color=000000"
                      className="h-4"
                      alt=""
                    />{" "}
                    Job Type
                  </p>
                  <div className="mt-1">{job?.workPreference}</div>
                </div>
                <div>
                  <p className="font-bold mt-8 flex items-center gap-2">
                    {" "}
                    <img
                      src="https://img.icons8.com/?size=100&id=85185&format=png&color=000000"
                      alt=""
                      className="h-4"
                    />{" "}
                    Experience
                  </p>
                  <div className="mt-1">{job?.experience}</div>
                </div>
                <div>
                  <p className="font-bold mt-8 flex items-center gap-2">
                    <img
                      src="https://img.icons8.com/?size=100&id=60688&format=png&color=000000"
                      alt=""
                      className="h-4"
                    />
                    Email
                  </p>
                  <div className="mt-1">{job?.hireEmail}</div>
                </div>
                <div>
                  <p className="font-bold mt-8 flex items-center gap-2">
                    {" "}
                    <img
                      src="https://img.icons8.com/?size=100&id=gqZeQtPB87AG&format=png&color=000000"
                      alt=""
                      className="h-4"
                    />{" "}
                    Shift
                  </p>
                  <div className="mt-1">{job?.type}</div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 font-bold text-white bg-purple-600 w-[200px] flex items-center justify-center rounded p-2 cursor-pointer">
            Apply
          </p>
        </div>
      </div>
      <hr />
      <div className="pb-10 m-4 ">
        <p className="font-bold">Suggested Jobs</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {suggestedJobs &&
            suggestedJobs.map((job, i) => (
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
                    <img
                      src="https://img.icons8.com/?size=100&id=82461&format=png&color=000000"
                      alt=""
                      className="cursor-pointer h-5"
                    />
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
      </div>
    </div>
  );
};

export default Job;
