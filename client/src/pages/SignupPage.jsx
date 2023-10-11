import React, { useState } from "react";
import bg3 from "../assets/bg3.svg";
import logo2 from "../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import OAuth from "../compoents/OAuth";
import Loader from "../compoents/Loader";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post("/signup", values);
        setLoading(false);
        navigate("/signin");
      } catch (error) {
        setLoading(false);
        setError(error.response.data.error); 
        console.error("Error:", error.message);
      }
    },
  });

  return (
    <section className="w-screen h-screen">
      <img src={bg3} alt="authbg" className="w-full h-full absolute" />
      <div className="flex items-center justify-center h-screen padding">
        <div className="shadow-lg rounded-md bg-primary px-6 py-12  relative w-full sm:w-96">
          <img src={logo2} alt="logo" width={130} />
          <h1 className="text-3xl font-semibold mt-4 text-start mb-3">
            Sign Up
          </h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col">
            <input
              type="text"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="border-b-2 border-gray-400 py-1 my-3  focus:outline-none"
              placeholder="enter your fullname"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}

            <input
              type="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="border-b-2 border-gray-400 py-1 my-3 focus:outline-none"
              placeholder="enter a valid email addrress"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}

            <input
              type="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="border-b-2 border-gray-400 py-1 my-3 focus:outline-none"
              placeholder="Password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-700">{formik.errors.password}</div>
            )}

            <p className="my-2">
              Already have an account?{" "}
              <Link className="text-blue-600 underline" to={"/signin"}>
                Sign In
              </Link>
            </p>
            {error && <div className="text-red-500">{error}</div>}
            {loading ? (
              <div className=" w-1/4 mx-auto">
                <Loader />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-secondary w-1/4 mx-auto mt-3 text-white py-1 text-lg btnHover"
                disabled={loading}
              >
                Signup
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

export default SignupPage;
