import React, { useState } from 'react'
import { Ringing } from '../compoents/call/Ringing';
import { AiFillLock } from "react-icons/ai"
import { CallOptions } from '../compoents/call/CallOptions';

export const Call = ({ call, setCall, callAccepted,userVideo,myVideo,stream ,answerCall}) => {
  const { receivingCalls, callEnded } = call
  const [showActions,setShowActions]=useState(false)

  return (
    <div onMouseEnter={()=>setShowActions(true)} onMouseLeave={()=>setShowActions(false)}
    className={`text-white  bg-[#060017]  min-h-screen w-full  top-20 z-50 flex flex-col
   `}>
      <div className='px-6 mt-3 flex items-center gap-3'>
        <AiFillLock size={33}/>
        <h2 className='text-lg'>End-to-end-encryption</h2>
      </div>

      <div className="flex-grow flex justify-center items-center ">
        {showActions && <CallOptions />}
      </div>
      <div className='min-h-screen ' >
        {/*user video*/}
        <div className=' flex justify-center '>
        <video ref={userVideo} playsInline autoPlay muted className=' mt-0 h-[550px] w-full '></video>

        </div>
        <div>
          <video ref={myVideo} playsInline autoPlay muted className='mx-5  top-[450px] z-40 h-32 w-64 bg-slate-600'></video>
        </div>
      </div>

      {receivingCalls && !callAccepted && (
        <Ringing call={call} setCall={setCall} answerCall={answerCall}/>
      )}
    </div>
    
  )
}
