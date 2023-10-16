import React, { useState } from "react";
import bg3 from "../assets/bg3.svg";
import logo2 from "../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../compoents/OAuth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { singnInFail, singnInStart, singnInSuccess } from "../redux/userSlice";
import Loader from "../compoents/Loader";

const LoginPage = () => {
  const [formdata, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  function handleChange(e) {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(singnInStart());
      const { data } = await axios.post("/signin", formdata);
      dispatch(singnInSuccess(data));
      navigate("/index");
    } catch (error) {
      dispatch(singnInFail());
    }
  };

  return (
    <section className="w-screen h-screen">
      <img src={bg3} alt="authbg" className="w-full h-full absolute" />
      <div className="flex items-center justify-center h-screen padding">
        <div className="shadow-lg rounded-md bg-primary px-6 py-12  relative w-full sm:w-96">
          <img src={logo2} alt="logo" width={130} />
          <h1 className="text-3xl font-semibold mt-3 text-start mb-3">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className=" flex flex-col">
            <input
              type="email"
              id="email"
              onChange={handleChange}
              className="border-b-2 border-gray-400 py-1 my-3 focus:outline-none"
              placeholder="enter a valid email addrress"
            />
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="border-b-2 border-gray-400 py-1 my-3 focus:outline-none"
              placeholder="Password"
            />
            <p className="my-2">
              No account?
              <Link className="text-blue-600 underline mx-1" to={"/signup"}>
                Sign up
              </Link>
            </p>

            {loading ? (
              <div className=" w-1/4 mx-auto">
                <Loader />
              </div>
            ) : (
              <button className="bg-secondary w-1/4 mx-auto mt-3 text-white py-1 text-lg btnHover">
                Sign In
              </button>
            )}
          </form>
          <p className="text-center my-4">OR</p>
          <OAuth />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
