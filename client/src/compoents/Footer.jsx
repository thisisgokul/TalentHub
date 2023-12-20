import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 rounded-sm shadow mt-4 md:mt-14 p-2 md:p-4 lg:p-6">
  <div className="w-full mx-auto max-w-screen-xl flex flex-col items-center md:flex-row md:items-center md:justify-between">
    <span className="text-base md:text-lg  dark:text-gray-400 mb-2 md:mb-0 flex items-center justify-center md:justify-start">
      © 2024 <Link to="/" className="hover:underline font-bold ml-2">TalentHub</Link>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-2 md:mt-0 text-base font-medium text-gray-300">
      <li className="mr-2 md:mr-4">
        <Link to="/" className="hover:underline">Home</Link>
      </li>
      <li className="mr-2 md:mr-4">
        <Link to="/myworkers" className="hover:underline">My Workers</Link>
      </li>
      <li className="mr-2 md:mr-4">
        <Link to="/profile" className="hover:underline">Profile</Link>
      </li>
    </ul>
  </div>
</footer>

  
  );
};

export default Footer;
