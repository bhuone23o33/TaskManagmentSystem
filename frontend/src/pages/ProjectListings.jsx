

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { delProject, getProjects, reset1 } from '../features/Projects/projectSlice.js';
import { Link, useNavigate } from 'react-router-dom';
// YourComponent.js
import { replaceNewlinesWithBr } from "../components/utils.js";
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner.jsx';

function ProjectListings() {
    const dispatch = useDispatch();

    const { projects, isLoading, isError, isProjDeleted, isProjects, message } = useSelector(state => state.project);
    const [localProjects, setLocalProjects] = useState(projects);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        return () => {
            if (isProjects) {
                dispatch(reset1());
            }
        }
    }, [dispatch, isProjects])

    // getting project data
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    // setting project to localProject useState
    useEffect(() => {
        setLocalProjects(projects);
    }, [projects]);

    // if any error occured
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    useEffect(() => {
        if (isProjDeleted) {
            toast.success('Project deleted!');
        }
    }, [isProjDeleted]);

    console.log(projects);

    const handleDeleteProject = (id) => {
        const index = projects.findIndex((project) => project._id === id);
        if (index !== -1) {
            const newProjects = [...projects];
            newProjects.splice(index, 1);
            setLocalProjects(newProjects);
        }
        dispatch(delProject(id));
    }

    // for searching
    const handleSearch = () => {
        if (searchQuery.trim()) {
            const filteredProjects = projects.filter((project) => project.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
            setLocalProjects(filteredProjects);
        } else {
            setLocalProjects(projects);
        }
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
                        <th className="px-4 py-2">Manager Name</th>
                        <th className="px-4 py-2">Employee Name</th>
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
                            <td className="px-4 py-2">{(project.managerName) ? project.managerName : 'Not Assigned'}</td>
                            <td className="px-4 py-2">{(project.employeeName) ? project.employeeName : 'Not Assigned'}</td>
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
                                {(!project.managerName) && (
                                    <Link
                                        to="/admin/project/assign"
                                        state={{ project }}
                                        className="px-2 py-1 text-center text-xs font-bold rounded bg-blue-500 hover:bg-blue-700 text-white"
                                    >
                                        Assign
                                    </Link>
                                )}
                                <button
                                    className="px-2 py-1 text-xs font-bold rounded bg-blue-500 hover:bg-blue-700 text-white"
                                    onClick={() => handleDeleteProject(project._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>
    )
}

export default ProjectListings



