import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAdmin, reset } from '../features/auth/authSlice.js';
import { logoutManager, resetManager } from '../features/manager/managerSlice.js';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { manager } = useSelector(state => state.manager);

    const onLogout = () => {
        if (user) {
            dispatch(logoutAdmin());
            dispatch(reset());
        }
        if (manager) {
            dispatch(logoutManager());
            dispatch(resetManager());
        }
        navigate('/');
    };

    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="navbar-start">
                    {user && (
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to="/user/manager/register">
                                        Register Manager
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/addProject">
                                        Add Project
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user/manager/all">
                                        View Managers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        View All Employees
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/project/all">
                                        View All  Projects
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    {manager && (
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to="/manager/employee/register">
                                        Register Employee
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/manager/employee/all">
                                        View Employees
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/manager/project/all">
                                        View Projects
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="btn btn-ghost text-xl bg-base-300 hover:bg-base-300">
                        <Link to="/">
                            TaskManager
                        </Link>
                    </div>
                </div>
                {user && (
                    <div className="navbar-center hidden lg:flex ">
                        <ul className="menu menu-horizontal px-1 flex gap-1">
                            <li>
                                <Link to="/user/manager/register">
                                    Register Manager
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/addProject">
                                    Add Project
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/manager/all">
                                    View Managers
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    View All Employees
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/project/all">
                                    View All Projects
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
                {manager && (
                    <div className="navbar-center hidden lg:flex ">
                        <ul className="menu menu-horizontal px-1 flex gap-1">
                            <li>
                                <Link to="/manager/employee/register">
                                    Register Employee
                                </Link>
                            </li>

                            <li>
                                <Link to="/manager/employee/all">
                                    View Employees
                                </Link>
                            </li>
                            <li>
                                <Link to="/manager/project/all">
                                    View Projects
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
                <div className="navbar-end">
                    {(user || manager) ? (
                        <div className="btn" onClick={onLogout}>
                            logout
                        </div>
                    ) : (
                        <>
                            <div className="btn">
                                <Link to="/user/login">
                                    Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Navbar;

