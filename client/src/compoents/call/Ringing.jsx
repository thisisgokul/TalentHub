import React, { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import ringtone from "../../assets/audio/ringtone.mp3";

export const Ringing = ({ call, setCall,answerCall }) => {
  const { receivingCalls, callEnded,name,picture } = call;
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(0);

  let interval;
  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    setIsVisible(true);
    if (timer < 15) {
      handleTimer();
    } else {
      setCall({ ...call, receivingCalls: false });
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div
      className={`bg-green-600 text-white p-4 flex justify-center items-center shadow-4xl rounded-2xl w-10/12 sm:w-[300px] gap-4 sm:gap-3 fixed top-20 right-8 z-50 transition-transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex-shrink-0">
        <img
          className="w-16 h-16 rounded-2xl"
          src={picture}
          alt="call profilepicture"
        />
      </div>
      <div className="flex flex-col justify-center items-start flex-1">
        <h2 className="text-sm sm:text-lg font-montserrat font-semibold mb-2">
          {name}
        </h2>
        <div className="flex items-center gap-7">
          <div className="flex gap-3 justify-center items-center">
            <button onClick={answerCall} className="bg-gray-800 text-green-500 hover:text-green-600 hover:bg-black rounded-full p-2 transform hover:scale-105 transition-transform">
              <BiPhoneCall size={24} />
            </button>
            <button className="bg-gray-800 text-red-500 hover:text-red-600 hover:bg-black rounded-full p-2 transform hover:scale-105 transition-transform">
              Decline
            </button>
          </div>
        </div>
      </div>
      <audio src={ringtone} autoPlay loop></audio>
    </div>
  );
};
