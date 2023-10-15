import React from "react";
import axios from "axios";
import {
  updateUserFail,
  updateUserStart,
  updateUsersuccess,
} from "../redux/userSlice";
import { useDispatch } from "react-redux";

export const Profileform = ({
  currentUser,
  setFormdata,
  formData,
  loading,
}) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const { data } = await axios.put(`/update/${currentUser._id}`, formData);
      dispatch(updateUsersuccess(data));
    } catch (error) {
      dispatch(updateUserFail(error));
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <div className="mx-4 sm:mx-9 my-8">
        <h1 className="font-palanquin text-coral-blue font-medium text-3xl">
          Edit your personal profile settings
        </h1>
        <form action="">
          <div className="my-4">
            <label className="block text-md font-medium leading-6 text-gray-900">
              Full name
            </label>
            <div className="mt-2">
              <input
                placeholder="full name"
                defaultValue={currentUser.name}
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-md px-2 h-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="my-4">
            <label className="block text-md font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                defaultValue={currentUser.email}
                placeholder="email"
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md px-2 h-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="my-1">
            <label className="block text-md font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                placeholder="password"
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md px-2 h-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:flex gap-3">
            <div className="my-1 flex-grow">
              <label className="block text-md font-medium leading-6 text-gray-900">
                category
              </label>
              <div className="mt-2">
                <input
                  placeholder="enter your job category"
                  id="category"
                  name="category"
                  type="text"
                  onChange={handleChange}
                  defaultValue={currentUser.category}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md px-2 h-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="my-1 flex-grow">
              <label className="block text-md font-medium leading-6 text-gray-900">
                Enter your service charge
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="please give your service charge in rupees"
                  id="serviceCharge"
                  onChange={handleChange}
                  defaultValue={currentUser.serviceCharge}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md px-2 h-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="my-1">
            <label className="block text-md font-medium leading-6 text-gray-900">
              Enter description about your job
            </label>
            <div className="mt-2">
              <textarea
                placeholder="please give a job description"
                id="description"
                onChange={handleChange}
                defaultValue={currentUser.description}
                className="block w-full h-36 rounded-md border-0 py-1.5 text-gray-900 shadow-md px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleUpdate}
              className="bg-secondary hover:bg-blue-700 text-white font-montserrat sm:text-lg my-7 py-1.5 px-5 sm:py-2 sm:px-8 rounded-full transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "updating..." : "update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
