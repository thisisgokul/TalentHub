import React, { useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

export const CallSection = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 511886002;
    const serverSecret = "24fcff3bb7518446339c9a31ff8c9496";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "join user"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

   
     zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };


  

  return (
    <div className="pt-4">
      <div className="relative flex justify-center items-center">
        <div ref={myMeeting} className="h-screen w-screen relative"></div>
      </div>
    </div>
  );
};
