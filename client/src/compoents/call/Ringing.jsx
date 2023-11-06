import React, { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import ringtone from "../../assets/audio/ringtone.mp3";

export const Ringing = ({ call, setCall }) => {
  const { receivingCalls, callEnded } = call;
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
          src="data:image/jpeg;base64,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"
          alt="workerimage"
        />
      </div>
      <div className="flex flex-col justify-center items-start flex-1">
        <h2 className="text-sm sm:text-lg font-montserrat font-semibold mb-2">
          sam calling...
        </h2>
        <div className="flex items-center gap-7">
          <div className="flex gap-3 justify-center items-center">
            <button className="bg-gray-800 text-green-500 hover:text-green-600 hover:bg-black rounded-full p-2 transform hover:scale-105 transition-transform">
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
