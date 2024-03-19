import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getEmployees, resetManager } from '../features/manager/managerSlice';
import { assigningManagerProject, reset1 } from '../features/Projects/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

function AssignManagerProject() {
    const location = useLocation();
    const project = location.state?.project;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { managers, isManager, isError, message } = useSelector(state => state.auth);
    const { employees, isEmployee, isErrorManager, messageManager } = useSelector(state => state.manager);
    const { isAssign } = useSelector(state => state.project);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        return () => {
            if (isErrorManager) {
                dispatch(resetManager());
            }
        }
    }, [dispatch, isErrorManager])

    useEffect(() => {
        return () => {
            if (isAssign) {
                dispatch(reset1());
            }
        }
    }, [dispatch, isAssign])

    // getting manager data
    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);






    const handleEmployees = (e) => {
        const selectedEmployeeId = e.target.value;
        const selectedEmployee = employees.find(employee => employee._id === selectedEmployeeId);
        setSelectedEmployee(selectedEmployee || {});
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const projectData = {
            employeeId: selectedEmployee._id,
            employeeName: selectedEmployee.name,
            assignedAt: new Date(),
            status: 'Pending'
        }
        dispatch(assigningManagerProject([project._id, projectData]));
        if (!isAssign) { navigate('/manager/project/all') }
    }
    if (isAssign) {
        return <Spinner />
    }
    return (
        <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8 flex flex-col max-w-md space-y-8">
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
                                        <span className="label-text">Assign Employee</span>
                                    </div>
                                    <select
                                        id="Employee"
                                        name="Employee"
                                        value={selectedEmployee?._id || ''}
                                        onChange={handleEmployees}
                                        className="select select-bordered" required>
                                        <option disabled value="">Select one</option>
                                        {employees.length > 0 && employees.map((employee) => {
                                            return <option key={employee._id} value={employee._id}>{employee.name}</option>
                                        })}
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

export default AssignManagerProject
