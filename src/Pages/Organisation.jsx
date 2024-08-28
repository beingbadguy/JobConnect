import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineStar } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { VscGear } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";

const Profile = () => {
  const { logout, user, userData, jobs } = useContext(FirebaseContext);
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState(null);
  console.log(userData?.profilePic);
  // console.log(profile?.name);
  // console.log(profile.name);
  const changeProfile = async (e) => {
    const { files } = e.target;
    const file = files[0];
    setProfile(files[0]);
    try {
      const uploadRef = ref(storage, `pp/${file.name}`);
      console.log(files[0].name);
      await uploadBytes(uploadRef, file);
      const downloadURL = await getDownloadURL(uploadRef);

      const profilePicRef = doc(db, "users", user.uid);
      await updateDoc(profilePicRef, {
        profilePic: downloadURL,
      });
      setProfile(false);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  const changeResume = async (e) => {
    const { files } = e.target;
    const file = files[0];
    setResume(files[0]);
    try {
      const uploadRef = ref(storage, `pp/${file.name}`);
      console.log(files[0].name);
      await uploadBytes(uploadRef, file);
      const downloadURL = await getDownloadURL(uploadRef);

      const profilePicRef = doc(db, "users", user.uid);
      await updateDoc(profilePicRef, {
        resume: downloadURL,
      });
      setProfile(false);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const appliedPeople = async () => {
    const appliedRef = doc(db, "jobs");
  };

  useEffect(() => {}, [changeProfile]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const jobsCreatedByMe = jobs.filter((job) => {
    return job.createdBy === user.uid;
  });
  console.log(jobsCreatedByMe);
  useEffect(() => {}, []);

  return (
    <div className="min-h-[78vh] md:min-h-[85vh] mb-6">
      <div className="flex p-4 justify-between">
        <img
          src="https://img.icons8.com/?size=100&id=WP0ZFD6iSQ2B&format=png&color=000000"
          alt=""
          className=" left-4 cursor-pointer h-7 top-20"
          onClick={() => {
            window.history.back();
          }}
        />
        <img
          src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000"
          alt=""
          className=" left-4 cursor-pointer h-7 top-20"
          onClick={() => {
            logout();
            navigate("/");
          }}
        />
      </div>

      <div className="px-4">
        <div className="flex items-center">
          <p>Account</p>
          <img
            src="https://img.icons8.com/?size=100&id=86517&format=png&color=000000"
            alt=""
            className="h-5"
          />
          <p className="text-purple-600">Oragnisation Info</p>
        </div>
        {userData?.profilePic ? (
          <img
            src={userData?.profilePic}
            alt=""
            className="mt-4 h-20 w-20 rounded-full object-cover border border-purple-500"
          />
        ) : (
          <img
            src="https://img.icons8.com/?size=100&id=7820&format=png&color=1A1A1A"
            alt=""
            className="mt-4 h-16 w-16 rounded-full"
          />
        )}

        <div className="flex items-center justify-between mt-4">
          <p className="">Profile Picture</p>
          <div className="bg-black text-white  p-1 px-2 text-sm rounded-xl w-[100px] h-7 relative cursor-pointer flex items-center justify-center">
            <div className="cursor-pointer flex items-center gap-2">
              <img
                src="https://img.icons8.com/?size=100&id=4716&format=png&color=EBEBEB"
                alt=""
                className="h-4"
              />
              Upload
              <input
                type="file"
                className=" absolute w-full left-0 cursor-pointer overflow-hidden opacity-0"
                onChange={changeProfile}
                accept=".png, .jpg, .jpeg"
              />
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="flex items-start flex-col mt-4">
          <p>Organisation Name</p>
          <p className="text-purple-600">{userData?.name}</p>
        </div>
        <div className="flex items-start flex-col mt-4">
          <p>Email</p>
          <p className="text-purple-600">{user?.email}</p>
        </div>
        <div className="flex items-start flex-col mt-4">
          <p>Contact</p>
          <p className="text-purple-600">{userData?.phone}</p>
        </div>

        <div className="flex items-start flex-col mt-4">
          <p>Organisation City</p>
          <p className="text-purple-600">{userData?.address}</p>
        </div>
        <div className="mt-4">
          <p>Created Jobs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {jobsCreatedByMe &&
              jobsCreatedByMe.map((job, i) => (
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
                  <div>
                    <p>People Applied</p>
                    <div className="flex justify-between">
                      <p>Name</p>
                      <p>Resume</p>
                    </div>
                    <div>
                      {job.resumeReceived.map((name, index) => (
                        <div key={index} className="flex justify-between mt-2">
                          <p className="font-bold">{name.name}</p>
                          <a
                            href={name.resume}
                            target="_blank"
                            className="text-purple-500 cursor-pointer"
                          >
                            view
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
