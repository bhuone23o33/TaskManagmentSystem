

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getEmployeeProjects, reset1 } from '../features/Projects/projectSlice.js';
import { toast } from 'react-toastify';
import { storage } from '../firebase/TaskConfig.js';

import Spinner from '../components/Spinner.jsx';

function EmployeeProjects() {
    const dispatch = useDispatch();

    const [localProjects, setLocalProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { projects, isLoading, isError, isEmployeeProjects, message } = useSelector(state => state.project);

    useEffect(() => {
        return () => {
            if (isEmployeeProjects) {
                dispatch(reset1());
            }
        }
    }, [dispatch, isEmployeeProjects])

    // // getting project data
    useEffect(() => {
        dispatch(getEmployeeProjects());
    }, [dispatch]);

    // // setting project to localProject useState
    useEffect(() => {
        setLocalProjects(projects);
    }, [projects]);

    // // if any error occured
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);









    // for searching
    const handleSearch = () => {
        if (searchQuery.trim()) {
            const filteredProjects = projects.filter((project) => project.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
            setLocalProjects(filteredProjects);
        } else {
            setLocalProjects(projects);
        }
    }

    const handleAlreadyCompleted = () => {
        toast.error("Already Completed!");
    }



    // for search projects
    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    if (isLoading) {
        return <Spinner />
    }


    return (
        <>
            <div className="flex m-4">
                <input
                    type="text"
                    placeholder="Search by Project name"
                    value={searchQuery}
                    className="input input-bordered input-md w-full max-w-xs"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">S.No</th>
                        <th className="px-4 py-2">Project Name</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Requirements</th>
                        <th className="px-4 py-2">status</th>
                        <th className="px-4 py-2">Created At</th>
                        <th className="px-4 py-2">Assign At</th>
                        <th className="px-4 py-2">Project Deadline</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {localProjects.length > 0 && localProjects.map((project, i) => (
                        <tr key={project._id}>
                            <td className="px-4 py-2">{(i + 1)}</td>
                            <td className="px-4 py-2">{project.projectName}</td>
                            <td className="px-4 py-2">
                                <button className="btn btn-xs"><a href={project.projectDescription} target='_blank'>Desc</a></button>
                            </td>
                            <td className="px-4 py-2">
                                <button className="btn btn-xs"><a href={project.projectRequirements} target='_blank'>Req</a></button>
                            </td>
                            <td className="px-4 py-2">{(project.status) ? project.status : 'Not Assigned'}</td>
                            <td className="px-4 py-2">
                                {new Date(project.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">
                                {(project.assignedAt) ? new Date(project.assignedAt).toLocaleDateString() : 'Not Assigned'}
                            </td>
                            <td className="px-4 py-2">
                                {new Date(project.projectDeadline).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 flex flex-col gap-1">
                                {!(project.status === "Completed") && <Link
                                    to="/employee/project/updateStatus"
                                    state={{ project }}
                                    className="px-2 py-1 text-center text-xs font-bold rounded bg-blue-500 hover:bg-blue-700 text-white"
                                >
                                    update Status
                                </Link>}
                                {(project.status === "Completed") && (
                                    <button
                                        className="px-2 py-1 text-center text-xs font-bold rounded bg-blue-500  text-white"
                                        onClick={handleAlreadyCompleted}
                                    >
                                        Completed
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>
    )
}

export default EmployeeProjects



