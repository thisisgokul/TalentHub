import React from "react";
import topImg from "../assets/topImg.png";
import bottomImg from "../assets/bottomImg.png";
import { tutorial, socialMedia } from "../constants/index";

const Features = () => {
  return (
    <section>
      <img src={topImg} alt="img" />
      <div className="padding bg-secondary">
        <h1 className="text-primary text-4xl mb-16 font-medium text-center">
          Explore trainings, tutorials, and features
        </h1>
        <div className="flex justify-between mt-7">
          {tutorial.map((tutorial) => (
            <div key={tutorial.title}>
              <div className="flex flex-col justify-center items-center text-primary ">
                {tutorial.logo}{" "}
              </div>
              <h2 className="text-primary text-lg mt-3 sm:text-2xl text-center">
                {tutorial.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <img src={bottomImg} alt="" />
      <div className="my-10 padding-x flex">
        <h2 className="text-lg font-montserrat font-medium">
          Follow WorkFusion
        </h2>
        {socialMedia.map((media, index) => (
          <div className="px-4 mt-1 text-xl" key={index}>
            {media.icon}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
