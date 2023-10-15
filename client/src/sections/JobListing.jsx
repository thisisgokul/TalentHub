import React, { useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import axios from "axios";
import { useEffect } from "react";

const JobListing = () => {
  const [allData, setAlldata] = useState([]);
 
  useEffect(() => {
    axios.get("/alldata").then(({ data }) => {
      setAlldata(data);
    });
  }, []);

  return (
    <section className="mx-0 sm:mx-7 shadow-lg mt-4">
      {allData.map((data, index) => {
       
        if (data.description && data.serviceCharge) {
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200 my-4"
            >
              <div>
                <div className="flex">
                  <img
                    src={data.profilepicture}
                    className="w-20 rounded-full"
                    alt="img"
                  />
                  <h1 className="mt-4 mx-4 text-xl sm:text-3xl font-montserrat font-medium">
                    {data.category}
                  </h1>
                </div>
                <h2 className="text-sm sm:text-2xl my-3 font-palanquin font-bold ">
                  {data.name}
                </h2>
                <p className="info-text font-normal">
                  {data.description.length <= 30
                    ? data.description
                    : `${data.description.slice(0, 300)}...`}
                  {data.description.length > 30 && (
                    <span className="text-blue-500 cursor-pointer ml-2">
                      Read More
                    </span>
                  )}
                </p>
                <div className="flex">
                  <p className="flex sm:flex-1 my-2 text-2xl font-medium">
                    Charge
                    <AiFillDollarCircle className="mt-2 mx-1 text-2xl text-green-700" />
                    {data.serviceCharge}
                  </p>
                  <button className="sm:flex hidden btnHover bg-secondary py-0 sm:py-3 px-2 rounded-xl text-white">
                    <BsFillArrowRightSquareFill className="mt-1 mx-1" />
                    Hire ME
                  </button>
                </div>
                <button className="sm:hidden flex btnHover bg-secondary py-2 sm:py-3 px-2 rounded-xl text-white">
                  <BsFillArrowRightSquareFill className="mt-1 mx-1" />
                  Hire ME
                </button>
              </div>
            </div>
          );
        } else {
          return null; 
        }
      })}
    </section>
  );
};

export default JobListing;
