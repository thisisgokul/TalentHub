import React from "react";

export const Sampleform = () => {
  return (
    <>
      <div className="mx-4 sm:mx-9">
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
                id="name"
                name="name"
                type="text"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="my-4">
            <label className="block text-md font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="my-1">
            <label className="block text-md font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-secondary hover:bg-blue-700 text-white font-montserrat sm:text-lg my-7 py-1.5 px-5 sm:py-2 sm:px-8 rounded-full transition duration-300 ease-in-out">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
