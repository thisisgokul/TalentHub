import React from 'react';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import axios from 'axios';
import { io } from "socket.io-client"
import ProfilePage from './pages/ProfilePage';
import SingleProfile from './pages/SingleProfile';
import Myworkers from './pages/Myworkers';
import SocketContext from './socket/SocketContext';
import { CallSection } from './sections/CallSection';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000/api/v1";
const socket = io("http://localhost:5000")
const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/index' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/singleprofilepage/:id' element={<SingleProfile />} />
        <Route path='/myworkers' element={<Myworkers />} />
        <Route path='/myroom/:roomId' element={<CallSection/>} />

      </Routes>
    </SocketContext.Provider>
  )
}

export default App