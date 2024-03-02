

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getManagers, delManager, reset } from '../features/auth/authSlice.js';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner.jsx';

function ProjectListings() {
    const dispatch = useDispatch();
    const localProjects = [
        // Example object
        {
            _id: '1',
            projectName: 'Project 1',
            projectDescription: 'Description for Project 1',
            projectRequirements: 'Requirements for Project 1',
            managerName: 'Manager 1',
            employeeName: 'Employee 1',
            createdAt: '2022-01-01',
            assignedAt: '2022-01-02',
            deadline: '2022-02-01',
        },
        // Add more objects as needed
    ];

    const { managers, isLoading, isManager, isDeleted, isError, message } = useSelector(state => state.auth);
    const [localManagers, setLocalManagers] = useState(managers);

    useEffect(() => {
        return () => {
            if (isManager) {
                dispatch(reset());
            }
        }
    }, [dispatch, isManager])

    // getting manager data
    useEffect(() => {
        dispatch(getManagers());
        // setLocalManagers(managers);
    }, [dispatch]);

    // settin manager to localManager useState
    useEffect(() => {
        setLocalManagers(managers);
    }, [managers]);

    // if any error occured
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    // it is when delete function is successful
    useEffect(() => {
        if (isDeleted) {
            toast.success('Manager Deleted Successfully!');
            dispatch(getManagers());
        }
    }, [isDeleted, dispatch]);

    const handleAssignToManager = () => {

    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <table className="table-auto w-full text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">SN</th>
                        <th className="px-4 py-2">Project Name</th>
                        <th className="px-4 py-2">Project Description</th>
                        <th className="px-4 py-2">Project Requirements</th>
                        <th className="px-4 py-2">Manager Name</th>
                        <th className="px-4 py-2">Employee Name</th>
                        <th className="px-4 py-2">Created At</th>
                        <th className="px-4 py-2">Assigned At</th>
                        <th className="px-4 py-2">Project Deadline</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {localProjects.length > 0 &&
                        localProjects.map((item, i) => (
                            <tr key={item._id}>
                                <td className="px-4 py-2">{(i + 1)}</td>
                                <td className="px-4 py-2">{item.projectName}</td>
                                <td className="px-4 py-2">{item.projectDescription}</td>
                                <td className="px-4 py-2">{item.projectRequirements}</td>
                                <td className="px-4 py-2">{item.managerName}</td>
                                <td className="px-4 py-2">{item.employeeName}</td>
                                <td className="px-4 py-2">{item.createdAt}</td>
                                <td className="px-4 py-2">{item.assignedAt}</td>
                                <td className="px-4 py-2">{item.deadline}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="px-2 py-1  font-bold rounded bg-blue-500 hover:bg-blue-700 text-white"
                                        onClick={() => handleAssignToManager(item._id)}
                                    >
                                        Assign to Manager
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default ProjectListings
