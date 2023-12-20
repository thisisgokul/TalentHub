import React from "react";
import bg from "../assets/bg.webp";
import bg2 from "../assets/bg2.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section>
      <div className="w-full h-auto flex justify-center bg-secondary p-4">
        <h3 className="text-sm sm:text-xl mx-2 text-primary">
          TALENTHUB is now faster and simpler than ever.
        </h3>
        <p className="text-sm sm:text-xl text-primary">
          Discover what’s possible
        </p>
      </div>
      <div className="relative">
        <div className="flex">
          <img src={bg} alt="bg" className="w-full hidden sm:block" />
          <div className="absolute inset-0 flex items-center justify-center text-center flex-col">
            <h1 className=" text-5xl text-primary font-semibold hidden sm:block">
              Welcome to TalentHub
            </h1>
            <p className="text-10sm font-montserrat text-primary mt-5 hidden sm:block">
              Sign in now to chat, meet, call, and collaborate all in one place.
            </p>
            <div className="mt-6 hidden sm:block">
            <Link to={"/signin"}>
              <button className="mx-2 bg-white px-8 text-secondary font-medium py-1 border-2 hover:border-coral-blue">
                Sign In
              </button>
              </Link>  
              <Link to={"/signup"}>
                <button className="py-1 px-8 border-2 text-primary font-medium hover:bg-coral-blue">
                  sign up
                </button>
              </Link>
            </div>
            <div className="my-20">
              <h1 className="lg:text-5xl text-3xl mt-72 font-semibold sm:hidden">
                Welcome to TalentHub
              </h1>
              <p className="text-10sm font-montserrat text-black mt-5 sm:hidden mx-3">
                Sign in now to connect, meet, chat, and collaborate all in one
                place.
              </p>
              <div className="mt-6 sm:hidden">
              <Link to={"/signin"}>
                <button className="mx-2 bg-white px-12 text-secondary font-medium py-1 border-2 border-coral-blue">
                  Sign In
                </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="py-1 px-12 border-2 bg-secondary text-primary font-medium">
                    sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <img src={bg2} alt="SmallImage" className="w-full sm:hidden" />
      </div>
    </section>
  );
};

export default Hero;
