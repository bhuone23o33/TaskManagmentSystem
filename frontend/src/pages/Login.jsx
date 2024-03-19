import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AdminLogin, reset } from '../features/auth/authSlice.js';
import { managerLogin, resetManager } from '../features/manager/managerSlice.js';
import { employeeLogin, resetEmployee } from '../features/employee/employeeSlice.js';
import { toast } from 'react-toastify';
import Spinner from "../components/Spinner.jsx";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        role: "",
        email: "",
        password: "",
    });
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);
    const {
        manager,
        isLoadingManager,
        isErrorManager,
        isSuccessManager,
        messageManager
    } = useSelector(state => state.manager);
    const {
        employee,
        isLoadingEmployee,
        isErrorEmployee,
        isSuccessEmployee,
        messageEmployee
    } = useSelector(state => state.employee);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (isSuccess || isSuccessManager || isSuccessEmployee) {
            toast.success('Login Successfully!')
        }
    }, [isSuccess, isSuccessManager, isSuccessEmployee])

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isErrorManager) {
            toast.error(messageManager);
        }

        if (isErrorEmployee) {
            toast.error(messageEmployee);
        }



        // redirect if success
        if ((isSuccess || user) || (isSuccessManager || manager) || (isSuccessEmployee || employee)) {
            navigate('/')
        }

        if (user) {
            dispatch(reset());
        } else if (manager) {
            dispatch(resetManager());
        } else if (employee) {
            dispatch(resetEmployee());
        }
    }, [isError, isSuccess, user, navigate, dispatch, message, isErrorManager, isSuccessManager, manager, employee, isErrorEmployee, isSuccessEmployee]);

    const { role, email, password } = formData;



    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email,
            password
        }
        if (role == 'admin') {
            dispatch(AdminLogin(userData));
        }
        else if (role == 'manager') {
            dispatch(managerLogin(userData));
        }
        else if (role == 'employee') {
            dispatch(employeeLogin(userData));
        }
    };

    if (isLoading || isLoadingManager || isLoadingEmployee) {
        return <Spinner />
    }


    return (
        <>
            <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg p-8 w-auto  space-y-8">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-start justify-center w-full">
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Role</span>
                                </div>
                                <select
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={handleChange}
                                    className="select select-bordered" required>
                                    <option disabled value="">Select one</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="employee">Employee</option>
                                </select>
                            </label>
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required />

                            </label>
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input placeholder="Password" className="input input-bordered w-full max-w-xs" type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-wide">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
