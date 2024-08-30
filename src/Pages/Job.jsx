import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"; // Make sure to import the necessary functions
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
import { Oval } from "react-loader-spinner";
import { FaAngleDown } from "react-icons/fa6";

const Job = () => {
  const { jobs, userData, user, saveJobs } = useContext(FirebaseContext);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  const [job, setJob] = useState();

  const fetchJobById = async (id) => {
    const jobRef = doc(db, "jobs", id);
    const jobSnapshot = await getDoc(jobRef);

    if (jobSnapshot.exists()) {
      const jobData = jobSnapshot.data();
      setJob(jobData);
      // console.log("Job data:", jobData);
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
  // console.log(userData.JobsApplied);
  // console.log(suggestedJobs);
  const applyButton = async (id) => {
    if (userData.resume != null && userData.resume != undefined) {
      try {
        setLoader(true);
        const userRef = doc(db, "users", user.uid);
        const jobRef = doc(db, "jobs", id);
        await updateDoc(jobRef, {
          resumeReceived: arrayUnion({
            name: userData.name,
            id: user.uid,
            resume: userData.resume,
          }),
        });
        await updateDoc(userRef, {
          JobsApplied: arrayUnion(id),
        });
        setApplied(true);
        setTimeout(() => {
          setLoader(false);
          window.location.reload();
        }, 2000);

        // alert("Application submitted successfully!");
      } catch (error) {
        console.log(error.message);
        setLoader(false);
      }
    } else {
      setError("Please upload your resume to apply for this job!");
      setLoader(false);
    }
  };
  const val = userData?.JobsApplied?.includes(id);

  return (
    <div>
      <div className="p-4 flex justify-evenly items-center flex-col sm:flex-row  sm:mt-0">
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

        <div className=" mt-6 md:mt-8">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">{job?.title}</h1>

            {userData && userData.JobsSaved.includes(id) ? (
              <img
                src="https://img.icons8.com/?size=100&id=59740&format=png&color=000000"
                alt=""
                className="cursor-pointer h-5"
              />
            ) : (
              <img
                src="https://img.icons8.com/?size=100&id=82461&format=png&color=000000"
                alt=""
                className="cursor-pointer h-5 "
                onClick={() => {
                  if (user) {
                    saveJobs(id);
                  } else {
                    navigate("/login");
                  }
                }}
              />
            )}
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
              <div className="p-4 border shadow-md rounded w-[100%] lg:w-[50%] grid grid-cols-2 md:block">
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
                  <p className="font-bold mt-8 flex items-center gap-2 ">
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
                <div className=" w-[200px]">
                  <p className="font-bold mt-8 flex items-center gap-2 ">
                    <img
                      src="https://img.icons8.com/?size=100&id=60688&format=png&color=000000"
                      alt=""
                      className="h-4"
                    />
                    Email
                  </p>
                  <div className="mt-1 w-[100px]">{job?.hireEmail}</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-6 font-bold text-white bg-purple-600 w-[150px] flex items-center justify-center rounded p-2 cursor-pointer ${
              user ? (userData?.role === "Recruiter" ? "hidden " : "") : "block"
            }`}
            onClick={() => {
              if (user) {
                val ? "" : applyButton(id);
              } else {
                navigate("/login");
              }
            }}
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
            ) : val ? (
              <div className="flex items-center justify-center gap-1">
                Applied
                <svg
                  className="h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15.5 9.5M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokelinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                Apply
                <svg
                  className="h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8ZM12 8V22M12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12H5M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          <p className="font-bold mt-2 text-red-500">{error}</p>
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
                          if (user) {
                            saveJobs(job.id);
                          } else {
                            navigate("/login");
                          }
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
      </div>
    </div>
  );
};

export default Job;
