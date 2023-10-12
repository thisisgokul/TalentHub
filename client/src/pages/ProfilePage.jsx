import React, { useState, useEffect } from "react";
import Navbar from "../compoents/Navbar";
import { Profileform } from "../compoents/Profileform";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { redirector } from "../constants";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [uploadpercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormdata] = useState({});

  useEffect(() => {
    redirector(currentUser, navigate);
    // if(selectedFile){
    //   handleImageUpload(selectedFile)
    // }
  }, [currentUser, navigate]);

  const handleImageUpload = async (image) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progess =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadPercentage(Math.round(progess));
        },
        (error) => {
          setUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormdata({ ...formData, profilepicture: downloadUrl });
          });
        }
      );
    } catch (error) {}
  };

  return (
    <section className="bg-slate-200 ">
      <Navbar />
      {currentUser && (
        <div className=" shadow-xl bg-white rounded-xl my-16 sm:my-8 mx-10 ">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 p-4 relative">
              <div className=" p-4 py-4 sm:py-20 flex flex-col items-center justify-center">
                <h2 className="text-2xl text-coral-gray font-medium">
                  Your Profile
                </h2>
                <div className="relative w-24 h-24 mt-4">
                  <label
                    htmlFor="fileInput"
                    className="absolute bottom-0 right-0 px-7 w-24 h-24 rounded-full flex items-end justify-center text-white py-1 pt-4 cursor-pointer bg-black bg-opacity-0 transition-opacity duration-300 hover:bg-opacity-40"
                  >
                    <AiFillEdit size={24} />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                  <img
                    className="w-full h-full rounded-full"
                    src={formData.profilepicture || currentUser.profilepicture}
                    alt="Profile"
                  />
                </div>

                <p>
                  {uploadError ? (
                    <span className="text-red-700">Error uploading...</span>
                  ) : uploadpercentage > 0 && uploadpercentage < 100 ? (
                    <span className="text-gray-700">{`uploading ${uploadpercentage}%`}</span>
                  ) : uploadpercentage === 100 ? (
                    <span className="text-green-500">
                      uploaded successfully
                    </span>
                  ) : (
                    ""
                  )}
                </p>

                <h3 className="text-xl font-bold mt-2">{currentUser.name}</h3>
                <div className="mt-3 flex flex-col">
                  <button
                    onClick={() => handleImageUpload(selectedFile)}
                    className="bg-green-600 border-2 px-8 py-1 text-white rounded-full transform hover:scale-105 transition-transform"
                  >
                    Upload
                  </button>
                  <button className="bg-red-700 px-7 py-1 mt-2 text-white rounded-full transform hover:scale-105 transition-transform">
                    Deactivate
                  </button>
                </div>
              </div>

              <div className="hidden md:block absolute h-3/4 mt-12  bg-gray-300 w-0.5  right-0 top-0"></div>
            </div>

            <div className="w-full px-3 ">
              <div className="">
                <Profileform
                  currentUser={currentUser}
                  formData={formData}
                  setFormdata={setFormdata}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
