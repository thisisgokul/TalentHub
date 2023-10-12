import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/userSlice";
import { Link } from "react-router-dom";


const Indexprofile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
 

  const handleSignout = async () => {
    try {
      await axios.get("/signout");
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="px-16 py-14 rounded-xl mt-4 border mx-6 bg-gray-50 shadow-md">
      <h2 className="text-center font-bold text-xl font-montserrat mb-4">
        Profile
      </h2>
      <div className="flex items-center justify-center">
        <img
        src={currentUser&& currentUser.profilepicture}
          alt="profileim"
          className="rounded-full w-24 h-24"
        />
      </div>
      <br />
      <h1 className="text-center font-palanquin font-medium text-2xl mb-3">
        {currentUser && currentUser.name}
      </h1>
      <div className="items-center flex flex-col ">
        <Link to={"/profile"}>
        <button className="btnHover bg-secondary text-white px-5 py-1 rounded-lg font-medium text-lg">
         Profile
        </button>
        </Link>
        <button
          onClick={handleSignout}
          className="btnHover bg-green-700 text-white px-5 py-1 rounded-lg font-medium text-lg mt-3"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Indexprofile;
