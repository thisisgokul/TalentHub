import React, { useEffect } from "react";
import Navbar from "../compoents/Navbar";
import Indexprofile from "../sections/Indexprofile";
import SearchAndSelect from "../compoents/SearchAndSelect";
import { redirector } from "../constants";
import JobListing from "../sections/JobListing";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
   redirector(currentUser,navigate)
  }, [currentUser, navigate]);

  return (
    <>
      {currentUser && (
        <>
         
          <Navbar />
          <h2 className="mx-10 mt-4 text-lg font-montserrat">
            Connect Experts in Dev, AI, Design, Sales, Marketing, Admin &
            Support on Our Portal!
          </h2>
          <h2 className="text-3xl  mt-6 mx-10 font-palanquin font-bold">
            Find Top workers
          </h2>

          <section className="px-3 sm:padding-x ">
            <SearchAndSelect />
          </section>
          <div className="flex padding-x">
            <section className="hidden sm:flex h-2/3">
              <Indexprofile />
            </section>

            <section className="w-full sm:w-2/3 border-2 border-gray-200 rounded-xl">
              <JobListing />
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default IndexPage;
