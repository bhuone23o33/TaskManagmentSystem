// import React from 'react'
// // import RegisterManager from '../pages/RegisterManager.jsx'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { logoutAdmin, reset } from '../features/auth/authSlice.js'

// function Navbar() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { user } = useSelector(state => state.auth);

//     const onLogout = () => {
//         dispatch(logoutAdmin());
//         dispatch(reset());
//         navigate('/')
//     }

//     return (
//         <div>
//             <div className="navbar bg-base-300">
//                 <div className="navbar-start">
//                     {user && <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
//                         </div>
//                         <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//                             <li><Link to="/">Register Manager</Link></li>
//                             <li><Link to="/">Add Projects</Link></li>
//                             <li>
//                                 <a>View</a>
//                                 <ul className="p-2">
//                                     <li><Link to="/">Projects</Link></li>
//                                     <li><Link to="/">Managers</Link></li>
//                                     <li><Link to="/">Employees</Link></li>
//                                 </ul>
//                             </li>
//                         </ul>
//                     </div>}
//                     <div className="btn btn-ghost text-xl bg-base-300 hover:bg-base-300">
//                         <Link to="/">
//                             TaskManager System
//                         </Link>
//                     </div>
//                 </div>
//                 {user && <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1">
//                         <li>
//                             <Link to="/user/manager/register">
//                                 Register Manager
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/">
//                                 Add Project
//                             </Link>
//                         </li>
//                         <li>
//                             <details>
//                                 <summary>View</summary>
//                                 <ul className="p-2">
//                                     <li>
//                                         <Link to="/user/manager/all">
//                                             Managers
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/">
//                                             Employee
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/">
//                                             Projects
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </details>
//                         </li>
//                     </ul>
//                 </div>}
//                 <div className="navbar-end">
//                     {user ? (
//                         <div className="btn" onClick={onLogout}>
//                             logout
//                         </div>
//                     ) : (
//                         <>
//                             <div className="btn">
//                                 <Link to="/user/login">
//                                     Login
//                                 </Link>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navbar



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAdmin, reset } from '../features/auth/authSlice.js';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const onLogout = () => {
        dispatch(logoutAdmin());
        dispatch(reset());
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
                                {/* <li><Link to="/">Register Manager</Link></li>
                                <li><Link to="/">Add Projects</Link></li>
                                <li>
                                    <a>View</a>
                                    <ul className="p-2">
                                        <li><Link to="/">Projects</Link></li>
                                        <li><Link to="/">Managers</Link></li>
                                        <li><Link to="/">Employees</Link></li>
                                    </ul>
                                </li> */}
                                <li>
                                    <Link to="/user/manager/register">
                                        Register Manager
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
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
                                        View Employees
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        View Projects
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="btn btn-ghost text-xl bg-base-300 hover:bg-base-300">
                        <Link to="/">
                            TaskManager System
                        </Link>
                    </div>
                </div>
                {user && (
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <Link to="/user/manager/register">
                                    Register Manager
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
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
                                    View Employees
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    View Projects
                                </Link>
                            </li>
                            {/* <li>
                                <details>
                                    <summary>View</summary>
                                    <ul className="p-2">
                                        <li>
                                            <Link to="/user/manager/all">
                                                Managers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/">
                                                Employee
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/">
                                                Projects
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li> */}
                        </ul>
                    </div>
                )}
                <div className="navbar-end">
                    {user ? (
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

