import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { updateProject, reset1 } from '../features/Projects/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

function UpdateProject() {
    const location = useLocation();
    const project = location.state?.project;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { isAssign } = useSelector(state => state.project);
    const [Status, setStatus] = useState(null);

    useEffect(() => {
        return () => {
            if (isAssign) {
                dispatch(reset1());
            }
        }
    }, [dispatch, isAssign])








    const handleEmployees = (e) => {
        console.log(e.target.value);
        setStatus(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const projectData = {
            status: Status
        }
        dispatch(updateProject([project._id, projectData]));
        if (!isAssign) { navigate('/employee/project/all') }
    }
    if (isAssign) {
        return <Spinner />
    }
    return (
        <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8 flex flex-col max-w-md space-y-8">
                <h1 className="text-2xl font-bold text-center">update Project Status</h1>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-start justify-center w-full" required>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <div className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Project Name</span>
                                </div>
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    disabled
                                    value={project?.projectName}
                                />
                            </div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Project Description</span>
                                </div>
                                <button className="btn btn-xs"><a href={project.projectDescription} target='_blank'>Desc</a></button>
                            </div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Project Requirement</span>
                                </div>
                                <button className="btn btn-xs"><a href={project.projectRequirements} target='_blank'>Req</a></button>
                            </div>
                        </div>
                        <div>
                            <div >
                                <label className='form-control'>
                                    <div className="label">
                                        Deadline Date
                                    </div>
                                    <DatePicker
                                        selected={new Date(project.projectDeadline)}
                                        disabled
                                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </label>
                            </div>
                            <div >
                                <label className='form-control'>
                                    <div className="label">
                                        Assign Date
                                    </div>
                                    <DatePicker
                                        selected={new Date()}
                                        disabled
                                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Update Status</span>
                                    </div>
                                    <select
                                        id="Status"
                                        name="Status"
                                        value={Status || ''}
                                        onChange={handleEmployees}
                                        className="select select-bordered" required>
                                        <option disabled value="">Select one</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Working">Working</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn mx-auto w-1/2">
                        Assign Project
                    </button>
                </form>
            </div >
        </div >
    )
}

export default UpdateProject
