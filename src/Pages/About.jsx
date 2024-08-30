import React from "react";

const About = () => {
  return (
    <div className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-black tracking-wide uppercase">
            About Us
          </h2>
          <p className="mt-1 text-3xl font-extrabold text-purple-600 sm:text-4xl">
            Connecting Talent with Opportunity
          </p>
          <p className="max-w-xl mt-5 mx-auto text-lg text-black">
            At JobConnect, we are committed to bridging the gap between job
            seekers and employers. Our mission is to provide a platform where
            talent meets opportunity, empowering individuals to find their dream
            jobs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              className="mx-auto h-24 w-24 "
              src="https://img.icons8.com/?size=100&id=23264&format=png&color=000000"
              alt="Team member"
            />
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              Aman Kumar
            </h3>
            <p className="mt-2 text-base text-gray-500">Founder & CEO</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              className="mx-auto h-24 w-24 "
              src="https://img.icons8.com/?size=100&id=23264&format=png&color=000000"
              alt="Team member"
            />
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              Jane Smith
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Chief Operations Officer
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              className="mx-auto h-24 w-24 "
              src="https://img.icons8.com/?size=100&id=23264&format=png&color=000000"
              alt="Team member"
            />
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              Sarah Johnson
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Head of Talent Acquisition
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-black">
            Our dedicated team at JobConnect is passionate about helping you
            achieve your career goals. We believe in creating a community where
            job seekers and employers can connect and thrive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
