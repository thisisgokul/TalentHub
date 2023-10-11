import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

const JobListing = () => {
  return (
    <section className="mx-0 sm:mx-7 shadow-lg mt-4">
      <div className="bg-white rounded-lg p-6 border border-gray-200 my-4">
        <div>
          <div className="flex">
            <img
              src="https://www.upwork.com/profile-portraits/c1AYpSsLVJyOkmFdGm_1lPW2jFfUtOUP3Ul_kA7kjNfk-V8JUbugRIdaDUQdMbtCbU"
              className="w-20 rounded-full"
              alt="img"
            />
            <h1 className="mt-4 mx-4 text-xl sm:text-3xl font-montserrat font-medium">
              Web developer
            </h1>
          </div>
          <h2 className="text-sm sm:text-2xl my-3 font-palanquin font-bold ">
            name
          </h2>
          <p className="info-text font-normal">
            Identifying More Customise your web projects with an easy-to-use and
            responsive Tailwind CSS Tooltip! A Tooltip is a small pop-up element
            that appears while the user moves the mouse pointer over an element.
            Use it when you want to specify extra information about something
            when the user moves the mouse pointer over an element.
          </p>
          <div className="flex">
          <p className="flex sm:flex-1 my-2 text-2xl font-medium">
            Charge
            <AiFillDollarCircle className="mt-2 mx-1 text-2xl text-green-700" />
            2000
          </p>
          <button className="sm:flex hidden btnHover bg-secondary py-0 sm:py-3 px-2 rounded-xl text-white"><BsFillArrowRightSquareFill className="mt-1 mx-1"/>Hire ME</button>
          </div>
          <button className="sm:hidden flex btnHover bg-secondary py-2 sm:py-3 px-2 rounded-xl text-white"><BsFillArrowRightSquareFill className="mt-1 mx-1"/>Hire ME</button>
        
        </div>
      </div>
      
    </section>
  );
};

export default JobListing;
