import React from 'react'

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registerManager, reset } from '../features/auth/authSlice.js';
import NotFoundPage from './NotFound.jsx';
import Spinner from '../components/Spinner.jsx';

function RegisterManager() {
    // console.log(userType);
    // console.log(userType);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { isLoading, isError, isManagerRegistered, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // redirect if success
        if (isManagerRegistered) {
            dispatch(reset());
            toast.success('Manager Registered!!');
            navigate('/')
        }


        dispatch(reset());
    }, [isError, isManagerRegistered, navigate, dispatch, message])

    const { name, email, password, confirmPassword } = formData;
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Password do not match');
        } else {
            const userData = {
                name, email, password
            }
            dispatch(registerManager(userData));
        }
    };

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-md  space-y-8">
                    <h1 className="text-2xl font-bold text-center">Register Manager</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-start justify-center w-full">
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Name</span>
                                </div>
                                <input
                                    placeholder="Type your name"
                                    className="input input-bordered w-full max-w-xs"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    required
                                />
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
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input
                                    placeholder="Password"
                                    className="input input-bordered w-full max-w-xs"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Confirm Password</span>
                                </div>
                                <input
                                    placeholder="Confirm password"
                                    className="input input-bordered w-full max-w-xs"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-wide">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterManager
