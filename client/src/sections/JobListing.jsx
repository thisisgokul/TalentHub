import React, { useState, useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import axios from "axios";

const JobListing = ({ searchAndSelect }) => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get("/alldata").then(({ data }) => {
      setAllData(data);
    });
  }, []);

  const search = (searchAndSelect.search || "").toLowerCase();
  const select = (searchAndSelect.select || "").toLowerCase();

  const searchTerm = search || select;
  const filteredData = allData.filter(
    (data) =>
      data.description && data.category.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="mx-0 sm:mx-7 shadow-lg mt-4">
      {filteredData.length === 0 ? (
        <div className="text-center text-xl mt-6 text-red-500">
          No results found
        </div>
      ) : (
        filteredData.map((data, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 border border-gray-200 my-4"
          >
            <div>
              <div className="flex">
                <img
                  src={data.profilepicture}
                  className="w-16 h-16 rounded-full"
                  alt="img"
                />
                <h1 className="mt-4 mx-4 text-xl sm:text-2xl font-montserrat font-medium uppercase">
                  {data.category}
                </h1>
              </div>
              <h2 className="text-sm sm:text-2xl my-3 font-palanquin font-bold ">
                {data.name}
              </h2>
              <p className="info-text font-normal text-sm sm:text-md">
                {data.description &&
                  data.description.split(" ").slice(0, 30).join(" ")}
                {data.description &&
                  data.description.split(" ").length > 30 && (
                    <span className="text-blue-500"> Read more...</span>
                  )}
              </p>

              <div className="flex">
                <p className="flex sm:flex-1 my-2 text-xl font-medium">
                  Charge
                  <AiFillDollarCircle className="mt-2 mx-1 text-xl text-green-700" />
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
        ))
      )}
    </section>
  );
};

export default JobListing;
