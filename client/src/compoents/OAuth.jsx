import React from 'react';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { singnInSuccess } from '../redux/userSlice'; // Fix typo in import
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { displayName, email } = result.user;

      
      axios
        .post('/oauth', {
          name: displayName,
          email,
          password: 'passwordfds3t',
        })
        .then((response) => {
          dispatch(singnInSuccess(response.data));
          navigate('/');
        })
        .catch((error) => {
          console.error('Error registering user', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <button
        onClick={handleGoogleClick}
        className='px-12 sm:px-14 py-1.5 bg-gray-800 text-white flex rounded-md gap-2 sm:gap-4 hover:scale-105 transition-transform'
      >
        <FcGoogle size={30} />
        <span className='mt-1'> Sign in with Google</span>
      </button>
    </div>
  );
};

export default OAuth;
