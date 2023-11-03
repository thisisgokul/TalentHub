import React, { useState, useEffect } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import axios from "axios";
import Loader from "../compoents/Loader";
import { Link } from "react-router-dom";

const JobListing = ({ searchAndSelect }) => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      axios.get("/alldata").then(({ data }) => {
        setAllData(data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const search = (searchAndSelect.search || "").toLowerCase();
  const select = (searchAndSelect.select || "").toLowerCase();

  const searchTerm = search || select;
  const filteredData = allData.filter(
    (data) =>
      data.description && data.category.toLowerCase().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="mx-0 sm:mx-7 shadow-lg mt-4 bg-slate-100">
      {loading && (
        <div className="flex items-center justify-center mt-24">
          <Loader size={33} />
          please wait..
        </div>
      )}
      {currentItems.length === 0 && !loading ? (
        <div className="text-center text-xl mt-6 text-red-500">
          No results found
        </div>
      ) : (
        currentItems.map((data, index) => (
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
              <h2 className="text-lg sm:text-2xl my-3 font-palanquin font-bold ">
                {data.name}
              </h2>
              <p className="text-md text-gray-500 my-4 font-normal">
                {data.description &&
                  data.description.split(" ").slice(0, 32).join(" ")}
                {data.description &&
                  data.description.split(" ").length > 30 && (
                    <Link to={"/singleprofilepage/" + data._id}>
                      <span className="text-blue-500"> Explor more...</span>
                    </Link>
                  )}
              </p>

              <div className="flex">
                <p className="flex sm:flex-1 my-2 text-xl font-medium">
                  Charge
                  <BsCurrencyRupee className="mt-2 mx-1 text-xl text-green-700" />
                  {data.serviceCharge}
                </p>
                <Link to={"/singleprofilepage/" + data._id}>
                  <button className="sm:flex hidden btnHover bg-secondary py-3  px-2 rounded-xl text-white text-sm">
                    <BsFillArrowRightSquareFill className="mt-1 mx-1" />
                    Hire ME
                  </button>
                </Link>
              </div>
              <Link to={"/singleprofilepage/" + data._id}>
                <button className="sm:hidden flex btnHover bg-secondary py-2 px-2 rounded-xl text-white">
                  <BsFillArrowRightSquareFill className="mt-1 mx-1" />
                  Hire ME
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
      {!loading && (
        <div className="flex items-center justify-center gap-4 py-3">
          <button
            className="px-3 py-1 bg-gray-700 text-white text-md rounded-lg "
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Back
          </button>
          <button
            className="px-3 py-1 bg-red-700 text-white text-md rounded-lg "
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredData.length / itemsPerPage)
            }
          >
            Next &gt;
          </button>
        </div>
      )}
    </section>
  );
};

export default JobListing;
