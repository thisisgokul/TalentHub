import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import React from 'react'

const OAuth = () => {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      className="h-16"
    />
  </GoogleOAuthProvider>
  )
}

export default OAuth