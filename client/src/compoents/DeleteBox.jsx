import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

const DeleteBox = ({onCancel,isVisible,onDelete}) => {
    if (!isVisible) {
        return null;
      }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-100 p-4  shadow-2xl rounded-2xl sm:w-[620px] flex justify-center items-center flex-col">
        <AiOutlineWarning className="text-red-600 my-4" size={58} />
        <h2 className="mb-4 text-xl font-semibold text-black">
          Warning: Account Deletion
        </h2>
        <p className="mx-7 text-center my-2 text-gray-600 font-medium">
          This action cannot be undone. All values and data associated with this
          account will be permanently lost. Are you sure you want to proceed
          with deleting your account?
        </p>
        <div className="flex flex-col">
          <button onClick={onDelete} className="mr-2 px-20 py-2 text-xl my-2 bg-red-600 text-white rounded-md hover:scale-105 transition-transform">
            Delete Account
          </button>
          <button onClick={onCancel} className="mr-2 px-20 py-2 text-xl my-2 bg-white border-2 text-gray-800 rounded-md hover:scale-105 transition-transform">
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBox;
