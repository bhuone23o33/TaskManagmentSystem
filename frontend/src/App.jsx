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
import RegisterEmployee from './pages/RegisterEmployee.jsx';
import EmployeeListings from './pages/EmployeeListings.jsx';
import ManagerProjects from './pages/ManagerProjects.jsx';
import AssignManagerProject from './pages/AssignManagerProject.jsx';
import AllEmployee from './pages/AllEmployee.jsx';
import EmployeeProjects from './pages/EmployeeProjects.jsx';
import UpdateProject from './pages/UpdateProject.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
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
          <Route path='/admin/employee/all' element={<AllEmployee />} />
          <Route path='/admin/addProject' element={<AddProject />} />
          <Route path='/admin/project/all' element={<ProjectListings />} />
          <Route path='/admin/project/assign' element={<AssignProject />} />
          <Route path='/manager/employee/register' element={<RegisterEmployee />} />
          <Route path='/manager/employee/all' element={<EmployeeListings />} />
          <Route path='/manager/project/all' element={<ManagerProjects />} />
          <Route path='/manager/project/assign' element={<AssignManagerProject />} />
          <Route path='/employee/project/all' element={<EmployeeProjects />} />
          <Route path='/employee/project/updateStatus' element={<UpdateProject />} />
          {/* <Route path='/mentor/:id  ' element={<ManagerProjects />} /> */}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
