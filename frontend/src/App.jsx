import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import RegisterManager from './pages/RegisterManager.jsx';
import ManagerListings from './pages/ManagerListings.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer.jsx'
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/admin/register' element={<Register />} />
          <Route path='/user/manager/register' element={<RegisterManager />} />
          <Route path='/user/manager/all' element={<ManagerListings />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
