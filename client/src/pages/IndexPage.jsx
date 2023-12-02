import React, { useEffect, useState } from "react";
import Navbar from "../compoents/Navbar";
import Indexprofile from "../sections/Indexprofile";
import SearchAndSelect from "../compoents/SearchAndSelect";
import { redirector } from "../constants";
import JobListing from "../sections/JobListing";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SocketContext from "../socket/SocketContext";
import { Call } from "../sections/Call";
import Footer from "../compoents/Footer";


const callData = {
  socketId: "",
  receivingCalls: false,
  callEnded: false,
};

const IndexPage = ({ socket }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchAndSelect, setSearchAndSelect] = useState({});
  const [call, setCall] = useState(callData);
  const [callAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    redirector(currentUser, navigate);
  }, [currentUser, navigate]);

  useEffect(() => {
   
    if (currentUser) {
      socket.emit("join", currentUser._id);

      return () => {
        socket.emit("leave", currentUser._id);
      };
    }
  }, [currentUser, socket]);

  
    useEffect(() => {   
      socket.on("get-socketid", (id) => {
        setCall({ ...call, socketId: id });
      });
      socket.on("call user", (data) => {
        setCall({
          ...call,
          socketId: data.from,
          name: data.name,
          picture: data.picture,
          signal: data.signal,
          receivingCalls: true,
        });
      });
    }, [setCall,call,socket]);

     // answer call function
  const answerCall=()=>{
    window.location.href = `/myroom/${currentUser._id}`;
  };
  
  return (
    <>
       {currentUser ? (
      <>
        <div className="fixed top-0 w-full z-50">
          <Navbar />
        </div>
        <div>
          <Call
            call={call}
            setCall={setCall}
            callAccepted={callAccepted}
            answerCall={answerCall}
          />
        </div>
        <h2 className="mx-10 mt-24 text-lg font-montserrat">
          Connect Experts in Dev, AI, Design, Sales, Marketing, Admin &
          Support on Our Portal!
        </h2>
        <h2 className="text-3xl  mt-6 mx-10 font-palanquin font-bold">
          Find Top workers
        </h2>

        <section className="px-3 sm:padding-x ">
          <SearchAndSelect
            searchAndSelect={searchAndSelect}
            setSearchAndSelect={setSearchAndSelect}
          />
        </section>
        <div className="flex padding-x">
          <section className="hidden sm:flex h-2/3">
            <Indexprofile />
          </section>

          <section className="w-full sm:w-2/3 border-2 border-gray-200 rounded-xl bg-slate-100">
            <JobListing searchAndSelect={searchAndSelect} />
          </section>
        </div>
        <Footer/>
      </>
    ) : null}
    </>
  );
};

const IndexPageSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <IndexPage {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default IndexPageSocket;
