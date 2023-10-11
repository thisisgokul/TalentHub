import React from "react";
import logo2 from "../assets/logo2.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className=" p-1">
      <div className="padding-r sm:padding-x flex justify-between items-center">
        <a href="/">
          <img src={logo2} alt="logo" />
        </a>
        <span className="sm:hidden">
          <Link to={"/signup"}>
            <button className="border-coral-blue text-secondary border-2 px-4 py-2 rounded-xl">
              Sign Up
            </button>
          </Link>
        </span>
        <span className="hidden sm:inline-block text-secondary ">
          Join TalentHub
          <Link to={"/signup"}>
          <button className="border-coral-blue text-secondary  hover:border-gray-300 border-2 px-2 py-1 rounded-md mx-2">
            Sign Up
          </button>
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Nav;
