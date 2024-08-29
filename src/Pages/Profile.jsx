import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { VscGear } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineStar } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

const Profile = () => {
  const { logout, user, userData, saveJobs } = useContext(FirebaseContext);
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState(null);
  const [save, setSave] = useState([]);
  const [name, setName] = useState(false);
  const [editName, setEditName] = useState({
    name: "",
  });
  const handleName = (e) => {
    const { name, value } = e.target;
    setEditName({ ...editName, [name]: value });
  };
  const changeName = async () => {
    try {
      const nameRef = doc(db, "users", user.uid);
      await updateDoc(nameRef, {
        name: editName.name,
      });
      setEditName({ name: "" });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [phone, setPhone] = useState(false);
  const [editPhone, setEditPhone] = useState({
    phone: "",
  });
  const handlePhone = (e) => {
    const { name, value } = e.target;
    setEditPhone({ ...editPhone, [name]: value });
  };
  const changePhone = async () => {
    try {
      const phoneRef = doc(db, "users", user.uid);
      await updateDoc(phoneRef, {
        phone: editPhone.phone,
      });
      setEditPhone({ phone: "" });

      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [address, setAddress] = useState(false);
  const [editAddress, setEditAddress] = useState({
    address: "",
  });
  const handleAddress = (e) => {
    const { name, value } = e.target;
    setEditAddress({ ...editAddress, [name]: value });
  };
  const changeAddress = async () => {
    try {
      const addressRef = doc(db, "users", user.uid);
      await updateDoc(addressRef, {
        address: editAddress.address,
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeProfile = async (e) => {
    const { files } = e.target;
    const file = files[0];
    setProfile(files[0]);
    try {
      const uploadRef = ref(storage, `pp/${file.name}`);
      // console.log(files[0].name);
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
      // console.log(files[0].name);
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

  const fetchJobById = async (id) => {
    try {
      const jobRef = doc(db, "jobs", id);
      const job = await getDoc(jobRef);
      if (!job.exists()) {
        console.log("No such document!");
        return;
      }
      const data = job.data();
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSavedJobs = async () => {
    if (userData?.JobsSaved?.length > 0) {
      try {
        // Fetch all jobs concurrently
        const jobs = await Promise.all(
          userData.JobsSaved.map((job) => fetchJobById(job))
        );
        // console.log(jobs); // This will log an array of job data
        setSave(jobs);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // console.log("No saved jobs.");
      return [];
    }
  };

  // Call the function to fetch saved jobs

  useEffect(() => {}, [changeProfile]);
  useEffect(() => {
    fetchSavedJobs();
  }, [user, userData]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  // console.log(editName);

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
          <p className="text-purple-600">Personal Info</p>
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
        <div className="grid">
          <div className="flex items-start flex-col mt-4">
            <div className="flex items-center justify-between w-full">
              <p>Name</p>
              <img
                src={
                  name
                    ? "https://img.icons8.com/?size=100&id=46&format=png&color=000000"
                    : "https://img.icons8.com/?size=100&id=88584&format=png&color=000000"
                }
                alt=""
                className="h-4"
                onClick={() => {
                  setName(!name);
                }}
              />
            </div>
            <p className={`text-purple-600 ${name ? "hidden" : "block"} `}>
              {userData?.name}
            </p>
            <div
              className={`${
                name ? "block" : "hidden"
              } flex items-center justify-between w-full  `}
            >
              <input
                type="text"
                name="name"
                value={editName.name}
                onChange={handleName}
                className={`${
                  name ? "block" : "hidden"
                } border outline-none border-purple-500 rounded px-1 `}
              />
              <img
                src="https://img.icons8.com/?size=100&id=98955&format=png&color=000000"
                alt=""
                className="h-4"
                onClick={() => {
                  if (editName.name.length <= 0) {
                    alert("Please Enter a name");
                    return;
                  } else {
                    changeName();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-start flex-col mt-4">
            <p>Email</p>
            <p className="text-purple-600">{user?.email}</p>
          </div>
          <div className="flex items-start flex-col mt-4">
            <div className="flex items-center justify-between w-full">
              <p>Phone</p>
              <img
                src={
                  phone
                    ? "https://img.icons8.com/?size=100&id=46&format=png&color=000000"
                    : "https://img.icons8.com/?size=100&id=88584&format=png&color=000000"
                }
                alt=""
                className="h-4"
                onClick={() => {
                  setPhone(!phone);
                }}
              />
            </div>
            <p className={`text-purple-600 ${phone ? "hidden" : "block"} `}>
              {userData?.phone}
            </p>
            <div
              className={`${
                phone ? "block" : "hidden"
              } flex items-center justify-between w-full  `}
            >
              <input
                type="number"
                name="phone"
                value={editPhone.phone}
                onChange={handlePhone}
                className={`${
                  phone ? "block" : "hidden"
                } border outline-none border-purple-500 rounded px-1 `}
              />
              <img
                src="https://img.icons8.com/?size=100&id=98955&format=png&color=000000"
                alt=""
                className="h-4"
                onClick={() => {
                  if (editPhone.phone.length <= 0) {
                    alert("Please Enter a phone");
                    return;
                  } else {
                    changePhone();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-start flex-col mt-4">
            <p>Role</p>
            <p className="text-purple-600">{userData?.role}</p>
          </div>
          <div className="flex items-start flex-col mt-4">
            <div className="flex items-center justify-between w-full">
              <p>Address</p>
              <img
                src={
                  address
                    ? "https://img.icons8.com/?size=100&id=46&format=png&color=000000"
                    : "https://img.icons8.com/?size=100&id=88584&format=png&color=000000"
                }
                alt=""
                className="h-4"
                onClick={() => {
                  setAddress(!address);
                }}
              />
            </div>
            <p className={`text-purple-600 ${address ? "hidden" : "block"} `}>
              {userData?.address}
            </p>
            <div
              className={`${
                address ? "block" : "hidden"
              } flex items-center justify-between w-full  `}
            >
              <input
                type="text"
                name="address"
                value={editAddress.address}
                onChange={handleAddress}
                className={`${
                  address ? "block" : "hidden"
                } border outline-none border-purple-500 rounded px-1 `}
              />
              <img
                src="https://img.icons8.com/?size=100&id=98955&format=png&color=000000"
                alt=""
                className="h-4"
                onClick={() => {
                  if (editAddress.address.length <= 0) {
                    alert("Please Enter a address");
                    return;
                  } else {
                    changeAddress();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-start  flex-col mt-4">
            <div>
              <p>Resume</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full ">
            {userData?.resume ? (
              <a
                href={userData?.resume}
                target="_blank"
                className="text-purple-500"
              >
                View your resume
              </a>
            ) : (
              <p className="text-purple-500">Upload your resume.</p>
            )}

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
                  onChange={changeResume}
                  accept=".pdf"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2">Saved Jobs</p>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {save &&
                save.map((job, i) => (
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
