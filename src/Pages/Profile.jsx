import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout, user, userData } = useContext(FirebaseContext);
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
  useEffect(() => {}, [changeProfile]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

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
        <div className="flex items-start flex-col mt-4">
          <p>Name</p>
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
          <p>Role</p>
          <p className="text-purple-600">{userData?.role}</p>
        </div>
        <div className="flex items-start flex-col mt-4">
          <p>Address</p>
          <p className="text-purple-600">{userData?.address}</p>
        </div>
        <div className="flex items-start  flex-col mt-4">
          <div>
            <p>Resume</p>
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
      </div>
    </div>
  );
};

export default Profile;
