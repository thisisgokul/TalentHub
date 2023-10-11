import React from 'react';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import axios from 'axios';
import ProfilePage from './pages/ProfilePage';
axios.defaults.withCredentials=true;;
axios.defaults.baseURL="http://localhost:5000/api/v1";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signin' element={<LoginPage />} />
      <Route path='/index' element={<IndexPage />} />
      <Route path='/profile' element={<ProfilePage/>} />
    </Routes>
  )
}

export default App