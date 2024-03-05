import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import RegisterManager from './pages/RegisterManager.jsx';
import ManagerListings from './pages/ManagerListings.jsx';
import AddProject from './pages/AddProject.jsx';
import ProjectListings from './pages/ProjectListings.jsx';
import AssignProject from './pages/AssignProject.jsx';

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
          <Route path='/admin/addProject' element={<AddProject />} />
          <Route path='/admin/project/all' element={<ProjectListings />} />
          <Route path='/admin/project/assign' element={<AssignProject />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
