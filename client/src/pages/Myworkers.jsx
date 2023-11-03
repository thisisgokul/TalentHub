import React, { useEffect, useState } from "react";
import Navbar from "../compoents/Navbar";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Typewriter from "typewriter-effect";
import axios from "axios";
import Loader from "../compoents/Loader";
import { Call } from "../compoents/call/Call";
import SocketContext from "../socket/SocketContext";
import {useSelector} from 'react-redux'

function Myworkers ({socket}){

  const {currentUser}=useSelector((state)=>state.user)
  const [myWorkers, setMyWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      axios.get("/allworkdersdata").then(({ data }) => {
        setMyWorkers(data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);


// join worker to socket io
useEffect(() => {
    socket.emit('join', currentUser._id);
}, [currentUser._id, socket]); 

const joinConversation=(worker)=>{

  socket.emit("join conversation",worker.initialId) 
  
}

  return (
    <div className="h-screen bg-slate-800">
      <Navbar />
      <h2 className="mx-10 mt-4 text-lg font-medium font-montserrat text-white">
        Connect Experts in Dev, AI, Design, Sales, Marketing, Admin & Support on
        Our Portal!
      </h2>
      <div className="mx-10 mt-6 text-white font-palanquin font-bold text-2xl sm:text-3xl">
        <Typewriter
          options={{
            strings: ["Workers You Can Call"],
            autoStart: true,
            loop: true,
            delay: 90,
          }}
        />
      </div>

      {loading?(
         <div className="flex items-center text-white justify-center mt-24">
         <Loader size={33} />
         please wait..
       </div>
      ):(<div className="padding-x my-10 flex flex-wrap gap-4 justify-center">
      {myWorkers.map((workers, index) => (
        <div key={index} className="bg-gray-100 p-4 flex justify-center items-center shadow-2xl rounded-2xl w-full sm:w-[600px] gap-4 sm:gap-10">
          <div className="flex-shrink-0">
            <img
              className="w-24 h-24 rounded-2xl" 
              src={workers.workerphoto}
              alt="img"
            />
          </div>
          <div className="flex flex-col justify-center items-start flex-1">
            <h2 className="text-xl sm:text-2xl font-montserrat font-medium mb-2">
              {workers.workername}
            </h2>
            <div className="flex items-center gap-7">
              <p className="text-lg sm:text-xl font-normal">
                {workers.wokercategory}
              </p>
              <button onClick={() => joinConversation(workers)} className="bg-blue-200 text-green-600 hover:text-white hover:bg-blue-600 rounded-full p-2 transform hover:scale-105 transition-transform">
                <BsFillCameraVideoFill size={33} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>)}
    <Call/>
    </div>
  );
};


const MyworkersSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <Myworkers {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
}

export default MyworkersSocket;
