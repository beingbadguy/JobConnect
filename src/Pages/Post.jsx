import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../config/firebase"; // Adjust the import based on your config
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { VscGear } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FirebaseContext } from "../context/FirebaseContext";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineStar } from "react-icons/md";

const Post = () => {
  const [form, setForm] = useState({
    title: "",
    workPreference: "",
    type: "",
    companyLogo: null, // Change this to null initially
    salary: "",
    companyName: "",
    description: "",
    responsibilities: "",
    education: "",
    vacancy: "",
    skills: "",
    location: "",
    experience: "",
    contact: "",
    datePosted: new Date(),
    hireEmail: "",
  });

  const formHandle = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] }); // Save the file object
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // console.log(form.companyLogo.name);
  // console.table(form);
  const [logo, setLogo] = useState();
  const fileChange = (e) => {
    const { files } = e.target;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setLogo(file);
    }
  };
  console.log(typeof logo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.title === "") {
      alert("Title is required");
      return;
    }
    if (form.workPreference === "") {
      alert("workPreference is required");
      return;
    }
    if (form.type === "") {
      alert("type is required");
      return;
    }
    if (form.companyLogo === "") {
      alert("companyLogo is required");
      return;
    }
    if (form.salary === "") {
      alert("salary is required");
      return;
    }
    if (form.companyName === "") {
      alert("companyName is required");
      return;
    }
    if (form.description === "" || form.description.length < 30) {
      alert("description is required and it must be at least 30 characters");
      return;
    }
    if (form.responsibilities === "" || form.responsibilities.length < 30) {
      alert(
        "responsibilities is required and it must be at least 30 characters"
      );
      return;
    }
    if (form.education === "" || form.education.length < 30) {
      alert("education is required and it must be at least 30 characters");
      return;
    }
    if (form.vacancy === "") {
      alert("vacancy is required");
      return;
    }
    if (form.location === "") {
      alert("location is required");
      return;
    }
    if (form.hireEmail === "") {
      alert("Email is required");
      return;
    }

    try {
      let downloadURL = "";

      if (form.companyLogo) {
        const fileRef = ref(storage, `companyLogo/${form.companyLogo.name}`);
        await uploadBytes(fileRef, form.companyLogo);
        downloadURL = await getDownloadURL(fileRef);
      }

      const jobRef = collection(db, "jobs");
      await addDoc(jobRef, {
        ...form,
        companyLogo: downloadURL,
      });
      alert("Job Posted Successfully");

      // Reset form after successful submission
      setForm({
        title: "",
        workPreference: "",
        type: "",
        companyLogo: null,
        salary: "",
        companyName: "",
        description: "",
        responsibilities: "",
        requirement: "",
        education: "",
        vacancy: "",
        skills: "",
        location: "",
        experience: "",
        contact: "",
        datePosted: new Date(),
        hireEmail: "",
      });
      setLogo(null);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };
  useEffect(() => {}, [setLogo, logo]);

  return (
    <div className="flex justify-between px-4 md:p-4 items-start flex-col md:flex-row ">
      <div className="md:m-4  w-[100%] md:w-[50%] ">
        <h1 className="font-bold">Preview</h1>
        <div className=" mt-4 flex flex-col   border p-2 rounded shadow-md">
          <div className="flex items-center justify-between gap-5">
            <div className="flex gap-4">
              {logo && logo.name && (
                <div className="border">
                  <img
                    src={URL.createObjectURL(logo)}
                    alt={logo.name}
                    className="h-12 w-12 object-contain"
                  />
                </div>
              )}
              <div>
                <div className="font-bold">{form.title}</div>
                {form.companyName.length > 1 ? (
                  <div className="flex items-center gap-1">
                    {form.companyName}.{" "}
                    <span>
                      {form.companyName.length > 4 ? (
                        <img
                          src="https://img.icons8.com/?size=100&id=59733&format=png&color=000000"
                          alt=""
                          className="h-4"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center gap-1">
              <MdOutlineCurrencyRupee
                className={`${form.salary.length > 0 ? "block" : "hidden"}`}
              />
              <p className={`${form.salary.length > 0 ? "block" : "hidden"}`}>
                {form.salary + "L"}
              </p>
            </div>
            <div className="flex items-center gap-1 my-1">
              <IoLocation
                className={`${form.location.length > 0 ? "block" : "hidden"}`}
              />{" "}
              {form.location}
            </div>
          </div>

          <div>{form.description + "..."} </div>
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
        </div>
      </div>

      {/* right  */}
      <div className=" md:m-4 mt-4 md:w-[60%] mb-10">
        <form>
          <p className="font-bold">Basic Information</p>
          <hr className="mt-2" />
          <div className="flex justify-between items-center gap-2 md:gap-10">
            <div className="flex flex-col mt-2 w-[50%]">
              <label className="font-bold">Job Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={formHandle}
                className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2"
              />
            </div>
            <div className="flex flex-col mt-2 w-[50%]">
              <label className="font-bold">Work Preference</label>
              <select
                name="workPreference"
                value={form.workPreference}
                onChange={formHandle}
                className="p-2 outline-none border cursor-pointer bg-gray-100 rounded my-2"
              >
                <option>Select</option>

                <option value="Remote">Remote</option>
                <option value="On Site">On Site</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <div className="flex flex-col mt-2 w-[50%]">
              <label className="font-bold">Employment Type</label>
              <select
                name="type"
                value={form.type}
                onChange={formHandle}
                className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2 cursor-pointer"
              >
                <option>Select</option>

                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div className="flex flex-col mt-2 w-[47%]  ">
              <label className="font-bold">Company Logo</label>
              <div className="flex gap-5">
                <div className=" border-2 border-dotted border-black rounded relative my-2 cursor-pointer">
                  <IoCloudUploadOutline className="absolute left-[50%] top-[25%]" />
                  <input
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    name="companyLogo"
                    onChange={(e) => {
                      formHandle(e);
                      fileChange(e);
                    }}
                    className=" outline-none border bg-gray-100 w-[100%] opacity-0 placeholder:text-black rounded cursor-pointer  "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <div className="flex flex-col mt-2 w-[48%]">
              <label className="font-bold">Salary</label>
              <div className="flex items-center justify-between relative">
                <input
                  type="number"
                  name="salary"
                  value={form.salary}
                  onChange={formHandle}
                  className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2 w-[100%]"
                />
                <p className="absolute right-0 bg-black text-white px-2 p-2 rounded-r-sm">
                  Lakhs
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-2 w-[50%]">
              <label className="font-bold">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={formHandle}
                className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2"
              />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold">Job Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={formHandle}
              className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2 h-36"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold">Job Responsibilities</label>
            <textarea
              name="responsibilities"
              value={form.responsibilities}
              onChange={formHandle}
              className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2 h-36"
            />
          </div>
          {/* <div className="flex flex-col mt-2">
            <label className="font-bold">Requirements</label>
            <textarea
              name="requirement"
              value={form.requirement}
              onChange={formHandle}
              className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2 h-20"
            />
          </div> */}
          <div className="flex flex-col mt-2">
            <label className="font-bold">Qualification</label>
            <textarea
              name="education"
              value={form.education}
              onChange={formHandle}
              className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2 h-36"
            />
          </div>
          <div className="flex justify-between items-center gap-10">
            <div className="flex flex-col mt-2 w-[50%]">
              <label className="font-bold">Experience</label>
              <select
                name="experience"
                value={form.experience}
                onChange={formHandle}
                className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2"
              >
                <option>Select</option>

                <option value="Fresher">Fresher</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="flex flex-col mt-2 w-[48%]">
              <label className="font-bold">Vacancy</label>
              <div className="flex items-center justify-between relative">
                <input
                  type="number"
                  name="vacancy"
                  value={form.vacancy}
                  onChange={formHandle}
                  className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2 w-[100%]"
                />
                <p className="absolute right-0 bg-black text-white px-2 p-2 rounded-r-sm">
                  Posts
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold">Skills (separated by comma)</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={formHandle}
              className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={formHandle}
              className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold">Contact Information</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={formHandle}
              className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold">Hire Email</label>
            <input
              type="email"
              name="hireEmail"
              value={form.hireEmail}
              onChange={formHandle}
              className="p-2 outline-none border bg-gray-100 placeholder:text-black rounded my-2"
            />
          </div>

          <p
            className="text-center bg-black p-2 mt-4 text-white rounded cursor-pointer"
            onClick={handleSubmit}
          >
            Post!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Post;
