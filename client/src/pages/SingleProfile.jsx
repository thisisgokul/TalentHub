import React, { useEffect, useState } from "react";
import Navbar from "../compoents/Navbar";
import { BsStripe } from "react-icons/bs";
import { SiRazorpay } from "react-icons/si";
import { AiFillPushpin } from "react-icons/ai";
import Loader from "../compoents/Loader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { loadStripe } from "@stripe/stripe-js";
import logo2 from "../assets/logo2.png";
import {  useSelector } from "react-redux";
import Footer from "../compoents/Footer";

const SingleProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/singleuserdataid/${id}`);
        setUser(response.data);
        setLoading(false);
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
     document.body.appendChild(script);
   });
};

const handleRazorpayPayment=async()=>{
  try {
   
    const response = await axios.post("/payment-razorpay", {
      amount: user.serviceCharge,
    });
    const order = response.data;

    const options = {
      key: "rzp_test_hA6EEDEhkYpHEE",
      amount:  user.serviceCharge,
      currency: "INR",
      name: "TalentHub pvt limited",
      description: "Service Payment",
      image: logo2,
      order_id: order.id,
      handler: function () {
        getMyWorkers()
        navigate('/myworkers')
      },
      
    }; 

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log(error);
  }
}

const handleStripePayment = async () => {
  try {
    const stripe = await loadStripe(
      "pk_test_51O3DDUSGefHjxGi1pvprrsh4OoUYqc2RBAuUtu2OvJHwnfxwWlma5szvztZkNbKLtyU2mRg7Y28Ov2Xs5Wzjkait00JIgsWeCr"
    );
    const response = await axios.post("/payment-stripe", {
      price: user.serviceCharge,
    });

    if (response.data.id) {
      getMyWorkers();
    }

    const sessionId = response.data.id;

    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      console.error("Error starting Stripe checkout:", result.error.message);
    }
  } catch (error) {
    console.error("Error in handleStripePayment:", error.message);
  }
};


  const getMyWorkers=async()=>{
    try {
      const { name, category, profilepicture,_id } = user;
      await axios.post("/get-myworkers", {workername: name,wokercategory: category,workerphoto: profilepicture,initialId:_id });
  
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-80 bg-slate-800">
      <Navbar />
      <h2 className="mx-10 mt-4 text-lg font-medium font-montserrat text-white">
        Connect Experts in Dev, AI, Design, Sales, Marketing, Admin & Support on
        Our Portal!
      </h2>
      <div className="mx-10 mt-6 text-white font-palanquin font-bold text-3xl">
        <Typewriter
          options={{
            strings: ["Unlock the service with your payment"],
            autoStart: true,
            loop: true,
            delay: 90,
          }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="border-2 mx-6 sm:mx-24 mt-10 rounded-lg shadow-lg bg-slate-50">
          <div className="padding-x py-10 flex flex-col sm:flex-row gap-4 ">
            <img
              className="w-24 h-24 rounded-full"
              src={user.profilepicture}
              alt="profilepicture"
            />
            <div className="flex flex-col ">
              <h1 className="font-palanquin text-3xl font-semibold">
                {user.name}
              </h1>
              <h1 className="mt-1 text-lg text-gray-600 ">{user.category}</h1>
            </div>
          </div>
          <div className="flex flex-col md:flex-row px-4 border-t-2">
            <div className="md:w-1/3 p-4 border-r-2 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-700 font-montserrat">
                Payment
              </h2>
              {!currentUser || currentUser._id !== id ? (
              <>
                <button
                  onClick={handleRazorpayPayment}
                  className="my-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="mr-2 text-lg"> Pay with Razorpay</span>
                  <SiRazorpay size={30} />
                </button>
                <h3 className="text-center">---OR---</h3>
                <button
                  onClick={handleStripePayment}
                  className="bg-green-600 my-2 hover:bg-green-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="mr-2 text-lg">Pay with Stripe</span>
                  <BsStripe size={30} />
                </button>
              </>
            ) : (
              <p className="text-center text-red-500">
                You cannot pay for your own profile.
              </p>
            )}
              
            </div>
            <div className="w-full px-3">
              <div className="flex flex-col sm:flex-row">
                <h2 className="my-3 text-3xl font-semibold font-montserrat uppercase">
                  {user.category}
                </h2>
                <div className="ml-auto flex flex-row ">
                  <h3 className="  my-8 font-bold font-palanquin  text-green-700 text-2xl">
                    ₹ {user.serviceCharge}
                  </h3>
                  <AiFillPushpin className="mt-6 text-4xl text-gray-800" />
                </div>
              </div>
              <p className="text-start mb-7 leading-7 text-lg">
                {user.description}
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default SingleProfile;
