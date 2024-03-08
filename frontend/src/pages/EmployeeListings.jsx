

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { getEmployees, delManager, reset } from '../features/auth/authSlice.js'; 
import { getEmployees, delEmployee, resetManager } from '../features/manager/managerSlice.js';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner.jsx';

function EmployeeListings() {
    const dispatch = useDispatch();

    const { employees, isLoadingManager, isEmployee, isDeletedEmployee, isErrorManager, messageManager } = useSelector(state => state.manager);
    const [localEmployees, setLocalEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        return () => {
            if (isEmployee) {
                dispatch(resetManager());
            }
        }
    }, [dispatch, isEmployee])

    // getting employee data
    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    // settin employee to localEmployee useState
    useEffect(() => {
        setLocalEmployees(employees);
    }, [employees]);

    // if any error occured
    useEffect(() => {
        if (isErrorManager) {
            toast.error(messageManager);
        }
    }, [isErrorManager, messageManager]);

    // it is when delete function is successful
    useEffect(() => {
        if (isDeletedEmployee) {
            toast.success('Employee Deleted Successfully!');
            dispatch(getEmployees());
        }
    }, [isDeletedEmployee, dispatch]);

    const handleButtonClick = (id) => {
        const index = employees.findIndex((employee) => employee._id === id);
        if (index !== -1) {
            const newEmployees = [...employees];
            newEmployees.splice(index, 1);
            setLocalEmployees(newEmployees);
        }
        dispatch(delEmployee(id));
    }

    // for searching
    const handleSearch = () => {
        if (searchQuery.trim()) {
            const filteredEmployees = employees.filter((employee) => employee.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setLocalEmployees(filteredEmployees);
        } else {
            setLocalEmployees(employees);
        }
    }

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    if (isLoadingManager) {
        return <Spinner />
    }

    return (
        <>
            <div className="flex m-4">
                <input
                    type="text"
                    placeholder="Search by Employee name"
                    value={searchQuery}
                    className="input input-bordered input-md w-full max-w-xs"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">SN</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {localEmployees.length > 0 && localEmployees.map((item, i) => (
                        <tr key={item._id}>
                            <td className="px-4 py-2">{(i + 1)}</td>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.email}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="px-2 py-1 text-xs font-bold rounded bg-blue-500 hover:bg-blue-700 text-white"
                                    onClick={() => handleButtonClick(item._id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default EmployeeListings
