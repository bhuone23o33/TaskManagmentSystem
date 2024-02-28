import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice.js';

function Login() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        role: "",
        email: "",
        password: "",
    });
    const { user, isLoading, isError, message } = useSelector(state => state.auth);

    const { role, email, password } = formData;


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData));
    };


    return (
        <>
            <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-md  space-y-8">
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
