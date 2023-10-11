import React from "react";
import Navbar from "../compoents/Navbar";
import { Sampleform } from "../compoents/Sampleform";
import { AiFillEdit } from "react-icons/ai";

const ProfilePage = () => {
  return (
    <section className="bg-slate-50">
      <Navbar />
      <div className=" shadow-xl bg-white rounded-xl my-16 sm:my-20 mx-10 ">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 p-4 relative">
            <div className=" p-4 py-4 sm:py-20 flex flex-col items-center justify-center">
              <h2 className="text-2xl text-coral-gray font-medium">
                Your Profile
              </h2>
              <div className="relative w-24 h-24 mt-4">
                <label
                  htmlFor="fileInput"
                  className="absolute bottom-0 right-0 px-7 w-24 h-24 rounded-full flex items-end justify-center text-white py-1 pt-4 cursor-pointer bg-black bg-opacity-0 transition-opacity duration-300 hover:bg-opacity-40"
                >
                  <AiFillEdit size={24} />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
                <img
                  className="w-full h-full rounded-full"
                  src="https://images.unsplash.com/photo-1599834562135-b6fc90e642ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                  alt="img"
                />
              </div>

              <h3 className="text-xl font-bold mt-2">Gokul Subhash</h3>
              <div className="mt-3 flex flex-col">
                <button className="bg-green-600 border-2 px-8 py-1 text-white rounded-full transform hover:scale-105 transition-transform">
                  Logout
                </button>
                <button className="bg-red-700 px-7 py-1 mt-2 text-white rounded-full transform hover:scale-105 transition-transform">
                  Deactivate
                </button>
              </div>
            </div>

            <div className="hidden md:block absolute h-2/3 mt-12 bg-gray-300 w-0.5  right-0 top-0"></div>
          </div>

          <div className="w-full px-3 ">
            <div className="">
              <Sampleform />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
