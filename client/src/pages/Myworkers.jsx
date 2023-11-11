import React, { useEffect, useRef, useState } from "react";
import Navbar from "../compoents/Navbar";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Typewriter from "typewriter-effect";
import axios from "axios";
import Loader from "../compoents/Loader";
import { Call } from "../sections/Call";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import { RiRadioButtonLine } from "react-icons/ri";
import SocketContext from "../socket/SocketContext";
import Peer from "simple-peer";
import { useSelector } from "react-redux";


const callData = {
  socketId: "",
  receivingCalls: false,
  callEnded: false,
};

function Myworkers({ socket }) {
  const { currentUser } = useSelector((state) => state.user);
  const [myWorkers, setMyWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineWorkers, setOnlineWorkers] = useState([]);
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const { receivingCalls, callEnded, socketId } = call;

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef=useRef();

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
    socket.emit("join", currentUser._id);
    //get online users
    socket.on("get-online-users", (user) => {
      setOnlineWorkers(user);
    });
  }, [currentUser._id, socket]);

  // call
  useEffect(() => {
    setupMedia();
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
  }, [setCall]);

  // call user
  const callUser = (worker) => {
    enableMedia();
    setCall({
      ...call,
      name: worker.workername,
      picture: worker.workerphoto,
    });

    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: worker.initialId,
        signal: data,
        from: socketId,
        name: currentUser.name,
        picture: currentUser.profilepicture,
      });
    });

    peer.on("stream",(stream)=>{
      userVideo.current.srcObject=stream  
    });
    socket.on("call accepted",(signal)=>{
      setCallAccepted(true);
      peer.signal(signal);
    })
    connectionRef.current=peer;
  };
  // answer call function
  const answerCall=()=>{
    enableMedia()
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream: stream,
    });
    peer.on("signal",(data)=>{
      console.log(data);
      socket.emit("answer call",{signal:data, to:call.socketId})
    });
    peer.on("stream",(stream)=>{userVideo.current.srcObject=stream});
    peer.signal(call.signal);
    connectionRef.current = peer;
  }

  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
  };

  const joinConversation = (worker) => {
    socket.emit("join conversation", worker.initialId);

    callUser(worker);
  };

  return (
    <div className="h-screen bg-slate-800 ">
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

      {loading ? (
        <div className="flex items-center text-white justify-center mt-24">
          <Loader size={33} />
          please wait..
        </div>
      ) : (
        <div className="padding-x my-10 flex flex-wrap gap-4 justify-center">
          {myWorkers.map((workers, index) => {
            const isOnline = onlineWorkers.some(
              (worker) => worker.userId === workers.initialId
            );

            return (
              <div
                key={index}
                className="bg-gray-100 p-4 flex justify-center items-center shadow-2xl rounded-2xl w-full sm:w-[600px] gap-4 sm:gap-10"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 sm:w-24 sm:h-24 rounded-2xl"
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
                    <button
                      onClick={() => joinConversation(workers)}
                      className="bg-blue-200 text-green-600 hover:text-white hover:bg-blue-600 rounded-full p-2 transform hover:scale-105 transition-transform"
                    >
                      <div className="sm:text-3xl text-lg">
                        <BsFillCameraVideoFill />
                      </div>
                    </button>
                  </div>
                </div>
                {isOnline ? (
                  <div className="flex gap-3">
                    <h1 className="mt-2 font-bold sm:text-base text-xs">
                      Online
                    </h1>
                    <RiRadioButtonLine className="mt-2 bg-black py-1 px-1 text-green-500 text-lg sm:text-3xl rounded-full hidden sm:inline-block" />
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <h1 className="mt-2 font-bold sm:text-base text-xs">
                      Offline
                    </h1>
                    <HiStatusOffline className="mt-2 bg-black py-1 px-1 text-red-500 text-3xl rounded-full hidden sm:inline-block" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
        />
      </div>
    </div>
  );
}

const MyworkersSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <Myworkers {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default MyworkersSocket;
