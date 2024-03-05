import React from 'react'

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createProject, reset1 } from '../features/Projects/projectSlice.js';
import Spinner from '../components/Spinner.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddProject() {
    // console.log(userType);
    // console.log(userType);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
        projectRequirements: "",
    });

    const [selectedDate, setSelectedDate] = useState(new Date());

    const { projectName, projectDescription, projectRequirements } = formData;



    const { isLoading, isError, isSuccess, message } = useSelector(state => state.project);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // redirect if success
        if (isSuccess) {
            dispatch(reset1());
            toast.success('Project Created!');
            navigate('/')
        }


        dispatch(reset1());
    }, [isError, isSuccess, navigate, dispatch, message])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const projectData = {
            ...formData,
            projectDeadline: selectedDate
        }
        // console.log(projectData);
        dispatch(createProject(projectData));
    };

    if (isLoading) {
        return <Spinner />
    }

    return (

        <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md space-y-8">
                <h1 className="text-2xl font-bold text-center">Add Project</h1>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-start justify-center w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Project Name</span>
                                </div>
                                <input
                                    placeholder="Type your name"
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    value={projectName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Project Description</span>
                                </div>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Project Description"
                                    id="projectDescription"
                                    name="projectDescription"
                                    value={projectDescription}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Project Requirements</span>
                                </div>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Project Requirements"
                                    id="projectRequirements"
                                    name="projectRequirements"
                                    value={projectRequirements}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <div className="px-1">
                                <label className='form-control'>
                                    <div className="label">
                                        Deadline Date
                                    </div>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-wide">
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProject
