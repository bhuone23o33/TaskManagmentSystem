import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { getManagers, reset } from '../features/auth/authSlice';
import { assigningProject, reset1 } from '../features/Projects/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

function AssignProject() {
    const location = useLocation();
    const project = location.state?.project;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { managers, isManager, isError, message } = useSelector(state => state.auth);
    const { isLoading, isAssign } = useSelector(state => state.project);
    const [selectedManager, setSelectedManager] = useState(null);

    useEffect(() => {
        return () => {
            if (isManager) {
                dispatch(reset());
            }
        }
    }, [dispatch, isManager])

    useEffect(() => {
        return () => {
            if (isAssign) {
                dispatch(reset1());
            }
        }
    }, [dispatch, isAssign])

    // getting manager data
    useEffect(() => {
        dispatch(getManagers());
    }, [dispatch]);



    // if any error occured
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);


    const handleManagers = (e) => {
        const selectedManagerId = e.target.value;
        const selectedManager = managers.find(manager => manager._id === selectedManagerId);
        setSelectedManager(selectedManager || {});
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const projectData = {
            managerId: selectedManager._id,
            managerName: selectedManager.name,
            assignedAt: new Date(),
        }
        dispatch(assigningProject([project._id, projectData]));
        if (!isAssign) { navigate('/admin/project/all') }
    }
    if (isAssign) {
        return <Spinner />
    }
    return (
        <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md space-y-8">
                <h1 className="text-2xl font-bold text-center">Assign Project</h1>
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
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Project Description"
                                    id="projectDescription"
                                    name="projectDescription"
                                    disabled
                                    value={project?.projectDescription}
                                ></textarea>
                            </div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Project Requirement</span>
                                </div>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Project Requirement"
                                    id="projectRequirements"
                                    name="projectRequirements"
                                    disabled
                                    value={project?.projectRequirements}
                                ></textarea>
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
                                        <span className="label-text">Assign Manager</span>
                                    </div>
                                    <select
                                        id="Manager"
                                        name="Manager"
                                        value={selectedManager?._id || ''}
                                        onChange={handleManagers}
                                        className="select select-bordered" required>
                                        <option disabled value="">Select one</option>
                                        {managers.length > 0 && managers.map((manager) => {
                                            return <option key={manager._id} value={manager._id}>{manager.name}</option>
                                        })}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-wide">
                        Assign
                    </button>
                </form>
            </div >
        </div >
    )
}

export default AssignProject
