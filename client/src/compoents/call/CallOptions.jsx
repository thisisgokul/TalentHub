import React from "react";
import { ImPhoneHangUp } from "react-icons/im";
import { BsCameraVideoOffFill,BsFillMicMuteFill } from "react-icons/bs";

export const CallOptions = () => {
  return (
    <div className=" bottom-0 w-full flex justify-center absolute mb-32">
      <ul className="flex items-center bg-slate-100 px-6 rounded-lg py-1 justify-between gap-10 text-3xl sm:gap-24">
        <li>
          <button>
            <BsCameraVideoOffFill className="bg-green-600 hover:scale-105 transition-transform rounded-xl px-2 py-2" size={46}/>
          </button>
        </li>
        <li>
          <button className="bg-blue-600 hover:scale-105 transition-transform rounded-xl px-2 py-2">
            <BsFillMicMuteFill className="text-white"  />
          </button>
        </li>
        <li>
          <button className="bg-red-600 hover:scale-105 transition-transform rounded-full px-2 py-2">
            <ImPhoneHangUp className="text-white"  />
          </button>
        </li>
      </ul>
    </div>
  );
};
