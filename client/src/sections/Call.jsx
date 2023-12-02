import React from 'react'
import { Ringing } from '../compoents/call/Ringing';


export const Call = ({ call, setCall, callAccepted ,answerCall}) => {
  const { receivingCalls } = call
  

  return (
    <div>
     
      {receivingCalls && !callAccepted && (
        <Ringing call={call} setCall={setCall} answerCall={answerCall} />
      )}
      
    </div>
    
  )
}
