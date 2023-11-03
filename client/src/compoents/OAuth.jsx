// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";


import React from 'react'
import { FcGoogle } from "react-icons/fc";


const OAuth = () => {
  return (
    <div className='flex items-center justify-center'>
    <button className="px-12 sm:px-14 py-1.5 bg-gray-800 text-white flex rounded-md gap-2 sm:gap-4 hover:scale-105 transition-transform">
      <FcGoogle size={30} />
      <span className="mt-1"> Sign in with Google</span>
    </button>
  </div>
  )
}

export default OAuth